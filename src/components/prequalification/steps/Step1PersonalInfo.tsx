import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { step1Schema, Step1Data, US_STATES } from "@/types/prequalificationApplication";

interface Step1Props {
  data: Step1Data | Record<string, unknown>;
  onNext: (data: Step1Data) => void;
}

const Step1PersonalInfo = ({ data, onNext }: Step1Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: data as Step1Data,
  });

  const gender = watch("gender");
  const stateOfResidence = watch("stateOfResidence");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground mt-1">Let's start with some basic details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register("firstName")} hasError={!!errors.firstName} />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register("lastName")} hasError={!!errors.lastName} />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} hasError={!!errors.dateOfBirth} />
          {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select value={gender} onValueChange={(v) => setValue("gender", v, { shouldValidate: true })}>
            <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" type="tel" {...register("phone")} hasError={!!errors.phone} />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} hasError={!!errors.email} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>State of Residence *</Label>
        <Select value={stateOfResidence} onValueChange={(v) => setValue("stateOfResidence", v, { shouldValidate: true })}>
          <SelectTrigger className={errors.stateOfResidence ? "border-destructive" : ""}>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.stateOfResidence && <p className="text-sm text-destructive">{errors.stateOfResidence.message}</p>}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg">Continue</Button>
      </div>
    </form>
  );
};

export default Step1PersonalInfo;
