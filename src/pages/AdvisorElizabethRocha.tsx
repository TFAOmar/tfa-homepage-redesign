import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  TrendingUp,
  Users,
  Target,
  Handshake,
  ClipboardCheck,
  Award,
  Heart,
  Home,
  Briefcase,
  Instagram,
  Facebook,
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import elizabethRochaImg from "@/assets/advisors/elizabeth-rocha.jpg";
import elizabethRochaCoupleImg from "@/assets/advisors/elizabeth-rocha-couple.jpg";
import elizabethRochaLogo from "@/assets/advisors/elizabeth-rocha-logo.png";

const specialties = [
  "Family Financial Planning",
  "Income Protection",
  "Mortgage Protection",
  "Retirement Planning",
  "Life Insurance",
  "Business Solutions",
];

const services = [
  {
    icon: Users,
    title: "Family Financial Planning",
    description:
      "Helping families create a strong, intentional financial foundation that supports today's needs and tomorrow's dreams.",
  },
  {
    icon: Shield,
    title: "Income Protection",
    description:
      "Strategies that safeguard your family's income against the unexpected, so the lifestyle you've built stays protected.",
  },
  {
    icon: Home,
    title: "Mortgage Protection",
    description:
      "Protect the place your family calls home — keeping your mortgage covered through life's most uncertain moments.",
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description:
      "Thoughtful, education-first retirement strategies that help you transition into your next chapter with confidence.",
  },
  {
    icon: Heart,
    title: "Life Insurance",
    description:
      "The right life insurance protects what matters most today while building a meaningful legacy for the next generation.",
  },
  {
    icon: Briefcase,
    title: "Business Solutions",
    description:
      "Helping business owners protect their income, their team, and the long-term value of what they've built.",
  },
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description:
      "We'll discuss your family, your goals, and what financial security looks like to you.",
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description:
      "I'll review your current coverage and finances, identifying gaps and opportunities to strengthen.",
  },
  {
    icon: Target,
    title: "Strategy",
    description:
      "Together we'll build a customized plan rooted in education and aligned with your values.",
  },
  {
    icon: Handshake,
    title: "Implementation",
    description:
      "I'll walk with you every step of the way — putting your plan into action and supporting you long-term.",
  },
];

const AdvisorElizabethRocha = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Elizabeth Rocha",
    "Financial Strategist",
    "Licensed Financial Professional serving families across Southern California, specializing in family financial planning, income protection, mortgage protection, retirement strategies, and life insurance.",
    elizabethRochaImg,
    `${siteConfig.url}/advisors/elizabeth-rocha`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Southern California",
    {
      street: "",
      city: "Southern California",
      state: "CA",
      zip: "",
    },
    "626-622-8408"
  );

  return (
    <>
      <SEOHead
        title="Elizabeth Rocha | Financial Strategist"
        description="Meet Elizabeth Rocha, a licensed Financial Strategist serving Southern California families with family financial planning, income protection, mortgage protection, retirement strategies, and life insurance."
        keywords="Elizabeth Rocha, financial strategist, life insurance, mortgage protection, income protection, retirement planning, Southern California, The Financial Architects"
        canonical={`${siteConfig.url}/advisors/elizabeth-rocha`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-accent/20 text-accent hover:bg-accent/30 mb-4">
                Financial Strategist
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Elizabeth Rocha
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist | The Financial Architects
              </p>
              <p className="text-lg text-accent italic mb-4">
                "Faith-led planning. Family-first protection. Legacy-driven wealth."
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Southern California</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white/60 mb-6 text-sm">
                <Award className="h-4 w-4 mr-2" />
                <span>Licensed Life & Health Agent — CA Lic# 4196019</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Designing intentional wealth for modern families through education, protection, and long-term planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Consultation
                </Button>
                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-white/80">
                <a href="tel:+16266228408" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  626-622-8408
                </a>
                <a href="mailto:erocha@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  erocha@tfainsuranceadvisors.com
                </a>
              </div>
              <div className="flex gap-4 justify-center lg:justify-start mt-4 text-white/70">
                <a
                  href="https://instagram.com/tfaelizabeth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-accent transition-colors"
                  aria-label="Instagram @tfaelizabeth"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  @tfaelizabeth
                </a>
                <a
                  href="https://www.facebook.com/mrselizabethrocha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={elizabethRochaImg}
                  alt="Elizabeth Rocha - Financial Strategist"
                  className="relative w-80 h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-4">About Elizabeth</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Designing Intentional Wealth for Modern Families
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-5">
                  I'm a licensed Financial Professional serving families across Southern California since 2021, specializing in family financial planning, income protection, mortgage protection, and retirement strategies.
                </p>
                <p className="mb-5">
                  My passion is helping individuals and families create strong financial foundations by protecting what matters most today while preparing for the future they envision. I believe financial planning should be rooted in education so families can make confident decisions that support both security and legacy.
                </p>
                <p className="mb-5">
                  Guided by the principle of keeping God first, family second, and career third, my mission is to help families achieve financial independence through thoughtful planning, protection, and long-term education. In the future, I hope to dedicate my time to helping survivors of human trafficking build financial stability and plan for their retirement and their children's futures.
                </p>
                <p>
                  As a wife, parent, and homeowner, I understand firsthand the importance of protecting a family's future, creating stability, and building a lasting legacy for the next generation.
                </p>
              </div>
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
                <p className="text-lg italic text-navy font-medium">
                  "Faith-led planning. Family-first protection. Legacy-driven wealth."
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1.5 px-3">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
              <img
                src={elizabethRochaCoupleImg}
                alt="Elizabeth Rocha with family"
                className="w-full max-w-md rounded-2xl object-cover shadow-2xl"
              />
              <img
                src={elizabethRochaLogo}
                alt="Elizabeth Rocha — Life Insurance Agent | The Financial Architects"
                className="w-56 h-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Areas of Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How I Can Help Your Family
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive, education-first financial solutions tailored to your family's goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-navy">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">The Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Working Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clear, education-first approach to building your family's financial foundation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div
                    className="absolute top-8 left-1/2 w-full h-0.5 bg-navy/20 -z-10 hidden lg:block"
                    style={{ display: index === processSteps.length - 1 ? "none" : undefined }}
                  />
                  <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Family's Foundation?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's talk about your goals and design a plan rooted in protection, purpose, and legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setScheduleModalOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Consultation
            </Button>
            <Button
              size="lg"
              variant="hero"
              onClick={() => setContactModalOpen(true)}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>
          <p className="text-white/60 text-sm">
            Licensed in California — CA Lic# 4196019
          </p>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Elizabeth Rocha"
        advisorEmail="erocha@tfainsuranceadvisors.com"
        advisorImage={elizabethRochaImg}
        advisorSlug="elizabeth-rocha"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Elizabeth Rocha"
        advisorEmail="erocha@tfainsuranceadvisors.com"
        advisorImage={elizabethRochaImg}
        advisorSlug="elizabeth-rocha"
      />
    </>
  );
};

export default AdvisorElizabethRocha;