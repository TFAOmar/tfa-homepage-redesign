import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Shield, Target, Users, Award, ChevronRight, Building2, Heart, Briefcase } from "lucide-react";
import vanessaSanchezImg from "@/assets/advisors/vanessa-sanchez.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";

const AdvisorVanessaSanchez = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specialties = ["Retirement Planning", "Estate Planning", "Tax Strategies", "Business Planning", "Life Insurance"];
  const services = [{
    icon: Target,
    title: "Retirement Planning",
    description: "Strategic planning to ensure a comfortable and secure retirement tailored to your goals."
  }, {
    icon: Shield,
    title: "Estate Planning",
    description: "Comprehensive estate strategies including living trusts to protect and transfer your wealth."
  }, {
    icon: Building2,
    title: "Tax Strategies",
    description: "Tax-efficient solutions to maximize your wealth and minimize your tax burden."
  }, {
    icon: Briefcase,
    title: "Business Planning",
    description: "Tailored strategies for business owners to protect and grow their enterprises."
  }, {
    icon: Heart,
    title: "Life Insurance",
    description: "Tax-efficient life insurance solutions to protect your family's financial future."
  }, {
    icon: Users,
    title: "Family Financial Planning",
    description: "Holistic planning for families to build generational wealth and security."
  }];
  const processSteps = [{
    step: "01",
    title: "Discovery Call",
    description: "A complimentary conversation to understand your financial goals, concerns, and current situation."
  }, {
    step: "02",
    title: "Personalized Analysis",
    description: "Comprehensive review of your finances to identify opportunities and create a tailored strategy."
  }, {
    step: "03",
    title: "Strategy Presentation",
    description: "Clear presentation of your customized plan with actionable steps and recommendations."
  }, {
    step: "04",
    title: "Implementation",
    description: "Guided execution of your plan with ongoing support and adjustments as your life evolves."
  }];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-6">
                Financial Strategist
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Vanessa Crystal Sanchez
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-4">
                Guiding Families Toward Financial Clarity
              </p>
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                Helping individuals, families, and business owners build wealth, protect their assets, and plan for lasting legacies with clarity and compassion.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8 py-6 w-full sm:w-auto"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 hover:bg-white/10 text-lg px-8 py-6 w-full sm:w-auto text-white"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
                <Link to="/advisors/vanessa-sanchez/living-trust">
                  <Button size="lg" variant="outline" className="border-accent/50 hover:bg-accent/20 text-lg px-8 py-6 w-full sm:w-auto text-accent">
                    <Shield className="mr-2 h-5 w-5" />
                    Living Trust Planning
                  </Button>
                </Link>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Chino Hills, California</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>Life & Health Licensed</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                <img src={vanessaSanchezImg} alt="Vanessa Crystal Sanchez - Financial Strategist" className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20" />
                <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span>TFA Advisor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Vanessa
              </h2>
              <div className="h-1 w-20 bg-accent mx-auto" />
            </div>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/15 p-8 md:p-12 rounded-2xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                Vanessa guides individuals, families, and business owners through wealth building, protection, and long-term planning. Her holistic approach ensures every plan is intentional, strategic, and aligned with long-term goals—from retirement planning and tax-efficient life insurance to estate planning with living trusts.
              </p>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Known for her clarity and compassion, she turns overwhelming financial decisions into simple, actionable steps. Whether you're planning for retirement, protecting your family, or building a business legacy, Vanessa is committed to helping you achieve financial confidence.
              </p>
            </Card>

            {/* Specialties */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-6">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {specialties.map(specialty => (
                  <Badge key={specialty} className="bg-accent/10 text-accent border-accent/30 px-4 py-2 text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How I Can Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial strategies tailored to your unique goals and circumstances.
            </p>
            <div className="h-1 w-20 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <service.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                {service.title === "Estate Planning" && (
                  <Link 
                    to="/advisors/vanessa-sanchez/living-trust" 
                    className="inline-flex items-center text-accent hover:text-accent/80 mt-4 font-medium transition-colors"
                  >
                    Learn about Living Trusts
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Working Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, clear process to help you achieve your financial goals.
            </p>
            <div className="h-1 w-20 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 rounded-2xl h-full">
                  <div className="text-5xl font-bold text-accent/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
                {index < processSteps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent/40 h-8 w-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Schedule a complimentary consultation and let's create a plan tailored to your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8 py-6 w-full sm:w-auto"
                onClick={() => setScheduleModalOpen(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Free Consultation
              </Button>
            </div>

            <p className="text-white/60 mt-6 text-sm">
              No obligation. Just a conversation about your future.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Vanessa Sanchez"
        advisorEmail="vsanchez@tfainsuranceadvisors.com"
        advisorImage={vanessaSanchezImg}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Vanessa Sanchez"
        advisorEmail="vsanchez@tfainsuranceadvisors.com"
        advisorImage={vanessaSanchezImg}
      />
    </div>
  );
};

export default AdvisorVanessaSanchez;