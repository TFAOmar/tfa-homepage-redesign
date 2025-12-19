import { Link } from "react-router-dom";
import { ArrowLeft, FileText, DollarSign, Calculator, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TFATaxImpactCalculator from "@/components/tools/TFATaxImpactCalculator";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export default function TaxImpactCalculator() {
  return (
    <>
      <SEOHead
        title="Tax Impact Calculator"
        description="Estimate federal and state taxes on your retirement income. See how much you may keep after taxes and plan for a tax-efficient retirement."
        canonical={`${siteConfig.url}/tools/tax-impact-calculator`}
        keywords="retirement tax calculator, tax impact estimator, federal tax calculator, state tax retirement, after-tax income"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Tax Impact Calculator | The Financial Architects",
          "Estimate federal and state taxes on your retirement income. See how much you may keep after taxes and plan for a tax-efficient retirement.",
          `${siteConfig.url}/tools/tax-impact-calculator`
        ),
        generateWebApplicationSchema(
          "Tax Impact Calculator",
          "Estimate federal and state taxes on your retirement income. See how much you may keep after taxes and plan for a tax-efficient retirement.",
          `${siteConfig.url}/tools/tax-impact-calculator`
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "Tax Impact Calculator", url: `${siteConfig.url}/tools/tax-impact-calculator` }
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
                Tax Impact Calculator
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Estimate how much of your retirement income may go to federal and state taxes — 
                and how much you could have left each month.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TFATaxImpactCalculator />
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
                  Tax-Efficient Retirement Planning
                </h2>
                <p className="text-white/70">
                  Understanding your tax situation helps you keep more of what you've earned.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Federal Tax Brackets
                  </h3>
                  <p className="text-sm text-white/70">
                    Your federal taxes are calculated using progressive tax brackets, meaning 
                    different portions of your income are taxed at different rates.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    State Taxes Vary
                  </h3>
                  <p className="text-sm text-white/70">
                    Some states have no income tax, while others can take a significant portion 
                    of your retirement income. Location matters.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Social Security Taxation
                  </h3>
                  <p className="text-sm text-white/70">
                    Depending on your total income, up to 85% of your Social Security benefits 
                    may be subject to federal income tax.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Tax-Efficient Strategies
                  </h3>
                  <p className="text-sm text-white/70">
                    Strategic withdrawal order from different account types can help minimize 
                    your overall tax burden in retirement.
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
                      This calculator provides estimates using simplified federal and state 
                      assumptions. It's for educational purposes only and is not tax advice. 
                      Actual taxes will depend on your specific situation, deductions, and 
                      applicable tax law. Consult with a qualified tax professional before 
                      making any tax-related decisions.
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
                Ready to Optimize Your Tax Strategy?
              </h2>
              <p className="text-white/70 mb-8">
                Our advisors can help you develop a tax-efficient withdrawal strategy 
                to maximize your after-tax retirement income.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-consultation">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 py-6 text-lg">
                    Book a Consultation
                  </Button>
                </Link>
                <Link to="/services/tax-planning">
                  <Button variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                    Learn About Tax Planning
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