import { useEffect, useRef, useState } from "react";
import { Shield, Home, DollarSign, CheckCircle2, Loader2 } from "lucide-react";
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

const MORTGAGE_RANGES = [
  "Under $100k",
  "$100k – $250k",
  "$250k – $500k",
  "$500k – $750k",
  "$750k – $1M",
  "Over $1M",
];

const BEST_TIMES = ["Morning", "Midday", "Afternoon", "Evening", "Anytime"];

const CONSENT_TEXT =
  "By checking this box, I consent to be contacted by The Financial Architects and its licensed agents by phone, text, and email at the number and address provided, including via automated technology, about mortgage protection and related insurance products. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.";

const Protect = () => {
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
    mortgage_balance: "",
    best_time: "",
    consent: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quoterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!quoterRef.current) return;
    const script = document.createElement("script");
    script.src = "https://quoter.quoteplicity.com/qp-widget/2128483199ca64cc538bc6ebacc39986";
    script.async = true;
    quoterRef.current.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
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
          funnel: "protect",
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
            mortgage_balance: form.mortgage_balance,
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
        title="Mortgage Protection — Straight Answers | The Financial Architects"
        description="Referred here for straight answers on protecting your mortgage? Get an instant quote and speak with a licensed advisor at The Financial Architects."
        canonical="/protect"
      />

      <LandingHeader ctaLabel="Free Quote" ctaHref="https://quotes.tfawealthplanning.com" ctaExternal />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-navy via-navy/95 to-navy text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm mb-6">
            <Shield className="h-4 w-4" /> Mortgage Protection
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            You were referred here for straight answers on protecting your mortgage.
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            A simple plan so your family keeps the house — even if the earner is gone.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-navy font-semibold"
            onClick={() => scrollTo("quoter")}
          >
            Get my instant quote
          </Button>
        </div>
      </section>

      {/* What this is */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Home,
                title: "It's just term life",
                body: "Mortgage protection is term life insurance sized to pay off your mortgage. Same product — named for the job.",
              },
              {
                icon: DollarSign,
                title: "Costs less than you think",
                body: "For most healthy adults, a policy covering a typical mortgage runs $30–$60/month. No hype, that's the real range.",
              },
              {
                icon: CheckCircle2,
                title: "No pressure, no games",
                body: "You were sent here because someone thought we'd give you honest info. That's the whole job. Take it or leave it.",
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

      {/* Quoter */}
      <section id="quoter" className="py-14 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 text-center">Instant quote</h2>
          <p className="text-center text-muted-foreground mb-6 text-sm">
            No SSN required. Ballpark rates in about 60 seconds.
          </p>
          <div
            id="quoter-embed"
            ref={quoterRef}
            className="mx-auto w-full max-w-[720px] bg-card border rounded-lg p-4"
            style={{ minHeight: 600 }}
          />
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
                You'll hear from a licensed advisor within one business day. If it's urgent, call{" "}
                <a href="tel:+18885555555" className="text-accent font-medium">
                  (888) 555-5555
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 text-center">
                Prefer we reach out?
              </h2>
              <p className="text-center text-muted-foreground mb-4 text-sm">
                Send your info and a licensed advisor will follow up within one business day.
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

              <div>
                <Label htmlFor="mortgage_balance">Approximate mortgage balance</Label>
                <Select
                  value={form.mortgage_balance}
                  onValueChange={(v) => setForm({ ...form, mortgage_balance: v })}
                >
                  <SelectTrigger id="mortgage_balance"><SelectValue placeholder="Select a range" /></SelectTrigger>
                  <SelectContent>
                    {MORTGAGE_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
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
                q: "How long does this take?",
                a: "About 15 minutes to apply. Approval is typically 24–72 hours for most healthy applicants; some cases qualify for instant coverage.",
              },
              {
                q: "Do I need a medical exam?",
                a: "Often no. Many carriers approve coverage up to $1M+ with no exam. If an exam is required, it's a free at-home visit.",
              },
              {
                q: "What if I already have coverage through work?",
                a: "Employer coverage usually ends when the job does, and is often too small to cover a mortgage. A personal policy stays with you regardless.",
              },
              {
                q: "How do you get paid?",
                a: "The insurance company pays the advisor a commission at no cost to you. Rates are the same whether you buy through us or direct.",
              },
              {
                q: "Am I locked in?",
                a: "No. Term policies can be cancelled anytime with no penalty.",
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

      {/* Sticky mobile CTA */}
      {!submitted && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-navy/95 backdrop-blur border-t border-accent/30">
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-navy font-semibold"
            onClick={() => scrollTo("lead-form")}
          >
            Get started
          </Button>
        </div>
      )}

      {/* Compliance footer note */}
      <div className="py-6 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl text-xs text-muted-foreground text-center">
          {/* TODO: Insert state-specific licensing disclosure line here */}
          The Financial Architects is a licensed insurance agency. Coverage subject to underwriting.
          Licensing information available on request.
        </div>
      </div>
    </>
  );
};

export default Protect;
