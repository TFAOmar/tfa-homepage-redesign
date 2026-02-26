import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { step4Schema, Step4Data, PrequalificationApplicationData, Step1Data, Step2Data, Step3Data } from "@/types/prequalificationApplication";

interface Step4Props {
  data: Step4Data | Record<string, unknown>;
  allData: PrequalificationApplicationData;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
  onGoToStep: (step: number) => void;
}

const SectionCard = ({ title, step, onEdit, children }: { title: string; step: number; onEdit: (s: number) => void; children: React.ReactNode }) => (
  <div className="border rounded-lg p-4 space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <Button type="button" variant="ghost" size="sm" onClick={() => onEdit(step)} className="text-primary">Edit</Button>
    </div>
    <div className="text-sm text-muted-foreground space-y-1">{children}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="flex justify-between">
    <span className="font-medium text-foreground/80">{label}</span>
    <span>{value || "—"}</span>
  </div>
);

const Step4ReviewSubmit = ({ data, allData, onNext, onBack, onGoToStep }: Step4Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: data as Step4Data,
  });

  const consentChecked = watch("consentChecked");
  const s1 = allData.step1 as Step1Data;
  const s2 = allData.step2 as Step2Data;
  const s3 = allData.step3 as Step3Data;

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
        <p className="text-muted-foreground mt-1">Please review your information before submitting.</p>
      </div>

      <SectionCard title="Personal Information" step={1} onEdit={onGoToStep}>
        <Row label="Name" value={`${s1.firstName || ""} ${s1.lastName || ""}`} />
        <Row label="Date of Birth" value={s1.dateOfBirth} />
        <Row label="Gender" value={s1.gender} />
        <Row label="Phone" value={s1.phone} />
        <Row label="Email" value={s1.email} />
        <Row label="State" value={s1.stateOfResidence} />
      </SectionCard>

      <SectionCard title="Health & Lifestyle" step={2} onEdit={onGoToStep}>
        <Row label="Height" value={s2.heightFeet && s2.heightInches ? `${s2.heightFeet}'${s2.heightInches}"` : undefined} />
        <Row label="Weight" value={s2.weight ? `${s2.weight} lbs` : undefined} />
        <Row label="Tobacco Use" value={s2.tobaccoUse} />
        {s2.tobaccoFrequency && <Row label="Tobacco Details" value={s2.tobaccoFrequency} />}
        <Row label="Medical Conditions" value={s2.medicalConditions?.length ? s2.medicalConditions.join(", ") : "None"} />
        <Row label="Prescription Medications" value={s2.takingMedications} />
        {s2.medicationDetails && <Row label="Medication Details" value={s2.medicationDetails} />}
        <Row label="Hospitalized (5yr)" value={s2.hospitalizedPast5Years} />
        <Row label="Family History" value={s2.familyHistoryHeartCancer} />
      </SectionCard>

      <SectionCard title="Coverage Needs" step={3} onEdit={onGoToStep}>
        <Row label="Coverage Amount" value={s3.coverageAmount} />
        <Row label="Coverage Type" value={s3.coverageType} />
        <Row label="Monthly Budget" value={s3.monthlyBudget} />
        <Row label="Existing Insurance" value={s3.hasExistingInsurance} />
        {s3.existingCarrier && <Row label="Current Carrier" value={s3.existingCarrier} />}
        {s3.existingAmount && <Row label="Current Amount" value={s3.existingAmount} />}
        <Row label="Purpose" value={s3.purposeOfCoverage} />
      </SectionCard>

      {/* E-Signature */}
      <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
        <h3 className="font-semibold text-foreground">Electronic Signature</h3>
        <div className="space-y-2">
          <Label htmlFor="electronicSignature">Full Legal Name *</Label>
          <Input
            id="electronicSignature"
            {...register("electronicSignature")}
            hasError={!!errors.electronicSignature}
            placeholder="Type your full name as your signature"
          />
          {errors.electronicSignature && <p className="text-sm text-destructive">{errors.electronicSignature.message}</p>}
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={consentChecked === true}
            onCheckedChange={(checked) => setValue("consentChecked", checked === true ? true : false as never, { shouldValidate: true })}
          />
          <span className="text-sm text-muted-foreground">
            I certify that the information provided is accurate to the best of my knowledge.
            I understand this is a pre-qualification questionnaire and does not guarantee coverage.
            I consent to being contacted by my advisor regarding life insurance options.
          </span>
        </label>
        {errors.consentChecked && <p className="text-sm text-destructive">{errors.consentChecked.message}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg">Submit Pre-Qualification</Button>
      </div>
    </form>
  );
};

export default Step4ReviewSubmit;
