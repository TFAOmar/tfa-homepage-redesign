import { Phone, ArrowRight, Users, Shield, TrendingUp, CheckCircle, DollarSign, FileText, Building, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceConsultationForm } from "@/components/services/ServiceConsultationForm";
import tfaLogo from "@/assets/tfa-logo.png";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const groupRetirementFaqs = [
  { question: "What are my fiduciary responsibilities?", answer: "As a plan sponsor, you're responsible for acting in the best interest of participants. This includes selecting and monitoring investments, ensuring reasonable fees, and following the plan document. We help you meet these responsibilities with fiduciary support services that document your process and decisions." },
  { question: "How much does a 401(k) plan cost?", answer: "Costs vary based on plan size and features. Typical expenses include setup fees ($500-$2,000), annual administration ($1,500-$5,000), and per-participant fees ($20-$100/year). Many of these costs are tax-deductible, and small businesses may qualify for tax credits that offset startup costs for the first three years." },
  { question: "What matching formula should I use?", answer: "Common formulas include 100% match on the first 3% deferred, or 50% match on the first 6%. The right formula depends on your budget, industry norms, and goals. We'll help you design a formula that's competitive yet sustainable for your business." },
  { question: "How do we increase employee participation?", answer: "We recommend auto-enrollment with an opt-out provision—this typically boosts participation to 90%+ compared to 50-60% with voluntary enrollment. We also provide employee education sessions that help participants understand the value of the plan and how to use it effectively." },
  { question: "Can I set up a plan just for myself?", answer: "Yes! A Solo 401(k) or SEP IRA allows self-employed individuals and business owners with no employees (other than a spouse) to save significant amounts for retirement with high contribution limits and tax advantages." },
];

const GroupRetirement = () => {
  const scrollToForm = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="401(k) & Group Retirement Plans"
        description="Offer competitive retirement benefits with 401(k), 403(b), SIMPLE, and SEP plans. Attract and retain top talent with expert plan design."
        canonical={`${siteConfig.url}/services/group-retirement`}
        keywords="401k plan, group retirement plan, employer 401k, 403b plan, SIMPLE IRA, SEP IRA"
      />
      <JsonLd data={[
        generateWebPageSchema("401(k) & Group Retirement Plans", "Retirement benefits that attract and retain top talent. 401(k), 403(b), SIMPLE, and SEP plan design and administration.", `${siteConfig.url}/services/group-retirement`),
        generateServiceSchema("Group Retirement Plans", "401(k) and group retirement plan design, setup, and administration for businesses of all sizes.", `${siteConfig.url}/services/group-retirement`),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: "Group Retirement", url: `${siteConfig.url}/services/group-retirement` }
        ]),
        generateFAQSchema(groupRetirementFaqs)
      ]} />
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
              <Building className="h-4 w-4" />
              <span className="text-sm font-medium">401(k) & Group Retirement Plans</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Retirement Benefits That Attract and Retain Top Talent
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Offer your employees a competitive retirement plan that helps them build wealth 
              while giving your business valuable tax advantages. We handle the complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8">
                Get a Plan Quote
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
              { value: "88%", label: "Of employees value retirement benefits" },
              { value: "62%", label: "Higher retention with good 401(k)" },
              { value: "$1M+", label: "Saved with proper plan design" },
              { value: "100%", label: "Compliance assurance" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Group Plans Matter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Offer a Retirement Plan?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A well-designed retirement plan is one of the most powerful tools for building your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Attract Top Talent",
                description: "A competitive retirement plan is often the deciding factor for candidates choosing between job offers. Stand out from competitors."
              },
              {
                icon: Award,
                title: "Retain Employees",
                description: "Employees with vested retirement benefits are less likely to leave. Reduce costly turnover and training expenses."
              },
              {
                icon: DollarSign,
                title: "Tax Advantages",
                description: "Employer contributions are tax-deductible. You can also qualify for tax credits when starting a new plan."
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
              Our Group Retirement Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support from plan design to ongoing administration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: FileText,
                title: "Plan Design & Setup",
                description: "We design the right plan for your business size, goals, and budget.",
                features: ["401(k), 403(b), SIMPLE, SEP", "Matching formula design", "Vesting schedule options"]
              },
              {
                icon: Shield,
                title: "Fiduciary Services",
                description: "Protect yourself from fiduciary liability with our support.",
                features: ["Investment selection", "Fee benchmarking", "Fiduciary documentation"]
              },
              {
                icon: Users,
                title: "Employee Education",
                description: "Help your employees make the most of their benefits.",
                features: ["Enrollment meetings", "One-on-one sessions", "Online resources"]
              },
              {
                icon: TrendingUp,
                title: "Plan Administration",
                description: "We handle the paperwork and compliance requirements.",
                features: ["Compliance testing", "Form 5500 filing", "Participant statements"]
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

      {/* Plan Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Plan Options for Every Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From solo entrepreneurs to large corporations, we have a solution for you
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "401(k) Plans",
                description: "The gold standard for businesses of all sizes. High contribution limits and flexible design options.",
                bestFor: "Businesses of any size",
                icon: Building
              },
              {
                title: "403(b) Plans",
                description: "Similar to 401(k) but designed for nonprofits, schools, and religious organizations.",
                bestFor: "Nonprofits & education",
                icon: Award
              },
              {
                title: "SIMPLE IRA",
                description: "Easy to set up and administer. Lower costs but also lower contribution limits.",
                bestFor: "Under 100 employees",
                icon: Users
              },
              {
                title: "SEP IRA",
                description: "Employer-only contributions. Simple and high limits—great for maximizing owner contributions.",
                bestFor: "Self-employed & small business",
                icon: TrendingUp
              }
            ].map((plan, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <plan.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{plan.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                <div className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full inline-block">
                  Best for: {plan.bestFor}
                </div>
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
              How We Set Up Your Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From consultation to implementation, we make it easy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We learn about your business, goals, budget, and employee demographics to recommend the right plan type."
              },
              {
                step: "2",
                title: "Plan Design",
                description: "We design matching formulas, vesting schedules, eligibility requirements, and investment menus tailored to your needs."
              },
              {
                step: "3",
                title: "Implementation",
                description: "We handle setup, employee enrollment, and ongoing administration. You focus on running your business."
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
                Common Questions About Group Plans
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What are my fiduciary responsibilities?",
                  answer: "As a plan sponsor, you're responsible for acting in the best interest of participants. This includes selecting and monitoring investments, ensuring reasonable fees, and following the plan document. We help you meet these responsibilities with fiduciary support services that document your process and decisions."
                },
                {
                  question: "How much does a 401(k) plan cost?",
                  answer: "Costs vary based on plan size and features. Typical expenses include setup fees ($500-$2,000), annual administration ($1,500-$5,000), and per-participant fees ($20-$100/year). Many of these costs are tax-deductible, and small businesses may qualify for tax credits that offset startup costs for the first three years."
                },
                {
                  question: "What matching formula should I use?",
                  answer: "Common formulas include 100% match on the first 3% deferred, or 50% match on the first 6%. The right formula depends on your budget, industry norms, and goals. We'll help you design a formula that's competitive yet sustainable for your business."
                },
                {
                  question: "How do we increase employee participation?",
                  answer: "We recommend auto-enrollment with an opt-out provision—this typically boosts participation to 90%+ compared to 50-60% with voluntary enrollment. We also provide employee education sessions that help participants understand the value of the plan and how to use it effectively."
                },
                {
                  question: "Can I set up a plan just for myself?",
                  answer: "Yes! A Solo 401(k) or SEP IRA allows self-employed individuals and business owners with no employees (other than a spouse) to save significant amounts for retirement with high contribution limits and tax advantages."
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
                Ready to Offer a Retirement Plan?
              </h2>
              <p className="text-lg text-white/80">
                Get a no-obligation consultation and quote for your business.
              </p>
            </div>
            <ServiceConsultationForm 
              serviceType="group-retirement"
              serviceName="Group Retirement Plan"
              ctaText="Get a Plan Quote"
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

export default GroupRetirement;
