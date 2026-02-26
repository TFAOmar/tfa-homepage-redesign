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
  Users,
  Heart,
  Home,
  Award,
  FileText,
  Flower2,
  TrendingUp
} from "lucide-react";
import manoloImage from "@/assets/advisors/manolo-monter.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Life Insurance",
  "Pre-Need Funeral Planning",
  "Final Expense",
  "Estate Planning",
  "Family Protection"
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Customized life insurance solutions that protect your family's financial future and provide lasting peace of mind."
  },
  {
    icon: Flower2,
    title: "Pre-Need Funeral Planning",
    description: "Compassionate guidance to plan ahead, relieving your family of financial and emotional burden during difficult times."
  },
  {
    icon: Heart,
    title: "Final Expense Planning",
    description: "Affordable coverage designed to ensure your final wishes are honored without placing a financial strain on loved ones."
  },
  {
    icon: Home,
    title: "Estate Planning",
    description: "Strategies to protect your assets and ensure your legacy is preserved for future generations."
  },
  {
    icon: Users,
    title: "Family Protection",
    description: "Comprehensive plans that safeguard your family's well-being and financial security at every stage of life."
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    description: "Forward-looking strategies to help you build wealth, secure income, and enjoy a comfortable retirement."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "A complimentary conversation to understand your goals, concerns, and current situation."
  },
  {
    number: "02",
    title: "Needs Assessment",
    description: "Thorough review of your complete financial picture to identify the best solutions for your family."
  },
  {
    number: "03",
    title: "Customized Solutions",
    description: "Clear presentation of your personalized plan with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Continued guidance and care as your life evolves and your family's needs change."
  }
];

const AdvisorManoloMonter = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Manolo Monter - Life Insurance Agent & Pre-Need Specialist | The Financial Architects"
        description="Work with Manolo Monter, an award-winning life insurance agent and pre-need funeral planning specialist in Chino Hills, CA. Over a decade of compassionate service."
        canonical={`${siteConfig.url}/advisors/manolo-monter`}
        ogType="profile"
        keywords="life insurance agent Chino Hills, pre-need funeral planning, final expense insurance, estate planning California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Manolo Monter - Life Insurance Agent & Pre-Need Specialist | The Financial Architects",
          "Work with Manolo Monter, an award-winning life insurance agent and pre-need funeral planning specialist in Chino Hills, CA.",
          `${siteConfig.url}/advisors/manolo-monter`
        ),
        generatePersonSchema(
          "Manolo Monter",
          "Life Insurance Agent & Pre-Need Specialist",
          "Award-winning life insurance agent with over a decade of experience, specializing in pre-need funeral planning and compassionate family service.",
          manoloImage,
          `${siteConfig.url}/advisors/manolo-monter`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Manolo Monter", url: `${siteConfig.url}/advisors/manolo-monter` }
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
                Life Insurance Agent & Pre-Need Specialist
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Manolo Monter
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "Guiding Families with Compassion During Life's Most Important Moments."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                An award-winning life insurance agent licensed in California for over a decade, 
                Manolo specializes in pre-need funeral planning — helping families prepare with 
                dignity and care. His experience in funeral homes and in the field gives him a 
                unique perspective rooted in empathy and expertise.
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
                  variant="hero" 
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
                <Link to="/advisors/manolo-monter/life-insurance">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Start Life Insurance Application
                  </Button>
                </Link>
                <Link to="/advisors/manolo-monter/living-trust-questionnaire">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Start Living Trust Questionnaire
                  </Button>
                </Link>
                <Link to="/advisors/manolo-monter/prequalification">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-accent bg-transparent text-accent hover:bg-accent/20"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Pre-Qualification
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                <img
                  src={manoloImage}
                  alt="Manolo Monter - Life Insurance Agent & Pre-Need Specialist"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
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
              About Manolo
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Compassion, Expertise & Dedication
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Manolo Monter is an award-winning life insurance agent licensed in California 
                for over a decade. His career is defined by a deep commitment to helping families 
                navigate life's most challenging moments with dignity, preparation, and peace of mind.
              </p>
              <p>
                For the past six years, Manolo has specialized in pre-need funeral planning — 
                guiding families through one of life's most sensitive decisions with compassion 
                and expertise. With hands-on experience both in funeral homes and in the field, 
                he brings a unique perspective that blends industry knowledge with genuine personal care.
              </p>
              <p>
                Beyond his professional work, Manolo is a devoted father of three, balancing 
                family life with a passion for service. He understands firsthand the importance 
                of planning ahead and protecting the people who matter most.
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
              Protecting What Matters Most
            </h2>
            <p className="text-lg text-muted-foreground">
              Compassionate planning solutions built on over a decade of experience 
              helping families secure their futures.
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
              A compassionate approach to protecting your family's future with clarity and care.
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
              Ready to Protect Your Family's Future?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Whether you need life insurance, pre-need funeral planning, or estate protection, 
              I'm here to guide you with compassion and expertise every step of the way.
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
                <Button size="lg" variant="hero">
                  <Phone className="mr-2 h-5 w-5" />
                  (888) 350-5396
                </Button>
              </a>
              <Link to="/advisors/manolo-monter/life-insurance">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Application
                </Button>
              </Link>
              <Link to="/advisors/manolo-monter/living-trust-questionnaire">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Living Trust Questionnaire
                </Button>
              </Link>
              <Link to="/advisors/manolo-monter/prequalification">
                <Button size="lg" variant="hero">
                  <FileText className="mr-2 h-5 w-5" />
                  Life Insurance Pre-Qualification
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/60 text-sm">
              Free consultation. No obligations. Just honest, compassionate guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Manolo Monter"
        advisorEmail="mmonter@tfainsuranceadvisors.com"
        advisorImage={manoloImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Manolo Monter"
        advisorEmail="mmonter@tfainsuranceadvisors.com"
        advisorImage={manoloImage}
      />
    </div>
    </>
  );
};

export default AdvisorManoloMonter;
