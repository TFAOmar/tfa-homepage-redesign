import { Link } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, Clock, PiggyBank, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TFARequiredSavingsCalculator from "@/components/tools/TFARequiredSavingsCalculator";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export default function RequiredSavingsCalculator() {
  return (
    <>
      <SEOHead
        title="Required Savings Calculator"
        description="Find out how much to save monthly, annually, or as a lump sum to reach your financial goals. Plan your path to retirement or any savings target."
        canonical={`${siteConfig.url}/tools/required-savings-calculator`}
        keywords="savings goal calculator, required savings, how much to save, retirement savings calculator, financial goal planner"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Required Savings Calculator | The Financial Architects",
          "Find out how much to save monthly, annually, or as a lump sum to reach your financial goals. Plan your path to retirement or any savings target.",
          `${siteConfig.url}/tools/required-savings-calculator`
        ),
        generateWebApplicationSchema(
          "Required Savings Calculator",
          "Find out how much to save monthly, annually, or as a lump sum to reach your financial goals. Plan your path to retirement or any savings target.",
          `${siteConfig.url}/tools/required-savings-calculator`
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "Required Savings Calculator", url: `${siteConfig.url}/tools/required-savings-calculator` }
        ])
      ]} />
      <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-primary">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Tools</span>
            </Link>

            <div className="max-w-3xl animate-fade-in">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
                Financial Planning Tool
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Required Savings Calculator
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Find out how much you need to save regularly to reach a specific future goal 
                amount by your target date or retirement age.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TFARequiredSavingsCalculator />
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-16 md:py-24 bg-navy/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
                  Understanding Your Options
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Reaching Your Financial Goals
                </h2>
                <p className="text-white/70">
                  A clear savings plan is the first step toward achieving your financial dreams.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Set Clear Goals
                  </h3>
                  <p className="text-sm text-white/70">
                    Whether it's retirement, a home, or education, defining a specific dollar 
                    amount and timeline makes your goal achievable.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Time is Your Ally
                  </h3>
                  <p className="text-sm text-white/70">
                    The more time you have, the less you need to save each month. Starting 
                    early dramatically reduces the required monthly contribution.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Growth Matters
                  </h3>
                  <p className="text-sm text-white/70">
                    Your expected rate of return significantly impacts how much you need to 
                    save. Higher returns mean lower required contributions.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <PiggyBank className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Consistency Wins
                  </h3>
                  <p className="text-sm text-white/70">
                    Regular, consistent contributions build wealth over time. Automating 
                    your savings helps ensure you stay on track.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 animate-fade-in">
                <div className="flex gap-4">
                  <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Important Disclosures</h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      This calculator provides estimates for educational purposes only. Actual 
                      investment returns will vary and are not guaranteed. This tool does not 
                      account for taxes, fees, or inflation. For a customized savings strategy, 
                      connect with one of our advisors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Saving for Your Goals?
              </h2>
              <p className="text-white/70 mb-8">
                Our advisors can help you create a personalized savings plan that fits 
                your budget and timeline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-consultation">
                  <Button className="btn-primary-cta px-8 py-6 text-lg">
                    Book a Consultation
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}