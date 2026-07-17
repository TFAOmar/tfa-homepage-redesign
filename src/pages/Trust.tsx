import { useEffect, useState } from "react";
import { Scale, ShieldCheck, EyeOff, KeyRound, CheckCircle2, Loader2, FileText, PenLine, Handshake, MessageSquare, ClipboardList, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { useAttribution, notifyLead } from "@/hooks/useLeads";
import { SEOHead } from "@/components/seo";
import LandingHeader from "@/components/LandingHeader";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const ESTATE_RANGES = [
  "Under $250k",
  "$250k – $500k",
  "$500k – $1M",
  "$1M – $3M",
  "Over $3M",
  "Not sure",
];

const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];
const MINOR_CHILDREN = ["Yes", "No"];
const BEST_TIMES = ["Morning", "Midday", "Afternoon", "Evening", "Anytime"];

const CONSENT_TEXT =
  "By checking this box, I consent to be contacted by The Financial Architects and its licensed representatives by phone, text, and email at the number and address provided, including via automated technology, about living trust and estate planning services. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.";

const Trust = () => {
  const attr = useAttribution();
  const { honeypotProps, isBot } = useHoneypot();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    state: "",
    marital_status: "",
    has_minor_children: "",
    estate_value: "",
    best_time: "",
    consent: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBot()) return;
    if (!form.consent) {
      toast.error("Please confirm the contact consent to continue.");
      return;
    }
    if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.state) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const leadId = crypto.randomUUID();
      const { error } = await supabase
        .from("leads")
        .insert({
          id: leadId,
          funnel: "trust",
          status: "new",
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          state: form.state,
          is_complete: true,
          last_step: 1,
          consent_text: CONSENT_TEXT,
          consent_at: new Date().toISOString(),
          referral_source: attr.referral_source ?? "minh",
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          landing_page: attr.landing_page,
          user_agent: attr.user_agent,
          payload: {
            marital_status: form.marital_status,
            has_minor_children: form.has_minor_children,
            estate_value: form.estate_value,
            best_time: form.best_time,
          },
        });

      if (error) throw error;
      await notifyLead(leadId);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Living Trust — Skip Probate, Keep It Simple | The Financial Architects"
        description="Referred here for straight answers on setting up a living trust? Talk with a specialist at The Financial Architects and protect your family without the court."
        canonical="/trust"
      />

      <LandingHeader ctaLabel="Start Intake" ctaHref="/living-trust-questionnaire" />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-navy via-navy/95 to-navy text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm mb-6">
            <Scale className="h-4 w-4" /> Living Trusts
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Protect your family. Skip probate. Keep it simple.
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            A living trust puts your home, savings, and wishes in one place — so your family doesn't get stuck in court.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-navy font-semibold"
              onClick={() => scrollTo("lead-form")}
            >
              Start with a free consult
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent/60 text-accent hover:bg-accent/10 hover:text-accent bg-transparent font-semibold"
            >
              <Link to="/living-trust-questionnaire">Complete intake yourself</Link>
            </Button>
          </div>
          <p className="text-white/70 text-sm mt-4 max-w-xl mx-auto">
            Prefer to get a jump start? Fill out the intake now and we'll review it before your call.
          </p>
        </div>
      </section>

      {/* What this is */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Avoid probate",
                body: "Probate is the court process for handling an estate without a trust. It can take 12–18 months and eat 3–7% of the estate. A living trust skips it.",
              },
              {
                icon: EyeOff,
                title: "Keep it private",
                body: "Wills become public record. A living trust stays private — no one has to know what you own or who inherits it.",
              },
              {
                icon: KeyRound,
                title: "You stay in control",
                body: "You're still the trustee while you're alive. Nothing changes about how you use your home, accounts, or assets. It just protects them.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-6 rounded-lg border bg-card">
                <Icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 text-center">How it works</h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Three simple steps. Most families are fully set up in about two weeks.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Handshake,
                step: "1",
                title: "Free 20-min consult",
                body: "Tell us about your family and what you own. We'll tell you honestly whether a trust makes sense.",
              },
              {
                icon: FileText,
                step: "2",
                title: "We draft your trust",
                body: "A licensed specialist prepares your living trust, pour-over will, powers of attorney, and healthcare directives.",
              },
              {
                icon: PenLine,
                step: "3",
                title: "Notarize & fund",
                body: "You sign with a notary. We help retitle your home and accounts into the trust so it actually works.",
              },
            ].map(({ icon: Icon, step, title, body }) => (
              <div key={step} className="p-6 rounded-lg border bg-card relative">
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-accent text-navy font-bold text-sm flex items-center justify-center">
                  {step}
                </div>
                <Icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two ways to start */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 text-center">Two ways to start</h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Pick whichever feels right. Both land in the same place — a trust that's ready to sign.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border bg-card flex flex-col">
              <MessageSquare className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-lg font-semibold text-navy mb-2">Talk first</h3>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 flex-1">
                <li>• 20-minute call with a licensed specialist</li>
                <li>• We explain the process and pricing up front</li>
                <li>• No forms until you're ready</li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-navy/20 text-navy hover:bg-navy hover:text-white"
                onClick={() => scrollTo("lead-form")}
              >
                Request a consult <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="p-6 rounded-lg border-2 border-accent bg-card flex flex-col relative">
              <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-accent text-navy text-xs font-semibold">
                Fastest
              </div>
              <ClipboardList className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-lg font-semibold text-navy mb-2">Jump-start yourself</h3>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 flex-1">
                <li>• 8-step guided intake — about 20 minutes</li>
                <li>• Save and resume anytime from the same device</li>
                <li>• We review your answers before your consult</li>
              </ul>
              <Button
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-navy font-semibold"
              >
                <Link to="/living-trust-questionnaire">
                  Start the intake <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section id="lead-form" className="py-14 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 max-w-xl">
          {submitted ? (
            <div className="text-center p-8 rounded-lg border bg-accent/5">
              <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-navy mb-2">Got it.</h2>
              <p className="text-muted-foreground">
                You'll hear from a licensed specialist within one business day. If it's urgent, call{" "}
                <a href="tel:+18885555555" className="text-accent font-medium">
                  (888) 555-5555
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 text-center">
                Get your free consult
              </h2>
              <p className="text-center text-muted-foreground mb-4 text-sm">
                Send your info and a licensed specialist will follow up within one business day.
              </p>

              <input {...honeypotProps} className={honeypotClassName} name="website" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    autoComplete="given-name"
                    required
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    autoComplete="family-name"
                    required
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
                    <SelectTrigger id="state"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="best_time">Best time to reach you</Label>
                  <Select value={form.best_time} onValueChange={(v) => setForm({ ...form, best_time: v })}>
                    <SelectTrigger id="best_time"><SelectValue placeholder="Anytime" /></SelectTrigger>
                    <SelectContent>
                      {BEST_TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="marital_status">Marital status</Label>
                  <Select value={form.marital_status} onValueChange={(v) => setForm({ ...form, marital_status: v })}>
                    <SelectTrigger id="marital_status"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {MARITAL_STATUSES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="has_minor_children">Minor children?</Label>
                  <Select value={form.has_minor_children} onValueChange={(v) => setForm({ ...form, has_minor_children: v })}>
                    <SelectTrigger id="has_minor_children"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {MINOR_CHILDREN.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="estate_value">Approximate estate value</Label>
                <Select
                  value={form.estate_value}
                  onValueChange={(v) => setForm({ ...form, estate_value: v })}
                >
                  <SelectTrigger id="estate_value"><SelectValue placeholder="Select a range" /></SelectTrigger>
                  <SelectContent>
                    {ESTATE_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/40 border">
                <Checkbox
                  id="consent"
                  checked={form.consent}
                  onCheckedChange={(v) => setForm({ ...form, consent: v === true })}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground font-normal">
                  {CONSENT_TEXT}
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-accent hover:bg-accent/90 text-navy font-semibold"
              >
                {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</> : "Send my info"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 text-center">
            Common questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "What's the difference between a will and a living trust?",
                a: "A will still goes through probate — the public court process that can take a year or more. A living trust skips probate entirely and stays private.",
              },
              {
                q: "How much does a living trust cost?",
                a: "A full trust package (trust, pour-over will, powers of attorney, healthcare directives) typically runs $1,500–$3,000 flat depending on complexity. We give you the exact price after the consult — no surprises.",
              },
              {
                q: "Do I need a trust if I don't own a home?",
                a: "Maybe not. If your total assets are under your state's probate threshold (often $150k–$200k), a will may be enough. That's exactly what we cover in the free consult.",
              },
              {
                q: "How long does it take?",
                a: "Most families are fully set up in about two weeks — consult, drafting, review, notarization, and funding your accounts into the trust.",
              },
              {
                q: "Can I change it later?",
                a: "Yes. A revocable living trust can be updated or cancelled at any time while you're alive and mentally competent.",
              },
            ].map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Compliance footer note */}
      <div className="py-6 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl text-xs text-muted-foreground text-center">
          {/* TODO: Insert state-specific licensing disclosure line here */}
          Information only — not legal advice. Estate planning documents are prepared by licensed professionals.
          Licensing information available on request.
        </div>
      </div>
    </>
  );
};

export default Trust;
