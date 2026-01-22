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
  Scale,
  Briefcase
} from "lucide-react";

import erikImage from "@/assets/advisors/erik-johnson.jpg";

const specialties = [
  { name: "Licensed Fiduciary", isHighlight: true },
  { name: "Investment Risk Management", isHighlight: false },
  { name: "Retirement Income Planning", isHighlight: false },
  { name: "Tax Minimization", isHighlight: false },
  { name: "Federal Employee Benefits", isHighlight: false }
];

const services = [
  {
    icon: TrendingUp,
    title: "Investment Risk Management",
    description: "Managing market volatility and ensuring your risk aligns with your strategy and goals."
  },
  {
    icon: Target,
    title: "Retirement Income Planning",
    description: "Structuring sustainable income plans for a confident, worry-free retirement."
  },
  {
    icon: DollarSign,
    title: "Tax Minimization Strategies",
    description: "Reducing your tax burden over a lifetime through strategic planning."
  },
  {
    icon: Briefcase,
    title: "Federal Employee Benefits",
    description: "Maximizing USPS and federal retirement systems for optimal benefits."
  },
  {
    icon: Scale,
    title: "Fiduciary Guidance",
    description: "Fee-transparent, conflict-free advice with your best interests always first."
  },
  {
    icon: Shield,
    title: "Portfolio Analysis",
    description: "Comprehensive review of stocks, bonds, mutual funds, ETFs, annuities, and life insurance."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Conversation",
    description: "Understanding what's important to you and why—your Rubik's Cube of financial questions."
  },
  {
    number: "02",
    title: "Financial Analysis",
    description: "A thorough review of your complete financial picture to identify opportunities."
  },
  {
    number: "03",
    title: "Custom Strategy",
    description: "Personalized recommendations that prioritize your goals—no one-size-fits-all."
  },
  {
    number: "04",
    title: "Ongoing Partnership",
    description: "Continuous guidance as your life evolves, with patience and empathy."
  }
];

const AdvisorErikJohnson = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Erik Johnson - Licensed Fiduciary & Independent Financial Advisor"
        description="Work with Erik Johnson, a licensed fiduciary specializing in investment risk management, retirement income planning, and tax minimization. Based in La Mirada, CA."
        keywords="Erik Johnson, fiduciary, financial advisor, investment management, retirement planning, tax minimization, federal employee benefits, La Mirada California"
        canonical="https://tfawealthplanning.com/advisors/erik-johnson"
      />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Erik Johnson",
          jobTitle: "Independent Financial Advisor",
          worksFor: {
            "@type": "Organization",
            name: "Infinite Wealth Management"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "La Mirada",
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
                  <Scale className="w-4 h-4 mr-1.5 inline" />
                  Licensed Fiduciary | Financial Advisor
                </Badge>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Erik Johnson
              </h1>

              <p className="text-lg text-white/70 mb-6">
                Independent Financial Advisor — Infinite Wealth Management
              </p>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-6 font-light italic">
                "Making Finance Your Second Language"
              </p>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                As a licensed fiduciary, my focus is on providing financial advice that 
                helps people become comfortable with their finances and gain clarity in 
                their decisions. I treat everyone like finance is their second language—
                because for most people, it is.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>La Mirada, California</span>
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
                <Link to="/advisors/erik-johnson/life-insurance">
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
                    src={erikImage} 
                    alt="Erik Johnson - Licensed Fiduciary & Financial Advisor"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Experience Badge */}
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">10+</span>
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
              About Erik
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Your Financial Rubik's Cube, Solved
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Every client comes to me with their own version of a Rubik's Cube—a unique 
                set of financial questions and concerns that need solving. My job is to 
                understand what's important to you and why, then build a strategy that 
                prioritizes your goals. I don't take a one-size-fits-all approach, and I'm 
                not here to push products or services you don't need. Clients appreciate 
                that I take the time to listen first and recommend second.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">My Communication Philosophy</h3>
              <p>
                My mother's first language is Spanish, and English is her second language. 
                This shapes how I work with every client. I treat everyone like finance is 
                their second language—because for most people, it is. I approach every 
                conversation with the same patience and empathy I hope others show my mother. 
                I keep things simple, explain concepts multiple ways until you understand, 
                and never make you feel rushed for asking questions.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">My Foundation</h3>
              <p>
                I'm a financial advisor at Infinite Wealth Management (a sister company to 
                Infinite Insurance & Financial Services), based in La Mirada, CA. I've built 
                my practice entirely through word of mouth and client referrals. I maintain 
                strong relationships with partners like The Financial Architects, which allows 
                me to provide comprehensive solutions for my clients. A significant part of my 
                practice focuses on serving federal employees, particularly USPS workers, 
                helping them maximize their unique benefits and retirement systems.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Finding the Right Fit</h3>
              <p>
                I'm a great fit if you don't enjoy managing your own accounts, you're concerned 
                your risk doesn't align with your strategy, you want to reduce taxes, or you're 
                curious about your fees. I work well with people who want a knowledgeable 
                professional versed in stocks, bonds, mutual funds, ETFs, annuities, and both 
                types of life insurance—without product pushing. If you've had a frustrating 
                experience previously, I'd welcome the chance to show you a different approach.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {specialties.map((specialty) => (
                  <Badge 
                    key={specialty.name} 
                    variant="secondary"
                    className={specialty.isHighlight 
                      ? "bg-accent/20 text-accent border-accent/40 px-4 py-2 text-sm font-semibold" 
                      : "bg-secondary/50 text-secondary-foreground px-4 py-2"
                    }
                  >
                    {specialty.isHighlight && <Scale className="w-4 h-4 mr-1.5 inline" />}
                    {specialty.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Registrations & Credentials</h3>
              <div className="flex flex-wrap gap-3">
                {["Series 6", "Series 63", "Series 26", "Series 65", "NMLS", "Notary Public"].map((license) => (
                  <Badge 
                    key={license} 
                    variant="outline"
                    className="bg-muted/50 text-muted-foreground px-3 py-1"
                  >
                    {license}
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
              Three core areas of expertise: managing investment risk, structuring 
              retirement income, and minimizing lifetime tax burdens.
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
              Your Path to Financial Clarity
            </h2>
            <p className="text-lg text-muted-foreground">
              A patient, empathetic approach to solving your financial questions.
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

      {/* Personal Section */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Heart className="w-4 h-4 mr-1.5 inline" />
              Personal
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Beyond the Numbers
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                I was born in Bellflower, grew up in Long Beach, and now call Artesia home 
                with my wife Fabiola (Fabi) and our four kids: Leslie, Aylin, Erik Jr, and Eli. 
                One thing I genuinely appreciate about where we live is being able to walk to 
                shops, restaurants, and the mall. It fits our family perfectly.
              </p>
              <p>
                Fabi has a gift for keeping me centered on life's priorities. My children are 
                actually why I walked away from corporate work years back. I wanted them to 
                grow up with experiences and opportunities that create a rich life. Today, our 
                family's largest annual investment goes toward travel and building memories together.
              </p>
              <p>
                When I'm not working, you'll find me tackling home improvement projects or 
                handling basic maintenance on our cars, like oil and brake work. Honestly, 
                walking through Home Depot feels like being in a toy store! At the core, I'm 
                driven by a simple belief: life is meant for enjoying and building lasting 
                memories with those you cherish most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready for Financial Clarity?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's solve your financial Rubik's Cube together. I'll explain concepts 
              multiple ways until they make sense—no rushed conversations, no product pushing.
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
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => setContactModalOpen(true)}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
              <Link to="/advisors/erik-johnson/life-insurance">
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
              Free consultation. No obligations. Patient, empathetic guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Erik Johnson"
        advisorEmail="erik@investwitherik.com"
        advisorImage={erikImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Erik Johnson"
        advisorEmail="erik@investwitherik.com"
        advisorImage={erikImage}
      />
    </div>
    </>
  );
};

export default AdvisorErikJohnson;