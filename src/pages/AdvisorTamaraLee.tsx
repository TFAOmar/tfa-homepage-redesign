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
  Shield, 
  Heart, 
  Users, 
  Building2, 
  ClipboardCheck, 
  Handshake,
  ArrowRight,
  Award,
  CheckCircle2
} from "lucide-react";
import tamaraLeeImg from "@/assets/advisors/tamara-lee.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";

const specialties = [
  "Medicare Planning",
  "Retirement Planning", 
  "Business Planning",
  "Healthcare Planning"
];

const services = [
  {
    icon: Shield,
    title: "Medicare Planning",
    description: "Expert guidance through Medicare options, enrollment periods, and plan selection to ensure you have the coverage you need."
  },
  {
    icon: Heart,
    title: "Retirement Healthcare",
    description: "Aligning your healthcare needs with your retirement financial strategies for comprehensive protection."
  },
  {
    icon: Building2,
    title: "Employer Benefits",
    description: "B2B solutions for employer and employee healthcare relationships, helping businesses care for their teams."
  },
  {
    icon: ClipboardCheck,
    title: "Retirement Planning",
    description: "Long-term retirement strategies that integrate seamlessly with your healthcare needs and goals."
  },
  {
    icon: Users,
    title: "Business Planning",
    description: "Healthcare solutions designed for business owners and their employees' wellbeing."
  },
  {
    icon: Handshake,
    title: "Individual Guidance",
    description: "Personalized support and education to help you make informed healthcare decisions with confidence."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We start by understanding your unique healthcare needs, current situation, and financial goals."
  },
  {
    number: "02",
    title: "Medicare Review",
    description: "Comprehensive analysis of your Medicare options, eligibility, and available plans in your area."
  },
  {
    number: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your personalized healthcare plan with transparent options and recommendations."
  },
  {
    number: "04",
    title: "Implementation",
    description: "Guided enrollment process with ongoing support to ensure your coverage meets your needs."
  }
];

const AdvisorTamaraLee = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                Medicare Specialist
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Tamara Lee
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/80 font-light">
                Your Medicare & Retirement Healthcare Expert
              </p>
              
              <p className="text-lg text-primary-foreground/70 max-w-xl">
                With over 11 years of experience in the healthcare field, I help clients navigate the complexities of Medicare and retirement healthcare while aligning their long-term financial strategies.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Claremont, California</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span>Life & Health Licensed</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Consultation
                </Button>
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <Link to="/advisors/tamara-lee/medicare">
                    <Shield className="mr-2 h-5 w-5" />
                    View Medicare Services
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl blur-2xl" />
                <img
                  src={tamaraLeeImg}
                  alt="Tamara Lee - Medicare Specialist"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg">
                  <span className="font-semibold">Medicare Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              About Tamara
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-10">
              <p className="text-lg leading-relaxed">
                Tamara is a dedicated professional with over 11 years of experience in the healthcare field, specializing in Medicare, retirement planning, and business-to-business employer and employee relationships. Her extensive knowledge allows her to help clients navigate the complexities of retirement healthcare while aligning their long-term financial strategies.
              </p>
              <p className="text-lg leading-relaxed">
                She is committed to empowering her clients with the information they need to make informed decisions about their health and financial futures. She is a valuable resource for both individuals and businesses, fostering an environment of accessible support and informed decision-making.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {specialties.map((specialty, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How I Can Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare and retirement planning services tailored to your unique needs.
            </p>
            <Link 
              to="/advisors/tamara-lee/medicare" 
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mt-4 font-medium"
            >
              Learn more about my Medicare services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border-border/50 hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
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
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Working Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, guided process to help you navigate Medicare with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-accent/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-accent/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Navigate Medicare with Confidence?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your healthcare needs and create a plan that protects your health and financial future.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setScheduleModalOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="tel:+18883505396">
                <Phone className="mr-2 h-5 w-5" />
                (888) 350-5396
              </a>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>No Obligations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>Expert Medicare Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Tamara Lee"
        advisorEmail="tlee@tfainsuranceadvisors.com"
        advisorImage={tamaraLeeImg}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Tamara Lee"
        advisorEmail="tlee@tfainsuranceadvisors.com"
        advisorImage={tamaraLeeImg}
      />
    </div>
  );
};

export default AdvisorTamaraLee;