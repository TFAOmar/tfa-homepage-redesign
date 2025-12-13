import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Shield, ArrowRight } from "lucide-react";

type Gender = "male" | "female";

interface CalculationResults {
  annualDistribution: number;
  totalDistributions: number;
  deathBenefit: number;
  distributionStartAge: number;
}

const KaiZenCalculator = () => {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(45);
  const [annualContribution, setAnnualContribution] = useState(25000);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate results based on inputs
  useEffect(() => {
    const calculateResults = () => {
      // Base illustrated rate
      const illustratedRate = 0.0665;
      
      // 5-year contribution period
      const contributionYears = 5;
      const totalContribution = annualContribution * contributionYears;
      
      // Bank matching leverage (approximately 3:1)
      const leverageMultiplier = 3;
      const totalPremium = totalContribution * leverageMultiplier;
      
      // Distribution start age: max(65, current_age + 15)
      const distributionStartAge = Math.max(65, age + 15);
      const yearsUntilDistribution = distributionStartAge - age;
      
      // Years of distribution (until age 90)
      const distributionEndAge = 90;
      const distributionYears = distributionEndAge - distributionStartAge;
      
      // Growth factor based on years until distribution
      const growthFactor = Math.pow(1 + illustratedRate, yearsUntilDistribution);
      
      // Age factor: younger ages get more growth time
      const ageFactor = 1 + ((60 - age) / 100);
      
      // Gender factor (slight actuarial adjustment)
      const genderFactor = gender === "female" ? 1.02 : 1.0;
      
      // Calculate projected account value at distribution
      const projectedValue = totalPremium * growthFactor * ageFactor * genderFactor;
      
      // Annual distribution (tax-free policy loans)
      // Using approximately 4.5% sustainable withdrawal rate for IUL
      const withdrawalRate = 0.045;
      const annualDistribution = Math.round(projectedValue * withdrawalRate);
      
      // Total distributions over the period
      const totalDistributions = annualDistribution * distributionYears;
      
      // Death benefit (approximately 8-10x annual contribution at outset)
      const deathBenefitMultiplier = 8 + ((60 - age) / 20);
      const deathBenefit = Math.round(annualContribution * deathBenefitMultiplier);
      
      setResults({
        annualDistribution,
        totalDistributions,
        deathBenefit,
        distributionStartAge,
      });
    };
    
    calculateResults();
  }, [gender, age, annualContribution]);

  const scrollToForm = () => {
    document.getElementById('kai-zen-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 md:p-8 rounded-2xl">
        {/* Gender Toggle */}
        <div className="mb-8">
          <label className="text-sm font-medium text-muted-foreground mb-3 block">Gender</label>
          <div className="flex rounded-full bg-white/10 p-1 w-fit">
            <button
              onClick={() => setGender("male")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                gender === "male"
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                gender === "female"
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-muted-foreground">Age</label>
            <span className="text-2xl font-bold text-accent">{age}</span>
          </div>
          <Slider
            value={[age]}
            onValueChange={(value) => setAge(value[0])}
            min={25}
            max={60}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>25</span>
            <span>60</span>
          </div>
        </div>

        {/* Annual Contribution Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-muted-foreground">Annual Contribution (5 years)</label>
            <span className="text-2xl font-bold text-accent">{formatCurrency(annualContribution)}</span>
          </div>
          <Slider
            value={[annualContribution]}
            onValueChange={(value) => setAnnualContribution(value[0])}
            min={21350}
            max={50000}
            step={650}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>$21,350</span>
            <span>$50,000</span>
          </div>
        </div>

        {/* Results Grid */}
        {results && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Annual Distribution */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-accent" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Potential Annual Distribution
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {formatCurrency(results.annualDistribution)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Starting at age {results.distributionStartAge}
              </div>
            </div>

            {/* Total Distributions */}
            <div className="bg-accent/10 rounded-xl p-5 border border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Tax-Free Distributions
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {formatCurrency(results.totalDistributions)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Through age 90
              </div>
            </div>

            {/* Death Benefit */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Death Benefit
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {formatCurrency(results.deathBenefit)}+
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                With living benefit riders
              </div>
            </div>
          </div>
        )}

        {/* Your Contribution Summary */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Your total contribution (5 years)</span>
            <span className="text-xl font-bold text-foreground">
              {formatCurrency(annualContribution * 5)}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={scrollToForm}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(228,181,72,0.3)] hover:shadow-[0_0_30px_rgba(228,181,72,0.5)] transition-all duration-300"
          >
            Get Your Personalized Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
        *This calculator provides hypothetical illustrations based on a 6.65% illustrated rate. 
        Actual results will vary based on individual circumstances, policy performance, and other factors. 
        This is not a guarantee of future performance.
      </p>
    </div>
  );
};

export default KaiZenCalculator;
