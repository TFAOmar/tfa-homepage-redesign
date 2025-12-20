import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Users, FileText, Scale, CheckCircle, ChevronRight } from "lucide-react";
import { EstatePlanningForm } from "@/components/estate-planning/EstatePlanningForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const estatePlanningFaqs = [
  { question: "What is a Living Trust?", answer: "A Living Trust is a legal document that places your assets into a trust during your lifetime. You maintain full control as the trustee, and upon your passing, your assets transfer directly to your beneficiaries without going through probate." },
  { question: "How is a Living Trust different from a Will?", answer: "While both documents specify how your assets should be distributed, a Will must go through probate court—a public, expensive, and time-consuming process. A Living Trust bypasses probate entirely, keeping your affairs private and allowing immediate asset transfer." },
  { question: "Do I need a Living Trust if I already have a Will?", answer: "A Will alone doesn't avoid probate. If you own real estate, have assets over $184,500 (in California), or value privacy, a Living Trust provides significant advantages." },
  { question: "How much does estate planning cost?", answer: "Costs vary based on complexity. We offer competitive pricing and can discuss options during your free consultation. The cost is typically far less than what your family would pay in probate fees." },
];

const EstatePlanning = () => {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTrusts = () => {
    document.getElementById("living-trusts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Estate Planning & Living Trusts"
        description="Protect your legacy with estate planning and living trusts. Avoid probate, maintain privacy, and ensure your wishes are honored. Free consultation in Chino Hills."
        canonical={`${siteConfig.url}/services/estate-planning`}
        keywords="estate planning, living trust, probate avoidance, wills, beneficiary review, Chino Hills estate planning"
      />
      <JsonLd data={[
        generateWebPageSchema("Estate Planning & Living Trusts", "Comprehensive estate planning services including living trusts, wills, and beneficiary review to protect your legacy.", `${siteConfig.url}/services/estate-planning`),
        generateServiceSchema("Estate Planning", "Estate planning and Living Trusts that protect your family, avoid probate, and ensure your wishes are carried out exactly as you intend.", `${siteConfig.url}/services/estate-planning`),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: "Estate Planning", url: `${siteConfig.url}/services/estate-planning` }
        ]),
        generateFAQSchema(estatePlanningFaqs)
      ]} />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-gradient-to-b from-navy via-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,181,72,0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Estate Planning & Living Trusts
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Protect What You've Built.
              <br />
              <span className="text-accent">Plan Your Legacy.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Estate planning and Living Trusts that protect your family, avoid probate, 
              and ensure your wishes are carried out exactly as you intend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="btn-primary-cta px-8 py-6 text-lg">
                Start Your Plan
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={scrollToTrusts} variant="hero" size="lg" className="px-8 py-6 text-lg">
                Learn About Living Trusts
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
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">67%</div>
              <p className="text-muted-foreground text-sm">of Americans have no estate plan</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$50K+</div>
              <p className="text-muted-foreground text-sm">average probate cost avoided</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">18 mo</div>
              <p className="text-muted-foreground text-sm">typical probate timeline</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground text-sm">private with a Living Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Estate Planning Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Why Estate Planning Matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Without proper estate planning, your family may face lengthy court proceedings, 
              public records exposure, and unnecessary expenses. A well-crafted estate plan 
              protects your loved ones and ensures your wishes are honored.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Protect Your Family</h3>
              <p className="text-muted-foreground">
                Ensure your loved ones are taken care of and receive their inheritance without 
                delays or complications.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Lock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Maintain Privacy</h3>
              <p className="text-muted-foreground">
                Keep your financial affairs private. Unlike wills, trusts don't become 
                public record.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Scale className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Avoid Probate</h3>
              <p className="text-muted-foreground">
                Skip the expensive and time-consuming probate process, saving your family 
                thousands in legal fees.
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
              Our Estate Planning Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions to protect your legacy and provide peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Living Trusts</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Avoid probate, maintain privacy, and keep control of your assets during your lifetime 
                and beyond.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Wills & Legacy Documents</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ensure your wishes are legally documented with properly drafted wills, 
                powers of attorney, and healthcare directives.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Beneficiary Review</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Coordinate your accounts and policies with your estate plan to ensure 
                seamless asset transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Living Trust Deep Dive */}
      <section id="living-trusts" className="py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Featured Service
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              The Power of a Living Trust
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Living Trust is one of the most effective tools for protecting your assets 
              and ensuring your family's financial security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Scale className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Avoid Probate</h3>
              <p className="text-muted-foreground text-sm">
                Your assets transfer directly to beneficiaries without court involvement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Protect Privacy</h3>
              <p className="text-muted-foreground text-sm">
                Unlike wills, trusts don't become part of the public record.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Maintain Control</h3>
              <p className="text-muted-foreground text-sm">
                You remain in complete control of your assets during your lifetime.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Reduce Stress</h3>
              <p className="text-muted-foreground text-sm">
                Spare your family the emotional burden of navigating probate court.
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
              Getting started with your estate plan is simple and straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Free Consultation</h3>
              <p className="text-muted-foreground">
                We'll discuss your family situation, assets, and goals in a no-pressure conversation.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Customized Plan</h3>
              <p className="text-muted-foreground">
                Receive tailored estate planning recommendations based on your unique needs.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Implementation</h3>
              <p className="text-muted-foreground">
                Work with our trusted partners to execute your plan and protect your family.
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
                  What is a Living Trust?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A Living Trust is a legal document that places your assets into a trust during your 
                  lifetime. You maintain full control as the trustee, and upon your passing, your 
                  assets transfer directly to your beneficiaries without going through probate.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How is a Living Trust different from a Will?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While both documents specify how your assets should be distributed, a Will must go 
                  through probate court—a public, expensive, and time-consuming process. A Living Trust 
                  bypasses probate entirely, keeping your affairs private and allowing immediate asset transfer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Do I need a Living Trust if I already have a Will?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A Will alone doesn't avoid probate. If you own real estate, have assets over $184,500 
                  (in California), or value privacy, a Living Trust provides significant advantages. 
                  Most comprehensive estate plans include both documents working together.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How much does estate planning cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Costs vary based on complexity, but a comprehensive Living Trust package typically 
                  ranges from $1,500 to $3,500. Compare this to probate costs of 3-7% of your estate 
                  value—often tens of thousands of dollars—and the investment in proper planning becomes clear.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  Who should have an estate plan?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Anyone who owns property, has children, or wants to protect their family should have 
                  an estate plan. It's especially important if you're married, own a home, have retirement 
                  accounts, or want to ensure your healthcare wishes are respected if you become incapacitated.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="consultation-form" className="py-20 md:py-32 bg-gradient-to-b from-navy to-primary scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Start Planning Your Legacy Today
              </h2>
              <p className="text-lg text-white/80">
                Request your free consultation and take the first step toward protecting your family.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10">
              <EstatePlanningForm />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Don't Leave Your Family's Future to Chance
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Every day without an estate plan is a day your family isn't protected. 
            Let's change that together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={scrollToForm} className="btn-primary-cta px-8 py-6">
              Get Started Now
            </Button>
            <a href="tel:8883505396" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-5 w-5" />
              <span className="font-medium">(888) 350-5396</span>
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default EstatePlanning;
