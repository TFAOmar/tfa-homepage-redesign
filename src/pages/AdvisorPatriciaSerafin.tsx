import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Shield, Target, Users, Award, ChevronRight, Building2, Heart, Briefcase, Globe } from "lucide-react";
import patriciaSerafinImg from "@/assets/advisors/patricia-serafin.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const AdvisorPatriciaSerafin = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specialties = [
    "Financial Literacy & Education",
    "Retirement Planning",
    "Estate Planning",
    "Tax Strategies",
    "Life Insurance",
    "Family Financial Planning"
  ];

  const services = [
    {
      icon: Target,
      title: "Retirement Planning",
      description: "Strategic planning to ensure a comfortable and secure retirement tailored to your unique goals."
    },
    {
      icon: Shield,
      title: "Estate Planning",
      description: "Comprehensive estate strategies to protect and transfer your wealth to future generations."
    },
    {
      icon: Building2,
      title: "Tax Strategies",
      description: "Tax-efficient solutions to maximize your wealth and minimize your tax burden."
    },
    {
      icon: Heart,
      title: "Life Insurance",
      description: "Protection solutions designed to safeguard your family's financial future."
    },
    {
      icon: Users,
      title: "Family Financial Planning",
      description: "Holistic planning for families to build generational wealth and security."
    },
    {
      icon: Globe,
      title: "Bilingual Services",
      description: "Fluent in English and Spanish, ensuring every client feels understood and supported."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "A complimentary conversation to understand your financial goals, concerns, and current situation."
    },
    {
      step: "02",
      title: "Personalized Analysis",
      description: "Comprehensive review of your finances to identify opportunities and create a tailored strategy."
    },
    {
      step: "03",
      title: "Strategy Presentation",
      description: "Clear presentation of your customized plan with actionable steps and recommendations."
    },
    {
      step: "04",
      title: "Implementation",
      description: "Guided execution of your plan with ongoing support and adjustments as your life evolves."
    }
  ];

  return (
    <>
      <SEOHead
        title="Patricia Serafin - Financial Strategist | Bilingual Financial Advisor"
        description="Work with Patricia Serafin, a bilingual Financial Strategist in Chino Hills, CA. Expert guidance in retirement planning, estate planning, and family financial security. Se habla español."
        canonical={`${siteConfig.url}/advisors/patricia-serafin`}
        ogType="profile"
        keywords="financial strategist Chino Hills, bilingual financial advisor, Spanish speaking financial planner, retirement planning, estate planning, family financial planning California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Patricia Serafin - Financial Strategist | The Financial Architects",
          "Work with Patricia Serafin, a bilingual Financial Strategist in Chino Hills, CA. Expert guidance in retirement planning, estate planning, and family financial security.",
          `${siteConfig.url}/advisors/patricia-serafin`
        ),
        generatePersonSchema(
          "Patricia Serafin",
          "Financial Strategist",
          "Patricia Serafin is a bilingual Financial Strategist at The Financial Architects in Chino Hills, CA, specializing in retirement planning, estate planning, tax strategies, and family financial planning. Fluent in English and Spanish.",
          patriciaSerafinImg,
          `${siteConfig.url}/advisors/patricia-serafin`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Patricia Serafin", url: `${siteConfig.url}/advisors/patricia-serafin` }
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
                {/* Language Switcher */}
                <Link 
                  to="/advisors/patricia-serafin/es" 
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-4"
                >
                  <Globe className="w-4 h-4" />
                  <span>Ver en Español</span>
                </Link>
                
                <Badge className="bg-accent/20 text-accent border-accent/30 mb-6 block w-fit mx-auto lg:mx-0">
                  Financial Strategist • Bilingual
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  Patricia Serafin
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-4">
                  Protecting Families Through Financial Clarity
                </p>
                <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                  Becoming the advocate she wished her family had—helping individuals and families make confident financial decisions before crisis strikes.
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
                    <span>Chino Hills, California</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" />
                    <span>English & Spanish</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>Life & Health Licensed</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                  <img 
                    src={patriciaSerafinImg} 
                    alt="Patricia Serafin - Financial Strategist" 
                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20" 
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      <span>Nearly 10 Years Experience</span>
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
                  About Patricia
                </h2>
                <div className="h-1 w-20 bg-accent mx-auto" />
              </div>
              
              <Card className="bg-white/10 backdrop-blur-xl border-white/15 p-8 md:p-12 rounded-2xl">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                  Patricia's journey into the financial industry began with one simple mission: protect her family. As a Mexican-American raised with strong family values, she saw firsthand how a lack of financial literacy can leave hardworking families vulnerable—often discovering their options only when it's too late.
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                  Originally pursuing a career in law, Patricia felt called in a different direction after recognizing a critical gap in the financial industry. Too many people were being taken advantage of, misinformed, or left without real solutions. She shifted her path to financial strategizing to become the advocate she wished her own family had.
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  With nearly a decade of experience, Patricia is known for her ability to identify the right solutions for each client—never one-size-fits-all, always intentional. Her approach is rooted in education, transparency, and long-term thinking, empowering individuals and families to make confident financial decisions before crisis strikes.
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
                Comprehensive financial strategies tailored to your unique goals and circumstances—with the personal touch of bilingual service.
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
                Ready to Build Clarity, Security, and Peace of Mind?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Schedule a complimentary consultation and let's create a plan tailored to your goals. Se habla español.
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
                <Link to="/life-insurance-application">
                  <Button size="lg" variant="hero" className="text-lg px-8 py-6 w-full sm:w-auto">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Apply for Life Insurance
                  </Button>
                </Link>
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
          advisorName="Patricia Serafin"
          advisorImage={patriciaSerafinImg}
        />
        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName="Patricia Serafin"
          advisorEmail="patricia@tfainsuranceadvisors.com"
          advisorImage={patriciaSerafinImg}
        />
      </div>
    </>
  );
};

export default AdvisorPatriciaSerafin;
