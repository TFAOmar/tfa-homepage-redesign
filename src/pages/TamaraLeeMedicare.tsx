import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Shield,
  Heart,
  DollarSign,
  Clock,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Pill,
  Building2,
  Stethoscope,
  MapPin,
  Award,
} from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import tamaraLeeImg from "@/assets/advisors/tamara-lee.jpg";
import { TamaraLeeMedicareForm } from "@/components/medicare/TamaraLeeMedicareForm";

const stats = [
  { value: "65", label: "Medicare Eligibility Age" },
  { value: "$315K", label: "Avg. Healthcare Costs in Retirement" },
  { value: "70%", label: "Will Need Long-Term Care" },
  { value: "11+", label: "Years Experience" },
];

const whyMedicareMatters = [
  {
    icon: Calendar,
    title: "Enrollment Complexity",
    description:
      "Initial enrollment, special enrollment periods, and late enrollment penalties can be confusing. Missing deadlines can cost you money for life.",
  },
  {
    icon: Shield,
    title: "Coverage Gaps",
    description:
      "Original Medicare doesn't cover everything—dental, vision, hearing, and long-term care often require additional planning.",
  },
  {
    icon: DollarSign,
    title: "Cost Optimization",
    description:
      "IRMAA surcharges, Part D donut holes, and plan premiums vary widely. The right strategy can save thousands annually.",
  },
];

const medicareParts = [
  {
    part: "A",
    title: "Hospital Insurance",
    description: "Covers inpatient hospital stays, skilled nursing, hospice, and some home health care.",
    icon: Building2,
  },
  {
    part: "B",
    title: "Medical Insurance",
    description: "Covers doctor visits, outpatient care, preventive services, and medical equipment.",
    icon: Stethoscope,
  },
  {
    part: "C",
    title: "Medicare Advantage",
    description: "Private plan alternative that bundles Parts A, B, and usually D with additional benefits.",
    icon: Shield,
  },
  {
    part: "D",
    title: "Prescription Drugs",
    description: "Covers prescription medications through private insurance plans approved by Medicare.",
    icon: Pill,
  },
];

const specialties = [
  "Medicare Enrollment & Guidance",
  "Medicare Advantage vs. Supplement Comparison",
  "Part D Prescription Drug Planning",
  "Long-Term Care Planning",
  "IRMAA Avoidance Strategies",
  "Retirement Healthcare Integration",
];

const processSteps = [
  {
    step: "01",
    title: "Health Assessment",
    description:
      "We review your health needs, current medications, and preferred doctors to understand your unique situation.",
  },
  {
    step: "02",
    title: "Plan Comparison",
    description:
      "We compare Medicare options side-by-side, showing you exactly what each plan covers and costs.",
  },
  {
    step: "03",
    title: "Enrollment Support",
    description:
      "We guide you through enrollment and provide ongoing support as your needs change.",
  },
];

const faqs = [
  {
    question: "When should I enroll in Medicare?",
    answer:
      "Your Initial Enrollment Period (IEP) begins 3 months before your 65th birthday and ends 3 months after. If you're still working with employer coverage, you may have a Special Enrollment Period when you retire. Missing these windows can result in permanent late enrollment penalties.",
  },
  {
    question: "Medicare Advantage vs. Medigap—which is better?",
    answer:
      "It depends on your priorities. Medicare Advantage plans often have lower premiums and include extra benefits like dental and vision, but have network restrictions. Medigap (Supplement) plans have higher premiums but offer more freedom to see any doctor and more predictable costs. We'll help you evaluate based on your specific situation.",
  },
  {
    question: "Does Medicare cover long-term care?",
    answer:
      "Medicare provides very limited coverage for skilled nursing care (up to 100 days) but does NOT cover custodial long-term care. Planning for long-term care costs requires separate strategies, which we can help you explore.",
  },
  {
    question: "What is IRMAA and how can I avoid it?",
    answer:
      "IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge on Medicare Part B and Part D premiums for higher-income beneficiaries. It's based on your tax return from two years prior. Strategic retirement income planning can help minimize or avoid these surcharges.",
  },
  {
    question: "Can Tamara help if I'm still working at 65?",
    answer:
      "Absolutely! If you have employer coverage, you may be able to delay Medicare Part B without penalty. We'll help you understand how your employer coverage coordinates with Medicare and the best time to make the transition.",
  },
];

const TamaraLeeMedicare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    document.getElementById("medicare-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10" />
          </Link>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Your Medicare Specialist: Tamara Lee</span>
          </div>
          <a
            href="tel:+18883505396"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span className="font-semibold">(888) 350-5396</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary via-navy to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                Medicare Specialist
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Navigate Medicare with{" "}
                <span className="text-accent">Confidence</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Your dedicated Medicare specialist, Tamara Lee, will guide you through
                enrollment, plan selection, and ongoing coverage decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full"
                >
                  Get Medicare Help
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  className="px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <a href="tel:+18883505396">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Advisor Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <img
                      src={tamaraLeeImg}
                      alt="Tamara Lee"
                      className="w-40 h-40 rounded-full object-cover border-4 border-accent"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold">
                      Medicare Expert
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Tamara Lee</h2>
                  <p className="text-accent font-medium mb-4">
                    Medicare & Retirement Healthcare Specialist
                  </p>
                  <div className="flex items-center gap-2 text-white/70 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>Claremont, CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 mb-6">
                    <Award className="h-4 w-4" />
                    <span>11+ Years Experience</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                      Medicare Planning
                    </span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                      Long-Term Care
                    </span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                      Healthcare Strategy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Medicare Planning Matters */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Medicare Planning Matters
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Medicare decisions are some of the most important financial choices you'll
              make in retirement. The right guidance can save you thousands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyMedicareMatters.map((item) => (
              <Card
                key={item.title}
                className="bg-card border-border hover:border-accent/50 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medicare Parts Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Understanding Medicare Parts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Medicare has different parts that cover different services. Let's break it down.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicareParts.map((part) => (
              <Card
                key={part.part}
                className="bg-card border-border hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-accent/10">
                    {part.part}
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <part.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Part {part.part}: {part.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{part.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tamara's Specialties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How Tamara Can Help You
              </h2>
              <p className="text-muted-foreground mb-8">
                With over 11 years of experience in healthcare planning, Tamara specializes
                in helping clients navigate the complexities of Medicare and retirement
                healthcare decisions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl p-8">
                <blockquote className="text-lg text-foreground italic mb-6">
                  "My goal is to make Medicare simple. I believe everyone deserves
                  clear guidance on their healthcare options—without the confusion
                  or high-pressure sales tactics."
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={tamaraLeeImg}
                    alt="Tamara Lee"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-foreground">Tamara Lee</div>
                    <div className="text-muted-foreground text-sm">
                      Medicare Specialist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Working with Tamara
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, no-pressure process to get the Medicare guidance you deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-accent/20" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-accent">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Medicare Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get answers to the questions Tamara hears most often.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card border border-border rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="medicare-form" className="py-20 bg-gradient-to-b from-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Your Free Medicare Consultation
              </h2>
              <p className="text-white/80">
                Fill out the form below and Tamara will reach out within 24 hours to
                schedule your personalized Medicare review.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <TamaraLeeMedicareForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={tfaLogo} alt="The Financial Architects" className="h-8" />
              <span className="text-white/60 text-sm">
                © {new Date().getFullYear()} The Financial Architects
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="tel:+18883505396"
                className="text-white/80 hover:text-accent transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                (888) 350-5396
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-white/40 text-xs max-w-3xl mx-auto">
            <p className="mb-2">
              This is a solicitation for insurance. Tamara Lee is a licensed insurance
              agent. Medicare has neither reviewed nor endorsed this information.
            </p>
            <p>
              Not connected with or endorsed by the United States government or the
              federal Medicare program.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TamaraLeeMedicare;
