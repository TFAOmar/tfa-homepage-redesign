import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Shield, Target, Users, Award, ChevronRight, Building2, Heart, Home, FileCheck } from "lucide-react";
import braihyraMedellinImg from "@/assets/advisors/braihyra-medellin.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const AdvisorBraihyraMedellin = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specialties = ["Living Trusts", "Asset Protection", "Real Estate Solutions", "Life Insurance", "Wealth Preservation"];
  const services = [{
    icon: FileCheck,
    title: "Living Trust Planning",
    description: "Protect your family's legacy, avoid probate, and ensure your assets go to the people you love."
  }, {
    icon: Shield,
    title: "Asset Protection",
    description: "Shield your wealth from unforeseen circumstances and preserve what you've worked hard to build."
  }, {
    icon: Home,
    title: "Real Estate Solutions",
    description: "Strategic property planning leveraging expertise as a licensed realtor and financial strategist."
  }, {
    icon: Heart,
    title: "Life Insurance",
    description: "Comprehensive coverage for families and individuals to protect your loved ones' future."
  }, {
    icon: Building2,
    title: "Wealth Preservation",
    description: "Long-term strategies to maintain your financial security at every stage of life."
  }, {
    icon: Users,
    title: "Legacy Planning",
    description: "Ensure your assets and values are passed down to future generations exactly as you intend."
  }];
  const processSteps = [{
    step: "01",
    title: "Discovery Call",
    description: "A complimentary conversation to understand your financial picture, goals, and concerns."
  }, {
    step: "02",
    title: "Strategic Analysis",
    description: "Comprehensive review of your assets and needs to identify the best path forward."
  }, {
    step: "03",
    title: "Custom Plan",
    description: "Personalized strategy tailored to your unique situation and long-term vision."
  }, {
    step: "04",
    title: "Implementation",
    description: "Guided execution with ongoing support and adjustments as your life evolves."
  }];

  return (
    <>
      <SEOHead
        title="Braihyra Medellin - Financial Strategist & Licensed Realtor"
        description="Work with Braihyra Medellin, a Financial Strategist and Licensed Realtor in Whittier, CA. Expert guidance in living trusts, asset protection, real estate solutions, and wealth preservation."
        canonical={`${siteConfig.url}/advisors/braihyra-medellin`}
        ogType="profile"
        keywords="financial strategist Whittier, living trust advisor, asset protection, real estate solutions, wealth preservation California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Braihyra Medellin - Financial Strategist | The Financial Architects",
          "Work with Braihyra Medellin, a Financial Strategist and Licensed Realtor in Whittier, CA. Expert guidance in living trusts, asset protection, and real estate solutions.",
          `${siteConfig.url}/advisors/braihyra-medellin`
        ),
        generatePersonSchema(
          "Braihyra Medellin",
          "Financial Strategist",
          "Braihyra Medellin is a Financial Strategist and Licensed Realtor with Big Moves Financial, specializing in living trusts, asset protection, real estate solutions, and wealth preservation.",
          braihyraMedellinImg,
          `${siteConfig.url}/advisors/braihyra-medellin`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Braihyra Medellin", url: `${siteConfig.url}/advisors/braihyra-medellin` }
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
                  Financial Strategist
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  Licensed Realtor
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Braihyra Medellin
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-4">
                Building Wealth, Security, and Legacy Together
              </p>
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                Dedicated to helping individuals and families build, protect, and preserve their wealth through strategic planning, asset protection, living trusts, and real estate solutions.
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
                <Link to="/advisors/braihyra-medellin/living-trust">
                  <Button 
                    size="lg" 
                    variant="hero"
                    className="text-lg px-8 py-6 w-full sm:w-auto"
                  >
                    <FileCheck className="mr-2 h-5 w-5" />
                    Living Trust Planning
                  </Button>
                </Link>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Whittier, California</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>CDI #0M01119</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span>5+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                <img src={braihyraMedellinImg} alt="Braihyra Medellin - Financial Strategist" className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20" />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    <span>Big Moves Financial</span>
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
                About Braihyra
              </h2>
              <div className="h-1 w-20 bg-accent mx-auto" />
            </div>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/15 p-8 md:p-12 rounded-2xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                I'm a licensed Financial Strategist with over 5 years of experience in health and life insurance, dedicated to helping individuals and families build, protect, and preserve their wealth.
              </p>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                Through strategic planning, I assist clients with asset protection, living trusts, and real estate solutions, ensuring their financial future is secure at every stage of life. My approach is rooted in education, transparency, and long-term vision—because true wealth is about more than money, it's about peace of mind and legacy.
              </p>
              <p className="text-lg md:text-xl text-accent font-semibold italic">
                "Let's build wealth, security, and a legacy together."
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
              Comprehensive financial strategies tailored to your unique goals and circumstances.
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
                {service.title === "Living Trust Planning" && (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link 
                      to="/advisors/braihyra-medellin/living-trust" 
                      className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      <FileCheck className="h-4 w-4 mr-1" />
                      Start Living Trust Consultation
                    </Link>
                    <Link 
                      to="/advisors/braihyra-medellin/living-trust-questionnaire" 
                      className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      <FileCheck className="h-4 w-4 mr-1" />
                      Full Questionnaire
                    </Link>
                  </div>
                )}
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
              Schedule a complimentary consultation and let's create a plan tailored to your goals.
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
              <Link to="/advisors/braihyra-medellin/living-trust">
                <Button size="lg" variant="hero" className="text-lg px-8 py-6 w-full sm:w-auto">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Living Trust Planning
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70">
              <a href="tel:+15627023369" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span>(562) 702-3369</span>
              </a>
              <span className="hidden sm:inline text-white/30">|</span>
              <a href="mailto:bri@tfainsuranceadvisors.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                <span>bri@tfainsuranceadvisors.com</span>
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
        advisorName="Braihyra Medellin"
        advisorEmail="bri@tfainsuranceadvisors.com"
        advisorImage={braihyraMedellinImg}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Braihyra Medellin"
        advisorEmail="bri@tfainsuranceadvisors.com"
        advisorImage={braihyraMedellinImg}
      />
    </div>
    </>
  );
};

export default AdvisorBraihyraMedellin;
