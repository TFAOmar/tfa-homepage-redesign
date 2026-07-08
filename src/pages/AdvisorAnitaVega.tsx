import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MapPin,
  Calendar,
  Award,
  Phone,
  Shield,
  TrendingUp,
  Heart,
  Briefcase,
  Users,
  PiggyBank,
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import anitaVegaAsset from "@/assets/advisors/anita-vega.jpg.asset.json";

const anitaVegaImg = anitaVegaAsset.url;

const specialties = [
  "Retirement Planning",
  "Life Insurance",
  "Estate Planning",
  "Legacy Strategies",
  "Investment Management",
];

const services = [
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description:
      "Personalized retirement strategies designed to help you retire comfortably and maintain the lifestyle you've worked hard for.",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description:
      "Protection strategies to safeguard your loved ones and provide financial security for the ones who matter most.",
  },
  {
    icon: Heart,
    title: "Estate & Legacy Planning",
    description:
      "Thoughtful estate planning that preserves your wealth and creates a lasting legacy for future generations.",
  },
  {
    icon: TrendingUp,
    title: "Wealth Building",
    description:
      "Practical investment insights and wealth-building frameworks tailored to individuals, families, and entrepreneurs.",
  },
  {
    icon: Briefcase,
    title: "Business Owner Strategies",
    description:
      "Financial planning for business owners — protecting what you've built while planning for long-term growth.",
  },
  {
    icon: Users,
    title: "Family Financial Guidance",
    description:
      "Empowering families to make informed financial decisions with confidence and clarity.",
  },
];

const AdvisorAnitaVega = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Anita Vega",
    "Financial Strategist",
    "Financial Strategist at The Financial Architects with 25+ years of experience helping individuals, families, and business owners build wealth, protect what matters, and plan for a secure financial future.",
    anitaVegaImg,
    `${siteConfig.url}/advisors/anita-vega`,
    specialties
  );

  return (
    <>
      <SEOHead
        title="Anita Vega | Financial Strategist | The Financial Architects"
        description="Meet Anita Vega, Financial Strategist at The Financial Architects — 25+ years helping families and business owners with retirement, life insurance, estate planning, and legacy strategies in Long Beach, CA."
        keywords="Anita Vega, financial strategist, retirement planning, life insurance, estate planning, Long Beach, The Financial Architects"
        canonical={`${siteConfig.url}/advisors/anita-vega`}
      />
      <JsonLd data={[personSchema]} />

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
                Anita Vega
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Retirement • Life Insurance • Estate Planning
              </p>
              <p className="text-lg text-accent italic mb-4">
                "Simplify finance. Empower families. Build legacies."
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Long Beach, CA</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white/60 mb-6 text-sm">
                <Award className="h-4 w-4 mr-2" />
                <span>CA License #4484117 • 25+ Years of Experience</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Helping individuals, families, and business owners build wealth, protect what matters most, and plan for a secure financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Meeting
                </Button>
                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Anita
                </Button>
              </div>
              <a
                href="tel:+13109304960"
                className="inline-flex items-center text-white/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                310-930-4960
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={anitaVegaImg}
                  alt="Anita Vega - Financial Strategist"
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
              <Badge variant="outline" className="mb-4">About Anita</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                25+ Years Helping Families Build Wealth & Protect Legacies
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                With over 25 years of experience in finance, Anita Vega helps individuals, families, and business owners build wealth, protect what matters most, and plan for a secure financial future. She specializes in retirement planning, life insurance, estate planning, and legacy strategies — empowering clients to make informed financial decisions with confidence.
              </p>
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
                <p className="text-lg italic text-navy font-medium">
                  "I share practical financial strategies, investment insights, and wealth-building frameworks designed to help individuals and entrepreneurs make smarter decisions with their money. My mission is to simplify finance and empower others to achieve long-term financial success."
                </p>
              </div>
              <p className="mb-6">
                Anita's mission is to help every client retire comfortably, protect their loved ones, and create a lasting legacy for generations to come.
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Areas of Focus</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How Anita Can Help
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial strategies tailored to your goals, family, and future.
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

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Plan Your Financial Future?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you're planning for retirement, protecting your family, or building a legacy — Anita is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setScheduleModalOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Meeting
            </Button>
            <Button
              size="lg"
              variant="hero"
              onClick={() => setContactModalOpen(true)}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Anita
            </Button>
          </div>
          <p className="text-white/60 text-sm">
            Licensed in California — CA License #4484117
          </p>
        </div>
      </section>

      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Anita Vega"
        advisorImage={anitaVegaImg}
        schedulingLink="https://calendly.com/anitavega007/30min"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Anita Vega"
        advisorImage={anitaVegaImg}
        advisorSlug="anita-vega"
      />
    </>
  );
};

export default AdvisorAnitaVega;