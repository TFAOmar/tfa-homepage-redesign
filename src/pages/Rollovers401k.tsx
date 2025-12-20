import { Phone, ArrowRight, RefreshCw, Shield, TrendingUp, CheckCircle, DollarSign, FileText, Zap, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const rolloverFaqs = [
  { question: "What's the difference between a direct and indirect rollover?", answer: "A direct rollover transfers funds straight from your old 401(k) to your new IRA—no taxes withheld, no penalties. An indirect rollover gives you the check, which means 20% is withheld for taxes and you have 60 days to deposit it or face penalties. We always recommend direct rollovers." },
  { question: "Will I owe taxes on my rollover?", answer: "Not if you do a direct rollover from a traditional 401(k) to a traditional IRA. The money stays tax-deferred. If you roll to a Roth IRA, you'll owe taxes on the converted amount that year—but future growth and withdrawals are tax-free." },
  { question: "Can I roll over while still employed?", answer: "It depends on your plan. Many plans allow 'in-service' rollovers once you reach a certain age (often 59½). Some plans don't allow any rollovers until you leave. We can help you check your specific plan rules." },
  { question: "How long does a rollover take?", answer: "Most direct rollovers complete within 1-2 weeks. The timeline depends on your old plan's processing speed. We'll track the transfer and keep you informed throughout the process." },
  { question: "What happens to my 401(k) loans?", answer: "Outstanding 401(k) loans must typically be repaid before or shortly after you leave your employer, or they may be treated as a taxable distribution. We'll help you understand your options and plan accordingly." },
];

const Rollovers401k = () => {
  const scrollToForm = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="401(k) & IRA Rollovers"
        description="Consolidate retirement accounts with tax-free 401(k) and IRA rollovers. More investment options, lower fees, and simplified management."
        canonical={`${siteConfig.url}/services/401k-rollover`}
        keywords="401k rollover, IRA rollover, retirement account consolidation, direct rollover, Roth conversion"
      />
      <JsonLd data={[
        generateWebPageSchema("401(k) & IRA Rollovers", "Consolidate your retirement savings with tax-free rollovers. Take control with more investment options and simplified management.", `${siteConfig.url}/services/401k-rollover`),
        generateServiceSchema("401(k) & IRA Rollovers", "Tax-free 401(k) and IRA rollover services to consolidate your retirement accounts, expand investment options, and simplify management.", `${siteConfig.url}/services/401k-rollover`),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: "401(k) Rollovers", url: `${siteConfig.url}/services/401k-rollover` }
        ]),
        generateFAQSchema(rolloverFaqs)
      ]} />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 bg-gradient-to-b from-primary via-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm font-medium">401(k) & IRA Rollovers</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Consolidate Your Retirement Savings—Take Control
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Left old 401(k)s behind at previous jobs? We'll help you consolidate your accounts, 
              expand your investment options, and simplify your retirement planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8">
                Start Your Rollover
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
              { value: "$5T+", label: "Orphaned in old 401(k) accounts" },
              { value: "67%", label: "Of workers forget about old plans" },
              { value: "10%", label: "Penalty for withdrawal mistakes" },
              { value: "1000+", label: "More investment options with IRA" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rollovers Matter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Roll Over Your 401(k)?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take control of your retirement savings and unlock better options for your future
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "More Investment Options",
                description: "Break free from your old employer's limited menu. An IRA gives you access to thousands of investment options across all asset classes."
              },
              {
                icon: FileText,
                title: "Easier Management",
                description: "One account, one statement, one login. Consolidating makes it easier to track your progress and manage your retirement strategy."
              },
              {
                icon: Shield,
                title: "Better Control",
                description: "Your money, your decisions. No more being subject to plan changes, limited options, or high fees chosen by your former employer."
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
              Rollover Services We Provide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We handle the heavy lifting so your rollover goes smoothly and tax-free
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: RefreshCw,
                title: "Direct Rollovers",
                description: "The cleanest way to move your money. Funds transfer directly from your old 401(k) to your new IRA—no taxes, no penalties.",
                features: ["Tax-free transfer", "No withholding", "We handle paperwork"]
              },
              {
                icon: Zap,
                title: "401(k) to Roth Conversions",
                description: "Strategic Roth conversions can provide tax-free income in retirement. We'll analyze if this makes sense for your situation.",
                features: ["Tax planning analysis", "Staged conversion options", "Long-term tax savings"]
              },
              {
                icon: PiggyBank,
                title: "Consolidation Services",
                description: "Multiple old 401(k)s and IRAs scattered around? We'll help you consolidate everything into one organized account.",
                features: ["Track down old accounts", "Combine all accounts", "Simplified management"]
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

      {/* Benefits Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Benefits of Rolling Over
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why thousands of people roll over their old 401(k)s every year
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Tax-Free Transfer",
                description: "Direct rollovers incur no taxes or penalties. Your full balance moves to your new account.",
                icon: DollarSign
              },
              {
                title: "Investment Freedom",
                description: "Choose from stocks, bonds, ETFs, mutual funds, annuities—not just what your old plan offered.",
                icon: TrendingUp
              },
              {
                title: "Lower Fees",
                description: "Many 401(k) plans have high fees. An IRA often provides lower-cost investment options.",
                icon: PiggyBank
              },
              {
                title: "Simplified Management",
                description: "One account makes retirement planning clearer and helps you stay on track.",
                icon: FileText
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
              How the Rollover Process Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make rolling over your 401(k) simple and stress-free
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Gather Information",
                description: "We help you locate your old accounts and gather the necessary information to initiate the transfer."
              },
              {
                step: "2",
                title: "Open Your IRA",
                description: "We set up your new IRA and help you choose investments aligned with your retirement goals."
              },
              {
                step: "3",
                title: "Transfer Funds",
                description: "We initiate the direct rollover. Your funds transfer tax-free, typically within 1-2 weeks."
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
                Common Questions About 401(k) Rollovers
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What's the difference between a direct and indirect rollover?",
                  answer: "A direct rollover transfers funds straight from your old 401(k) to your new IRA—no taxes withheld, no penalties. An indirect rollover gives you the check, which means 20% is withheld for taxes and you have 60 days to deposit it or face penalties. We always recommend direct rollovers."
                },
                {
                  question: "Will I owe taxes on my rollover?",
                  answer: "Not if you do a direct rollover from a traditional 401(k) to a traditional IRA. The money stays tax-deferred. If you roll to a Roth IRA, you'll owe taxes on the converted amount that year—but future growth and withdrawals are tax-free."
                },
                {
                  question: "Can I roll over while still employed?",
                  answer: "It depends on your plan. Many plans allow 'in-service' rollovers once you reach a certain age (often 59½). Some plans don't allow any rollovers until you leave. We can help you check your specific plan rules."
                },
                {
                  question: "How long does a rollover take?",
                  answer: "Most direct rollovers complete within 1-2 weeks. The timeline depends on your old plan's processing speed. We'll track the transfer and keep you informed throughout the process."
                },
                {
                  question: "What happens to my 401(k) loans?",
                  answer: "Outstanding 401(k) loans must typically be repaid before or shortly after you leave your employer, or they may be treated as a taxable distribution. We'll help you understand your options and plan accordingly."
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
                Ready to Consolidate Your Retirement Accounts?
              </h2>
              <p className="text-lg text-white/80">
                Let us help you take control of your retirement savings with a tax-free rollover.
              </p>
            </div>
            <ServiceConsultationForm 
              serviceType="401k-rollover"
              serviceName="401(k) Rollover"
              ctaText="Start My Rollover"
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

export default Rollovers401k;
