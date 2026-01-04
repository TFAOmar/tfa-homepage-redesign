import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Shield, Home, FileText, PiggyBank, Heart, Users } from "lucide-react";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import erinGraceVargasImg from "@/assets/advisors/erin-grace-vargas.jpg";

const AdvisorErinGraceVargas = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const advisorInfo = {
    name: "Erin Grace Vargas",
    email: "evargas@tfainsuranceadvisors.com",
    slug: "erin-grace-vargas",
    image: erinGraceVargasImg
  };

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary/30">
                Licensed Realtor | Financial Strategist
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Erin Grace Vargas
              </h1>
              <p className="text-xl text-muted-foreground">
                Real Estate Professional & Financial Strategist — Exp Luxury
              </p>
              <p className="text-lg text-foreground/80">
                Building Wealth, Security, and Legacy for Your Family
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  19+ Years Experience
                </Badge>
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  Southern California
                </Badge>
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  DRE# 01751500
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8"
                  onClick={() => setIsScheduleModalOpen(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={erinGraceVargasImg}
                  alt="Erin Grace Vargas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                <p className="text-sm text-muted-foreground">Licensed Realtor</p>
                <p className="text-lg font-semibold text-foreground">DRE# 01751500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              About Erin
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Erin Grace Vargas is a seasoned real estate professional with <strong>19 years of experience</strong> in the Southern California luxury market. Her background includes <strong>15 years managing a corporate legal office</strong>, giving her a unique blend of expertise that sets her apart in financial strategy and asset protection.
              </p>
              <p>
                Today, Erin integrates financial strategy into her work to help clients protect their assets and plan with confidence. Her legal background provides invaluable insight into estate planning, living trusts, and wealth preservation strategies.
              </p>
              <p>
                As a <strong>Fire Wife and mother</strong>, Erin brings a practical, values-driven approach to building long-term financial security for families. She understands firsthand the importance of protecting what matters most and creating a legacy that endures.
              </p>
              <p>
                Through her partnership with <strong>The Financial Architects</strong>, Erin provides comprehensive solutions that go beyond traditional real estate—helping families build wealth, protect assets, and secure their financial futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How I Can Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive real estate and financial strategies tailored to protect and grow your family's wealth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <service.icon className="w-10 h-10 text-primary mb-4" />
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
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              My Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A straightforward approach to understanding your needs and creating a plan that works.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Family's Future?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can work together to build wealth, protect your assets, and create a lasting legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book a Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsContactModalOpen(true)}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-primary-foreground/90">
            <a href="tel:+15627775549" className="flex items-center justify-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              (562) 777-5549
            </a>
            <a href="mailto:evargas@tfainsuranceadvisors.com" className="flex items-center justify-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
              evargas@tfainsuranceadvisors.com
            </a>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        advisorName={advisorInfo.name}
        advisorEmail={advisorInfo.email}
        advisorSlug={advisorInfo.slug}
        advisorImage={advisorInfo.image}
      />

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        advisorName={advisorInfo.name}
        advisorEmail={advisorInfo.email}
        advisorSlug={advisorInfo.slug}
        advisorImage={advisorInfo.image}
      />
    </div>
  );
};

export default AdvisorErinGraceVargas;
