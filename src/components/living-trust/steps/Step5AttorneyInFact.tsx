import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step5Schema, Step5Data } from "@/types/estatePlanningApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Scale, Heart, AlertTriangle, Building, Briefcase, FileText, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Step5AttorneyInFactProps {
  data: Step5Data;
  onNext: (data: Step5Data) => void;
  onBack: () => void;
}

type PowerKey = 
  | "powerRealEstate" | "powerTangibleProperty" | "powerSecurities" | "powerBanking"
  | "powerBusiness" | "powerInsuranceAnnuities" | "powerRetirementPlans" | "powerEstateTrustBeneficiary"
  | "powerTransferToTrust" | "powerLegalActions" | "powerGovernment" | "powerFamilyCare"
  | "powerTaxes" | "powerGifts" | "powerDelegateAuthority" | "powerBenefitFromActions"
  | "powerCommingleFunds" | "powerServeAsConservator";

interface PowerToggle {
  key: PowerKey;
  label: string;
  description: string;
  sensitive?: boolean;
}

const propertyPowers: PowerToggle[] = [
  { key: "powerRealEstate", label: "Real Estate Transactions", description: "Buy, sell, lease, or manage real property" },
  { key: "powerTangibleProperty", label: "Tangible Property", description: "Handle vehicles, jewelry, and other physical assets" },
];

const financialPowers: PowerToggle[] = [
  { key: "powerSecurities", label: "Securities", description: "Manage stocks, bonds, and investment accounts" },
  { key: "powerBanking", label: "Banking Transactions", description: "Access accounts, write checks, make deposits" },
  { key: "powerBusiness", label: "Business Operations", description: "Manage business interests and partnerships" },
  { key: "powerInsuranceAnnuities", label: "Insurance & Annuities", description: "Handle insurance policies and annuity contracts" },
  { key: "powerRetirementPlans", label: "Retirement Plans", description: "Manage 401(k), IRA, and pension accounts" },
];

const legalPowers: PowerToggle[] = [
  { key: "powerEstateTrustBeneficiary", label: "Estate & Trust Transactions", description: "Handle estate, trust, and beneficiary matters" },
  { key: "powerTransferToTrust", label: "Transfer to Trust", description: "Move property into your living trust" },
  { key: "powerLegalActions", label: "Legal Actions", description: "Initiate or defend lawsuits on your behalf" },
  { key: "powerGovernment", label: "Government Transactions", description: "Deal with IRS, Social Security, and other agencies" },
  { key: "powerTaxes", label: "Tax Matters", description: "File returns, make payments, handle audits" },
];

const specialPowers: PowerToggle[] = [
  { key: "powerFamilyCare", label: "Family Care Expenses", description: "Spend money for your care and your family's needs" },
  { key: "powerGifts", label: "Make Gifts", description: "Give gifts on your behalf (as specified)", sensitive: true },
  { key: "powerDelegateAuthority", label: "Delegate Authority", description: "Allow others to act under this power", sensitive: true },
  { key: "powerBenefitFromActions", label: "Self-Benefit", description: "Agent may benefit from actions taken", sensitive: true },
  { key: "powerCommingleFunds", label: "Commingle Funds", description: "Mix your funds with the agent's own", sensitive: true },
  { key: "powerServeAsConservator", label: "Serve as Conservator", description: "Act as guardian of your estate if needed" },
];

const Step5AttorneyInFact = ({ data, onNext, onBack }: Step5AttorneyInFactProps) => {
  const form = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: data,
  });

  const onSubmit = (formData: Step5Data) => {
    onNext(formData);
  };

  const renderPowerToggle = (power: PowerToggle) => (
    <FormField
      key={power.key}
      control={form.control}
      name={power.key}
      render={({ field }) => (
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{power.label}</span>
              {power.sensitive && (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                  Sensitive
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{power.description}</p>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </div>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* POA Designees */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Financial POA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Financial Power of Attorney
              </CardTitle>
              <CardDescription>
                Person authorized to handle your financial and legal matters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="financialPOAPrimary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Agent *</FormLabel>
                    <FormControl>
                      <Input placeholder="Full legal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="financialPOAAlternate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Agent</FormLabel>
                    <FormControl>
                      <Input placeholder="Full legal name (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Medical POA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Medical Power of Attorney
              </CardTitle>
              <CardDescription>
                Person authorized to make healthcare decisions on your behalf
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="medicalPOAPrimary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Healthcare Agent *</FormLabel>
                    <FormControl>
                      <Input placeholder="Full legal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalPOAAlternate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Healthcare Agent</FormLabel>
                    <FormControl>
                      <Input placeholder="Full legal name (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Powers Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Granted Powers
            </CardTitle>
            <CardDescription>
              Select which powers your Financial Attorney-in-Fact will have
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Powers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Property Transactions
                </h4>
              </div>
              <div className="space-y-2">
                {propertyPowers.map(renderPowerToggle)}
              </div>
            </div>

            {/* Financial Powers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Financial & Business
                </h4>
              </div>
              <div className="space-y-2">
                {financialPowers.map(renderPowerToggle)}
              </div>
            </div>

            {/* Legal Powers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Legal & Government
                </h4>
              </div>
              <div className="space-y-2">
                {legalPowers.map(renderPowerToggle)}
              </div>
            </div>

            {/* Special Powers */}
            <div>
              <Alert className="mb-3 border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  These are sensitive powers. Enable only if you fully trust your agent.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                {specialPowers.map(renderPowerToggle)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Step5AttorneyInFact;
