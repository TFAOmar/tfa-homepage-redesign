import { useEffect, useState } from "react";
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
  Award
} from "lucide-react";
import manuelImage from "@/assets/advisors/manuel-soto.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Retirement Planning",
  "Tax Strategies", 
  "Estate Planning",
  "Business Planning",
  "Life Insurance",
  "Legacy Building"
];

const services = [
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic retirement solutions designed to help you achieve financial independence and enjoy your golden years with confidence."
  },
  {
    icon: TrendingUp,
    title: "Tax Strategies",
    description: "Proactive tax planning to minimize your burden and maximize wealth retention for you and your family."
  },
  {
    icon: Shield,
    title: "Estate Planning",
    description: "Comprehensive estate strategies to protect your assets and ensure your legacy is preserved for future generations."
  },
  {
    icon: Building2,
    title: "Business Planning",
    description: "Strategic guidance for business owners to protect operations, plan succession, and build lasting enterprise value."
  },
  {
    icon: Users,
    title: "Life Insurance",
    description: "Customized life insurance solutions that provide protection, wealth accumulation, and peace of mind for your family."
  },
  {
    icon: Briefcase,
    title: "Legacy Building",
    description: "Holistic strategies to build, protect, and transfer generational wealth aligned with your family's values."
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

const AdvisorManuelSoto = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Manuel Soto - Founder & CEO of The Financial Architects"
        description="Work with Manuel Soto, Founder & CEO of The Financial Architects in Chino Hills, CA. Needs-based planning that rejects one-size-fits-all approaches."
        canonical={`${siteConfig.url}/advisors/manuel-soto`}
        ogType="profile"
        keywords="TFA founder, financial advisor Chino Hills, retirement planning, tax strategies, estate planning CEO"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Manuel Soto - Founder & CEO | The Financial Architects",
          "Work with Manuel Soto, Founder & CEO of The Financial Architects in Chino Hills, CA. Needs-based financial planning.",
          `${siteConfig.url}/advisors/manuel-soto`
        ),
        generatePersonSchema(
          "Manuel Soto",
          "Founder & CEO",
          "Manuel Soto is the Founder & CEO of The Financial Architects in Chino Hills, CA, committed to needs-based planning that rejects one-size-fits-all approaches.",
          manuelImage,
          `${siteConfig.url}/advisors/manuel-soto`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Manuel Soto", url: `${siteConfig.url}/advisors/manuel-soto` }
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
                Founder & CEO
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Manuel Soto
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "Change What You're Doing to Change What You're Getting."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                As the founder of TFA Insurance Advisors, Manuel built his career on needs-based 
                planning that rejects one-size-fits-all approaches. With a personal client base 
                of ~2,000 and having trained thousands of advisors, he leads by example.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Chino Hills, California</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Life & Health Lic# 0D87636</span>
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
                  src={manuelImage}
                  alt="Manuel Soto - Founder & CEO"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">TFA</span>
                  <span className="text-sm block">Founder</span>
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
              About Manuel
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              The Financial Architect
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Manuel Soto founded TFA Insurance Advisors with a simple yet powerful mission: 
                to help families achieve lasting financial security through personalized, 
                needs-based planning. His approach rejects cookie-cutter solutions in favor of 
                strategies tailored to each client's unique situation.
              </p>
              <p>
                Over nearly two decades in the financial services industry, Manuel has built a 
                personal client base of approximately 2,000 families and trained thousands of 
                advisors who share his commitment to putting clients first. He is known for his 
                ability to explain complex financial concepts in clear, relatable terms.
              </p>
              <p>
                During the pandemic, Manuel franchised TFA to expand its nationwide reach, 
                bringing his client-first philosophy to communities across the country. His 
                personal mantra—"Change what you're doing to change what you're getting"—guides 
                every aspect of his work and the culture he's built at TFA.
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
              Personalized strategies built on decades of experience helping families 
              achieve their financial goals.
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
              As the founder of TFA, Manuel is committed to helping families achieve 
              lasting financial security. Schedule your free consultation today.
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
        advisorName="Manuel Soto"
        advisorEmail="manuel@tfainsuranceadvisors.com"
        advisorImage={manuelImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Manuel Soto"
        advisorEmail="manuel@tfainsuranceadvisors.com"
        advisorImage={manuelImage}
      />
    </div>
    </>
  );
};

export default AdvisorManuelSoto;