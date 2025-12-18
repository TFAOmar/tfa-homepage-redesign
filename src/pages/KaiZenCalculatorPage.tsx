import { TrendingUp } from "lucide-react";
import ToolsCTA from "@/components/tools/ToolsCTA";
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
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4" />
              Leveraged Life Insurance Strategy
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Kai-Zen Retirement Calculator
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Estimate potential tax-free retirement distributions using the Kai-Zen leveraged life insurance strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Educational Context */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4">How Kai-Zen Works</h2>
              <p className="text-muted-foreground mb-4">
                Kai-Zen® uses institutional-style leverage to amplify your retirement savings. You contribute for 5 years, 
                a participating bank provides matching premium financing, and your policy grows through indexed crediting strategies.
              </p>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  No credit check or personal guarantee
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  No out-of-pocket interest payments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Tax-free distributions in retirement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Life insurance protection included
                </li>
              </ul>
            </div>

            {/* Calculator */}
            <KaiZenCalculator />
          </div>
        </div>
      </section>

        <ToolsCTA />
      </div>
    </>
  );
}
