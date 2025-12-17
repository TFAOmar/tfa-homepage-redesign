import { Shield, Users, Heart, Phone, CheckCircle, Building2, UserCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import tfaLogo from "@/assets/tfa-logo.png";
import awhLogo from "@/assets/partners/american-way-health.png";
import AmericanWayHealthForm from "@/components/health-insurance/AmericanWayHealthForm";

const scrollToForm = () => {
  document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
};

const benefits = [
  {
    icon: UserCheck,
    title: "Individual & Family Plans",
    description: "Comprehensive health coverage tailored to your personal and family needs.",
  },
  {
    icon: Building2,
    title: "Business & Group Health",
    description: "Affordable group plans to protect your employees and attract top talent.",
  },
  {
    icon: Heart,
    title: "Medicare Options",
    description: "Expert guidance on Medicare supplements and Advantage plans.",
  },
  {
    icon: Shield,
    title: "Expert Guidance",
    description: "Licensed specialists help you navigate the complex health insurance landscape.",
  },
];

const services = [
  {
    title: "Individual Health Insurance",
    description: "Plans designed for individuals seeking comprehensive medical coverage.",
  },
  {
    title: "Family Health Plans",
    description: "Protect your entire family with flexible, affordable coverage options.",
  },
  {
    title: "Group/Employer Plans",
    description: "Competitive group health benefits to support your business and employees.",
  },
  {
    title: "Medicare Supplements",
    description: "Fill the gaps in Medicare coverage with supplemental insurance.",
  },
  {
    title: "Short-Term Health",
    description: "Temporary coverage for life transitions, job changes, or waiting periods.",
  },
  {
    title: "Dental & Vision",
    description: "Essential coverage for dental care and vision needs.",
  },
];

const steps = [
  {
    number: "1",
    title: "Submit Your Information",
    description: "Fill out the quick form below with your coverage needs.",
  },
  {
    number: "2",
    title: "Receive Your Quote",
    description: "A licensed specialist will contact you within 24 hours with options.",
  },
  {
    number: "3",
    title: "Get Covered",
    description: "Choose the plan that fits your needs and budget—no pressure.",
  },
];

const AmericanWayHealth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-navy to-primary">
      {/* Co-Branded Header */}
      <header className="py-4 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10 md:h-12" />
            <div className="h-8 w-px bg-white/20" />
            <img src={awhLogo} alt="American Way Health" className="h-10 md:h-12" />
          </div>
          <span className="hidden md:block text-white/60 text-sm">A Trusted Partnership</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Affordable Health Coverage for You, Your Family & Your Business
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Navigating health insurance doesn't have to be complicated. Let our licensed specialists find the right plan for your needs and budget.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full"
          >
            Get Your Free Quote
          </Button>
          <p className="text-white/60 mt-4 text-sm">No obligation. No cost. Just answers.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose American Way Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all"
              >
                <benefit.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Health Insurance Solutions
          </h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            From individual coverage to comprehensive business plans, we have options for every situation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <FileText className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <img src={awhLogo} alt="American Way Health" className="h-16 md:h-20" />
            <span className="text-white/40 text-2xl">+</span>
            <img src={tfaLogo} alt="The Financial Architects" className="h-16 md:h-20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            A Partnership Built on Trust
          </h2>
          <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto">
            American Way Health and The Financial Architects have joined forces to provide comprehensive health insurance solutions. With Anthony Bottley's expertise in health insurance and TFA's commitment to protecting families, you get the best of both worlds.
          </p>
          <p className="text-white/70 max-w-2xl mx-auto">
            "Health Insurance the American Way" — focused on finding you the coverage you need at a price you can afford.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="quote-form" className="py-16 px-6 bg-gradient-to-b from-navy to-primary">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Request Your Free Quote
          </h2>
          <p className="text-white/70 text-center mb-8">
            Fill out the form below and a licensed health insurance specialist will contact you within 24 hours.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <AmericanWayHealthForm />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find the Right Coverage?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Don't wait until you need it. Get covered today with a plan that fits your life.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full"
          >
            Get Your Free Quote Now
          </Button>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
            <Phone className="w-4 h-4" />
            <span>Questions? Email us at info@awhealthllc.com</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={awhLogo} alt="American Way Health" className="h-8" />
              <span className="text-white/40">×</span>
              <img src={tfaLogo} alt="The Financial Architects" className="h-8" />
            </div>
            <p className="text-white/50 text-sm text-center md:text-right">
              © {new Date().getFullYear()} American Way Health & The Financial Architects. All rights reserved.
            </p>
          </div>
          <p className="text-white/40 text-xs text-center mt-4">
            Health insurance products are offered through licensed agents. Coverage and availability may vary by state.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AmericanWayHealth;
