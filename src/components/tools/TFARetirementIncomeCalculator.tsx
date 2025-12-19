import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ArrowRight, TrendingUp, DollarSign, Calendar, Mail, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EmailResultsModal from "./EmailResultsModal";
import { generateCalculatorPdf } from "@/lib/calculatorPdfGenerator";
import { CurrencyInput } from "@/components/ui/currency-input";
import { NumericInput } from "@/components/ui/numeric-input";

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
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

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

    const yearsToRetirement = Math.max(1, retirementAge - currentAge);
    const yearsInRetirement = Math.max(1, incomeEndAge - retirementAge);
    const monthsToRetirement = yearsToRetirement * 12;
    const monthsInRetirement = yearsInRetirement * 12;

    // Future value of current savings
    const rateBeforeRetirement = Math.max(0, returnBeforeRetirement || 0) / 100;
    const futureValueOfSavings = (currentSavings || 0) * Math.pow(1 + rateBeforeRetirement, yearsToRetirement);

    // Future value of monthly contributions
    const monthlyRate = rateBeforeRetirement / 12;
    let futureValueOfContributions = 0;
    
    if (monthlyContribution > 0 && monthlyRate > 0) {
      futureValueOfContributions =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate) *
        (1 + monthlyRate);
    } else if (monthlyContribution > 0) {
      // No growth case
      futureValueOfContributions = monthlyContribution * monthsToRetirement;
    }

    const savingsAtRetirement = futureValueOfSavings + futureValueOfContributions;

    // Monthly income from savings (using amortization formula)
    const retirementMonthlyRate = Math.max(0, returnDuringRetirement || 0) / 100 / 12;
    let monthlyFromSavings = 0;

    if (monthsInRetirement > 0) {
      if (retirementMonthlyRate > 0 && savingsAtRetirement > 0) {
        monthlyFromSavings =
          (savingsAtRetirement * retirementMonthlyRate * Math.pow(1 + retirementMonthlyRate, monthsInRetirement)) /
          (Math.pow(1 + retirementMonthlyRate, monthsInRetirement) - 1);
      } else {
        // If no return during retirement, simple division
        monthlyFromSavings = savingsAtRetirement / monthsInRetirement;
      }
    }

    const totalMonthlyIncome = monthlyFromSavings + (socialSecurity || 0) + (pension || 0) + (otherIncome || 0);
    const gap = totalMonthlyIncome - (desiredIncome || 0);

    setResults({
      savingsAtRetirement: isFinite(savingsAtRetirement) ? savingsAtRetirement : 0,
      monthlyFromSavings: isFinite(monthlyFromSavings) ? monthlyFromSavings : 0,
      totalMonthlyIncome: isFinite(totalMonthlyIncome) ? totalMonthlyIncome : 0,
      socialSecurity: socialSecurity || 0,
      pension: pension || 0,
      otherIncome: otherIncome || 0,
      desiredIncome: desiredIncome || 0,
      gap: isFinite(gap) ? gap : 0,
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

  const handleEmailResults = async (email: string, firstName: string) => {
    if (!results) return;

    setEmailLoading(true);
    try {
      const pdfInputs = [
        { label: "Current Age", value: `${currentAge} years` },
        { label: "Retirement Age", value: `${retirementAge} years` },
        { label: "Current Savings", value: formatCurrency(currentSavings) },
        { label: "Monthly Contribution", value: formatCurrency(monthlyContribution) },
        { label: "Expected Return (Before)", value: `${returnBeforeRetirement}%` },
      ];

      const pdfResults = [
        { label: "TOTAL MONTHLY INCOME", value: formatCurrency(results.totalMonthlyIncome), highlight: true },
        { label: "Savings at Retirement", value: formatCurrency(results.savingsAtRetirement) },
        { label: "Monthly from Savings", value: formatCurrency(results.monthlyFromSavings) },
        { label: "Social Security", value: formatCurrency(results.socialSecurity) },
        { label: "Income Gap", value: formatCurrency(results.gap) },
      ];

      const pdfBase64 = generateCalculatorPdf({
        calculatorName: "Retirement Income Calculator",
        inputs: pdfInputs,
        results: pdfResults,
        insights: [
          "Starting early and contributing consistently can significantly boost your retirement savings.",
          "Social Security and pensions provide a foundation, but savings fill the gap.",
        ],
      });

      const { error } = await supabase.functions.invoke("send-calculator-results", {
        body: {
          email,
          firstName,
          calculatorName: "Retirement Income Calculator",
          pdfBase64,
          resultsSummary: pdfResults.map(r => ({ label: r.label, value: r.value })),
        },
      });

      if (error) throw error;
      toast.success("Results sent to your email!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
      throw error;
    } finally {
      setEmailLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (!isFinite(value)) return "$0";
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
          <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
            {/* Header with gold accent */}
            <div className="mb-6 pb-4 border-b border-white/15">
              <div className="h-1 w-14 rounded-full bg-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Retirement Income Inputs
              </h3>
              <p className="text-sm text-white/70">
                Tell us about your age, savings, and estimated benefits.
              </p>
            </div>

            {/* Personal Timeline Subsection */}
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Timeline
              </p>
              
              <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="currentAge" className="text-sm font-medium text-white">Current Age</Label>
                <NumericInput
                  id="currentAge"
                  value={currentAge}
                  onChange={(value) => setCurrentAge(Math.max(18, Math.min(80, value)))}
                  min={18}
                  max={80}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                {errors.currentAge && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.currentAge}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="retirementAge" className="text-sm font-medium text-white">Planned Retirement Age</Label>
                <NumericInput
                  id="retirementAge"
                  value={retirementAge}
                  onChange={(value) => setRetirementAge(Math.max(currentAge + 1, Math.min(80, value)))}
                  min={currentAge + 1}
                  max={80}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                {errors.retirementAge && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.retirementAge}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="incomeEndAge" className="text-sm font-medium text-white">Plan For Income Until Age</Label>
                <p className="text-xs text-white/60 mt-1">How long do you want your money to last?</p>
                <NumericInput
                  id="incomeEndAge"
                  value={incomeEndAge}
                  onChange={(value) => setIncomeEndAge(Math.max(retirementAge + 1, value))}
                  min={retirementAge + 1}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                  {errors.incomeEndAge && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.incomeEndAge}</p>}
                </div>
              </div>
            </div>

            {/* Savings & Growth Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Savings & Growth
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentSavings" className="text-sm font-medium text-white">Current Retirement Savings</Label>
                  <CurrencyInput
                    id="currentSavings"
                    value={currentSavings}
                    onChange={(value) => setCurrentSavings(Math.max(0, value))}
                    min={0}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.currentSavings && <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.currentSavings}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="monthlyContribution" className="text-sm font-medium text-white">Monthly Contribution Until Retirement</Label>
                  <CurrencyInput
                    id="monthlyContribution"
                    value={monthlyContribution}
                    onChange={(value) => setMonthlyContribution(Math.max(0, value))}
                    min={0}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.monthlyContribution && (
                    <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.monthlyContribution}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="returnBeforeRetirement" className="text-sm font-medium text-white">Expected Annual Return Before Retirement (%)</Label>
                  <NumericInput
                    id="returnBeforeRetirement"
                    value={returnBeforeRetirement}
                    onChange={(value) => setReturnBeforeRetirement(Math.max(0, Math.min(15, value)))}
                    allowDecimals
                    min={0}
                    max={15}
                    suffix="%"
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.returnBeforeRetirement && (
                    <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.returnBeforeRetirement}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="returnDuringRetirement" className="text-sm font-medium text-white">Expected Annual Return During Retirement (%)</Label>
                  <NumericInput
                    id="returnDuringRetirement"
                    value={returnDuringRetirement}
                    onChange={(value) => setReturnDuringRetirement(Math.max(0, Math.min(10, value)))}
                    allowDecimals
                    min={0}
                    max={10}
                    suffix="%"
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.returnDuringRetirement && (
                    <p className="text-[11px] md:text-xs text-destructive mt-1">{errors.returnDuringRetirement}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Income Sources Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Income Sources in Retirement
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="socialSecurity" className="text-sm font-medium text-white">Estimated Monthly Social Security</Label>
                  <p className="text-xs text-white/60">Use your latest SSA benefit estimate if available.</p>
                  <CurrencyInput
                    id="socialSecurity"
                    value={socialSecurity}
                    onChange={(value) => setSocialSecurity(Math.max(0, value))}
                    min={0}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pension" className="text-sm font-medium text-white">Monthly Pension Income</Label>
                  <CurrencyInput
                    id="pension"
                    value={pension}
                    onChange={(value) => setPension(Math.max(0, value))}
                    min={0}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="otherIncome" className="text-sm font-medium text-white">Other Monthly Income in Retirement</Label>
                  <p className="text-xs text-white/60">Example: rental income, part-time work</p>
                  <CurrencyInput
                    id="otherIncome"
                    value={otherIncome}
                    onChange={(value) => setOtherIncome(Math.max(0, value))}
                    min={0}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Goal Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Goal
              </p>
              
              <div className="space-y-1.5">
                <Label htmlFor="desiredIncome" className="text-sm font-medium text-white">Desired Monthly Retirement Income</Label>
                <p className="text-xs text-white/60">
                  Total amount you'd like to live on each month (before taxes).
                </p>
                <CurrencyInput
                  id="desiredIncome"
                  value={desiredIncome}
                  onChange={(value) => setDesiredIncome(Math.max(0, value))}
                  min={0}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 mt-6 border-t border-white/15">
              <Button onClick={calculateRetirementIncome} size="lg" className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25">
                Calculate
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg" className="h-12 px-6 bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80">
                Reset
              </Button>
              {results && (
                <Button onClick={() => setEmailModalOpen(true)} variant="outline" size="lg" className="h-12 px-4 bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80">
                  <Mail className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-8">
          {results ? (
            <div className="space-y-8 animate-fade-in">
              {/* Summary Card */}
              <Card className="bg-slate-900/90 backdrop-blur-sm border border-accent/40 shadow-xl shadow-accent/15">
                <CardHeader>
                  <CardTitle className="text-2xl text-white font-bold">Your Estimated Monthly Income</CardTitle>
                  <CardDescription className="text-white/70">Based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(228,181,72,0.5)] mb-2">
                      {formatCurrency(results.totalMonthlyIncome)}
                    </p>
                    <p className="text-sm text-white/70">per month in retirement</p>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Your Goal:</span>
                      <span className="text-lg font-semibold text-white">
                        {formatCurrency(results.desiredIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {results.gap >= 0 ? "Surplus:" : "Shortfall:"}
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          results.gap >= 0 ? "text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]" : "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]"
                        }`}
                      >
                        {results.gap >= 0 ? "+" : ""}
                        {formatCurrency(results.gap)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 text-sm text-white/70">
                    <p>
                      <span className="font-semibold text-white">{results.yearsToRetirement}</span> years until retirement
                    </p>
                    <p>
                      Planning for <span className="font-semibold text-white">{results.yearsInRetirement}</span> years of retirement
                      income
                    </p>
                    <p className="mt-2">
                      Projected savings at retirement: <span className="font-bold text-white">{formatCurrency(results.savingsAtRetirement)}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Income Breakdown */}
              <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40">
                <CardHeader>
                  <CardTitle className="text-white font-bold">Monthly Income Breakdown</CardTitle>
                  <CardDescription className="text-white/70">Where your retirement income comes from</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 bg-slate-800/60 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">From Savings:</span>
                      <span className="font-semibold text-white">{formatCurrency(results.monthlyFromSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Social Security:</span>
                      <span className="font-semibold text-white">{formatCurrency(results.socialSecurity)}</span>
                    </div>
                    {results.pension > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Pension:</span>
                        <span className="font-semibold text-white">{formatCurrency(results.pension)}</span>
                      </div>
                    )}
                    {results.otherIncome > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Other Income:</span>
                        <span className="font-semibold text-white">{formatCurrency(results.otherIncome)}</span>
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
              <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40">
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent drop-shadow-[0_0_10px_rgba(228,181,72,0.4)]">{currentAge}</p>
                        <p className="text-xs text-white/70">Today</p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-accent/30 rounded-full" />
                        <p className="text-xs text-center text-white/70 mt-2">Saving & Growth Phase</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent drop-shadow-[0_0_10px_rgba(228,181,72,0.4)]">{retirementAge}</p>
                        <p className="text-xs text-white/70">Retirement</p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-1 bg-gradient-to-r from-accent/80 to-slate-600/60 rounded-full" />
                        <p className="text-xs text-center text-white/70 mt-2">Income Phase</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white/60">{incomeEndAge}</p>
                        <p className="text-xs text-white/70">End</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Benefits Card */}
              <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                  Key Benefits
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Retirement Income Planning" },
                    { label: "Social Security Optimization" },
                    { label: "Gap Analysis Included" },
                    { label: "Multiple Income Sources" },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-slate-800/60 rounded-lg p-3 border border-white/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-xs text-white font-medium">{benefit.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Guidance Callout */}
              <Card className="bg-slate-900/90 backdrop-blur-sm border border-accent/30 shadow-lg shadow-accent/10">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-white mb-2">Not sure if this is enough?</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    A TFA advisor can help you refine your plan, stress-test your assumptions, and build a retirement
                    income strategy tailored to your family.
                  </p>
                  <Button size="lg" className="btn-primary-cta w-full group">
                    Talk to an Advisor About Your Retirement Plan
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
              <div className="mb-6 pb-4 border-b border-white/15">
                <div className="h-1 w-14 rounded-full bg-accent mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Results</h3>
                <p className="text-sm text-white/70">Enter your details and click Calculate</p>
              </div>
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-white/50" />
                </div>
                <p className="text-white/60">Your results will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 pt-8 border-t border-white/20">
        <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-3xl mx-auto text-center">
          This calculator is for educational purposes only and does not guarantee future performance. Estimates do not
          account for taxes, fees, inflation, or changes in Social Security or pension benefits. Please speak with a
          licensed advisor before making financial decisions.
        </p>
      </div>

      <EmailResultsModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        calculatorName="Retirement Income Calculator"
        onSendEmail={handleEmailResults}
        isLoading={emailLoading}
      />
    </div>
  );
}
