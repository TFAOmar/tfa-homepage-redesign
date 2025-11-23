import { Calculator } from "lucide-react";
import TFACompoundGrowthCalculator from "@/components/tools/TFACompoundGrowthCalculator";

const CompoundGrowthCalculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Header */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-20 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
              <Calculator className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Compound Growth Calculator
            </h1>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
              See how consistent saving and compounding growth can impact your financial future
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-20">
          <TFACompoundGrowthCalculator />
        </div>
      </section>

      {/* Additional Educational Content */}
      <section className="py-16 lg:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4 lg:px-20 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Understanding Compound Growth
            </h2>
            <p className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Compound growth is often called "the eighth wonder of the world" for good reason.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl font-semibold text-foreground">What is Compounding?</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                Compounding occurs when your investment earnings are reinvested to generate their
                own earnings. Over time, this creates exponential growth rather than linear growth.
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Why Start Early?</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                The earlier you start, the more time your money has to compound. Even small,
                consistent contributions can grow significantly over decades.
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl font-semibold text-foreground">The Power of Consistency</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                Regular monthly contributions, combined with compound growth, can turn modest
                savings into substantial wealth over time.
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Important Considerations</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
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
