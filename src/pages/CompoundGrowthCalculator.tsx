import { Calculator } from "lucide-react";
import TFACompoundGrowthCalculator from "@/components/tools/TFACompoundGrowthCalculator";

const CompoundGrowthCalculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Header */}
      <section className="pt-16 md:pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              Compound Growth Calculator
            </h1>
            <div className="h-1.5 w-16 bg-primary rounded-full mx-auto mb-6" />
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              See how consistent saving and compounding growth can impact your financial future
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-20 max-w-7xl">
          <TFACompoundGrowthCalculator />
        </div>
      </section>

      {/* Additional Educational Content */}
      <section className="py-12 lg:py-16 bg-background/50">
        <div className="container mx-auto px-4 lg:px-20 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Understanding Compound Growth
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Compound growth is often called "the eighth wonder of the world" for good reason.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">What is Compounding?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compounding occurs when your investment earnings are reinvested to generate their
                own earnings. Over time, this creates exponential growth rather than linear growth.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Why Start Early?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The earlier you start, the more time your money has to compound. Even small,
                consistent contributions can grow significantly over decades.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">The Power of Consistency</h3>
              <p className="text-muted-foreground leading-relaxed">
                Regular monthly contributions, combined with compound growth, can turn modest
                savings into substantial wealth over time.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Important Considerations</h3>
              <p className="text-muted-foreground leading-relaxed">
                This calculator doesn't account for taxes, fees, or inflation. Real-world returns
                will vary. Talk to an advisor for personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompoundGrowthCalculator;
