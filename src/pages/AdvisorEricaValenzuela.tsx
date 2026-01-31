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
  FileText, 
  Users, 
  Target,
  Handshake,
  ClipboardCheck,
  Lightbulb,
  ArrowRight,
  Award,
  Heart,
  Home,
  GraduationCap
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import ericaValenzuelaImg from "@/assets/advisors/erica-valenzuela.jpg";

const specialties = [
  "Living Trust Planning",
  "Life Insurance",
  "Estate Planning",
  "Real Estate",
  "Protection Planning"
];

const services = [
  {
    icon: FileText,
    title: "Living Trust Planning",
    description: "Comprehensive living trust awareness and education to help you understand your estate planning options and protect your family's future."
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Protection solutions designed to safeguard your family's financial security, especially for those in high-stress professions."
  },
  {
    icon: Target,
    title: "Estate Planning",
    description: "Strategic planning to ensure your assets are protected and transferred to your loved ones exactly as you intend."
  },
  {
    icon: Home,
    title: "Real Estate Solutions",
    description: "Leveraging real estate expertise to integrate property considerations into your comprehensive financial plan."
  },
  {
    icon: Users,
    title: "Protection Planning",
    description: "Tailored strategies for families in demanding careers—including corrections and first responders—who need plans that work when it counts."
  },
  {
    icon: GraduationCap,
    title: "Financial Education",
    description: "Education-first approach that empowers you with knowledge to make confident decisions about your family's future."
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Discovery",
    description: "We'll discuss your goals, concerns, and current situation to understand where you are and where you want to be."
  },
  {
    icon: ClipboardCheck,
    title: "Analysis",
    description: "I'll review your existing coverage and assets, identifying gaps and opportunities for improvement."
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Together, we'll develop a customized plan tailored to your unique needs, family dynamics, and timeline."
  },
  {
    icon: Handshake,
    title: "Implementation",
    description: "I'll guide you through every step, providing ongoing support and education as your needs evolve."
  }
];

const AdvisorEricaValenzuela = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Erica Valenzuela",
    "Financial Strategist",
    "Erica Valenzuela specializes in protection planning with a focus on Living Trust awareness, helping families in demanding careers protect what matters most.",
    ericaValenzuelaImg,
    `${siteConfig.url}/advisors/erica-valenzuela`,
    specialties
  );

  const localBusinessSchema = generateLocalBusinessSchema(
    "Riverside",
    {
      street: "",
      city: "Riverside",
      state: "CA",
      zip: "92501"
    },
    "(949) 415-8537"
  );

  return (
    <>
      <SEOHead
        title="Erica Valenzuela | Financial Strategist | The Financial Architects"
        description="Meet Erica Valenzuela, a bilingual Financial Strategist specializing in Living Trust planning, life insurance, and estate planning for families in high-stress professions."
        keywords="Erica Valenzuela, financial strategist, living trust, estate planning, life insurance, bilingual, Riverside CA, corrections, first responders"
        canonical={`${siteConfig.url}/advisors/erica-valenzuela`}
      />
      <JsonLd data={[personSchema, localBusinessSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 mb-4 border-amber-400/30">
                Bilingual • Bilingüe
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Erica Valenzuela
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Financial Strategist
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Riverside, CA</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 italic">
                "Planning for the unexpected is the greatest gift you can give your family."
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
                  variant="hero"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-white/80">
                <a href="tel:+19494158537" className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (949) 415-8537
                </a>
                <a href="mailto:evalenzuela@tfainsuranceadvisors.com" className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  evalenzuela@tfainsuranceadvisors.com
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={ericaValenzuelaImg}
                  alt="Erica Valenzuela - Financial Strategist"
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
              <Badge variant="outline" className="mb-4">About Erica</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Understanding the Realities of High-Stress Professions
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Erica Valenzuela understands the realities of high-stress professions—and the importance of planning for the unexpected. With a background in corrections, she brings a grounded, steady approach to financial education, helping families in demanding careers protect what matters most.
              </p>
              <p className="mb-6">
                Specializing in protection planning with a focus on Living Trust awareness, Erica empowers clients to make informed decisions about their family's future. Her calm, education-first philosophy ensures you'll feel supported and confident at every step.
              </p>
              <p className="mb-6">
                <strong className="text-navy">As a licensed Notary, Real Estate Professional, and Life Insurance Specialist</strong>, Erica provides a unique, well-rounded perspective—bridging real estate, protection planning, and estate awareness into a cohesive strategy for families who need their plan to work when it counts.
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
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <span>Licensed Notary</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-accent" />
                <span>Real Estate License</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                <span>Life & Health License</span>
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
              Comprehensive financial solutions with a focus on education and protection
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
              A calm, education-driven approach to protecting your family's future
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
            Ready to Protect Your Family's Future?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and create a personalized plan for your family's peace of mind.
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
            <Link to="/advisors/erica-valenzuela/living-trust">
              <Button 
                size="lg" 
                variant="hero"
                className="w-full"
              >
                Living Trust Information
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <a 
            href="tel:+19494158537" 
            className="inline-flex items-center text-white/80 hover:text-accent transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            (949) 415-8537
          </a>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Erica Valenzuela"
        advisorEmail="evalenzuela@tfainsuranceadvisors.com"
        advisorImage={ericaValenzuelaImg}
        advisorSlug="erica-valenzuela"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Erica Valenzuela"
        advisorEmail="evalenzuela@tfainsuranceadvisors.com"
        advisorImage={ericaValenzuelaImg}
        advisorSlug="erica-valenzuela"
      />
    </>
  );
};

export default AdvisorEricaValenzuela;
