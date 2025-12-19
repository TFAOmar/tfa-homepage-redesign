import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Target, Mail, CheckCircle, AlertCircle, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EmailResultsModal from "./EmailResultsModal";
import { generateCalculatorPdf } from "@/lib/calculatorPdfGenerator";
import { CurrencyInput } from "@/components/ui/currency-input";
import { NumericInput } from "@/components/ui/numeric-input";
import { PercentageInput } from "@/components/ui/percentage-input";

type SavingsMode = "monthly" | "annual" | "lumpsum";

interface CalculationResult {
  requiredAmount: number;
  targetGoal: number;
  timeframe: number;
  returnRate: number;
  currentSavings: number;
  mode: SavingsMode;
  isOnTrack: boolean;
}

export default function TFARequiredSavingsCalculator() {
  const [goalType, setGoalType] = useState("retirement");
  const [targetAmount, setTargetAmount] = useState("1000000");
  const [yearsUntilGoal, setYearsUntilGoal] = useState("20");
  const [currentSavings, setCurrentSavings] = useState("0");
  const [returnRate, setReturnRate] = useState("7");
  const [savingsMode, setSavingsMode] = useState<SavingsMode>("monthly");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

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

  const calculateRequiredSavings = () => {
    const FV = Math.max(0, parseFloat(targetAmount) || 0);
    const PV = Math.max(0, parseFloat(currentSavings) || 0);
    const years = Math.max(1, parseFloat(yearsUntilGoal) || 1);
    const rate = Math.max(0, Math.min(20, parseFloat(returnRate) || 0)) / 100;

    if (FV <= 0) {
      return;
    }

    let requiredAmount = 0;
    let isOnTrack = false;

    if (savingsMode === "lumpsum") {
      // Calculate lump sum needed today
      if (rate > 0 && years > 0) {
        const pvRequired = FV / Math.pow(1 + rate, years);
        requiredAmount = Math.max(0, pvRequired - PV);
      } else {
        requiredAmount = Math.max(0, FV - PV);
      }
      isOnTrack = requiredAmount === 0 || PV >= FV;
    } else if (savingsMode === "annual") {
      // Calculate annual contribution needed
      const futureValueOfCurrentSavings = PV * Math.pow(1 + rate, years);
      const remainingNeeded = FV - futureValueOfCurrentSavings;
      
      if (remainingNeeded <= 0) {
        requiredAmount = 0;
        isOnTrack = true;
      } else {
        if (rate > 0) {
          // Future value of annuity formula: FV = PMT * [((1 + r)^n - 1) / r]
          const fvAnnuityFactor = (Math.pow(1 + rate, years) - 1) / rate;
          requiredAmount = fvAnnuityFactor > 0 ? remainingNeeded / fvAnnuityFactor : 0;
        } else {
          // No growth case
          requiredAmount = remainingNeeded / years;
        }
      }
    } else {
      // Calculate monthly contribution needed
      const monthlyRate = rate / 12;
      const months = years * 12;
      const futureValueOfCurrentSavings = PV * Math.pow(1 + monthlyRate, months);
      const remainingNeeded = FV - futureValueOfCurrentSavings;
      
      if (remainingNeeded <= 0) {
        requiredAmount = 0;
        isOnTrack = true;
      } else {
        if (monthlyRate > 0) {
          // Future value of annuity formula with monthly periods
          const fvAnnuityFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
          requiredAmount = fvAnnuityFactor > 0 ? remainingNeeded / fvAnnuityFactor : 0;
        } else {
          // No growth case
          requiredAmount = remainingNeeded / months;
        }
      }
    }

    setResult({
      requiredAmount: isFinite(requiredAmount) ? Math.max(0, requiredAmount) : 0,
      targetGoal: FV,
      timeframe: years,
      returnRate: parseFloat(returnRate) || 0,
      currentSavings: PV,
      mode: savingsMode,
      isOnTrack,
    });
  };

  const handleReset = () => {
    setGoalType("retirement");
    setTargetAmount("1000000");
    setYearsUntilGoal("20");
    setCurrentSavings("0");
    setReturnRate("7");
    setSavingsMode("monthly");
    setResult(null);
  };

  const handleEmailResults = async (email: string, firstName: string) => {
    if (!result) return;

    setEmailLoading(true);
    try {
      const pdfInputs = [
        { label: "Goal Type", value: goalType.charAt(0).toUpperCase() + goalType.slice(1) },
        { label: "Target Amount", value: formatCurrency(result.targetGoal) },
        { label: "Time Horizon", value: `${result.timeframe} years` },
        { label: "Current Savings", value: formatCurrency(result.currentSavings) },
        { label: "Expected Return", value: `${result.returnRate}%` },
      ];

      const modeLabel = savingsMode === "monthly" ? "per month" : savingsMode === "annual" ? "per year" : "lump sum today";
      const pdfResults = [
        { label: `REQUIRED SAVINGS (${modeLabel})`, value: formatCurrency(result.requiredAmount), highlight: true },
        { label: "Target Goal", value: formatCurrency(result.targetGoal) },
        { label: "Timeframe", value: `${result.timeframe} years` },
        { label: "Status", value: result.isOnTrack ? "On Track" : "Action Needed" },
      ];

      const pdfBase64 = generateCalculatorPdf({
        calculatorName: "Required Savings Calculator",
        inputs: pdfInputs,
        results: pdfResults,
        insights: [
          "Small, consistent contributions compound significantly over time.",
          "Review and adjust your savings plan annually to stay on track.",
        ],
      });

      const { error } = await supabase.functions.invoke("send-calculator-results", {
        body: {
          email,
          firstName,
          calculatorName: "Required Savings Calculator",
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

  const getModeLabel = () => {
    switch (savingsMode) {
      case "monthly":
        return "per month";
      case "annual":
        return "per year";
      case "lumpsum":
        return "as a lump sum today";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6 animate-fade-in">
          {/* Main Inputs Card */}
          <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
            {/* Header with gold accent */}
            <div className="mb-6 pb-4 border-b border-white/15">
              <div className="h-1 w-14 rounded-full bg-accent mb-4" />
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                Goal & Savings Inputs
              </h2>
              <p className="text-sm text-white/70">
                Set your target and see how much you may need to save.
              </p>
            </div>

            {/* Your Goal Subsection */}
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Your Goal
              </p>
              
              <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="goalType" className="text-sm font-medium text-white">
                  Goal Type
                </Label>
                <Select value={goalType} onValueChange={setGoalType}>
                  <SelectTrigger id="goalType" className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement">Retirement Nest Egg</SelectItem>
                    <SelectItem value="education">Education / College</SelectItem>
                    <SelectItem value="purchase">Major Purchase (Home, Business, etc.)</SelectItem>
                    <SelectItem value="custom">Custom Goal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="targetAmount" className="text-sm font-medium text-white">
                  Target Goal Amount
                </Label>
                <CurrencyInput
                  id="targetAmount"
                  value={parseFloat(targetAmount) || 0}
                  onChange={(value) => setTargetAmount(value.toString())}
                  min={1}
                  isValid={(parseFloat(targetAmount) || 0) > 0}
                  isInvalid={(parseFloat(targetAmount) || 0) <= 0}
                  errorMessage="Must be greater than 0"
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="yearsUntilGoal" className="text-sm font-medium text-white">
                  Years Until Goal
                </Label>
                <NumericInput
                  id="yearsUntilGoal"
                  value={parseFloat(yearsUntilGoal) || 0}
                  onChange={(value) => setYearsUntilGoal(value.toString())}
                  min={1}
                  max={50}
                  isValid={(parseFloat(yearsUntilGoal) || 0) >= 1 && (parseFloat(yearsUntilGoal) || 0) <= 50}
                  isInvalid={(parseFloat(yearsUntilGoal) || 0) < 1 || (parseFloat(yearsUntilGoal) || 0) > 50}
                  errorMessage="Must be between 1 and 50 years"
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
                <p className="text-xs text-white/60 mt-1">
                  How many years from now until you want to reach this goal?
                </p>
              </div>
            </div>
          </div>

            {/* Existing Savings Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Existing Savings
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentSavings" className="text-sm font-medium text-white">
                    Current Savings Toward This Goal
                  </Label>
                  <CurrencyInput
                    id="currentSavings"
                    value={parseFloat(currentSavings) || 0}
                    onChange={(value) => setCurrentSavings(value.toString())}
                    min={0}
                    isValid={(parseFloat(currentSavings) || 0) >= 0}
                    isInvalid={(parseFloat(currentSavings) || 0) < 0}
                    errorMessage="Cannot be negative"
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="returnRate" className="text-sm font-medium text-white">
                    Expected Annual Rate of Return (%)
                  </Label>
                  <PercentageInput
                    id="returnRate"
                    value={parseFloat(returnRate) || 0}
                    onChange={(value) => setReturnRate(value.toString())}
                    min={0}
                    max={20}
                    isValid={(parseFloat(returnRate) || 0) >= 0 && (parseFloat(returnRate) || 0) <= 20}
                    isInvalid={(parseFloat(returnRate) || 0) < 0 || (parseFloat(returnRate) || 0) > 20}
                    errorMessage="Must be between 0% and 20%"
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Savings Style Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                How Do You Want to Save?
              </p>
              <RadioGroup value={savingsMode} onValueChange={(value) => setSavingsMode(value as SavingsMode)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" className="border-white/50 text-primary" />
                    <Label htmlFor="monthly" className="text-sm font-medium cursor-pointer text-white">
                      Monthly Contribution
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annual" id="annual" className="border-white/50 text-primary" />
                    <Label htmlFor="annual" className="text-sm font-medium cursor-pointer text-white">
                      Annual Contribution
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lumpsum" id="lumpsum" className="border-white/50 text-primary" />
                    <Label htmlFor="lumpsum" className="text-sm font-medium cursor-pointer text-white">
                      One-Time Lump Sum Today
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 mt-6 border-t border-white/15">
              <Button
                onClick={calculateRequiredSavings}
                size="lg"
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
              >
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="h-12 px-6 bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
              >
                Reset
              </Button>
              {result && (
                <Button
                  onClick={() => setEmailModalOpen(true)}
                  variant="outline"
                  size="lg"
                  className="h-12 px-4 bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Card */}
              <Card className="bg-slate-900/90 backdrop-blur-sm border border-accent/40 p-8 rounded-2xl shadow-xl shadow-accent/15">
                <div className="flex items-center gap-3 mb-4">
                  {result.isOnTrack ? (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  ) : (
                    <Target className="h-8 w-8 text-accent" />
                  )}
                  <h2 className="text-2xl font-bold text-white">
                    {result.isOnTrack ? "You're On Track!" : "You need to save approximately:"}
                  </h2>
                </div>
                
                {!result.isOnTrack ? (
                  <div className="mb-6">
                    <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(228,181,72,0.5)] mb-2">
                      {formatCurrency(result.requiredAmount)}
                    </div>
                    <p className="text-xl text-white/80 font-medium">{getModeLabel()}</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-lg text-white/80">
                      Based on your current savings and assumptions, you may already be on track to reach this goal.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-6 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Target goal:</span>
                    <span className="font-semibold text-white">{formatCurrency(result.targetGoal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Timeframe:</span>
                    <span className="font-semibold text-white">{result.timeframe} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Assumed return:</span>
                    <span className="font-semibold text-white">{result.returnRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Current savings:</span>
                    <span className="font-semibold text-white">{formatCurrency(result.currentSavings)}</span>
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
                    { label: "Goal-Based Planning" },
                    { label: "Monthly Savings Clarity" },
                    { label: "Timeline Visualization" },
                    { label: "Progress Tracking Guidance" },
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

              {/* CTA Card */}
              <Card className="bg-slate-900/90 backdrop-blur-sm border border-accent/30 p-6 rounded-2xl shadow-lg shadow-accent/10">
                <h3 className="text-lg font-bold text-white mb-2">Need help building your plan?</h3>
                <p className="text-white/70 mb-4 text-sm">
                  A TFA advisor can help you create a personalized savings and investment strategy.
                </p>
                <Button asChild className="btn-primary-cta w-full">
                  <Link to="/contact">
                    Talk to an Advisor
                  </Link>
                </Button>
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
                  <Target className="h-8 w-8 text-white/50" />
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
        calculatorName="Required Savings Calculator"
        onSendEmail={handleEmailResults}
        isLoading={emailLoading}
      />
    </div>
  );
}
