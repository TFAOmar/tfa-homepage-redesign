import { useEffect } from "react";
import { Phone, Mail, Shield, Building2, Users, FileCheck, Scale, Briefcase, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RecinosBusinessInsuranceForm from "@/components/business-insurance/RecinosBusinessInsuranceForm";
import tfaLogo from "@/assets/tfa-logo.png";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateInsuranceAgencySchema, generateFAQSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const stats = [
  { value: "$1.2M+", label: "Avg. Business Assets Protected" },
  { value: "9+", label: "Insurance Carriers" },
  { value: "24hrs", label: "Quote Response Time" },
  { value: "100%", label: "Free Consultations" },
];

const whyItMatters = [
  {
    icon: Scale,
    title: "Liability Exposure",
    description: "Protect against lawsuits, accidents, and claims that could threaten your business assets and personal wealth."
  },
  {
    icon: Building2,
    title: "Business Continuity",
    description: "Safeguard against property damage, equipment loss, and disruptions that could halt your operations."
  },
  {
    icon: FileCheck,
    title: "Compliance Requirements",
    description: "Meet workers' compensation mandates, contract requirements, and industry regulations with proper coverage."
  }
];

const coverageTypes = [
  "General Liability",
  "Business Owner's Policy (BOP)",
  "Commercial Property",
  "Workers' Compensation",
  "Commercial Auto",
  "Professional Liability (E&O)",
  "Cyber Liability",
  "Employment Practices Liability (EPLI)",
  "Commercial Umbrella"
];

const specialties = [
  "Business Risk Assessment",
  "Policy Gap Analysis",
  "Multi-Carrier Quote Comparison",
  "Claims Support & Advocacy",
  "Annual Coverage Reviews",
  "Contract Compliance Review"
];

const processSteps = [
  {
    number: "1",
    title: "Discovery Call",
    description: "We learn about your business operations, current coverage, and specific risks to understand your unique needs."
  },
  {
    number: "2",
    title: "Custom Quote Package",
    description: "We shop multiple carriers and present side-by-side options so you can make an informed decision."
  },
  {
    number: "3",
    title: "Ongoing Partnership",
    description: "We conduct annual reviews as your business grows, ensuring your coverage evolves with your needs."
  }
];

const faqs = [
  {
    question: "What does general liability insurance cover?",
    answer: "General liability protects your business against third-party claims for bodily injury, property damage, and advertising injury. It covers legal defense costs, settlements, and judgments if someone is injured on your premises or by your products/services."
  },
  {
    question: "Do I need workers' compensation insurance?",
    answer: "In California, workers' compensation is required for all employers, even those with just one employee. It covers medical expenses, lost wages, and rehabilitation costs for work-related injuries or illnesses."
  },
  {
    question: "What's the difference between a BOP and separate policies?",
    answer: "A Business Owner's Policy (BOP) bundles general liability and commercial property insurance at a discounted rate. It's ideal for small to medium businesses. Larger or higher-risk businesses may need separate, customized policies for broader coverage."
  },
  {
    question: "How long does it take to get a quote?",
    answer: "We typically provide initial quotes within 24 hours of our discovery call. Complex businesses or specialty coverage may take 2-3 business days to ensure we find the best options for your specific needs."
  },
  {
    question: "Can you review my current business insurance policy?",
    answer: "Absolutely! We offer free policy reviews to identify gaps in coverage, potential savings, or areas where you may be over-insured. Many business owners are surprised by what they discover."
  }
];

const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
};

const RecinosBusinessInsurance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Business Insurance with Rolando & Savannah Recinos"
        description="Expert commercial insurance solutions for your business. Get a free quote for general liability, workers' comp, commercial property, and more."
        canonical={`${siteConfig.url}/recinos-business-insurance`}
        keywords="business insurance, commercial insurance, Rolando Recinos, Savannah Recinos"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Business Insurance | Rolando & Savannah Recinos",
            "Expert commercial insurance solutions for your business.",
            `${siteConfig.url}/recinos-business-insurance`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Business Insurance", url: `${siteConfig.url}/recinos-business-insurance` },
          ]),
          generateInsuranceAgencySchema(
            "TFA Business Insurance - Recinos Team",
            "Expert commercial insurance solutions for businesses of all sizes.",
            `${siteConfig.url}/recinos-business-insurance`,
            coverageTypes
          ),
          generateFAQSchema(faqs),
        ]}
      />
      <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <img src={tfaLogo} alt="The Financial Architects" className="h-10" />
          <div className="flex items-center gap-4">
            <a href="tel:8883505396" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">(888) 350-5396</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-primary via-primary to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,181,72,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">Your Business Insurance Team</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Protect Your Business with <span className="text-accent">Expert Commercial Insurance</span> Guidance
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Rolando and Savannah Recinos specialize in comprehensive commercial insurance solutions tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToForm}
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all"
                >
                  Get a Free Quote
                </Button>
                <a href="tel:8883505396">
                  <Button variant="hero" className="px-8 py-6 text-lg rounded-full w-full">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Team Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-white text-xl font-semibold mb-2">Meet Your Business Insurance Team</h3>
                <p className="text-white/70">Chino Hills, California</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-12 w-12 text-white/60" />
                  </div>
                  <h4 className="text-white font-semibold">Rolando Recinos</h4>
                  <p className="text-white/70 text-sm">Business Insurance Specialist</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-12 w-12 text-white/60" />
                  </div>
                  <h4 className="text-white font-semibold">Savannah Recinos</h4>
                  <p className="text-white/70 text-sm">Business Insurance Specialist</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Business Insurance</span>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Business Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-navy border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Business Insurance Matters */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Business Insurance Matters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every business faces unique risks. The right coverage protects your livelihood, your employees, and your future.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItMatters.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border hover:border-accent/50 transition-colors">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Coverage We Specialize In</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with multiple carriers to find the right coverage at competitive rates for your business.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {coverageTypes.map((coverage, index) => (
              <div key={index} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground font-medium">{coverage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How We Help Your Business</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team approach means you get dedicated attention and expertise throughout the entire process.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specialties.map((specialty, index) => (
              <div key={index} className="flex items-center gap-3 p-4">
                <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-b from-primary to-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Simple 3-Step Process</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Getting the right business insurance doesn't have to be complicated.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 h-full">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary font-bold text-xl">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronDown className="h-8 w-8 text-accent rotate-[-90deg]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about business insurance coverage.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl border border-border px-6">
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

      {/* Lead Capture Form */}
      <section id="lead-form" className="py-20 bg-gradient-to-b from-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Your Free Business Insurance Quote</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Tell us about your business and we'll provide a customized quote within 24 hours.
            </p>
          </div>
          <RecinosBusinessInsuranceForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ready to Protect Your Business?</h2>
          <p className="text-primary/80 mb-8 max-w-2xl mx-auto">
            Contact Rolando and Savannah Recinos today for a free, no-obligation business insurance consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-full"
            >
              Request a Quote
            </Button>
            <a href="tel:8883505396">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-full w-full">
                <Phone className="mr-2 h-5 w-5" />
                (888) 350-5396
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img src={tfaLogo} alt="The Financial Architects" className="h-8" />
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} The Financial Architects. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <a href="mailto:info@tfainsuranceadvisors.com" className="hover:text-accent transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">info@tfainsuranceadvisors.com</span>
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-6 max-w-4xl mx-auto">
            Insurance products and services are offered through licensed insurance agents. Coverage options, rates, and availability vary by state and carrier. This is not a guarantee of coverage. Please consult with a licensed insurance professional for specific advice regarding your business insurance needs.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default RecinosBusinessInsurance;
