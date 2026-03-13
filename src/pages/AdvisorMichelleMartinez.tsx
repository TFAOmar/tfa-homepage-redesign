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
  Home,
  Heart,
  Award,
  FileText,
  TrendingUp,
  DollarSign,
  Landmark
} from "lucide-react";
import michelleImage from "@/assets/advisors/michelle-martinez.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Mortgage Protection",
  "Whole Life Insurance",
  "Tax-Free Retirement Strategies",
  "Rich Man's Roth",
  "Living Benefits",
  "Legacy Planning"
];

const services = [
  {
    icon: Home,
    title: "Mortgage Protection",
    description: "Ensure your family keeps their home no matter what life brings. Tailored coverage designed to pay off your mortgage and protect your loved ones."
  },
  {
    icon: Shield,
    title: "Whole Life Insurance",
    description: "Permanent protection that builds cash value over time. A foundation for your family's financial security that lasts a lifetime."
  },
  {
    icon: TrendingUp,
    title: "Tax-Free Retirement Strategies",
    description: "Smart, tax-advantaged strategies to grow your retirement savings and enjoy income without the tax burden in your golden years."
  },
  {
    icon: DollarSign,
    title: "Rich Man's Roth",
    description: "Leverage high-contribution, tax-free growth strategies traditionally reserved for the wealthy—now accessible to families ready to build lasting wealth."
  },
  {
    icon: Heart,
    title: "Living Benefits",
    description: "Access your policy benefits while you're still alive. Coverage for critical illness, chronic conditions, or terminal diagnosis—giving you options when you need them most."
  },
  {
    icon: Landmark,
    title: "Legacy Planning",
    description: "Protect what matters most—your legacy. Comprehensive strategies to ensure your family's financial future is secure for generations to come."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "A warm, no-pressure conversation to understand your family's goals, needs, and current financial picture."
  },
  {
    number: "02",
    title: "Needs Analysis",
    description: "A thorough review of your coverage gaps, income, and protection needs to identify the right solutions."
  },
  {
    number: "03",
    title: "Custom Plan",
    description: "A clear, personalized protection plan with options tailored to your family's unique situation and budget."
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "We put your plan into action together and stay by your side as your family's needs evolve."
  }
];

const AdvisorMichelleMartinez = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Michelle Martinez - Lead Agent | Mortgage Protection & Legacy Planning | The Financial Architects"
        description="Work with Michelle Martinez, a bilingual Lead Agent with 13+ years of experience in insurance and financial protection in Los Angeles, CA. Specializing in mortgage protection, whole life insurance, tax-free retirement strategies, and living benefits."
        canonical={`${siteConfig.url}/advisors/michelle-martinez`}
        ogType="profile"
        keywords="financial advisor Los Angeles, mortgage protection, whole life insurance, tax-free retirement, living benefits, legacy planning, bilingual advisor, Michelle Martinez"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Michelle Martinez - Lead Agent | The Financial Architects",
          "Work with Michelle Martinez, a bilingual Lead Agent specializing in family financial protection in Los Angeles, CA.",
          `${siteConfig.url}/advisors/michelle-martinez`
        ),
        generatePersonSchema(
          "Michelle Martinez",
          "Lead Agent — Mortgage Protection & Legacy Planning",
          "Bilingual Lead Agent with 13+ years of experience in insurance and financial protection. Specializing in mortgage protection, whole life insurance, tax-free retirement strategies, Rich Man's Roth, and living benefits.",
          michelleImage,
          `${siteConfig.url}/advisors/michelle-martinez`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Michelle Martinez", url: `${siteConfig.url}/advisors/michelle-martinez` }
        ])
      ]} />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                    Lead Agent
                  </Badge>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 hover:bg-amber-500/30">
                    Bilingual · Bilingüe
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Michelle Martinez
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light italic">
                  "Protecting What Matters Most — Your Legacy."
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  With over a decade of experience in insurance and financial protection, 
                  Michelle is dedicated to helping families safeguard their legacies through 
                  customized solutions—mortgage protection, whole life insurance, tax-free 
                  retirement strategies, and living benefits.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>Los Angeles, California</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="h-5 w-5 text-accent" />
                    <span>13+ Years Experience</span>
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
                  <Link to="/advisors/michelle-martinez/life-insurance">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-accent bg-transparent text-accent hover:bg-accent/20"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Start Life Insurance Application
                    </Button>
                  </Link>
                  <Link to="/advisors/michelle-martinez/prequalification">
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
                    src={michelleImage}
                    alt="Michelle Martinez - Lead Agent, Mortgage Protection & Legacy Planning"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <span className="text-2xl font-bold">13+</span>
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
                About Michelle
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Clarity, Confidence & Long-Term Security
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Michelle Martinez is the Lead Agent with The Financial Architects Team, 
                  bringing over a decade of experience in the insurance and financial protection 
                  industry. She began her career in life insurance in 2011 and expanded her 
                  expertise into health insurance from 2018 to 2022, gaining a well-rounded 
                  understanding of family and financial protection needs.
                </p>
                <p>
                  After a brief sabbatical, Michelle returned to the industry in 2024 and 
                  joined The Financial Architects Team, where she was selected to serve as the 
                  CEO's Interim Assistant, managing multiple policies and accounts with precision 
                  and care. Drawn by her passion for direct client impact, she later chose to 
                  step into a solo-agent role, dedicating her practice to helping families 
                  protect what matters most—their legacies.
                </p>
                <p>
                  Michelle specializes in customized solutions including mortgage protection, 
                  whole life insurance, tax-free retirement strategies, "Rich Man's Roth" policies, 
                  and living benefits. Her mission is to provide clarity, confidence, and long-term 
                  security for every family she serves.
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
                Protect Your Family's Legacy
              </h2>
              <p className="text-lg text-muted-foreground">
                Customized financial protection solutions built on 13+ years of experience 
                helping families secure what matters most.
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
                A caring, personalized approach to protecting your family's future.
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
                Ready to Protect Your Family's Legacy?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Let's have a conversation about what matters most to you and your family. 
                Michelle is here to provide clarity, confidence, and a plan you can count on.
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
                <a href="tel:6195712274">
                  <Button size="lg" variant="hero">
                    <Phone className="mr-2 h-5 w-5" />
                    (619) 571-2274
                  </Button>
                </a>
                <Link to="/advisors/michelle-martinez/life-insurance">
                  <Button size="lg" variant="hero">
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Application
                  </Button>
                </Link>
                <Link to="/advisors/michelle-martinez/prequalification">
                  <Button size="lg" variant="hero">
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Pre-Qualification
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-white/60 text-sm">
                Free consultation. No obligations. Just clarity and confidence for your family's future.
              </p>
            </div>
          </div>
        </section>

        {/* Modals */}
        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          advisorName="Michelle Martinez"
          advisorEmail="mmartinez@tfainsuranceadvisors.com"
          advisorImage={michelleImage}
        />
        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName="Michelle Martinez"
          advisorEmail="mmartinez@tfainsuranceadvisors.com"
          advisorImage={michelleImage}
        />
      </div>
    </>
  );
};

export default AdvisorMichelleMartinez;
