# Runbook — `retry-missed-life-insurance-notifications` scheduled job

This job runs every 15 minutes and re-triggers advisor/admin notifications for
life-insurance applications whose notification never landed. It authenticates
with a shared **cron secret** fetched from **Supabase Vault at execution time**
and sent in the `x-cron-secret` header. The edge function verifies that secret
(or the service-role key) with a constant-time, fail-closed check and returns
`401` for anon / missing / wrong callers.

> **Secret hygiene — read first.** The cron secret must never be printed,
> echoed, pasted into a terminal that keeps history, committed, or logged.
> Every command below is written to avoid revealing the value. Prefer the
> Supabase **Studio → Vault** UI over `psql` where noted, because server-side
> statement logging can capture values passed to `psql`.

Related artifacts:
- Migration: `supabase/migrations/20260721142906_642c7c5e-af4e-4c16-a24f-ac84ef2c80f3.sql`
- Fail-closed Vault lookup: `public.get_cron_secret(text)`
- Function auth logic (unit-tested): `./auth.ts`, `./auth.test.ts`

Two names you will use — they must hold the **same value**:
- Edge Function env var: **`CRON_SECRET`**
- Vault secret name: **`retry_missed_life_insurance_notifications_cron_secret`**

---

## 1. Setup — create the shared secret in both places (without printing it)

Generate a strong secret **once** into a shell variable. It is never echoed.

```bash
# Generates ~64 chars of entropy into $SECRET without displaying it.
SECRET="$(openssl rand -base64 48)"
```

### 1a. Edge Function `CRON_SECRET`

```bash
# The CLI prints the key name, never the value.
supabase secrets set CRON_SECRET="$SECRET" --project-ref <PROJECT_REF>
```

(Or Studio → Edge Functions → Manage secrets → add `CRON_SECRET`, paste value.)

### 1b. Vault secret (same value)

**Preferred:** Studio → **Project Settings → Vault → Add new secret**
- Name: `retry_missed_life_insurance_notifications_cron_secret`
- Secret: paste the same value.

**Alternative (psql):** pass the value via a psql variable (not shell history;
be aware server statement logging may capture it — prefer the UI on Production):

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 \
  -v v_name='retry_missed_life_insurance_notifications_cron_secret' \
  -v v_val="$SECRET" \
  -c "select vault.create_secret(:'v_val', :'v_name');"
```

If the secret already exists, rotate it instead of creating a duplicate
(a duplicate name is **ambiguous** and the job will fail closed on purpose):

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 \
  -v v_name='retry_missed_life_insurance_notifications_cron_secret' \
  -v v_val="$SECRET" \
  -c "select vault.update_secret(id, :'v_val') from vault.secrets where name = :'v_name';"
```

Then clear the variable:

```bash
unset SECRET
```

---

## 2. Deployment

Apply the forward-only migration and (re)deploy the function:

```bash
supabase db push                                                   # applies the new migration
supabase functions deploy retry-missed-life-insurance-notifications --project-ref <PROJECT_REF>
```

`config.toml` sets `verify_jwt = false` for this function so the non-JWT
`x-cron-secret` request reaches the function's own auth gate. The function still
rejects anon/missing/wrong callers — this does not weaken authorization.

---

## 3. Runtime acceptance — do NOT declare success until all pass

### 3a. The cron command contains only a Vault lookup (no secret literal)

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 \
  -c "select jobname, schedule, command from cron.job
        where jobname = 'retry-missed-life-insurance-notifications';"
```

Assert, by inspection:
- `schedule` is `*/15 * * * *`.
- `command` **contains** `get_cron_secret(` (the Vault-backed lookup) and the
  exact endpoint `/functions/v1/retry-missed-life-insurance-notifications`.
- `command` contains **no** literal secret — none of: `Bearer `, `eyJ`
  (a JWT prefix), `"anon"`, `role`.

Programmatic guard (returns `t` only if the command is clean):

```bash
psql "$DB_URL" -tA -v ON_ERROR_STOP=1 -c "
  select command like '%get_cron_secret(%'
     and command not ilike '%bearer %'
     and command not like '%eyJ%'
     and command not ilike '%anon%'
  from cron.job where jobname = 'retry-missed-life-insurance-notifications';"
```

### 3b. The Vault secret resolves without printing it

```bash
# Prints only 'true' — never the secret value.
psql "$DB_URL" -tA -v ON_ERROR_STOP=1 \
  -c "select length(public.get_cron_secret('retry_missed_life_insurance_notifications_cron_secret')) > 0;"
```

If the secret is absent/empty/ambiguous this raises (fails closed) instead of
returning `true` — resolve before continuing.

### 3c. Function rejects unauthorized callers (expect 401 each)

```bash
FN_URL="https://<PROJECT_REF>.supabase.co/functions/v1/retry-missed-life-insurance-notifications"

# anon key bearer -> 401
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$FN_URL" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H 'Content-Type: application/json' -d '{}'

# no credentials -> 401
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$FN_URL" \
  -H 'Content-Type: application/json' -d '{}'

# wrong cron secret -> 401
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$FN_URL" \
  -H 'x-cron-secret: definitely-not-the-secret' -H 'Content-Type: application/json' -d '{}'
```

### 3d. Authorized scheduled-caller path actually succeeds (expect 200)

Exercise the **same path the cron uses** — the Vault secret in the
`x-cron-secret` header — without printing the secret:

```bash
SECRET="$(psql "$DB_URL" -tA -v ON_ERROR_STOP=1 \
  -c "select public.get_cron_secret('retry_missed_life_insurance_notifications_cron_secret');")"

curl -s -o /dev/null -w '%{http_code}\n' -X POST "$FN_URL" \
  -H "x-cron-secret: $SECRET" -H 'Content-Type: application/json' \
  -d '{"trigger":"manual-acceptance"}'      # expect 200

unset SECRET
```

### 3e. Trigger the DB→HTTP path exactly as pg_cron will, and confirm 200

Run the scheduled command body once, then read the HTTP response status
recorded by pg_net (no secret is displayed):

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 -c "
  select net.http_post(
    url := 'https://<PROJECT_REF>.supabase.co/functions/v1/retry-missed-life-insurance-notifications',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'x-cron-secret', public.get_cron_secret('retry_missed_life_insurance_notifications_cron_secret')
    ),
    body := jsonb_build_object('trigger','cron-acceptance','time', now()::text)
  );"

# A few seconds later, confirm the async call returned 200:
psql "$DB_URL" -tA -c "select status_code from net._http_response order by id desc limit 1;"   # expect 200
```

### 3f. Confirm a real scheduled tick succeeds

Within ~15 minutes, confirm the scheduler itself ran green:

```bash
psql "$DB_URL" -c "
  select status, return_message, start_time
    from cron.job_run_details
   where jobid = (select jobid from cron.job
                   where jobname = 'retry-missed-life-insurance-notifications')
   order by start_time desc limit 3;"   # expect status = 'succeeded'
```

**Only declare success when 3a–3f all pass.**

---

## 4. Rollback — restore a safe *stopped* state (never anon auth)

Rolling back does **not** reintroduce the old anon-Bearer command from
migration `20260425225614`. It stops the job safely.

Fastest reversible stop (keeps the schedule row, disables it):

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 \
  -c "update cron.job set active = false
        where jobname = 'retry-missed-life-insurance-notifications';"
```

Full stop (removes the schedule entirely):

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 \
  -c "select cron.unschedule('retry-missed-life-insurance-notifications');"
```

Optional — remove the helper function if fully retiring the job:

```bash
psql "$DB_URL" -v ON_ERROR_STOP=1 -c "drop function if exists public.get_cron_secret(text);"
```

To re-enable after a stop, re-run the migration (`supabase db push`) or, if only
disabled, `update cron.job set active = true where jobname = '...';`.

Secret rotation / revocation: update the Vault secret **and** the edge function
`CRON_SECRET` to the same new value (§1). Because retrieval fails closed, an
emptied/removed Vault secret stops the job rather than sending a blank header.
