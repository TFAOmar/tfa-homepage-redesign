import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  Shield,
  TrendingUp,
  Wallet,
  Play,
  CheckCircle2,
  ChevronDown,
  Heart,
  ArrowRight,
  Phone,
  XCircle,
  Minus,
  Award,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import tfaLogo from "@/assets/tfa-logo.png";
import mariahLorenzenImg from "@/assets/advisors/mariah-lorenzen.jpg";
import MariahKaiZenForm from "@/components/kaizen/MariahKaiZenForm";
import KaiZenCalculator from "@/components/kaizen/KaiZenCalculator";

const scrollToForm = () => {
  document.getElementById('kai-zen-form')?.scrollIntoView({ behavior: 'smooth' });
};

const benefits = [
  {
    icon: Wallet,
    title: "Smart Leverage",
    description: "Access institutional financing with no credit checks, no personal guarantees, no loan documents to sign, and no out-of-pocket interest payments.",
    features: ["No credit check required", "No personal guarantees", "No loan documents", "No interest payments"]
  },
  {
    icon: Shield,
    title: "More Protection",
    description: "Comprehensive life insurance coverage with living benefit riders for chronic illness, critical illness, and terminal illness protection.",
    features: ["Death benefit protection", "Chronic illness rider", "Critical illness rider", "Terminal illness rider"]
  },
  {
    icon: TrendingUp,
    title: "More Growth Potential",
    description: "Participate in market upside through indexed crediting strategies while protecting against market losses. Tax-advantaged distributions in retirement.",
    features: ["Market-linked growth", "Downside protection", "Tax-free distributions", "No market losses"]
  }
];

const howItWorks = [
  {
    step: "01",
    title: "You Contribute",
    description: "Make annual contributions over 5 years to fund your Kai-Zen policy."
  },
  {
    step: "02",
    title: "Bank Matches",
    description: "A participating bank provides matching premium financing, amplifying your contribution."
  },
  {
    step: "03",
    title: "Policy Grows",
    description: "Your policy accumulates cash value through indexed crediting strategies."
  },
  {
    step: "04",
    title: "You Benefit",
    description: "Access tax-free distributions in retirement, plus protection throughout."
  }
];

const qualifications = [
  "Ages 25-60",
  "Household income of $100,000+",
  "Good health (insurable)",
  "5-year contribution commitment",
  "Long-term retirement planning mindset"
];

const faqs = [
  {
    question: "Why was Kai-Zen developed?",
    answer: "Kai-Zen was developed to address a critical gap in retirement planning. Traditional qualified plans have low contribution limits, and most people aren't saving enough for retirement. Kai-Zen uses institutional-style financing to help individuals accumulate significantly more for retirement while also providing life insurance protection."
  },
  {
    question: "What's the catch?",
    answer: "There's no catch, but Kai-Zen isn't for everyone. It requires a 5-year contribution commitment and works best for those with a long-term perspective. The strategy uses leverage, which amplifies both the benefits and the importance of working with qualified professionals who understand the product."
  },
  {
    question: "Do I have to apply for the loan?",
    answer: "No. The bank financing is arranged through the program without any loan application, credit check, or personal guarantee from you. You never sign loan documents or make interest payments out of pocket."
  },
  {
    question: "Is this too good to be true?",
    answer: "Kai-Zen uses well-established financial principles—leverage, life insurance tax advantages, and indexed crediting—in an innovative way. The strategy has been used successfully since 2006 and is backed by top-rated insurance carriers and established lending institutions."
  },
  {
    question: "What are the risks?",
    answer: "Like any financial strategy, Kai-Zen has considerations. Policy performance depends on the insurance carrier's indexed crediting, and early termination may result in surrender charges. That's why it's designed for those with a long-term commitment to their retirement goals."
  }
];

const comparisonData = [
  {
    feature: "Contribution Limits",
    traditional: { value: "$23,000/year limit ($30,500 if 50+)", isAdvantage: false },
    kaizen: { value: "No IRS limits—contribute more", isAdvantage: true }
  },
  {
    feature: "Tax on Contributions",
    traditional: { value: "Pre-tax (reduces current income)", isAdvantage: true },
    kaizen: { value: "After-tax contributions", isAdvantage: false }
  },
  {
    feature: "Tax on Growth",
    traditional: { value: "Tax-deferred", isAdvantage: true },
    kaizen: { value: "Tax free", isAdvantage: true }
  },
  {
    feature: "Tax on Distributions",
    traditional: { value: "Fully taxable as ordinary income", isAdvantage: false },
    kaizen: { value: "Tax-free distributions", isAdvantage: true }
  },
  {
    feature: "Required Minimum Distributions",
    traditional: { value: "Yes, starting at age 73", isAdvantage: false },
    kaizen: { value: "No RMDs—access on your terms", isAdvantage: true }
  },
  {
    feature: "Market Downside Risk",
    traditional: { value: "Full exposure to market losses", isAdvantage: false },
    kaizen: { value: "0% floor—protected from losses", isAdvantage: true }
  },
  {
    feature: "Death Benefit",
    traditional: { value: "Account balance only (taxable)", isAdvantage: false },
    kaizen: { value: "Income tax-free death benefit", isAdvantage: true }
  },
  {
    feature: "Living Benefits",
    traditional: { value: "None", isAdvantage: false },
    kaizen: { value: "Chronic & terminal illness riders", isAdvantage: true }
  },
  {
    feature: "Leverage / Matching",
    traditional: { value: "Employer match (if offered)", isAdvantage: null },
    kaizen: { value: "Bank-financed ~3:1 leverage", isAdvantage: true }
  },
  {
    feature: "Early Access (Before 59½)",
    traditional: { value: "10% penalty + taxes", isAdvantage: false },
    kaizen: { value: "Penalty-free", isAdvantage: true }
  }
];

const MariahKaiZen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground">Your Kai-Zen Specialist:</span>
            <span className="hidden sm:inline text-sm font-medium text-foreground">Mariah Lorenzen</span>
            <a href="tel:8883505396" className="text-accent hover:text-accent/80 font-medium">
              (888) 350-5396
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-8">
                <TrendingUp className="h-4 w-4" />
                Leveraged Life Insurance Strategy
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Supercharge Your Retirement<br />
                <span className="text-accent">with Kai-Zen®</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
                Your dedicated Kai-Zen specialist, Mariah Lorenzen, will guide you through this innovative leveraged retirement strategy.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button 
                  onClick={scrollToForm}
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(228,181,72,0.4)] hover:shadow-[0_0_40px_rgba(228,181,72,0.6)] transition-all duration-300"
                >
                  See If You Qualify
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="hero" 
                  size="lg"
                  className="px-8 py-6 text-lg rounded-full"
                  onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch How It Works
                </Button>
              </div>
            </div>

            {/* Advisor Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="bg-white/10 backdrop-blur-xl border-white/15 p-6 rounded-2xl max-w-sm">
                <div className="relative mb-4">
                  <img
                    src={mariahLorenzenImg}
                    alt="Mariah Lorenzen"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-2 right-2 bg-accent text-primary px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    Kai-Zen Specialist
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Mariah Lorenzen</h3>
                <p className="text-accent text-sm mb-2">Head of Franchise Operations</p>
                <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  Chino Hills, CA
                </div>
                <p className="text-sm text-white/70">
                  Licensed financial professional with nearly 30 years of experience in real estate, mortgage lending, and retirement planning strategies.
                </p>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See Kai-Zen in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn how this innovative strategy can transform your retirement outlook.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <iframe
                src="https://www.youtube.com/embed/I5sTuxJXFDM?rel=0"
                title="Kai-Zen Strategy Explained"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              A New Approach to Retirement Planning
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Most Americans aren't saving enough for retirement. 401(k) contribution limits are restrictive, and traditional strategies often fall short. Kai-Zen offers a different path—using the same leveraged financing strategies that institutions have used for decades, now available to individuals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground mb-6">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See Your Potential
            </h2>
            <p className="text-lg text-muted-foreground">
              Use our interactive calculator to explore how Kai-Zen could work for you.
            </p>
          </div>
          
          <KaiZenCalculator />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              401(k) vs. Kai-Zen: Side-by-Side
            </h2>
            <p className="text-lg text-muted-foreground">
              See how Kai-Zen compares to traditional retirement savings strategies.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-accent/10 border-b border-white/10">
                    <th className="text-left py-4 px-6 text-foreground font-semibold">Feature</th>
                    <th className="text-left py-4 px-6 text-foreground font-semibold">Traditional 401(k)</th>
                    <th className="text-left py-4 px-6 text-accent font-semibold bg-accent/5">Kai-Zen Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-foreground font-medium">{row.feature}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-2">
                          {row.traditional.isAdvantage === true ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : row.traditional.isAdvantage === false ? (
                            <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-muted-foreground">{row.traditional.value}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 bg-accent/5">
                        <div className="flex items-start gap-2">
                          {row.kaizen.isAdvantage === true ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : row.kaizen.isAdvantage === false ? (
                            <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-foreground">{row.kaizen.value}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {comparisonData.map((row, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
                >
                  <h3 className="text-foreground font-semibold mb-3 text-center border-b border-white/10 pb-2">
                    {row.feature}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">401(k)</p>
                      <div className="flex items-start gap-2">
                        {row.traditional.isAdvantage === true ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : row.traditional.isAdvantage === false ? (
                          <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm text-muted-foreground">{row.traditional.value}</span>
                      </div>
                    </div>
                    <div className="space-y-1 bg-accent/5 -m-4 mt-0 p-4 pt-0 rounded-b-xl">
                      <p className="text-xs text-accent uppercase tracking-wide">Kai-Zen</p>
                      <div className="flex items-start gap-2">
                        {row.kaizen.isAdvantage === true ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : row.kaizen.isAdvantage === false ? (
                          <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm text-foreground">{row.kaizen.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Kai-Zen Works
            </h2>
            <p className="text-lg text-muted-foreground">
              A simple 4-step process to supercharge your retirement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Is Kai-Zen Right for You?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Kai-Zen is designed for individuals who want to maximize their retirement accumulation while also getting life insurance protection. You may be a great fit if you meet these qualifications:
                </p>
                <ul className="space-y-4">
                  {qualifications.map((qual, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold text-foreground">Living Benefits Included</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Unlike traditional retirement accounts, Kai-Zen includes living benefit riders that provide access to your death benefit if you experience:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Chronic illness
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Critical illness
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Terminal illness
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about Kai-Zen.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 px-6"
                >
                  <AccordionTrigger className="text-foreground hover:text-accent text-left">
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
      <section id="kai-zen-form" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Learn More?
              </h2>
              <p className="text-lg text-muted-foreground">
                Complete this quick form and Mariah will reach out to discuss your Kai-Zen options.
              </p>
            </div>
            
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 rounded-2xl">
              <MariahKaiZenForm />
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Kai-Zen® is a registered trademark. This is a hypothetical illustration and not a guarantee of future performance. Actual results will vary based on policy performance, contributions, and other factors. Life insurance products are issued by insurance companies and are subject to underwriting approval. Policy loans accrue interest and reduce the death benefit and cash value. Consult with a qualified financial professional to determine if Kai-Zen is appropriate for your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <img src={tfaLogo} alt="The Financial Architects" className="h-8" />
            </Link>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="tel:8883505396" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                (888) 350-5396
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} The Financial Architects. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MariahKaiZen;
