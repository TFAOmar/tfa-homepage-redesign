import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import {
  Handshake, TrendingUp, ShieldCheck, Check, Loader2,
  Phone, Mail, MapPin, ArrowRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";
import aileenImg from "@/assets/advisors/aileen-gutierrez.jpg";
import tfaLogo from "@/assets/tfa-logo.png";
import SmsConsentCheckbox, { SMS_CONSENT_TEXT_VERSION } from "@/components/forms/SmsConsentCheckbox";

const P = {
  navy: "#1B2A4A",
  navyDeep: "#13203A",
  gold: "#C8A951",
  goldSoft: "#E2C97A",
  white: "#FFFFFF",
  warmGray: "#F4F1EA",
  border: "#E6E1D5",
  muted: "#5B6478",
};

const INDUSTRIES = [
  "Real Estate",
  "Mortgage",
  "CPA / Accounting",
  "Attorney",
  "Financial Advisor",
  "Other",
];

const LICENSE_OPTIONS = [
  "Yes — currently life-licensed",
  "No",
  "Interested in getting licensed",
];

const schema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  businessName: z.string().trim().min(1, "Business name is required").max(120),
  industry: z.string().min(1, "Please select an industry"),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Valid email is required").max(255),
  licensed: z.string().min(1, "Please select an option"),
  heardFrom: z.string().trim().max(200).optional(),
});

const AileenPartnerProgram = () => {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get("ref") || "";
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();
  const formRef = useRef<HTMLDivElement>(null);

  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    industry: "",
    phone: "",
    email: "",
    licensed: "",
    heardFrom: "",
  });

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBot()) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please check your info",
        description: parsed.error.errors[0]?.message ?? "Some fields need attention.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const [first, ...rest] = parsed.data.fullName.split(" ");
      const last = rest.join(" ") || "—";
      const result = await submitForm({
        form_name: "aileen-partner-program",
        sms_consent: smsConsent,
        sms_consent_text_version: SMS_CONSENT_TEXT_VERSION,
        first_name: first,
        last_name: last,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company_name: parsed.data.businessName,
        notes: [
          `Industry: ${parsed.data.industry}`,
          `Life-licensed: ${parsed.data.licensed}`,
          parsed.data.heardFrom ? `Heard about program: ${parsed.data.heardFrom}` : null,
          refParam ? `Ref source: ${refParam}` : null,
        ].filter(Boolean).join("\n"),
        advisor_email: "aileen@tfainsuranceadvisors.com",
        advisor_slug: "aileen-gutierrez",
        interest_category: "Referral Partner",
        tags: [
          "partner-recruitment",
          parsed.data.industry,
          parsed.data.licensed,
        ],
      });
      if (!result.ok) throw new Error(result.error || "Submission failed");
      setSubmitted(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or text Aileen directly at (626) 643-0816.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Referral Partner Program | Aileen Gutierrez · TFA</title>
        <meta
          name="description"
          content="Real estate pros, CPAs, attorneys, and advisors: refer clients to Aileen Gutierrez at The Financial Architects and earn on mortgage protection and living trusts."
        />
        <link rel="canonical" href="https://tfawealthplanning.com/advisors/aileen-gutierrez/partners" />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <div style={{ backgroundColor: P.white, color: P.navy }} className="min-h-screen">
        {/* Header */}
        <header style={{ backgroundColor: P.white, borderBottom: `1px solid ${P.border}` }}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
            <span
              className="text-xs md:text-sm font-semibold tracking-wide px-3 py-1 rounded-full"
              style={{ color: P.navy, backgroundColor: `${P.gold}22`, border: `1px solid ${P.gold}` }}
            >
              Partner Program
            </span>
          </div>
        </header>

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${P.navyDeep} 0%, ${P.navy} 60%, #1F3457 100%)`,
            color: P.white,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage:
                `radial-gradient(circle at 15% 20%, ${P.gold}22 0%, transparent 40%), radial-gradient(circle at 85% 80%, ${P.gold}1A 0%, transparent 45%)`,
            }}
          />
          <div className="container mx-auto px-4 py-20 md:py-28 text-center relative">
            <div
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-6"
              style={{ color: P.gold, backgroundColor: `${P.gold}14`, border: `1px solid ${P.gold}55` }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Referral Partner Program
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] max-w-4xl mx-auto">
              Your Clients Already Trust You.{" "}
              <span style={{ color: P.gold }}>Now Get Paid for It.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Join The Financial Architects Referral Partner Program — earn referral fees on
              mortgage protection and living trusts without changing anything about how you do business.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={scrollToForm}
                className="text-base font-semibold px-8 py-6 rounded-full"
                style={{ backgroundColor: P.gold, color: P.navyDeep }}
              >
                Become a Partner <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <a
                href="#how-it-works"
                className="text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: P.white }}
              >
                How it works ↓
              </a>
            </div>
          </div>
        </section>

        {/* What's In It For You */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: P.gold }}>
                What's In It For You
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold" style={{ color: P.navy }}>
                Three ways to earn — starting day one.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Handshake className="w-7 h-7" />,
                  title: "Earn Referral Fees",
                  copy: "Every client you refer that gets placed means money in your pocket. No insurance license required to start earning.",
                },
                {
                  icon: <TrendingUp className="w-7 h-7" />,
                  title: "Higher Comp If Licensed",
                  copy: "Already life-licensed or thinking about it? Licensed partners earn significantly higher compensation on every case.",
                },
                {
                  icon: <ShieldCheck className="w-7 h-7" />,
                  title: "Get Paid on Living Trusts",
                  copy: "Your clients need estate protection too. Earn on every living trust placed through your referrals.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: P.white,
                    border: `1px solid ${P.border}`,
                    boxShadow: "0 10px 30px -20px rgba(27,42,74,0.25)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${P.gold}1F`, color: P.gold }}
                  >
                    {c.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: P.navy }}>
                    {c.title}
                  </h3>
                  <p style={{ color: P.muted }}>{c.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 md:py-24" style={{ backgroundColor: P.warmGray }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: P.gold }}>
                How It Actually Works
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold" style={{ color: P.navy }}>
                Four steps. That's the whole program.
              </h2>
            </div>
            <div className="relative grid md:grid-cols-4 gap-6">
              {[
                { n: 1, t: "You Sign Up", c: "Fill out the form below. We'll set you up with your own referral portal in minutes." },
                { n: 2, t: "You Refer", c: "Send clients through your personalized landing page, shoot a text, or make a warm intro. Whatever feels natural." },
                { n: 3, t: "We Handle Everything", c: "Aileen meets with your client, builds the plan, and handles all the paperwork. Your client always feels like they're still working with you." },
                { n: 4, t: "You Get Paid", c: "Track every referral in real time. When the case closes, you earn. Transparent. Trackable. Every time." },
              ].map((s) => (
                <div
                  key={s.n}
                  className="rounded-2xl p-6 relative"
                  style={{
                    backgroundColor: P.white,
                    border: `1px solid ${P.border}`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold mb-4"
                    style={{ backgroundColor: P.navy, color: P.gold }}
                  >
                    {s.n}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: P.navy }}>{s.t}</h3>
                  <p className="text-sm" style={{ color: P.muted }}>{s.c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes This Different */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: P.gold }}>
                Built For Professionals Like You
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold" style={{ color: P.navy }}>
                What Makes This Different
              </h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "Your brand, your way — co-branded landing pages or your brand only",
                "Your clients stay yours — Aileen is an extension of your business, never a replacement",
                "Real-time tracking — see exactly where every referral stands",
                "Bilingual support — English and Spanish for your entire client base",
                "No quotas, no pressure, no contracts — refer when it makes sense for your clients",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl px-5 py-4"
                  style={{ backgroundColor: P.white, border: `1px solid ${P.border}` }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${P.gold}22`, color: P.gold }}
                  >
                    <Check className="w-4 h-4" />
                  </span>
                  <span style={{ color: P.navy }}>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Credibility strip */}
        <section className="py-12" style={{ backgroundColor: P.warmGray, borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <p className="text-lg md:text-xl font-semibold" style={{ color: P.navy }}>
              The Financial Architects partners with top-rated carriers to protect families across California.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {[
                "50+ referral partners and growing",
                "Bilingual: English & Spanish",
                "Backed by The Financial Architects",
              ].map((s) => (
                <span
                  key={s}
                  className="text-sm font-semibold px-4 py-2 rounded-full"
                  style={{ backgroundColor: P.white, border: `1px solid ${P.border}`, color: P.navy }}
                >
                  {s}
                </span>
              ))}
            </div>
            {/* TODO: insert partner testimonial blockquote here once provided */}
          </div>
        </section>

        {/* Meet Your Partner */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-center">
              <div className="mx-auto md:mx-0">
                <div
                  className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
                  style={{ border: `4px solid ${P.gold}`, boxShadow: `0 18px 40px -18px ${P.navy}55` }}
                >
                  <img src={aileenImg} alt="Aileen Gutierrez" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: P.gold }}>
                  Meet Your Partner
                </p>
                <p className="text-lg leading-relaxed" style={{ color: P.navy }}>
                  "I'm Aileen Gutierrez — I partner with professionals like you who already have
                  the relationships but don't have the time or license to offer life insurance and
                  estate planning. I handle everything so you can focus on what you do best. Your
                  clients will always feel like they never left your office."
                </p>
                <p className="mt-4 font-semibold" style={{ color: P.gold }}>
                  — Aileen Gutierrez, The Financial Architects
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="partner-form" ref={formRef} className="py-16 md:py-20 scroll-mt-24" style={{ backgroundColor: P.warmGray }}>
          <div className="container mx-auto px-4 max-w-2xl">
            <div
              className="rounded-2xl p-7 md:p-10"
              style={{
                backgroundColor: P.white,
                border: `1px solid ${P.border}`,
                boxShadow: "0 20px 60px -30px rgba(27,42,74,0.35)",
              }}
            >
              {submitted ? (
                <div className="text-center py-6">
                  <div
                    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${P.gold}22`, color: P.gold }}
                  >
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: P.navy }}>
                    You're in!
                  </h3>
                  <p style={{ color: P.muted }}>
                    Aileen will reach out within 24 hours to get you set up with your own referral portal.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm">
                    <a href="tel:6266430816" className="inline-flex items-center gap-2 font-semibold" style={{ color: P.navy }}>
                      <Phone className="w-4 h-4" style={{ color: P.gold }} /> (626) 643-0816
                    </a>
                    <a href="mailto:aileen@tfainsuranceadvisors.com" className="inline-flex items-center gap-2 font-semibold" style={{ color: P.navy }}>
                      <Mail className="w-4 h-4" style={{ color: P.gold }} /> aileen@tfainsuranceadvisors.com
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ color: P.navy }}>
                      Become a Referral Partner
                    </h2>
                    <p className="mt-2 text-sm" style={{ color: P.muted }}>
                      Takes under 60 seconds. No contracts, no quotas.
                    </p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-4">
                    <input type="text" name="website" {...honeypotProps} className={honeypotClassName} />

                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                    </div>

                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input id="businessName" value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })} required />
                    </div>

                    <div>
                      <Label>Industry</Label>
                      <Select value={form.industry} onValueChange={(v) => setForm({ ...form, industry: v })}>
                        <SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>

                    <div>
                      <Label>Are you currently life-licensed?</Label>
                      <Select value={form.licensed} onValueChange={(v) => setForm({ ...form, licensed: v })}>
                        <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                        <SelectContent>
                          {LICENSE_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="heardFrom">How did you hear about this program? (optional)</Label>
                      <Input id="heardFrom" value={form.heardFrom}
                        onChange={(e) => setForm({ ...form, heardFrom: e.target.value })} />
                    </div>

                    <SmsConsentCheckbox checked={smsConsent} onChange={setSmsConsent} />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full text-base font-semibold py-6 rounded-full"
                      style={{ backgroundColor: P.gold, color: P.navyDeep }}
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</>
                      ) : (
                        "Let's Partner Up"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: P.navy, color: P.white }} className="py-10">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <img src={tfaLogo} alt="The Financial Architects" className="h-12 w-auto mx-auto mb-3 brightness-0 invert" />
            <p className="font-semibold tracking-wide" style={{ color: P.gold }}>
              Protecting Families. Building Legacies. Empowering Partners.
            </p>
            <div className="mt-4 text-sm space-y-1 opacity-90">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> (626) 643-0816
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> aileen@tfainsuranceadvisors.com
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> 965 N. Grand Ave, Covina, CA 91724
                </span>
              </div>
              <p className="opacity-70 text-xs pt-4 max-w-2xl mx-auto">
                The Financial Architects is an independent financial services firm. Referral
                compensation varies by product and licensing status. All partner information is confidential.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AileenPartnerProgram;