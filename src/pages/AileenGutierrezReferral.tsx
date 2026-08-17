import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Home, Shield, FileText, Users, Check, Phone, Mail, MapPin, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";
import aileenImg from "@/assets/advisors/aileen-gutierrez.jpg";
import tfaLogo from "@/assets/tfa-logo.png";
import SmsConsentCheckbox, { SMS_CONSENT_TEXT_VERSION } from "@/components/forms/SmsConsentCheckbox";

type Interest = "Mortgage Protection" | "Living Trust" | null;

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  phone: z.string().trim().min(7, "Phone number is required").max(30),
  email: z.string().trim().email("Valid email is required").max(255),
  referredBy: z.string().trim().max(120).optional(),
  message: z.string().trim().max(600).optional(),
});

const AILEEN_PALETTE = {
  bg: "#FDFBF7",
  navy: "#1B2A4A",
  gold: "#C8A951",
  softGray: "#EFEAE0",
  trustGreen: "#3F7D58",
  textMuted: "#5B6478",
};

const AileenGutierrezReferral = () => {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get("ref") || "";
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();

  const [smsConsent, setSmsConsent] = useState(false);
  const [interest, setInterest] = useState<Interest>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    referredBy: refParam,
    message: "",
  });

  useEffect(() => {
    if (refParam) setForm((f) => ({ ...f, referredBy: refParam }));
  }, [refParam]);

  const chooseInterest = (i: Interest) => {
    setInterest(i);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const result = await submitForm({
        form_name: "aileen-referral-landing",
        sms_consent: smsConsent,
        sms_consent_text_version: SMS_CONSENT_TEXT_VERSION,
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        notes: [
          interest ? `Interest: ${interest}` : null,
          parsed.data.referredBy ? `Referred by: ${parsed.data.referredBy}` : null,
          parsed.data.message ? `Message: ${parsed.data.message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        advisor_email: "aileen@tfainsuranceadvisors.com",
        advisor_slug: "aileen-gutierrez",
        interest_category: interest ?? "General",
        tags: ["referral-partner", interest ?? "General"].filter(Boolean) as string[],
      });

      if (!result.ok) throw new Error(result.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again, or call Aileen directly at (626) 643-0816.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Aileen Gutierrez | Mortgage Protection & Living Trusts | TFA</title>
        <meta
          name="description"
          content="Referred to Aileen Gutierrez? Get a free, no-pressure consultation on mortgage protection or a living trust. Bilingual. Serving California families."
        />
        <link rel="canonical" href="https://tfawealthplanning.com/advisors/aileen-gutierrez/refer" />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <div style={{ backgroundColor: AILEEN_PALETTE.bg, color: AILEEN_PALETTE.navy }} className="min-h-screen">
        {/* Header */}
        <header className="border-b" style={{ borderColor: AILEEN_PALETTE.softGray, backgroundColor: "#ffffff" }}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
            <span
              className="text-xs md:text-sm font-semibold tracking-wide px-3 py-1 rounded-full"
              style={{ color: AILEEN_PALETTE.navy, backgroundColor: `${AILEEN_PALETTE.gold}22`, border: `1px solid ${AILEEN_PALETTE.gold}` }}
            >
              Bilingual • Bilingüe
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(27,42,74,0.6) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(200,169,81,0.5) 0%, transparent 45%)",
            }}
          />
          <div className="container mx-auto px-4 py-16 md:py-24 text-center relative">
            {refParam && (
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm"
                style={{ backgroundColor: `${AILEEN_PALETTE.trustGreen}1A`, color: AILEEN_PALETTE.trustGreen, border: `1px solid ${AILEEN_PALETTE.trustGreen}55` }}
              >
                <Sparkles className="w-4 h-4" />
                Referred by <strong className="font-semibold">{refParam}</strong>
              </div>
            )}
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto"
              style={{ color: AILEEN_PALETTE.navy }}
            >
              You Were Referred by Someone Who Cares About You
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto" style={{ color: AILEEN_PALETTE.textMuted }}>
              Let's make sure your family and home are protected — it only takes a minute to get started.
            </p>
          </div>
        </section>

        {/* Two-path selector */}
        <section className="container mx-auto px-4 pb-12 md:pb-20">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                key: "Mortgage Protection" as const,
                icon: (
                  <div className="relative">
                    <Home className="w-10 h-10" style={{ color: AILEEN_PALETTE.navy }} />
                    <Shield
                      className="w-5 h-5 absolute -bottom-1 -right-1"
                      style={{ color: AILEEN_PALETTE.gold, fill: AILEEN_PALETTE.gold }}
                    />
                  </div>
                ),
                title: "Mortgage Protection",
                copy: "Just bought a home? Make sure your family can keep it no matter what.",
                cta: "Protect My Home",
              },
              {
                key: "Living Trust" as const,
                icon: (
                  <div className="relative">
                    <FileText className="w-10 h-10" style={{ color: AILEEN_PALETTE.navy }} />
                    <Users
                      className="w-5 h-5 absolute -bottom-1 -right-1"
                      style={{ color: AILEEN_PALETTE.gold }}
                    />
                  </div>
                ),
                title: "Living Trust",
                copy: "Make sure your assets and wishes are protected for the people you love.",
                cta: "Set Up My Trust",
              },
            ].map((card) => {
              const selected = interest === card.key;
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => chooseInterest(card.key)}
                  className="group text-left rounded-2xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "#ffffff",
                    border: selected ? `2px solid ${AILEEN_PALETTE.gold}` : `1px solid ${AILEEN_PALETTE.softGray}`,
                    boxShadow: selected
                      ? `0 18px 40px -18px ${AILEEN_PALETTE.gold}AA`
                      : "0 10px 30px -20px rgba(27,42,74,0.25)",
                  }}
                >
                  <div className="mb-5">{card.icon}</div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: AILEEN_PALETTE.navy }}>
                    {card.title}
                  </h3>
                  <p className="mb-6" style={{ color: AILEEN_PALETTE.textMuted }}>
                    {card.copy}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-full transition-all"
                    style={{
                      backgroundColor: AILEEN_PALETTE.navy,
                      color: "#ffffff",
                    }}
                  >
                    {card.cta} →
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Form */}
        <section ref={formRef} className="container mx-auto px-4 pb-16 md:pb-24 scroll-mt-24">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-7 md:p-10"
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${AILEEN_PALETTE.softGray}`,
              boxShadow: "0 20px 60px -30px rgba(27,42,74,0.35)",
            }}
          >
            {submitted ? (
              <div className="text-center py-6">
                <div
                  className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${AILEEN_PALETTE.trustGreen}22`, color: AILEEN_PALETTE.trustGreen }}
                >
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-2" style={{ color: AILEEN_PALETTE.navy }}>
                  Thank you — Aileen will reach out shortly.
                </h3>
                <p style={{ color: AILEEN_PALETTE.textMuted }}>
                  You're in good hands. Expect a friendly call or text from Aileen at <strong>(626) 643-0816</strong> soon.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: AILEEN_PALETTE.navy }}>
                    {interest ? `Let's get started${interest === "Mortgage Protection" ? " — Mortgage Protection" : " — Living Trust"}` : "Get my free consultation"}
                  </h2>
                  <p className="mt-2 text-sm" style={{ color: AILEEN_PALETTE.textMuted }}>
                    No cost, no pressure. Just a friendly conversation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input type="text" name="website" {...honeypotProps} className={honeypotClassName} />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="referredBy">Referred By</Label>
                    <Input
                      id="referredBy"
                      placeholder="Who referred you?"
                      value={form.referredBy}
                      onChange={(e) => setForm({ ...form, referredBy: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Short message or preferred callback time (optional)</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <SmsConsentCheckbox checked={smsConsent} onChange={setSmsConsent} />

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-base font-semibold py-6 rounded-full"
                    style={{ backgroundColor: AILEEN_PALETTE.gold, color: AILEEN_PALETTE.navy }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Get My Free Consultation"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Trust strip */}
          <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">
            {[
              "No cost to chat — just a conversation",
              "Bilingual: English & Spanish",
              "Your info stays private, always",
            ].map((t) => (
              <div
                key={t}
                className="flex items-start gap-2 text-sm rounded-xl px-4 py-3"
                style={{ backgroundColor: "#ffffff", border: `1px solid ${AILEEN_PALETTE.softGray}`, color: AILEEN_PALETTE.navy }}
              >
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: AILEEN_PALETTE.trustGreen }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About Aileen */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#ffffff", borderTop: `1px solid ${AILEEN_PALETTE.softGray}` }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-center">
              <div className="mx-auto md:mx-0">
                <div
                  className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
                  style={{ border: `4px solid ${AILEEN_PALETTE.gold}`, boxShadow: `0 18px 40px -18px ${AILEEN_PALETTE.navy}55` }}
                >
                  <img src={aileenImg} alt="Aileen Gutierrez" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p className="text-lg leading-relaxed" style={{ color: AILEEN_PALETTE.navy }}>
                  "Hi, I'm Aileen — I work with families just like yours to make sure your home and legacy
                  are protected. I was personally referred to you because someone you trust wants the best
                  for you. I'm here to help, not sell."
                </p>
                <p className="mt-4 font-semibold" style={{ color: AILEEN_PALETTE.gold }}>
                  — Aileen Gutierrez, The Financial Architects
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <a href="tel:6266430816" className="inline-flex items-center gap-2 hover:underline" style={{ color: AILEEN_PALETTE.navy }}>
                    <Phone className="w-4 h-4" style={{ color: AILEEN_PALETTE.gold }} />
                    (626) 643-0816
                  </a>
                  <a href="mailto:aileen@tfainsuranceadvisors.com" className="inline-flex items-center gap-2 hover:underline" style={{ color: AILEEN_PALETTE.navy }}>
                    <Mail className="w-4 h-4" style={{ color: AILEEN_PALETTE.gold }} />
                    aileen@tfainsuranceadvisors.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: AILEEN_PALETTE.navy, color: "#ffffff" }} className="py-10">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <img src={tfaLogo} alt="The Financial Architects" className="h-12 w-auto mx-auto mb-3 brightness-0 invert" />
            <p className="font-semibold tracking-wide" style={{ color: AILEEN_PALETTE.gold }}>
              Protecting Families. Building Legacies.
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
                The Financial Architects is an independent financial services firm. All information submitted is confidential.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AileenGutierrezReferral;