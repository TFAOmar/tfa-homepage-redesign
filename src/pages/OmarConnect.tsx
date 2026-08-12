import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  Instagram,
  Loader2,
  CheckCircle2,
  Target,
  Compass,
  Layers,
  TrendingUp,
} from "lucide-react";
import { SEOHead } from "@/components/seo";
import { siteConfig } from "@/lib/seo/siteConfig";
import { submitForm } from "@/lib/formSubmit";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { useToast } from "@/hooks/use-toast";
import omarImage from "@/assets/advisors/omar-sanchez.jpg";
import tfaLogo from "@/assets/tfa-logo.png";

const OMAR_SCHEDULER =
  "https://tfa.pipedrive.com/scheduler/M93alkfo/strategic-call-with-omar-sanchez-the-financial-architects";

const formSchema = z.object({
  first_name: z.string().trim().min(1, "Required").max(80),
  last_name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(25)
    .regex(/^[0-9+().\-\s]+$/, "Enter a valid phone number"),
  city: z.string().trim().min(1, "Required").max(80),
  state: z.string().trim().min(2, "Required").max(40),
  licensed_status: z.string().min(1, "Required"),
  financial_services_status: z.string().min(1, "Required"),
  applicant_type: z.string().min(1, "Required"),
  bilingual_status: z.string().min(1, "Required"),
  interest_reason: z.string().trim().min(10, "Tell us a little more").max(1500),
  best_contact_time: z.string().min(1, "Required"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
});

type FormState = z.infer<typeof formSchema>;

const initialState: Omit<FormState, "consent"> & { consent: boolean } = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  licensed_status: "",
  financial_services_status: "",
  applicant_type: "",
  bilingual_status: "",
  interest_reason: "",
  best_contact_time: "",
  consent: false,
};

const fitItems = [
  {
    title: "Ambitious and coachable",
    desc: "You are serious about growth and open to mentorship, training, and accountability.",
  },
  {
    title: "Interested in financial services",
    desc: "You want to learn how to help families, build client relationships, and grow in the industry.",
  },
  {
    title: "Leadership-driven",
    desc: "You do not just want to produce. You want to develop into someone who can lead.",
  },
  {
    title: "Licensed or willing to get licensed",
    desc: "Experience is helpful, but the right attitude and willingness to learn matter.",
  },
];

const focusCards = [
  {
    icon: Target,
    title: "Sales Training",
    desc: "Learn how to communicate clearly, ask better questions, follow up, and guide real conversations.",
  },
  {
    icon: Compass,
    title: "Leadership Development",
    desc: "Develop the habits, standards, and communication skills needed to lead yourself and eventually others.",
  },
  {
    icon: Layers,
    title: "Systems and Structure",
    desc: "Growth requires more than motivation. It requires process, consistency, and accountability.",
  },
  {
    icon: TrendingUp,
    title: "Agency Growth",
    desc: "Understand what it takes to grow from individual production into leadership and team-building.",
  },
];

const processSteps = [
  { n: "01", title: "Apply", desc: "Fill out the short form so we can learn more about you." },
  { n: "02", title: "Review", desc: "Our team reviews your information to understand your background, goals, and potential fit." },
  { n: "03", title: "Intro Conversation", desc: "If there is alignment, we will schedule a conversation to answer questions and explain next steps." },
  { n: "04", title: "Next Steps", desc: "If it makes sense on both sides, we will discuss licensing, training, onboarding, and expectations." },
];

const faqs = [
  {
    q: "Do I need to already be licensed?",
    a: "No. Some people may already be licensed, while others may need to complete licensing requirements before moving forward. The intro conversation can help clarify what applies to your situation.",
  },
  {
    q: "Is this a job offer?",
    a: "No. This page is for people interested in starting a conversation. Any next steps depend on fit, licensing requirements, approval, and the specific opportunity discussed.",
  },
  {
    q: "Is income guaranteed?",
    a: "No. Income is not guaranteed. Results vary based on many factors, including licensing, effort, skill development, consistency, market conditions, and individual performance.",
  },
  {
    q: "I'm looking for life insurance, not a career opportunity. Where should I go?",
    a: "For life insurance education and quotes, visit Omar's insurance education page: @omarseguros.",
  },
];

const scrollToApply = () => {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const OmarConnect = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBot()) return;

    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast({
        title: "Please review the form",
        description: "A few fields need your attention.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const data = result.data;

    const notes = [
      `Source: Instagram @4am.omar`,
      `City/State: ${data.city}, ${data.state}`,
      `Licensed: ${data.licensed_status}`,
      `Currently in Financial Services: ${data.financial_services_status}`,
      `Best Describes: ${data.applicant_type}`,
      `Bilingual: ${data.bilingual_status}`,
      `Best Time to Contact: ${data.best_contact_time}`,
      `Consent: Yes`,
      ``,
      `Why TFA / Interest:`,
      data.interest_reason,
    ].join("\n");

    const response = await submitForm({
      form_name: "omar_connect_recruitment",
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      state: data.state,
      notes,
      advisor_slug: "omar-sanchez",
      advisor_email: "omar@tfainsuranceadvisors.com",
      interest_category: "career-opportunity",
      tags: [
        "instagram-4am-omar",
        "recruitment",
        data.applicant_type,
        data.licensed_status,
      ],
      utm_source: "instagram",
      utm_medium: "bio-link",
      utm_campaign: "4am-omar",
    });

    setSubmitting(false);

    if (response.ok) {
      setSubmitted(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } else {
      toast({
        title: "Submission failed",
        description: response.error || "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEOHead
        title="Apply to Connect with Omar Sanchez"
        description="Connect with Omar Sanchez, COO of The Financial Architects, and learn about leadership, sales, training, and growth opportunities in financial services."
        canonical={`${siteConfig.url}/connect-with-omar`}
        ogType="website"
        keywords="Omar Sanchez, The Financial Architects, financial services career, advisor recruitment, leadership, sales training"
      />
      <div className="min-h-screen bg-background text-foreground antialiased">
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2.5" aria-label="The Financial Architects home">
              <img src={tfaLogo} alt="The Financial Architects" className="h-8 w-auto sm:h-9" />
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground sm:inline sm:text-xs">
                The Financial Architects
              </span>
            </a>
            <Button
              size="sm"
              onClick={scrollToApply}
              className="bg-accent font-semibold text-primary shadow-sm hover:bg-accent/90"
            >
              Apply to Connect
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,hsl(var(--accent)/0.14),transparent_60%)]" />
          <div className="container relative mx-auto grid gap-10 px-4 py-14 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
            <div className="space-y-6 lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Omar Sanchez · COO, The Financial Architects
              </p>
              <h1 className="text-[34px] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Build a serious career in financial services.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                For ambitious professionals interested in financial services, leadership, sales, and advisor growth — apply to start a conversation with Omar Sanchez and the TFA team.
              </p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  onClick={scrollToApply}
                  className="h-12 w-full bg-accent px-7 font-semibold text-primary shadow-lg shadow-accent/20 hover:bg-accent/90 sm:w-auto"
                >
                  Apply to Connect
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a
                  href="https://instagram.com/4am.omar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-primary-foreground/70 underline-offset-4 hover:text-primary-foreground hover:underline"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  Followed from @4am.omar
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary-foreground/10 pt-5 text-xs text-primary-foreground/65 sm:text-sm">
                <span>32 locations</span>
                <span aria-hidden className="text-primary-foreground/30">•</span>
                <span>300+ licensed advisors nationwide</span>
                <span aria-hidden className="text-primary-foreground/30">•</span>
                <span>Headquartered in California</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
                <div className="overflow-hidden rounded-xl border border-primary-foreground/10 shadow-2xl">
                  <img
                    src={omarImage}
                    alt="Omar Sanchez, COO of The Financial Architects"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <Card className="mt-4 border-border/40 bg-background/95 shadow-xl backdrop-blur lg:absolute lg:-bottom-5 lg:left-4 lg:right-4 lg:mt-0">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-foreground">Omar Sanchez</p>
                    <p className="text-xs text-muted-foreground">COO, The Financial Architects</p>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      Leadership · Sales · Agency Growth
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About Omar */}
        <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-5 lg:items-center lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Meet Omar Sanchez</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A leader focused on building leaders.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Omar Sanchez serves as COO at The Financial Architects, where his focus is helping build leaders, strengthen systems, develop advisors, and create a culture of execution. His work sits at the intersection of sales, leadership, training, operations, and agency growth.
              </p>
            </div>
            <Card className="lg:col-span-2 border-border/60 bg-background shadow-md">
              <CardContent className="p-8">
                <p className="text-lg italic leading-relaxed text-foreground">
                  "My job is simple: build systems, protect the culture, develop leaders, and raise the standard."
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">Omar Sanchez</p>
                  <p className="text-sm text-muted-foreground">COO, The Financial Architects</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Who this is for */}
        <section className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Fit</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                This May Be a Fit If You Are…
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {fitItems.map((item) => (
                <Card key={item.title} className="border-border/60 transition hover:border-accent/40 hover:shadow-sm">
                  <CardContent className="flex gap-4 p-6">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What we focus on */}
        <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">What We Focus On</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Built to develop, not just recruit.
              </h2>
              <p className="mt-3 text-muted-foreground">
                The goal is not just to bring people into financial services. The goal is to develop advisors with structure, skill, and standards.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {focusCards.map((card) => (
                <Card key={card.title} className="border-border/60 bg-background transition hover:shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <card.icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                How to Start the Conversation
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.n} className="rounded-xl border border-border/60 bg-background p-5">
                  <div className="text-xs font-bold tracking-[0.2em] text-accent">{step.n}</div>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                onClick={scrollToApply}
                className="h-12 bg-accent px-7 font-semibold text-primary shadow-lg shadow-accent/20 hover:bg-accent/90"
              >
                Apply to Connect
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="apply" ref={formRef} className="border-t border-border/60 bg-background py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Apply</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Apply to Connect
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  Takes about 2 minutes. We review every application personally.
                </p>
              </div>

              {submitted ? (
                <Card className="mt-8 border-accent/30 bg-background shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-foreground">Thank you.</h3>
                    <p className="mt-3 text-muted-foreground">
                      Your application has been received. If there is alignment, Omar or the team will reach out with next steps.
                    </p>
                    <div className="mt-8 rounded-xl border border-border/60 bg-secondary/40 p-6">
                      <p className="text-sm font-medium text-foreground">Want to request a time now?</p>
                      <a href={OMAR_SCHEDULER} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="mt-4 h-12 bg-accent font-semibold text-primary hover:bg-accent/90">
                          Request Intro Call
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mt-8 border-border/60 shadow-lg">
                  <CardContent className="p-5 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                      {/* Honeypot */}
                      <input
                        type="text"
                        name="company_website"
                        className={honeypotClassName}
                        {...honeypotProps}
                      />

                      <FormGroup title="About you">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="First Name" error={errors.first_name} required>
                            <Input className="h-12 text-base" value={form.first_name} onChange={(e) => setField("first_name", e.target.value)} />
                          </Field>
                          <Field label="Last Name" error={errors.last_name} required>
                            <Input className="h-12 text-base" value={form.last_name} onChange={(e) => setField("last_name", e.target.value)} />
                          </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Email" error={errors.email} required>
                            <Input className="h-12 text-base" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => setField("email", e.target.value)} />
                          </Field>
                          <Field label="Phone" error={errors.phone} required>
                            <Input className="h-12 text-base" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                          </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="City" error={errors.city} required>
                            <Input className="h-12 text-base" value={form.city} onChange={(e) => setField("city", e.target.value)} />
                          </Field>
                          <Field label="State" error={errors.state} required>
                            <Input className="h-12 text-base" value={form.state} onChange={(e) => setField("state", e.target.value)} />
                          </Field>
                        </div>
                      </FormGroup>

                      <FormGroup title="Your background">
                        <Field label="Are you currently licensed in insurance or financial services?" error={errors.licensed_status} required>
                          <Select value={form.licensed_status} onValueChange={(v) => setField("licensed_status", v)}>
                            <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select one" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="In progress">In progress</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field label="Are you currently working in financial services?" error={errors.financial_services_status} required>
                          <Select value={form.financial_services_status} onValueChange={(v) => setField("financial_services_status", v)}>
                            <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select one" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="I have in the past">I have in the past</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field label="What best describes you?" error={errors.applicant_type} required>
                          <Select value={form.applicant_type} onValueChange={(v) => setField("applicant_type", v)}>
                            <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select one" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Interested in becoming an advisor">Interested in becoming an advisor</SelectItem>
                              <SelectItem value="Already licensed and looking for a team">Already licensed and looking for a team</SelectItem>
                              <SelectItem value="Experienced producer">Experienced producer</SelectItem>
                              <SelectItem value="Interested in leadership">Interested in leadership</SelectItem>
                              <SelectItem value="Just exploring">Just exploring</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field label="Are you bilingual?" error={errors.bilingual_status} required>
                          <Select value={form.bilingual_status} onValueChange={(v) => setField("bilingual_status", v)}>
                            <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select one" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes, English and Spanish">Yes, English and Spanish</SelectItem>
                              <SelectItem value="English only">English only</SelectItem>
                              <SelectItem value="Spanish only">Spanish only</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field label="What interests you about The Financial Architects?" error={errors.interest_reason} required>
                          <Textarea
                            rows={5}
                            className="text-base"
                            value={form.interest_reason}
                            onChange={(e) => setField("interest_reason", e.target.value)}
                            placeholder="Share a few sentences about your background, goals, and what you're looking for."
                          />
                        </Field>
                      </FormGroup>

                      <FormGroup title="Best way to reach you">
                        <Field label="Best time to contact you" error={errors.best_contact_time} required>
                          <Select value={form.best_contact_time} onValueChange={(v) => setField("best_contact_time", v)}>
                            <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select one" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Morning">Morning</SelectItem>
                              <SelectItem value="Afternoon">Afternoon</SelectItem>
                              <SelectItem value="Evening">Evening</SelectItem>
                              <SelectItem value="Weekend">Weekend</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </FormGroup>

                      <div className="rounded-xl border border-border bg-secondary/30 p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="consent"
                            checked={form.consent}
                            onCheckedChange={(v) => setField("consent", v === true)}
                            className="mt-1"
                          />
                          <Label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
                            I agree to be contacted by Omar Sanchez and/or The Financial Architects by phone, text, or email about this opportunity. Message and data rates may apply. Consent is not a condition of purchase or employment. I can opt out at any time.
                          </Label>
                        </div>
                        {errors.consent && (
                          <p className="mt-2 text-sm text-destructive">{errors.consent}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="h-12 w-full bg-accent text-base font-semibold text-primary shadow-lg shadow-accent/20 hover:bg-accent/90"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/60 bg-secondary/30 py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">FAQ</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Common Questions</h2>
              </div>
              <Accordion type="single" collapsible className="mt-8">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-base font-semibold">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background pb-28 pt-12 lg:pb-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <div className="flex items-center gap-3">
                  <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                    The Financial Architects
                  </p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Omar Sanchez, COO
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Instagram: <a href="https://instagram.com/4am.omar" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">@4am.omar</a>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Life insurance education: <a href="https://instagram.com/omarseguros" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">@omarseguros</a>
                </p>
              </div>
              <div className="lg:col-span-2">
                <Button
                  onClick={scrollToApply}
                  className="h-12 bg-accent px-6 font-semibold text-primary shadow-lg shadow-accent/20 hover:bg-accent/90"
                >
                  Apply to Connect
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  This page is for informational and recruiting-related conversations only. It does not guarantee employment, licensing approval, income, or specific results. Financial services opportunities may require licensing, background review, appointments, approvals, and compliance with applicable laws and company requirements. All results vary.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <a href="/privacy-policy" className="hover:text-foreground">Privacy Policy</a>
                  <span aria-hidden>•</span>
                  <a href="/terms-of-service" className="hover:text-foreground">Terms</a>
                  <span aria-hidden>•</span>
                  <a href="/contact" className="hover:text-foreground">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 pb-safe pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
          <Button
            size="lg"
            onClick={scrollToApply}
            className="h-12 w-full bg-accent text-base font-semibold text-primary shadow-lg shadow-accent/20 hover:bg-accent/90"
          >
            Apply to Connect
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const Field = ({ label, error, required, children }: FieldProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-foreground">
      {label}
      {required && <span className="ml-1 text-destructive">*</span>}
    </Label>
    {children}
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

const FormGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {title}
    </p>
    {children}
  </div>
);

export default OmarConnect;