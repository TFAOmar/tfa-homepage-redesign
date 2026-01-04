import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/seo/SEOHead";
import JsonLd from "@/components/seo/JsonLd";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Shield,
  TrendingUp,
  FileText,
  DollarSign,
  Users,
  Heart,
  Target,
  Award,
  Globe
} from "lucide-react";

import joseImage from "@/assets/advisors/jose-covarrubias.jpg";

const specialties = [
  { name: "Bilingual • Bilingüe", isBilingual: true },
  { name: "Financial Planning", isBilingual: false },
  { name: "Retirement Planning", isBilingual: false },
  { name: "Life Insurance", isBilingual: false },
  { name: "Veterans Financial Guidance", isBilingual: false }
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance Protection",
    description: "Comprehensive coverage solutions to protect your family's financial future."
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description: "Strategic planning to build lasting financial security for your golden years."
  },
  {
    icon: DollarSign,
    title: "Financial Planning",
    description: "Customized strategies to grow and protect your wealth over time."
  },
  {
    icon: Award,
    title: "Veterans Financial Guidance",
    description: "Specialized support for fellow veterans transitioning to civilian financial success."
  },
  {
    icon: Users,
    title: "Family Legacy Planning",
    description: "Ensure your values and wealth are passed down efficiently to future generations."
  },
  {
    icon: Target,
    title: "Young Professional Strategies",
    description: "Early-career financial planning to build a strong foundation for success."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Consultation",
    description: "We'll discuss your goals, values, and current financial situation in depth."
  },
  {
    number: "02",
    title: "Strategic Assessment",
    description: "A thorough analysis of your complete financial picture to identify opportunities."
  },
  {
    number: "03",
    title: "Custom Battle Plan",
    description: "Receive a personalized strategy tailored to your unique objectives."
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Long-term partnership with continuous guidance as your life evolves."
  }
];

const AdvisorJoseCovarrubias = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title='Jose "C10" Covarrubias - Financial Strategist & Founder, Spartans Financial'
        description="Work with Jose Covarrubias, a military veteran and founder of Spartans Financial. Expert in financial planning, retirement strategies, and life insurance with a mission-driven approach."
        keywords="Jose Covarrubias, Spartans Financial, military veteran, financial strategist, retirement planning, life insurance, Orange County California"
        canonical="https://tfainsuranceadvisors.com/advisors/jose-covarrubias"
      />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Jose Covarrubias",
          jobTitle: "Financial Strategist & Founder, Spartans Financial",
          worksFor: {
            "@type": "Organization",
            name: "Spartans Financial - A TFA Member Firm"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Orange County",
            addressRegion: "CA"
          }
        }}
      />

    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
                <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                  <Globe className="w-4 h-4 mr-1.5 inline" />
                  Military Veteran | Financial Strategist | Bilingual
                </Badge>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Jose "C10" Covarrubias
              </h1>

              <p className="text-lg text-white/70 mb-6">
                Founder, Spartans Financial — A Proud TFA Member Firm
              </p>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-6 font-light italic">
                "Mission-Driven Financial Empowerment"
              </p>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                A proud military veteran with over 6 years of hands-on financial planning 
                experience, I'm committed to helping individuals and families achieve 
                stability, growth, and confidence in their financial futures.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Orange County, California</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
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
                <Link to="/advisors/jose-covarrubias/life-insurance">
                  <Button size="lg" variant="hero">
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Application
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src={joseImage} 
                    alt="Jose Covarrubias - Financial Strategist"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Experience Badge */}
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">6+</span>
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
              About Jose
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Mission-Driven Financial Leadership
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Jose "C10" Covarrubias is the founder of Spartans Financial, a firm dedicated 
                to serving individuals and families with integrity, clarity, and purpose. 
                Spartans Financial is a proud member of The Financial Architects.
              </p>
              <p>
                As a proud military veteran, Jose transitioned into civilian life with a 
                mission-driven approach—committed to helping others achieve stability, growth, 
                and confidence in their financial futures. Though he has officially been in 
                the financial services industry for two years, he brings over six years of 
                hands-on financial planning experience.
              </p>
              <p>
                This experience, combined with the discipline and leadership cultivated during 
                military service, provides clients with a unique, strategic, and highly 
                personalized approach to financial planning.
              </p>
              <p>
                Driven by a deep-rooted passion for helping others, Jose believes that 
                financial literacy and empowerment are essential tools for personal freedom 
                and long-term success. Whether working with young professionals, veterans, 
                or families planning for future generations, he remains focused on delivering 
                customized solutions that reflect each client's values and goals.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {specialties.map((specialty) => (
                  <Badge 
                    key={specialty.name} 
                    variant="secondary"
                    className={specialty.isBilingual 
                      ? "bg-amber-500/20 text-amber-600 border-amber-500/40 px-4 py-2 text-sm font-semibold" 
                      : "bg-secondary/50 text-secondary-foreground px-4 py-2"
                    }
                  >
                    {specialty.isBilingual && <Globe className="w-4 h-4 mr-1.5 inline" />}
                    {specialty.name}
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
              Mission-driven strategies built on military discipline and a passion for 
              helping others achieve financial freedom.
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
              Your Path to Financial Freedom
            </h2>
            <p className="text-lg text-muted-foreground">
              A strategic, disciplined approach to building your financial future.
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
              Ready to Achieve Financial Freedom?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's work together to build a financial strategy that reflects your values 
              and secures your future. Schedule your free consultation today.
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
              <a href="tel:7143603025">
                <Button size="lg" variant="hero">
                  <Phone className="mr-2 h-5 w-5" />
                  (714) 360-3025
                </Button>
              </a>
              <Link to="/advisors/jose-covarrubias/life-insurance">
                <Button 
                  size="lg" 
                  variant="hero"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Application
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/60 text-sm">
              Free consultation. No obligations. Mission-driven guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Jose Covarrubias"
        advisorEmail="jose@spartansfinancial.com"
        advisorImage={joseImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Jose Covarrubias"
        advisorEmail="jose@spartansfinancial.com"
        advisorImage={joseImage}
      />
    </div>
    </>
  );
};

export default AdvisorJoseCovarrubias;
