import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Home,
  Heart,
  Award,
  FileText,
  Users,
  Landmark,
  ArrowRight,
  Handshake,
} from "lucide-react";
import aileenImage from "@/assets/advisors/aileen-gutierrez.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Mortgage Protection",
  "Living Trusts",
  "Life Insurance with Living Benefits",
  "Family Income Protection",
  "Estate Planning Basics",
  "Tax-Free Retirement Strategies",
];

const services = [
  {
    icon: Home,
    title: "Mortgage Protection",
    description:
      "Make sure your family keeps the home no matter what happens. Coverage designed to pay off your mortgage if life takes an unexpected turn.",
  },
  {
    icon: FileText,
    title: "Living Trusts",
    description:
      "Protect your home and assets from probate. A simple, affordable plan so your loved ones avoid court, delays, and unnecessary costs.",
  },
  {
    icon: Shield,
    title: "Life Insurance with Living Benefits",
    description:
      "Coverage that works while you're alive — tap into your policy for critical illness, chronic conditions, or terminal diagnosis.",
  },
  {
    icon: Heart,
    title: "Family Income Protection",
    description:
      "Safeguard your family's lifestyle if something happens to the primary earner. Protection that keeps the lights on and the kids in school.",
  },
  {
    icon: Users,
    title: "Estate Planning Basics",
    description:
      "Wills, trusts, beneficiaries, and powers of attorney explained in plain language so your wishes are clear and your family is cared for.",
  },
  {
    icon: Landmark,
    title: "Tax-Free Retirement Strategies",
    description:
      "Build long-term wealth with strategies designed to grow tax-deferred and produce income you don't outlive.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "A short, no-pressure conversation in English or Spanish to learn what matters most to your family.",
  },
  {
    number: "02",
    title: "Needs Review",
    description: "We look at your mortgage, income, and family situation to spot the gaps that need protection first.",
  },
  {
    number: "03",
    title: "Personalized Plan",
    description: "A simple written plan with options that fit your budget — no jargon, no pressure, just clarity.",
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "We put the plan in place together and stay in touch as your family and goals grow.",
  },
];

const AdvisorAileenGutierrez = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Aileen Gutierrez — Bilingual Financial Strategist | Mortgage Protection & Living Trusts"
        description="Work with Aileen Gutierrez, a bilingual financial strategist in Covina, CA, helping California families protect their home and legacy with mortgage protection, living trusts, and life insurance."
        canonical={`${siteConfig.url}/advisors/aileen-gutierrez`}
        ogType="profile"
        keywords="Aileen Gutierrez, bilingual financial advisor, mortgage protection California, living trust California, life insurance Covina, Spanish speaking insurance agent"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Aileen Gutierrez — Financial Strategist | The Financial Architects",
            "Bilingual financial strategist helping California families with mortgage protection, living trusts, and life insurance.",
            `${siteConfig.url}/advisors/aileen-gutierrez`
          ),
          generatePersonSchema(
            "Aileen Gutierrez",
            "Financial Strategist — Mortgage Protection & Living Trusts",
            "Bilingual financial strategist with The Financial Architects, helping California families protect their home, family, and legacy.",
            aileenImage,
            `${siteConfig.url}/advisors/aileen-gutierrez`,
            specialties
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Advisors", url: `${siteConfig.url}/advisors` },
            { name: "Aileen Gutierrez", url: `${siteConfig.url}/advisors/aileen-gutierrez` },
          ]),
        ]}
      />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                  Financial Strategist · Bilingual • Bilingüe
                </Badge>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Aileen Gutierrez
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light italic">
                  "Protecting your home, your family, and your legacy."
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Aileen helps California families put simple, affordable protection in place —
                  mortgage protection, living trusts, and life insurance — so the people they love
                  are taken care of no matter what life brings.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>Covina, California</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="h-5 w-5 text-accent" />
                    <span>Bilingual • Bilingüe</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Shield className="h-5 w-5 text-accent" />
                    <span>CA Lic# 0I97662</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                    onClick={() => setScheduleModalOpen(true)}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Consultation
                  </Button>
                  <Button size="lg" variant="hero" onClick={() => setContactModalOpen(true)}>
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Me
                  </Button>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                  <img
                    src={aileenImage}
                    alt="Aileen Gutierrez — Bilingual Financial Strategist"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <span className="text-2xl font-bold">CA</span>
                    <span className="text-sm block">Lic# 0I97662</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">About Aileen</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Family-First. Bilingual. Referral-Driven.
              </h2>

              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Aileen Gutierrez is a bilingual financial strategist with The Financial Architects,
                  serving families across California in both English and Spanish. Her practice is
                  built almost entirely on referrals from real estate professionals, CPAs, attorneys,
                  and the families she's already helped.
                </p>
                <p>
                  Aileen specializes in mortgage protection, living trusts, and life insurance with
                  living benefits — the building blocks every homeowner and parent should have in
                  place. Her approach is simple: listen first, explain clearly, and recommend only
                  what truly fits.
                </p>
                <p>
                  "I work with families just like yours to make sure your home and legacy are
                  protected. I'm here to help, not sell." — Aileen Gutierrez
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold text-foreground mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {specialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="secondary"
                      className="bg-secondary/50 text-secondary-foreground px-4 py-2"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Services</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Protect What Matters Most
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple, affordable protection designed around your family — explained in plain
                language, in English or Spanish.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="bg-card border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">The Process</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">How We Work Together</h2>
              <p className="text-lg text-muted-foreground">
                Clear, comfortable, and on your timeline — never pushy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent -translate-x-4"></div>
                  )}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-accent/30">
                      <span className="text-2xl font-bold text-accent">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources & Referral Tools */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Resources & Referral Tools</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Refer a Friend or Become a Partner
              </h2>
              <p className="text-lg text-muted-foreground">
                Aileen's practice is built on referrals. Share her client page with a family that
                needs protection, or join her referral partner program.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="bg-card border-border/50 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Refer a Client
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    A warm, simple landing page you can share with friends, family, or clients who
                    need mortgage protection or a living trust. They'll feel personally introduced —
                    not sold to.
                  </p>
                  <Link to="/advisors/aileen-gutierrez/refer">
                    <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold">
                      Open Client Referral Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Handshake className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Become a Referral Partner
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    For real estate professionals, CPAs, attorneys, and financial advisors who want
                    to add value for clients and earn on every successful referral.
                  </p>
                  <Link to="/advisors/aileen-gutierrez/partners">
                    <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold">
                      Open Partner Program
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Protect Your Family?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                A 15-minute call is all it takes to see what's possible. In English or Spanish — and
                always without pressure.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Free Consultation
                </Button>
                <a href="tel:6266430816">
                  <Button size="lg" variant="hero">
                    <Phone className="mr-2 h-5 w-5" />
                    (626) 643-0816
                  </Button>
                </a>
                <a href="mailto:aileen@tfainsuranceadvisors.com">
                  <Button size="lg" variant="hero">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Aileen
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-white/60 text-sm">
                Free consultation. No obligations. Bilingual service.
              </p>
            </div>
          </div>
        </section>

        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          advisorName="Aileen Gutierrez"
          advisorEmail="aileen@tfainsuranceadvisors.com"
          advisorImage={aileenImage}
        />
        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName="Aileen Gutierrez"
          advisorEmail="aileen@tfainsuranceadvisors.com"
          advisorImage={aileenImage}
        />
      </div>
    </>
  );
};

export default AdvisorAileenGutierrez;