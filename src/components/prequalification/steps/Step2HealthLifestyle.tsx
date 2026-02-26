import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { step2Schema, Step2Data, MEDICAL_CONDITIONS } from "@/types/prequalificationApplication";

interface Step2Props {
  data: Step2Data | Record<string, unknown>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

const Step2HealthLifestyle = ({ data, onNext, onBack }: Step2Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      medicalConditions: [],
      ...(data as Step2Data),
    },
  });

  const tobaccoUse = watch("tobaccoUse");
  const takingMedications = watch("takingMedications");
  const hospitalizedPast5Years = watch("hospitalizedPast5Years");
  const familyHistoryHeartCancer = watch("familyHistoryHeartCancer");
  const medicalConditions = watch("medicalConditions") || [];

  const toggleCondition = (condition: string) => {
    const current = medicalConditions;
    const updated = current.includes(condition)
      ? current.filter((c) => c !== condition)
      : [...current, condition];
    setValue("medicalConditions", updated);
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Health & Lifestyle</h2>
        <p className="text-muted-foreground mt-1">This helps us determine the best coverage options.</p>
      </div>

      {/* Height & Weight */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heightFeet">Height (ft) *</Label>
          <Select value={watch("heightFeet")} onValueChange={(v) => setValue("heightFeet", v, { shouldValidate: true })}>
            <SelectTrigger className={errors.heightFeet ? "border-destructive" : ""}>
              <SelectValue placeholder="Feet" />
            </SelectTrigger>
            <SelectContent>
              {[4, 5, 6, 7].map((f) => (
                <SelectItem key={f} value={String(f)}>{f} ft</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.heightFeet && <p className="text-sm text-destructive">{errors.heightFeet.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="heightInches">Height (in) *</Label>
          <Select value={watch("heightInches")} onValueChange={(v) => setValue("heightInches", v, { shouldValidate: true })}>
            <SelectTrigger className={errors.heightInches ? "border-destructive" : ""}>
              <SelectValue placeholder="Inches" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={String(i)}>{i} in</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.heightInches && <p className="text-sm text-destructive">{errors.heightInches.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs) *</Label>
          <Input id="weight" type="number" {...register("weight")} hasError={!!errors.weight} placeholder="lbs" />
          {errors.weight && <p className="text-sm text-destructive">{errors.weight.message}</p>}
        </div>
      </div>

      {/* Tobacco */}
      <div className="space-y-2">
        <Label>Do you use tobacco or nicotine products? *</Label>
        <Select value={tobaccoUse} onValueChange={(v) => setValue("tobaccoUse", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.tobaccoUse ? "border-destructive" : ""}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="Former">Former (quit)</SelectItem>
          </SelectContent>
        </Select>
        {errors.tobaccoUse && <p className="text-sm text-destructive">{errors.tobaccoUse.message}</p>}
      </div>

      {(tobaccoUse === "Yes" || tobaccoUse === "Former") && (
        <div className="space-y-2">
          <Label htmlFor="tobaccoFrequency">Frequency / Details</Label>
          <Input id="tobaccoFrequency" {...register("tobaccoFrequency")} placeholder="e.g., Daily cigarettes, occasional vaping" />
        </div>
      )}

      {/* Medical Conditions */}
      <div className="space-y-3">
        <Label>Have you been diagnosed with any of the following?</Label>
        <div className="grid grid-cols-2 gap-3">
          {MEDICAL_CONDITIONS.map((condition) => (
            <label
              key={condition}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={medicalConditions.includes(condition)}
                onCheckedChange={() => toggleCondition(condition)}
              />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="space-y-2">
        <Label>Are you currently taking prescription medications? *</Label>
        <Select value={takingMedications} onValueChange={(v) => setValue("takingMedications", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.takingMedications ? "border-destructive" : ""}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
        {errors.takingMedications && <p className="text-sm text-destructive">{errors.takingMedications.message}</p>}
      </div>

      {takingMedications === "Yes" && (
        <div className="space-y-2">
          <Label htmlFor="medicationDetails">Please describe your medications</Label>
          <Textarea id="medicationDetails" {...register("medicationDetails")} placeholder="List medications and what they are for" />
        </div>
      )}

      {/* Hospitalized */}
      <div className="space-y-2">
        <Label>Hospitalized or had surgery in the past 5 years? *</Label>
        <Select value={hospitalizedPast5Years} onValueChange={(v) => setValue("hospitalizedPast5Years", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.hospitalizedPast5Years ? "border-destructive" : ""}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
        {errors.hospitalizedPast5Years && <p className="text-sm text-destructive">{errors.hospitalizedPast5Years.message}</p>}
      </div>

      {/* Family History */}
      <div className="space-y-2">
        <Label>Family history of heart disease or cancer before age 60? *</Label>
        <Select value={familyHistoryHeartCancer} onValueChange={(v) => setValue("familyHistoryHeartCancer", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.familyHistoryHeartCancer ? "border-destructive" : ""}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
        {errors.familyHistoryHeartCancer && <p className="text-sm text-destructive">{errors.familyHistoryHeartCancer.message}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg">Continue</Button>
      </div>
    </form>
  );
};

export default Step2HealthLifestyle;
