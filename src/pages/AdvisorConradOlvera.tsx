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
  Home,
  Award,
  FileText
} from "lucide-react";
import conradImage from "@/assets/advisors/conrad-olvera.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Mortgage Financing",
  "Estate Planning", 
  "Retirement Planning",
  "Life Insurance",
  "Financial Planning"
];

const services = [
  {
    icon: Building2,
    title: "Mortgage Financing",
    description: "Expert guidance through the mortgage process, ensuring you find the right loan for your unique financial situation and homeownership goals."
  },
  {
    icon: Shield,
    title: "Estate Planning",
    description: "Comprehensive strategies to protect your assets and ensure your legacy is preserved for future generations."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Personalized retirement strategies designed to help you achieve financial independence and security in your golden years."
  },
  {
    icon: Users,
    title: "Life Insurance",
    description: "Customized life insurance solutions that provide protection, wealth accumulation, and peace of mind for your family."
  },
  {
    icon: TrendingUp,
    title: "Financial Consulting",
    description: "Holistic financial guidance tailored to your unique needs, helping you make informed decisions for long-term success."
  },
  {
    icon: Home,
    title: "Home Financing Solutions",
    description: "Specialized home loan options and refinancing strategies to help you achieve your property ownership dreams."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "A complimentary conversation to understand your financial goals, concerns, and current situation."
  },
  {
    number: "02",
    title: "Needs Assessment",
    description: "Thorough review of your complete financial picture to identify opportunities and tailor solutions."
  },
  {
    number: "03",
    title: "Customized Solutions",
    description: "Clear presentation of your personalized plan with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Continued guidance and support as your life evolves and financial needs change."
  }
];

const AdvisorConradOlvera = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Conrad Olvera - Mortgage and Financial Specialist | The Financial Architects"
        description="Work with Conrad Olvera, Mortgage and Financial Specialist in Chino Hills, CA. Exceptional mortgage and financial services with personalized solutions since 2014."
        canonical={`${siteConfig.url}/advisors/conrad-olvera`}
        ogType="profile"
        keywords="mortgage specialist Chino Hills, financial advisor California, estate planning, retirement planning, home loans"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Conrad Olvera - Mortgage and Financial Specialist | The Financial Architects",
          "Work with Conrad Olvera, Mortgage and Financial Specialist in Chino Hills, CA. Exceptional mortgage and financial services with personalized solutions.",
          `${siteConfig.url}/advisors/conrad-olvera`
        ),
        generatePersonSchema(
          "Conrad Olvera",
          "Mortgage and Financial Specialist",
          "Since 2014, Conrad Olvera has dedicated himself to providing exceptional mortgage and financial services with a focus on delivering the best customer experience.",
          conradImage,
          `${siteConfig.url}/advisors/conrad-olvera`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Conrad Olvera", url: `${siteConfig.url}/advisors/conrad-olvera` }
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
                Mortgage and Financial Specialist
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Conrad Olvera
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "Building Lasting Relationships Through Exceptional Service."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Since 2014, I have dedicated myself to providing exceptional mortgage and 
                financial services. With a focus on delivering the best customer experience, 
                I strive to build lasting relationships with my clients through tailored 
                solutions that facilitate their financial goals.
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
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
                <Link to="/advisors/conrad-olvera/life-insurance">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent/50 text-accent hover:bg-accent/10"
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
                  src={conradImage}
                  alt="Conrad Olvera - Mortgage and Financial Specialist"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">11+</span>
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
              About Conrad
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Your Trusted Financial Partner
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Since 2014, I have dedicated myself to providing exceptional mortgage and 
                financial services. With a focus on delivering the best customer experience, 
                I strive to build lasting relationships with my clients.
              </p>
              <p>
                My expertise in the industry, combined with a commitment to understanding 
                each client's unique needs, ensures tailored solutions that facilitate their 
                financial goals—whether it's a home loan, estate planning, or retirement needs.
              </p>
              <p>
                I believe that financial planning should be personalized, not one-size-fits-all. 
                That's why I take the time to understand your specific situation, goals, and 
                concerns before recommending any solutions. My approach is built on trust, 
                transparency, and a genuine desire to see my clients succeed.
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
              Personalized strategies built on over a decade of experience helping 
              clients achieve their financial and homeownership goals.
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
              Ready to Achieve Your Financial Goals?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Whether you're looking for a home loan, estate planning, or retirement solutions, 
              I'm here to help you navigate your financial journey with confidence.
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
              <Link to="/advisors/conrad-olvera/life-insurance">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
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
        advisorName="Conrad Olvera"
        advisorEmail="conrad@tfainsuranceadvisors.com"
        advisorImage={conradImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Conrad Olvera"
        advisorEmail="conrad@tfainsuranceadvisors.com"
        advisorImage={conradImage}
      />
    </div>
    </>
  );
};

export default AdvisorConradOlvera;
