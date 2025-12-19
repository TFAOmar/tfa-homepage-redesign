import { Link } from "react-router-dom";
import { ArrowLeft, PiggyBank, TrendingUp, Calendar, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TFARetirementIncomeCalculator from "@/components/tools/TFARetirementIncomeCalculator";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export default function RetirementIncomeCalculator() {
  return (
    <>
      <SEOHead
        title="Retirement Income Calculator"
        description="Estimate your monthly retirement income from savings, Social Security, and pensions. See if you're on track for the retirement lifestyle you want."
        canonical={`${siteConfig.url}/tools/retirement-income-calculator`}
        keywords="retirement income calculator, retirement planning, Social Security estimator, pension calculator, monthly retirement income"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Retirement Income Calculator | The Financial Architects",
          "Estimate your monthly retirement income from savings, Social Security, and pensions. See if you're on track for the retirement lifestyle you want.",
          `${siteConfig.url}/tools/retirement-income-calculator`
        ),
        generateWebApplicationSchema(
          "Retirement Income Calculator",
          "Estimate your monthly retirement income from savings, Social Security, and pensions. See if you're on track for the retirement lifestyle you want.",
          `${siteConfig.url}/tools/retirement-income-calculator`
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "Retirement Income Calculator", url: `${siteConfig.url}/tools/retirement-income-calculator` }
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
                Retirement Income Calculator
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Estimate your future monthly retirement income using your savings, Social Security, 
                and pension benefits — then see if you're on track for the retirement you want.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TFARetirementIncomeCalculator />
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
                  Planning for Retirement Income
                </h2>
                <p className="text-white/70">
                  A well-planned retirement combines multiple income sources for financial security.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <PiggyBank className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Personal Savings
                  </h3>
                  <p className="text-sm text-white/70">
                    Your 401(k), IRA, and other retirement accounts form the foundation of your 
                    retirement income that you control.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Social Security
                  </h3>
                  <p className="text-sm text-white/70">
                    Social Security provides a guaranteed baseline of income, with benefits 
                    that are inflation-adjusted and last for life.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Pension Benefits
                  </h3>
                  <p className="text-sm text-white/70">
                    If you have a pension, it provides another layer of guaranteed income 
                    throughout your retirement years.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Filling the Gap
                  </h3>
                  <p className="text-sm text-white/70">
                    Understanding your income gap helps you plan ahead and make adjustments 
                    to reach your retirement goals.
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
                      This calculator provides estimates for educational purposes only. Actual results 
                      will depend on market performance, tax rates, inflation, and your specific situation. 
                      Social Security benefits are subject to change based on legislation. Consult with a 
                      licensed financial professional before making any retirement decisions.
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
                Ready to Plan Your Retirement?
              </h2>
              <p className="text-white/70 mb-8">
                Our advisors can help you create a comprehensive retirement income strategy 
                tailored to your unique goals and situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-consultation">
                  <Button className="btn-primary-cta px-8 py-6 text-lg">
                    Book a Consultation
                  </Button>
                </Link>
                <Link to="/services/income-planning">
                  <Button variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                    Learn About Income Planning
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