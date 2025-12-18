import { TrendingUp, PiggyBank, Receipt, Target, Landmark, Shield } from "lucide-react";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolCard from "@/components/tools/ToolCard";
import ToolsCTA from "@/components/tools/ToolsCTA";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const tools = [
  {
    icon: TrendingUp,
    title: "Compound Growth Calculator",
    description: "Estimate how your savings and contributions may grow over time through the power of compound interest.",
    link: "/tools/compound-growth-calculator",
  },
  {
    icon: PiggyBank,
    title: "Retirement Income Calculator",
    description: "See how much monthly income your savings, Social Security, and pensions may provide in retirement — and whether you're on track.",
    link: "/tools/retirement-income-calculator",
  },
  {
    icon: Receipt,
    title: "Tax Impact Calculator",
    description: "Estimate federal and state tax implications on your retirement income and see how much you may keep after taxes.",
    link: "/tools/tax-impact-calculator",
  },
  {
    icon: Target,
    title: "Required Savings Calculator",
    description: "Find out how much you may need to save each month, each year, or as a lump sum today to reach a specific future financial goal.",
    link: "/tools/required-savings-calculator",
  },
  {
    icon: Landmark,
    title: "Kai-Zen Retirement Calculator",
    description: "Estimate potential tax-free retirement distributions using the Kai-Zen leveraged life insurance strategy.",
    link: "/tools/kai-zen-calculator",
  },
  {
    icon: Shield,
    title: "Guaranteed Income Calculator",
    description: "Estimate guaranteed lifetime income from a fixed index annuity, or calculate the premium needed for your desired retirement income.",
    link: "/tools/guaranteed-income-calculator",
  },
];

export default function Tools() {
  return (
    <>
      <SEOHead
        title="Financial Calculators & Planning Tools"
        description="Free retirement calculators and financial planning tools. Estimate compound growth, retirement income, tax impact, required savings, and more."
        canonical={`${siteConfig.url}/tools`}
        keywords="retirement calculator, compound growth calculator, tax impact calculator, financial planning tools, retirement income estimator"
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Financial Calculators & Planning Tools | The Financial Architects",
          "Free retirement calculators and financial planning tools. Estimate compound growth, retirement income, tax impact, required savings, and more.",
          `${siteConfig.url}/tools`
        ),
        generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` }
        ])
      ]} />
      <div className="min-h-screen">
      <ToolsHero />

      {/* Tools Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section intro */}
          <div className="max-w-2xl mx-auto text-center mb-14 animate-fade-in">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
              Planning Resources
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Explore Our Calculators
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              These tools offer clear, educational estimates to help you make informed decisions. For personalized recommendations, connect with a TFA advisor.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {tools.map((tool, index) => (
              <div
                key={tool.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ToolCard
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  link={tool.link}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

        <ToolsCTA />
      </div>
    </>
  );
}
