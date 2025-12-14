import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calculator, Shield, TrendingDown, Receipt, Landmark, FileText, ChevronRight } from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TaxPlanning = () => {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <a href="tel:8883505396" className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">(888) 350-5396</span>
              </a>
              <Button onClick={scrollToForm} className="btn-primary-cta">
                Save on Taxes
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-navy via-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,181,72,0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Tax Planning Strategies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Keep More of What You Earn—
              <br />
              <span className="text-accent">Legally and Strategically</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Proactive tax planning strategies that minimize your tax burden today 
              and throughout retirement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="btn-primary-cta px-8 py-6 text-lg">
                Get Your Tax Strategy
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$50K+</div>
              <p className="text-muted-foreground text-sm">potential tax savings over retirement</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">37%</div>
              <p className="text-muted-foreground text-sm">top federal tax bracket</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">3.8%</div>
              <p className="text-muted-foreground text-sm">NIIT surcharge to avoid</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">IRMAA</div>
              <p className="text-muted-foreground text-sm">Medicare surcharge planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tax Planning Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Why Tax Planning Matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              It's not what you earn—it's what you keep. Strategic tax planning can 
              save you tens of thousands over your lifetime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <TrendingDown className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Reduce Tax Liability</h3>
              <p className="text-muted-foreground">
                Implement strategies that legally minimize your tax burden now and 
                in the future.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Avoid Tax Surprises</h3>
              <p className="text-muted-foreground">
                Proactive planning prevents unexpected tax bills and helps you 
                plan for major life changes.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Calculator className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Maximize Savings</h3>
              <p className="text-muted-foreground">
                Every dollar saved in taxes is a dollar that can grow for your 
                retirement and legacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Our Tax Planning Strategies
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tax optimization for every stage of life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Receipt className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Roth Conversions</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Strategically convert traditional IRA funds to Roth for tax-free 
                growth and distributions in retirement.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Landmark className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Tax-Loss Harvesting</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Offset gains with strategic losses to reduce your annual tax 
                liability without disrupting your investment strategy.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">IRMAA Planning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Manage income to avoid Medicare premium surcharges that can add 
                thousands to your annual healthcare costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Strategies Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Key Strategies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Tax-Smart Strategies We Implement
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Multiple approaches to minimize taxes across your entire financial picture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Asset Location</h3>
              <p className="text-muted-foreground text-sm">
                Place investments in the right accounts for maximum tax efficiency.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Bracket Management</h3>
              <p className="text-muted-foreground text-sm">
                Time income and deductions to stay in lower tax brackets.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Charitable Giving</h3>
              <p className="text-muted-foreground text-sm">
                Maximize deductions while supporting causes you care about.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">RMD Strategies</h3>
              <p className="text-muted-foreground text-sm">
                Plan required distributions to minimize tax impact in retirement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Creating your tax-efficient plan is straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Tax Analysis</h3>
              <p className="text-muted-foreground">
                We review your current tax situation, income sources, and future projections.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Strategy Design</h3>
              <p className="text-muted-foreground">
                We identify opportunities and create a multi-year tax optimization plan.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Implementation</h3>
              <p className="text-muted-foreground">
                We execute strategies and coordinate with your CPA for seamless integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Should I do a Roth conversion?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Roth conversions can be beneficial, especially in years with lower income 
                  or before RMDs begin. We analyze your specific situation to determine 
                  if and when conversions make sense, including the impact on current 
                  taxes, Medicare premiums, and long-term growth.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Do you replace my CPA?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, we complement your CPA. We focus on proactive tax planning and 
                  strategy, while your CPA handles tax preparation and filing. We 
                  coordinate closely with your CPA to ensure all strategies are 
                  properly implemented.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What is IRMAA and how does it affect me?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge added 
                  to Medicare premiums for higher-income beneficiaries. It's based on 
                  income from two years prior. Strategic planning can help you avoid 
                  or minimize these surcharges.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How much can I save with tax planning?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Savings vary based on your situation, but clients often save $5,000-$50,000+ 
                  over their retirement. Even modest savings compound significantly over 
                  time. We'll show you projected savings during your consultation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="consultation-form" className="py-20 md:py-32 bg-gradient-to-b from-navy to-primary scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Get Your Free Tax Analysis
              </h2>
              <p className="text-white/80 text-lg">
                Discover opportunities to reduce your tax burden legally and strategically.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <ServiceConsultationForm
                serviceType="tax-planning"
                serviceName="Tax Planning"
                ctaText="Get My Tax Analysis"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-2">Have questions? Call us directly:</p>
          <a href="tel:8883505396" className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors">
            (888) 350-5396
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} The Financial Architects. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TaxPlanning;
