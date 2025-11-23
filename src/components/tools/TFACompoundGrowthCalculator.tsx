import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, PiggyBank } from "lucide-react";

interface CalculatorInputs {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  annualRate: number;
  compoundingFrequency: number;
  contributionTiming: "beginning" | "end";
}

interface CalculationResults {
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  yearlyData: { year: number; balance: number }[];
}

const TFACompoundGrowthCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialInvestment: 10000,
    monthlyContribution: 250,
    years: 20,
    annualRate: 7,
    compoundingFrequency: 12, // Monthly
    contributionTiming: "end",
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (inputs.initialInvestment < 0) {
      newErrors.initialInvestment = "Must be 0 or greater";
    }
    if (inputs.monthlyContribution < 0) {
      newErrors.monthlyContribution = "Must be 0 or greater";
    }
    if (inputs.years < 1 || inputs.years > 50) {
      newErrors.years = "Must be between 1 and 50";
    }
    if (inputs.annualRate < 0 || inputs.annualRate > 20) {
      newErrors.annualRate = "Must be between 0 and 20";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCompoundGrowth = () => {
    if (!validateInputs()) return;

    const P = inputs.initialInvestment;
    const PMT = inputs.monthlyContribution;
    const r = inputs.annualRate / 100;
    const n = inputs.compoundingFrequency;
    const t = inputs.years;

    // Calculate yearly balances for chart
    const yearlyData: { year: number; balance: number }[] = [];
    
    for (let year = 0; year <= t; year++) {
      const periods = n * year;
      const principalGrowth = P * Math.pow(1 + r / n, periods);
      
      // Adjust monthly contribution to compounding frequency
      const adjustedPMT = PMT * (12 / n);
      
      let contributionsGrowth = 0;
      if (periods > 0) {
        contributionsGrowth = adjustedPMT * ((Math.pow(1 + r / n, periods) - 1) / (r / n));
        
        // If contributing at the beginning, multiply by (1 + r/n)
        if (inputs.contributionTiming === "beginning") {
          contributionsGrowth *= (1 + r / n);
        }
      }
      
      const balance = principalGrowth + contributionsGrowth;
      yearlyData.push({ year, balance: Math.round(balance * 100) / 100 });
    }

    const finalBalance = yearlyData[yearlyData.length - 1].balance;
    const totalContributions = P + (PMT * 12 * t);
    const totalGrowth = finalBalance - totalContributions;

    setResults({
      finalBalance,
      totalContributions,
      totalGrowth,
      yearlyData,
    });
  };

  const handleReset = () => {
    setInputs({
      initialInvestment: 10000,
      monthlyContribution: 250,
      years: 20,
      annualRate: 7,
      compoundingFrequency: 12,
      contributionTiming: "end",
    });
    setResults(null);
    setErrors({});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Inputs Section */}
        <div className="animate-fade-in">
          <Card className="p-5 lg:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-foreground">Calculator Inputs</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="initial" className="text-sm md:text-base mb-2 block text-foreground/80">
                  Initial Investment Amount ($)
                </Label>
                <Input
                  id="initial"
                  type="number"
                  min="0"
                  value={inputs.initialInvestment}
                  onChange={(e) =>
                    setInputs({ ...inputs, initialInvestment: Number(e.target.value) })
                  }
                  className="h-12 bg-white/5 border-white/15 rounded-xl text-foreground placeholder:text-foreground/40 focus-visible:ring-gold focus-visible:ring-2 focus-visible:border-gold focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-gold/40 transition-all"
                  placeholder="10,000"
                />
                {errors.initialInvestment && (
                  <p className="text-destructive text-xs mt-1.5">{errors.initialInvestment}</p>
                )}
              </div>

              <div>
                <Label htmlFor="monthly" className="text-sm md:text-base mb-2 block text-foreground/80">
                  Monthly Contribution ($)
                </Label>
                <Input
                  id="monthly"
                  type="number"
                  min="0"
                  value={inputs.monthlyContribution}
                  onChange={(e) =>
                    setInputs({ ...inputs, monthlyContribution: Number(e.target.value) })
                  }
                  className="h-12 bg-white/5 border-white/15 rounded-xl text-foreground placeholder:text-foreground/40 focus-visible:ring-gold focus-visible:ring-2 focus-visible:border-gold focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-gold/40 transition-all"
                  placeholder="250"
                />
                {errors.monthlyContribution && (
                  <p className="text-destructive text-xs mt-1.5">{errors.monthlyContribution}</p>
                )}
              </div>

              <div>
                <Label htmlFor="years" className="text-sm md:text-base mb-2 block text-foreground/80">
                  Length of Time (Years)
                </Label>
                <Input
                  id="years"
                  type="number"
                  min="1"
                  max="50"
                  value={inputs.years}
                  onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
                  className="h-12 bg-white/5 border-white/15 rounded-xl text-foreground placeholder:text-foreground/40 focus-visible:ring-gold focus-visible:ring-2 focus-visible:border-gold focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-gold/40 transition-all"
                  placeholder="20"
                />
                {errors.years && (
                  <p className="text-destructive text-xs mt-1.5">{errors.years}</p>
                )}
              </div>

              <div>
                <Label htmlFor="rate" className="text-sm md:text-base mb-2 block text-foreground/80">
                  Estimated Annual Rate of Return (%)
                </Label>
                <Input
                  id="rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={inputs.annualRate}
                  onChange={(e) => setInputs({ ...inputs, annualRate: Number(e.target.value) })}
                  className="h-12 bg-white/5 border-white/15 rounded-xl text-foreground placeholder:text-foreground/40 focus-visible:ring-gold focus-visible:ring-2 focus-visible:border-gold focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-gold/40 transition-all"
                  placeholder="7.0"
                />
                {errors.annualRate && (
                  <p className="text-destructive text-xs mt-1.5">{errors.annualRate}</p>
                )}
              </div>

              <div>
                <Label htmlFor="frequency" className="text-sm md:text-base mb-2 block text-foreground/80">
                  Compounding Frequency
                </Label>
                <Select
                  value={inputs.compoundingFrequency.toString()}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, compoundingFrequency: Number(value) })
                  }
                >
                  <SelectTrigger id="frequency" className="h-12 bg-white/5 border-white/15 rounded-xl text-foreground focus:ring-gold focus:ring-2 focus:border-gold transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md border-white/20">
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semiannually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm md:text-base mb-3 block text-foreground/80">Contribution Timing</Label>
                <RadioGroup
                  value={inputs.contributionTiming}
                  onValueChange={(value: "beginning" | "end") =>
                    setInputs({ ...inputs, contributionTiming: value })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="beginning" id="beginning" className="border-white/30" />
                    <Label htmlFor="beginning" className="font-normal cursor-pointer text-sm text-foreground/80">
                      Contribute at the beginning of each period
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="end" id="end" className="border-white/30" />
                    <Label htmlFor="end" className="font-normal cursor-pointer text-sm text-foreground/80">
                      Contribute at the end of each period
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-foreground/60 mt-2 leading-relaxed">
                  Beginning-of-period contributions compound slightly more over time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  onClick={calculateCompoundGrowth}
                  className="flex-1 h-12 rounded-full bg-gold hover:bg-gold/90 text-navy font-semibold hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
                  disabled={Object.keys(errors).length > 0}
                >
                  Calculate Growth
                </Button>
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="h-12 px-6 rounded-full border border-white/20 text-foreground/70 hover:bg-white/5 hover:text-foreground transition-all"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6 animate-fade-in">
          {results ? (
            <Card className="p-5 lg:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all duration-300">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-foreground">Your Results</h2>
              
              {/* Hero Result - Final Balance */}
              <div className="mb-8 p-6 lg:p-8 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl border border-gold/30">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm md:text-base text-foreground/70">Final Balance</p>
                  <DollarSign className="w-7 h-7 text-gold" />
                </div>
                <p className="text-3xl md:text-5xl font-bold text-gold mb-4">
                  {formatCurrency(results.finalBalance)}
                </p>
                <div className="h-px bg-gradient-to-r from-gold/50 to-transparent mb-4"></div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs md:text-sm text-foreground/60 mb-1">You contributed</p>
                      <p className="text-xl md:text-2xl font-semibold text-foreground/90">
                        {formatCurrency(results.totalContributions)}
                      </p>
                    </div>
                    <PiggyBank className="w-5 h-5 text-foreground/40" />
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs md:text-sm text-foreground/60 mb-1">Growth over time</p>
                      <p className="text-xl md:text-2xl font-semibold text-gold">
                        {formatCurrency(results.totalGrowth)}
                      </p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-gold/70" />
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-8 p-6 bg-white/[0.02] rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold mb-5 text-foreground">Growth Over Time</h3>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="year"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        label={{ value: "Years", position: "insideBottom", offset: -5, fill: "rgba(255,255,255,0.6)" }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                          border: "1px solid rgba(212,175,55,0.3)",
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                        labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                        formatter={(value: number) => [formatCurrency(value), "Balance"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="rgb(212,175,55)"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Breakdown Summary */}
              <div className="mt-8 p-6 bg-white/[0.02] rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-sm text-foreground/60">Your contributions</span>
                    <span className="text-base font-semibold text-foreground/90">
                      {formatCurrency(results.totalContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-sm text-foreground/60">Compound growth</span>
                    <span className="text-base font-semibold text-gold">
                      {formatCurrency(results.totalGrowth)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-medium text-foreground">Total value</span>
                    <span className="text-xl font-bold text-gold">
                      {formatCurrency(results.finalBalance)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Educational Disclaimer & CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs md:text-sm text-foreground/60 mb-5 leading-relaxed">
                  This calculator is for illustration only and does not guarantee any specific
                  return. Actual results will vary based on market performance, fees, and your
                  unique situation. Please consult with a qualified financial advisor.
                </p>
                <Button
                  className="w-full h-12 rounded-full bg-navy hover:bg-navy/90 text-white font-semibold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,32,63,0.3)] transition-all duration-300"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Talk to an Advisor About Your Plan
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-10 lg:p-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
                <TrendingUp className="w-8 h-8 text-gold" />
              </div>
              <p className="text-foreground/60 text-sm md:text-base">
                Enter your information and click Calculate to see your potential growth.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TFACompoundGrowthCalculator;
