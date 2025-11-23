import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DollarSign, FileText, Calculator, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

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

  const calculateFederalTax = (taxableIncome: number, status: FilingStatus): number => {
    const brackets = federalBrackets[status];
    let tax = 0;
    let previousMax = 0;

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableInThisBracket * bracket.rate;
        previousMax = bracket.max;
      } else {
        break;
      }
    }

    return tax;
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
    let actualTotalIncome = totalAnnualIncome;
    if (showAdvanced) {
      actualTotalIncome =
        incomeBreakdown.traditional401k +
        incomeBreakdown.rothWithdrawals +
        incomeBreakdown.taxableInvestments +
        incomeBreakdown.socialSecurity +
        incomeBreakdown.pension +
        incomeBreakdown.otherIncome;
    }

    // Calculate taxable Social Security
    const otherTaxableIncome =
      incomeBreakdown.traditional401k +
      incomeBreakdown.taxableInvestments +
      incomeBreakdown.pension +
      incomeBreakdown.otherIncome;

    const taxableSocialSecurity = showAdvanced
      ? calculateSocialSecurityTaxable(incomeBreakdown.socialSecurity, otherTaxableIncome, filingStatus)
      : incomeBreakdown.socialSecurity * 0.85; // Simplified assumption

    // Calculate total taxable income (Roth withdrawals are not taxable)
    const grossTaxableIncome =
      otherTaxableIncome + taxableSocialSecurity;

    // Apply standard deduction
    const standardDeduction = standardDeductions[filingStatus];
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
      totalRetirementIncome: actualTotalIncome,
      taxableIncome,
      federalTax,
      stateTax,
      totalTax,
      afterTaxAnnual,
      afterTaxMonthly,
      federalEffectiveRate,
      stateEffectiveRate,
      combinedEffectiveRate,
      taxableSocialSecurity,
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
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
          {/* Filing Profile */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="w-5 h-5 text-primary" />
                Filing Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="filing-status">Filing Status</Label>
                <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                  <SelectTrigger id="filing-status" className="mt-1.5 h-12">
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

              <div>
                <Label htmlFor="state">State of Residence</Label>
                <Select value={stateCode} onValueChange={setStateCode}>
                  <SelectTrigger id="state" className="mt-1.5 h-12">
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
            </CardContent>
          </Card>

          {/* Retirement Income */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="w-5 h-5 text-primary" />
                Retirement Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="total-income">Total Annual Retirement Income (Before Taxes)</Label>
                <Input
                  id="total-income"
                  type="number"
                  value={totalAnnualIncome}
                  onChange={(e) => setTotalAnnualIncome(Number(e.target.value))}
                  min={0}
                  className="mt-1.5 h-12"
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
                  <Label htmlFor="advanced-breakdown" className="cursor-pointer font-medium">
                    Advanced Income Breakdown
                  </Label>
                </div>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2 border-t border-border/30 animate-fade-in">
                  <p className="text-sm text-muted-foreground">
                    Break down your income sources for more accurate tax estimates.
                  </p>

                  {hasBreakdownMismatch && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <p className="text-xs text-yellow-200">
                        Note: Your breakdown total ({formatCurrency(breakdownTotal)}) doesn't match your total annual
                        income ({formatCurrency(totalAnnualIncome)}).
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="traditional">Traditional 401(k)/IRA & Tax-Deferred Income ($/year)</Label>
                    <Input
                      id="traditional"
                      type="number"
                      value={incomeBreakdown.traditional401k}
                      onChange={(e) =>
                        setIncomeBreakdown({ ...incomeBreakdown, traditional401k: Number(e.target.value) })
                      }
                      min={0}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="roth">Roth 401(k)/Roth IRA Withdrawals ($/year)</Label>
                    <Input
                      id="roth"
                      type="number"
                      value={incomeBreakdown.rothWithdrawals}
                      onChange={(e) =>
                        setIncomeBreakdown({ ...incomeBreakdown, rothWithdrawals: Number(e.target.value) })
                      }
                      min={0}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxable">Taxable Investment / Interest / Dividends ($/year)</Label>
                    <Input
                      id="taxable"
                      type="number"
                      value={incomeBreakdown.taxableInvestments}
                      onChange={(e) =>
                        setIncomeBreakdown({ ...incomeBreakdown, taxableInvestments: Number(e.target.value) })
                      }
                      min={0}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="social-security">Social Security Benefits ($/year)</Label>
                    <Input
                      id="social-security"
                      type="number"
                      value={incomeBreakdown.socialSecurity}
                      onChange={(e) =>
                        setIncomeBreakdown({ ...incomeBreakdown, socialSecurity: Number(e.target.value) })
                      }
                      min={0}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pension">Pension Income ($/year)</Label>
                    <Input
                      id="pension"
                      type="number"
                      value={incomeBreakdown.pension}
                      onChange={(e) => setIncomeBreakdown({ ...incomeBreakdown, pension: Number(e.target.value) })}
                      min={0}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="other">Other Taxable Income ($/year)</Label>
                    <Input
                      id="other"
                      type="number"
                      value={incomeBreakdown.otherIncome}
                      onChange={(e) =>
                        setIncomeBreakdown({ ...incomeBreakdown, otherIncome: Number(e.target.value) })
                      }
                      min={0}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Goal */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-foreground">Goal (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="desired-income">Desired Monthly After-Tax Income</Label>
                <Input
                  id="desired-income"
                  type="number"
                  value={desiredMonthlyIncome}
                  onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
                  min={0}
                  className="mt-1.5 h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={calculateTaxImpact} size="lg" className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {results ? (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Card */}
              <Card className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Estimated After-Tax Monthly Income</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {formatCurrency(results.afterTaxMonthly)}
                    </p>
                    <p className="text-sm text-muted-foreground">per month after taxes</p>
                  </div>

                  <div className="pt-4 border-t border-border/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total annual retirement income:</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(results.totalRetirementIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Estimated federal tax:</span>
                      <span className="font-semibold text-red-400">{formatCurrency(results.federalTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Estimated state tax:</span>
                      <span className="font-semibold text-red-400">{formatCurrency(results.stateTax)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border/30">
                      <span className="text-sm font-medium text-muted-foreground">Total estimated annual tax:</span>
                      <span className="font-bold text-red-400">{formatCurrency(results.totalTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Combined effective tax rate:</span>
                      <span className="font-bold text-foreground">{formatPercent(results.combinedEffectiveRate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gap vs Goal */}
              {desiredMonthlyIncome > 0 && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Your Goal vs Estimated Income</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Your goal:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(desiredMonthlyIncome)} / month
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Estimated after-tax income:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(results.afterTaxMonthly)} / month
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border/30">
                        {results.afterTaxMonthly >= desiredMonthlyIncome ? (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Surplus per month:</span>
                            <span className="text-lg font-bold text-primary">
                              {formatCurrency(results.afterTaxMonthly - desiredMonthlyIncome)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Shortfall per month:</span>
                            <span className="text-lg font-bold text-red-400">
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
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Income Sources */}
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-4">Your Income Sources</h3>
                        <div className="space-y-2 text-sm">
                          {incomeBreakdown.socialSecurity > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Social Security:</span>
                              <span className="font-medium">{formatCurrency(incomeBreakdown.socialSecurity)}</span>
                            </div>
                          )}
                          {incomeBreakdown.pension > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Pension:</span>
                              <span className="font-medium">{formatCurrency(incomeBreakdown.pension)}</span>
                            </div>
                          )}
                          {incomeBreakdown.traditional401k > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tax-deferred:</span>
                              <span className="font-medium">{formatCurrency(incomeBreakdown.traditional401k)}</span>
                            </div>
                          )}
                          {incomeBreakdown.rothWithdrawals > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Roth (tax-free):</span>
                              <span className="font-medium">{formatCurrency(incomeBreakdown.rothWithdrawals)}</span>
                            </div>
                          )}
                          {incomeBreakdown.taxableInvestments > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Taxable investments:</span>
                              <span className="font-medium">{formatCurrency(incomeBreakdown.taxableInvestments)}</span>
                            </div>
                          )}
                          {incomeBreakdown.otherIncome > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Other income:</span>
                              <span className="font-medium">{formatCurrency(incomeBreakdown.otherIncome)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tax Breakdown */}
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-4">Your Estimated Taxes</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Federal tax:</span>
                            <span className="font-medium">{formatCurrency(results.federalTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">State tax:</span>
                            <span className="font-medium">{formatCurrency(results.stateTax)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-border/30">
                            <span className="font-medium text-muted-foreground">Total tax:</span>
                            <span className="font-bold">{formatCurrency(results.totalTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Federal effective rate:</span>
                            <span className="text-xs font-medium">{formatPercent(results.federalEffectiveRate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">State effective rate:</span>
                            <span className="text-xs font-medium">{formatPercent(results.stateEffectiveRate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Guidance CTA */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Not sure if these numbers are right for your situation?
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    A TFA advisor can help you customize your retirement income strategy, coordinate taxes, and explore
                    options to improve after-tax income.
                  </p>
                  <Button
                    size="lg"
                    className="w-full group"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Talk to a TFA Advisor About Taxes in Retirement
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
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Ready to See Your Tax Impact?</h3>
                  <p className="text-muted-foreground">
                    Fill out the form and click Calculate to estimate your federal and state taxes in retirement.
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
          This calculator is for educational purposes only and does not provide tax, legal, or financial advice. Tax
          laws can change and your actual tax situation may differ significantly from these estimates. Please consult a
          qualified tax professional or advisor before making decisions.
        </p>
      </div>
    </div>
  );
}
