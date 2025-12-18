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
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        <main className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          {/* Page Header */}
          <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              Required Savings to Hit Your Goal
            </h1>
            <div className="h-1.5 w-16 bg-primary rounded-full mx-auto mb-6" />
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Find out how much you may need to save regularly to reach a specific future goal amount by your target date or retirement age.
            </p>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use this calculator to estimate the monthly or lump-sum savings needed based on your time horizon and expected rate of return. For a customized strategy, connect with a TFA advisor.
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <div className="max-w-7xl mx-auto">
            <TFARequiredSavingsCalculator />
          </div>
        </main>
      </div>
    </>
  );
}
