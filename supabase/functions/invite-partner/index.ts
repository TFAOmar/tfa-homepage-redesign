import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SITE_URL = 'https://tfawealthplanning.com';

function brandedHtml(displayName: string, magicLink: string | null) {
  const cta = magicLink
    ? `<div style="margin:28px 0;text-align:center;"><a href="${magicLink}" style="display:inline-block;background:#C9A84C;color:#1E3A5F;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:8px;font-size:15px;">Sign in to your Partner Dashboard</a></div>`
    : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Welcome to TFA</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 0;"><tr><td align="center">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
      <tr><td style="background:#1E3A5F;padding:32px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">TFA Wealth Planning</h1>
        <div style="height:3px;width:60px;background:#C9A84C;margin:12px auto 0;"></div>
      </td></tr>
      <tr><td style="padding:40px 32px 24px;">
        <h2 style="margin:0 0 16px;font-size:22px;color:#1E3A5F;">You're invited as a Referral Partner</h2>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">Hi ${displayName || 'there'},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">
          You've been added as a referral partner for TFA Wealth Planning. Your account gives you a private dashboard at <strong>/concierge</strong> where you can:
        </p>
        <ul style="margin:0 0 20px 20px;color:#334155;line-height:1.7;font-size:15px;">
          <li>Send new client referrals directly to our intake team</li>
          <li>Track the status of every lead you send us</li>
          <li>See appointment and follow-up activity in real time</li>
        </ul>
        ${cta}
        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#64748b;">
          If the button doesn't work, you can sign in any time at <a href="${SITE_URL}/auth?next=/concierge" style="color:#1E3A5F;">${SITE_URL}/auth</a> using this email address. First time? Use "Forgot password" to set your password.
        </p>
      </td></tr>
      <tr><td style="background:#0f172a;padding:24px 32px;text-align:center;color:#94a3b8;font-size:12px;line-height:1.6;">
        <div style="color:#C9A84C;font-weight:600;margin-bottom:6px;">TFA Wealth Planning</div>
        <div>tfawealthplanning.com &nbsp;·&nbsp; (888) 350-5396</div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization') || '';
    const jwt = authHeader.replace(/^Bearer\s+/i, '');
    if (!jwt) return json({ error: 'Missing auth' }, 401);

    // Verify caller is admin
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: 'Invalid session' }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: isAdmin, error: roleErr } = await admin.rpc('has_role', {
      _user_id: userData.user.id,
      _role: 'admin',
    });
    if (roleErr || !isAdmin) return json({ error: 'Not authorized' }, 403);

    const body = await req.json().catch(() => ({}));
    const referrerId = String(body.referrer_id || '');
    const email = String(body.email || '').trim().toLowerCase();
    if (!referrerId || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'referrer_id and valid email required' }, 400);
    }

    // Find or invite user
    let userId: string | null = null;
    const { data: existingList } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const existing = existingList?.users?.find((u) => (u.email || '').toLowerCase() === email);

    const redirectTo = `${SITE_URL}/auth?next=/concierge`;
    let status: 'invited' | 'linked_existing' = 'linked_existing';

    if (existing) {
      userId = existing.id;
    } else {
      const { data: inv, error: invErr } = await admin.auth.admin.inviteUserByEmail(email, {
        redirectTo,
      });
      if (invErr || !inv?.user) return json({ error: invErr?.message || 'Invite failed' }, 500);
      userId = inv.user.id;
      status = 'invited';
    }

    // Link owner + grant partner role via RPC
    const { error: linkErr } = await admin.rpc('admin_link_referrer_owner', {
      p_referrer_id: referrerId,
      p_email: email,
    });
    if (linkErr) {
      // Fallback: do it with service role directly
      await admin.from('intake_referrers').update({ owner_user_id: userId }).eq('id', referrerId);
      await admin.from('user_roles').upsert(
        { user_id: userId, role: 'partner' },
        { onConflict: 'user_id,role' },
      );
    }

    // Send branded welcome via Resend with magic link
    const { data: referrer } = await admin
      .from('intake_referrers')
      .select('display_name')
      .eq('id', referrerId)
      .maybeSingle();

    let magicLink: string | null = null;
    const { data: linkData } = await admin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo },
    });
    magicLink = linkData?.properties?.action_link ?? null;

    if (RESEND_API_KEY) {
      const html = brandedHtml(referrer?.display_name || '', magicLink);
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'TFA Wealth Planning <noreply@tfainsuranceadvisors.com>',
          to: [email],
          subject: "You're invited to the TFA Partner Dashboard",
          html,
        }),
      });
    }

    return json({ status, owner_email: email, owner_user_id: userId }, 200);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}