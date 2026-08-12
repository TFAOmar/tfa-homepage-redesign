import { useEffect, useState } from "react";
import { Newspaper, ScrollText, Shield, PiggyBank, CheckCircle2, Loader2 } from "lucide-react";
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

const INTERESTS = [
  { id: "living_trust", label: "Living Trust", icon: ScrollText, blurb: "Protect your home and assets — avoid probate for your family." },
  { id: "term_life", label: "Term Life Insurance", icon: Shield, blurb: "Affordable coverage sized to your mortgage or income." },
  { id: "retirement", label: "Retirement Planning", icon: PiggyBank, blurb: "A clear plan so your income doesn't stop when your paycheck does." },
] as const;

type InterestId = typeof INTERESTS[number]["id"];

const CONSENT_TEXT =
  "By checking this box, I consent to be contacted by The Financial Architects and its licensed agents by phone, text, and email at the number and address provided, including via automated technology. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.";

const MinhNewsletter = () => {
  const attr = useAttribution();
  const { honeypotProps, isBot } = useHoneypot();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [interests, setInterests] = useState<InterestId[]>([]);
  const [priority, setPriority] = useState<string>("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    state: "",
    consent: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-set priority when only one interest is checked
  useEffect(() => {
    if (interests.length === 1) setPriority(interests[0]);
    else if (interests.length === 0) setPriority("");
    else if (priority && !interests.includes(priority as InterestId)) setPriority("");
  }, [interests, priority]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleInterest = (id: InterestId, checked: boolean) => {
    setInterests((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)));
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
    if (interests.length === 0) {
      toast.error("Please select at least one topic you're interested in.");
      return;
    }
    if (interests.length > 1 && !priority) {
      toast.error("Please choose which topic is most urgent.");
      return;
    }

    setSubmitting(true);
    try {
      const leadId = crypto.randomUUID();
      const resumeToken = crypto.randomUUID();
      const { error } = await supabase.from("leads").insert({
        id: leadId,
        resume_token: resumeToken,
        funnel: "newsletter",
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
        partner_slug: "minh",
        utm_source: attr.utm_source,
        utm_medium: attr.utm_medium,
        utm_campaign: attr.utm_campaign,
        landing_page: attr.landing_page,
        user_agent: attr.user_agent,
        payload: {
          interests,
          priority: priority || interests[0],
          interest_labels: interests.map((id) => INTERESTS.find((i) => i.id === id)?.label).filter(Boolean),
        },
      });

      if (error) throw error;
      await notifyLead(leadId, resumeToken);
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
        title="Newsletter Readers — Straight Answers"
        description="Referred by our newsletter partner? Get straight answers on living trusts, term life insurance, and retirement planning from a licensed advisor at The Financial Architects."
        canonical="/whatsamortgage-newsletter"
      />

      <LandingHeader ctaLabel="Get Started" ctaHref="#lead-form" />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-navy via-navy/95 to-navy text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm mb-6">
            <Newspaper className="h-4 w-4" /> Newsletter Readers
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            You were referred for straight answers.
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            Living trusts, term life insurance, and retirement planning — explained in plain English, with no pressure.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-navy font-semibold"
            onClick={() => scrollTo("lead-form")}
          >
            Get started
          </Button>
        </div>
      </section>

      {/* Three tiles */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {INTERESTS.map(({ id, label, blurb, icon: Icon }) => (
              <div key={id} className="p-6 rounded-lg border bg-card">
                <Icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-navy mb-2">{label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="lead-form" className="py-14 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-xl">
          {submitted ? (
            <div className="text-center p-8 rounded-lg border bg-accent/5">
              <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-navy mb-2">Got it.</h2>
              <p className="text-muted-foreground">
                You'll hear from a licensed advisor within one business day. If it's urgent, call{" "}
                <a href="tel:+18883505396" className="text-accent font-medium">
                  (888) 350-5396
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 text-center">
                Tell us where to start
              </h2>
              <p className="text-center text-muted-foreground mb-4 text-sm">
                Quick info and a licensed advisor will follow up within one business day.
              </p>

              <input {...honeypotProps} className={honeypotClassName} name="website" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="first_name">First name</Label>
                  <Input id="first_name" autoComplete="given-name" required value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input id="last_name" autoComplete="family-name" required value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
                  <SelectTrigger id="state"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 rounded-md border bg-card space-y-3">
                <div>
                  <Label className="text-sm font-medium">What are you interested in? <span className="text-muted-foreground font-normal">(check all that apply)</span></Label>
                </div>
                <div className="space-y-2">
                  {INTERESTS.map(({ id, label }) => (
                    <label key={id} htmlFor={`int-${id}`} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        id={`int-${id}`}
                        checked={interests.includes(id)}
                        onCheckedChange={(v) => toggleInterest(id, v === true)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {interests.length > 1 && (
                <div>
                  <Label htmlFor="priority">Which is most urgent?</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {interests.map((id) => {
                        const item = INTERESTS.find((i) => i.id === id);
                        return item ? <SelectItem key={id} value={id}>{item.label}</SelectItem> : null;
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}

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
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 text-center">
            Common questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Who is The Financial Architects?",
                a: "A licensed insurance and financial services agency helping families protect what they've built and plan for retirement. We partner with the newsletter to make sure readers get straight, honest information.",
              },
              {
                q: "Is there a cost to talk?",
                a: "No. The initial conversation is free. If you move forward with coverage or a plan, the carrier pays the advisor a commission at no extra cost to you.",
              },
              {
                q: "What happens after I submit?",
                a: "A licensed advisor reaches out within one business day to answer your questions and, if helpful, walk through options tailored to your situation. No pressure.",
              },
              {
                q: "How did you get my info?",
                a: "We didn't — you're here because you clicked through from the newsletter. Nothing is submitted until you fill out the form above.",
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
          The Financial Architects is a licensed insurance agency. Coverage subject to underwriting.
          Licensing information available on request.
        </div>
      </div>
    </>
  );
};

export default MinhNewsletter;