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
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Inputs Section */}
        <Card className="p-6 lg:p-8 bg-background/40 backdrop-blur-sm border-border/50">
          <div className="space-y-6">
            <div>
              <Label htmlFor="initial" className="text-sm font-medium mb-2 block">
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
                className="h-12"
              />
              {errors.initialInvestment && (
                <p className="text-destructive text-xs mt-1">{errors.initialInvestment}</p>
              )}
            </div>

            <div>
              <Label htmlFor="monthly" className="text-sm font-medium mb-2 block">
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
                className="h-12"
              />
              {errors.monthlyContribution && (
                <p className="text-destructive text-xs mt-1">{errors.monthlyContribution}</p>
              )}
            </div>

            <div>
              <Label htmlFor="years" className="text-sm font-medium mb-2 block">
                Length of Time (Years)
              </Label>
              <Input
                id="years"
                type="number"
                min="1"
                max="50"
                value={inputs.years}
                onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
                className="h-12"
              />
              {errors.years && (
                <p className="text-destructive text-xs mt-1">{errors.years}</p>
              )}
            </div>

            <div>
              <Label htmlFor="rate" className="text-sm font-medium mb-2 block">
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
                className="h-12"
              />
              {errors.annualRate && (
                <p className="text-destructive text-xs mt-1">{errors.annualRate}</p>
              )}
            </div>

            <div>
              <Label htmlFor="frequency" className="text-sm font-medium mb-2 block">
                Compounding Frequency
              </Label>
              <Select
                value={inputs.compoundingFrequency.toString()}
                onValueChange={(value) =>
                  setInputs({ ...inputs, compoundingFrequency: Number(value) })
                }
              >
                <SelectTrigger id="frequency" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semiannually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Contribution Timing</Label>
              <RadioGroup
                value={inputs.contributionTiming}
                onValueChange={(value: "beginning" | "end") =>
                  setInputs({ ...inputs, contributionTiming: value })
                }
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="beginning" id="beginning" />
                  <Label htmlFor="beginning" className="font-normal cursor-pointer">
                    Contribute at the beginning of each period
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="end" id="end" />
                  <Label htmlFor="end" className="font-normal cursor-pointer">
                    Contribute at the end of each period
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={calculateCompoundGrowth}
                className="flex-1 h-12 bg-gold hover:bg-gold/90 text-navy font-semibold"
                disabled={Object.keys(errors).length > 0}
              >
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-6"
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <div className="animate-fade-in space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-4">
                <Card className="p-6 bg-gradient-to-br from-gold/10 to-gold/5 backdrop-blur-sm border-gold/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Final Balance</p>
                      <p className="text-3xl lg:text-4xl font-bold text-foreground">
                        {formatCurrency(results.finalBalance)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-gold" />
                  </div>
                </Card>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="p-5 bg-background/40 backdrop-blur-sm border-border/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Contributions</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(results.totalContributions)}
                        </p>
                      </div>
                      <PiggyBank className="w-6 h-6 text-primary" />
                    </div>
                  </Card>

                  <Card className="p-5 bg-background/40 backdrop-blur-sm border-border/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Growth</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(results.totalGrowth)}
                        </p>
                      </div>
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </Card>
                </div>
              </div>

              {/* Chart */}
              <Card className="p-6 bg-background/40 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4">Growth Over Time</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="year"
                        stroke="hsl(var(--muted-foreground))"
                        label={{ value: "Years", position: "insideBottom", offset: -5 }}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [formatCurrency(value), "Balance"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Breakdown */}
              <Card className="p-6 bg-background/40 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4">Contribution vs Growth</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">You contributed:</span>
                    <span className="text-lg font-semibold">
                      {formatCurrency(results.totalContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Growth over time:</span>
                    <span className="text-lg font-semibold text-primary">
                      {formatCurrency(results.totalGrowth)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Final Balance:</span>
                      <span className="text-xl font-bold text-gold">
                        {formatCurrency(results.finalBalance)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Educational Disclaimer */}
              <Card className="p-6 bg-background/40 backdrop-blur-sm border-border/50">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  This calculator is for illustration only and does not guarantee any specific
                  return. Actual results will vary based on market performance, fees, and your
                  unique situation.
                </p>
                <Button
                  className="w-full h-12 bg-navy hover:bg-navy/90 text-white font-semibold"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Talk to an Advisor About Your Plan
                </Button>
              </Card>
            </div>
          ) : (
            <Card className="p-12 bg-background/40 backdrop-blur-sm border-border/50 text-center">
              <p className="text-muted-foreground">
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
