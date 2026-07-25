import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/seo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CONSENT_VERSION } from "@/lib/i18n/dictionary";
import { LanguageProvider, LangToggle, useLang } from "@/lib/i18n/LanguageContext";
import LegalFooter from "@/components/intake/LegalFooter";
import AdminTopBar from "@/components/admin/AdminTopBar";
import ReferralLeadsPanel from "@/components/concierge/ReferralLeadsPanel";
import PartnerStatsPanel from "@/components/admin/PartnerStatsPanel";
import PartnerChildrenPanel from "@/components/concierge/PartnerChildrenPanel";
import PartnerBrandingForm from "@/components/admin/PartnerBrandingForm";
import {
  PartnerBrandingProvider,
  PartnerBrandingHeader,
  usePartnerBranding,
} from "@/components/concierge/PartnerBrandingProvider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Palette } from "lucide-react";

function ConciergeInner() {
  const { user, isLoading: loading, isAdmin, isStaff, isPartner, role } = useAuth();
  const { lang, t } = useLang();
  const [services, setServices] = useState<string[]>([]);
  const [speakingWith, setSpeakingWith] = useState("client");
  const [temperature, setTemperature] = useState("warm");
  const [routingOverride, setRoutingOverride] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [ageBand, setAgeBand] = useState("");
  const [verbalConsent, setVerbalConsent] = useState(false);
  const [refIncluded, setRefIncluded] = useState(false);
  const [advExtrasOpen, setAdvExtrasOpen] = useState(false);
  const [dob, setDob] = useState("");
  const [income, setIncome] = useState("");
  const [premiums, setPremiums] = useState("");
  const [spouseFirst, setSpouseFirst] = useState("");
  const [employer, setEmployer] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [appointmentAt, setAppointmentAt] = useState("");
  const [preferredContactAt, setPreferredContactAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [myReferrerId, setMyReferrerId] = useState<string | null>(null);
  const { branding, refresh: refreshBranding } = usePartnerBranding();
  const [brandingOpen, setBrandingOpen] = useState(false);

  // For partners: look up which referrer record they own.
  useEffect(() => {
    if (!user || !isPartner || isAdmin || isStaff) return;
    void (async () => {
      const { data } = await supabase.rpc("get_my_referrer_id");
      setMyReferrerId((data as string) ?? null);
    })();
  }, [user, isPartner, isAdmin, isStaff]);

  // Admins/staff: collapse the intake form by default so leads are foregrounded.
  useEffect(() => {
    setShowForm(!(isAdmin || isStaff));
  }, [isAdmin, isStaff]);

  if (loading) return <div className="p-12 text-center">…</div>;
  if (!user) {
    try {
      sessionStorage.setItem("tfa:postLoginRedirect", "/concierge");
    } catch {}
    return <Navigate to="/auth?next=/concierge" replace />;
  }

  const hasStaffAccess = isAdmin || isStaff;
  const isPlainUser = role === "user";

  const seniorTrust = services.includes("trust") && ageBand === "65+";

  const script =
    lang === "es"
      ? "Antes de continuar, ¿está bien si le enviamos mensajes de texto y llamadas de The Financial Architects sobre su consulta? Puede responder STOP en cualquier momento."
      : "Before we continue, is it OK if The Financial Architects sends you calls and texts about your inquiry? You can reply STOP any time.";

  const submit = async (action: "send_now" | "schedule" | "hold") => {
    if (!verbalConsent) return toast.error("Verbal consent required");
    if (!first || !phone) return toast.error("Name and phone required");
    if (action === "schedule" && !preferredContactAt) {
      return toast.error("Set a preferred contact time to schedule");
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("intake-submit", {
        body: {
          source: "concierge",
          services,
          primary_service: services[0],
          answers: { ageBand, dob, income, premiums, spouseFirst, employer, appointmentStatus, appointmentAt },
          first_name: first,
          last_name: last,
          phone_e164: phone.startsWith("+") ? phone : `+1${phone.replace(/\D/g, "")}`,
          email: email || null,
          zip,
          language: lang,
          speaking_with: speakingWith,
          temperature,
          routing_team_key: routingOverride || null,
          routing_overridden: !!routingOverride,
          staff_notes: notes,
          referrer_in_thread: refIncluded,
          appointment_status: appointmentStatus || null,
          appointment_at: appointmentAt || null,
          preferred_contact_at: action === "schedule" ? preferredContactAt : null,
          hold_automation: action === "hold",
          consent: {
            verbal: true,
            verbal_script: script,
            version: CONSENT_VERSION,
            senior_trust: seniorTrust,
          },
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        },
      });
      if (error) throw error;
      toast.success(
        action === "send_now"
          ? "Lead saved and sent to GHL"
          : action === "schedule"
            ? "Lead saved with preferred contact time"
            : "Lead saved with automation on hold",
      );
      // reset lightly
      setFirst(""); setLast(""); setPhone(""); setEmail(""); setNotes("");
    } catch (e: any) {
      toast.error(e.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title="Concierge Intake — TFA" description="Internal intake" noIndex />
      {hasStaffAccess && <AdminTopBar />}
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasStaffAccess && (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-navy hover:underline">
                    Full Intake Dashboard
                  </Link>
                  <span className="text-muted-foreground">·</span>
                </>
              )}
              <h1 className="font-serif text-lg font-bold text-navy">
                {hasStaffAccess
                  ? "Concierge — Referral Partner Leads"
                  : isPartner
                    ? "My Referrals"
                    : "Concierge Intake"}
              </h1>
            </div>
            <LangToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-5xl">
          {isPlainUser && (
            <div className="bg-white rounded-lg border p-8 text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-navy mb-3">
                This area is for TFA staff and referral partners
              </h2>
              <p className="text-muted-foreground mb-6">
                Your account doesn't have concierge access yet. If you're a referral
                partner, please contact your TFA advisor to be granted access.
              </p>
              <Link to="/" className="text-navy underline text-sm">
                Return to homepage
              </Link>
            </div>
          )}

          {hasStaffAccess && (
            <div className="mb-8">
              <ReferralLeadsPanel
                referrerOnly={false}
                title="All Referral Partner Leads"
                allowResend
              />
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm((v) => !v)}
                >
                  {showForm ? "Hide" : "+ New"} concierge intake form
                </Button>
              </div>
            </div>
          )}

          {isPartner && !hasStaffAccess && (
            <div className="mb-8 space-y-4">
              {myReferrerId ? (
                <>
                  <PartnerBrandingHeader />
                  <div className="flex justify-end">
                    <Sheet open={brandingOpen} onOpenChange={setBrandingOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Palette className="h-4 w-4 mr-2" />
                          Customize branding
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>My branding</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                          <PartnerBrandingForm
                            referrerId={myReferrerId}
                            initial={{
                              brand_logo_url: branding?.brand_logo_url ?? "",
                              brand_primary_hex: branding?.brand_primary_hex ?? "",
                              brand_accent_hex: branding?.brand_accent_hex ?? "",
                              brand_welcome_headline: branding?.brand_welcome_headline ?? "",
                              brand_welcome_body: branding?.brand_welcome_body ?? "",
                              brand_support_email: branding?.brand_support_email ?? "",
                            }}
                            onSaved={() => {
                              setBrandingOpen(false);
                              refreshBranding();
                            }}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  <PartnerStatsPanel referrerId={myReferrerId} />
                  <PartnerChildrenPanel />
                  <ReferralLeadsPanel
                  referrerOnly
                  scopedReferrerId={myReferrerId}
                  title="My Referred Leads"
                  allowResend={false}
                  />
                </>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
                  Your partner account isn't linked to a referrer record yet.
                  Ask a TFA admin to link your account so your referrals show up here.
                </div>
              )}
            </div>
          )}

          {!isPlainUser && showForm && (
          <>
          {seniorTrust && (
            <div className="mb-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Senior client (65+), trust interest</strong> — CA Insurance Code Art. 6.3 workflow applies:
              attorney-prepared documents only; enhanced disclosure required.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-lg border p-5 space-y-4">
              <h2 className="font-semibold text-navy">Services</h2>
              <div className="flex flex-wrap gap-2">
                {(["trust", "life", "retirement"] as const).map((k) => (
                  <label key={k} className={`px-3 py-1.5 rounded-full border cursor-pointer text-sm ${services.includes(k) ? "bg-navy text-white border-navy" : "bg-white text-navy"}`}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={services.includes(k)}
                      onChange={(e) => setServices(e.target.checked ? [...services, k] : services.filter((x) => x !== k))}
                    />
                    {k === "trust" ? "Living Trust" : k === "life" ? "Term Life" : "Retirement"}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Speaking with</Label>
                  <select value={speakingWith} onChange={(e) => setSpeakingWith(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm">
                    <option value="client">Client</option>
                    <option value="spouse">Spouse</option>
                    <option value="adult_child">Adult child</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label>Temperature</Label>
                  <select value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm">
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="nurture">Nurture</option>
                  </select>
                </div>
                <div>
                  <Label>Age band</Label>
                  <select value={ageBand} onChange={(e) => setAgeBand(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm">
                    <option value="">—</option>
                    <option value="<30">Under 30</option>
                    <option value="30-40">30–40</option>
                    <option value="40-50">40–50</option>
                    <option value="50-65">50–65</option>
                    <option value="65+">65+</option>
                  </select>
                </div>
                <div>
                  <Label>Routing override</Label>
                  <select value={routingOverride} onChange={(e) => setRoutingOverride(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm">
                    <option value="">Auto</option>
                    <option value="trust">Trust team</option>
                    <option value="life">Life team</option>
                    <option value="retirement">Retirement team</option>
                    <option value="multi">Multi</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg border p-5 space-y-3">
              <h2 className="font-semibold text-navy">Contact</h2>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>First</Label><Input value={first} onChange={(e) => setFirst(e.target.value)} /></div>
                <div><Label>Last</Label><Input value={last} onChange={(e) => setLast(e.target.value)} /></div>
                <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" /></div>
                <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><Label>ZIP</Label><Input value={zip} onChange={(e) => setZip(e.target.value)} maxLength={5} /></div>
              </div>
              <div>
                <Label>Advisor prep notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
              <button type="button" className="text-sm text-navy underline" onClick={() => setAdvExtrasOpen(!advExtrasOpen)}>
                {advExtrasOpen ? "Hide" : "Show"} advisor extras
              </button>
              {advExtrasOpen && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div><Label>DOB</Label><Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
                  <div><Label>Income band</Label><Input value={income} onChange={(e) => setIncome(e.target.value)} /></div>
                  <div><Label>Current premiums</Label><Input value={premiums} onChange={(e) => setPremiums(e.target.value)} /></div>
                  <div><Label>Spouse first name</Label><Input value={spouseFirst} onChange={(e) => setSpouseFirst(e.target.value)} /></div>
                  <div className="col-span-2"><Label>Employer</Label><Input value={employer} onChange={(e) => setEmployer(e.target.value)} /></div>
                </div>
              )}
            </section>

            <section className="bg-white rounded-lg border p-5 space-y-3 md:col-span-2">
              <h2 className="font-semibold text-navy">Verbal consent module</h2>
              <div className="rounded-md bg-gray-50 border p-3 text-sm italic text-gray-700">
                {script}
              </div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 accent-navy" checked={verbalConsent} onChange={(e) => setVerbalConsent(e.target.checked)} />
                <span>I read the script above and the client verbally agreed.</span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 accent-navy" checked={refIncluded} onChange={(e) => setRefIncluded(e.target.checked)} />
                <span>Include referrer in the introductory text thread</span>
              </label>
            </section>

            <section className="bg-white rounded-lg border p-5 space-y-3 md:col-span-2">
              <h2 className="font-semibold text-navy">Appointment</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Disposition</Label>
                  <select value={appointmentStatus} onChange={(e) => setAppointmentStatus(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm">
                    <option value="">—</option>
                    <option value="warm_transfer">Warm-transfer now</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="follow_up">Follow-up needed</option>
                    <option value="not_qualified">Not qualified</option>
                    <option value="duplicate">Duplicate</option>
                  </select>
                </div>
                <div>
                  <Label>Datetime</Label>
                  <Input type="datetime-local" value={appointmentAt} onChange={(e) => setAppointmentAt(e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Label>Preferred contact time (for GHL scheduling)</Label>
                  <Input type="datetime-local" value={preferredContactAt} onChange={(e) => setPreferredContactAt(e.target.value)} />
                  <p className="text-xs text-muted-foreground mt-1">
                    GoHighLevel honors this window and the contact's timezone for outreach.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 sticky bottom-3 bg-white/95 backdrop-blur rounded-lg border p-3 shadow-md">
            <Button className="btn-primary-cta" disabled={submitting} onClick={() => submit("send_now")}>
              Save & send to GHL
            </Button>
            <Button variant="outline" disabled={submitting} onClick={() => submit("schedule")}>
              Save & schedule text
            </Button>
            <Button variant="outline" disabled={submitting} onClick={() => submit("hold")}>
              Save without text
            </Button>
          </div>
          </>
          )}
        </main>
        <LegalFooter />
      </div>
    </>
  );
}

export default function Concierge() {
  return (
    <LanguageProvider>
      <PartnerBrandingProvider>
        <ConciergeInner />
      </PartnerBrandingProvider>
    </LanguageProvider>
  );
}