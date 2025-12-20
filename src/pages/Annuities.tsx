import { Phone, ArrowRight, Shield, TrendingUp, Heart, CheckCircle, DollarSign, Lock, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const annuityFaqs = [
  { question: "What exactly is an annuity?", answer: "An annuity is a contract with an insurance company that provides guaranteed income payments—either immediately or at a future date. You can fund it with a lump sum or over time. It's essentially a way to create your own personal pension that can last for your entire lifetime." },
  { question: "Who should consider an annuity?", answer: "Annuities are ideal for people who want guaranteed income in retirement, protection from market volatility, and peace of mind knowing they can't outlive their money. They're particularly valuable for those without pensions or who want to supplement Social Security with reliable income." },
  { question: "What are surrender charges?", answer: "Surrender charges are fees you may pay if you withdraw more than allowed during the early years of your contract (typically 5-10 years). Most annuities allow 10% penalty-free withdrawals annually. After the surrender period ends, you have full access to your money without penalties." },
  { question: "How are annuities different from other investments?", answer: "Unlike stocks or mutual funds, annuities can guarantee your principal and provide guaranteed lifetime income. They're insurance products, not investments, which means they offer protections other investment vehicles can't—like a guarantee you'll never run out of money." },
  { question: "Are annuities safe?", answer: "Annuities are backed by the claims-paying ability of the issuing insurance company. We only work with highly-rated carriers with strong financial foundations. Additionally, most states have guaranty associations that provide another layer of protection." },
];

const Annuities = () => {
  const scrollToForm = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="Annuities - Guaranteed Lifetime Income"
        description="Discover annuities for guaranteed lifetime income, principal protection, and peace of mind in retirement. Fixed, indexed, and income annuities available."
        canonical={`${siteConfig.url}/services/annuities`}
        keywords="annuities, guaranteed income, fixed annuity, indexed annuity, retirement income, lifetime income"
      />
      <JsonLd data={[
        generateWebPageSchema("Annuities - Guaranteed Lifetime Income", "Annuity solutions providing guaranteed income you can never outlive with principal protection.", `${siteConfig.url}/services/annuities`),
        generateServiceSchema("Annuities", "Guaranteed income annuities that provide lifetime income, principal protection, and peace of mind for retirement.", `${siteConfig.url}/services/annuities`),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: "Annuities", url: `${siteConfig.url}/services/annuities` }
        ]),
        generateFAQSchema(annuityFaqs)
      ]} />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 bg-gradient-to-b from-primary via-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Guaranteed Lifetime Income</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Guaranteed Income You Can Never Outlive
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover how annuities can provide you with guaranteed income for life, 
              protect your principal from market losses, and help you retire with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8">
                Request a Consultation
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
              { value: "65%", label: "Of retirees worry about outliving savings" },
              { value: "20+", label: "Years average retirement length" },
              { value: "$0", label: "Lost to market downturns with fixed annuities" },
              { value: "100%", label: "Income guaranteed for life" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Annuities Matter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Annuities Matter for Your Retirement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In an uncertain world, annuities provide the certainty you need to enjoy retirement
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: DollarSign,
                title: "Guaranteed Income",
                description: "Create a personal pension with income payments that last as long as you live—no matter how long that is."
              },
              {
                icon: Lock,
                title: "Principal Protection",
                description: "Shield your retirement savings from market volatility. With fixed annuities, you'll never lose principal to downturns."
              },
              {
                icon: Heart,
                title: "Peace of Mind",
                description: "Sleep soundly knowing your income is guaranteed. No more worrying about market crashes or running out of money."
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
              Annuity Solutions We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We'll help you find the right annuity type based on your goals, timeline, and risk tolerance
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Fixed Annuities",
                description: "Guaranteed interest rates with complete principal protection. Ideal for conservative investors seeking predictable growth.",
                features: ["Guaranteed interest rate", "No market risk", "Tax-deferred growth"]
              },
              {
                icon: TrendingUp,
                title: "Fixed Indexed Annuities",
                description: "Earn returns linked to market indexes while protecting your principal from losses. The best of both worlds.",
                features: ["Market-linked growth potential", "Principal protection", "Annual lock-in of gains"]
              },
              {
                icon: Sparkles,
                title: "Income Riders",
                description: "Add guaranteed lifetime income benefits to your annuity. Start income now or let it grow for a larger future payout.",
                features: ["Lifetime income guarantee", "Flexible start date", "Spousal continuation"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-colors">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annuity Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Understanding Annuity Types
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Different annuities serve different purposes. Here's how to think about your options.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Immediate Annuities",
                description: "Convert a lump sum into income payments that start right away—ideal for those entering retirement.",
                icon: Clock
              },
              {
                title: "Deferred Annuities",
                description: "Grow your money tax-deferred now and convert to income later when you're ready to retire.",
                icon: TrendingUp
              },
              {
                title: "Fixed Indexed",
                description: "Participate in market gains with a floor protecting you from losses. Your principal is always safe.",
                icon: Shield
              },
              {
                title: "Variable Annuities",
                description: "Invest in sub-accounts similar to mutual funds. Higher growth potential with higher risk.",
                icon: Sparkles
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
              How We Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simple process ensures you get the right annuity for your specific needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Discovery Call",
                description: "We learn about your retirement goals, income needs, risk tolerance, and timeline."
              },
              {
                step: "2",
                title: "Personalized Analysis",
                description: "We compare options from top carriers and show you exactly how each would work for your situation."
              },
              {
                step: "3",
                title: "Implementation",
                description: "We handle all paperwork and guide you through the process. You enjoy guaranteed income."
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
                Common Questions About Annuities
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What exactly is an annuity?",
                  answer: "An annuity is a contract with an insurance company that provides guaranteed income payments—either immediately or at a future date. You can fund it with a lump sum or over time. It's essentially a way to create your own personal pension that can last for your entire lifetime."
                },
                {
                  question: "Who should consider an annuity?",
                  answer: "Annuities are ideal for people who want guaranteed income in retirement, protection from market volatility, and peace of mind knowing they can't outlive their money. They're particularly valuable for those without pensions or who want to supplement Social Security with reliable income."
                },
                {
                  question: "What are surrender charges?",
                  answer: "Surrender charges are fees you may pay if you withdraw more than allowed during the early years of your contract (typically 5-10 years). Most annuities allow 10% penalty-free withdrawals annually. After the surrender period ends, you have full access to your money without penalties."
                },
                {
                  question: "How are annuities different from other investments?",
                  answer: "Unlike stocks or mutual funds, annuities can guarantee your principal and provide guaranteed lifetime income. They're insurance products, not investments, which means they offer protections other investment vehicles can't—like a guarantee you'll never run out of money."
                },
                {
                  question: "Are annuities safe?",
                  answer: "Annuities are backed by the claims-paying ability of the issuing insurance company. We only work with highly-rated carriers with strong financial foundations. Additionally, most states have guaranty associations that provide another layer of protection."
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
                Explore Annuity Options for Your Retirement
              </h2>
              <p className="text-lg text-white/80">
                Schedule a no-obligation consultation to see how annuities can provide you with guaranteed lifetime income.
              </p>
            </div>
            <ServiceConsultationForm 
              serviceType="annuities"
              serviceName="Annuities"
              ctaText="Request Annuity Consultation"
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
    </>
  );
};

export default Annuities;
