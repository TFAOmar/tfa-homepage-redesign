import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Shield, Heart, Users, Building2, Calendar, ClipboardCheck, Phone, ArrowRight } from "lucide-react";
import anthonyBottleyImg from "@/assets/advisors/anthony-bottley.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Health Insurance",
  "Medicare Planning",
  "Individual & Family Coverage",
  "Business Health Solutions"
];

const services = [
  {
    icon: Shield,
    title: "Health Insurance Planning",
    description: "Comprehensive guidance for selecting the right health insurance coverage for you and your family."
  },
  {
    icon: Heart,
    title: "Medicare Navigation",
    description: "Expert assistance navigating Medicare options, enrollment periods, and plan selection."
  },
  {
    icon: Users,
    title: "Individual & Family Plans",
    description: "Personalized coverage solutions for individuals and families at every life stage."
  },
  {
    icon: Building2,
    title: "Business Health Solutions",
    description: "Group health insurance options for businesses and their employees."
  },
  {
    icon: Calendar,
    title: "Open Enrollment Support",
    description: "Year-round guidance and specialized support during enrollment periods."
  },
  {
    icon: ClipboardCheck,
    title: "Plan Comparison & Selection",
    description: "Side-by-side analysis of plans to find the best fit for your needs and budget."
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We start by understanding your health needs, current coverage, and budget considerations."
  },
  {
    step: "02",
    title: "Coverage Analysis",
    description: "Comprehensive review of available plans in your area and eligibility requirements."
  },
  {
    step: "03",
    title: "Plan Comparison",
    description: "Clear presentation of your options with transparent cost breakdowns and benefit comparisons."
  },
  {
    step: "04",
    title: "Enrollment Support",
    description: "Guided enrollment process with ongoing support to ensure your coverage meets your needs."
  }
];

const AdvisorAnthonyBottley = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Anthony Bottley - Health Insurance Specialist"
        description="Work with Anthony Bottley, founder of American Way Health in West Palm Beach, FL. Expert guidance in health insurance, Medicare, and business health solutions."
        canonical={`${siteConfig.url}/advisors/anthony-bottley`}
        ogType="profile"
        keywords="health insurance specialist West Palm Beach, Medicare planning, American Way Health, business health solutions Florida"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Anthony Bottley - Health Insurance Specialist | The Financial Architects",
          "Work with Anthony Bottley, founder of American Way Health in West Palm Beach, FL. Expert in health insurance and Medicare.",
          `${siteConfig.url}/advisors/anthony-bottley`
        ),
        generatePersonSchema(
          "Anthony Bottley",
          "Health Insurance Specialist",
          "Anthony Bottley is a Health Insurance Specialist and founder of American Way Health in West Palm Beach, FL, providing expert guidance in health insurance, Medicare, and business health solutions.",
          anthonyBottleyImg,
          `${siteConfig.url}/advisors/anthony-bottley`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Anthony Bottley", url: `${siteConfig.url}/advisors/anthony-bottley` }
        ])
      ]} />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-navy via-primary to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(228,181,72,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(228,181,72,0.05),transparent_40%)]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <Badge className="bg-accent/20 text-accent border-accent/30 mb-6">
                  Health Insurance Specialist
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                  Anthony Bottley
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-6">
                  Your Health Insurance & Medicare Guide
                </p>
                <p className="text-lg text-white/70 mb-8 max-w-xl">
                  Guiding individuals and families through the complexities of health insurance with clarity, expertise, and a client-first approach.
                </p>
                
                {/* Location & Credentials */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>West Palm Beach, Florida</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Shield className="h-5 w-5 text-accent" />
                    <span>Life & Health Licensed</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                    onClick={() => setScheduleModalOpen(true)}
                  >
                    Book a Consultation
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white/30 bg-transparent text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/health-insurance/american-way-health">
                      View Health Insurance Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white/30 bg-transparent text-white hover:bg-white/10"
                    onClick={() => setContactModalOpen(true)}
                  >
                    Contact Me
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                  <img
                    src={anthonyBottleyImg}
                    alt="Anthony Bottley"
                    className="relative w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              About Anthony
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Anthony Bottley is the owner and founder of American Way Health, an insurance agency specializing in healthcare and insurance solutions. After graduating from Florida Atlantic University, Anthony began his career in executive recruiting, where he developed a passion for developing and guiding others to their full potential. This experience led him to found American Way Health in November 2021.
              </p>
              <p className="mb-8">
                Today, Anthony helps individuals, families, and businesses navigate the complexities of health insurance and Medicare. His entrepreneurial vision and client-first approach ensure that every client receives personalized guidance tailored to their unique needs. Anthony is also an active voice in the industry, participating in panels at Lead Generation World on health insurance and Medicare markets.
              </p>
            </div>
            
            {/* Specialties */}
            <div className="flex flex-wrap gap-3 justify-center">
              {specialties.map((specialty) => (
                <Badge 
                  key={specialty} 
                  variant="secondary"
                  className="bg-accent/10 text-accent border-accent/20 px-4 py-2"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How I Can Help You
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive health insurance services tailored to your unique needs and goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:border-accent/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
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
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                My Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A straightforward approach to finding the right health coverage for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-accent/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-navy via-primary to-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find the Right Health Coverage?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's discuss your health insurance needs and find the perfect plan for you and your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                onClick={() => setScheduleModalOpen(true)}
              >
                Book a Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:+15614484831">
                  <Phone className="mr-2 h-4 w-4" />
                  (561) 448-4831
                </a>
              </Button>
            </div>
            <p className="text-white/60 mt-6 text-sm">
              Free Consultation • No Obligations • Expert Health Insurance Guidance
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Anthony Bottley"
        advisorEmail="info@awhealthllc.com"
        advisorImage={anthonyBottleyImg}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Anthony Bottley"
        advisorEmail="info@awhealthllc.com"
        advisorImage={anthonyBottleyImg}
      />
    </div>
    </>
  );
};

export default AdvisorAnthonyBottley;
