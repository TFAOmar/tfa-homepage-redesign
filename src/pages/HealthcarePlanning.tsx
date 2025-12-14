import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Shield, Clock, Stethoscope, FileHeart, Wallet, ChevronRight } from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HealthcarePlanning = () => {
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
                Get Healthcare Help
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
              Healthcare Planning
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Navigate Healthcare Costs
              <br />
              <span className="text-accent">With Expert Guidance</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Medicare, long-term care, and healthcare cost planning to protect 
              your health and your wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="btn-primary-cta px-8 py-6 text-lg">
                Plan Your Healthcare
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
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$315K</div>
              <p className="text-muted-foreground text-sm">avg healthcare costs in retirement</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">70%</div>
              <p className="text-muted-foreground text-sm">will need long-term care</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">65</div>
              <p className="text-muted-foreground text-sm">Medicare eligibility age</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$5K+</div>
              <p className="text-muted-foreground text-sm">IRMAA surcharge avoided</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthcare Planning Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Why Healthcare Planning Matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Healthcare is one of the largest and most unpredictable expenses in retirement. 
              Proper planning can save you thousands and protect your nest egg.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Rising Costs</h3>
              <p className="text-muted-foreground">
                Healthcare costs rise faster than inflation. Planning now helps you 
                prepare for these inevitable expenses.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Coverage Gaps</h3>
              <p className="text-muted-foreground">
                Medicare doesn't cover everything. Understanding gaps helps you 
                choose the right supplemental coverage.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Long-Term Care</h3>
              <p className="text-muted-foreground">
                Extended care can devastate retirement savings. Advance planning 
                provides protection and peace of mind.
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
              Our Healthcare Planning Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive guidance for all your healthcare decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Medicare Guidance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Navigate Medicare enrollment, choose between Advantage and Supplement plans, 
                and select the right Part D coverage.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileHeart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Long-Term Care Planning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Evaluate long-term care insurance options, hybrid policies, and 
                self-funding strategies for extended care needs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Wallet className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">HSA Optimization</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Maximize Health Savings Account benefits for tax-free healthcare 
                spending now and in retirement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medicare Deep Dive */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Medicare Made Simple
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Understanding Your Medicare Options
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Medicare can be confusing. We help you understand your options and choose wisely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Part A</h3>
              <p className="text-muted-foreground text-sm">
                Hospital insurance—usually premium-free if you worked 10+ years.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Part B</h3>
              <p className="text-muted-foreground text-sm">
                Medical insurance for doctor visits, outpatient care, and preventive services.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Part C</h3>
              <p className="text-muted-foreground text-sm">
                Medicare Advantage plans combining Parts A, B, and often D with extra benefits.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Part D</h3>
              <p className="text-muted-foreground text-sm">
                Prescription drug coverage—essential for managing medication costs.
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
              Getting the right healthcare coverage is easier than you think.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Health Assessment</h3>
              <p className="text-muted-foreground">
                We review your health needs, medications, and preferred doctors.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Plan Comparison</h3>
              <p className="text-muted-foreground">
                We compare options and recommend plans that fit your needs and budget.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Enrollment Support</h3>
              <p className="text-muted-foreground">
                We guide you through enrollment and provide ongoing support as needs change.
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
                  When should I enroll in Medicare?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Your Initial Enrollment Period begins 3 months before your 65th birthday 
                  and ends 3 months after. If you're still working with employer coverage, 
                  different rules apply. Late enrollment can result in permanent penalties.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Should I choose Medicare Advantage or a Supplement?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  It depends on your health, budget, and preferences. Advantage plans often 
                  have lower premiums but narrower networks. Supplements cost more but offer 
                  more flexibility. We help you compare options based on your situation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Does Medicare cover long-term care?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, Medicare provides very limited long-term care coverage (only 
                  short-term skilled nursing after a hospital stay). Most people need 
                  separate long-term care insurance or a self-funding strategy to cover 
                  extended care needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What is IRMAA and how can I avoid it?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  IRMAA (Income-Related Monthly Adjustment Amount) adds surcharges to 
                  Medicare premiums for higher-income beneficiaries. Strategic income 
                  planning, especially around Roth conversions and capital gains, can 
                  help you stay below IRMAA thresholds.
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
                Get Your Free Healthcare Review
              </h2>
              <p className="text-white/80 text-lg">
                Ensure you have the right coverage to protect your health and your wealth.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <ServiceConsultationForm
                serviceType="healthcare-planning"
                serviceName="Healthcare Planning"
                ctaText="Get My Healthcare Review"
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

export default HealthcarePlanning;
