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
  FileText,
  Scale,
  Award
} from "lucide-react";
import seanImage from "@/assets/advisors/sean-cagle.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Estate Planning",
  "Living Trusts", 
  "Tax Strategies",
  "Life Insurance",
  "Legacy Preservation",
  "Retirement Planning"
];

const services = [
  {
    icon: FileText,
    title: "Estate Planning",
    description: "Comprehensive estate strategies that protect your assets and ensure your wishes are honored for generations."
  },
  {
    icon: Scale,
    title: "Living Trusts",
    description: "Expert guidance on living trust creation to avoid probate and provide seamless asset transfer to beneficiaries."
  },
  {
    icon: TrendingUp,
    title: "Tax Strategies",
    description: "Proactive tax planning integrated with your estate plan to minimize estate taxes and preserve wealth."
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Strategic life insurance solutions that provide liquidity for estate taxes and protect family wealth."
  },
  {
    icon: Users,
    title: "Legacy Preservation",
    description: "Customized strategies that reflect your values while providing peace of mind for generations to come."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Integrated retirement strategies that align with your estate plan for a secure financial future."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Meeting",
    description: "A complimentary conversation to understand your estate planning goals, family situation, and concerns."
  },
  {
    number: "02",
    title: "Comprehensive Analysis",
    description: "Thorough review of your assets, beneficiaries, and existing plans to identify opportunities."
  },
  {
    number: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your customized estate plan with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "Guided execution of your plan with ongoing support as your life and laws evolve."
  }
];

const AdvisorSeanCagle = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Sean Cagle - Senior Estate Planning Partner"
        description="Work with Sean Cagle, Senior Estate Planning Partner at TFA in Arizona. Expert in living trusts, estate planning, and legacy preservation strategies."
        canonical={`${siteConfig.url}/advisors/sean-cagle`}
        ogType="profile"
        keywords="estate planning Arizona, living trusts, legacy preservation, senior estate planning partner"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Sean Cagle - Senior Estate Planning Partner | The Financial Architects",
          "Work with Sean Cagle, Senior Estate Planning Partner at TFA in Arizona. Expert in living trusts and estate planning.",
          `${siteConfig.url}/advisors/sean-cagle`
        ),
        generatePersonSchema(
          "Sean Cagle",
          "Senior Estate Planning Partner",
          "Sean Cagle is a Senior Estate Planning Partner at The Financial Architects in Arizona, specializing in living trusts, estate planning, and legacy preservation.",
          seanImage,
          `${siteConfig.url}/advisors/sean-cagle`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Sean Cagle", url: `${siteConfig.url}/advisors/sean-cagle` }
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
                Senior Estate Planning Partner
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Sean Cagle
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "Protecting Your Legacy. Preserving Your Values."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Sean specializes in all aspects of estate planning, creating customized 
                strategies that safeguard assets and preserve family legacies. He helps 
                clients design plans that reflect their values while providing peace of 
                mind for generations.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Arizona</span>
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
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                <img
                  src={seanImage}
                  alt="Sean Cagle - Senior Estate Planning Partner"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-lg font-bold">Estate</span>
                  <span className="text-sm block">Planning Expert</span>
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
              About Sean
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Your Estate Planning Partner in Arizona
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Sean Cagle is TFA's Senior Estate Planning Partner serving Arizona and 
                the Southwest region. His expertise spans all aspects of estate planning, 
                from living trusts and wills to comprehensive legacy preservation strategies.
              </p>
              <p>
                Sean understands that estate planning is deeply personal. Every family's 
                situation is unique—different assets, different relationships, different 
                values they want to preserve. That's why he takes a customized approach, 
                creating strategies that reflect each client's specific circumstances and goals.
              </p>
              <p>
                His mission is to help families avoid the costly and time-consuming probate 
                process while ensuring their assets are protected and their wishes are 
                honored. Whether you're creating your first estate plan or updating an 
                existing one, Sean provides the expertise and guidance you need to make 
                confident decisions about your legacy.
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
              Comprehensive Estate Planning Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Customized strategies that safeguard your assets and preserve your 
              family legacy for generations to come.
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
              A straightforward approach to protecting your legacy with clarity and confidence.
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
              Ready to Protect Your Legacy?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              With expertise in estate planning and a commitment to preserving family 
              legacies, Sean is ready to help you create a plan that reflects your values. 
              Schedule your free consultation today.
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
        advisorName="Sean Cagle"
        advisorEmail="scagle@tfainsuranceadvisors.com"
        advisorImage={seanImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Sean Cagle"
        advisorEmail="scagle@tfainsuranceadvisors.com"
        advisorImage={seanImage}
      />
    </div>
    </>
  );
};

export default AdvisorSeanCagle;