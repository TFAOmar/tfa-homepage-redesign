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
  Home,
  Shield,
  Users,
  TrendingUp,
  HandCoins,
  Award,
  Calculator
} from "lucide-react";
import ruthImage from "@/assets/advisors/ruth-pacheco.jpg";
import luisPachecoImage from "@/assets/partners/luis-pacheco.webp";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Reverse Mortgages",
  "Mortgage Financing", 
  "Retirement Planning",
  "Real Estate Strategy",
  "Home Equity Solutions",
  "Senior Financial Planning",
  "Tax Strategy"
];

const services = [
  {
    icon: Home,
    title: "Reverse Mortgages",
    description: "Expert guidance on reverse mortgage solutions that help seniors access home equity while maintaining homeownership."
  },
  {
    icon: HandCoins,
    title: "Mortgage Financing",
    description: "Comprehensive mortgage solutions backed by 36+ years of lending expertise through multiple market cycles."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic retirement solutions that integrate home equity into your overall financial security plan."
  },
  {
    icon: TrendingUp,
    title: "Real Estate Strategy",
    description: "Expert advice on leveraging real estate assets to enhance retirement income and financial flexibility."
  },
  {
    icon: Shield,
    title: "Home Equity Solutions",
    description: "Customized strategies to access and preserve home equity while protecting your financial future."
  },
  {
    icon: Users,
    title: "Senior Financial Planning",
    description: "Specialized planning for seniors navigating retirement, healthcare costs, and legacy decisions."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Meeting",
    description: "A complimentary conversation to understand your financial goals, home equity situation, and retirement needs."
  },
  {
    number: "02",
    title: "Comprehensive Analysis",
    description: "Thorough review of your home value, mortgage options, and how they fit into your overall financial picture."
  },
  {
    number: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your options with side-by-side comparisons and honest recommendations."
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "Guided execution of your plan with dedicated support every step of the way."
  }
];

const AdvisorRuthPacheco = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Ruth Pacheco - Reverse Mortgage Specialist"
        description="Work with Ruth Pacheco, Reverse Mortgage Certified specialist in Upland, CA. 36+ years of lending experience helping seniors access home equity."
        canonical={`${siteConfig.url}/advisors/ruth-pacheco`}
        ogType="profile"
        keywords="reverse mortgage specialist Upland, senior financial planning, home equity, mortgage financing California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Ruth Pacheco - Reverse Mortgage Specialist | The Financial Architects",
          "Work with Ruth Pacheco, Reverse Mortgage Certified specialist in Upland, CA. 36+ years of lending experience.",
          `${siteConfig.url}/advisors/ruth-pacheco`
        ),
        generatePersonSchema(
          "Ruth Pacheco",
          "Reverse Mortgage Specialist",
          "Ruth Pacheco is a Reverse Mortgage Certified specialist at The Financial Architects in Upland, CA, with 36+ years of lending experience helping seniors access home equity.",
          ruthImage,
          `${siteConfig.url}/advisors/ruth-pacheco`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Ruth Pacheco", url: `${siteConfig.url}/advisors/ruth-pacheco` }
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
                Reverse Mortgage Specialist
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Ruth Pacheco
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "I Am Not Number One, YOU Are!"
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                With 36+ years of lending experience, Ruth is a Reverse Mortgage Certified 
                specialist. Her career spans business ownership, loan processing, and loan 
                origination through multiple market cycles. Her passion for people ensures 
                every transaction is handled with care.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Upland, California</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-5 w-5 text-accent" />
                  <span>NMLS# 252846</span>
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
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                <img
                  src={ruthImage}
                  alt="Ruth Pacheco - Reverse Mortgage Specialist"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">36+</span>
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
              About Ruth
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Putting Clients First for Over Three Decades
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Ruth Pacheco is one of the most experienced mortgage professionals in the 
                industry, with more than 36 years of lending experience. Her journey has 
                taken her from business ownership to loan processing to loan origination, 
                giving her a comprehensive understanding of every aspect of the mortgage process.
              </p>
              <p>
                As a Reverse Mortgage Certified specialist, Ruth has helped countless seniors 
                access their home equity to enhance their retirement security. She understands 
                the unique concerns and questions that come with this decision and takes the 
                time to explain every option clearly and honestly.
              </p>
              <p>
                Ruth's client-first philosophy—"I am not number one, YOU are!"—isn't just a 
                slogan. It's the principle that guides every interaction. Having navigated 
                multiple market cycles, she brings perspective and stability that helps clients 
                make confident decisions regardless of market conditions.
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

      {/* CPA Partnership Section */}
      <section className="py-16 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-accent/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
                      CPA Partnership
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Tax-Advantaged Financial Solutions
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      In partnership with her son Luis Pacheco, CPA at Layman's Tax & Accounting, 
                      Ruth offers integrated tax strategy and financial planning solutions that 
                      help reduce your tax burden while building wealth.
                    </p>
                    <Link to="/advisors/ruth-pacheco/tax-strategy">
                      <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold">
                        <Calculator className="mr-2 h-5 w-5" />
                        Explore Tax Strategies
                      </Button>
                    </Link>
                  </div>
                  <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-8">
                    <div className="text-center">
                      <img 
                        src={luisPachecoImage}
                        alt="Luis Pacheco, CPA"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-accent/20"
                      />
                      <p className="font-semibold text-foreground">Luis Pacheco, CPA</p>
                      <p className="text-sm text-muted-foreground">Layman's Tax & Accounting</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              Comprehensive Mortgage & Financial Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert guidance backed by 36+ years of experience helping families 
              achieve their homeownership and retirement goals.
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
              A straightforward approach to finding the right mortgage solution for your needs.
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
              Ready to Explore Your Options?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              With 36+ years of experience and a client-first philosophy, Ruth is ready 
              to help you find the right mortgage solution. Schedule your free consultation today.
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
        advisorName="Ruth Pacheco"
        advisorEmail="ruth@tfainsuranceadvisors.com"
        advisorImage={ruthImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Ruth Pacheco"
        advisorEmail="ruth@tfainsuranceadvisors.com"
        advisorImage={ruthImage}
      />
    </div>
    </>
  );
};

export default AdvisorRuthPacheco;