import { Phone, ArrowRight, Shield, Heart, Users, CheckCircle, DollarSign, Umbrella, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import tfaLogo from "@/assets/tfa-logo.png";

const InsuranceServices = () => {
  const scrollToForm = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10" />
          </a>
          <div className="flex items-center gap-4">
            <a href="tel:8883505396" className="hidden md:flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Phone className="h-4 w-4" />
              <span>(888) 350-5396</span>
            </a>
            <Button onClick={scrollToForm} className="bg-accent hover:bg-accent/90 text-primary font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary via-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Life, Disability & Long-Term Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Protect Your Family's Financial Future
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Life happens. Make sure your family is protected no matter what comes next. 
              We'll help you find the right coverage at the right price.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8">
                Get a Coverage Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                (888) 350-5396
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "41%", label: "Of Americans are underinsured" },
              { value: "$500K", label: "Average coverage gap" },
              { value: "1 in 4", label: "Workers disabled before 67" },
              { value: "$108K", label: "Average nursing home cost/year" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Insurance Matters */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Insurance Protection Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insurance isn't about you—it's about the people who depend on you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: DollarSign,
                title: "Income Replacement",
                description: "If something happens to you, your family still needs income. Life and disability insurance replace your paycheck so bills get paid."
              },
              {
                icon: Umbrella,
                title: "Debt Protection",
                description: "Don't leave your family with your mortgage, car loans, or credit card debt. Insurance pays off what you owe."
              },
              {
                icon: Heart,
                title: "Legacy Building",
                description: "Leave something behind for your children, grandchildren, or causes you care about—tax-free and guaranteed."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-8 text-center hover:border-accent/50 transition-colors">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Insurance Solutions We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive protection for every stage of life
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Life Insurance",
                description: "Term and permanent options to protect your family's financial security.",
                features: ["Income replacement", "Debt payoff", "Legacy planning"]
              },
              {
                icon: Activity,
                title: "Disability Insurance",
                description: "Protect your most valuable asset—your ability to earn income.",
                features: ["Short-term coverage", "Long-term coverage", "Own-occupation policies"]
              },
              {
                icon: Clock,
                title: "Long-Term Care",
                description: "Coverage for nursing homes, assisted living, and home health care.",
                features: ["Facility coverage", "Home care coverage", "Hybrid policies"]
              },
              {
                icon: Users,
                title: "Needs Analysis",
                description: "We calculate exactly how much coverage you need—no more, no less.",
                features: ["Coverage calculation", "Gap analysis", "Budget optimization"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Understanding Your Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Different types of insurance serve different purposes in your financial plan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Term Life",
                description: "Affordable coverage for a specific period (10, 20, 30 years). Ideal for temporary needs like mortgages or raising children.",
                icon: Shield
              },
              {
                title: "Whole Life",
                description: "Permanent protection with cash value growth. Premiums never increase and coverage lasts your entire life.",
                icon: Heart
              },
              {
                title: "Disability Income",
                description: "Replaces a portion of your income if you can't work due to illness or injury. Protects your lifestyle.",
                icon: Activity
              },
              {
                title: "Long-Term Care",
                description: "Covers care costs that health insurance and Medicare don't—nursing homes, assisted living, home care.",
                icon: Clock
              }
            ].map((type, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <type.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Help You Get Protected
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simple process ensures you get the right coverage for your unique situation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Needs Analysis",
                description: "We calculate exactly how much coverage you need based on income, debts, goals, and family situation."
              },
              {
                step: "2",
                title: "Compare Options",
                description: "We shop multiple carriers to find the best coverage at the best price for your health and budget."
              },
              {
                step: "3",
                title: "Get Protected",
                description: "We guide you through the application process and ensure your policy is set up correctly."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Common Questions About Insurance
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How much life insurance do I need?",
                  answer: "A common rule of thumb is 10-12x your annual income, but the real answer depends on your specific situation—debts, number of dependents, spouse's income, future expenses like college. We'll calculate your exact needs based on your unique circumstances."
                },
                {
                  question: "Term vs. permanent—which is right for me?",
                  answer: "Term is more affordable and works well for temporary needs (like covering a mortgage or raising kids). Permanent insurance costs more but lasts forever and builds cash value. Many people use a combination of both. We'll help you determine the right mix."
                },
                {
                  question: "What if I've been denied coverage before?",
                  answer: "Don't give up. Different carriers have different underwriting criteria. We work with many carriers and specialize in finding coverage for people who've been declined elsewhere. Health conditions that were once uninsurable often have options today."
                },
                {
                  question: "When should I consider long-term care insurance?",
                  answer: "The ideal time is in your 50s or early 60s—when you're healthy enough to qualify and premiums are still reasonable. Waiting too long can mean higher costs or being uninsurable. We'll help you explore options including hybrid policies that combine life insurance with LTC benefits."
                },
                {
                  question: "Is disability insurance really necessary?",
                  answer: "Your ability to earn income is your most valuable asset. You're more likely to become disabled than die during your working years. Without disability insurance, an illness or injury could devastate your finances. Most people are dramatically underinsured—employer coverage often isn't enough."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="consultation-form" className="py-20 bg-gradient-to-b from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Out If You're Properly Protected
              </h2>
              <p className="text-lg text-white/80">
                Get a free coverage analysis to identify gaps and find the right protection for your family.
              </p>
            </div>
            <ServiceConsultationForm 
              serviceType="insurance"
              serviceName="Insurance"
              ctaText="Get My Coverage Analysis"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions? Call us directly at{" "}
            <a href="tel:8883505396" className="text-accent hover:underline font-semibold">
              (888) 350-5396
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            The Financial Architects • 13890 Peyton Dr, Chino Hills, CA 91709
          </p>
        </div>
      </section>
    </div>
  );
};

export default InsuranceServices;
