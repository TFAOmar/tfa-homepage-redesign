import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Shield, 
  PiggyBank, 
  FileText, 
  Users, 
  Target,
  Handshake,
  ClipboardCheck,
  Lightbulb,
  ArrowRight,
  Award,
  Heart
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import fabianSerranoImg from "@/assets/advisors/fabian-serrano.jpg";

const specialties = [
  "Life Insurance",
  "Annuities",
  "Retirement Planning",
  "Estate Planning",
  "Tax Strategies",
  "Commercial Insurance"
];

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Comprehensive protection solutions designed to safeguard your family's financial future and provide peace of mind."
  },
  {
    icon: PiggyBank,
    title: "Annuities",
    description: "Guaranteed income streams for retirement security, helping you build a reliable financial foundation for the future."
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic planning to help you achieve financial independence and enjoy the retirement you've always envisioned."
  },
  {
    icon: FileText,
    title: "Estate Planning",
    description: "Asset protection and legacy preservation strategies to ensure your wealth transfers efficiently to future generations."
  },
  {
    icon: Users,
    title: "Tax-Efficient Strategies",
    description: "Optimize your financial plan with tax-advantaged solutions that help you keep more of what you earn."
  },
  {
    icon: Lightbulb,
    title: "Financial Education",
    description: "Empowering you with knowledge and clarity to make confident decisions about your financial future."
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description: "We'll discuss your goals, concerns, and current financial situation to understand where you are and where you want to be."
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description: "I'll review your existing coverage and financial position, identifying gaps and opportunities for improvement."
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Together, we'll develop a customized plan tailored to your unique needs, timeline, and risk tolerance."
  },
  {
    icon: Handshake,
    title: "Implementation",
    description: "I'll guide you through every step of putting your plan into action, with ongoing support as your needs evolve."
  }
];

const AdvisorFabianSerrano = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Fabian Serrano",
    "Financial Strategist",
    "Insurance industry veteran with over 20 years of experience, partnering with TFA since 2024 to help clients with life insurance, annuities, retirement planning, and estate planning.",
    fabianSerranoImg,
    `${siteConfig.url}/advisors/fabian-serrano`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Rancho Cucamonga",
    {
      street: "11799 Sebastian Way Suite 103",
      city: "Rancho Cucamonga",
      state: "CA",
      zip: "91730"
    },
    "(909) 323-7601"
  );

  return (
    <>
      <SEOHead
        title="Fabian Serrano | Financial Strategist | The Financial Architects"
        description="Meet Fabian Serrano, a 20-year insurance industry veteran specializing in life insurance, annuities, retirement planning, and estate planning in Rancho Cucamonga, CA."
        keywords="Fabian Serrano, financial strategist, life insurance, annuities, retirement planning, estate planning, Rancho Cucamonga CA"
        canonical={`${siteConfig.url}/advisors/fabian-serrano`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-accent/20 text-accent hover:bg-accent/30 mb-4">
                Financial Strategist
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Fabian Serrano
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Rancho Cucamonga, CA</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 italic">
                "A proactive approach to overall well-being—in business and in life—is the key to success."
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
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
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-white/80">
                <a href="tel:+19093237601" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (909) 323-7601
                </a>
                <a href="mailto:fabian@shftinsurance.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  fabian@shftinsurance.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={fabianSerranoImg}
                  alt="Fabian Serrano - Financial Strategist"
                  className="relative w-80 h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">About Fabian</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                20+ Years of Industry Excellence
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Fabian Serrano is a seasoned insurance professional with over two decades of experience in the financial services industry. His journey began in 2004 as an entry-level agent, quickly rising to Agency Manager within just nine months. In that role, he led a team of over 15 agents across three San Diego locations, building the company's largest and most successful region—generating an impressive 7,200 new business applications annually.
              </p>
              <p className="mb-6">
                Between 2008 and 2013, Fabian expanded his expertise through roles at two major financial institutions, where he mastered process optimization and organizational structuring. He later held VP of Sales & Partner positions for a decade, engineering streamlined training and underwriting processes while cultivating talent and expanding client relationships.
              </p>
              <p className="mb-6">
                <strong className="text-navy">In 2024, Fabian partnered with The Financial Architects</strong> to extend his service offerings into life insurance, annuities, retirement planning, and estate planning—helping his clients build comprehensive financial security beyond property and casualty insurance.
              </p>
              <p>
                Fabian is a strong advocate for a healthy work-life balance and believes that a proactive approach to overall well-being is the key to success in both business and life.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {specialties.map((specialty, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm py-1.5 px-3"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-accent" />
                <span>20+ Years Experience</span>
                <span className="mx-2">•</span>
                <Heart className="h-5 w-5 text-accent" />
                <span>7,200+ Annual Applications Led</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How I Can Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your unique goals and circumstances
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-navy">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">The Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Working Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A straightforward approach to building your financial foundation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-navy/20 -z-10 hidden lg:block" 
                       style={{ display: index === processSteps.length - 1 ? 'none' : undefined }} />
                  <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your financial goals and create a personalized plan for your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setScheduleModalOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Consultation
            </Button>
            <Link to="/advisors/fabian-serrano/life-insurance">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 w-full"
              >
                Apply for Life Insurance
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <a 
            href="tel:+19093237601" 
            className="inline-flex items-center text-white/80 hover:text-accent transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            (909) 323-7601
          </a>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Fabian Serrano"
        advisorEmail="fabian@shftinsurance.com"
        advisorImage={fabianSerranoImg}
        advisorSlug="fabian-serrano"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Fabian Serrano"
        advisorEmail="fabian@shftinsurance.com"
        advisorImage={fabianSerranoImg}
        advisorSlug="fabian-serrano"
      />
    </>
  );
};

export default AdvisorFabianSerrano;
