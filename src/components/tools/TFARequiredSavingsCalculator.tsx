import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Target } from "lucide-react";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyWithDecimals = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateRequiredSavings = () => {
    const FV = parseFloat(targetAmount) || 0;
    const PV = parseFloat(currentSavings) || 0;
    const years = parseFloat(yearsUntilGoal) || 0;
    const rate = (parseFloat(returnRate) || 0) / 100;

    if (FV <= 0 || years <= 0) {
      return;
    }

    let requiredAmount = 0;
    let isOnTrack = false;

    if (savingsMode === "lumpsum") {
      // Calculate lump sum needed today
      const pvRequired = FV / Math.pow(1 + rate, years);
      requiredAmount = Math.max(0, pvRequired - PV);
      isOnTrack = requiredAmount === 0;
    } else if (savingsMode === "annual") {
      // Calculate annual contribution needed
      const futureValueOfCurrentSavings = PV * Math.pow(1 + rate, years);
      const remainingNeeded = FV - futureValueOfCurrentSavings;
      
      if (remainingNeeded <= 0) {
        requiredAmount = 0;
        isOnTrack = true;
      } else {
        // Future value of annuity formula: FV = PMT * [((1 + r)^n - 1) / r]
        const fvAnnuityFactor = (Math.pow(1 + rate, years) - 1) / rate;
        requiredAmount = remainingNeeded / fvAnnuityFactor;
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
        // Future value of annuity formula with monthly periods
        const fvAnnuityFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        requiredAmount = remainingNeeded / fvAnnuityFactor;
      }
    }

    setResult({
      requiredAmount,
      targetGoal: FV,
      timeframe: years,
      returnRate: parseFloat(returnRate),
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
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg shadow-black/30 rounded-2xl p-6 md:p-8">
            {/* Header with gold accent */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="h-1 w-14 rounded-full bg-primary mb-4" />
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                Goal & Savings Inputs
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Set your target and see how much you may need to save.
              </p>
            </div>

            {/* Your Goal Subsection */}
            <div className="space-y-4 mb-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Your Goal
              </p>
              
              <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="goalType" className="text-xs md:text-sm text-foreground">
                  Goal Type
                </Label>
                <Select value={goalType} onValueChange={setGoalType}>
                  <SelectTrigger id="goalType" className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground px-3.5 py-2.5 md:px-4 md:py-3">
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
                <Label htmlFor="targetAmount" className="text-xs md:text-sm text-foreground">
                  Target Goal Amount ($)
                </Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  min="0"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="yearsUntilGoal" className="text-xs md:text-sm text-foreground">
                  Years Until Goal
                </Label>
                <Input
                  id="yearsUntilGoal"
                  type="number"
                  value={yearsUntilGoal}
                  onChange={(e) => setYearsUntilGoal(e.target.value)}
                  className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                  min="1"
                />
                <p className="text-[11px] md:text-xs text-muted-foreground">
                  How many years from now until you want to reach this goal?
                </p>
              </div>
            </div>
          </div>

            {/* Existing Savings Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Existing Savings
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentSavings" className="text-xs md:text-sm text-foreground">
                    Current Savings Toward This Goal ($)
                  </Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                    min="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="returnRate" className="text-xs md:text-sm text-foreground">
                    Expected Annual Rate of Return (%)
                  </Label>
                  <Input
                    id="returnRate"
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    className="w-full rounded-xl bg-white/8 border border-white/20 text-foreground placeholder:text-white/40 px-3.5 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                    min="0"
                    max="20"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Savings Style Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                How Do You Want to Save?
              </p>
              <RadioGroup value={savingsMode} onValueChange={(value) => setSavingsMode(value as SavingsMode)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="text-xs md:text-sm font-medium cursor-pointer text-foreground">
                      Monthly Contribution
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annual" id="annual" />
                    <Label htmlFor="annual" className="text-xs md:text-sm font-medium cursor-pointer text-foreground">
                      Annual Contribution
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lumpsum" id="lumpsum" />
                    <Label htmlFor="lumpsum" className="text-xs md:text-sm font-medium cursor-pointer text-foreground">
                      One-Time Lump Sum Today
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={calculateRequiredSavings}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-full py-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Calculate Required Savings
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 sm:flex-initial border-white/20 hover:bg-white/5 rounded-full py-6"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Card */}
              <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border-white/10 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {result.isOnTrack ? "You're On Track! 🎉" : "You need to save approximately:"}
                </h2>
                
                {!result.isOnTrack ? (
                  <div className="mb-6">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
                      {formatCurrency(result.requiredAmount)}
                    </div>
                    <p className="text-xl text-muted-foreground">{getModeLabel()}</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-lg text-muted-foreground">
                      Based on your current savings and assumptions, you may already be on track to reach this goal.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target goal:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.targetGoal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Timeframe:</span>
                    <span className="font-semibold text-foreground">{result.timeframe} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assumed return:</span>
                    <span className="font-semibold text-foreground">{result.returnRate}% annually</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current savings:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.currentSavings)}</span>
                  </div>
                </div>
              </Card>

              {/* Progress Context */}
              {result.currentSavings > 0 && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Your Progress
                  </h3>
                  <p className="text-muted-foreground">
                    You've already saved <span className="font-semibold text-foreground">{formatCurrency(result.currentSavings)}</span> toward this goal.
                    {!result.isOnTrack && (
                      <>
                        {" "}If you maintain this savings plan, you're projected to reach your target in {result.timeframe} years.
                      </>
                    )}
                  </p>
                </Card>
              )}

              {/* What If Section */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  💡 What If?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Small adjustments in return, time horizon, or savings amount can significantly change your outcome. Try different scenarios to see the impact.
                </p>
              </Card>

              {/* Advisory CTA */}
              <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border-white/10 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Want help building a strategy to reach this goal?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A TFA advisor can help personalize your plan and coordinate investments, protection, and taxes.
                </p>
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    Talk to an Advisor About My Goal
                  </Button>
                </Link>
              </Card>
            </div>
          ) : (
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12 rounded-2xl text-center">
              <Target className="w-16 h-16 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Enter your goal details and click "Calculate Required Savings" to see your personalized results.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 text-center">
        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          This calculator is for educational purposes only and does not guarantee future results. Actual outcomes may vary based on market performance, contributions, fees, taxes, and other factors. Consider speaking with a licensed advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}

