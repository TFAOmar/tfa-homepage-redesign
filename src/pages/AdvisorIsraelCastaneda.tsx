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
  Target,
  TrendingUp,
  Shield,
  Users,
  Globe,
  Award,
  FileText
} from "lucide-react";
import israelImage from "@/assets/advisors/israel-castaneda.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Life Insurance",
  "Retirement Planning",
  "Estate Planning",
  "Tax Strategies",
  "Generational Wealth",
  "Bilingual Services"
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Comprehensive life insurance solutions designed to protect your family and build lasting wealth for future generations."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic retirement planning to help you achieve long-term financial independence and enjoy your golden years with confidence."
  },
  {
    icon: FileText,
    title: "Estate Planning",
    description: "Living trusts and estate protection strategies to preserve your legacy and ensure your assets pass smoothly to your heirs."
  },
  {
    icon: TrendingUp,
    title: "Tax Strategies",
    description: "Proactive tax planning to optimize wealth retention and minimize your tax burden for you and your family."
  },
  {
    icon: Users,
    title: "Generational Wealth",
    description: "Holistic strategies to build, protect, and transfer multi-generational wealth aligned with your family's values."
  },
  {
    icon: Globe,
    title: "Bilingual Services",
    description: "Full financial guidance in English and Spanish, ensuring clear communication and understanding for every family we serve."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Meeting",
    description: "A complimentary conversation to understand your family's goals, concerns, and current financial situation."
  },
  {
    number: "02",
    title: "Comprehensive Analysis",
    description: "Thorough review of your complete financial picture to identify opportunities and protection gaps."
  },
  {
    number: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your customized plan with actionable steps tailored to your family's needs."
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "Guided execution of your plan with ongoing support as your life and family evolve."
  }
];

const AdvisorIsraelCastaneda = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Israel Castaneda - Partner at The Financial Architects"
        description="Work with Israel Castaneda, bilingual Financial Partner serving Fresno and Central California. Expert in life insurance, retirement planning, and estate protection."
        canonical={`${siteConfig.url}/advisors/israel-castaneda`}
        ogType="profile"
        keywords="bilingual financial advisor Fresno, life insurance Fresno, retirement planning Central California, estate planning Fresno, Spanish speaking financial advisor"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Israel Castaneda - Partner | The Financial Architects",
          "Work with Israel Castaneda, bilingual Financial Partner serving Fresno and Central California. Expert in life insurance, retirement planning, and estate protection.",
          `${siteConfig.url}/advisors/israel-castaneda`
        ),
        generatePersonSchema(
          "Israel Castaneda",
          "Partner",
          "Israel Castaneda is a bilingual Financial Partner at The Financial Architects serving Fresno and Central California. He specializes in life insurance, retirement planning, estate planning, and generational wealth strategies.",
          israelImage,
          `${siteConfig.url}/advisors/israel-castaneda`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Israel Castaneda", url: `${siteConfig.url}/advisors/israel-castaneda` }
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
                    Partner
                  </Badge>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 hover:bg-amber-500/30">
                    Bilingual • Bilingüe
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Israel Castaneda
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light">
                  "Building Generational Security for Your Family"
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Israel helps families build generational security and long-term financial peace of mind. 
                  Specializing in life insurance, retirement planning, living trusts, and estate-protection 
                  strategies, he makes complex financial decisions easy to understand. Known for his clear 
                  communication and genuine care, Israel focuses on the "why" behind every financial move.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>Fresno, California</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="h-5 w-5 text-accent" />
                    <span>Life & Health Lic# 0I35205</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-white/90 flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>7621 N Del Mar Ave, Unit 102, Fresno, CA 93711</span>
                  </p>
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
                  <Link to="/advisors/israel-castaneda/life-insurance">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-accent bg-transparent text-accent hover:bg-accent/20"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Start Life Insurance Application
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                  <img
                    src={israelImage}
                    alt="Israel Castaneda - Partner"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <span className="text-2xl font-bold">TFA</span>
                    <span className="text-sm block">Partner</span>
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
                About Israel
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Your Partner in Financial Security
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Israel Castaneda brings a passion for helping families achieve lasting financial 
                  security through personalized, needs-based planning. Based in Fresno, California, 
                  he serves clients throughout the Central Valley and beyond, offering bilingual 
                  services in both English and Spanish.
                </p>
                <p>
                  His approach centers on understanding the "why" behind every financial decision. 
                  Whether it's protecting your family with the right life insurance coverage, planning 
                  for a comfortable retirement, or establishing a living trust to protect your legacy, 
                  Israel takes the time to explain each step in clear, relatable terms.
                </p>
                <p>
                  As a Partner at The Financial Architects, Israel is committed to helping families 
                  protect what matters most and build a lasting legacy for the next generation. His 
                  genuine care for his clients and their families shines through in every interaction.
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
                Personalized strategies designed to protect your family and build 
                generational wealth for years to come.
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
                A straightforward approach to building your family's financial future with clarity and confidence.
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
                Ready to Build Your Family's Financial Future?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Israel is committed to helping families in Fresno and Central California achieve 
                lasting financial security. Schedule your free consultation today.
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
                <Link to="/advisors/israel-castaneda/life-insurance">
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
          advisorName="Israel Castaneda"
          advisorEmail="israel@tfainsuranceadvisors.com"
          advisorImage={israelImage}
        />
        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName="Israel Castaneda"
          advisorEmail="israel@tfainsuranceadvisors.com"
          advisorImage={israelImage}
        />
      </div>
    </>
  );
};

export default AdvisorIsraelCastaneda;