## Send Minh a branded invite (uses existing flow)

Everything needed is already built — no new code required.

### What to do

1. Open `/admin/partners`.
2. Find **Minh Nguyen** in the list.
3. Click the **Invite owner** icon on that row.
4. Enter `minhwin80@gmail.com` when prompted.

### What happens

The existing `invite-partner` edge function will:
- Create Minh's `auth.users` account (or find it if it exists)
- Set `intake_referrers.owner_user_id` for `slug = 'minh'` and grant him the `partner` role
- Send a TFA-branded (Navy/Gold) email from `noreply@tfainsuranceadvisors.com` with a magic sign-in link to `/concierge`

Once he signs in, all the historical leads we just backfilled (`partner_slug = 'minh'`) will appear in his dashboard automatically.

### Nothing to build

If any of the above doesn't work (button missing, email doesn't arrive, link fails), tell me the symptom and I'll debug — otherwise there's no code change to plan.
