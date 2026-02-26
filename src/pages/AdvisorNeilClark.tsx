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
  Users,
  Briefcase,
  Home,
  Award,
  FileText,
  GraduationCap,
  TrendingUp
} from "lucide-react";
import neilImage from "@/assets/advisors/neil-clark.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Life Insurance",
  "Estate Planning",
  "Executive Retention Packages",
  "Financial Education",
  "Business Insurance",
  "Retirement Planning"
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Comprehensive life insurance strategies tailored to protect your family and secure your financial legacy."
  },
  {
    icon: Home,
    title: "Estate Planning",
    description: "Using insurance as a powerful estate planning tool to protect assets and ensure a smooth transfer of wealth."
  },
  {
    icon: Briefcase,
    title: "Executive Retention Packages",
    description: "Strategic insurance-based retention packages designed to attract and retain top executives and upper management."
  },
  {
    icon: GraduationCap,
    title: "Financial Education",
    description: "Empowering individuals, families, and students with the financial knowledge to make informed decisions early in life."
  },
  {
    icon: Users,
    title: "Business Insurance Solutions",
    description: "Tailored coverage solutions that protect business owners, their operations, and their key employees."
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description: "Forward-thinking strategies to help you build wealth, secure income, and enjoy a comfortable retirement."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "A complimentary conversation to understand your goals, concerns, and current situation."
  },
  {
    number: "02",
    title: "Needs Assessment",
    description: "Thorough review of your complete financial picture to identify the best protection strategies."
  },
  {
    number: "03",
    title: "Customized Solutions",
    description: "Clear presentation of your personalized plan with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Continued guidance and education as your life evolves and your needs change."
  }
];

const AdvisorNeilClark = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Cornelius 'Neil' Clark - Insurance Agent & Protection Strategist | The Financial Architects"
        description="Work with Neil Clark, a 12-year insurance veteran and protection strategist in Rancho Cucamonga, CA. Specializing in life insurance, estate planning, and executive retention packages."
        canonical={`${siteConfig.url}/advisors/neil-clark`}
        ogType="profile"
        keywords="insurance agent Rancho Cucamonga, protection strategist, life insurance, estate planning, executive retention packages California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Cornelius 'Neil' Clark - Insurance Agent & Protection Strategist | The Financial Architects",
          "Work with Neil Clark, a 12-year insurance veteran and protection strategist in Rancho Cucamonga, CA.",
          `${siteConfig.url}/advisors/neil-clark`
        ),
        generatePersonSchema(
          "Cornelius 'Neil' Clark",
          "Insurance Agent & Protection Strategist",
          "12-year insurance veteran and protection strategist specializing in life insurance, estate planning, and executive retention packages.",
          neilImage,
          `${siteConfig.url}/advisors/neil-clark`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Neil Clark", url: `${siteConfig.url}/advisors/neil-clark` }
        ])
      ]} />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                Insurance Agent & Protection Strategist
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Cornelius "Neil" Clark
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "Planning for your future is going to be bigger than you thought, happen quicker than you think, and be more rewarding than you ever dreamed of."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                With 12 years of experience as an insurance agent and protection strategist, 
                Neil educates individuals and businesses on the benefits of using insurance as 
                an estate planning tool and establishing retention packages for executives.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Rancho Cucamonga, California</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Life & Health Licensed</span>
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
                <Button 
                  size="lg" 
                  variant="hero" 
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
                <Link to="/advisors/neil-clark/life-insurance">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Start Life Insurance Application
                  </Button>
                </Link>
                <Link to="/advisors/neil-clark/living-trust-questionnaire">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Start Living Trust Questionnaire
                  </Button>
                </Link>
                <Link to="/advisors/neil-clark/prequalification">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Pre-Qualification
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                <img
                  src={neilImage}
                  alt="Cornelius 'Neil' Clark - Insurance Agent & Protection Strategist"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-sm block">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              About Neil
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Passion, Knowledge & Service
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Cornelius "Neil" Clark has 12 years of experience as an insurance agent and 
                protection strategist. He educates clients — whether individuals or businesses — 
                on the benefits of using insurance as an estate planning tool and establishing 
                retention packages for executives and upper management. Neil prides himself on 
                sharing his knowledge about this often forgotten and overlooked piece of building 
                a solid financial plan and foundation.
              </p>
              <p>
                Neil has worked in various parts of the financial industry and has been a keynote 
                speaker at different events. The event he is most proud of is when he spoke to a 
                group of students at Etiwanda High School in Rancho Cucamonga, CA. His time there 
                opened his eyes to the importance of educating children in the early stages of life 
                about financial concepts — because when you know better, you can absolutely do better.
              </p>
              <p>
                Although driven by his work, Neil's main driving force is his family. He has been 
                married 22 years to his lovely wife and has three children. He spends his time 
                attending the various sporting events of his children, going to the gym, and 
                catching up on sports highlights.
              </p>
              <p className="italic text-foreground font-medium">
                "Planning for your future is going to be bigger than you thought, it's going to 
                happen quicker than you think and be more rewarding than you ever dreamed of, 
                so take action today."
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

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Building a Solid Financial Foundation
            </h2>
            <p className="text-lg text-muted-foreground">
              Strategic protection and planning solutions built on 12 years of 
              experience helping individuals and businesses secure their futures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.title} className="bg-card border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              The Process
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Working Together
            </h2>
            <p className="text-lg text-muted-foreground">
              A service-driven approach to protecting your future with knowledge and care.
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
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Take Action Today?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Whether you need life insurance, estate planning, or executive retention strategies, 
              I'm here to help you build a solid financial foundation that's bigger than you ever imagined.
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
              <a href="tel:8883505396">
                <Button size="lg" variant="hero">
                  <Phone className="mr-2 h-5 w-5" />
                  (888) 350-5396
                </Button>
              </a>
              <Link to="/advisors/neil-clark/life-insurance">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Application
                </Button>
              </Link>
              <Link to="/advisors/neil-clark/living-trust-questionnaire">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Living Trust Questionnaire
                </Button>
              </Link>
              <Link to="/advisors/neil-clark/prequalification">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Pre-Qualification
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/60 text-sm">
              Free consultation. No obligations. Just honest, knowledgeable guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Cornelius 'Neil' Clark"
        advisorEmail="nclark@tfainsuranceadvisors.com"
        advisorImage={neilImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Cornelius 'Neil' Clark"
        advisorEmail="nclark@tfainsuranceadvisors.com"
        advisorImage={neilImage}
      />
    </div>
    </>
  );
};

export default AdvisorNeilClark;
