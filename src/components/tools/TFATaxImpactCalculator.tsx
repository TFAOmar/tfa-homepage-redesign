import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DollarSign, FileText, Calculator, ArrowRight, ChevronDown, ChevronUp, Mail, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EmailResultsModal from "./EmailResultsModal";
import { generateCalculatorPdf } from "@/lib/calculatorPdfGenerator";
import { CurrencyInput } from "@/components/ui/currency-input";

type FilingStatus = "single" | "married-joint" | "married-separate" | "head-of-household";

interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

interface IncomeBreakdown {
  traditional401k: number;
  rothWithdrawals: number;
  taxableInvestments: number;
  socialSecurity: number;
  pension: number;
  otherIncome: number;
}

interface TaxResults {
  totalRetirementIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  afterTaxAnnual: number;
  afterTaxMonthly: number;
  federalEffectiveRate: number;
  stateEffectiveRate: number;
  combinedEffectiveRate: number;
  taxableSocialSecurity: number;
}

// 2024 Federal Tax Brackets (simplified)
const federalBrackets: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
  "married-joint": [
    { rate: 0.10, min: 0, max: 23200 },
    { rate: 0.12, min: 23200, max: 94300 },
    { rate: 0.22, min: 94300, max: 201050 },
    { rate: 0.24, min: 201050, max: 383900 },
    { rate: 0.32, min: 383900, max: 487450 },
    { rate: 0.35, min: 487450, max: 731200 },
    { rate: 0.37, min: 731200, max: Infinity },
  ],
  "married-separate": [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 365600 },
    { rate: 0.37, min: 365600, max: Infinity },
  ],
  "head-of-household": [
    { rate: 0.10, min: 0, max: 16550 },
    { rate: 0.12, min: 16550, max: 63100 },
    { rate: 0.22, min: 63100, max: 100500 },
    { rate: 0.24, min: 100500, max: 191950 },
    { rate: 0.32, min: 191950, max: 243700 },
    { rate: 0.35, min: 243700, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
};

const standardDeductions: Record<FilingStatus, number> = {
  single: 14600,
  "married-joint": 29200,
  "married-separate": 14600,
  "head-of-household": 21900,
};

// Simplified state tax rates (flat rates for MVP)
const stateTaxRates: Record<string, number> = {
  AL: 0.05, AK: 0, AZ: 0.025, AR: 0.049, CA: 0.093, CO: 0.044, CT: 0.07,
  DE: 0.066, FL: 0, GA: 0.0575, HI: 0.11, ID: 0.058, IL: 0.0495,
  IN: 0.0323, IA: 0.06, KS: 0.057, KY: 0.045, LA: 0.0425, ME: 0.075,
  MD: 0.0575, MA: 0.05, MI: 0.0425, MN: 0.0985, MS: 0.05, MO: 0.049,
  MT: 0.0675, NE: 0.0684, NV: 0, NH: 0, NJ: 0.1075, NM: 0.059,
  NY: 0.1090, NC: 0.0475, ND: 0.029, OH: 0.0399, OK: 0.05, OR: 0.099,
  PA: 0.0307, RI: 0.0599, SC: 0.07, SD: 0, TN: 0, TX: 0,
  UT: 0.0465, VT: 0.0875, VA: 0.0575, WA: 0, WV: 0.065, WI: 0.0765,
  WY: 0, DC: 0.1075,
};

const noTaxStates = ["AK", "FL", "NV", "SD", "TN", "TX", "WA", "WY", "NH"];

const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska (no state income tax)" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida (no state income tax)" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada (no state income tax)" },
  { code: "NH", name: "New Hampshire (no state income tax)" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota (no state income tax)" },
  { code: "TN", name: "Tennessee (no state income tax)" },
  { code: "TX", name: "Texas (no state income tax)" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington (no state income tax)" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming (no state income tax)" },
  { code: "DC", name: "District of Columbia" },
];

export default function TFATaxImpactCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("married-joint");
  const [stateCode, setStateCode] = useState<string>("CA");
  const [totalAnnualIncome, setTotalAnnualIncome] = useState(72000);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(4500);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [incomeBreakdown, setIncomeBreakdown] = useState<IncomeBreakdown>({
    traditional401k: 30000,
    rothWithdrawals: 0,
    taxableInvestments: 10000,
    socialSecurity: 24000,
    pension: 8000,
    otherIncome: 0,
  });

  const [results, setResults] = useState<TaxResults | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const calculateFederalTax = (taxableIncome: number, status: FilingStatus): number => {
    if (!isFinite(taxableIncome) || taxableIncome <= 0) return 0;
    
    const brackets = federalBrackets[status];
    let tax = 0;

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableInThisBracket * bracket.rate;
      } else {
        break;
      }
    }

    return isFinite(tax) ? tax : 0;
  };

  const calculateSocialSecurityTaxable = (
    ssIncome: number,
    otherIncome: number,
    status: FilingStatus
  ): number => {
    // Simplified: Calculate provisional income
    const provisionalIncome = otherIncome + ssIncome * 0.5;

    // Thresholds for taxability
    const threshold1 = status === "married-joint" ? 32000 : 25000;
    const threshold2 = status === "married-joint" ? 44000 : 34000;

    if (provisionalIncome <= threshold1) {
      return 0;
    } else if (provisionalIncome <= threshold2) {
      return Math.min(ssIncome * 0.5, (provisionalIncome - threshold1) * 0.5);
    } else {
      const tier1 = Math.min(ssIncome * 0.5, (threshold2 - threshold1) * 0.5);
      const tier2 = Math.min(ssIncome * 0.85 - tier1, (provisionalIncome - threshold2) * 0.85);
      return tier1 + tier2;
    }
  };

  const calculateTaxImpact = () => {
    // Calculate total income from breakdown if advanced mode is enabled
    let actualTotalIncome = totalAnnualIncome || 0;
    if (showAdvanced) {
      actualTotalIncome =
        (incomeBreakdown.traditional401k || 0) +
        (incomeBreakdown.rothWithdrawals || 0) +
        (incomeBreakdown.taxableInvestments || 0) +
        (incomeBreakdown.socialSecurity || 0) +
        (incomeBreakdown.pension || 0) +
        (incomeBreakdown.otherIncome || 0);
    }

    // Calculate taxable Social Security
    const otherTaxableIncome =
      (incomeBreakdown.traditional401k || 0) +
      (incomeBreakdown.taxableInvestments || 0) +
      (incomeBreakdown.pension || 0) +
      (incomeBreakdown.otherIncome || 0);

    const taxableSocialSecurity = showAdvanced
      ? calculateSocialSecurityTaxable(incomeBreakdown.socialSecurity || 0, otherTaxableIncome, filingStatus)
      : (incomeBreakdown.socialSecurity || 0) * 0.85; // Simplified assumption

    // Calculate total taxable income (Roth withdrawals are not taxable)
    const grossTaxableIncome = otherTaxableIncome + taxableSocialSecurity;

    // Apply standard deduction
    const standardDeduction = standardDeductions[filingStatus] || 0;
    const taxableIncome = Math.max(0, grossTaxableIncome - standardDeduction);

    // Calculate federal tax
    const federalTax = calculateFederalTax(taxableIncome, filingStatus);

    // Calculate state tax (simplified flat rate)
    const stateRate = stateTaxRates[stateCode] || 0;
    const stateTax = grossTaxableIncome * stateRate;

    // Calculate totals
    const totalTax = federalTax + stateTax;
    const afterTaxAnnual = actualTotalIncome - totalTax;
    const afterTaxMonthly = afterTaxAnnual / 12;

    const federalEffectiveRate = actualTotalIncome > 0 ? (federalTax / actualTotalIncome) * 100 : 0;
    const stateEffectiveRate = actualTotalIncome > 0 ? (stateTax / actualTotalIncome) * 100 : 0;
    const combinedEffectiveRate = actualTotalIncome > 0 ? (totalTax / actualTotalIncome) * 100 : 0;

    setResults({
      totalRetirementIncome: isFinite(actualTotalIncome) ? actualTotalIncome : 0,
      taxableIncome: isFinite(taxableIncome) ? taxableIncome : 0,
      federalTax: isFinite(federalTax) ? federalTax : 0,
      stateTax: isFinite(stateTax) ? stateTax : 0,
      totalTax: isFinite(totalTax) ? totalTax : 0,
      afterTaxAnnual: isFinite(afterTaxAnnual) ? afterTaxAnnual : 0,
      afterTaxMonthly: isFinite(afterTaxMonthly) ? afterTaxMonthly : 0,
      federalEffectiveRate: isFinite(federalEffectiveRate) ? federalEffectiveRate : 0,
      stateEffectiveRate: isFinite(stateEffectiveRate) ? stateEffectiveRate : 0,
      combinedEffectiveRate: isFinite(combinedEffectiveRate) ? combinedEffectiveRate : 0,
      taxableSocialSecurity: isFinite(taxableSocialSecurity) ? taxableSocialSecurity : 0,
    });
  };

  const handleReset = () => {
    setFilingStatus("married-joint");
    setStateCode("CA");
    setTotalAnnualIncome(72000);
    setDesiredMonthlyIncome(4500);
    setShowAdvanced(false);
    setIncomeBreakdown({
      traditional401k: 30000,
      rothWithdrawals: 0,
      taxableInvestments: 10000,
      socialSecurity: 24000,
      pension: 8000,
      otherIncome: 0,
    });
    setResults(null);
  };

  const handleEmailResults = async (email: string, firstName: string) => {
    if (!results) return;

    setEmailLoading(true);
    try {
      const stateName = states.find(s => s.code === stateCode)?.name || stateCode;
      const pdfInputs = [
        { label: "Filing Status", value: filingStatus.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) },
        { label: "State", value: stateName },
        { label: "Total Annual Income", value: formatCurrency(totalAnnualIncome) },
      ];

      const pdfResults = [
        { label: "AFTER-TAX MONTHLY INCOME", value: formatCurrency(results.afterTaxMonthly), highlight: true },
        { label: "Federal Tax", value: formatCurrency(results.federalTax) },
        { label: "State Tax", value: formatCurrency(results.stateTax) },
        { label: "Total Tax", value: formatCurrency(results.totalTax) },
        { label: "Effective Tax Rate", value: formatPercent(results.combinedEffectiveRate) },
      ];

      const pdfBase64 = generateCalculatorPdf({
        calculatorName: "Tax Impact Calculator",
        inputs: pdfInputs,
        results: pdfResults,
        insights: [
          "Tax-efficient withdrawal strategies can help maximize your after-tax income.",
          "Consider the tax implications of different retirement account types.",
        ],
      });

      const { error } = await supabase.functions.invoke("send-calculator-results", {
        body: {
          email,
          firstName,
          calculatorName: "Tax Impact Calculator",
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

  const formatPercent = (value: number) => {
    if (!isFinite(value)) return "0.00%";
    return `${value.toFixed(2)}%`;
  };

  const breakdownTotal =
    incomeBreakdown.traditional401k +
    incomeBreakdown.rothWithdrawals +
    incomeBreakdown.taxableInvestments +
    incomeBreakdown.socialSecurity +
    incomeBreakdown.pension +
    incomeBreakdown.otherIncome;

  const hasBreakdownMismatch = showAdvanced && Math.abs(breakdownTotal - totalAnnualIncome) > 100;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6 animate-fade-in">
          {/* Main Inputs Card */}
          <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6 md:p-8">
            {/* Header with gold accent */}
            <div className="mb-6 pb-4 border-b border-white/15">
              <div className="h-1 w-14 rounded-full bg-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Tax & Income Inputs
              </h3>
              <p className="text-sm text-white/70">
                Share your filing status, state, and retirement income sources.
              </p>
            </div>

            {/* Filing Profile Subsection */}
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Filing Profile
              </p>
              
              <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="filing-status" className="text-sm font-medium text-white">Filing Status</Label>
                <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                  <SelectTrigger id="filing-status" className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                    <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                    <SelectItem value="head-of-household">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state" className="text-sm font-medium text-white">State of Residence</Label>
                <Select value={stateCode} onValueChange={setStateCode}>
                  <SelectTrigger id="state" className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {states.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

            {/* Retirement Income Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Retirement Income
              </p>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="total-income" className="text-sm font-medium text-white">Total Annual Retirement Income (Before Taxes)</Label>
                  <CurrencyInput
                    id="total-income"
                    value={totalAnnualIncome}
                    onChange={(value) => setTotalAnnualIncome(Math.max(0, value))}
                    min={0}
                    isValid={totalAnnualIncome >= 0}
                    isInvalid={totalAnnualIncome < 0}
                    errorMessage="Cannot be negative"
                    className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>

                {/* Advanced Breakdown Toggle */}
                <div className="flex items-center justify-between pt-2 pb-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="advanced-breakdown"
                      checked={showAdvanced}
                      onCheckedChange={setShowAdvanced}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="advanced-breakdown" className="cursor-pointer font-medium text-sm text-white">
                      Advanced Income Breakdown
                    </Label>
                  </div>
                  {showAdvanced ? <ChevronUp className="w-4 h-4 text-white/70" /> : <ChevronDown className="w-4 h-4 text-white/70" />}
                </div>

                {showAdvanced && (
                  <div className="space-y-4 pt-2 border-t border-white/20 animate-fade-in">
                    <p className="text-sm text-white/70">
                      Break down your income sources for more accurate tax estimates.
                    </p>

                  {hasBreakdownMismatch && (
                    <div className="bg-yellow-500/15 border border-yellow-500/40 rounded-lg p-3">
                      <p className="text-xs text-yellow-300">
                        Note: Your breakdown total ({formatCurrency(breakdownTotal)}) doesn't match your total annual
                        income ({formatCurrency(totalAnnualIncome)}).
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="traditional" className="text-sm font-medium text-white">Traditional 401(k)/IRA & Tax-Deferred Income ($/year)</Label>
                    <CurrencyInput
                      id="traditional"
                      value={incomeBreakdown.traditional401k}
                      onChange={(value) =>
                        setIncomeBreakdown({ ...incomeBreakdown, traditional401k: Math.max(0, value) })
                      }
                      min={0}
                      className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary mt-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="roth" className="text-sm font-medium text-white">Roth 401(k)/Roth IRA Withdrawals ($/year)</Label>
                    <CurrencyInput
                      id="roth"
                      value={incomeBreakdown.rothWithdrawals}
                      onChange={(value) =>
                        setIncomeBreakdown({ ...incomeBreakdown, rothWithdrawals: Math.max(0, value) })
                      }
                      min={0}
                      className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary mt-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="taxable" className="text-sm font-medium text-white">Taxable Investment / Interest / Dividends ($/year)</Label>
                    <CurrencyInput
                      id="taxable"
                      value={incomeBreakdown.taxableInvestments}
                      onChange={(value) =>
                        setIncomeBreakdown({ ...incomeBreakdown, taxableInvestments: Math.max(0, value) })
                      }
                      min={0}
                      className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary mt-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ss" className="text-sm font-medium text-white">Social Security Benefits ($/year)</Label>
                    <CurrencyInput
                      id="ss"
                      value={incomeBreakdown.socialSecurity}
                      onChange={(value) =>
                        setIncomeBreakdown({ ...incomeBreakdown, socialSecurity: Math.max(0, value) })
                      }
                      min={0}
                      className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary mt-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="pension" className="text-sm font-medium text-white">Pension Income ($/year)</Label>
                    <CurrencyInput
                      id="pension"
                      value={incomeBreakdown.pension}
                      onChange={(value) => setIncomeBreakdown({ ...incomeBreakdown, pension: Math.max(0, value) })}
                      min={0}
                      className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary mt-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="other" className="text-sm font-medium text-white">Other Taxable Income ($/year)</Label>
                    <CurrencyInput
                      id="other"
                      value={incomeBreakdown.otherIncome}
                      onChange={(value) =>
                        setIncomeBreakdown({ ...incomeBreakdown, otherIncome: Math.max(0, value) })
                      }
                      min={0}
                      className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary mt-1.5"
                    />
                  </div>
                  </div>
                )}
              </div>
            </div>

            {/* Goal Subsection */}
            <div className="space-y-4 mt-6 md:mt-6">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Goal (Optional)
              </p>
              
              <div className="space-y-1.5">
                <Label htmlFor="desired-income" className="text-sm font-medium text-white">Desired Monthly After-Tax Income</Label>
                <CurrencyInput
                  id="desired-income"
                  value={desiredMonthlyIncome}
                  onChange={(value) => setDesiredMonthlyIncome(Math.max(0, value))}
                  min={0}
                  className="w-full rounded-xl bg-slate-800/80 border border-white/25 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 mt-6 border-t border-white/15">
              <Button onClick={calculateTaxImpact} size="lg" className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25">
                <Calculator className="w-4 h-4 mr-2" />
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
        <div className="space-y-6">
          {results ? (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Card */}
              <Card className="bg-slate-900/90 backdrop-blur-sm border border-accent/40 shadow-xl shadow-accent/15">
                <CardHeader>
                  <CardTitle className="text-2xl text-white font-bold">Estimated After-Tax Monthly Income</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(228,181,72,0.5)] mb-2">
                      {formatCurrency(results.afterTaxMonthly)}
                    </p>
                    <p className="text-sm text-white/70">per month after taxes</p>
                  </div>

                  <div className="pt-4 border-t border-white/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">Total annual retirement income:</span>
                      <span className="font-semibold text-white">
                        {formatCurrency(results.totalRetirementIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">Estimated federal tax:</span>
                      <span className="font-semibold text-red-400">{formatCurrency(results.federalTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">Estimated state tax:</span>
                      <span className="font-semibold text-red-400">{formatCurrency(results.stateTax)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/15">
                      <span className="text-sm font-medium text-white/80">Total estimated annual tax:</span>
                      <span className="font-bold text-red-400">{formatCurrency(results.totalTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white/80">Combined effective tax rate:</span>
                      <span className="font-bold text-white">{formatPercent(results.combinedEffectiveRate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gap vs Goal */}
              {desiredMonthlyIncome > 0 && (
                <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-white mb-4">Your Goal vs Estimated Income</h3>
                    <div className="space-y-3 bg-slate-800/60 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Your goal:</span>
                        <span className="font-semibold text-white">
                          {formatCurrency(desiredMonthlyIncome)} / month
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Estimated after-tax income:</span>
                        <span className="font-semibold text-white">
                          {formatCurrency(results.afterTaxMonthly)} / month
                        </span>
                      </div>
                      <div className="pt-3 border-t border-white/15">
                        {results.afterTaxMonthly >= desiredMonthlyIncome ? (
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Surplus per month:</span>
                            <span className="text-lg font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]">
                              {formatCurrency(results.afterTaxMonthly - desiredMonthlyIncome)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Shortfall per month:</span>
                            <span className="text-lg font-bold text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">
                              {formatCurrency(desiredMonthlyIncome - results.afterTaxMonthly)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Source & Tax Breakdown */}
              {showAdvanced && (
                <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40">
                  <CardContent className="pt-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Income Sources */}
                      <div>
                        <h3 className="text-base font-bold text-white mb-4">Your Income Sources</h3>
                        <div className="space-y-2 text-sm bg-slate-800/60 rounded-xl p-4">
                          {incomeBreakdown.socialSecurity > 0 && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Social Security:</span>
                              <span className="font-medium text-white">{formatCurrency(incomeBreakdown.socialSecurity)}</span>
                            </div>
                          )}
                          {incomeBreakdown.pension > 0 && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Pension:</span>
                              <span className="font-medium text-white">{formatCurrency(incomeBreakdown.pension)}</span>
                            </div>
                          )}
                          {incomeBreakdown.traditional401k > 0 && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Tax-deferred:</span>
                              <span className="font-medium text-white">{formatCurrency(incomeBreakdown.traditional401k)}</span>
                            </div>
                          )}
                          {incomeBreakdown.rothWithdrawals > 0 && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Roth (tax-free):</span>
                              <span className="font-medium text-white">{formatCurrency(incomeBreakdown.rothWithdrawals)}</span>
                            </div>
                          )}
                          {incomeBreakdown.taxableInvestments > 0 && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Taxable investments:</span>
                              <span className="font-medium text-white">{formatCurrency(incomeBreakdown.taxableInvestments)}</span>
                            </div>
                          )}
                          {incomeBreakdown.otherIncome > 0 && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Other income:</span>
                              <span className="font-medium text-white">{formatCurrency(incomeBreakdown.otherIncome)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tax Breakdown */}
                      <div>
                        <h3 className="text-base font-bold text-white mb-4">Your Estimated Taxes</h3>
                        <div className="space-y-2 text-sm bg-slate-800/60 rounded-xl p-4">
                          <div className="flex justify-between">
                            <span className="text-white/70">Federal tax:</span>
                            <span className="font-medium text-white">{formatCurrency(results.federalTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">State tax:</span>
                            <span className="font-medium text-white">{formatCurrency(results.stateTax)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-white/15">
                            <span className="font-medium text-white/80">Total tax:</span>
                            <span className="font-bold text-white">{formatCurrency(results.totalTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-white/60">Federal effective rate:</span>
                            <span className="text-xs font-medium text-white">{formatPercent(results.federalEffectiveRate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-white/60">State effective rate:</span>
                            <span className="text-xs font-medium text-white">{formatPercent(results.stateEffectiveRate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Key Benefits Card */}
              <Card className="bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl shadow-black/40 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                  Key Benefits
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Tax-Deferred vs Taxable Comparison" },
                    { label: "Marginal Tax Rate Analysis" },
                    { label: "Contribution Planning Tool" },
                    { label: "After-Tax Wealth Projection" },
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

              {/* Guidance CTA */}
              <Card className="bg-slate-900/90 backdrop-blur-sm border border-accent/30 shadow-lg shadow-accent/10">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Not sure if these numbers are right for your situation?
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Our advisors can help you customize your retirement income strategy, coordinate taxes, and explore
                    options to improve after-tax income.
                  </p>
                  <Button
                    size="lg"
                    className="btn-primary-cta w-full group"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Talk to an Advisor About Taxes in Retirement
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
                  <Calculator className="h-8 w-8 text-white/50" />
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
          This calculator is for educational purposes only and provides simplified estimates. Actual tax liability
          depends on many factors not captured here. Please consult a qualified tax professional for personalized
          advice.
        </p>
      </div>

      <EmailResultsModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        calculatorName="Tax Impact Calculator"
        onSendEmail={handleEmailResults}
        isLoading={emailLoading}
      />
    </div>
  );
}
