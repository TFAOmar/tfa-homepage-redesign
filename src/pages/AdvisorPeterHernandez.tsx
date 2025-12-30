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
  Building,
  Briefcase
} from "lucide-react";

import peterImage from "@/assets/advisors/peter-hernandez.jpg";

const specialties = [
  "Tax Strategies",
  "Retirement Planning", 
  "Life Insurance",
  "Financial Planning"
];

const services = [
  {
    icon: DollarSign,
    title: "Tax Strategies",
    description: "Legal strategies to reduce your tax burden and keep more of what you earn for your future."
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description: "Build a secure retirement income stream that lasts throughout your golden years."
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Affordable protection for your loved ones, ensuring their financial security."
  },
  {
    icon: Briefcase,
    title: "Financial Planning",
    description: "Comprehensive strategies to grow and protect your wealth over time."
  },
  {
    icon: Heart,
    title: "Income Protection",
    description: "Safeguard your earning potential against unexpected life events."
  },
  {
    icon: Users,
    title: "Legacy Planning",
    description: "Pass your wealth efficiently to the next generation with proper planning."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We'll discuss your current situation, goals, and concerns in a no-pressure conversation."
  },
  {
    number: "02",
    title: "Financial Assessment",
    description: "I'll analyze your complete financial picture to identify opportunities and gaps."
  },
  {
    number: "03",
    title: "Personalized Strategy",
    description: "Receive a customized plan tailored to your unique needs and goals."
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "I'll be there as your trusted advisor, adjusting your plan as life evolves."
  }
];

const AdvisorPeterHernandez = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Peter Hernandez - Financial Strategist"
        description="Work with Peter Hernandez, a Financial Strategist with 25+ years of experience at Wells Fargo, Ford Motor Credit, and Sun West Mortgage. Expert in tax strategies, retirement planning, and life insurance."
        keywords="Peter Hernandez, financial strategist, tax strategies, retirement planning, life insurance, Whittier California"
        canonical="https://tfainsuranceadvisors.com/advisors/peter-hernandez"
      />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Peter Hernandez",
          jobTitle: "Financial Strategist",
          worksFor: {
            "@type": "Organization",
            name: "The Financial Architects"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Whittier",
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
                Financial Strategist
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Peter Hernandez
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-6 font-light italic">
                "Helping families protect what matters most."
              </p>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                With over 25 years of experience in financial services at industry leaders 
                like Wells Fargo Financial, Ford Motor Credit, and Sun West Mortgage, I'm 
                dedicated to helping families save on taxes, increase their retirement, and 
                lower their cost of insurance.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Whittier, California</span>
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
                <Link to="/advisors/peter-hernandez/life-insurance">
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
                    src={peterImage} 
                    alt="Peter Hernandez - Financial Strategist"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Experience Badge */}
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">25+</span>
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
              About Peter
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Your Trusted Financial Partner
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                I have worked in the Financial Services spectrum for 25+ years with companies 
                such as Wells Fargo Financial, Ford Motor Credit, and Sun West Mortgage. This 
                extensive experience has given me deep insights into lending, credit, and 
                financial strategy.
              </p>
              <p>
                I am now dedicated to helping families save on taxes, increase their retirement, 
                and most importantly lowering their cost of insurance which will protect the 
                ones they love most.
              </p>
              <p>
                My approach is simple: understand your unique situation, identify opportunities 
                to improve your financial position, and implement strategies that truly protect 
                your family's future. I believe in honest, straightforward guidance that puts 
                your interests first.
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
              Personalized strategies built on over 25 years of experience helping 
              families achieve their financial goals.
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
              Ready to Protect What Matters Most?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's discuss how to save on taxes, grow your retirement, and protect your 
              family with the right insurance solutions. Schedule your free consultation today.
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
              <a href="tel:5625474226">
                <Button size="lg" variant="hero">
                  <Phone className="mr-2 h-5 w-5" />
                  (562) 547-4226
                </Button>
              </a>
              <Link to="/advisors/peter-hernandez/life-insurance">
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
              Free consultation. No obligations. Just honest guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Peter Hernandez"
        advisorEmail="phernandez@tfainsuranceadvisors.com"
        advisorImage={peterImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Peter Hernandez"
        advisorEmail="phernandez@tfainsuranceadvisors.com"
        advisorImage={peterImage}
      />
    </div>
    </>
  );
};

export default AdvisorPeterHernandez;
