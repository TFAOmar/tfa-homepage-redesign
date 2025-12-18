import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Shield, DollarSign, Heart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import KaiZenCalculator from "@/components/kaizen/KaiZenCalculator";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export default function KaiZenCalculatorPage() {
  return (
    <>
      <SEOHead
        title="Kai-Zen Retirement Calculator"
        description="Estimate potential tax-free retirement distributions using the Kai-Zen leveraged life insurance strategy. See how premium financing can boost your retirement."
        canonical={`${siteConfig.url}/tools/kai-zen-calculator`}
        keywords="Kai-Zen calculator, leveraged life insurance, tax-free retirement, premium financing calculator, retirement strategy"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Kai-Zen Retirement Calculator | The Financial Architects",
          "Estimate potential tax-free retirement distributions using the Kai-Zen leveraged life insurance strategy. See how premium financing can boost your retirement.",
          `${siteConfig.url}/tools/kai-zen-calculator`
        ),
        generateWebApplicationSchema(
          "Kai-Zen Retirement Calculator",
          "Estimate potential tax-free retirement distributions using the Kai-Zen leveraged life insurance strategy. See how premium financing can boost your retirement.",
          `${siteConfig.url}/tools/kai-zen-calculator`
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "Kai-Zen Calculator", url: `${siteConfig.url}/tools/kai-zen-calculator` }
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
                Leveraged Life Insurance Strategy
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Kai-Zen Retirement Calculator
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Estimate potential tax-free retirement distributions using the Kai-Zen leveraged 
                life insurance strategy. See how premium financing can amplify your retirement savings.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <KaiZenCalculator />
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
                  How Kai-Zen Works
                </h2>
                <p className="text-white/70">
                  Kai-Zen® uses institutional-style leverage to amplify your retirement savings potential.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Premium Financing
                  </h3>
                  <p className="text-sm text-white/70">
                    You contribute for 5 years, a participating bank provides matching premium 
                    financing with no credit check or personal guarantee required.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Tax-Free Distributions
                  </h3>
                  <p className="text-sm text-white/70">
                    Policy loans can be taken tax-free in retirement, providing income without 
                    increasing your tax burden.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Death Benefit Protection
                  </h3>
                  <p className="text-sm text-white/70">
                    Includes life insurance protection that passes tax-free to your beneficiaries, 
                    providing legacy planning benefits.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Living Benefits
                  </h3>
                  <p className="text-sm text-white/70">
                    Access a portion of your death benefit early for chronic or terminal illness, 
                    providing additional financial security.
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12 animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  The Kai-Zen Process
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                      1
                    </div>
                    <h4 className="font-medium text-white mb-2">Contribute for 5 Years</h4>
                    <p className="text-sm text-white/70">
                      Make annual contributions for 5 years. A bank provides matching premium financing.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                      2
                    </div>
                    <h4 className="font-medium text-white mb-2">Policy Grows</h4>
                    <p className="text-sm text-white/70">
                      Your policy grows through indexed crediting strategies with downside protection.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                      3
                    </div>
                    <h4 className="font-medium text-white mb-2">Tax-Free Income</h4>
                    <p className="text-sm text-white/70">
                      Access tax-free distributions in retirement through policy loans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 animate-fade-in">
                <div className="flex gap-4">
                  <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Important Disclosures</h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      This calculator provides hypothetical illustrations based on a 6.65% illustrated 
                      growth rate. Distributions begin at the later of age 65 or after the lender loan 
                      has been repaid. Guarantees are backed by the financial strength and claims-paying 
                      ability of the issuing insurance company. This is not a guarantee of future performance. 
                      Consult with a licensed financial professional for personalized advice.
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
                Ready to Explore Kai-Zen?
              </h2>
              <p className="text-white/70 mb-8">
                Our advisors can help you determine if Kai-Zen is right for your retirement 
                strategy and provide a personalized illustration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-consultation">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 py-6 text-lg">
                    Book a Consultation
                  </Button>
                </Link>
                <Link to="/kai-zen">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                    Learn More About Kai-Zen
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