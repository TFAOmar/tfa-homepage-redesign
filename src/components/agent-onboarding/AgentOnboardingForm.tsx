import SmsConsentCheckbox, { SMS_CONSENT_TEXT_VERSION } from "@/components/forms/SmsConsentCheckbox";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import {
  AgentOnboardingFormData,
  initialFormData,
  SECTION_TITLES,
} from "@/types/agentOnboardingApplication";
import { FileUploadField } from "./FileUploadField";
import { CheckCircle2, Loader2, Save } from "lucide-react";

const NAVY = "#1E3A5F";
const GOLD = "#E4B548";

/* ---------- small primitives ---------- */
const Label = ({
  children,
  required,
  className = "",
}: {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) => (
  <span className={`block text-[11px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-1 ${className}`}>
    {children} {required && <span style={{ color: GOLD }}>*</span>}
  </span>
);

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full h-10 px-3 text-sm bg-white border border-[#D8DEE7] rounded-md focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F]/20 ${className}`}
  />
);

const Textarea = ({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 text-sm bg-white border border-[#D8DEE7] rounded-md focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F]/20 ${className}`}
  />
);

const Select = ({ className = "", children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={`w-full h-10 px-3 text-sm bg-white border border-[#D8DEE7] rounded-md focus:outline-none focus:border-[#1E3A5F] ${className}`}
  >
    {children}
  </select>
);

const SectionHeader = ({
  num,
  title,
  help,
  showHelp,
}: {
  num: string;
  title: string;
  help?: string;
  showHelp: boolean;
}) => (
  <div className="mb-5">
    <div className="flex items-baseline gap-3">
      <span
        className="text-2xl font-bold leading-none"
        style={{ color: GOLD, letterSpacing: "-0.02em" }}
      >
        {num}
      </span>
      <h2 className="text-lg font-bold tracking-tight" style={{ color: NAVY }}>
        {title}
      </h2>
    </div>
    {help && showHelp && (
      <p className="mt-2 ml-10 text-xs text-[#475467] italic leading-relaxed">{help}</p>
    )}
  </div>
);

/* ---------- main form ---------- */
export const AgentOnboardingForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { honeypotProps, isBot } = useHoneypot();

  const [data, setData] = useState<AgentOnboardingFormData>(initialFormData);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const set = <K extends keyof AgentOnboardingFormData>(
    key: K,
    value: AgentOnboardingFormData[K],
  ) => setData((d) => ({ ...d, [key]: value }));

  /* ---- Load existing draft or create new ---- */
  useEffect(() => {
    (async () => {
      const tokenFromUrl = params.get("token");
      try {
        if (tokenFromUrl) {
          const { data: rows, error } = await supabase.rpc("get_agent_onboarding_by_token", {
            p_resume_token: tokenFromUrl,
          });
          if (error) throw error;
          const row = (rows as any[])?.[0];
          if (row) {
            setApplicationId(row.id);
            setResumeToken(tokenFromUrl);
            setData({ ...initialFormData, ...(row.form_data ?? {}) });
            setLoading(false);
            return;
          }
        }
        // Create new draft (SECURITY DEFINER RPC returns id + resume_token
        // without exposing SELECT access to the underlying table)
        const { data: draft, error } = await supabase
          .rpc("create_agent_onboarding_draft");
        if (error) throw error;
        const row = Array.isArray(draft) ? draft[0] : draft;
        if (!row) throw new Error("Failed to create draft");
        setApplicationId(row.id);
        setResumeToken(row.resume_token);
      } catch (err: any) {
        toast({
          title: "Couldn't start application",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Autosave (debounced) ---- */
  const lastSaved = useRef<string>("");
  const saveTimer = useRef<number | null>(null);
  const persist = useCallback(async () => {
    if (!resumeToken) return;
    const json = JSON.stringify(data);
    if (json === lastSaved.current) return;
    setSaving(true);
    try {
      await supabase.rpc("update_agent_onboarding_by_token", {
        p_resume_token: resumeToken,
        p_form_data: data as any,
        p_current_section: activeSection + 1,
        p_applicant_name: data.fullLegalName || null,
        p_applicant_email: data.email || null,
        p_applicant_phone: data.mobilePhone || null,
      });
      lastSaved.current = json;
    } catch (err) {
      console.error("autosave error", err);
    } finally {
      setSaving(false);
    }
  }, [data, resumeToken, activeSection]);

  useEffect(() => {
    if (loading) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(persist, 1500);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [data, loading, persist]);

  /* ---- Progress ---- */
  const progress = useMemo(() => {
    let filled = 0;
    const checks = [
      !!data.fullLegalName, !!data.dateOfBirth, !!data.ssn, !!data.citizenshipStatus,
      !!data.residentialAddress, !!data.city, !!data.state, !!data.zip, !!data.mobilePhone, !!data.email,
      !!data.npn, !!data.residentLicenseState,
      !!data.eoCarrier, !!data.eoPolicyNumber, !!data.eoExpiration,
      Object.values(data.backgroundDisclosure).every(q => q.answer !== ""),
      data.references.some(r => r.name && r.contact),
      data.authConsent, data.certifyTrue, !!data.signature,
    ];
    filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  }, [data]);

  /* ---- Submit ---- */
  const handleSubmit = async () => {
    if (isBot()) return;
    if (!applicationId) return;

    const required: Array<[boolean, string]> = [
      [!!data.fullLegalName, "Full legal name"],
      [!!data.dateOfBirth, "Date of birth"],
      [!!data.ssn, "Social security number"],
      [!!data.citizenshipStatus, "U.S. citizen / work authorization"],
      [!!data.residentialAddress, "Residential address"],
      [!!data.city, "City"],
      [!!data.state, "State"],
      [!!data.zip, "ZIP"],
      [!!data.mobilePhone, "Mobile phone"],
      [/.+@.+\..+/.test(data.email), "Valid email"],
      [!!data.npn, "NPN"],
      [!!data.residentLicenseState, "Resident license state"],
      [!!data.eoCarrier, "E&O carrier"],
      [!!data.eoPolicyNumber, "E&O policy number"],
      [!!data.eoExpiration, "E&O expiration"],
      [Object.values(data.backgroundDisclosure).every(q => q.answer !== ""), "All 8 background questions"],
      [data.authConsent, "Authorization checkbox"],
      [data.certifyTrue, "Certification checkbox"],
      [!!data.signature.trim(), "Typed signature"],
    ];
    const missing = required.filter(([ok]) => !ok).map(([, label]) => label);
    if (missing.length) {
      toast({
        title: "Missing required information",
        description: missing.slice(0, 4).join(", ") + (missing.length > 4 ? "…" : ""),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await persist();
      if (!resumeToken) throw new Error("Missing resume token");
      const { error: submitErr } = await supabase.rpc("submit_agent_onboarding_application", {
        p_application_id: applicationId,
        p_resume_token: resumeToken,
        p_signature: data.signature.trim(),
      });
      if (submitErr) throw submitErr;

      try {
        await supabase.functions.invoke("send-agent-onboarding-notification", {
          body: { applicationId, resumeToken },
        });
      } catch (err) {
        console.error("Notification dispatch failed (will be retried by cron)", err);
      }

      navigate("/thank-you?context=agent-onboarding");
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message,
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  const scrollToSection = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(i);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  /* =============== render =============== */
  return (
    <div className="min-h-screen" style={{ background: "#F4F6FA", fontFamily: "Inter, sans-serif" }}>
      {/* Hero */}
      <header style={{ background: NAVY }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
          <div className="text-[11px] font-bold tracking-[0.2em]" style={{ color: GOLD }}>
            THE FINANCIAL ARCHITECTS
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight">
            New agent onboarding{" "}
            <span style={{ color: GOLD }}>application</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 leading-relaxed">
            Welcome to The Financial Architects. Please complete every section accurately and in full.
            Fields marked with an asterisk <span style={{ color: GOLD }}>*</span> are required for
            contracting. All information is held in strict confidence and used solely for onboarding,
            contracting, and compliance purposes.
          </p>
          {resumeToken && (
            <p className="mt-4 text-xs text-white/60">
              Your application is automatically saved as you type. You can return later using this link:{" "}
              <code className="text-white/80 bg-white/10 px-2 py-1 rounded">
                {`${window.location.origin}/agent-onboarding-application?token=${resumeToken}`}
              </code>
            </p>
          )}
        </div>
      </header>

      {/* Sticky progress bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#D8DEE7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-4">
          <div className="flex-1 h-2 bg-[#EEF2F6] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progress}%`, background: GOLD }}
            />
          </div>
          <span className="text-xs font-bold" style={{ color: NAVY }}>
            {progress}% complete
          </span>
          <span className="text-xs text-[#98A2B3] hidden sm:flex items-center gap-1">
            {saving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="w-3 h-3" /> Saved
              </>
            )}
          </span>
          <label className="text-xs text-[#475467] flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showHelp}
              onChange={(e) => setShowHelp(e.target.checked)}
            />
            Show help
          </label>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 grid lg:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar nav */}
        <nav className="hidden lg:block sticky top-20 self-start">
          <ol className="space-y-1 text-xs">
            {SECTION_TITLES.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  onClick={() => scrollToSection(i)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-baseline gap-2 ${
                    activeSection === i
                      ? "bg-[#1E3A5F] text-white"
                      : "hover:bg-[#EEF2F6] text-[#475467]"
                  }`}
                >
                  <span style={{ color: activeSection === i ? GOLD : GOLD }}>{s.num}</span>
                  <span className="text-[11px] leading-tight">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Form sections */}
        <main className="space-y-6">
          {/* honeypot */}
          <input type="text" name="company_url" className={honeypotClassName} {...honeypotProps} />

          {/* 1. APPLICANT */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[0] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="01" title="Applicant information" help={SECTION_TITLES[0].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label required>Full legal name</Label>
                <Input value={data.fullLegalName} onChange={(e) => set("fullLegalName", e.target.value)} />
              </div>
              <div><Label>Preferred name</Label>
                <Input value={data.preferredName} onChange={(e) => set("preferredName", e.target.value)} /></div>
              <div><Label required>Date of birth</Label>
                <Input type="date" value={data.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} /></div>
              <div><Label required>Social security no.</Label>
                <Input placeholder="XXX-XX-XXXX" value={data.ssn} onChange={(e) => set("ssn", e.target.value)} /></div>
              <div><Label required>U.S. citizen / work authorization</Label>
                <Select value={data.citizenshipStatus} onChange={(e) => set("citizenshipStatus", e.target.value)}>
                  <option value="">Select…</option>
                  <option>U.S. Citizen</option>
                  <option>Permanent Resident</option>
                  <option>Work Visa</option>
                  <option>Other</option>
                </Select></div>
              <div><Label>Driver's license no.</Label>
                <Input value={data.driversLicense} onChange={(e) => set("driversLicense", e.target.value)} /></div>
              <div><Label>Issuing state</Label>
                <Input maxLength={2} value={data.driversLicenseState} onChange={(e) => set("driversLicenseState", e.target.value.toUpperCase())} /></div>
            </div>
          </section>

          {/* 2. CONTACT */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[1] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="02" title="Contact information" help={SECTION_TITLES[1].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="sm:col-span-4"><Label required>Residential address</Label>
                <Input value={data.residentialAddress} onChange={(e) => set("residentialAddress", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label required>City</Label>
                <Input value={data.city} onChange={(e) => set("city", e.target.value)} /></div>
              <div><Label required>State</Label>
                <Input maxLength={2} value={data.state} onChange={(e) => set("state", e.target.value.toUpperCase())} /></div>
              <div><Label required>ZIP</Label>
                <Input value={data.zip} onChange={(e) => set("zip", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label>Mailing address (if different)</Label>
                <Input value={data.mailingAddress} onChange={(e) => set("mailingAddress", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label>City / State / ZIP</Label>
                <Input value={data.mailingCityStateZip} onChange={(e) => set("mailingCityStateZip", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label required>Mobile phone</Label>
                <Input type="tel" value={data.mobilePhone} onChange={(e) => set("mobilePhone", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label>Alternate phone</Label>
                <Input type="tel" value={data.altPhone} onChange={(e) => set("altPhone", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label required>Email address</Label>
                <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label>Preferred language</Label>
                <Input value={data.preferredLanguage} onChange={(e) => set("preferredLanguage", e.target.value)} /></div>
              <div className="sm:col-span-4"><Label>Best time to contact</Label>
                <Input value={data.bestTimeToContact} onChange={(e) => set("bestTimeToContact", e.target.value)} /></div>
            </div>
          </section>

          {/* 3. EMERGENCY */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[2] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="03" title="Emergency contact" help={SECTION_TITLES[2].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full name</Label>
                <Input value={data.emergencyName} onChange={(e) => set("emergencyName", e.target.value)} /></div>
              <div><Label>Relationship</Label>
                <Input value={data.emergencyRelationship} onChange={(e) => set("emergencyRelationship", e.target.value)} /></div>
              <div><Label>Phone number</Label>
                <Input type="tel" value={data.emergencyPhone} onChange={(e) => set("emergencyPhone", e.target.value)} /></div>
              <div><Label>Alternate phone</Label>
                <Input type="tel" value={data.emergencyAltPhone} onChange={(e) => set("emergencyAltPhone", e.target.value)} /></div>
            </div>
          </section>

          {/* 4. LICENSING */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[3] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="04" title="Licensing & producer information" help={SECTION_TITLES[3].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><Label required>National producer number (NPN)</Label>
                <Input value={data.npn} onChange={(e) => set("npn", e.target.value)} /></div>
              <div><Label required>Resident license state</Label>
                <Input maxLength={2} value={data.residentLicenseState} onChange={(e) => set("residentLicenseState", e.target.value.toUpperCase())} /></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr className="text-left">
                  <th className="p-2 bg-[#F4F6FA] border border-[#E5E9F0] font-semibold text-[#1E3A5F]">State</th>
                  <th className="p-2 bg-[#F4F6FA] border border-[#E5E9F0] font-semibold text-[#1E3A5F]">License #</th>
                  <th className="p-2 bg-[#F4F6FA] border border-[#E5E9F0] font-semibold text-[#1E3A5F]">Lines of authority</th>
                  <th className="p-2 bg-[#F4F6FA] border border-[#E5E9F0] font-semibold text-[#1E3A5F]">Expiration</th>
                </tr></thead>
                <tbody>
                  {data.stateLicenses.map((row, i) => (
                    <tr key={i}>
                      {(["state","licenseNumber","linesOfAuthority","expiration"] as const).map((k) => (
                        <td key={k} className="border border-[#E5E9F0] p-1">
                          <input
                            value={(row as any)[k]}
                            onChange={(e) => {
                              const next = [...data.stateLicenses];
                              (next[i] as any)[k] = e.target.value;
                              set("stateLicenses", next);
                            }}
                            className="w-full px-2 py-1 text-xs focus:outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={() => set("stateLicenses", [...data.stateLicenses, { state:"", licenseNumber:"", linesOfAuthority:"", expiration:"" }])}
                className="mt-2 text-xs font-semibold text-[#1E3A5F] hover:underline"
              >+ Add row</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div><Label>Years licensed in insurance</Label>
                <Input value={data.yearsLicensed} onChange={(e) => set("yearsLicensed", e.target.value)} /></div>
              <div><Label>Number of states licensed</Label>
                <Input value={data.numStatesLicensed} onChange={(e) => set("numStatesLicensed", e.target.value)} /></div>
            </div>
          </section>

          {/* 5. E&O */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[4] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="05" title="Errors & omissions (E&O) coverage" help={SECTION_TITLES[4].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><Label required>E&O carrier</Label>
                <Input value={data.eoCarrier} onChange={(e) => set("eoCarrier", e.target.value)} /></div>
              <div><Label required>Policy number</Label>
                <Input value={data.eoPolicyNumber} onChange={(e) => set("eoPolicyNumber", e.target.value)} /></div>
              <div><Label>Coverage amount</Label>
                <Input value={data.eoCoverageAmount} onChange={(e) => set("eoCoverageAmount", e.target.value)} /></div>
              <div><Label required>Expiration date</Label>
                <Input type="date" value={data.eoExpiration} onChange={(e) => set("eoExpiration", e.target.value)} /></div>
            </div>
            <FileUploadField
              label="a copy of your current E&O declaration page."
              applicationId={applicationId}
              field="eo-dec"
              currentName={data.eoDeclarationName}
              currentPath={data.eoDeclarationPath}
              onUploaded={(path, name) => setData((d) => ({ ...d, eoDeclarationPath: path, eoDeclarationName: name }))}
              onCleared={() => setData((d) => ({ ...d, eoDeclarationPath: undefined, eoDeclarationName: undefined }))}
            />
          </section>

          {/* 6. AML */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[5] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="06" title="AML certification & continuing education" help={SECTION_TITLES[5].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><Label>AML provider</Label>
                <Input value={data.amlProvider} onChange={(e) => set("amlProvider", e.target.value)} /></div>
              <div><Label>Date completed</Label>
                <Input type="date" value={data.amlCompletedDate} onChange={(e) => set("amlCompletedDate", e.target.value)} /></div>
              <div><Label>AML expiration</Label>
                <Input type="date" value={data.amlExpiration} onChange={(e) => set("amlExpiration", e.target.value)} /></div>
              <div><Label>CE compliant?</Label>
                <Select value={data.ceCompliant} onChange={(e) => set("ceCompliant", e.target.value)}>
                  <option value="">Select…</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>N/A</option>
                </Select></div>
            </div>
            <FileUploadField
              label="a copy of your current AML certificate."
              applicationId={applicationId}
              field="aml-cert"
              currentName={data.amlCertificateName}
              currentPath={data.amlCertificatePath}
              onUploaded={(path, name) => setData((d) => ({ ...d, amlCertificatePath: path, amlCertificateName: name }))}
              onCleared={() => setData((d) => ({ ...d, amlCertificatePath: undefined, amlCertificateName: undefined }))}
            />
          </section>

          {/* 7. BACKGROUND */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[6] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="07" title="Background & compliance disclosure" help={SECTION_TITLES[6].help} showHelp={showHelp} />
            <div className="space-y-5">
              {[
                "Have you ever been convicted of, pled guilty to, or pled no contest to any felony or misdemeanor (excluding minor traffic violations)?",
                "Has any insurance or securities license issued to you ever been declined, suspended, revoked, canceled, or non-renewed?",
                "Have you ever been terminated, permitted to resign, or had a contract canceled by an insurance company, IMO, FMO, or broker-dealer for alleged misconduct or violation of company policy?",
                "Are you currently the subject of any complaint, investigation, or proceeding by any insurance department, regulatory body, or other authority?",
                "Have you ever been refused a surety or fidelity bond?",
                "Have you ever filed for personal or business bankruptcy, or do you currently have any unsatisfied judgments or liens against you?",
                "Do you currently owe any debit balance, chargeback, or other indebtedness to any insurance carrier, IMO, or FMO?",
                "Are you currently contracted or appointed with any other IMO, FMO, or agency for the lines of business you intend to write through The Financial Architects?",
              ].map((qText, idx) => {
                const key = `q${idx + 1}` as keyof typeof data.backgroundDisclosure;
                const ans = data.backgroundDisclosure[key];
                return (
                  <div key={key} className="border-b border-[#EEF2F6] pb-4 last:border-b-0">
                    <p className="text-sm text-[#1A202C] leading-snug">
                      <span className="font-bold mr-2" style={{ color: GOLD }}>{idx + 1}.</span>
                      {qText}
                    </p>
                    <div className="flex gap-4 mt-2 ml-6 text-sm">
                      {(["yes","no"] as const).map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={key}
                            checked={ans.answer === opt}
                            onChange={() => setData((d) => ({
                              ...d,
                              backgroundDisclosure: { ...d.backgroundDisclosure, [key]: { ...ans, answer: opt } },
                            }))}
                          />
                          <span className="capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {ans.answer === "yes" && (
                      <div className="mt-3 ml-6">
                        <Label required>If yes, please explain</Label>
                        <Textarea
                          rows={3}
                          value={ans.explanation}
                          onChange={(e) => setData((d) => ({
                            ...d,
                            backgroundDisclosure: { ...d.backgroundDisclosure, [key]: { ...ans, explanation: e.target.value } },
                          }))}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 8. EMPLOYMENT */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[7] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="08" title="Employment & industry history" help={SECTION_TITLES[7].help} showHelp={showHelp} />
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr>
                  {["Company / agency","Title / role","From","To","Reason for leaving"].map(h => (
                    <th key={h} className="text-left p-2 bg-[#F4F6FA] border border-[#E5E9F0] font-semibold text-[#1E3A5F]">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {data.employment.map((row, i) => (
                    <tr key={i}>
                      {(["company","title","from","to","reason"] as const).map(k => (
                        <td key={k} className="border border-[#E5E9F0] p-1">
                          <input
                            value={(row as any)[k]}
                            onChange={(e) => {
                              const next = [...data.employment];
                              (next[i] as any)[k] = e.target.value;
                              set("employment", next);
                            }}
                            className="w-full px-2 py-1 text-xs focus:outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={() => set("employment", [...data.employment, { company:"", title:"", from:"", to:"", reason:"" }])}
                className="mt-2 text-xs font-semibold text-[#1E3A5F] hover:underline"
              >+ Add row</button>
            </div>
          </section>

          {/* 9. REFERENCES */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[8] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="09" title="Professional references" help={SECTION_TITLES[8].help} showHelp={showHelp} />
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr>
                  {["Full name","Relationship","Company","Phone / email"].map(h => (
                    <th key={h} className="text-left p-2 bg-[#F4F6FA] border border-[#E5E9F0] font-semibold text-[#1E3A5F]">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {data.references.map((row, i) => (
                    <tr key={i}>
                      {(["name","relationship","company","contact"] as const).map(k => (
                        <td key={k} className="border border-[#E5E9F0] p-1">
                          <input
                            value={(row as any)[k]}
                            onChange={(e) => {
                              const next = [...data.references];
                              (next[i] as any)[k] = e.target.value;
                              set("references", next);
                            }}
                            className="w-full px-2 py-1 text-xs focus:outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={() => set("references", [...data.references, { name:"", relationship:"", company:"", contact:"" }])}
                className="mt-2 text-xs font-semibold text-[#1E3A5F] hover:underline"
              >+ Add row</button>
            </div>
          </section>

          {/* 10. SUB-FIRM */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[9] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="10" title="Sub-firm & upline information" help={SECTION_TITLES[9].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Recruited by</Label>
                <Input value={data.recruitedBy} onChange={(e) => set("recruitedBy", e.target.value)} /></div>
              <div><Label>Upline / mentor</Label>
                <Input value={data.upline} onChange={(e) => set("upline", e.target.value)} /></div>
              <div><Label>Sub-firm</Label>
                <Input value={data.subFirm} onChange={(e) => set("subFirm", e.target.value)} /></div>
              <div><Label>Referral source</Label>
                <Input value={data.referralSource} onChange={(e) => set("referralSource", e.target.value)} /></div>
            </div>
          </section>

          {/* 11. EDUCATION */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[10] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="11" title="Education & professional designations" help={SECTION_TITLES[10].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>Highest education</Label>
                <Input value={data.highestEducation} onChange={(e) => set("highestEducation", e.target.value)} /></div>
              <div><Label>School / institution</Label>
                <Input value={data.school} onChange={(e) => set("school", e.target.value)} /></div>
              <div><Label>Designations</Label>
                <Input value={data.designations} onChange={(e) => set("designations", e.target.value)} /></div>
            </div>
          </section>

          {/* 12. DIRECT DEPOSIT */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[11] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="12" title="Commission direct deposit" help={SECTION_TITLES[11].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><Label>Bank name</Label>
                <Input value={data.bankName} onChange={(e) => set("bankName", e.target.value)} /></div>
              <div><Label>Account type</Label>
                <Select value={data.accountType} onChange={(e) => set("accountType", e.target.value)}>
                  <option value="">Select…</option>
                  <option>Checking</option>
                  <option>Savings</option>
                </Select></div>
              <div><Label>Routing number</Label>
                <Input value={data.routingNumber} onChange={(e) => set("routingNumber", e.target.value)} /></div>
              <div><Label>Account number</Label>
                <Input value={data.accountNumber} onChange={(e) => set("accountNumber", e.target.value)} /></div>
              <div className="sm:col-span-2"><Label>Name on account</Label>
                <Input value={data.nameOnAccount} onChange={(e) => set("nameOnAccount", e.target.value)} /></div>
            </div>
            <FileUploadField
              label="a voided check or direct-deposit letter."
              applicationId={applicationId}
              field="voided-check"
              currentName={data.voidedCheckName}
              currentPath={data.voidedCheckPath}
              onUploaded={(path, name) => setData((d) => ({ ...d, voidedCheckPath: path, voidedCheckName: name }))}
              onCleared={() => setData((d) => ({ ...d, voidedCheckPath: undefined, voidedCheckName: undefined }))}
            />
          </section>

          {/* 13. TAX */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[12] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="13" title="Tax information" help={SECTION_TITLES[12].help} showHelp={showHelp} />
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>Tax classification</Label>
                <Select value={data.taxClassification} onChange={(e) => set("taxClassification", e.target.value)}>
                  <option value="">Select…</option>
                  <option>Individual</option>
                  <option>Sole Proprietor</option>
                  <option>LLC</option>
                  <option>S-Corp</option>
                  <option>C-Corp</option>
                </Select></div>
              <div><Label>Business / entity name</Label>
                <Input value={data.businessName} onChange={(e) => set("businessName", e.target.value)} /></div>
              <div><Label>EIN (if applicable)</Label>
                <Input value={data.ein} onChange={(e) => set("ein", e.target.value)} /></div>
            </div>
          </section>

          {/* 14. AUTHORIZATION */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[13] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="14" title="Authorization & background check consent" showHelp={showHelp} />
            <div className="space-y-3 text-sm text-[#475467] leading-relaxed">
              <p>By signing this application, I authorize The Financial Architects (TFA) and its designated agents to investigate and verify all information provided herein, including but not limited to my licensing status, employment history, professional references, credit history, and any records maintained by insurance regulatory authorities, carriers, and reporting agencies.</p>
              <p>I understand this authorization is provided in connection with my application for contracting and appointment, and I release TFA, its officers, employees, carriers, and any party providing information from any liability arising from the collection, use, or disclosure of such information to the extent permitted by law.</p>
              <p>I authorize background and consumer reports to be obtained as part of this onboarding process, consistent with the federal Fair Credit Reporting Act (FCRA) and applicable California law.</p>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="mt-0.5" checked={data.authConsent} onChange={(e) => set("authConsent", e.target.checked)} />
              <span><b>I authorize</b> The Financial Architects to obtain the records described above. <span style={{ color: GOLD }}>*</span></span>
            </label>
          </section>

          {/* 15. CERTIFICATION */}
          <section ref={(el: HTMLDivElement | null) => { sectionRefs.current[14] = el; }} className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8">
            <SectionHeader num="15" title="Applicant certification & signature" showHelp={showHelp} />
            <p className="text-sm text-[#475467] leading-relaxed">
              I certify that the information provided in this application is true, complete, and accurate
              to the best of my knowledge. I understand that any false statement, misrepresentation, or
              omission of material fact may result in the denial of my application or the immediate
              termination of my contract, regardless of when discovered.
            </p>
            <label className="mt-5 flex items-start gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="mt-0.5" checked={data.certifyTrue} onChange={(e) => set("certifyTrue", e.target.checked)} />
              <span><b>I certify</b> the information provided is true and accurate. <span style={{ color: GOLD }}>*</span></span>
            </label>
            <div className="mt-5">
              <SmsConsentCheckbox
                checked={!!data.smsConsent}
                onChange={(v) => {
                  set("smsConsent", v);
                  set("smsConsentTextVersion", v ? SMS_CONSENT_TEXT_VERSION : "");
                }}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5 mt-6">
              <div>
                <Label required>Typed signature</Label>
                <Input
                  placeholder="Type your full name to sign"
                  value={data.signature}
                  onChange={(e) => set("signature", e.target.value)}
                  style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "20px", color: NAVY }}
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input disabled value={new Date().toLocaleDateString("en-US")} />
              </div>
              <div>
                <Label>Printed name</Label>
                <Input value={data.printedName} onChange={(e) => set("printedName", e.target.value)} />
              </div>
              <div>
                <Label>NPN</Label>
                <Input value={data.signNpn} onChange={(e) => set("signNpn", e.target.value)} />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="bg-white rounded-lg border border-[#D8DEE7] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#475467]">
              <p className="font-bold tracking-[0.1em] uppercase" style={{ color: NAVY }}>The Financial Architects</p>
              <p className="mt-1 text-[#98A2B3]">Confidential onboarding document</p>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 rounded-md text-sm font-bold text-white flex items-center gap-2 transition-opacity disabled:opacity-50"
              style={{ background: NAVY }}
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" style={{ color: GOLD }} /> Submit Application</>
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentOnboardingForm;