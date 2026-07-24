import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>TFA Test Email</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr><td style="background:#1E3A5F;padding:32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:0.5px;">TFA Wealth Planning</h1>
          <div style="height:3px;width:60px;background:#C9A84C;margin:12px auto 0;"></div>
        </td></tr>
        <tr><td style="padding:40px 32px 24px;">
          <h2 style="margin:0 0 16px;font-size:22px;color:#1E3A5F;">This is a test email</h2>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">
            Hi there,
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">
            This is a sample of what a branded TFA transactional email looks like when sent through Resend.
            Colors, typography, and layout follow the TFA brand system (navy <strong>#1E3A5F</strong> and gold <strong>#C9A84C</strong>, Inter).
          </p>
          <div style="margin:28px 0;text-align:center;">
            <a href="https://tfawealthplanning.com/book-consultation" style="display:inline-block;background:#C9A84C;color:#1E3A5F;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:8px;font-size:15px;">Book a Consultation</a>
          </div>
          <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#64748b;">
            If the look and feel matches what you want, we can wire this same template into confirmation emails, lead notifications, and auth emails.
          </p>
        </td></tr>
        <tr><td style="background:#0f172a;padding:24px 32px;text-align:center;color:#94a3b8;font-size:12px;line-height:1.6;">
          <div style="color:#C9A84C;font-weight:600;margin-bottom:6px;">TFA Wealth Planning</div>
          <div>tfawealthplanning.com &nbsp;·&nbsp; (888) 350-5396</div>
          <div style="margin-top:8px;">You are receiving this because you requested a test email preview.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let to = 'leads@tfainsuranceadvisors.com';
  let from = 'TFA Wealth Planning <noreply@tfainsuranceadvisors.com>';
  try {
    const body = await req.json().catch(() => ({}));
    if (typeof body.to === 'string' && body.to.includes('@')) to = body.to;
    if (typeof body.from === 'string' && body.from.includes('@')) from = body.from;
  } catch (_) { /* no body — use defaults */ }

  const send = async (fromAddr: string) => {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [to],
        subject: 'TFA branded email — preview',
        html,
      }),
    });
    const text = await res.text();
    return { status: res.status, body: text };
  };

  let result = await send(from);
  let usedFrom = from;
  let fallback = false;

  if (result.status >= 400 && !from.includes('resend.dev')) {
    // Domain likely not verified — fall back to Resend's shared sender.
    fallback = true;
    usedFrom = 'TFA Wealth Planning <onboarding@resend.dev>';
    result = await send(usedFrom);
  }

  return new Response(
    JSON.stringify({
      to,
      from: usedFrom,
      fallback_used: fallback,
      resend_status: result.status,
      resend_response: (() => { try { return JSON.parse(result.body); } catch { return result.body; } })(),
    }),
    { status: result.status < 400 ? 200 : result.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});