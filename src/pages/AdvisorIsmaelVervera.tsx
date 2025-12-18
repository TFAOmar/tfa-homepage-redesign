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
  Home,
  Target,
  TrendingUp,
  Shield,
  Users,
  Building2,
  Award
} from "lucide-react";
import ismaelImage from "@/assets/advisors/ismael-ververa.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Real Estate Planning",
  "Retirement Planning", 
  "Investment Management",
  "Estate Planning",
  "Financial Protection",
  "Wealth Building"
];

const services = [
  {
    icon: Home,
    title: "Real Estate Planning",
    description: "Expert guidance on property investments, market analysis, and real estate portfolio strategies backed by 25 years of industry experience."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic planning for a secure retirement tailored to your lifestyle goals and long-term financial security."
  },
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Sustainable investment strategies to grow and protect your wealth with a focus on long-term stability."
  },
  {
    icon: Shield,
    title: "Estate Planning",
    description: "Comprehensive planning to protect and transfer your assets to future generations with clarity and purpose."
  },
  {
    icon: Users,
    title: "Financial Protection",
    description: "Life insurance and wealth protection strategies designed to secure your family's financial future."
  },
  {
    icon: Building2,
    title: "Wealth Building",
    description: "Holistic financial strategies to build lasting generational wealth through disciplined planning."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Meeting",
    description: "A complimentary conversation to understand your financial goals, concerns, and current situation."
  },
  {
    number: "02",
    title: "Comprehensive Analysis",
    description: "Thorough review of your finances, property holdings, and investment opportunities."
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

const AdvisorIsmaelVervera = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Ismael Ververa - Financial Strategist"
        description="Work with Ismael Ververa, a Financial Strategist in Claremont, CA. 30 years in law enforcement and 25 years as a licensed realtor. Expert in real estate and retirement planning."
        canonical={`${siteConfig.url}/advisors/ismael-ververa`}
        ogType="profile"
        keywords="financial strategist Claremont, real estate planning, retirement planning, investment management California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Ismael Ververa - Financial Strategist | The Financial Architects",
          "Work with Ismael Ververa, a Financial Strategist in Claremont, CA. Expert in real estate and retirement planning.",
          `${siteConfig.url}/advisors/ismael-ververa`
        ),
        generatePersonSchema(
          "Ismael Ververa",
          "Financial Strategist",
          "Ismael Ververa is a Financial Strategist at The Financial Architects in Claremont, CA, with 30 years in law enforcement and 25 years as a licensed realtor.",
          ismaelImage,
          `${siteConfig.url}/advisors/ismael-ververa`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Ismael Ververa", url: `${siteConfig.url}/advisors/ismael-ververa` }
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
                Financial Strategist
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Ismael Ververa
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                Integrity Built on Service. Strategy Rooted in Experience.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                With 30 years in law enforcement and 25 years as a licensed realtor, 
                Ismael brings a unique perspective to financial planning—one grounded in 
                duty, ethics, and deep market expertise.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Claremont, California</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Life & Health Lic# 4152322</span>
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
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                <img
                  src={ismaelImage}
                  alt="Ismael Ververa - Financial Strategist"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">30+</span>
                  <span className="text-sm block">Years of Service</span>
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
              About Ismael
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              A Foundation of Service & Expertise
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Ismael Ververa brings a rare combination of experience to financial planning. 
                His 30-year career in law enforcement instilled in him an unwavering commitment 
                to duty, ethics, and serving others. These values form the foundation of every 
                client relationship he builds.
              </p>
              <p>
                Coupled with 25 years as a licensed realtor, Ismael possesses deep expertise 
                in real estate markets and property investment strategies. This dual background 
                makes him uniquely qualified to help families navigate both financial planning 
                and real estate decisions with confidence.
              </p>
              <p>
                Ismael's approach centers on sustainable investment strategies and empowering 
                clients to take control of their financial futures. He believes in building 
                relationships based on trust, transparency, and a genuine commitment to his 
                clients' long-term success.
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
              Tailored strategies that leverage decades of real estate and service experience 
              to help you achieve your financial goals.
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
              Ready to Work with an Advisor You Can Trust?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              With 30 years of service and a commitment to integrity, Ismael is ready 
              to help you achieve your financial goals. Schedule your free consultation today.
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
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  (888) 350-5396
                </Button>
              </a>
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
        advisorName="Ismael Ververa"
        advisorEmail="ismael@tfainsuranceadvisors.com"
        advisorImage={ismaelImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Ismael Ververa"
        advisorEmail="ismael@tfainsuranceadvisors.com"
        advisorImage={ismaelImage}
      />
    </div>
    </>
  );
};

export default AdvisorIsmaelVervera;