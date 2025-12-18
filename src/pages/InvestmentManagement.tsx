import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, TrendingUp, Shield, Target, PieChart, BarChart3, LineChart, ChevronRight } from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const investmentFaqs = [
  { question: "How often will my portfolio be rebalanced?", answer: "We typically rebalance quarterly or when asset allocations drift significantly from targets. This disciplined approach ensures your portfolio stays aligned with your risk tolerance without excessive trading." },
  { question: "What are your management fees?", answer: "Our fees are competitive and transparent. We'll provide a complete fee schedule during your consultation. We believe in aligning our interests with yours through reasonable, value-based pricing." },
  { question: "How do you determine my risk tolerance?", answer: "We use a combination of questionnaires, discussions about your financial situation, and scenario analysis to understand both your ability and willingness to take risk. Your portfolio is then designed to match your unique risk profile." },
  { question: "Can I access my money when I need it?", answer: "Yes, your investments remain liquid. While we recommend a long-term approach, you can access your funds when needed. We'll help you structure your portfolio to balance growth with liquidity needs." },
];

const InvestmentManagement = () => {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Investment Management"
        description="Professional investment management with goal-based strategies, risk management, and tax-efficient portfolios. Grow your wealth with confidence."
        canonical={`${siteConfig.url}/services/investment-management`}
        keywords="investment management, portfolio management, financial advisor, wealth management, investment strategy"
      />
      <JsonLd data={[
        generateWebPageSchema("Investment Management", "Professional investment management designed to help you reach your financial goals while managing risk appropriately.", `${siteConfig.url}/services/investment-management`),
        generateServiceSchema("Investment Management", "Professional investment management with goal-based strategies, risk management, and tax-efficient portfolios to grow your wealth.", `${siteConfig.url}/services/investment-management`),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: "Investment Management", url: `${siteConfig.url}/services/investment-management` }
        ]),
        generateFAQSchema(investmentFaqs)
      ]} />
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
                Get Started
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
              Investment Management
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Grow Your Wealth with
              <br />
              <span className="text-accent">Confidence and Clarity</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional investment management designed to help you reach your financial 
              goals while managing risk appropriately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="btn-primary-cta px-8 py-6 text-lg">
                Start Investing Smarter
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
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">7.5%</div>
              <p className="text-muted-foreground text-sm">historical stock market return</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">72%</div>
              <p className="text-muted-foreground text-sm">of investors underperform</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">10x</div>
              <p className="text-muted-foreground text-sm">power of compounding over 30yrs</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1%</div>
              <p className="text-muted-foreground text-sm">fee difference = $100K+ impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Investment Management Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Why Professional Investment Management?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Successful investing isn't about picking hot stocks—it's about having a 
              disciplined strategy aligned with your goals and risk tolerance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Goal-Based Investing</h3>
              <p className="text-muted-foreground">
                Your investments are aligned with your specific goals—retirement, education, 
                legacy—not generic benchmarks.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Risk Management</h3>
              <p className="text-muted-foreground">
                We help you take appropriate risk—enough to grow your wealth, but not 
                so much that you lose sleep at night.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Tax Efficiency</h3>
              <p className="text-muted-foreground">
                Strategic asset location and tax-loss harvesting can add significant 
                after-tax returns over time.
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
              Our Investment Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive investment solutions tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <PieChart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Portfolio Construction</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Build a diversified portfolio across asset classes designed to 
                maximize returns for your risk level.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Rebalancing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Regular portfolio rebalancing to maintain your target allocation 
                and manage risk as markets change.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <LineChart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Performance Monitoring</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ongoing monitoring and reporting so you always know how your 
                investments are performing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Investment Philosophy
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in evidence-based investing focused on long-term wealth building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Diversification</h3>
              <p className="text-muted-foreground text-sm">
                Spread risk across asset classes, sectors, and geographies.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Low Costs</h3>
              <p className="text-muted-foreground text-sm">
                Minimize fees and expenses that erode returns over time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Tax Efficiency</h3>
              <p className="text-muted-foreground text-sm">
                Strategic placement of assets to minimize tax drag.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Discipline</h3>
              <p className="text-muted-foreground text-sm">
                Stay the course through market volatility with a proven process.
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
              Getting started with professional investment management is easy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Risk Assessment</h3>
              <p className="text-muted-foreground">
                We assess your risk tolerance, time horizon, and financial goals.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Portfolio Design</h3>
              <p className="text-muted-foreground">
                We build a customized portfolio tailored to your specific situation.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Ongoing Management</h3>
              <p className="text-muted-foreground">
                Continuous monitoring, rebalancing, and adjustments as needed.
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
                  How often will my portfolio be rebalanced?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We typically rebalance quarterly or when asset allocations drift 
                  significantly from targets. This disciplined approach ensures your 
                  portfolio stays aligned with your risk tolerance without excessive trading.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What are your management fees?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our fees are competitive and transparent. We'll provide a complete 
                  fee schedule during your consultation. We believe in aligning our 
                  interests with yours through reasonable, value-based pricing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How do you determine my risk tolerance?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We use a combination of questionnaires, discussions about your 
                  financial situation, and scenario analysis to understand both your 
                  ability and willingness to take risk. Your portfolio is then designed 
                  to match your unique risk profile.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Can I access my money when I need it?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, your investments remain liquid. While we recommend a long-term 
                  approach, you can access your funds when needed. We'll help you 
                  structure your portfolio to balance growth with liquidity needs.
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
                Get Your Free Portfolio Review
              </h2>
              <p className="text-white/80 text-lg">
                Discover how to optimize your investments for growth and tax efficiency.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <ServiceConsultationForm
                serviceType="investment-management"
                serviceName="Investment Management"
                ctaText="Get My Portfolio Review"
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
    </>
  );
};

export default InvestmentManagement;
