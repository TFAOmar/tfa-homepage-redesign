import { ArrowLeft, Heart, Shield, TrendingUp, Clock, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import { Button } from "@/components/ui/button";

const FinalExpenseQuote = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Guaranteed Premiums",
      description: "Monthly premiums can never increase. Lock in your rate for life.",
    },
    {
      icon: Heart,
      title: "No Medical Exam",
      description: "No physical or medical exam is necessary. Simple health questions only.",
    },
    {
      icon: TrendingUp,
      title: "Guaranteed Death Benefit",
      description: "Death benefits are guaranteed never to decrease. Coverage that lasts.",
    },
    {
      icon: Clock,
      title: "Lifetime Coverage",
      description: "The policy cannot expire at any age. Protection that lasts your entire life.",
    },
  ];

  const planOptions = [
    {
      step: "1",
      title: "Level Benefit Plan",
      description: "Best rates and full coverage from day one. Qualify by answering 'no' to all health questions.",
      details: ["100% death benefit immediately", "Lowest premium rates", "Best option for healthy clients"],
    },
    {
      step: "2",
      title: "Graded Benefit Plan",
      description: "Medium option for clients with some health conditions. Partial coverage builds over time.",
      details: ["Year 1: 25-40% payout", "Year 2: 50-75% payout", "Full coverage after year 2"],
    },
    {
      step: "3",
      title: "Modified/Guaranteed Plan",
      description: "Highest risk option for recent serious health issues (heart attack, stroke, cancer).",
      details: ["Return of premium first 2 years", "Guaranteed acceptance available", "No health questions on some plans"],
    },
  ];

  return (
    <>
      <SEOHead
        title="Final Expense Quote Tool | TFA Financial Advisors"
        description="Get instant Final Expense insurance quotes for your clients. Simple, fast quoting tool for TFA agents."
        keywords="final expense insurance, burial insurance, funeral insurance, life insurance quote, agent tools"
      />
      <JsonLd data={generateWebPageSchema(
        "Final Expense Quote Tool",
        "Agent tool for generating Final Expense insurance quotes",
        `${siteConfig.url}/tools/final-expense-quote`
      )} />
      <JsonLd data={generateWebApplicationSchema(
        "Final Expense Quote Tool",
        "Generate instant Final Expense insurance quotes for clients",
        `${siteConfig.url}/tools/final-expense-quote`
      )} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Final Expense Quote Tool", url: `${siteConfig.url}/tools/final-expense-quote` },
      ])} />

      <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-primary">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tools
              </Link>

              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
                Agent Quote Tool
              </p>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Final Expense Quote Tool
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Quickly generate Final Expense insurance quotes for your clients. 
                Enter client details below to get instant quotes from multiple carriers.
              </p>
            </div>
          </div>
        </section>

        {/* Iframe Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                <iframe
                  style={{ border: "none", height: "800px", width: "100%" }}
                  src="https://insurancetoolkits.com/fex/lite-form/?token=q1kl93CCvtQ4wSGpighrgxo222Tzg8_9DMGKux4K"
                  title="Final Expense Quote Tool"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-16 md:py-24 bg-navy/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Key Benefits of Final Expense Insurance
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Help your clients understand the guaranteed protections that come with Final Expense coverage.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/20 rounded-lg shrink-0">
                        <benefit.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-white/70">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Plan Options Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Three Plan Options Available
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Match your clients with the right coverage based on their health situation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {planOptions.map((plan, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-navy font-bold mb-4">
                      {plan.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {plan.title}
                    </h3>
                    <p className="text-white/70 mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Terminology Section */}
        <section className="py-12 md:py-16 bg-navy/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg shrink-0">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      What's the Difference Between "Burial Insurance," "Final Expense Insurance," and "Funeral Insurance"?
                    </h3>
                    <p className="text-white/80">
                      <strong className="text-white">They're all the same product with different names.</strong> These terms all refer to simplified whole life insurance policies designed to cover end-of-life expenses such as funeral costs, medical bills, and other final debts. The coverage typically ranges from $5,000 to $50,000 and features simplified underwriting for easier approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Important Disclosure
                    </h3>
                    <p className="text-white/70 text-sm">
                      This quote tool provides estimates for educational purposes only. Actual rates and coverage will vary based on age, health status, and carrier underwriting guidelines. All quotes are subject to underwriting approval. Consult with a licensed insurance professional for personalized guidance. Coverage availability may vary by state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-navy/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need Help Finding the Right Plan?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Our agents are trained to match clients with the best Final Expense coverage for their health situation and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-navy font-semibold">
                  <Link to="/book-consultation">Book a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/services/insurance-services">Learn About Life Insurance</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FinalExpenseQuote;
