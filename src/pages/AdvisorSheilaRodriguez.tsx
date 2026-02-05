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
  TrendingUp,
  Building2,
  PiggyBank,
  Scale
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import sheilaRodriguezImg from "@/assets/advisors/sheila-rodriguez.jpg";

const specialties = [
  "Investment Management",
  "Retirement Planning",
  "Risk Assessment",
  "Tax Optimization",
  "Estate Planning"
];

const services = [
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Strategic investment guidance to help grow and protect your wealth with portfolios tailored to your goals and risk tolerance."
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description: "Comprehensive retirement strategies to ensure you can enjoy your golden years with confidence and financial security."
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Thorough analysis of potential risks to your financial well-being with strategies to mitigate and manage them effectively."
  },
  {
    icon: Scale,
    title: "Tax Optimization",
    description: "Strategic tax planning to minimize your tax burden while maximizing your wealth-building opportunities."
  },
  {
    icon: FileText,
    title: "Estate Planning",
    description: "Thoughtful estate planning strategies to protect your legacy and ensure your assets are transferred according to your wishes."
  },
  {
    icon: Building2,
    title: "Business Financial Strategy",
    description: "Expert guidance for business owners to optimize operations, manage cash flow, and drive sustainable growth."
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description: "We'll have a detailed conversation about your financial goals, concerns, and current situation to understand your unique needs."
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description: "I'll conduct a thorough review of your existing financial strategies, identifying gaps and opportunities for improvement."
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Together, we'll develop a comprehensive, customized financial plan aligned with your objectives and timeline."
  },
  {
    icon: Handshake,
    title: "Implementation",
    description: "I'll guide you through every step of execution, providing ongoing support as your needs and circumstances evolve."
  }
];

const AdvisorSheilaRodriguez = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Sheila Rodriguez",
    "Financial Strategist",
    "Sheila Rodriguez is a seasoned financial strategist with over 25 years of experience in mortgage, banking, and financial services, helping individuals and businesses achieve their financial goals.",
    sheilaRodriguezImg,
    `${siteConfig.url}/advisors/sheila-rodriguez`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Overland Park",
    {
      street: "",
      city: "Overland Park",
      state: "KS",
      zip: "66212"
    },
    "(661) 816-1920"
  );

  return (
    <>
      <SEOHead
        title="Sheila Rodriguez | Financial Strategist | The Financial Architects"
        description="Meet Sheila Rodriguez, a seasoned financial strategist with 25+ years of experience in investment management, retirement planning, tax optimization, and estate planning in Overland Park, KS."
        keywords="Sheila Rodriguez, financial strategist, investment management, retirement planning, tax optimization, estate planning, Overland Park KS, Kansas financial advisor"
        canonical={`${siteConfig.url}/advisors/sheila-rodriguez`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Sheila Rodriguez
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Overland Park, KS</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 italic">
                "Helping you navigate the complexities of finance and achieve your financial dreams."
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
                <a href="tel:+16618161920" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (661) 816-1920
                </a>
                <a href="mailto:sheila@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  sheila@tfainsuranceadvisors.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={sheilaRodriguezImg}
                  alt="Sheila Rodriguez - Financial Strategist"
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
              <Badge variant="outline" className="mb-4">About Sheila</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                25+ Years of Financial Expertise
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Sheila Rodriguez is a seasoned financial strategist with a passion for helping individuals and businesses achieve their financial goals. With over 25 years of experience in the mortgage, banking, and financial services industry, she has earned a reputation for her astute insights, innovative solutions, and unwavering commitment to her clients' success.
              </p>
              <p className="mb-6">
                As a financial strategist, Sheila specializes in crafting comprehensive financial plans tailored to each client's unique circumstances and objectives. Her expertise spans a wide range of financial disciplines, including <strong className="text-navy">investment management, retirement planning, risk assessment, tax optimization, and estate planning</strong>. Sheila's holistic approach ensures that her clients receive well-rounded guidance to navigate the complex world of finance.
              </p>
              <p className="mb-6">
                Sheila's career is marked by a track record of delivering tangible results. She has successfully guided countless individuals towards financial security and helped businesses optimize their financial operations to drive growth and profitability. Her ability to simplify complex financial concepts and communicate them effectively empowers her clients to make informed decisions that align with their financial aspirations.
              </p>
              <p className="mb-6">
                Whether you're planning for retirement, looking to invest wisely, or need guidance in any aspect of your financial journey, Sheila is the strategist you can count on to navigate the complexities of finance and help you achieve your financial dreams.
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
              Comprehensive financial solutions tailored to your unique circumstances
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
              A collaborative approach to achieving your financial goals
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
            Ready to Achieve Your Financial Goals?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and create a personalized financial strategy for your success.
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
          <a 
            href="tel:+16618161920" 
            className="inline-flex items-center text-white/80 hover:text-accent transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            (661) 816-1920
          </a>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Sheila Rodriguez"
        advisorEmail="sheila@tfainsuranceadvisors.com"
        advisorImage={sheilaRodriguezImg}
        advisorSlug="sheila-rodriguez"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Sheila Rodriguez"
        advisorEmail="sheila@tfainsuranceadvisors.com"
        advisorImage={sheilaRodriguezImg}
        advisorSlug="sheila-rodriguez"
      />
    </>
  );
};

export default AdvisorSheilaRodriguez;
