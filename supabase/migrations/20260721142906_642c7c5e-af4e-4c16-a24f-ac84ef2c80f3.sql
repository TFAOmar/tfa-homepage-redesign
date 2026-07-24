-- Forward-only repair of the pg_cron job
-- "retry-missed-life-insurance-notifications".
--
-- Problem
-- -------
-- Migration 20260425225614 scheduled this job with a hard-coded anon Bearer
-- token in cron.job.command. The hardened edge function now rejects the anon
-- key and accepts only the service-role key or CRON_SECRET, so every scheduled
-- run receives HTTP 401 and no missed notifications are ever retried.
--
-- Fix
-- ---
-- Reschedule the job so it authenticates with the CRON_SECRET value that is
-- fetched from Supabase Vault AT EXECUTION TIME and sent in the x-cron-secret
-- header. No secret literal appears in this migration, in cron.job.command, or
-- anywhere in Git history.
--
-- Fail-closed guarantees (see public.get_cron_secret below):
--   * Vault secret absent    -> function raises (no_data_found)  -> POST aborts
--   * Vault secret ambiguous  -> function raises (too_many_rows) -> POST aborts
--   * Vault secret empty/blank -> function raises                -> POST aborts
-- Because the secret is a function argument to jsonb_build_object, Postgres
-- evaluates it BEFORE net.http_post executes; a raise aborts the whole command,
-- so the cron can never silently send an empty or missing x-cron-secret header.
-- Failed runs are recorded in cron.job_run_details for observability.
--
-- This migration is idempotent and never restores anon authentication.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS supabase_vault;

-- Name of the Vault secret that holds the shared cron secret. Its VALUE must be
-- identical to the edge function's CRON_SECRET environment variable. Both are
-- created out-of-band by an operator (see the runbook); neither is stored here.
--
-- Fail-closed retrieval of a required Vault secret. SECURITY DEFINER so it can
-- read the restricted vault.decrypted_secrets view; locked down below so it is
-- callable only by the job owner (postgres), never by anon/authenticated.
-- It never returns, logs, or raises the secret value itself — only the name.
CREATE OR REPLACE FUNCTION public.get_cron_secret(p_secret_name text)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $fn$
DECLARE
  v_secret text;
BEGIN
  -- INTO STRICT raises no_data_found when the secret is absent and
  -- too_many_rows when the name is ambiguous (multiple Vault rows).
  SELECT decrypted_secret
    INTO STRICT v_secret
    FROM vault.decrypted_secrets
   WHERE name = p_secret_name;

  IF v_secret IS NULL OR btrim(v_secret) = '' THEN
    RAISE EXCEPTION 'Vault secret "%" exists but is empty; refusing to send cron request', p_secret_name
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN v_secret;
EXCEPTION
  WHEN no_data_found THEN
    RAISE EXCEPTION 'Vault secret "%" is absent; refusing to send cron request', p_secret_name
      USING ERRCODE = 'insufficient_privilege';
  WHEN too_many_rows THEN
    RAISE EXCEPTION 'Vault secret "%" is ambiguous (multiple rows); refusing to send cron request', p_secret_name
      USING ERRCODE = 'insufficient_privilege';
END;
$fn$;

COMMENT ON FUNCTION public.get_cron_secret(text) IS
  'Fail-closed retrieval of a required Supabase Vault secret for pg_cron jobs. '
  'Raises (aborting the caller) if the secret is absent, ambiguous, or empty. '
  'Never exposes the secret value in errors or logs. Locked down to the job owner.';

-- Least privilege: only the job owner may execute this. Revoke from everyone
-- else so a leaked anon/authenticated role cannot exfiltrate the secret value.
REVOKE ALL ON FUNCTION public.get_cron_secret(text) FROM PUBLIC;
DO $$
BEGIN
  EXECUTE 'REVOKE ALL ON FUNCTION public.get_cron_secret(text) FROM anon';
EXCEPTION WHEN undefined_object THEN NULL;
END $$;
DO $$
BEGIN
  EXECUTE 'REVOKE ALL ON FUNCTION public.get_cron_secret(text) FROM authenticated';
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

-- Remove any prior schedule with this name so re-runs are idempotent and the
-- old anon-token command from 20260425225614 is fully replaced.
DO $$
BEGIN
  PERFORM cron.unschedule('retry-missed-life-insurance-notifications');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Reschedule: same 15-minute cadence, same function endpoint. The ONLY source
-- of the auth secret in the command is the Vault-backed lookup below.
SELECT cron.schedule(
  'retry-missed-life-insurance-notifications',
  '*/15 * * * *',
  $job$
  SELECT net.http_post(
    url := 'https://cstkeblqqyjwlrbppucu.supabase.co/functions/v1/retry-missed-life-insurance-notifications',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', public.get_cron_secret('retry_missed_life_insurance_notifications_cron_secret')
    ),
    body := jsonb_build_object('trigger', 'cron', 'time', now()::text)
  ) AS request_id;
  $job$
);
