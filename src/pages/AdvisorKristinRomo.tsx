import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MapPin,
  Calendar,
  Users,
  Target,
  Handshake,
  ClipboardCheck,
  Award,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Settings,
  Heart,
} from "lucide-react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import kristinRomoImg from "@/assets/advisors/kristin-romo.jpg";

const specialties = [
  "Leadership Development",
  "Agent Training & Mentorship",
  "Operations & Systems",
  "Business Development",
  "Strategic Partnerships",
];

const services = [
  {
    icon: GraduationCap,
    title: "Agent Training & Onboarding",
    description:
      "Structured training, onboarding, and mentorship programs designed to increase retention, productivity, and long-term success for new and experienced agents.",
  },
  {
    icon: TrendingUp,
    title: "Leadership Development",
    description:
      "Ongoing coaching and accountability to help agents grow into confident, high-performing leaders within The Financial Architects.",
  },
  {
    icon: Settings,
    title: "Operations & Process",
    description:
      "Operational systems that streamline onboarding, improve efficiency, and support the organization as it scales nationally.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Building relationships with entrepreneurs, business owners, Realtors®, lenders, and escrow officers to create new opportunities for collaboration and growth.",
  },
  {
    icon: Briefcase,
    title: "Business Development",
    description:
      "Helping agents strengthen client relationships, expand their book of business, and grow revenue with a relationship-first approach.",
  },
  {
    icon: Heart,
    title: "People-First Leadership",
    description:
      "A leadership style that blends operational structure with genuine care for people — creating an environment where agents can thrive professionally and personally.",
  },
];

const processSteps = [
  {
    icon: Users,
    title: "Connect",
    description:
      "We start with a conversation about your goals, background, and what you want from a career with The Financial Architects.",
  },
  {
    icon: ClipboardCheck,
    title: "Onboard",
    description:
      "Step-by-step onboarding, licensing support, and access to the training and tools you need to launch with confidence.",
  },
  {
    icon: Target,
    title: "Develop",
    description:
      "Structured mentorship, coaching, and leadership development to help you grow into your full potential.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description:
      "Ongoing accountability and strategy to help you scale your business, deepen client relationships, and step into leadership.",
  },
];

const achievements = [
  "Advanced from Senior Advisor to Director of Agent Development & Operations through demonstrated leadership, performance, and organizational impact",
  "Develops and oversees agent training, onboarding, and mentorship programs designed to increase retention, productivity, and long-term success",
  "Builds strategic relationships with entrepreneurs, business owners, Realtors®, lenders, and escrow officers — creating opportunities for collaboration and business growth",
  "Implements operational systems and processes that streamline onboarding, improve efficiency, and support organizational scalability",
  "Provides ongoing coaching, leadership development, and accountability to help agents increase revenue, strengthen client relationships, and achieve professional growth",
];

const AdvisorKristinRomo = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = generatePersonSchema(
    "Kristin Romo",
    "Director of Agent Development & Operations",
    "Director of Agent Development & Operations at The Financial Architects, leading agent growth, training, and operational excellence across LA, OC, and the Inland Empire.",
    kristinRomoImg,
    `${siteConfig.url}/advisors/kristin-romo`,
    specialties
  );

  return (
    <>
      <SEOHead
        title="Kristin Romo"
        description="Meet Kristin Romo, Director of Agent Development & Operations at The Financial Architects — leading agent training, leadership development, and operational excellence across California."
        keywords="Kristin Romo, agent development, operations, leadership development, agent training, The Financial Architects"
        canonical={`${siteConfig.url}/advisors/kristin-romo`}
      />
      <JsonLd data={[personSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy via-navy/95 to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-accent/20 text-accent hover:bg-accent/30 mb-4">
                Director of Agent Development & Operations
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Kristin Romo
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Leadership Development • Operations • Agent Growth
              </p>
              <p className="text-lg text-accent italic mb-4">
                "Strategic. Relationship-Focused. People-First."
              </p>
              <div className="flex items-center justify-center lg:justify-start text-white/80 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>LA, OC, Inland Empire & California</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white/60 mb-6 text-sm">
                <Award className="h-4 w-4 mr-2" />
                <span>CA License #4334059 • 7+ Years of Experience</span>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Leading agent growth, training, and operational excellence at The Financial Architects — helping advisors build careers, serve clients, and grow into leaders.
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
                  Contact Kristin
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl" />
                <img
                  src={kristinRomoImg}
                  alt="Kristin Romo - Director of Agent Development & Operations"
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
              <Badge variant="outline" className="mb-4">About Kristin</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Developing People. Building Systems. Driving Results.
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Kristin Romo serves as the Director of Agent Development & Operations at The Financial Architects, where she leads initiatives focused on agent growth, operational excellence, and leadership development. Having started her career with the organization as a Senior Advisor, Kristin's progression into leadership reflects her commitment to developing people, improving systems, and driving results.
              </p>
              <p className="mb-6">
                With a background in entrepreneurship, law enforcement, and financial services, she brings a unique combination of discipline, strategic thinking, operational expertise, and relationship-building skills to her role. Her experience spans agent training, business development, operations management, marketing, client relations, and revenue growth strategies.
              </p>
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
                <p className="text-lg italic text-navy font-medium">
                  "Strategic • Relationship-Focused • Growth-Minded • Results-Driven • Operationally Focused • People-First Leader"
                </p>
              </div>
              <p className="mb-6">
                As Director of Agent Development & Operations, Kristin plays a vital role in supporting the growth and success of The Financial Architects' agent force. Through mentorship, innovation, and a passion for growth, she continues to make a meaningful impact on both the agents she serves and the future of The Financial Architects.
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

      {/* Achievements */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Key Achievements</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Leadership in Action
              </h2>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-foreground/90">{achievement}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Areas of Focus</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How Kristin Supports Growth
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Blending operational structure with people-focused leadership to develop high-performing professionals.
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">The Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              From Onboarding to Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clear path designed to help agents grow with confidence at every stage of their career.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
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
            Ready to Connect?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you're an agent looking to grow, a partner exploring collaboration, or a client seeking guidance — Kristin is here to help.
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
              Contact Kristin
            </Button>
          </div>
          <p className="text-white/60 text-sm">
            Licensed in California — CA License #4334059
          </p>
        </div>
      </section>

      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Kristin Romo"
        advisorImage={kristinRomoImg}
        advisorSlug="kristin-romo"
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Kristin Romo"
        advisorImage={kristinRomoImg}
        advisorSlug="kristin-romo"
      />
    </>
  );
};

export default AdvisorKristinRomo;