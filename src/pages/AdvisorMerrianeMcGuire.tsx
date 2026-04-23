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
  FileText,
  Users,
  Target,
  Handshake,
  ClipboardCheck,
  Award,
  Heart,
  Home as HomeIcon
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import merrianeMcGuireImg from "@/assets/advisors/merriane-mcguire.jpg";

const specialties = [
  "Retirement Planning",
  "Life Insurance",
  "Estate Planning"
];

const services = [
  {
    icon: Shield,
    title: "Retirement Planning",
    description: "Building strategies that go beyond Social Security so you can retire with confidence, comfort, and a reliable stream of income."
  },
  {
    icon: Heart,
    title: "Life Insurance",
    description: "Protecting your family from unexpected hardship with thoughtful life insurance solutions tailored to your stage of life and goals."
  },
  {
    icon: FileText,
    title: "Estate Planning & Living Trusts",
    description: "Helping you organize and protect your legacy through living trusts and estate planning, so your loved ones avoid unnecessary financial and legal challenges."
  },
  {
    icon: TrendingUp,
    title: "Protection-First Strategies",
    description: "Combining retirement, insurance, and legacy planning into a clear roadmap focused on protecting what you've built and providing lasting peace of mind."
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description: "We start with a conversation about your goals, your family, and what financial peace of mind looks like for you."
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description: "I review your current situation — retirement income, insurance, and estate readiness — to identify gaps and opportunities."
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Together we build a personalized plan covering retirement, life insurance, and living trusts to protect your future."
  },
  {
    icon: Handshake,
    title: "Implementation",
    description: "I walk with you through every step, putting your plan into action and reviewing it as life evolves."
  }
];

const AdvisorMerrianeMcGuire = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Merriane McGuire",
    "Financial Strategist",
    "Licensed Life Insurance Agent and Financial Strategist serving Riverside and Chino Hills, CA. Specializing in retirement planning, life insurance, and estate planning.",
    merrianeMcGuireImg,
    `${siteConfig.url}/advisors/merriane-mcguire`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Riverside",
    {
      street: "",
      city: "Riverside",
      state: "CA",
      zip: ""
    },
    "(951) 264-5347"
  );

  return (
    <>
      <SEOHead
        title="Merriane McGuire | Financial Strategist | The Financial Architects"
        description="Meet Merriane McGuire, a Financial Strategist specializing in retirement planning, life insurance, and estate planning. Serving Riverside and Chino Hills, CA."
        keywords="Merriane McGuire, financial strategist, retirement planning, life insurance, estate planning, living trusts, Riverside CA, Chino Hills CA"
        canonical={`${siteConfig.url}/advisors/merriane-mcguire`}
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
                Merriane McGuire
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist
              </p>
              <p className="text-lg text-accent italic mb-4">
                "Protecting families. Preparing futures."
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Riverside &amp; Chino Hills, CA</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white/60 mb-6 text-sm">
                <Award className="h-4 w-4 mr-2" />
                <span>Life &amp; Health Licensed — CA #4348850 • FL #G18507 • VA #1498765</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Helping individuals and families understand and implement life insurance, retirement strategies, and living trusts to protect their future and provide lasting peace of mind.
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
                <a href="tel:+19512645347" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (951) 264-5347
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={merrianeMcGuireImg}
                  alt="Merriane McGuire - Financial Strategist"
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
              <Badge variant="outline" className="mb-4">About Merriane</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                A Heart for Families. A Mission for Protection.
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Before joining Financial Architects, Merriane worked with the Social Security Administration, where she served the public and worked closely with seniors. During that time, she saw firsthand how many individuals rely solely on Social Security for retirement — often without enough income to live comfortably and with no additional plans in place. That experience highlighted the critical importance of retirement and protection planning.
              </p>
              <p className="mb-6">
                Personal experiences further shaped her passion for this work, including witnessing the impact of a serious illness and the absence of life insurance and estate planning within her own family. Seeing loved ones face unnecessary financial and legal challenges reinforced her commitment to education and preparation.
              </p>
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
                <p className="text-lg italic text-navy font-medium">
                  "Today, my mission is simple — help families protect what matters most so they never have to face the hard moments unprepared."
                </p>
              </div>
              <p>
                As a licensed Life Insurance Agent and Financial Strategist serving Riverside and Chino Hills, CA, Merriane focuses on helping individuals and families understand and implement life insurance, retirement strategies, and living trusts to protect their future and provide lasting peace of mind.
              </p>
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
              <div className="flex items-center gap-2 text-muted-foreground flex-wrap justify-center">
                <Award className="h-5 w-5 text-accent" />
                <span>8+ Years of Experience</span>
                <span className="mx-2">•</span>
                <HomeIcon className="h-5 w-5 text-accent" />
                <span>Licensed in CA, FL &amp; VA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How I Can Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protection-focused financial solutions designed around your family's needs and future.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
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
              A clear, supportive approach to building protection and preparing for your future.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-navy/20 -z-10 hidden lg:block"
                       style={{ display: index === processSteps.length - 1 ? 'none' : undefined }} />
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
            Ready to Protect What Matters Most?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's talk about your goals and build a plan that gives you and your family lasting peace of mind.
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
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Merriane McGuire"
        advisorImage={merrianeMcGuireImg}
        advisorSlug="merriane-mcguire"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Merriane McGuire"
        advisorImage={merrianeMcGuireImg}
        advisorSlug="merriane-mcguire"
      />
    </>
  );
};

export default AdvisorMerrianeMcGuire;
