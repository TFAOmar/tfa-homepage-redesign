import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, DollarSign, Shield, TrendingUp, Calendar, Users, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EmailResultsModal from "./EmailResultsModal";
import { generateCalculatorPdf } from "@/lib/calculatorPdfGenerator";
import { CurrencyInput } from "@/components/ui/currency-input";
import { NumericInput } from "@/components/ui/numeric-input";

type SolveMode = "premium" | "income";
type CoverageType = "single" | "joint";
type PayoutMode = "monthly" | "yearly";

interface CalculationResults {
  result: number;
  deferralYears: number;
  rollUpGrowth: number;
  monthlyPayout: number;
  yearlyPayout: number;
  accumulationValue: number;
}

// Payout factors based on income start age (simplified approximation)
const getPayoutFactor = (incomeStartAge: number, coverageType: CoverageType): number => {
  // Base payout percentages increase with age
  const baseFactor = coverageType === "single" ? 1.0 : 0.88;
  
  if (incomeStartAge <= 55) return 0.045 * baseFactor;
  if (incomeStartAge <= 60) return 0.050 * baseFactor;
  if (incomeStartAge <= 65) return 0.055 * baseFactor;
  if (incomeStartAge <= 70) return 0.062 * baseFactor;
  if (incomeStartAge <= 75) return 0.070 * baseFactor;
  if (incomeStartAge <= 80) return 0.080 * baseFactor;
  return 0.090 * baseFactor;
};

export default function TFAGuaranteedIncomeCalculator() {
  const [solveMode, setSolveMode] = useState<SolveMode>("income");
  const [coverageType, setCoverageType] = useState<CoverageType>("single");
  const [currentAge, setCurrentAge] = useState(55);
  const [incomeStartAge, setIncomeStartAge] = useState(65);
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("yearly");
  const [premium, setPremium] = useState(100000);
  const [desiredIncome, setDesiredIncome] = useState(10000);
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const ROLL_UP_RATE = 0.08; // 8% roll-up rate
  const RIDER_CHARGE = 0.0115; // 1.15% annual rider charge

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (currentAge < 40 || currentAge > 79) {
      newErrors.currentAge = "Age must be between 40 and 79";
    }
    if (incomeStartAge < 50 || incomeStartAge > 115) {
      newErrors.incomeStartAge = "Income start age must be between 50 and 115";
    }
    if (incomeStartAge <= currentAge) {
      newErrors.incomeStartAge = "Income start age must be greater than current age";
    }
    if (solveMode === "income" && (premium < 20000 || premium > 20000000)) {
      newErrors.premium = "Premium must be between $20,000 and $20,000,000";
    }
    if (solveMode === "premium" && desiredIncome < 1000) {
      newErrors.desiredIncome = "Desired income must be at least $1,000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;

    const deferralYears = incomeStartAge - currentAge;
    const payoutFactor = getPayoutFactor(incomeStartAge, coverageType);

    if (solveMode === "income") {
      // Calculate income from premium
      // Apply roll-up growth during deferral period
      let accumulationValue = premium;
      for (let i = 0; i < deferralYears; i++) {
        accumulationValue = accumulationValue * (1 + ROLL_UP_RATE) * (1 - RIDER_CHARGE);
      }

      const yearlyPayout = accumulationValue * payoutFactor;
      const monthlyPayout = yearlyPayout / 12;
      const rollUpGrowth = accumulationValue - premium;

      setResults({
        result: payoutMode === "yearly" ? yearlyPayout : monthlyPayout,
        deferralYears,
        rollUpGrowth,
        monthlyPayout,
        yearlyPayout,
        accumulationValue,
      });
    } else {
      // Calculate premium needed for desired income
      const targetYearlyIncome = payoutMode === "yearly" ? desiredIncome : desiredIncome * 12;
      
      // Work backwards: needed accumulation value
      const neededAccumulation = targetYearlyIncome / payoutFactor;
      
      // Work backwards through deferral period to find required premium
      let requiredPremium = neededAccumulation;
      for (let i = 0; i < deferralYears; i++) {
        requiredPremium = requiredPremium / ((1 + ROLL_UP_RATE) * (1 - RIDER_CHARGE));
      }

      const rollUpGrowth = neededAccumulation - requiredPremium;
      const yearlyPayout = targetYearlyIncome;
      const monthlyPayout = yearlyPayout / 12;

      setResults({
        result: requiredPremium,
        deferralYears,
        rollUpGrowth,
        monthlyPayout,
        yearlyPayout,
        accumulationValue: neededAccumulation,
      });
    }
  };

  const handleReset = () => {
    setSolveMode("income");
    setCoverageType("single");
    setCurrentAge(55);
    setIncomeStartAge(65);
    setPayoutMode("yearly");
    setPremium(100000);
    setDesiredIncome(10000);
    setResults(null);
    setErrors({});
  };

  const handleEmailResults = async (email: string, firstName: string) => {
    if (!results) return;

    setEmailLoading(true);
    try {
      const pdfInputs = [
        { label: "Calculation Mode", value: solveMode === "income" ? "Solve for Income" : "Solve for Premium" },
        { label: "Coverage Type", value: coverageType === "single" ? "Single Owner" : "Joint Owners" },
        { label: "Current Age", value: `${currentAge} years` },
        { label: "Income Start Age", value: `${incomeStartAge} years` },
        { label: solveMode === "income" ? "Premium Amount" : "Desired Income", value: formatCurrency(solveMode === "income" ? premium : desiredIncome) },
      ];

      const pdfResults = [
        { label: solveMode === "income" ? "ESTIMATED YEARLY INCOME" : "ESTIMATED PREMIUM REQUIRED", value: formatCurrency(results.result), highlight: true },
        { label: "Deferral Period", value: `${results.deferralYears} years` },
        { label: "Accumulation Value", value: formatCurrency(results.accumulationValue) },
        { label: "Roll-Up Growth", value: formatCurrency(results.rollUpGrowth) },
      ];

      const pdfBase64 = generateCalculatorPdf({
        calculatorName: "Guaranteed Income Calculator",
        inputs: pdfInputs,
        results: pdfResults,
        insights: [
          "Guaranteed income provides lifetime financial security.",
          "The 8% roll-up rate compounds during your deferral period.",
        ],
      });

      const { error } = await supabase.functions.invoke("send-calculator-results", {
        body: {
          email,
          firstName,
          calculatorName: "Guaranteed Income Calculator",
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

  const benefits = [
    { icon: Shield, label: "Guaranteed lifetime income" },
    { icon: TrendingUp, label: "8% roll-up rate during deferral" },
    { icon: DollarSign, label: "Tax-deferred growth" },
    { icon: Users, label: "Joint coverage available" },
  ];

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6 animate-fade-in">
          <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-white/15">
              <div className="h-1 w-14 rounded-full bg-primary mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Guaranteed Income Calculator
              </h3>
              <p className="text-sm text-white/70">
                Estimate guaranteed lifetime income from a fixed index annuity.
              </p>
            </div>

            {/* Solve Mode Toggle */}
            <div className="mb-6">
              <Label className="text-sm font-semibold text-white mb-3 block">
                What would you like to calculate?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={solveMode === "income" ? "default" : "outline"}
                  onClick={() => setSolveMode("income")}
                  className={`rounded-xl py-3 font-medium ${
                    solveMode === "income"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
                  }`}
                >
                  Solve for Income
                </Button>
                <Button
                  type="button"
                  variant={solveMode === "premium" ? "default" : "outline"}
                  onClick={() => setSolveMode("premium")}
                  className={`rounded-xl py-3 font-medium ${
                    solveMode === "premium"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
                  }`}
                >
                  Solve for Premium
                </Button>
              </div>
            </div>

            {/* Coverage Type */}
            <div className="mb-6">
              <Label className="text-sm font-semibold text-white mb-3 block">
                Coverage Type
              </Label>
              <RadioGroup
                value={coverageType}
                onValueChange={(value) => setCoverageType(value as CoverageType)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" className="border-white/50 text-primary" />
                  <Label htmlFor="single" className="text-sm text-white cursor-pointer">
                    Single Owner
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="joint" id="joint" className="border-white/50 text-primary" />
                  <Label htmlFor="joint" className="text-sm text-white cursor-pointer">
                    Joint Owners
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Age Inputs */}
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Timeline
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentAge" className="text-sm font-medium text-white">
                    Current Age
                  </Label>
                  <NumericInput
                    id="currentAge"
                    value={currentAge}
                    onChange={(value) => setCurrentAge(Math.max(40, Math.min(79, value)))}
                    min={40}
                    max={79}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.currentAge && (
                    <p className="text-[11px] text-destructive">{errors.currentAge}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="incomeStartAge" className="text-sm font-medium text-white">
                    Income Start Age
                  </Label>
                  <NumericInput
                    id="incomeStartAge"
                    value={incomeStartAge}
                    onChange={(value) => setIncomeStartAge(Math.max(50, Math.min(115, value)))}
                    min={50}
                    max={115}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.incomeStartAge && (
                    <p className="text-[11px] text-destructive">{errors.incomeStartAge}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payout Mode */}
            <div className="mb-6">
              <Label className="text-sm font-semibold text-white mb-3 block">
                Payout Frequency
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={payoutMode === "monthly" ? "default" : "outline"}
                  onClick={() => setPayoutMode("monthly")}
                  className={`rounded-xl py-3 font-medium ${
                    payoutMode === "monthly"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
                  }`}
                >
                  Monthly
                </Button>
                <Button
                  type="button"
                  variant={payoutMode === "yearly" ? "default" : "outline"}
                  onClick={() => setPayoutMode("yearly")}
                  className={`rounded-xl py-3 font-medium ${
                    payoutMode === "yearly"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80"
                  }`}
                >
                  Yearly
                </Button>
              </div>
            </div>

            {/* Dynamic Input Based on Solve Mode */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">
                {solveMode === "income" ? "Premium Amount" : "Desired Income"}
              </p>
              
              {solveMode === "income" ? (
                <div className="space-y-1.5">
                  <Label htmlFor="premium" className="text-sm font-medium text-white">
                    Initial Premium
                  </Label>
                  <CurrencyInput
                    id="premium"
                    value={premium}
                    onChange={(value) => setPremium(Math.max(20000, Math.min(20000000, value)))}
                    min={20000}
                    max={20000000}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  <p className="text-[11px] text-white/60">
                    Minimum $20,000 • Maximum $20,000,000
                  </p>
                  {errors.premium && (
                    <p className="text-[11px] text-destructive">{errors.premium}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label htmlFor="desiredIncome" className="text-sm font-medium text-white">
                    Desired {payoutMode === "monthly" ? "Monthly" : "Yearly"} Income
                  </Label>
                  <CurrencyInput
                    id="desiredIncome"
                    value={desiredIncome}
                    onChange={(value) => setDesiredIncome(Math.max(1000, value))}
                    min={1000}
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                  {errors.desiredIncome && (
                    <p className="text-[11px] text-destructive">{errors.desiredIncome}</p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={calculate}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl py-3 shadow-lg shadow-primary/25"
              >
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80 rounded-xl py-3 px-6"
              >
                Reset
              </Button>
              {results && (
                <Button
                  onClick={() => setEmailModalOpen(true)}
                  variant="outline"
                  className="bg-slate-800/80 border-white/25 text-white hover:bg-slate-700/80 rounded-xl py-3 px-4"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {/* Results Card */}
          <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-white/15">
              <div className="h-1 w-14 rounded-full bg-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {results ? "Your Estimate" : "Results"}
              </h3>
              <p className="text-sm text-white/70">
                {results
                  ? solveMode === "income"
                    ? "Estimated guaranteed lifetime income"
                    : "Estimated premium required"
                  : "Enter your details and click Calculate"}
              </p>
            </div>

            {results ? (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 text-center border border-accent/40 shadow-xl shadow-accent/15">
                  <p className="text-sm font-medium text-white/80 mb-2">
                    {solveMode === "income"
                      ? `Estimated ${payoutMode === "monthly" ? "Monthly" : "Yearly"} Income`
                      : "Estimated Premium Required"}
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(228,181,72,0.4)]">
                    {formatCurrency(results.result)}
                  </p>
                  {solveMode === "income" && (
                    <p className="text-sm text-white/70 mt-2">
                      Guaranteed for life
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                    Breakdown
                  </h4>
                  
                  <div className="grid gap-3 bg-slate-800/60 rounded-xl p-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/80 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        Deferral Period
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {results.deferralYears} years
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/80 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        Roll-Up Growth
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(results.rollUpGrowth)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/80 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-accent" />
                        Accumulation Value
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(results.accumulationValue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/80">Monthly Payout</span>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(results.monthlyPayout)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-white/80">Yearly Payout</span>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(results.yearlyPayout)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-white/50" />
                </div>
                <p className="text-white/60">
                  Your results will appear here
                </p>
              </div>
            )}
          </Card>

          {/* Benefits Card */}
          <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Key Benefits
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
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
        </div>
      </div>

      <EmailResultsModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        calculatorName="Guaranteed Income Calculator"
        onSendEmail={handleEmailResults}
        isLoading={emailLoading}
      />
    </div>
  );
}
