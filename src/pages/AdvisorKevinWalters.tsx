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
  TrendingUp,
  Search
} from "lucide-react";
import kevinImage from "@/assets/advisors/kevin-walters.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Life Insurance",
  "LEAP Strategy",
  "Retirement Planning",
  "Estate Planning",
  "Financial Organization",
  "Wealth Building"
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Comprehensive life insurance solutions designed to protect your family and create a foundation for lasting financial security."
  },
  {
    icon: Search,
    title: "LEAP Strategy",
    description: "The Lifetime Economic Acceleration Process — finding the 'missing money' in your financial life and putting it to work for you."
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description: "Forward-thinking strategies to help you stop stressing about the future and start building a comfortable, secure retirement."
  },
  {
    icon: Home,
    title: "Estate Planning",
    description: "Protecting your legacy and ensuring your assets transfer smoothly to the people who matter most."
  },
  {
    icon: Briefcase,
    title: "Financial Organization",
    description: "Sorting through the '27 drawers' of your financial existence to create order out of chaos and a clear path forward."
  },
  {
    icon: Users,
    title: "Wealth Building",
    description: "Empowering you to transform complex financial hurdles into simple, winning strategies that build real, lasting wealth."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "A complimentary conversation to understand your goals, concerns, and current financial situation."
  },
  {
    number: "02",
    title: "Financial Assessment",
    description: "A thorough review of your complete financial picture — finding the 'missing money' hiding in your life."
  },
  {
    number: "03",
    title: "Customized Solutions",
    description: "Clear presentation of your personalized LEAP strategy with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Continued guidance and partnership as your life evolves and your wealth grows."
  }
];

const AdvisorKevinWalters = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Kevin B. Walters Sr. - Insurance Agent & LEAP Practitioner | The Financial Architects"
        description="Work with Kevin B. Walters Sr., a 30-year insurance veteran and LEAP practitioner in Troy, OH. Specializing in life insurance, retirement planning, estate planning, and the Lifetime Economic Acceleration Process."
        canonical={`${siteConfig.url}/advisors/kevin-walters`}
        ogType="profile"
        keywords="insurance agent Troy Ohio, LEAP practitioner, life insurance, retirement planning, estate planning, Lifetime Economic Acceleration Process"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Kevin B. Walters Sr. - Insurance Agent & LEAP Practitioner | The Financial Architects",
          "Work with Kevin B. Walters Sr., a 30-year insurance veteran and LEAP practitioner in Troy, OH.",
          `${siteConfig.url}/advisors/kevin-walters`
        ),
        generatePersonSchema(
          "Kevin B. Walters Sr.",
          "Insurance Agent & LEAP Practitioner",
          "30-year insurance veteran and LEAP practitioner specializing in life insurance, retirement planning, estate planning, and the Lifetime Economic Acceleration Process.",
          kevinImage,
          `${siteConfig.url}/advisors/kevin-walters`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Kevin B. Walters Sr.", url: `${siteConfig.url}/advisors/kevin-walters` }
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
                Insurance Agent & LEAP Practitioner
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Kevin B. Walters Sr.
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                On a mission to declutter the American wallet.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Founder of Walters Insurance Services and a seasoned LEAP practitioner, 
                Kevin has spent 30 years helping people find the "missing money" in their lives 
                through the Lifetime Economic Acceleration Process.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Troy, Ohio</span>
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
                <Link to="/advisors/kevin-walters/life-insurance">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Start Life Insurance Application
                  </Button>
                </Link>
                <Link to="/advisors/kevin-walters/living-trust-questionnaire">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Start Living Trust Questionnaire
                  </Button>
                </Link>
                <Link to="/advisors/kevin-walters/prequalification">
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
                  src={kevinImage}
                  alt="Kevin B. Walters Sr. - Insurance Agent & LEAP Practitioner"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">30</span>
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
              About Kevin
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Decluttering the American Wallet
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Kevin B. Walters Sr. is on a mission to declutter the American wallet. As the 
                founder of Walters Insurance Services and a seasoned LEAP practitioner, Kevin 
                has spent 30 years helping people find the "missing money" in their lives.
              </p>
              <p>
                He specializes in the Lifetime Economic Acceleration Process (LEAP), famously 
                helping clients sort through the "27 drawers" of their financial existence to 
                create order out of chaos. Whether it's scattered policies, overlooked 
                opportunities, or inefficient strategies, Kevin has a gift for turning financial 
                complexity into clarity.
              </p>
              <p>
                A veteran of the Jackson Fess and Columbus Financial Groups, Kevin's career is 
                defined by one goal: empowering individuals to stop stressing about the future 
                and start building one. Today, he brings his decades of expertise to 
                The Financial Architects (TFA), where he continues to transform complex 
                financial hurdles into simple, winning strategies.
              </p>
              <p className="italic text-foreground font-medium">
                "Stop stressing about the future — start building one."
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
              Finding the Missing Money in Your Life
            </h2>
            <p className="text-lg text-muted-foreground">
              Strategic financial solutions built on 30 years of experience 
              helping individuals create order out of chaos.
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
              A proven approach to finding your missing money and building a winning strategy.
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
              Ready to Find Your Missing Money?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Whether you need life insurance, retirement planning, or help organizing your 
              financial life, I'm here to help you stop stressing and start building.
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
              <a href="tel:9373877426">
                <Button size="lg" variant="hero">
                  <Phone className="mr-2 h-5 w-5" />
                  (937) 387-7426
                </Button>
              </a>
              <Link to="/advisors/kevin-walters/life-insurance">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Application
                </Button>
              </Link>
              <Link to="/advisors/kevin-walters/living-trust-questionnaire">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Living Trust Questionnaire
                </Button>
              </Link>
              <Link to="/advisors/kevin-walters/prequalification">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Pre-Qualification
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/60 text-sm">
              Free consultation. No obligations. Just 30 years of honest, expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Kevin B. Walters Sr."
        advisorEmail="walterssrkevinb@gmail.com"
        advisorImage={kevinImage}
        skipPipedrive
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Kevin B. Walters Sr."
        advisorEmail="walterssrkevinb@gmail.com"
        advisorImage={kevinImage}
        skipPipedrive
      />
    </div>
    </>
  );
};

export default AdvisorKevinWalters;
