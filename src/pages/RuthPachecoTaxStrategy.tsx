import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Phone, 
  Mail, 
  Shield, 
  FileText, 
  TrendingUp, 
  PiggyBank,
  Users,
  Heart,
  ChevronRight,
  Building2,
  Calculator,
  Handshake,
  CheckCircle2
} from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import laymansTaxLogo from "@/assets/partners/laymans-tax-accounting-logo.webp";
import luisPachecoImage from "@/assets/partners/luis-pacheco.webp";
import luisPachecoPortrait from "@/assets/partners/luis-pacheco-portrait.webp";
import ruthPachecoImage from "@/assets/advisors/ruth-pacheco.jpg";
import RuthPachecoTaxStrategyForm from "@/components/tax-strategy/RuthPachecoTaxStrategyForm";
import { SEOHead, JsonLd } from "@/components/seo";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const services = [
  {
    icon: FileText,
    title: "Living Trusts",
    description: "Avoid probate, reduce estate taxes, and ensure your assets transfer smoothly to your loved ones.",
  },
  {
    icon: PiggyBank,
    title: "Tax-Deferred Annuities",
    description: "Grow your wealth without annual tax liability. Pay taxes only when you withdraw.",
  },
  {
    icon: TrendingUp,
    title: "Indexed Universal Life (IUL)",
    description: "Build tax-free retirement income while protecting your family with life insurance.",
  },
  {
    icon: Shield,
    title: "Retirement Planning",
    description: "Maximize tax-advantaged contributions and create sustainable retirement income streams.",
  },
  {
    icon: Heart,
    title: "Income Replacement",
    description: "Protect your family's income with tax-efficient life insurance benefits.",
  },
  {
    icon: Building2,
    title: "Wealth Preservation",
    description: "Shield your hard-earned assets from unnecessary taxation and preserve your legacy.",
  },
];

const processSteps = [
  {
    number: "01",
    icon: Calculator,
    title: "Luis Identifies the Opportunity",
    description: "During your tax consultation, Luis identifies strategies that could benefit from financial planning expertise.",
  },
  {
    number: "02",
    icon: Handshake,
    title: "Warm Introduction to Ruth",
    description: "Luis introduces you to his mother Ruth with full context about your financial situation and goals.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Custom Strategy Session",
    description: "Ruth evaluates your options and presents tailored solutions designed to reduce your tax burden.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Coordinated Implementation",
    description: "Luis and Ruth work together to ensure your financial strategy is executed with maximum tax efficiency.",
  },
];

const faqs = [
  {
    question: "How does a Living Trust reduce taxes?",
    answer: "A Living Trust itself doesn't directly reduce income taxes, but it can significantly reduce estate taxes and avoid the costly probate process. Proper estate planning can preserve more of your wealth for your heirs and reduce the tax burden on your estate.",
  },
  {
    question: "What is tax-deferred growth?",
    answer: "Tax-deferred growth means your investments grow without being taxed annually. You only pay taxes when you withdraw the money, typically in retirement when you may be in a lower tax bracket. This allows your money to compound faster over time.",
  },
  {
    question: "Can life insurance really provide tax-free income?",
    answer: "Yes! Properly structured permanent life insurance policies, like Indexed Universal Life (IUL), allow you to access cash value through policy loans that are tax-free. This creates a powerful retirement income supplement that doesn't affect your Social Security taxation.",
  },
  {
    question: "How do Ruth and Luis work together?",
    answer: "As mother and son, Ruth and Luis share aligned values and seamless communication. Luis provides the tax expertise and identifies opportunities during your tax preparation. Ruth provides the financial solutions to implement those strategies. Together, they ensure your entire financial picture is optimized.",
  },
  {
    question: "Is there a cost for the initial consultation?",
    answer: "No. Ruth offers a complimentary consultation to understand your situation and explain your options. There's no obligation to move forward, and you'll leave with valuable insights regardless of your decision.",
  },
];

const RuthPachecoTaxStrategy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Tax-Advantaged Financial Solutions | Ruth Pacheco & Luis Pacheco CPA"
        description="Reduce your tax burden with coordinated financial planning. Ruth Pacheco (Financial Strategist) and Luis Pacheco (CPA) offer living trusts, tax-deferred retirement, and wealth preservation strategies."
        canonical={`${siteConfig.url}/advisors/ruth-pacheco/tax-strategy`}
        ogType="website"
        keywords="tax reduction strategies, living trust, tax-deferred retirement, CPA referral, financial planning California"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Tax-Advantaged Financial Solutions | Ruth Pacheco & Luis Pacheco CPA",
          "Reduce your tax burden with coordinated financial planning from Ruth Pacheco and Luis Pacheco CPA.",
          `${siteConfig.url}/advisors/ruth-pacheco/tax-strategy`
        ),
        generatePersonSchema(
          "Ruth Pacheco",
          "Financial Strategist",
          "Ruth Pacheco is a Financial Strategist with 36+ years of experience specializing in tax-advantaged financial solutions, living trusts, and retirement planning.",
          ruthPachecoImage,
          `${siteConfig.url}/advisors/ruth-pacheco`,
          ["Living Trusts", "Tax-Deferred Retirement", "Life Insurance", "Estate Planning"]
        ),
        generatePersonSchema(
          "Luis Pacheco",
          "Certified Public Accountant",
          "Luis Pacheco is a CPA at Layman's Tax & Accounting, partnering with The Financial Architects to provide comprehensive tax and financial planning solutions.",
          luisPachecoImage,
          `${siteConfig.url}/advisors/ruth-pacheco/tax-strategy`,
          ["Tax Preparation", "Tax Planning", "Business Accounting"]
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Advisors", url: `${siteConfig.url}/advisors` },
          { name: "Ruth Pacheco", url: `${siteConfig.url}/advisors/ruth-pacheco` },
          { name: "Tax Strategy", url: `${siteConfig.url}/advisors/ruth-pacheco/tax-strategy` }
        ])
      ]} />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link to="/">
                  <img src={tfaLogo} alt="The Financial Architects" className="h-12 w-auto" />
                </Link>
                <div className="hidden sm:block h-8 w-px bg-gray-200" />
                <img 
                  src={laymansTaxLogo} 
                  alt="Layman's Tax & Accounting" 
                  className="hidden sm:block h-14 w-auto" 
                />
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground hidden sm:block">A Trusted Partnership</p>
                <a href="tel:9098009142" className="text-primary font-semibold hover:text-accent transition-colors">
                  (909) 800-9142
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  CPA-Referred Financial Solutions
                </Badge>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Reduce Your Tax Burden.<br />
                  <span className="text-accent">Protect Your Wealth.</span>
                </h1>
                <p className="text-xl text-white/90">
                  Your CPA Luis Pacheco has partnered with financial strategist Ruth Pacheco 
                  to provide tax-advantaged solutions that go beyond traditional accounting.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                    onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Schedule Free Consultation
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <a href="tel:9098009142">
                    <Button size="lg" variant="hero">
                      <Phone className="mr-2 h-5 w-5" />
                      (909) 800-9142
                    </Button>
                  </a>
                </div>
              </div>

              {/* Advisor Cards */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-xs">
                  <CardContent className="p-6 text-center">
                    <img
                      src={luisPachecoImage}
                      alt="Luis Pacheco, CPA"
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-accent/30"
                    />
                    <h3 className="text-xl font-bold">Luis Pacheco</h3>
                    <p className="text-accent font-medium">CPA</p>
                    <p className="text-sm text-white/70 mt-2">Layman's Tax & Accounting</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-xs">
                  <CardContent className="p-6 text-center">
                    <img
                      src={ruthPachecoImage}
                      alt="Ruth Pacheco, Financial Strategist"
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-accent/30"
                    />
                    <h3 className="text-xl font-bold">Ruth Pacheco</h3>
                    <p className="text-accent font-medium">Financial Strategist</p>
                    <p className="text-sm text-white/70 mt-2">36+ Years Experience</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Family Partnership
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why This Partnership Works
              </h2>
              <p className="text-lg text-muted-foreground">
                When your CPA and financial strategist are family, you get seamless 
                coordination and aligned priorities focused on your success.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-card border-border/50 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Tax Expertise Meets Strategy</h3>
                  <p className="text-muted-foreground">
                    Luis identifies opportunities during tax preparation. Ruth implements 
                    financial solutions to maximize those opportunities.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Family Trust</h3>
                  <p className="text-muted-foreground">
                    As mother and son, Ruth and Luis share values, communicate seamlessly, 
                    and are fully invested in your success.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Holistic Approach</h3>
                  <p className="text-muted-foreground">
                    From tax preparation to wealth preservation, your entire financial 
                    picture is coordinated under one trusted relationship.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Tax-Advantaged Solutions
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Strategies to Reduce Your Tax Burden
              </h2>
              <p className="text-lg text-muted-foreground">
                Ruth specializes in financial products and strategies that minimize 
                taxes while building long-term wealth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service) => (
                <Card key={service.title} className="bg-card border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                How It Works
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                A Coordinated Approach
              </h2>
              <p className="text-lg text-muted-foreground">
                From tax identification to financial implementation, your journey is guided every step of the way.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent -translate-x-4"></div>
                  )}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-accent/30 relative">
                      <step.icon className="h-10 w-10 text-accent" />
                      <span className="absolute -top-2 -right-2 bg-accent text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Your Advisors Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Your Team
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Your Advisors
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Luis Card */}
              <Card className="bg-card border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={luisPachecoPortrait}
                      alt="Luis Pacheco, CPA"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-3 bg-primary/10 text-primary">
                      Layman's Tax & Accounting
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Luis Pacheco, CPA</h3>
                    <p className="text-muted-foreground mb-4">
                      Luis is a Certified Public Accountant specializing in individual and 
                      business tax preparation. He identifies opportunities for his clients 
                      to reduce their tax burden through strategic financial planning.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4 text-accent" />
                      <span>Tax Preparation & Planning</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ruth Card */}
              <Card className="bg-card border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={ruthPachecoImage}
                      alt="Ruth Pacheco, Financial Strategist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-3 bg-accent/10 text-accent">
                      The Financial Architects
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Ruth Pacheco</h3>
                    <p className="text-muted-foreground mb-4">
                      With 36+ years of experience in lending and financial services, 
                      Ruth is a Reverse Mortgage Certified specialist who helps clients 
                      build tax-efficient wealth and protect their legacies.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>NMLS# 252846</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form-section" className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="text-white space-y-6">
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Free Consultation
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold">
                    Ready to Reduce Your Tax Burden?
                  </h2>
                  <p className="text-xl text-white/90">
                    Schedule your free consultation to discover tax-advantaged strategies 
                    tailored to your unique situation.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="text-white/90">No-obligation consultation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="text-white/90">Personalized strategy review</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="text-white/90">Coordinated with your CPA</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="text-white/90">36+ years of trusted experience</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <p className="text-white/70 mb-2">Or call Ruth directly:</p>
                    <a href="tel:9098009142" className="text-2xl font-bold text-accent hover:text-accent/90 transition-colors">
                      (909) 800-9142
                    </a>
                  </div>
                </div>
                <div>
                  <RuthPachecoTaxStrategyForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                  FAQ
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Common Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border/50 rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
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

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
                <div className="h-6 w-px bg-gray-200" />
                <img src={laymansTaxLogo} alt="Layman's Tax & Accounting" className="h-14 w-auto" />
              </div>
              <div className="flex items-center gap-6">
                <a href="tel:9098009142" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="h-4 w-4" />
                  (909) 800-9142
                </a>
                <a href="mailto:ruth@tfainsuranceadvisors.com" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="h-4 w-4" />
                  Email Ruth
                </a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
              <p className="mt-2">
                This is not tax advice. Please consult with your tax professional for specific guidance.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RuthPachecoTaxStrategy;
