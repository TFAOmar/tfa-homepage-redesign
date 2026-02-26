import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { step3Schema, Step3Data } from "@/types/prequalificationApplication";

interface Step3Props {
  data: Step3Data | Record<string, unknown>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

const COVERAGE_AMOUNTS = ["$25,000", "$50,000", "$100,000", "$250,000", "$500,000", "$1,000,000", "$1,000,000+", "Not Sure"];
const COVERAGE_TYPES = ["Term Life", "Whole Life", "IUL (Indexed Universal Life)", "Not Sure"];
const BUDGET_OPTIONS = ["Under $50", "$50 - $100", "$100 - $200", "$200 - $500", "$500+", "Not Sure"];
const PURPOSE_OPTIONS = ["Income Replacement", "Mortgage Protection", "Final Expenses", "Wealth Transfer", "Business Protection", "Other"];

const Step3CoverageNeeds = ({ data, onNext, onBack }: Step3Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: data as Step3Data,
  });

  const coverageAmount = watch("coverageAmount");
  const coverageType = watch("coverageType");
  const monthlyBudget = watch("monthlyBudget");
  const hasExistingInsurance = watch("hasExistingInsurance");
  const purposeOfCoverage = watch("purposeOfCoverage");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Coverage Needs</h2>
        <p className="text-muted-foreground mt-1">Help us understand what you're looking for.</p>
      </div>

      <div className="space-y-2">
        <Label>Coverage Amount Desired *</Label>
        <Select value={coverageAmount} onValueChange={(v) => setValue("coverageAmount", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.coverageAmount ? "border-destructive" : ""}>
            <SelectValue placeholder="Select amount" />
          </SelectTrigger>
          <SelectContent>
            {COVERAGE_AMOUNTS.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.coverageAmount && <p className="text-sm text-destructive">{errors.coverageAmount.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Type of Coverage *</Label>
        <Select value={coverageType} onValueChange={(v) => setValue("coverageType", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.coverageType ? "border-destructive" : ""}>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {COVERAGE_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.coverageType && <p className="text-sm text-destructive">{errors.coverageType.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Monthly Budget for Premiums *</Label>
        <Select value={monthlyBudget} onValueChange={(v) => setValue("monthlyBudget", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.monthlyBudget ? "border-destructive" : ""}>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            {BUDGET_OPTIONS.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.monthlyBudget && <p className="text-sm text-destructive">{errors.monthlyBudget.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Do you currently have life insurance? *</Label>
        <Select value={hasExistingInsurance} onValueChange={(v) => setValue("hasExistingInsurance", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.hasExistingInsurance ? "border-destructive" : ""}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
        {errors.hasExistingInsurance && <p className="text-sm text-destructive">{errors.hasExistingInsurance.message}</p>}
      </div>

      {hasExistingInsurance === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
          <div className="space-y-2">
            <Label htmlFor="existingCarrier">Current Carrier</Label>
            <Input id="existingCarrier" {...register("existingCarrier")} placeholder="e.g., State Farm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="existingAmount">Current Coverage Amount</Label>
            <Input id="existingAmount" {...register("existingAmount")} placeholder="e.g., $250,000" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Primary Purpose of Coverage *</Label>
        <Select value={purposeOfCoverage} onValueChange={(v) => setValue("purposeOfCoverage", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.purposeOfCoverage ? "border-destructive" : ""}>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            {PURPOSE_OPTIONS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.purposeOfCoverage && <p className="text-sm text-destructive">{errors.purposeOfCoverage.message}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg">Continue</Button>
      </div>
    </form>
  );
};

export default Step3CoverageNeeds;
