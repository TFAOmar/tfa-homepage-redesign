import TFARetirementIncomeCalculator from "@/components/tools/TFARetirementIncomeCalculator";
import { useEffect } from "react";

export default function RetirementIncomeCalculator() {
  useEffect(() => {
    document.title = "Retirement Income Calculator | The Financial Architects";
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        <main className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Retirement Income Calculator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Estimate your future monthly retirement income using your savings, Social Security, and pension benefits — then see if you're on track.
            </p>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This tool provides an estimate only and is for educational purposes. Actual results will depend on market performance, tax rates, inflation, and your specific situation.
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <div className="max-w-7xl mx-auto">
            <TFARetirementIncomeCalculator />
          </div>
        </main>
      </div>
    </>
  );
}
