import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, TrendingUp, Shield, Calendar, PiggyBank, BarChart3, CheckCircle, ChevronRight } from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IncomePlanning = () => {
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
                Plan Your Income
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
              Retirement Income Planning
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Never Worry About Running
              <br />
              <span className="text-accent">Out of Money in Retirement</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create a sustainable income stream that lasts your entire retirement—no matter 
              how long you live or what the market does.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="btn-primary-cta px-8 py-6 text-lg">
                Get Your Income Plan
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
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">30 yrs</div>
              <p className="text-muted-foreground text-sm">average retirement length</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$1.2M</div>
              <p className="text-muted-foreground text-sm">average needed savings</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">40%</div>
              <p className="text-muted-foreground text-sm">retirees rely on Social Security</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">70%</div>
              <p className="text-muted-foreground text-sm">worry about outliving savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Income Planning Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Why Income Planning Matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Saving for retirement is only half the battle. The real challenge is turning 
              your savings into a reliable income stream that lasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Sustainable Withdrawals</h3>
              <p className="text-muted-foreground">
                Know exactly how much you can safely withdraw each year without depleting 
                your portfolio too quickly.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Market Protection</h3>
              <p className="text-muted-foreground">
                Shield your income from market volatility so you can sleep soundly 
                regardless of what the stock market does.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Longevity Planning</h3>
              <p className="text-muted-foreground">
                Plan for a retirement that could last 30+ years, ensuring your money 
                lasts as long as you do.
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
              Our Income Planning Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive strategies to maximize your retirement income.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <PiggyBank className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Social Security Optimization</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Maximize your benefits by timing your Social Security claim strategically—
                potentially adding tens of thousands to lifetime benefits.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Withdrawal Strategies</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Determine the optimal order and timing for withdrawing from different 
                accounts to minimize taxes and maximize longevity.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Guaranteed Income</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Explore annuity options that provide lifetime income guarantees, 
                creating a personal pension for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Income Sources Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Multiple Income Streams
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Building Your Retirement Paycheck
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We help you coordinate multiple income sources to create a reliable, 
              tax-efficient retirement paycheck.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Social Security</h3>
              <p className="text-muted-foreground text-sm">
                Optimize timing and spousal benefits for maximum lifetime income.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Pension Income</h3>
              <p className="text-muted-foreground text-sm">
                Evaluate lump sum vs. annuity options and survivor benefits.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Investment Income</h3>
              <p className="text-muted-foreground text-sm">
                Create sustainable withdrawal strategies from your portfolio.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Annuity Income</h3>
              <p className="text-muted-foreground text-sm">
                Guaranteed income you can't outlive for baseline security.
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
              Creating your personalized income plan is simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Income Analysis</h3>
              <p className="text-muted-foreground">
                We analyze all your income sources, expenses, and retirement timeline.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Strategy Design</h3>
              <p className="text-muted-foreground">
                We create a customized withdrawal and income strategy for your goals.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Ongoing Support</h3>
              <p className="text-muted-foreground">
                We monitor and adjust your plan as your needs and markets change.
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
                  When should I start Social Security?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The optimal claiming age depends on your health, other income sources, 
                  and whether you're married. Claiming at 62 permanently reduces benefits 
                  by up to 30%, while waiting until 70 can increase them by 32%. We help 
                  you determine the best strategy for your situation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What is the 4% rule and does it still work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The 4% rule suggests withdrawing 4% of your portfolio in year one, 
                  then adjusting for inflation. While it's a useful starting point, 
                  it may be too conservative or aggressive depending on your situation. 
                  We create dynamic withdrawal strategies tailored to your needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How much income will I need in retirement?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most retirees need 70-80% of their pre-retirement income, but this 
                  varies widely based on your lifestyle, healthcare needs, and goals. 
                  We help you calculate your specific income needs and create a plan 
                  to meet them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Which accounts should I withdraw from first?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The conventional wisdom of drawing from taxable accounts first isn't 
                  always optimal. Strategic sequencing between traditional IRAs, Roth IRAs, 
                  and taxable accounts can save significant taxes over your retirement.
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
                Get Your Free Income Analysis
              </h2>
              <p className="text-white/80 text-lg">
                Discover how much retirement income you can safely generate from your savings.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <ServiceConsultationForm
                serviceType="income-planning"
                serviceName="Income Planning"
                ctaText="Get My Income Plan"
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

export default IncomePlanning;
