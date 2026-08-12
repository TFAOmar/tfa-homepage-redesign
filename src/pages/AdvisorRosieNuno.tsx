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
  FileText,
  Users,
  Target,
  Handshake,
  ClipboardCheck,
  Award,
  Heart,
  Printer,
  Briefcase,
  Landmark,
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import rosieNunoImg from "@/assets/advisors/rosie-nuno.jpg";

const specialties = [
  "Estate Planning & Living Trusts",
  "Asset Protection Strategies",
  "Legacy & Wealth Transfer Planning",
  "Financial Protection Strategies",
  "Integrated Financial Planning",
];

const services = [
  {
    icon: FileText,
    title: "Estate Planning & Living Trusts",
    description:
      "Comprehensive living trust solutions designed to protect your assets, avoid probate, and ensure your wishes are carried out exactly as intended.",
  },
  {
    icon: Shield,
    title: "Asset Protection Strategies",
    description:
      "Thoughtful strategies to safeguard what you've worked hard to build — from creditors, lawsuits, and unforeseen life events.",
  },
  {
    icon: Landmark,
    title: "Legacy & Wealth Transfer Planning",
    description:
      "Plan how your wealth and values pass to the next generation with structures that minimize taxes and maximize impact.",
  },
  {
    icon: Heart,
    title: "Financial Protection Strategies",
    description:
      "Foundational protection planning that brings clarity, security, and peace of mind to you and your family.",
  },
  {
    icon: Briefcase,
    title: "Integrated Financial Planning",
    description:
      "A coordinated, personalized approach that aligns estate, protection, and financial strategies into one clear plan.",
  },
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description:
      "We'll discuss your goals, family priorities, and current situation to understand what matters most to you.",
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description:
      "I'll review your existing plans and identify gaps in protection, estate, and asset preservation.",
  },
  {
    icon: Target,
    title: "Strategy",
    description:
      "Together we'll design a clear, personalized plan focused on simplicity and lasting peace of mind.",
  },
  {
    icon: Handshake,
    title: "Implementation",
    description:
      "I'll guide you through every step of putting your plan into action — with ongoing support as life evolves.",
  },
];

const AdvisorRosieNuno = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Rosie Nuño",
    "Financial & Estate Planning Strategist",
    "Financial & Estate Planning Strategist specializing in living trusts, asset protection, and integrated financial strategies in Brea, CA.",
    rosieNunoImg,
    `${siteConfig.url}/advisors/rosie-nuno`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Brea",
    {
      street: "200 W Imperial Hwy",
      city: "Brea",
      state: "CA",
      zip: "92821",
    },
    "(209) 204-9672"
  );

  return (
    <>
      <SEOHead
        title="Rosie Nuño"
        description="Meet Rosie Nuño, a Financial & Estate Planning Strategist specializing in living trusts, asset protection, legacy planning, and integrated financial strategies in Brea, CA."
        keywords="Rosie Nuño, estate planning strategist, living trusts, asset protection, legacy planning, financial planning, Brea CA"
        canonical={`${siteConfig.url}/advisors/rosie-nuno`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-accent/20 text-accent hover:bg-accent/30 mb-4">
                Financial & Estate Planning Strategist
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Rosie Nuño
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial & Estate Planning Strategist
              </p>
              <p className="text-lg text-accent italic mb-4">
                "Protecting What You've Built. Preserving What Matters Most."
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Brea, CA</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white/60 mb-6 text-sm">
                <Award className="h-4 w-4 mr-2" />
                <span>Licensed in California — CA Life License #0I43845</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Helping families and individuals create clarity, security, and lasting peace of mind through living trusts, asset protection, and foundational financial strategies.
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
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start text-white/80">
                <a href="tel:+12092049672" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (209) 204-9672
                </a>
                <a href="mailto:rosie@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  rosie@tfainsuranceadvisors.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={rosieNunoImg}
                  alt="Rosie Nuño - Financial & Estate Planning Strategist"
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">About Rosie</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Protecting What You've Built. Preserving What Matters Most.
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                As a Financial & Estate Planning Strategist, Rosie has guided clients through living trusts, asset protection, and foundational financial strategies designed to simplify planning and avoid unnecessary complications.
              </p>
              <p className="mb-6">
                Her approach is straightforward and personalized — focused on creating clarity, security, and lasting peace of mind for every client she serves.
              </p>
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
                <p className="text-lg italic text-navy font-medium">
                  "True planning is about protecting what you've built and preserving what matters most for the people you love."
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm py-1.5 px-3"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-accent" />
                <span>CA Life License #0I43845</span>
              </div>
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
              How I Can Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized planning designed to bring clarity, security, and peace of mind.
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
              A clear, straightforward path from goals to a plan you can rely on.
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
                    style={{ display: index === processSteps.length - 1 ? 'none' : undefined }}
                  />
                  <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Connect</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Get in Touch
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Direct</p>
                    <a href="tel:+12092049672" className="text-navy font-semibold hover:text-accent">
                      (209) 204-9672
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Office</p>
                    <a href="tel:+18883505396" className="text-navy font-semibold hover:text-accent">
                      (888) 350-5396
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <Printer className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fax</p>
                    <p className="text-navy font-semibold">(909) 579-2164</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <Mail className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:rosie@tfainsuranceadvisors.com" className="text-navy font-semibold hover:text-accent break-all">
                      rosie@tfainsuranceadvisors.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's design a plan that protects what you've built and preserves what matters most.
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
            Licensed in California — CA Life License #0I43845
          </p>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Rosie Nuño"
        advisorEmail="rosie@tfainsuranceadvisors.com"
        advisorImage={rosieNunoImg}
        advisorSlug="rosie-nuno"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Rosie Nuño"
        advisorEmail="rosie@tfainsuranceadvisors.com"
        advisorImage={rosieNunoImg}
        advisorSlug="rosie-nuno"
      />
    </>
  );
};

export default AdvisorRosieNuno;