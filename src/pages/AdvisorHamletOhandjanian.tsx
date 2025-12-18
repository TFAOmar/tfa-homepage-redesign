import { useEffect, useState } from "react";
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
  GraduationCap,
  Heart,
  Award
} from "lucide-react";
import hamletImage from "@/assets/advisors/hamlet-ohandjanian.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const specialties = [
  "Retirement Planning",
  "Tax Strategies", 
  "Life Insurance",
  "Financial Education",
  "Wealth Protection",
  "Family Planning"
];

const services = [
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic retirement solutions built on integrity and transparency to help you achieve financial independence."
  },
  {
    icon: TrendingUp,
    title: "Tax Strategies",
    description: "Proactive tax planning to minimize your burden and preserve more of your hard-earned wealth."
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Comprehensive protection strategies that provide security and peace of mind for your loved ones."
  },
  {
    icon: GraduationCap,
    title: "Financial Education",
    description: "Empowering clients with knowledge and understanding to make confident financial decisions."
  },
  {
    icon: Users,
    title: "Wealth Protection",
    description: "Holistic strategies to safeguard your assets and ensure long-term financial stability."
  },
  {
    icon: Heart,
    title: "Family Planning",
    description: "Faith-driven guidance to help families build generational wealth and lasting legacies."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Meeting",
    description: "A complimentary conversation to understand your financial goals, concerns, and current situation."
  },
  {
    number: "02",
    title: "Comprehensive Analysis",
    description: "Thorough review of your complete financial picture to identify opportunities and gaps."
  },
  {
    number: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your customized plan with actionable steps and recommendations."
  },
  {
    number: "04",
    title: "Implementation & Support",
    description: "Guided execution of your plan with ongoing support as your life evolves."
  }
];

const AdvisorHamletOhandjanian = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Hamlet Ohandjanian - Managing Partner"
        description="Work with Hamlet Ohandjanian, Managing Partner at TFA in Granada Hills, CA. 28 years of leadership experience, committed to integrity and transparent financial planning."
        canonical={`${siteConfig.url}/advisors/hamlet-ohandjanian`}
        ogType="profile"
        keywords="managing partner Granada Hills, retirement planning, tax strategies, life insurance, financial education California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Hamlet Ohandjanian - Managing Partner | The Financial Architects",
          "Work with Hamlet Ohandjanian, Managing Partner at TFA in Granada Hills, CA. 28 years of leadership experience.",
          `${siteConfig.url}/advisors/hamlet-ohandjanian`
        ),
        generatePersonSchema(
          "Hamlet Ohandjanian",
          "Managing Partner",
          "Hamlet Ohandjanian is a Managing Partner at The Financial Architects in Granada Hills, CA, with 28 years of leadership experience committed to integrity and transparent financial planning.",
          hamletImage,
          `${siteConfig.url}/advisors/hamlet-ohandjanian`,
          specialties
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Hamlet Ohandjanian", url: `${siteConfig.url}/advisors/hamlet-ohandjanian` }
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
                Managing Partner
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Hamlet Ohandjanian
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                "Every Family Deserves a Guide They Can Trust."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                After a 28-year career as a Director of Operations in hospitality, 
                Hamlet transitioned to financial services to become a result-driven 
                educator. A God-loving family man committed to integrity and transparency.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Granada Hills, California</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Life & Health Lic# 4379309</span>
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
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
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
                  src={hamletImage}
                  alt="Hamlet Ohandjanian - Managing Partner"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[3/4]"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <span className="text-2xl font-bold">28+</span>
                  <span className="text-sm block">Years Leadership</span>
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
              About Hamlet
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              From Hospitality Leader to Financial Educator
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Hamlet Ohandjanian spent 28 years in the hospitality industry as a Director 
                of Operations, where he developed and promoted dozens of industry leaders. 
                His career was defined by developing talent, building teams, and creating 
                systems that helped people succeed.
              </p>
              <p>
                Seeing the need for more result-driven financial educators and strategists, 
                Hamlet transitioned to financial services to bring his leadership expertise 
                to helping families build financial security. His hospitality background 
                taught him that service excellence comes from genuinely caring about people.
              </p>
              <p>
                A God-loving family man, Hamlet is passionate about helping others with 
                integrity and transparency. He sees every individual as an opportunity to 
                help someone and their family achieve their retirement and financial planning 
                goals. His faith guides his approach: honest, caring, and always putting 
                the client's needs first.
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
              Result-driven strategies built on 28 years of leadership experience 
              and a genuine commitment to your success.
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
              Ready to Work with an Advisor You Can Trust?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              With 28 years of leadership experience and a commitment to integrity, 
              Hamlet is ready to help you achieve your financial goals. Schedule your 
              free consultation today.
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
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
        advisorName="Hamlet Ohandjanian"
        advisorEmail="hamleto@tfainsuranceadvisors.com"
        advisorImage={hamletImage}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Hamlet Ohandjanian"
        advisorEmail="hamleto@tfainsuranceadvisors.com"
        advisorImage={hamletImage}
      />
    </div>
    </>
  );
};

export default AdvisorHamletOhandjanian;