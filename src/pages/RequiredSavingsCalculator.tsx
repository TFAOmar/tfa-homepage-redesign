import TFARequiredSavingsCalculator from "@/components/tools/TFARequiredSavingsCalculator";
import { useEffect } from "react";

export default function RequiredSavingsCalculator() {
  useEffect(() => {
    document.title = "Required Savings to Hit Your Goal | The Financial Architects";
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        <main className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Required Savings to Hit Your Goal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Find out how much you may need to save regularly to reach a specific future goal amount by your target date or retirement age.
            </p>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
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
