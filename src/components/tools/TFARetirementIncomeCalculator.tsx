import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ArrowRight, TrendingUp, DollarSign, Calendar } from "lucide-react";

interface CalculationResults {
  savingsAtRetirement: number;
  monthlyFromSavings: number;
  totalMonthlyIncome: number;
  socialSecurity: number;
  pension: number;
  otherIncome: number;
  desiredIncome: number;
  gap: number;
  yearsToRetirement: number;
  yearsInRetirement: number;
}

export default function TFARetirementIncomeCalculator() {
  // Personal Timeline
  const [currentAge, setCurrentAge] = useState(40);
  const [retirementAge, setRetirementAge] = useState(67);
  const [incomeEndAge, setIncomeEndAge] = useState(90);

  // Savings & Growth
  const [currentSavings, setCurrentSavings] = useState(150000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [returnBeforeRetirement, setReturnBeforeRetirement] = useState(7);
  const [returnDuringRetirement, setReturnDuringRetirement] = useState(4);

  // Income Sources
  const [socialSecurity, setSocialSecurity] = useState(2000);
  const [pension, setPension] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);

  // Goal
  const [desiredIncome, setDesiredIncome] = useState(6000);

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (currentAge < 18 || currentAge > 80) {
      newErrors.currentAge = "Age must be between 18 and 80";
    }
    if (retirementAge <= currentAge || retirementAge > 80) {
      newErrors.retirementAge = "Must be greater than current age";
    }
    if (incomeEndAge <= retirementAge) {
      newErrors.incomeEndAge = "Must be greater than retirement age";
    }
    if (currentSavings < 0) {
      newErrors.currentSavings = "Cannot be negative";
    }
    if (monthlyContribution < 0) {
      newErrors.monthlyContribution = "Cannot be negative";
    }
    if (returnBeforeRetirement < 0 || returnBeforeRetirement > 15) {
      newErrors.returnBeforeRetirement = "Must be between 0 and 15%";
    }
    if (returnDuringRetirement < 0 || returnDuringRetirement > 10) {
      newErrors.returnDuringRetirement = "Must be between 0 and 10%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateRetirementIncome = () => {
    if (!validateInputs()) return;

    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = incomeEndAge - retirementAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthsInRetirement = yearsInRetirement * 12;

    // Future value of current savings
    const rateBeforeRetirement = returnBeforeRetirement / 100;
    const futureValueOfSavings = currentSavings * Math.pow(1 + rateBeforeRetirement, yearsToRetirement);

    // Future value of monthly contributions
    const monthlyRate = rateBeforeRetirement / 12;
    const futureValueOfContributions =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const savingsAtRetirement = futureValueOfSavings + futureValueOfContributions;

    // Monthly income from savings (using amortization formula)
    const retirementMonthlyRate = returnDuringRetirement / 100 / 12;
    let monthlyFromSavings = 0;

    if (retirementMonthlyRate > 0) {
      monthlyFromSavings =
        (savingsAtRetirement * retirementMonthlyRate * Math.pow(1 + retirementMonthlyRate, monthsInRetirement)) /
        (Math.pow(1 + retirementMonthlyRate, monthsInRetirement) - 1);
    } else {
      // If no return during retirement, simple division
      monthlyFromSavings = savingsAtRetirement / monthsInRetirement;
    }

    const totalMonthlyIncome = monthlyFromSavings + socialSecurity + pension + otherIncome;
    const gap = totalMonthlyIncome - desiredIncome;

    setResults({
      savingsAtRetirement,
      monthlyFromSavings,
      totalMonthlyIncome,
      socialSecurity,
      pension,
      otherIncome,
      desiredIncome,
      gap,
      yearsToRetirement,
      yearsInRetirement,
    });
  };

  const handleReset = () => {
    setCurrentAge(40);
    setRetirementAge(67);
    setIncomeEndAge(90);
    setCurrentSavings(150000);
    setMonthlyContribution(500);
    setReturnBeforeRetirement(7);
    setReturnDuringRetirement(4);
    setSocialSecurity(2000);
    setPension(0);
    setOtherIncome(0);
    setDesiredIncome(6000);
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

  const chartData = results
    ? [
        { name: "From Savings", value: results.monthlyFromSavings, color: "hsl(var(--primary))" },
        { name: "Social Security", value: results.socialSecurity, color: "hsl(var(--accent))" },
        { name: "Pension", value: results.pension, color: "hsl(var(--secondary))" },
        { name: "Other Income", value: results.otherIncome, color: "hsl(var(--muted))" },
      ].filter((item) => item.value > 0)
    : [];

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-8 animate-fade-in">
          {/* Main Inputs Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg shadow-black/30 rounded-2xl p-6 md:p-8">
            {/* Header with gold accent */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="h-1 w-14 rounded-full bg-primary mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                Retirement Income Inputs
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Tell us about your age, savings, and estimated benefits.
              </p>
            </div>

            {/* Personal Timeline Subsection */}
            <div className="space-y-4 mb-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Timeline
              </p>
              
              <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="currentAge" className="text-xs md:text-sm text-foreground">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  min={18}
                  max={80}
                  className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                />
                {errors.currentAge && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.currentAge}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="retirementAge" className="text-xs md:text-sm text-foreground">Planned Retirement Age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  min={currentAge + 1}
                  max={80}
                  className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                />
                {errors.retirementAge && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.retirementAge}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="incomeEndAge" className="text-xs md:text-sm text-foreground">Plan For Income Until Age</Label>
                <p className="text-[11px] md:text-xs text-muted-foreground">How long do you want your money to last?</p>
                <Input
                  id="incomeEndAge"
                  type="number"
                  value={incomeEndAge}
                  onChange={(e) => setIncomeEndAge(Number(e.target.value))}
                  min={retirementAge + 1}
                  className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                />
                  {errors.incomeEndAge && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.incomeEndAge}</p>}
                </div>
              </div>
            </div>

            {/* Savings & Growth Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Savings & Growth
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentSavings" className="text-xs md:text-sm text-foreground">Current Retirement Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    min={0}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                  {errors.currentSavings && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.currentSavings}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="monthlyContribution" className="text-xs md:text-sm text-foreground">Monthly Contribution Until Retirement ($)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    min={0}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                  {errors.monthlyContribution && (
                    <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.monthlyContribution}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="returnBeforeRetirement" className="text-xs md:text-sm text-foreground">Expected Annual Return Before Retirement (%)</Label>
                  <Input
                    id="returnBeforeRetirement"
                    type="number"
                    value={returnBeforeRetirement}
                    onChange={(e) => setReturnBeforeRetirement(Number(e.target.value))}
                    min={0}
                    max={15}
                    step={0.1}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                  {errors.returnBeforeRetirement && (
                    <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.returnBeforeRetirement}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="returnDuringRetirement" className="text-xs md:text-sm text-foreground">Expected Annual Return During Retirement (%)</Label>
                  <Input
                    id="returnDuringRetirement"
                    type="number"
                    value={returnDuringRetirement}
                    onChange={(e) => setReturnDuringRetirement(Number(e.target.value))}
                    min={0}
                    max={10}
                    step={0.1}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                  {errors.returnDuringRetirement && (
                    <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.returnDuringRetirement}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Income Sources Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Income Sources in Retirement
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="socialSecurity" className="text-xs md:text-sm text-foreground">Estimated Monthly Social Security ($)</Label>
                  <p className="text-[11px] md:text-xs text-muted-foreground">Use your latest SSA benefit estimate if available.</p>
                  <Input
                    id="socialSecurity"
                    type="number"
                    value={socialSecurity}
                    onChange={(e) => setSocialSecurity(Number(e.target.value))}
                    min={0}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pension" className="text-xs md:text-sm text-foreground">Monthly Pension Income ($)</Label>
                  <Input
                    id="pension"
                    type="number"
                    value={pension}
                    onChange={(e) => setPension(Number(e.target.value))}
                    min={0}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="otherIncome" className="text-xs md:text-sm text-foreground">Other Monthly Income in Retirement ($)</Label>
                  <p className="text-[11px] md:text-xs text-muted-foreground">Example: rental income, part-time work</p>
                  <Input
                    id="otherIncome"
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Number(e.target.value))}
                    min={0}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  />
                </div>
              </div>
            </div>

            {/* Goal Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Goal
              </p>
              
              <div className="space-y-1.5">
                <Label htmlFor="desiredIncome" className="text-xs md:text-sm text-foreground">Desired Monthly Retirement Income ($)</Label>
                <p className="text-[11px] md:text-xs text-muted-foreground">
                  Total amount you'd like to live on each month (before taxes).
                </p>
                <Input
                  id="desiredIncome"
                  type="number"
                  value={desiredIncome}
                  onChange={(e) => setDesiredIncome(Number(e.target.value))}
                  min={0}
                  className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={calculateRetirementIncome} size="lg" className="flex-1">
              Calculate
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-8">
          {results ? (
            <div className="space-y-8 animate-fade-in">
              {/* Summary Card */}
              <Card className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Your Estimated Monthly Income</CardTitle>
                  <CardDescription>Based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {formatCurrency(results.totalMonthlyIncome)}
                    </p>
                    <p className="text-sm text-muted-foreground">per month in retirement</p>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Your Goal:</span>
                      <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(results.desiredIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        {results.gap >= 0 ? "Surplus:" : "Shortfall:"}
                      </span>
                      <span
                        className={`text-lg font-semibold ${
                          results.gap >= 0 ? "text-primary" : "text-red-400"
                        }`}
                      >
                        {results.gap >= 0 ? "+" : ""}
                        {formatCurrency(results.gap)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium">{results.yearsToRetirement}</span> years until retirement
                    </p>
                    <p>
                      Planning for <span className="font-medium">{results.yearsInRetirement}</span> years of retirement
                      income
                    </p>
                    <p className="mt-2">
                      Projected savings at retirement: <span className="font-medium text-foreground">{formatCurrency(results.savingsAtRetirement)}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Income Breakdown */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Monthly Income Breakdown</CardTitle>
                  <CardDescription>Where your retirement income comes from</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">From Savings:</span>
                      <span className="font-semibold text-foreground">{formatCurrency(results.monthlyFromSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Social Security:</span>
                      <span className="font-semibold text-foreground">{formatCurrency(results.socialSecurity)}</span>
                    </div>
                    {results.pension > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Pension:</span>
                        <span className="font-semibold text-foreground">{formatCurrency(results.pension)}</span>
                      </div>
                    )}
                    {results.otherIncome > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Other Income:</span>
                        <span className="font-semibold text-foreground">{formatCurrency(results.otherIncome)}</span>
                      </div>
                    )}
                  </div>

                  {chartData.length > 0 && (
                    <div className="h-[250px] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline Visual */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{currentAge}</p>
                        <p className="text-xs text-muted-foreground">Today</p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
                        <p className="text-xs text-center text-muted-foreground mt-2">Saving & Growth Phase</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">{retirementAge}</p>
                        <p className="text-xs text-muted-foreground">Retirement</p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-1 bg-gradient-to-r from-accent to-muted rounded-full" />
                        <p className="text-xs text-center text-muted-foreground mt-2">Income Phase</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-muted-foreground">{incomeEndAge}</p>
                        <p className="text-xs text-muted-foreground">End</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidance Callout */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Not sure if this is enough?</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    A TFA advisor can help you refine your plan, stress-test your assumptions, and build a retirement
                    income strategy tailored to your family.
                  </p>
                  <Button size="lg" className="w-full group">
                    Talk to an Advisor About Your Retirement Plan
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Ready to See Your Future?</h3>
                  <p className="text-muted-foreground">
                    Fill out the form and click Calculate to see your estimated retirement income.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 pt-8 border-t border-border/30">
        <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-3xl mx-auto text-center">
          This calculator is for educational purposes only and does not guarantee future performance. Estimates do not
          account for taxes, fees, inflation, or changes in Social Security or pension benefits. Please speak with a
          licensed advisor before making financial decisions.
        </p>
      </div>
    </div>
  );
}
