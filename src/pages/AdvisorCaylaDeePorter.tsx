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
  BookOpen,
  GraduationCap
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import caylaDeePorterImg from "@/assets/advisors/cayla-dee-porter.jpg";

const specialties = [
  "Indexed Strategies",
  "Retirement Planning",
  "Tax Strategies",
  "Financial Literacy"
];

const services = [
  {
    icon: TrendingUp,
    title: "Indexed Strategies",
    description: "Strategic indexed solutions that help protect your wealth while providing growth opportunities tied to market performance without direct market risk."
  },
  {
    icon: Shield,
    title: "Retirement Planning",
    description: "Guiding you towards proper and strategic asset distributions that allow you to transition into retirement stress-free and prepared."
  },
  {
    icon: FileText,
    title: "Tax Strategies",
    description: "Navigate proper tax strategies and saving techniques to help you be prepared for the financial plans you have ahead."
  },
  {
    icon: GraduationCap,
    title: "Financial Literacy & Education",
    description: "Increasing your financial literacy and investment knowledge to help you make powerful and informed decisions for your future."
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description: "We'll discuss your goals, concerns, and current financial situation to understand where you are and where you want to be."
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description: "I'll review your existing coverage and financial position, identifying gaps and opportunities for improvement."
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Together, we'll develop a customized plan tailored to your unique needs, timeline, and risk tolerance."
  },
  {
    icon: Handshake,
    title: "Implementation",
    description: "I'll guide you through every step of putting your plan into action, with ongoing support as your needs evolve."
  }
];

const AdvisorCaylaDeePorter = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Cayla Dee Porter",
    "Certified Financial Fiduciary®",
    "Certified Financial Fiduciary® focused on Indexed Strategies, Retirement Planning, Tax Strategies, and Financial Literacy in Brea, CA.",
    caylaDeePorterImg,
    `${siteConfig.url}/advisors/cayla-dee-porter`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Brea",
    {
      street: "200 W Imperial Hwy",
      city: "Brea",
      state: "CA",
      zip: "92821"
    },
    "(707) 320-3087"
  );

  return (
    <>
      <SEOHead
        title="Cayla Dee Porter | Certified Financial Fiduciary® | The Financial Architects"
        description="Meet Cayla Dee Porter, a Certified Financial Fiduciary® specializing in Indexed Strategies, Retirement Planning, Tax Strategies, and Financial Literacy in Brea, CA."
        keywords="Cayla Dee Porter, certified financial fiduciary, indexed strategies, retirement planning, tax strategies, financial literacy, Brea CA"
        canonical={`${siteConfig.url}/advisors/cayla-dee-porter`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-accent/20 text-accent hover:bg-accent/30 mb-4">
                Certified Financial Fiduciary®
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Cayla Dee Porter
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Certified Financial Fiduciary®
              </p>
              <p className="text-lg text-accent italic mb-4">
                "Protection and Prosperity for All"
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Brea, CA</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white/60 mb-6 text-sm">
                <Award className="h-4 w-4 mr-2" />
                <span>Licensed Life, Health and Accident Agent — CA#4197988</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Focused on Indexed Strategies that help protect your wealth and guide you towards a stress-free retirement through proper planning and strategic asset distributions.
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
                <a href="tel:+17073203087" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (707) 320-3087
                </a>
                <a href="mailto:cayladee@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  cayladee@tfainsuranceadvisors.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={caylaDeePorterImg}
                  alt="Cayla Dee Porter - Certified Financial Fiduciary"
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
              <Badge variant="outline" className="mb-4">About Cayla Dee</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                An Educator at Heart
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Cayla Dee has a financial focus on Indexed Strategies that help protect your wealth. When it comes to retirement planning, she will guide you towards proper and strategic asset distributions that allow you to transition into retirement stress-free and prepared. She also helps navigate you through proper tax strategies, and saving techniques to help be prepared for the financial plans you have ahead.
              </p>
              <p className="mb-6">
                Being an educator at heart, she strives to increase her clients' financial literacy and investment knowledge to help them make powerful and informed decisions for their future.
              </p>
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
                <p className="text-lg italic text-navy font-medium">
                  "Building financially independent individuals who can retire early and enjoy a lifestyle tailored to their aspirations and goals is a focus of mine."
                </p>
              </div>
              <p>
                Away from work, Cayla Dee enjoys spending quality time with her nieces, exploring the culinary world by cooking in different countries and trying new cuisines. She also spends time outdoors exploring the mountains and beaches of California.
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
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-accent" />
                <span>Certified Financial Fiduciary®</span>
                <span className="mx-2">•</span>
                <Heart className="h-5 w-5 text-accent" />
                <span>Educator & Financial Strategist</span>
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
              Comprehensive financial solutions tailored to your unique goals and circumstances
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
              A straightforward approach to building your financial foundation
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your financial goals and create a personalized plan for your future.
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
        advisorName="Cayla Dee Porter"
        advisorEmail="cayladee@tfainsuranceadvisors.com"
        advisorImage={caylaDeePorterImg}
        advisorSlug="cayla-dee-porter"
        schedulingLink="https://calendly.com/cayladee"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Cayla Dee Porter"
        advisorEmail="cayladee@tfainsuranceadvisors.com"
        advisorImage={caylaDeePorterImg}
        advisorSlug="cayla-dee-porter"
      />
    </>
  );
};

export default AdvisorCaylaDeePorter;
