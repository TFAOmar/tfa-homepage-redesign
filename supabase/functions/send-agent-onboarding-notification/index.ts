import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ALLOWED_ORIGINS = [
  "https://tfainsuranceadvisors.com",
  "https://www.tfainsuranceadvisors.com",
  "https://tfawealthplanning.com",
  "https://www.tfawealthplanning.com",
  "http://localhost:5173",
  "http://localhost:8080",
];
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  return (
    origin.endsWith(".lovable.app") ||
    origin.endsWith(".lovable.dev") ||
    origin.endsWith(".lovableproject.com")
  );
};
const getCorsHeaders = (origin: string | null): Record<string, string> => ({
  "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
});

const BodySchema = z.object({
  applicationId: z.string().uuid(),
  resumeToken: z.string().min(8).max(128),
});

const TO_EMAIL = "contracting@tfainsuranceadvisors.com";
const FROM_EMAIL = "TFA Onboarding <noreply@tfainsuranceadvisors.com>";

const esc = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Show only the last N chars of a sensitive value. Empty stays empty. */
const maskTail = (val: unknown, keep = 4): string => {
  const digits = String(val ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= keep) return "•".repeat(digits.length);
  return "••••" + digits.slice(-keep);
};
const maskSSN = (val: unknown): string => {
  const digits = String(val ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return "•••-••-" + (digits.length >= 4 ? digits.slice(-4) : digits);
};
const yearOnly = (val: unknown): string => {
  const s = String(val ?? "");
  const m = s.match(/(\d{4})/);
  return m ? m[1] : "";
};

function row(label: string, value: unknown): string {
  const v = value === undefined || value === null || value === "" ? "—" : value;
  return `<tr><td style="padding:6px 12px;font-weight:600;color:#1E3A5F;background:#F4F6FA;border-bottom:1px solid #E5E9F0;width:42%;">${esc(label)}</td><td style="padding:6px 12px;color:#1A202C;border-bottom:1px solid #E5E9F0;">${esc(v as string)}</td></tr>`;
}
function section(num: string, title: string, inner: string): string {
  return `<div style="margin:24px 0;border:1px solid #E5E9F0;border-radius:8px;overflow:hidden;">
    <div style="background:#1E3A5F;color:#fff;padding:10px 16px;font-weight:700;font-size:14px;">
      <span style="color:#E4B548;margin-right:8px;">${num}</span>${esc(title)}
    </div>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;">${inner}</table>
  </div>`;
}
function tableSection(num: string, title: string, headers: string[], rows: any[][]): string {
  const head = headers.map(h => `<th style="text-align:left;padding:6px 10px;background:#F4F6FA;border-bottom:1px solid #E5E9F0;color:#1E3A5F;font-size:12px;">${esc(h)}</th>`).join("");
  const body = rows.length
    ? rows.map(r => `<tr>${r.map(c => `<td style="padding:6px 10px;border-bottom:1px solid #EEF2F6;font-size:12px;">${esc(c ?? "")}</td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="${headers.length}" style="padding:8px;color:#777;font-style:italic;">—</td></tr>`;
  return `<div style="margin:24px 0;border:1px solid #E5E9F0;border-radius:8px;overflow:hidden;">
    <div style="background:#1E3A5F;color:#fff;padding:10px 16px;font-weight:700;font-size:14px;">
      <span style="color:#E4B548;margin-right:8px;">${num}</span>${esc(title)}
    </div>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
  </div>`;
}

async function signed(path?: string): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabaseAdmin.storage
    .from("agent-onboarding-uploads")
    .createSignedUrl(path, 60 * 60 * 24 * 14);
  return data?.signedUrl ?? null;
}

async function buildHtml(app: any): Promise<string> {
  const d = (app.form_data ?? {}) as Record<string, any>;
  const eoUrl = await signed(d.eoDeclarationPath);
  const amlUrl = await signed(d.amlCertificatePath);
  const bankUrl = await signed(d.voidedCheckPath);

  const link = (label: string, url: string | null) =>
    url ? `<div style="margin:8px 0;"><a href="${esc(url)}" style="color:#1E3A5F;font-weight:600;">📎 ${esc(label)}</a> <span style="color:#777;font-size:11px;">(link valid 14 days)</span></div>` : "";

  const bg = d.backgroundDisclosure ?? {};
  const bgRows = [
    ["Felony or misdemeanor conviction", "q1"],
    ["License declined/suspended/revoked", "q2"],
    ["Terminated for alleged misconduct", "q3"],
    ["Subject of investigation/proceeding", "q4"],
    ["Refused a surety/fidelity bond", "q5"],
    ["Bankruptcy or unsatisfied judgments", "q6"],
    ["Debit balance/chargeback owed", "q7"],
    ["Contracted with another IMO/FMO", "q8"],
  ];

  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#F4F6FA;padding:20px;color:#1A202C;">
    <div style="max-width:760px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #E5E9F0;">
      <div style="background:#1E3A5F;color:#fff;padding:24px;">
        <div style="color:#E4B548;letter-spacing:2px;font-size:11px;font-weight:700;">THE FINANCIAL ARCHITECTS</div>
        <h1 style="margin:6px 0 0;font-size:22px;">New Agent Onboarding Application</h1>
        <div style="margin-top:6px;font-size:13px;opacity:.85;">Submitted ${esc(new Date(app.submitted_at || app.updated_at).toLocaleString("en-US"))}</div>
      </div>
      <div style="padding:20px;">
        ${section("01","Applicant Information",
          row("Full legal name", d.fullLegalName) +
          row("Preferred name", d.preferredName) +
          row("Date of birth", d.dateOfBirth) +
          row("SSN", d.ssn) +
          row("U.S. citizen / work authorization", d.citizenshipStatus) +
          row("Driver's license #", d.driversLicense) +
          row("Issuing state", d.driversLicenseState)
        )}
        ${section("02","Contact Information",
          row("Residential address", d.residentialAddress) +
          row("City / State / ZIP", [d.city, d.state, d.zip].filter(Boolean).join(", ")) +
          row("Mailing address", d.mailingAddress) +
          row("Mailing C/S/Z", d.mailingCityStateZip) +
          row("Mobile phone", d.mobilePhone) +
          row("Alternate phone", d.altPhone) +
          row("Email", d.email) +
          row("Preferred language", d.preferredLanguage) +
          row("Best time to contact", d.bestTimeToContact)
        )}
        ${section("03","Emergency Contact",
          row("Name", d.emergencyName) +
          row("Relationship", d.emergencyRelationship) +
          row("Phone", d.emergencyPhone) +
          row("Alternate phone", d.emergencyAltPhone)
        )}
        ${section("04","Licensing & Producer Information",
          row("National Producer Number (NPN)", d.npn) +
          row("Resident license state", d.residentLicenseState) +
          row("Years licensed", d.yearsLicensed) +
          row("# states licensed", d.numStatesLicensed)
        )}
        ${tableSection("04.1","State Licenses",["State","License #","Lines of authority","Expiration"],
          (d.stateLicenses ?? []).map((r: any) => [r.state, r.licenseNumber, r.linesOfAuthority, r.expiration])
        )}
        ${section("05","E&O Coverage",
          row("E&O carrier", d.eoCarrier) +
          row("Policy #", d.eoPolicyNumber) +
          row("Coverage amount", d.eoCoverageAmount) +
          row("Expiration", d.eoExpiration)
        )}
        ${link("E&O declaration page", eoUrl)}
        ${section("06","AML Certification & CE",
          row("AML provider", d.amlProvider) +
          row("Date completed", d.amlCompletedDate) +
          row("AML expiration", d.amlExpiration) +
          row("CE compliant?", d.ceCompliant)
        )}
        ${link("AML certificate", amlUrl)}
        ${section("07","Background & Compliance Disclosure",
          bgRows.map(([label, key]) => row(label as string, `${bg[key as string]?.answer ?? "—"}${bg[key as string]?.explanation ? " — " + bg[key as string].explanation : ""}`)).join("")
        )}
        ${tableSection("08","Employment & Industry History",["Company","Title","From","To","Reason for leaving"],
          (d.employment ?? []).map((r: any) => [r.company, r.title, r.from, r.to, r.reason])
        )}
        ${tableSection("09","Professional References",["Name","Relationship","Company","Phone / Email"],
          (d.references ?? []).map((r: any) => [r.name, r.relationship, r.company, r.contact])
        )}
        ${section("10","Sub-firm & Upline",
          row("Recruited by", d.recruitedBy) +
          row("Upline / mentor", d.upline) +
          row("Sub-firm", d.subFirm) +
          row("Referral source", d.referralSource)
        )}
        ${section("11","Education & Designations",
          row("Highest education", d.highestEducation) +
          row("School / institution", d.school) +
          row("Designations", d.designations)
        )}
        ${section("12","Commission Direct Deposit",
          row("Bank name", d.bankName) +
          row("Account type", d.accountType) +
          row("Routing #", d.routingNumber) +
          row("Account #", d.accountNumber) +
          row("Name on account", d.nameOnAccount)
        )}
        ${link("Voided check / direct deposit letter", bankUrl)}
        ${section("13","Tax Information",
          row("Tax classification", d.taxClassification) +
          row("Business / entity name", d.businessName) +
          row("EIN", d.ein)
        )}
        ${section("14","Authorization",
          row("Background check consent", d.authConsent ? "✓ Authorized" : "Not authorized")
        )}
        ${section("15","Certification & Signature",
          row("Signature", app.signature) +
          row("Signed at", app.signed_at ? new Date(app.signed_at).toLocaleString("en-US") : "—") +
          row("Printed name", d.printedName ?? d.fullLegalName) +
          row("NPN", d.signNpn ?? d.npn)
        )}
        <div style="margin-top:24px;padding:12px;background:#F4F6FA;border-radius:6px;font-size:11px;color:#666;text-align:center;letter-spacing:1px;text-transform:uppercase;">
          The Financial Architects · Confidential onboarding document · App ID ${esc(app.id)}
        </div>
      </div>
    </div>
  </body></html>`;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { applicationId, resumeToken } = parsed.data;

    const work = (async () => {
      const { data: app, error } = await supabaseAdmin
        .from("agent_onboarding_applications")
        .select("*")
        .eq("id", applicationId)
        .maybeSingle();
      if (error || !app) {
        console.error("Application not found", applicationId, error);
        return;
      }
      if (String(app.resume_token) !== resumeToken) {
        console.error("Resume token mismatch for application", applicationId);
        return;
      }

      const html = await buildHtml(app);
      const subject = `New Agent Onboarding Application — ${app.applicant_name ?? "Unknown"}`;

      const send = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: app.applicant_email ? [app.applicant_email] : undefined,
        subject,
        html,
      });
      if ((send as any).error) {
        console.error("Resend error", (send as any).error);
        return;
      }
      console.log("Notification sent", send);

      // Confirmation to applicant
      if (app.applicant_email) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [app.applicant_email],
          subject: "We received your TFA agent onboarding application",
          html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1A202C;">
            <div style="color:#E4B548;letter-spacing:2px;font-size:11px;font-weight:700;">THE FINANCIAL ARCHITECTS</div>
            <h2 style="color:#1E3A5F;margin:6px 0 16px;">Thank you, ${esc(app.applicant_name ?? "")}</h2>
            <p>We've received your agent onboarding application. Our contracting team will review it within 2 business days and reach out with next steps.</p>
            <p style="color:#555;font-size:12px;margin-top:24px;">Reference: ${esc(app.id)}</p>
          </div>`,
        });
      }

      await supabaseAdmin
        .from("agent_onboarding_applications")
        .update({ advisor_notification_sent_at: new Date().toISOString() })
        .eq("id", applicationId);
    })();

    // @ts-ignore EdgeRuntime is available in Deno deploy
    if (typeof EdgeRuntime !== "undefined") EdgeRuntime.waitUntil(work);
    else await work;

    return new Response(JSON.stringify({ ok: true }), {
      status: 202,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-agent-onboarding-notification error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});