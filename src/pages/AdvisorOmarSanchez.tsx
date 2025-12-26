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
  Target,
  TrendingUp,
  Shield,
  Users,
  Building2,
  Briefcase,
  Award,
  FileText,
  Globe
} from "lucide-react";
import omarImage from "@/assets/advisors/omar-sanchez.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Life Insurance",
  "Retirement Planning",
  "Estate Planning",
  "Business Development",
  "Advisor Mentorship",
  "Strategic Planning"
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Customized life insurance solutions that provide protection and wealth accumulation for your family's future."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic retirement solutions designed to help you achieve financial independence with confidence."
  },
  {
    icon: TrendingUp,
    title: "Estate Planning",
    description: "Comprehensive estate strategies to protect your assets and ensure your legacy for future generations."
  },
  {
    icon: Building2,
    title: "Business Development",
    description: "Scalable systems and processes to help financial advisors grow their practices effectively."
  },
  {
    icon: Users,
    title: "Advisor Mentorship",
    description: "Training and development programs for financial professionals committed to client-first service."
  },
  {
    icon: Briefcase,
    title: "Strategic Planning",
    description: "Modern financial planning systems that simplify complex strategies for lasting client success."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "A complimentary conversation to understand your financial goals, concerns, and current situation."
  },
  {
    number: "02",
    title: "Comprehensive Analysis",
    description: "Thorough review of your complete financial picture to identify opportunities and gaps."
  },
  {
    number: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your customized plan with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "Guided execution of your plan with ongoing support as your life evolves."
  }
];

const AdvisorOmarSanchez = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Omar Sanchez - COO & Managing Partner of The Financial Architects"
        description="Work with Omar Sanchez, Chief Operating Officer & Managing Partner of The Financial Architects in Chino Hills, CA. Leading national expansion and advisor development."
        canonical={`${siteConfig.url}/advisors/omar-sanchez`}
        ogType="profile"
        keywords="TFA COO, financial advisor Chino Hills, retirement planning, life insurance, estate planning, bilingual advisor"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Omar Sanchez - COO & Managing Partner | The Financial Architects",
          "Work with Omar Sanchez, Chief Operating Officer & Managing Partner of The Financial Architects in Chino Hills, CA.",
          `${siteConfig.url}/advisors/omar-sanchez`
        ),
        generatePersonSchema(
          "Omar Sanchez",
          "Chief Operating Officer & Managing Partner",
          "Omar Sanchez is the Chief Operating Officer and Managing Partner of The Financial Architects, leading national expansion, advisor development, and modern financial planning systems.",
          omarImage,
          `${siteConfig.url}/advisors/omar-sanchez`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Omar Sanchez", url: `${siteConfig.url}/advisors/omar-sanchez` }
        ])
      ]} />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                    Chief Operating Officer & Managing Partner
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Globe className="mr-1 h-3 w-3" />
                    Bilingual • Bilingüe
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Omar Sanchez
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light">
                  "Simplifying complex strategies to build scalable success."
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  As the COO and Managing Partner of The Financial Architects, Omar leads the firm's 
                  national expansion, advisor development, and the implementation of modern financial 
                  planning systems. Known for his ability to simplify complex strategies and build 
                  scalable processes, Omar has become one of the leading architects behind TFA's mission.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>Chino Hills, California</span>
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
                  <Link to="/advisors/omar-sanchez/life-insurance">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-accent bg-transparent text-accent hover:bg-accent/20"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Start Life Insurance Application
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                  <img
                    src={omarImage}
                    alt="Omar Sanchez - COO & Managing Partner"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <span className="text-2xl font-bold">TFA</span>
                    <span className="text-sm block">Leadership</span>
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
                About Omar
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Leading TFA's National Mission
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Omar Sanchez is the Chief Operating Officer and Managing Partner of The Financial 
                  Architects, where he leads the firm's national expansion, advisor development, and 
                  the implementation of modern financial planning systems. His unique ability to 
                  simplify complex strategies has made him instrumental in TFA's growth.
                </p>
                <p>
                  Known for building scalable processes that empower both advisors and clients, Omar 
                  has become one of the leading architects behind TFA's mission to bring needs-based 
                  financial planning to communities across the nation. His bilingual capabilities 
                  allow him to serve diverse communities with the same level of excellence and care.
                </p>
                <p>
                  Omar's approach combines operational excellence with a deep commitment to client 
                  success. He believes that the best financial strategies are those that are both 
                  sophisticated and accessible—powerful enough to make a real difference, yet simple 
                  enough for clients to understand and embrace.
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
                Comprehensive Financial Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Strategic guidance combining operational excellence with personalized 
                financial planning for lasting success.
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
                A straightforward approach to building your financial future with clarity and confidence.
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
                Ready to Build Your Financial Future?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                As TFA's COO and Managing Partner, Omar is committed to helping families 
                achieve lasting financial security. Schedule your free consultation today.
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
                <Link to="/advisors/omar-sanchez/life-insurance">
                  <Button 
                    size="lg" 
                    variant="hero"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Application
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-white/60 text-sm">
                Free consultation. No obligations. Just honest guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Modals */}
        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          advisorName="Omar Sanchez"
          advisorEmail="omar@tfainsuranceadvisors.com"
          advisorImage={omarImage}
          schedulingLink="https://tfa.pipedrive.com/scheduler/M93alkfo/strategic-call-with-omar-sanchez-the-financial-architects"
          advisorSlug="omar-sanchez"
        />
        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName="Omar Sanchez"
          advisorEmail="omar@tfainsuranceadvisors.com"
          advisorImage={omarImage}
        />
      </div>
    </>
  );
};

export default AdvisorOmarSanchez;
