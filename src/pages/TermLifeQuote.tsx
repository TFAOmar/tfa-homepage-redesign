import { useEffect, useRef } from "react";
import { ArrowLeft, Shield, Clock, DollarSign, AlertCircle, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import { Button } from "@/components/ui/button";

const TermLifeQuote = () => {
  const quoteContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://quoter.quoteplicity.com/qp-widget/2128483199ca64cc538bc6ebacc39986";
    script.async = true;

    if (quoteContainerRef.current) {
      quoteContainerRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: "Affordable Premiums",
      description: "Term life offers the most coverage for the lowest cost — ideal for income replacement and family protection.",
    },
    {
      icon: Clock,
      title: "Flexible Term Lengths",
      description: "Choose 10, 15, 20, 25, or 30 year terms to match a mortgage, income earning years, or dependents' needs.",
    },
    {
      icon: Shield,
      title: "Level Death Benefit",
      description: "The death benefit stays level for the entire term. Beneficiaries receive tax-free proceeds.",
    },
    {
      icon: Users,
      title: "Convertible Options",
      description: "Many term policies can convert to permanent coverage later without new medical underwriting.",
    },
  ];

  const useCases = [
    {
      step: "1",
      title: "Income Replacement",
      description: "Replace lost income for a spouse and children during working years.",
      details: ["Cover 10-20x annual income", "Match term to retirement age", "Protect standard of living"],
    },
    {
      step: "2",
      title: "Mortgage Protection",
      description: "Ensure the family home is paid off if the primary earner passes away.",
      details: ["Match term to mortgage length", "Level coverage covers full balance", "Peace of mind for the family"],
    },
    {
      step: "3",
      title: "Business & Debt Coverage",
      description: "Cover business loans, key-person needs, or personal debts affordably.",
      details: ["Buy-sell agreement funding", "SBA loan collateral", "Estate liquidity"],
    },
  ];

  return (
    <>
      <SEOHead
        title="Term Life Quote Tool | TFA Financial Advisors"
        description="Get instant Term Life insurance quotes for your clients. Simple, fast quoting tool for TFA agents."
        keywords="term life insurance, life insurance quote, term life quote, agent tools"
      />
      <JsonLd data={generateWebPageSchema(
        "Term Life Quote Tool",
        "Agent tool for generating Term Life insurance quotes",
        `${siteConfig.url}/tools/term-life-quote`
      )} />
      <JsonLd data={generateWebApplicationSchema(
        "Term Life Quote Tool",
        "Generate instant Term Life insurance quotes for clients",
        `${siteConfig.url}/tools/term-life-quote`
      )} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Term Life Quote Tool", url: `${siteConfig.url}/tools/term-life-quote` },
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
                Term Life Quote Tool
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Quickly generate Term Life insurance quotes for your clients across multiple top-rated carriers.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Tool Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-4 md:p-6 border border-white/20 shadow-2xl">
                <div ref={quoteContainerRef} className="min-h-[600px]" />
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
                  Why Term Life Insurance
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Term life delivers the largest death benefit for the lowest premium — perfect for growing families and income earners.
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

        {/* Use Cases Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Common Use Cases
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Position term coverage around the client's biggest financial obligations.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {useCases.map((plan, index) => (
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
                      This quote tool provides estimates for educational purposes only. Actual rates and coverage will vary based on age, health status, tobacco use, and carrier underwriting guidelines. All quotes are subject to underwriting approval. Consult with a licensed insurance professional for personalized guidance. Coverage availability may vary by state.
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
                Need Help Structuring Coverage?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Our advisors can help match the right term length and face amount to your client's specific goals and budget.
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

export default TermLifeQuote;