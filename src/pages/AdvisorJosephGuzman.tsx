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
  Home, 
  FileText, 
  Users, 
  Target,
  Handshake,
  ClipboardCheck,
  Award,
  Heart,
  Building
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import josephGuzmanImg from "@/assets/advisors/joseph-guzman.png";

const specialties = [
  "Real Estate Services",
  "Living Trusts",
  "Mortgage Protection",
  "Life Insurance"
];

const services = [
  {
    icon: Building,
    title: "Real Estate Services",
    description: "Expert guidance through real estate transactions, helping you make informed decisions about property investments and homeownership."
  },
  {
    icon: FileText,
    title: "Living Trusts",
    description: "Comprehensive trust planning to protect your assets, avoid probate, and ensure your legacy is preserved for future generations."
  },
  {
    icon: Home,
    title: "Mortgage Protection",
    description: "Safeguard your home and family with mortgage protection strategies that ensure your biggest investment stays secure."
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Tailored life insurance solutions to provide financial security and peace of mind for you and your loved ones."
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

const AdvisorJosephGuzman = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Joseph Guzman",
    "Financial Strategist",
    "Financial Strategist with 8 years of experience in Real Estate services, providing Living Trusts and Mortgage protection.",
    josephGuzmanImg,
    `${siteConfig.url}/advisors/joseph-guzman`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Chino Hills",
    {
      street: "",
      city: "Chino Hills",
      state: "CA",
      zip: "91709"
    },
    ""
  );

  return (
    <>
      <SEOHead
        title="Joseph Guzman | Financial Strategist | The Financial Architects"
        description="Meet Joseph Guzman, a Financial Strategist with 8 years of experience specializing in Real Estate, Living Trusts, and Mortgage Protection in Chino Hills, CA."
        keywords="Joseph Guzman, financial strategist, real estate, living trusts, mortgage protection, life insurance, Chino Hills CA"
        canonical={`${siteConfig.url}/advisors/joseph-guzman`}
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
                Joseph Guzman
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Chino Hills, CA</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Helping families protect their homes, plan their estates, and secure their financial futures through personalized strategies.
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
                <a href="mailto:jguzman@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  jguzman@tfainsuranceadvisors.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={josephGuzmanImg}
                  alt="Joseph Guzman - Financial Strategist"
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
              <Badge variant="outline" className="mb-4">About Joseph</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                8 Years of Dedicated Service
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Joseph Guzman is a Financial Strategist with 8 years of experience in real estate services, specializing in living trusts and mortgage protection. Based in Chino Hills, California, Joseph works with families and individuals to safeguard their most important assets—their homes and their legacies.
              </p>
              <p className="mb-6">
                With a deep understanding of the real estate landscape, Joseph helps clients navigate the complexities of property ownership while ensuring their families are protected through comprehensive mortgage protection strategies and estate planning solutions.
              </p>
              <p>
                As a Financial Strategist with The Financial Architects, Joseph is committed to providing personalized guidance that empowers clients to make confident decisions about their financial futures. Whether you're a first-time homeowner looking to protect your investment or a family seeking to establish a living trust, Joseph brings the expertise and dedication needed to help you achieve your goals.
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
                <span>8 Years Experience</span>
                <span className="mx-2">•</span>
                <Heart className="h-5 w-5 text-accent" />
                <span>Real Estate & Estate Planning Specialist</span>
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
        advisorName="Joseph Guzman"
        advisorEmail="jguzman@tfainsuranceadvisors.com"
        advisorImage={josephGuzmanImg}
        advisorSlug="joseph-guzman"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Joseph Guzman"
        advisorEmail="jguzman@tfainsuranceadvisors.com"
        advisorImage={josephGuzmanImg}
        advisorSlug="joseph-guzman"
      />
    </>
  );
};

export default AdvisorJosephGuzman;
