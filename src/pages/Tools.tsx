import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, PiggyBank, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

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
];

export default function Tools() {
  useEffect(() => {
    document.title = "Financial Tools & Calculators | The Financial Architects";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <main className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Financial Tools & Calculators
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Plan, project, and better understand your financial future with our easy-to-use calculators built for families and individuals planning for retirement, investments, and tax efficiency.
          </p>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              These tools offer clear, educational estimates to help you make informed decisions. For personalized recommendations tailored to your situation, connect with a TFA advisor anytime.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40">
                  <tool.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>

              {/* Content */}
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 tracking-tight">
                {tool.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 min-h-[4.5rem]">
                {tool.description}
              </p>

              {/* CTA Button */}
              <Link to={tool.link} className="block">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-full py-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  Open Calculator
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto mt-16 md:mt-20 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Personalized Guidance?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our advisors can help you refine your financial strategy, stress-test your assumptions, and build a comprehensive plan tailored to your family's unique goals.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Talk to a TFA Advisor
              </Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            These calculators are for educational purposes only and do not constitute financial advice. Results are estimates based on the information provided and assumptions built into each tool. Actual outcomes may vary. Please consult with a licensed financial advisor before making investment or retirement decisions.
          </p>
        </div>
      </main>
    </div>
  );
}
