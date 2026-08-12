import { useEffect, useState } from "react";
import NonMedicalLifeCTA from "@/components/advisors/NonMedicalLifeCTA";
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
  Briefcase,
  Award,
  FileText,
  TrendingUp,
  DollarSign,
  Landmark
} from "lucide-react";
import rubenImage from "@/assets/advisors/ruben-davis.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Retirement Planning",
  "Mortgage Protection",
  "Life Insurance with Living Benefits",
  "Annuities",
  "Income Protection",
  "Wealth Building"
];

const services = [
  {
    icon: Landmark,
    title: "Retirement Planning",
    description: "Forward-thinking strategies to help you build wealth, secure income, and enjoy a comfortable retirement—without the fluff."
  },
  {
    icon: Home,
    title: "Mortgage Protection",
    description: "Ensure your family keeps their home no matter what happens. Tailored coverage that pays off your mortgage if life takes an unexpected turn."
  },
  {
    icon: Shield,
    title: "Life Insurance with Living Benefits",
    description: "Protection that works while you're alive. Access benefits for critical illness, chronic conditions, or terminal diagnosis—on your terms."
  },
  {
    icon: TrendingUp,
    title: "Annuities & Growth",
    description: "Guaranteed income streams and tax-advantaged growth strategies to ensure your money works as hard as you do."
  },
  {
    icon: DollarSign,
    title: "Income Protection",
    description: "Safeguard your most valuable asset—your ability to earn. Disability and income replacement strategies that keep your family financially stable."
  },
  {
    icon: Briefcase,
    title: "Wealth Building Strategy",
    description: "Disciplined, no-nonsense wealth accumulation plans built on 17+ years of real estate and financial expertise."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "A no-pressure conversation to understand your goals, your family's needs, and where you stand today."
  },
  {
    number: "02",
    title: "Financial Assessment",
    description: "A thorough review of your income, assets, debts, and coverage gaps to identify what needs attention."
  },
  {
    number: "03",
    title: "Custom Strategy",
    description: "A clear, personalized plan with actionable steps—no jargon, no fluff, just what you need to move forward."
  },
  {
    number: "04",
    title: "Execution & Support",
    description: "We implement together and stay in your corner as your life, career, and goals evolve."
  }
];

const AdvisorRubenDavis = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Ruben Davis - Franchise Owner"
        description="Work with Ruben Davis, a U.S. Air Force Reservist and 17-year veteran of real estate & mortgage financing in Los Angeles, CA. Specializing in retirement planning, mortgage protection, life insurance with living benefits, and annuities."
        canonical={`${siteConfig.url}/advisors/ruben-davis`}
        ogType="profile"
        keywords="financial advisor Los Angeles, retirement planning, mortgage protection, life insurance living benefits, annuities, income protection, Ruben Davis"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Ruben Davis - Franchise Owner | The Financial Architects",
          "Work with Ruben Davis, a U.S. Air Force Reservist and wealth strategist in Los Angeles, CA.",
          `${siteConfig.url}/advisors/ruben-davis`
        ),
        generatePersonSchema(
          "Ruben Davis",
          "Franchise Owner — Income Protection & Retirement Planning",
          "U.S. Air Force Reservist with 17+ years of experience in real estate, mortgage financing, and wealth planning. Now helping clients grow and protect their wealth through The Financial Architects.",
          rubenImage,
          `${siteConfig.url}/advisors/ruben-davis`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Ruben Davis", url: `${siteConfig.url}/advisors/ruben-davis` }
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
                  Franchise Owner
                </Badge>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Ruben Davis
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light italic">
                  "Veteran. Strategist. Wealth Builder."
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  With over 17 years of experience in real estate and mortgage financing, 
                  Ruben built one of Southern California's fastest-growing brokerages. Now, 
                  through The Financial Architects, he helps clients grow and protect their 
                  wealth with personalized strategies—without the fluff.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>Los Angeles, California</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="h-5 w-5 text-accent" />
                    <span>U.S. Air Force Reservist</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Shield className="h-5 w-5 text-accent" />
                    <span>Lic# 0F77548</span>
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
                  <Link to="/advisors/ruben-davis/life-insurance">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-accent bg-transparent text-accent hover:bg-accent/20"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Start Life Insurance Application
                    </Button>
                  </Link>
                  <NonMedicalLifeCTA advisorSlug="ruben-davis" />
                  <Link to="/advisors/ruben-davis/prequalification">
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
                    src={rubenImage}
                    alt="Ruben Davis - Franchise Owner, Income Protection & Retirement Planning"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <span className="text-2xl font-bold">17+</span>
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
                About Ruben
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Honesty, Discipline & No-Nonsense Strategy
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Ruben Davis is a Los Angeles native, UCLA graduate, and proud U.S. Air Force 
                  Reservist. With over 17 years of experience in real estate and mortgage financing, 
                  he built one of Southern California's fastest-growing brokerages—helping hundreds 
                  of families buy, sell, and protect their homes.
                </p>
                <p>
                  Now, through his partnership with The Financial Architects, Ruben helps clients 
                  grow and protect their wealth with personalized strategies in retirement planning, 
                  mortgage protection, life insurance with living benefits, annuities, and more.
                </p>
                <p>
                  Known for his honesty, discipline, and no-nonsense approach, Ruben is committed 
                  to helping families secure their financial future—without the fluff.
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
                Grow & Protect Your Wealth
              </h2>
              <p className="text-lg text-muted-foreground">
                Personalized financial strategies built on 17+ years of experience 
                helping families and business owners secure their futures.
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
                A disciplined, no-nonsense approach to securing your financial future.
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
                Ready to Secure Your Financial Future?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                No fluff. No pressure. Just honest, disciplined guidance from a veteran 
                strategist who's helped hundreds of families protect what matters most.
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
                <a href="tel:8183816770">
                  <Button size="lg" variant="hero">
                    <Phone className="mr-2 h-5 w-5" />
                    Mobile (818) 381-6770
                  </Button>
                </a>
                <a href="tel:2134445479">
                  <Button size="lg" variant="hero">
                    <Phone className="mr-2 h-5 w-5" />
                    Office (213) 444-5479
                  </Button>
                </a>
                <Link to="/advisors/ruben-davis/life-insurance">
                  <Button size="lg" variant="hero">
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Application
                  </Button>
                </Link>
                <Link to="/advisors/ruben-davis/prequalification">
                  <Button size="lg" variant="hero">
                    <FileText className="mr-2 h-5 w-5" />
                    Life Insurance Pre-Qualification
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-white/60 text-sm">
                Free consultation. No obligations. Just honest, no-nonsense guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Modals */}
        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          advisorName="Ruben Davis"
          advisorEmail="ruben@tfainsuranceadvisors.com"
          advisorImage={rubenImage}
        />
        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          advisorName="Ruben Davis"
          advisorEmail="ruben@tfainsuranceadvisors.com"
          advisorImage={rubenImage}
        />
      </div>
    </>
  );
};

export default AdvisorRubenDavis;
