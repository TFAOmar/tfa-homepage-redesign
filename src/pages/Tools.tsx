import { useEffect } from "react";
import { TrendingUp, PiggyBank, Receipt, Target } from "lucide-react";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolCard from "@/components/tools/ToolCard";
import ToolsCTA from "@/components/tools/ToolsCTA";

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
];

export default function Tools() {
  useEffect(() => {
    document.title = "Financial Tools & Calculators | The Financial Architects";
  }, []);

  return (
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
  );
}
