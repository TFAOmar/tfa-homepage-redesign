import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Shield, Home, FileText, PiggyBank, Heart, Users, Award, ChevronRight } from "lucide-react";
import erinGraceVargasImg from "@/assets/advisors/erin-grace-vargas.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const AdvisorErinGraceVargas = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const advisorInfo = {
    name: "Erin Grace Vargas",
    email: "evargas@tfainsuranceadvisors.com",
    slug: "erin-grace-vargas",
    image: erinGraceVargasImg
  };

  const specialties = ["Real Estate", "Asset Protection", "Living Trusts", "Financial Planning", "Wealth Preservation"];

  const services = [
    {
      icon: Home,
      title: "Real Estate Strategy",
      description: "Expert property guidance with 19 years of luxury market experience in Southern California."
    },
    {
      icon: Shield,
      title: "Asset Protection",
      description: "Strategic planning to shield your wealth and secure your family's financial future."
    },
    {
      icon: FileText,
      title: "Living Trust Planning",
      description: "Protect your family's legacy and avoid probate with comprehensive estate planning."
    },
    {
      icon: PiggyBank,
      title: "Financial Planning",
      description: "Comprehensive strategies for building long-term financial security."
    },
    {
      icon: Heart,
      title: "Wealth Preservation",
      description: "Maintain and grow your financial security at every stage of life."
    },
    {
      icon: Users,
      title: "Legacy Planning",
      description: "Ensure your assets pass to future generations exactly as you intended."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "Understanding your financial picture and family goals"
    },
    {
      step: "02",
      title: "Strategic Analysis",
      description: "Comprehensive review of your assets and opportunities"
    },
    {
      step: "03",
      title: "Custom Plan",
      description: "Personalized strategy tailored to your unique situation"
    },
    {
      step: "04",
      title: "Implementation",
      description: "Guided execution with ongoing support and adjustments"
    }
  ];

  return (
    <>
      <SEOHead
        title="Erin Grace Vargas - Real Estate Professional & Financial Strategist"
        description="Work with Erin Grace Vargas, a Real Estate Professional and Financial Strategist with 19 years of experience. Expert guidance in real estate, asset protection, living trusts, and wealth preservation in Southern California."
        canonical={`${siteConfig.url}/advisors/erin-grace-vargas`}
        ogType="profile"
        keywords="real estate professional SoCal, financial strategist, living trust advisor, asset protection, wealth preservation California, Exp Luxury"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Erin Grace Vargas - Real Estate Professional & Financial Strategist | The Financial Architects",
          "Work with Erin Grace Vargas, a Real Estate Professional and Financial Strategist with 19 years of experience in Southern California.",
          `${siteConfig.url}/advisors/erin-grace-vargas`
        ),
        generatePersonSchema(
          "Erin Grace Vargas",
          "Real Estate Professional & Financial Strategist",
          "Erin Grace Vargas is a seasoned real estate professional with 19 years of experience and 15 years managing a corporate legal office. As a Fire Wife and mother, she brings a practical, values-driven approach to helping families build long-term financial security.",
          erinGraceVargasImg,
          `${siteConfig.url}/advisors/erin-grace-vargas`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Erin Grace Vargas", url: `${siteConfig.url}/advisors/erin-grace-vargas` }
        ])
      ]} />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Licensed Realtor
                  </Badge>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Financial Strategist
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  Erin Grace Vargas
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-4">
                  Building Wealth, Security, and Legacy for Your Family
                </p>
                <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                  Real Estate Professional with Exp Luxury, combining 19 years of market expertise with strategic financial planning to help families protect and grow their wealth.
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-8">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8 py-6 w-full sm:w-auto"
                    onClick={() => setScheduleModalOpen(true)}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Consultation
                  </Button>
                  <Button 
                    size="lg" 
                    variant="hero" 
                    className="text-lg px-8 py-6 w-full sm:w-auto"
                    onClick={() => setContactModalOpen(true)}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Me
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>Southern California</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>DRE# 01751500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-accent" />
                    <span>19+ Years Experience</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                  <img 
                    src={erinGraceVargasImg} 
                    alt="Erin Grace Vargas - Real Estate Professional & Financial Strategist" 
                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20" 
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      <span>Exp Luxury</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  About Erin
                </h2>
                <div className="h-1 w-20 bg-accent mx-auto" />
              </div>
              
              <Card className="bg-white/10 backdrop-blur-xl border-white/15 p-8 md:p-12 rounded-2xl">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                  Erin Grace Vargas is a seasoned real estate professional with <strong>19 years of experience</strong> in the Southern California luxury market. Her background includes <strong>15 years managing a corporate legal office</strong>, giving her a unique blend of expertise that sets her apart in financial strategy and asset protection.
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                  Today, Erin integrates financial strategy into her work to help clients protect their assets and plan with confidence. Her legal background provides invaluable insight into estate planning, living trusts, and wealth preservation strategies.
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                  As a <strong>Fire Wife and mother</strong>, Erin brings a practical, values-driven approach to building long-term financial security for families. She understands firsthand the importance of protecting what matters most and creating a legacy that endures.
                </p>
                <p className="text-lg md:text-xl text-accent font-semibold italic">
                  "Building wealth, security, and legacy for your family—that's my mission."
                </p>
              </Card>

              {/* Specialties */}
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-6">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {specialties.map(specialty => (
                    <Badge key={specialty} className="bg-accent/10 text-accent border-accent/30 px-4 py-2 text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How I Can Help You
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive real estate and financial strategies tailored to protect and grow your family's wealth.
              </p>
              <div className="h-1 w-20 bg-accent mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Working Together
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple, clear process to help you achieve your financial goals.
              </p>
              <div className="h-1 w-20 bg-accent mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 rounded-2xl h-full">
                    <div className="text-5xl font-bold text-accent/20 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent/40 h-8 w-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Protect Your Family's Future?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Let's discuss how we can work together to build wealth, protect your assets, and create a lasting legacy.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8 py-6 w-full sm:w-auto"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="hero" 
                  className="text-lg px-8 py-6 w-full sm:w-auto"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70">
                <a href="tel:+15627775549" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>(562) 777-5549</span>
                </a>
                <span className="hidden sm:inline text-white/30">|</span>
                <a href="mailto:evargas@tfainsuranceadvisors.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>evargas@tfainsuranceadvisors.com</span>
                </a>
              </div>

              <p className="text-white/60 mt-6 text-sm">
                No obligation. Just a conversation about your future.
              </p>
            </div>
          </div>
        </section>

        {/* Modals */}
        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          advisorName={advisorInfo.name}
          advisorEmail={advisorInfo.email}
          advisorSlug={advisorInfo.slug}
          advisorImage={advisorInfo.image}
        />

        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName={advisorInfo.name}
          advisorEmail={advisorInfo.email}
          advisorSlug={advisorInfo.slug}
          advisorImage={advisorInfo.image}
        />
      </div>
    </>
  );
};

export default AdvisorErinGraceVargas;
