import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, PiggyBank, GitCompare, ChevronDown, ChevronUp, Mail, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EmailResultsModal from "./EmailResultsModal";
import { generateCalculatorPdf } from "@/lib/calculatorPdfGenerator";
import { CurrencyInput } from "@/components/ui/currency-input";
import { NumericInput } from "@/components/ui/numeric-input";

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

interface ComparisonResults {
  scenarioA: CalculationResults;
  scenarioB: CalculationResults;
  difference: number;
}

const TFACompoundGrowthCalculator = () => {
  const [compareMode, setCompareMode] = useState(false);
  const [scenarioBMode, setScenarioBMode] = useState<"none" | "no-interest" | "custom">("none");
  const [showTable, setShowTable] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<"scenarioA" | "scenarioB">("scenarioA");
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialInvestment: 10000,
    monthlyContribution: 250,
    years: 20,
    annualRate: 7,
    compoundingFrequency: 12, // Monthly
    contributionTiming: "end",
  });

  const [scenarioBInputs, setScenarioBInputs] = useState<CalculatorInputs>({
    initialInvestment: 0,
    monthlyContribution: 250,
    years: 20,
    annualRate: 0,
    compoundingFrequency: 12,
    contributionTiming: "end",
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

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

  const calculateScenario = (scenarioInputs: CalculatorInputs): CalculationResults => {
    const P = Math.max(0, scenarioInputs.initialInvestment || 0);
    const PMT = Math.max(0, scenarioInputs.monthlyContribution || 0);
    const r = Math.max(0, Math.min(20, scenarioInputs.annualRate || 0)) / 100;
    const n = scenarioInputs.compoundingFrequency || 12;
    const t = Math.max(1, Math.min(50, scenarioInputs.years || 1));

    // Calculate yearly balances for chart
    const yearlyData: { year: number; balance: number }[] = [];
    
    for (let year = 0; year <= t; year++) {
      const periods = n * year;
      const principalGrowth = P * Math.pow(1 + r / n, periods);
      
      // Adjust monthly contribution to compounding frequency
      const adjustedPMT = PMT * (12 / n);
      
      let contributionsGrowth = 0;
      if (periods > 0 && r > 0) {
        contributionsGrowth = adjustedPMT * ((Math.pow(1 + r / n, periods) - 1) / (r / n));
        
        // If contributing at the beginning, multiply by (1 + r/n)
        if (scenarioInputs.contributionTiming === "beginning") {
          contributionsGrowth *= (1 + r / n);
        }
      } else if (periods > 0) {
        // No interest case
        contributionsGrowth = adjustedPMT * periods;
      }
      
      const balance = principalGrowth + contributionsGrowth;
      const safeBalance = isFinite(balance) ? balance : 0;
      yearlyData.push({ year, balance: Math.round(safeBalance * 100) / 100 });
    }

    const finalBalance = yearlyData[yearlyData.length - 1]?.balance || 0;
    const totalContributions = P + (PMT * 12 * t);
    const totalGrowth = finalBalance - totalContributions;

    return {
      finalBalance: isFinite(finalBalance) ? finalBalance : 0,
      totalContributions: isFinite(totalContributions) ? totalContributions : 0,
      totalGrowth: isFinite(totalGrowth) ? totalGrowth : 0,
      yearlyData,
    };
  };

  const calculateCompoundGrowth = () => {
    if (!validateInputs()) return;

    if (compareMode) {
      const scenarioA = calculateScenario(inputs);
      const scenarioB = calculateScenario(scenarioBInputs);
      const difference = scenarioA.finalBalance - scenarioB.finalBalance;

      setComparisonResults({
        scenarioA,
        scenarioB,
        difference,
      });
      setResults(null);
    } else {
      const result = calculateScenario(inputs);
      setResults(result);
      setComparisonResults(null);
    }
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
    setScenarioBInputs({
      initialInvestment: 0,
      monthlyContribution: 250,
      years: 20,
      annualRate: 0,
      compoundingFrequency: 12,
      contributionTiming: "end",
    });
    setResults(null);
    setComparisonResults(null);
    setErrors({});
    setCompareMode(false);
    setScenarioBMode("none");
  };

  const handleEmailResults = async (email: string, firstName: string) => {
    const currentResults = results || comparisonResults?.scenarioA;
    if (!currentResults) return;

    setEmailLoading(true);
    try {
      const pdfInputs = [
        { label: "Initial Investment", value: formatCurrency(inputs.initialInvestment) },
        { label: "Monthly Contribution", value: formatCurrency(inputs.monthlyContribution) },
        { label: "Time Horizon", value: `${inputs.years} years` },
        { label: "Annual Return Rate", value: `${inputs.annualRate}%` },
      ];

      const pdfResults = [
        { label: "PROJECTED BALANCE", value: formatCurrency(currentResults.finalBalance), highlight: true },
        { label: "Total Contributions", value: formatCurrency(currentResults.totalContributions) },
        { label: "Total Growth", value: formatCurrency(currentResults.totalGrowth) },
      ];

      const pdfBase64 = generateCalculatorPdf({
        calculatorName: "Compound Growth Calculator",
        inputs: pdfInputs,
        results: pdfResults,
        insights: [
          "Compound growth accelerates over time - the earlier you start, the more you benefit.",
          "Consistent monthly contributions can significantly boost your final balance.",
        ],
      });

      const { error } = await supabase.functions.invoke("send-calculator-results", {
        body: {
          email,
          firstName,
          calculatorName: "Compound Growth Calculator",
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

  const handleScenarioBModeChange = (mode: "none" | "no-interest" | "custom") => {
    setScenarioBMode(mode);
    
    if (mode === "none") {
      setScenarioBInputs({
        initialInvestment: 0,
        monthlyContribution: 0,
        years: inputs.years,
        annualRate: 0,
        compoundingFrequency: 12,
        contributionTiming: "end",
      });
    } else if (mode === "no-interest") {
      setScenarioBInputs({
        initialInvestment: 0,
        monthlyContribution: 250,
        years: inputs.years,
        annualRate: 0,
        compoundingFrequency: 12,
        contributionTiming: "end",
      });
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

  const formatCurrencyWithDecimals = (value: number) => {
    if (!isFinite(value)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const generateTableData = (scenarioResults: CalculationResults, scenarioInputs: CalculatorInputs) => {
    return scenarioResults.yearlyData.map((yearData) => {
      const totalContributions = 
        scenarioInputs.initialInvestment + 
        (scenarioInputs.monthlyContribution * 12 * yearData.year);
      
      return {
        year: yearData.year,
        futureValue: yearData.balance,
        totalContributions: totalContributions,
      };
    });
  };

  return (
    <div className="w-full">
      {/* Comparison Toggle */}
      <Card className="p-6 mb-8 bg-background/40 backdrop-blur-sm border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <GitCompare className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
            <div>
              <Label htmlFor="compare-toggle" className="text-base font-semibold mb-1 block cursor-pointer">
                Compare Two Scenarios
              </Label>
              <p className="text-sm text-muted-foreground">
                See how your investment growth compares to a baseline scenario.
              </p>
            </div>
          </div>
          <Switch
            id="compare-toggle"
            checked={compareMode}
            onCheckedChange={setCompareMode}
            className="data-[state=checked]:bg-gold"
          />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Scenario A Inputs Section */}
        <div className="space-y-6">
          <Card className="p-6 lg:p-8 bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl">
            {/* Header with gold accent */}
            <div className="mb-6 pb-4 border-b border-white/15">
              <div className="h-1 w-14 rounded-full bg-primary mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {compareMode ? "Scenario A — Your Investment Plan" : "Inputs"}
              </h3>
              <p className="text-sm text-white/70">
                {compareMode ? "Configure your full investment strategy" : "Enter your starting amount, contributions, and assumptions."}
              </p>
            </div>
          <div className="space-y-6">
            {/* Savings & Growth Subsection */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Savings & Growth
              </p>
              
              <div className="space-y-1.5">
                <Label htmlFor="initial" className="text-sm md:text-base font-medium text-white">
                  Initial Investment Amount
                </Label>
                <CurrencyInput
                  id="initial"
                  value={inputs.initialInvestment}
                  onChange={(value) => setInputs({ ...inputs, initialInvestment: Math.max(0, value) })}
                  min={0}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                {errors.initialInvestment && (
                  <p className="text-destructive text-[11px] md:text-xs mt-1">{errors.initialInvestment}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="monthly" className="text-sm md:text-base font-medium text-white">
                  Monthly Contribution
                </Label>
                <CurrencyInput
                  id="monthly"
                  value={inputs.monthlyContribution}
                  onChange={(value) => setInputs({ ...inputs, monthlyContribution: Math.max(0, value) })}
                  min={0}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                {errors.monthlyContribution && (
                  <p className="text-destructive text-[11px] md:text-xs mt-1">{errors.monthlyContribution}</p>
                )}
              </div>
            </div>

            {/* Timeline Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Timeline
              </p>
              
              <div className="space-y-1.5">
                <Label htmlFor="years" className="text-sm md:text-base font-medium text-white">
                  Length of Time (Years)
                </Label>
                <NumericInput
                  id="years"
                  value={inputs.years}
                  onChange={(value) => setInputs({ ...inputs, years: Math.max(1, Math.min(50, value)) })}
                  min={1}
                  max={50}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                {errors.years && (
                  <p className="text-destructive text-[11px] md:text-xs mt-1">{errors.years}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rate" className="text-sm md:text-base font-medium text-white">
                  Estimated Annual Rate of Return (%)
                </Label>
                <NumericInput
                  id="rate"
                  value={inputs.annualRate}
                  onChange={(value) => setInputs({ ...inputs, annualRate: Math.max(0, Math.min(20, value)) })}
                  allowDecimals
                  min={0}
                  max={20}
                  suffix="%"
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                {errors.annualRate && (
                  <p className="text-destructive text-[11px] md:text-xs mt-1">{errors.annualRate}</p>
                )}
              </div>
            </div>

            {/* Advanced Settings Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Advanced Settings
              </p>
              
              <div className="space-y-1.5">
                <Label htmlFor="frequency" className="text-sm md:text-base font-medium text-white">
                  Compounding Frequency
                </Label>
                <Select
                  value={inputs.compoundingFrequency.toString()}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, compoundingFrequency: Number(value) })
                  }
                >
                  <SelectTrigger id="frequency" className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary">
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

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-white">Contribution Timing</Label>
                <RadioGroup
                  value={inputs.contributionTiming}
                  onValueChange={(value: "beginning" | "end") =>
                    setInputs({ ...inputs, contributionTiming: value })
                  }
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="beginning" id="beginning" />
                    <Label htmlFor="beginning" className="text-sm font-normal cursor-pointer text-white">
                      Contribute at the beginning of each period
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="end" id="end" />
                    <Label htmlFor="end" className="text-sm font-normal cursor-pointer text-white">
                      Contribute at the end of each period
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={calculateCompoundGrowth}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                disabled={Object.keys(errors).length > 0}
              >
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-6 bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
              >
                Reset
              </Button>
              {(results || comparisonResults) && (
                <Button
                  onClick={() => setEmailModalOpen(true)}
                  variant="outline"
                  className="h-12 px-4 bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          </Card>

          {/* Scenario B Inputs Section */}
          {compareMode && (
            <Card className="p-6 lg:p-8 bg-white/10 backdrop-blur-md border-white/20 shadow-lg shadow-black/30 rounded-2xl border-primary/30">
              <div className="mb-6 pb-4 border-b border-white/10">
                <div className="h-1 w-14 rounded-full bg-primary mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  Scenario B — Baseline Comparison
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Compare your plan against a different approach
                </p>
                
                <Select value={scenarioBMode} onValueChange={handleScenarioBModeChange}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Investing (No growth)</SelectItem>
                    <SelectItem value="no-interest">Contribute Without Investing</SelectItem>
                    <SelectItem value="custom">Customize This Scenario</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scenarioBMode === "custom" && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="scenarioB-initial" className="text-sm font-medium mb-2 block">
                      Initial Investment Amount ($)
                    </Label>
                    <Input
                      id="scenarioB-initial"
                      type="number"
                      min="0"
                      value={scenarioBInputs.initialInvestment}
                      onChange={(e) =>
                        setScenarioBInputs({ ...scenarioBInputs, initialInvestment: Number(e.target.value) })
                      }
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="scenarioB-monthly" className="text-sm font-medium mb-2 block">
                      Monthly Contribution ($)
                    </Label>
                    <Input
                      id="scenarioB-monthly"
                      type="number"
                      min="0"
                      value={scenarioBInputs.monthlyContribution}
                      onChange={(e) =>
                        setScenarioBInputs({ ...scenarioBInputs, monthlyContribution: Number(e.target.value) })
                      }
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="scenarioB-rate" className="text-sm font-medium mb-2 block">
                      Estimated Annual Rate of Return (%)
                    </Label>
                    <Input
                      id="scenarioB-rate"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={scenarioBInputs.annualRate}
                      onChange={(e) =>
                        setScenarioBInputs({ ...scenarioBInputs, annualRate: Number(e.target.value) })
                      }
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {scenarioBMode === "no-interest" && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="scenarioB-monthly-nointerest" className="text-sm font-medium mb-2 block">
                      Monthly Contribution ($)
                    </Label>
                    <Input
                      id="scenarioB-monthly-nointerest"
                      type="number"
                      min="0"
                      value={scenarioBInputs.monthlyContribution}
                      onChange={(e) =>
                        setScenarioBInputs({ ...scenarioBInputs, monthlyContribution: Number(e.target.value) })
                      }
                      className="h-12"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This scenario shows total savings with no interest earned.
                  </p>
                </div>
              )}

              {scenarioBMode === "none" && (
                <p className="text-sm text-muted-foreground">
                  This scenario shows what happens if you don't invest at all.
                </p>
              )}
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {comparisonResults ? (
            <div className="animate-fade-in space-y-6">
              {/* Comparison Summary Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-6 bg-slate-900/90 backdrop-blur-sm border border-accent/40 shadow-xl shadow-accent/15">
                  <p className="text-xs font-semibold text-accent mb-1">Scenario A</p>
                  <p className="text-sm text-white/70 mb-2">Your Investment Plan</p>
                  <p className="text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(228,181,72,0.4)] mb-4">
                    {formatCurrency(comparisonResults.scenarioA.finalBalance)}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contributions:</span>
                      <span className="font-medium">{formatCurrency(comparisonResults.scenarioA.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-medium text-gold">{formatCurrency(comparisonResults.scenarioA.totalGrowth)}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-background/40 backdrop-blur-sm border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Scenario B</p>
                  <p className="text-sm text-muted-foreground mb-2">Baseline</p>
                  <p className="text-3xl font-bold text-foreground mb-4">
                    {formatCurrency(comparisonResults.scenarioB.finalBalance)}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contributions:</span>
                      <span className="font-medium">{formatCurrency(comparisonResults.scenarioB.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-medium">{formatCurrency(comparisonResults.scenarioB.totalGrowth)}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Impact Statement */}
              <Card className="p-8 bg-slate-900/90 backdrop-blur-sm border border-accent/40 shadow-xl shadow-accent/15 text-center">
                <p className="text-sm font-semibold text-white/80 mb-2">Difference Over Time</p>
                <p className="text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(228,181,72,0.5)] mb-4">
                  {formatCurrency(Math.abs(comparisonResults.difference))}
                </p>
                <p className="text-base text-foreground/90 max-w-md mx-auto">
                  {comparisonResults.difference > 0 
                    ? "You would have this much more by investing instead of waiting."
                    : "Alternative scenario would yield more."}
                </p>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  Small, consistent decisions today can dramatically change your financial future.
                </p>
              </Card>

              {/* Dual-Line Comparison Chart */}
              <Card className="p-6 bg-background/40 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4">Growth Comparison Over Time</h3>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="year"
                        stroke="hsl(var(--muted-foreground))"
                        label={{ value: "Years", position: "insideBottom", offset: -5 }}
                        type="number"
                        domain={[0, inputs.years]}
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
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="line"
                      />
                      <Line
                        data={comparisonResults.scenarioA.yearlyData}
                        type="monotone"
                        dataKey="balance"
                        stroke="hsl(var(--gold))"
                        strokeWidth={3}
                        dot={false}
                        name="Your Investment Plan"
                      />
                      <Line
                        data={comparisonResults.scenarioB.yearlyData}
                        type="monotone"
                        dataKey="balance"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Baseline Scenario"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Table Toggle & Display */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTable(!showTable)}
                  className="w-full h-12 flex items-center justify-center gap-2"
                >
                  {showTable ? (
                    <>
                      Hide Table
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show Table
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>

                {showTable && (
                  <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl animate-fade-in">
                    <Tabs value={selectedScenario} onValueChange={(v) => setSelectedScenario(v as "scenarioA" | "scenarioB")} className="w-full">
                      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                        <TabsTrigger value="scenarioA">Scenario A</TabsTrigger>
                        <TabsTrigger value="scenarioB">Scenario B</TabsTrigger>
                      </TabsList>

                      <TabsContent value="scenarioA" className="mt-0">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            Total Savings in US Dollars
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Scenario A - Your Investment Plan ({inputs.annualRate.toFixed(2)}%)
                          </p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border/50 bg-muted/20">
                                <th className="text-left py-3 px-4 font-semibold">Years</th>
                                <th className="text-right py-3 px-4 font-semibold">
                                  Future Value ({inputs.annualRate.toFixed(2)}%)
                                </th>
                                <th className="text-right py-3 px-4 font-semibold">Total Contributions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {generateTableData(comparisonResults.scenarioA, inputs).map((row, index) => (
                                <tr
                                  key={row.year}
                                  className={`border-b border-border/30 ${
                                    index % 2 === 0 ? "bg-background/20" : "bg-transparent"
                                  }`}
                                >
                                  <td className="py-2.5 px-4">Year {row.year}</td>
                                  <td className="py-2.5 px-4 text-right font-medium">
                                    {formatCurrencyWithDecimals(row.futureValue)}
                                  </td>
                                  <td className="py-2.5 px-4 text-right font-medium">
                                    {formatCurrencyWithDecimals(row.totalContributions)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>

                      <TabsContent value="scenarioB" className="mt-0">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            Total Savings in US Dollars
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Scenario B - Baseline ({scenarioBInputs.annualRate.toFixed(2)}%)
                          </p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border/50 bg-muted/20">
                                <th className="text-left py-3 px-4 font-semibold">Years</th>
                                <th className="text-right py-3 px-4 font-semibold">
                                  Future Value ({scenarioBInputs.annualRate.toFixed(2)}%)
                                </th>
                                <th className="text-right py-3 px-4 font-semibold">Total Contributions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {generateTableData(comparisonResults.scenarioB, scenarioBInputs).map((row, index) => (
                                <tr
                                  key={row.year}
                                  className={`border-b border-border/30 ${
                                    index % 2 === 0 ? "bg-background/20" : "bg-transparent"
                                  }`}
                                >
                                  <td className="py-2.5 px-4">Year {row.year}</td>
                                  <td className="py-2.5 px-4 text-right font-medium">
                                    {formatCurrencyWithDecimals(row.futureValue)}
                                  </td>
                                  <td className="py-2.5 px-4 text-right font-medium">
                                    {formatCurrencyWithDecimals(row.totalContributions)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                )}
              </div>

              {/* Advisory CTA */}
              <Card className="p-8 bg-background/40 backdrop-blur-sm border-border/50 text-center">
                <h3 className="text-xl font-semibold mb-2">See What This Could Look Like for You</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Talk to a TFA Advisor • Free Consultation
                </p>
                <Button
                  className="h-12 px-8 bg-gold hover:bg-gold/90 text-navy font-semibold shadow-lg hover:shadow-gold/20"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Schedule Your Free Consultation
                </Button>
              </Card>
            </div>
          ) : results ? (
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

              {/* Table Toggle & Display */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTable(!showTable)}
                  className="w-full h-12 flex items-center justify-center gap-2"
                >
                  {showTable ? (
                    <>
                      Hide Table
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show Table
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>

                {showTable && (
                  <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl animate-fade-in">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Total Savings in US Dollars
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Year-by-year breakdown ({inputs.annualRate.toFixed(2)}%)
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/50 bg-muted/20">
                            <th className="text-left py-3 px-4 font-semibold">Years</th>
                            <th className="text-right py-3 px-4 font-semibold">
                              Future Value ({inputs.annualRate.toFixed(2)}%)
                            </th>
                            <th className="text-right py-3 px-4 font-semibold">Total Contributions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generateTableData(results, inputs).map((row, index) => (
                            <tr
                              key={row.year}
                              className={`border-b border-border/30 ${
                                index % 2 === 0 ? "bg-background/20" : "bg-transparent"
                              }`}
                            >
                              <td className="py-2.5 px-4">Year {row.year}</td>
                              <td className="py-2.5 px-4 text-right font-medium">
                                {formatCurrencyWithDecimals(row.futureValue)}
                              </td>
                              <td className="py-2.5 px-4 text-right font-medium">
                                {formatCurrencyWithDecimals(row.totalContributions)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                )}
              </div>

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

              {/* Key Benefits Card */}
              <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                  Key Benefits
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Tax-Deferred Growth Potential" },
                    { label: "Power of Compound Interest" },
                    { label: "Flexible Contribution Amounts" },
                    { label: "Long-Term Wealth Building" },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-slate-800/60 rounded-lg p-3 border border-white/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs text-white font-medium">{benefit.label}</span>
                    </div>
                  ))}
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
            <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
              <div className="mb-6 pb-4 border-b border-white/15">
                <div className="h-1 w-14 rounded-full bg-accent mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Results</h3>
                <p className="text-sm text-white/70">
                  {compareMode 
                    ? "Enter both scenarios and click Calculate"
                    : "Enter your details and click Calculate"}
                </p>
              </div>
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white/50" />
                </div>
                <p className="text-white/60">Your results will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <EmailResultsModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        calculatorName="Compound Growth Calculator"
        onSendEmail={handleEmailResults}
        isLoading={emailLoading}
      />
    </div>
  );
};

export default TFACompoundGrowthCalculator;
