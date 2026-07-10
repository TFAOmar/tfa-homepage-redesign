import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const esc = (v: unknown): string =>
  String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateMap = new Map<string, number[]>();
const limited = (k: string) => {
  const now = Date.now();
  const arr = (rateMap.get(k) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) { rateMap.set(k, arr); return true; }
  arr.push(now); rateMap.set(k, arr); return false;
};

const schema = z.object({
  applicantName: z.string().trim().min(1).max(120),
  applicantEmail: z.string().trim().email().max(255),
  applicantPhone: z.string().trim().min(1).max(40),
  formData: z.record(z.unknown()),
  advisorId: z.string().trim().max(120).optional(),
  advisorEmail: z.string().trim().email().max(255).optional(),
  advisorName: z.string().trim().max(120).optional(),
  sourceUrl: z.string().trim().max(2000).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  console.log("Prequalification notification function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(`ip:${ip}`)) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const parsedReq = schema.safeParse(await req.json());
    if (!parsedReq.success) {
      return new Response(
        JSON.stringify({ error: parsedReq.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }
    const requestData = parsedReq.data;
    console.log("Request data:", {
      applicantName: requestData.applicantName,
      advisorName: requestData.advisorName,
    });

    const {
      applicantName: rawApplicantName,
      applicantEmail: rawApplicantEmail,
      applicantPhone: rawApplicantPhone,
      formData,
      advisorEmail = "info@tfainsuranceadvisors.com",
      advisorName = "TFA Advisor",
      sourceUrl,
    } = requestData;
    const applicantName = esc(rawApplicantName);
    const applicantEmail = esc(rawApplicantEmail);
    const applicantPhone = esc(rawApplicantPhone);
    const advisorNameEsc = esc(advisorName);
    const sourceUrlEsc = sourceUrl ? esc(sourceUrl) : "";

    if (!rawApplicantName || !rawApplicantEmail || !formData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const step1 = (formData.step1 as Record<string, unknown>) || {};
    const step2 = (formData.step2 as Record<string, unknown>) || {};
    const step3 = (formData.step3 as Record<string, unknown>) || {};

    // ---------- Omar Sanchez Referral branch ----------
    const source = (formData.source as string | undefined) || "";
    if (source === "omar-referral") {
      const referrer = (formData.referrer as Record<string, unknown>) || {};
      const insured = (formData.insured as Record<string, unknown>) || {};
      const coverage = (formData.coverage as Record<string, unknown>) || {};
      const baseline = (formData.healthBaseline as Record<string, unknown>) || {};
      const history = (formData.healthHistory as Record<string, unknown>) || {};
      const lifestyle = (formData.lifestyle as Record<string, unknown>) || {};
      const consent = (formData.consent as Record<string, unknown>) || {};

      const referrerName = esc(referrer.fullName);
      const referrerEmail = esc(referrer.email);
      const referrerPhone = esc(referrer.phone);
      const referrerCompany = esc(referrer.company);
      const referrerType = esc(referrer.referrerType);

      // Yes-flagged conditions summary
      const yesFlagged: string[] = [];
      for (const [k, v] of Object.entries(history)) {
        if (v && typeof v === "object" && (v as Record<string, unknown>).yes === "Yes") {
          yesFlagged.push(k);
        }
      }

      const conditionRow = (label: string, cond: Record<string, unknown> | undefined) => {
        if (!cond || cond.yes !== "Yes") return "";
        const details: string[] = [];
        for (const [k, v] of Object.entries(cond)) {
          if (k === "yes" || !v) continue;
          details.push(`<div><span style="color:#666;">${esc(k)}:</span> ${esc(v)}</div>`);
        }
        return `<div style="margin-top:8px;padding:10px;background:#fff;border-left:3px solid #d4af37;border-radius:4px;">
          <strong>${esc(label)}</strong>${details.length ? `<div style="margin-top:4px;font-size:13px;">${details.join("")}</div>` : ""}
        </div>`;
      };

      const conditionBlocks = Object.entries(history)
        .filter(([, v]) => v && typeof v === "object" && (v as Record<string, unknown>).yes === "Yes")
        .map(([k, v]) => conditionRow(k, v as Record<string, unknown>))
        .join("");

      const medsList = Array.isArray(history.medications) && history.medications.length > 0
        ? (history.medications as Array<Record<string, unknown>>).map((m) =>
            `<li>${esc(m.name)} — ${esc(m.dose)} ${esc(m.frequency)} (${esc(m.condition)})</li>`).join("")
        : "<li>None reported</li>";

      const famList = Array.isArray(history.familyHistory) && history.familyHistory.length > 0
        ? (history.familyHistory as Array<Record<string, unknown>>).map((f) =>
            `<li>${esc(f.relative)} — ${esc(f.condition)} at age ${esc(f.ageAtDiagnosis)} (${esc(f.livingOrDeceased)})</li>`).join("")
        : "<li>None reported</li>";

      const clientName = esc(`${insured.firstName || ""} ${insured.lastName || ""}`.trim() || rawApplicantName);

      const omarHtml = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:Arial,sans-serif;line-height:1.6;color:#333;}
.container{max-width:640px;margin:0 auto;padding:20px;}
.header{background:#1E3A5F;color:#fff;padding:20px;text-align:center;border-radius:8px 8px 0 0;}
.header h1{margin:0;font-size:22px;}
.section{margin:14px 0;padding:14px;background:#f8f9fa;border-radius:8px;}
.section h3{margin:0 0 10px;color:#1E3A5F;border-bottom:2px solid #C9A84C;padding-bottom:6px;}
.referrer{background:#fff8e1;border:2px solid #C9A84C;}
.label{font-weight:bold;color:#666;}
table{width:100%;border-collapse:collapse;}
td{padding:5px 0;vertical-align:top;font-size:14px;}
.td-label{width:40%;}
.flag{background:#fff3cd;border:1px solid #ffc107;border-radius:6px;padding:12px;margin:12px 0;}
.footer{margin-top:16px;padding-top:12px;border-top:1px solid #ddd;font-size:12px;color:#666;}
ul{margin:4px 0 0 18px;padding:0;font-size:13px;}
</style></head><body>
<div class="container">
  <div class="header">
    <h1>New Referral Prequalification</h1>
    <p style="margin:6px 0 0;">Client: ${clientName} · Referred by ${referrerName}</p>
  </div>

  <div class="section referrer">
    <h3>🤝 Referring Partner</h3>
    <table>
      <tr><td class="td-label"><span class="label">Type:</span></td><td>${referrerType}</td></tr>
      <tr><td class="td-label"><span class="label">Name:</span></td><td>${referrerName}</td></tr>
      <tr><td class="td-label"><span class="label">Company:</span></td><td>${referrerCompany}</td></tr>
      <tr><td class="td-label"><span class="label">Email:</span></td><td>${referrerEmail}</td></tr>
      <tr><td class="td-label"><span class="label">Phone:</span></td><td>${referrerPhone}</td></tr>
      ${referrer.licenseNumber ? `<tr><td class="td-label"><span class="label">License #:</span></td><td>${esc(referrer.licenseNumber)}</td></tr>` : ""}
      ${referrer.npn ? `<tr><td class="td-label"><span class="label">NPN:</span></td><td>${esc(referrer.npn)}</td></tr>` : ""}
      ${referrer.relationshipToClient ? `<tr><td class="td-label"><span class="label">Relationship:</span></td><td>${esc(referrer.relationshipToClient)}</td></tr>` : ""}
      ${referrer.creditPreference ? `<tr><td class="td-label"><span class="label">Credit as:</span></td><td>${esc(referrer.creditPreference)}</td></tr>` : ""}
      ${referrer.notes ? `<tr><td class="td-label"><span class="label">Notes:</span></td><td>${esc(referrer.notes)}</td></tr>` : ""}
    </table>
  </div>

  <div class="section">
    <h3>👤 Proposed Insured</h3>
    <table>
      <tr><td class="td-label"><span class="label">Name:</span></td><td>${esc(insured.firstName)} ${esc(insured.lastName)}</td></tr>
      <tr><td class="td-label"><span class="label">DOB:</span></td><td>${esc(insured.dateOfBirth)}</td></tr>
      <tr><td class="td-label"><span class="label">Gender:</span></td><td>${esc(insured.gender)}</td></tr>
      <tr><td class="td-label"><span class="label">State / ZIP:</span></td><td>${esc(insured.stateOfResidence)} ${esc(insured.zip)}</td></tr>
      <tr><td class="td-label"><span class="label">Phone:</span></td><td>${esc(insured.phone)}</td></tr>
      <tr><td class="td-label"><span class="label">Email:</span></td><td>${esc(insured.email)}</td></tr>
      <tr><td class="td-label"><span class="label">Preferred contact:</span></td><td>${esc(insured.preferredContactMethod)} — ${esc(insured.preferredContactTime)}</td></tr>
      <tr><td class="td-label"><span class="label">Citizenship:</span></td><td>${esc(insured.citizenshipStatus)} ${insured.visaType ? `(Visa: ${esc(insured.visaType)})` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Occupation:</span></td><td>${esc(insured.occupation)} @ ${esc(insured.employer)}</td></tr>
      <tr><td class="td-label"><span class="label">Income / Net worth:</span></td><td>${esc(insured.annualIncome)} · ${esc(insured.netWorth)}</td></tr>
    </table>
  </div>

  <div class="section">
    <h3>📋 Coverage Requested</h3>
    <table>
      <tr><td class="td-label"><span class="label">Product interest:</span></td><td>${esc(Array.isArray(coverage.productInterest) ? (coverage.productInterest as string[]).join(", ") : "")}</td></tr>
      <tr><td class="td-label"><span class="label">Amount:</span></td><td>${esc(coverage.coverageAmount)}</td></tr>
      ${coverage.termLength ? `<tr><td class="td-label"><span class="label">Term length:</span></td><td>${esc(coverage.termLength)}</td></tr>` : ""}
      <tr><td class="td-label"><span class="label">Purpose:</span></td><td>${esc(Array.isArray(coverage.purpose) ? (coverage.purpose as string[]).join(", ") : "")}</td></tr>
      <tr><td class="td-label"><span class="label">Budget:</span></td><td>${esc(coverage.monthlyBudget)}</td></tr>
      <tr><td class="td-label"><span class="label">Urgency:</span></td><td>${esc(coverage.urgency)}</td></tr>
      <tr><td class="td-label"><span class="label">Existing coverage:</span></td><td>${esc(coverage.hasExistingCoverage)} ${coverage.existingCarrier ? `— ${esc(coverage.existingCarrier)} ${esc(coverage.existingAmount)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Replacement:</span></td><td>${esc(coverage.isReplacement)}</td></tr>
    </table>
  </div>

  <div class="section">
    <h3>📏 Health Baseline</h3>
    <table>
      <tr><td class="td-label"><span class="label">Height / Weight:</span></td><td>${esc(baseline.heightFeet)}'${esc(baseline.heightInches)}" · ${esc(baseline.weight)} lbs</td></tr>
      <tr><td class="td-label"><span class="label">Weight change 12mo:</span></td><td>${esc(baseline.weightChange12mo)} ${baseline.weightChangeAmount ? `— ${esc(baseline.weightChangeAmount)} lbs (${esc(baseline.weightChangeReason)})` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Physician:</span></td><td>${esc(baseline.physicianName)} · ${esc(baseline.physicianPhone)}</td></tr>
      <tr><td class="td-label"><span class="label">Last visit:</span></td><td>${esc(baseline.lastVisitDate)} — ${esc(baseline.lastVisitReason)}</td></tr>
      <tr><td class="td-label"><span class="label">Pending tests/surgery:</span></td><td>${esc(baseline.pendingTests)} ${baseline.pendingTestsDetails ? `— ${esc(baseline.pendingTestsDetails)}` : ""}</td></tr>
    </table>
  </div>

  ${yesFlagged.length > 0 ? `
  <div class="flag">
    <strong>⚠️ Underwriting Flags (${yesFlagged.length}):</strong>
    <div style="margin-top:6px;font-size:13px;">${esc(yesFlagged.join(", "))}</div>
  </div>` : ""}

  <div class="section">
    <h3>🏥 Health History (yes-flagged only)</h3>
    ${conditionBlocks || "<p style=\"color:#666;font-size:13px;\">No conditions flagged.</p>"}
  </div>

  <div class="section">
    <h3>💊 Current Medications</h3>
    <ul>${medsList}</ul>
  </div>

  <div class="section">
    <h3>🧬 Family History</h3>
    <ul>${famList}</ul>
  </div>

  <div class="section">
    <h3>🎯 Lifestyle & Risk</h3>
    <table>
      <tr><td class="td-label"><span class="label">Tobacco:</span></td><td>${esc(lifestyle.tobaccoUse)} ${lifestyle.tobaccoTypes ? `(${esc((lifestyle.tobaccoTypes as string[]).join(", "))})` : ""} ${lifestyle.tobaccoFrequency ? `· ${esc(lifestyle.tobaccoFrequency)}` : ""} ${lifestyle.tobaccoQuitDate ? `· quit ${esc(lifestyle.tobaccoQuitDate)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Marijuana:</span></td><td>${esc(lifestyle.marijuanaUse)} ${lifestyle.marijuanaFrequency ? `— ${esc(lifestyle.marijuanaFrequency)} (${esc(lifestyle.marijuanaMedicalRec)}, ${esc(lifestyle.marijuanaRoute)})` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">DUI:</span></td><td>${esc(lifestyle.duiHistory)} ${lifestyle.duiDetails ? `— ${esc(lifestyle.duiDetails)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Reckless driving:</span></td><td>${esc(lifestyle.recklessDriving)} ${lifestyle.recklessDetails ? `— ${esc(lifestyle.recklessDetails)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">License suspended:</span></td><td>${esc(lifestyle.licenseSuspended)} ${lifestyle.suspendedDetails ? `— ${esc(lifestyle.suspendedDetails)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Moving violations 5yr:</span></td><td>${esc(lifestyle.movingViolations5yr)}</td></tr>
      <tr><td class="td-label"><span class="label">Felony/misdemeanor:</span></td><td>${esc(lifestyle.felonyMisdemeanor)} ${lifestyle.felonyDetails ? `— ${esc(lifestyle.felonyDetails)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Probation/pending:</span></td><td>${esc(lifestyle.probationOrPending)} ${lifestyle.probationDetails ? `— ${esc(lifestyle.probationDetails)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Bankruptcy 7yr:</span></td><td>${esc(lifestyle.bankruptcy7yr)} ${lifestyle.bankruptcyDischargeDate ? `— discharged ${esc(lifestyle.bankruptcyDischargeDate)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Aviation:</span></td><td>${esc(lifestyle.aviation)} ${lifestyle.aviationHours ? `— ${esc(lifestyle.aviationHours)} hrs (${esc(lifestyle.aviationRatings)})` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Scuba:</span></td><td>${esc(lifestyle.scuba)} ${lifestyle.scubaMaxDepth ? `— max ${esc(lifestyle.scubaMaxDepth)}ft, ${esc(lifestyle.scubaDivesPerYear)}/yr` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Racing/climbing/skydiving/BASE/MMA:</span></td><td>${esc(lifestyle.racing)} / ${esc(lifestyle.climbing)} / ${esc(lifestyle.skydiving)} / ${esc(lifestyle.baseJumping)} / ${esc(lifestyle.mma)}</td></tr>
      <tr><td class="td-label"><span class="label">Foreign travel 12mo:</span></td><td>${esc(lifestyle.foreignTravel12mo)} ${lifestyle.foreignTravelCountries ? `— ${esc(lifestyle.foreignTravelCountries)}` : ""}</td></tr>
      <tr><td class="td-label"><span class="label">Military:</span></td><td>${esc(lifestyle.militaryStatus)} ${lifestyle.deploymentPlans === "Yes" ? `· deployment pending: ${esc(lifestyle.deploymentDetails)}` : ""}</td></tr>
    </table>
  </div>

  <div class="section">
    <h3>✍️ Consent</h3>
    <p style="font-size:13px;">Signature: <strong>${esc(consent.signature)}</strong> · Signed ${esc(consent.signedDate)}</p>
  </div>

  <div class="footer">
    <p>Submitted: ${new Date().toLocaleString()}</p>
    ${sourceUrlEsc ? `<p>Source: ${sourceUrlEsc}</p>` : ""}
    <p>Reply directly to reach the referring partner: ${referrerEmail}</p>
  </div>
</div>
</body></html>`;

      const omarTo = ["omar@tfainsuranceadvisors.com"];
      const omarCc = ["miguelina@tfainsuranceadvisors.com"];

      console.log("Sending Omar referral notification to:", omarTo, "CC:", omarCc);
      const { error: omarErr } = await resend.emails.send({
        from: "TFA Referrals <noreply@tfainsuranceadvisors.com>",
        to: omarTo,
        cc: omarCc,
        reply_to: referrer.email ? String(referrer.email) : undefined,
        subject: `New Referral Prequalification – ${String(insured.firstName || "")} ${String(insured.lastName || "")} (from ${String(referrer.fullName || "referral partner")})`,
        html: omarHtml,
      });
      if (omarErr) console.error("Omar referral email error:", omarErr);

      // Confirmation to referring partner
      if (referrer.email) {
        try {
          await resend.emails.send({
            from: "TFA Referrals <noreply@tfainsuranceadvisors.com>",
            to: [String(referrer.email)],
            subject: `Referral received – Omar Sanchez will follow up on ${String(insured.firstName || "your client")}`,
            html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:20px;">
              <h2 style="color:#1E3A5F;">Thank you, ${esc(String(referrer.fullName || "").split(" ")[0])}!</h2>
              <p>Omar Sanchez has received your referral prequalification for <strong>${clientName}</strong> and will begin reviewing it right away.</p>
              <p>He'll reach out to the client within 1–2 business days and keep you posted.</p>
              <p style="margin-top:16px;">Questions? Reply to this email or call Omar at <a href="tel:+18883505396">(888) 350-5396</a>.</p>
              <p style="color:#666;font-size:12px;margin-top:20px;">© ${new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
            </div>`,
          });
        } catch (e) { console.error("Referrer confirmation email error:", e); }
      }

      return new Response(
        JSON.stringify({ success: true, message: "Referral submitted" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    // ---------- End Omar referral branch ----------

    const medicalConditions = (step2.medicalConditions as string[]) || [];
    const conditionsSummary = medicalConditions.length > 0 ? esc(medicalConditions.join(", ")) : "None reported";
    const conditionDetails = (step2.conditionDetails as Record<string, Record<string, string>>) || {};

    const conditionDetailsHtml = medicalConditions.length > 0
      ? medicalConditions.map((cond) => {
          const details = conditionDetails[cond] || {};
          const rows = Object.entries(details)
            .filter(([, v]) => v && String(v).trim() !== "")
            .map(([k, v]) => `<tr><td class="td-label"><span class="label">${esc(k)}:</span></td><td>${esc(v)}</td></tr>`)
            .join("");
          if (!rows) {
            return `<div style="margin-top:10px;padding:10px;background:#fff;border-left:3px solid #d4af37;border-radius:4px;"><strong>${esc(cond)}</strong><div style="font-size:12px;color:#888;">No additional details provided</div></div>`;
          }
          return `<div style="margin-top:10px;padding:10px;background:#fff;border-left:3px solid #d4af37;border-radius:4px;"><strong>${esc(cond)}</strong><table style="width:100%;margin-top:6px;">${rows}</table></div>`;
        }).join("")
      : "";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .section { margin: 16px 0; padding: 16px; background: #f8f9fa; border-radius: 8px; }
          .section h3 { margin-top: 0; color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 8px; }
          .label { font-weight: bold; color: #666; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 6px 0; vertical-align: top; }
          .td-label { width: 45%; }
          .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .flag { background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 12px; margin: 12px 0; }
          .flag-red { background: #f8d7da; border: 1px solid #f5c6cb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">New Life Insurance Pre-Qualification</h1>
            <p style="margin:8px 0 0;">Advisor: ${advisorNameEsc}</p>
          </div>

          <div class="section">
            <h3>👤 Personal Information</h3>
            <table>
              <tr><td class="td-label"><span class="label">Name:</span></td><td>${applicantName}</td></tr>
              <tr><td class="td-label"><span class="label">Date of Birth:</span></td><td>${esc(step1.dateOfBirth) || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Gender:</span></td><td>${esc(step1.gender) || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Phone:</span></td><td>${applicantPhone}</td></tr>
              <tr><td class="td-label"><span class="label">Email:</span></td><td>${applicantEmail}</td></tr>
              <tr><td class="td-label"><span class="label">State:</span></td><td>${esc(step1.stateOfResidence) || "N/A"}</td></tr>
            </table>
          </div>

          <div class="section">
            <h3>🏥 Health & Lifestyle</h3>
            <table>
              <tr><td class="td-label"><span class="label">Height:</span></td><td>${esc(step2.heightFeet) || ""}' ${esc(step2.heightInches) || ""}"</td></tr>
              <tr><td class="td-label"><span class="label">Weight:</span></td><td>${esc(step2.weight) || "N/A"} lbs</td></tr>
              <tr><td class="td-label"><span class="label">Tobacco Use:</span></td><td>${esc(step2.tobaccoUse) || "N/A"}</td></tr>
              ${step2.tobaccoFrequency ? `<tr><td class="td-label"><span class="label">Tobacco Details:</span></td><td>${esc(step2.tobaccoFrequency)}</td></tr>` : ""}
              <tr><td class="td-label"><span class="label">Medical Conditions:</span></td><td>${conditionsSummary}</td></tr>
              <tr><td class="td-label"><span class="label">Medications:</span></td><td>${esc(step2.takingMedications) || "N/A"}</td></tr>
              ${step2.medicationDetails ? `<tr><td class="td-label"><span class="label">Medication Details:</span></td><td>${esc(step2.medicationDetails)}</td></tr>` : ""}
              <tr><td class="td-label"><span class="label">Hospitalized (5yr):</span></td><td>${esc(step2.hospitalizedPast5Years) || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Family History:</span></td><td>${esc(step2.familyHistoryHeartCancer) || "N/A"}</td></tr>
            </table>
            ${conditionDetailsHtml ? `<div style="margin-top:12px;"><h4 style="margin:0 0 4px;color:#1a365d;">Condition-Specific Details</h4>${conditionDetailsHtml}</div>` : ""}
          </div>

          ${medicalConditions.length > 0 || step2.tobaccoUse === "Yes" || step2.hospitalizedPast5Years === "Yes" ? `
          <div class="flag${medicalConditions.length > 2 ? " flag-red" : ""}">
            <strong>⚠️ Review Notes:</strong>
            <ul style="margin:8px 0 0;padding-left:20px;">
              ${step2.tobaccoUse === "Yes" ? "<li>Active tobacco/nicotine user</li>" : ""}
              ${step2.hospitalizedPast5Years === "Yes" ? "<li>Hospitalized or surgery in past 5 years</li>" : ""}
              ${medicalConditions.length > 0 ? `<li>${medicalConditions.length} medical condition(s) reported</li>` : ""}
              ${step2.familyHistoryHeartCancer === "Yes" ? "<li>Family history of heart disease/cancer before 60</li>" : ""}
            </ul>
          </div>
          ` : ""}

          <div class="section">
            <h3>📋 Coverage Needs</h3>
            <table>
              <tr><td class="td-label"><span class="label">Coverage Amount:</span></td><td>${esc(step3.coverageAmount) || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Coverage Type:</span></td><td>${esc(step3.coverageType) || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Monthly Budget:</span></td><td>${esc(step3.monthlyBudget) || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Existing Insurance:</span></td><td>${esc(step3.hasExistingInsurance) || "N/A"}</td></tr>
              ${step3.existingCarrier ? `<tr><td class="td-label"><span class="label">Current Carrier:</span></td><td>${esc(step3.existingCarrier)}</td></tr>` : ""}
              ${step3.existingAmount ? `<tr><td class="td-label"><span class="label">Current Amount:</span></td><td>${esc(step3.existingAmount)}</td></tr>` : ""}
              <tr><td class="td-label"><span class="label">Purpose:</span></td><td>${esc(step3.purposeOfCoverage) || "N/A"}</td></tr>
            </table>
          </div>

          <div class="footer">
            <p>Submitted: ${new Date().toLocaleString()}</p>
            ${sourceUrlEsc ? `<p>Source: ${sourceUrlEsc}</p>` : ""}
            <p>This pre-qualification was submitted through the TFA website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "TFA Life Insurance <noreply@tfainsuranceadvisors.com>",
        to: [rawApplicantEmail],
        subject: `Pre-Qualification Received - ${advisorName} will be in touch`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">
            <h2 style="color:#1a365d;">Thank You, ${esc(rawApplicantName.split(" ")[0])}!</h2>
            <p>We've received your life insurance pre-qualification questionnaire. ${advisorNameEsc} will review your information and reach out within 1-2 business days to discuss your options.</p>
            <p>If you have any immediate questions, feel free to call us at <a href="tel:+18883505396">(888) 350-5396</a>.</p>
            <p style="color:#666;font-size:12px;margin-top:20px;">© ${new Date().getFullYear()} TFA Group. All rights reserved.</p>
          </div>
        `,
      });
      console.log("Confirmation email sent to applicant");
    } catch (confirmErr) {
      console.error("Confirmation email error (non-blocking):", confirmErr);
    }

    // Send notification to advisor + admin
    console.log("Sending notification to:", advisorEmail, "CC: clients@tfainsuranceadvisors.com");
    const { error: emailError } = await resend.emails.send({
      from: "TFA Life Insurance <noreply@tfainsuranceadvisors.com>",
      to: [advisorEmail],
      cc: ["clients@tfainsuranceadvisors.com"],
      subject: `New Pre-Qualification - ${rawApplicantName} (Advisor: ${advisorName})`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Email error:", emailError);
    } else {
      console.log("Notification email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Pre-qualification submitted" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
