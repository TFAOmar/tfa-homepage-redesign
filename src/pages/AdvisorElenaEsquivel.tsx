import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  ArrowRight,
  Award,
  Heart,
  TrendingUp,
  Landmark,
  DollarSign,
  Stethoscope
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import elenaEsquivelImg from "@/assets/advisors/elena-esquivel.jpg";

const specialties = [
  "Medicare Planning",
  "Retirement Planning",
  "401(k) Guidance",
  "Estate Planning",
  "Tax Strategies",
  "Life Insurance"
];

const services = [
  {
    icon: Stethoscope,
    title: "Medicare Planning",
    description: "Navigate Medicare options with confidence—from enrollment decisions to coverage optimization for your healthcare needs."
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description: "Build sustainable income strategies for your golden years, ensuring financial security throughout retirement."
  },
  {
    icon: Landmark,
    title: "401(k) Guidance",
    description: "Smart rollover and optimization strategies to maximize your retirement savings and minimize unnecessary fees."
  },
  {
    icon: FileText,
    title: "Estate Planning",
    description: "Living trusts and legacy protection to ensure your assets transfer smoothly to your loved ones."
  },
  {
    icon: DollarSign,
    title: "Tax Strategies",
    description: "Wealth-preservation and tax-efficient planning to keep more of what you've worked hard to earn."
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Income protection solutions designed to safeguard your family's financial future."
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description: "We'll discuss your goals, concerns, and current situation to understand where you are and where you want to be."
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description: "I'll review your existing coverage, retirement accounts, and assets, identifying gaps and opportunities."
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Together, we'll develop a customized plan tailored to your unique needs and retirement timeline."
  },
  {
    icon: Handshake,
    title: "Implementation",
    description: "I'll guide you through every step, providing ongoing support as your needs evolve."
  }
];

const AdvisorElenaEsquivel = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Elena Esquivel",
    "Financial Strategist & Estate Planning Consultant",
    "Elena Esquivel brings over 15 years of insurance and financial services experience, specializing in Medicare planning, retirement strategies, and estate planning.",
    elenaEsquivelImg,
    `${siteConfig.url}/advisors/elena-esquivel`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Chino Hills",
    {
      street: "13890 Peyton Dr",
      city: "Chino Hills",
      state: "CA",
      zip: "91709"
    },
    "(951) 255-4997"
  );

  return (
    <>
      <SEOHead
        title="Elena Esquivel | Financial Strategist & Estate Planning Consultant | The Financial Architects"
        description="Meet Elena Esquivel, a bilingual Financial Strategist with 15+ years of experience specializing in Medicare planning, retirement strategies, 401(k) guidance, and estate planning."
        keywords="Elena Esquivel, financial strategist, Medicare planning, retirement planning, 401k rollover, estate planning, bilingual, Chino Hills CA"
        canonical={`${siteConfig.url}/advisors/elena-esquivel`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 mb-4 border-amber-400/30">
                Bilingual • Bilingüe
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Elena Esquivel
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist & Estate Planning Consultant
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Chino Hills, CA</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 italic">
                "Empowering families with clarity, confidence, and lasting financial freedom."
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
                <a href="tel:+19512554997" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (951) 255-4997
                </a>
                <a href="mailto:eeesquivel@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  eeesquivel@tfainsuranceadvisors.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={elenaEsquivelImg}
                  alt="Elena Esquivel - Financial Strategist & Estate Planning Consultant"
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
              <Badge variant="outline" className="mb-4">About Elena</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                15+ Years of Financial Expertise
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                With over 15 years in Insurance and Financial Services, Elena Esquivel has built a reputation for guiding families through life's most important financial decisions. Her expertise spans Medicare planning, income protection, retirement strategies, and comprehensive estate planning.
              </p>
              <p className="mb-6">
                <strong className="text-navy">As a former top producer at Kaiser Permanente for five consecutive years</strong>, Elena understands what it takes to deliver exceptional service and results. This experience shaped her client-first approach—always putting your needs, goals, and peace of mind at the center of every conversation.
              </p>
              <p className="mb-6">
                Elena excels in guiding clients through 401(k) rollovers, wealth-preservation strategies, sustainable retirement income, and estate planning solutions including living trusts and legacy protection. Her mission: to empower families with clarity, confidence, and lasting financial freedom.
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
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span>Top Producer 5 Years</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                <span>Life & Health Lic# 4218087</span>
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
              Comprehensive financial solutions from Medicare to estate planning
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
              A straightforward approach to achieving your financial goals
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
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and create a personalized plan for your retirement and legacy.
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
            <Link to="/living-trust-questionnaire">
              <Button 
                size="lg" 
                variant="hero"
                className="w-full"
              >
                Living Trust Questionnaire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <a 
            href="tel:+19512554997" 
            className="inline-flex items-center text-white/80 hover:text-accent transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            (951) 255-4997
          </a>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Elena Esquivel"
        advisorEmail="eeesquivel@tfainsuranceadvisors.com"
        advisorImage={elenaEsquivelImg}
        advisorSlug="elena-esquivel"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Elena Esquivel"
        advisorEmail="eeesquivel@tfainsuranceadvisors.com"
        advisorImage={elenaEsquivelImg}
        advisorSlug="elena-esquivel"
      />
    </>
  );
};

export default AdvisorElenaEsquivel;
