import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1Data, US_STATES } from "@/types/estatePlanningApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SSNInput } from "@/components/ui/ssn-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { User, Users, Home, Mail, FileText } from "lucide-react";

interface Step1ClientIdentityProps {
  data: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
}

const Step1ClientIdentity = ({ data, onNext }: Step1ClientIdentityProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: data,
  });

  const maritalStatus = watch("maritalStatus");
  const hasTrustor2 = watch("hasTrustor2");
  const hasExistingTrust = watch("hasExistingTrust");

  // Auto-toggle hasTrustor2 based on marital status
  const isMarried = maritalStatus === "married";
  if (isMarried && !hasTrustor2) {
    setValue("hasTrustor2", true);
  } else if (!isMarried && hasTrustor2) {
    setValue("hasTrustor2", false);
  }

  const onSubmit = (formData: Step1Data) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Primary Trustor Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Primary Trustor Information
          </CardTitle>
          <CardDescription>
            Enter the primary trustor's legal information exactly as it appears on official documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trustor1FirstName">First Name *</Label>
              <Input
                id="trustor1FirstName"
                {...register("trustor1FirstName")}
                placeholder="First Name"
                className={errors.trustor1FirstName ? "border-destructive" : ""}
              />
              {errors.trustor1FirstName && (
                <p className="text-sm text-destructive">{errors.trustor1FirstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="trustor1MiddleName">Middle Name</Label>
              <Input
                id="trustor1MiddleName"
                {...register("trustor1MiddleName")}
                placeholder="Middle Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trustor1LastName">Last Name *</Label>
              <Input
                id="trustor1LastName"
                {...register("trustor1LastName")}
                placeholder="Last Name"
                className={errors.trustor1LastName ? "border-destructive" : ""}
              />
              {errors.trustor1LastName && (
                <p className="text-sm text-destructive">{errors.trustor1LastName.message}</p>
              )}
            </div>
          </div>

          {/* SSN, DOB, Birth Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trustor1SSN">Social Security Number *</Label>
              <SSNInput
                value={watch("trustor1SSN") || ""}
                onChange={(val) => setValue("trustor1SSN", val)}
                showToggle
              />
              {errors.trustor1SSN && (
                <p className="text-sm text-destructive">{errors.trustor1SSN.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="trustor1DOB">Date of Birth *</Label>
              <Input
                id="trustor1DOB"
                type="date"
                {...register("trustor1DOB")}
                className={errors.trustor1DOB ? "border-destructive" : ""}
              />
              {errors.trustor1DOB && (
                <p className="text-sm text-destructive">{errors.trustor1DOB.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="trustor1BirthCity">City of Birth *</Label>
              <Input
                id="trustor1BirthCity"
                {...register("trustor1BirthCity")}
                placeholder="City"
                className={errors.trustor1BirthCity ? "border-destructive" : ""}
              />
              {errors.trustor1BirthCity && (
                <p className="text-sm text-destructive">{errors.trustor1BirthCity.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="trustor1BirthState">State of Birth *</Label>
              <Select
                value={watch("trustor1BirthState")}
                onValueChange={(val) => setValue("trustor1BirthState", val)}
              >
                <SelectTrigger className={errors.trustor1BirthState ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.trustor1BirthState && (
                <p className="text-sm text-destructive">{errors.trustor1BirthState.message}</p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trustor1Phone">Phone Number *</Label>
              <PhoneInput
                value={watch("trustor1Phone") || ""}
                onChange={(val) => setValue("trustor1Phone", val)}
              />
              {errors.trustor1Phone && (
                <p className="text-sm text-destructive">{errors.trustor1Phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="trustor1Email">Email Address *</Label>
              <Input
                id="trustor1Email"
                type="email"
                {...register("trustor1Email")}
                placeholder="email@example.com"
                className={errors.trustor1Email ? "border-destructive" : ""}
              />
              {errors.trustor1Email && (
                <p className="text-sm text-destructive">{errors.trustor1Email.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marital Status Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Marital Status
          </CardTitle>
          <CardDescription>
            Community property states require marriage details for proper trust formation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={maritalStatus}
            onValueChange={(val) => setValue("maritalStatus", val as Step1Data["maritalStatus"])}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.maritalStatus && (
            <p className="text-sm text-destructive">{errors.maritalStatus.message}</p>
          )}

          {/* Marriage Details - Conditional */}
          {isMarried && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="marriageDate">Date of Marriage *</Label>
                <Input
                  id="marriageDate"
                  type="date"
                  {...register("marriageDate")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marriageCity">City of Marriage</Label>
                <Input
                  id="marriageCity"
                  {...register("marriageCity")}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marriageState">State of Marriage</Label>
                <Select
                  value={watch("marriageState")}
                  onValueChange={(val) => setValue("marriageState", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spouse/Co-Trustor Section - Conditional */}
      {isMarried && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Spouse / Co-Trustor Information
            </CardTitle>
            <CardDescription>
              Enter your spouse's legal information for the joint trust.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trustor2FirstName">First Name *</Label>
                <Input
                  id="trustor2FirstName"
                  {...register("trustor2FirstName")}
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustor2MiddleName">Middle Name</Label>
                <Input
                  id="trustor2MiddleName"
                  {...register("trustor2MiddleName")}
                  placeholder="Middle Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustor2LastName">Last Name *</Label>
                <Input
                  id="trustor2LastName"
                  {...register("trustor2LastName")}
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* SSN, DOB, Birth Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trustor2SSN">Social Security Number *</Label>
                <SSNInput
                  value={watch("trustor2SSN") || ""}
                  onChange={(val) => setValue("trustor2SSN", val)}
                  showToggle
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustor2DOB">Date of Birth *</Label>
                <Input
                  id="trustor2DOB"
                  type="date"
                  {...register("trustor2DOB")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustor2BirthCity">City of Birth *</Label>
                <Input
                  id="trustor2BirthCity"
                  {...register("trustor2BirthCity")}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustor2BirthState">State of Birth *</Label>
                <Select
                  value={watch("trustor2BirthState")}
                  onValueChange={(val) => setValue("trustor2BirthState", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trustor2Phone">Phone Number *</Label>
                <PhoneInput
                  value={watch("trustor2Phone") || ""}
                  onChange={(val) => setValue("trustor2Phone", val)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustor2Email">Email Address *</Label>
                <Input
                  id="trustor2Email"
                  type="email"
                  {...register("trustor2Email")}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Home Address Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            Home Address
          </CardTitle>
          <CardDescription>
            Your current residence address for the trust documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="homeStreet">Street Address *</Label>
              <Input
                id="homeStreet"
                {...register("homeStreet")}
                placeholder="123 Main Street"
                className={errors.homeStreet ? "border-destructive" : ""}
              />
              {errors.homeStreet && (
                <p className="text-sm text-destructive">{errors.homeStreet.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeCity">City *</Label>
              <Input
                id="homeCity"
                {...register("homeCity")}
                placeholder="City"
                className={errors.homeCity ? "border-destructive" : ""}
              />
              {errors.homeCity && (
                <p className="text-sm text-destructive">{errors.homeCity.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeState">State *</Label>
              <Select
                value={watch("homeState")}
                onValueChange={(val) => setValue("homeState", val)}
              >
                <SelectTrigger className={errors.homeState ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.homeState && (
                <p className="text-sm text-destructive">{errors.homeState.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeZip">ZIP Code *</Label>
              <Input
                id="homeZip"
                {...register("homeZip")}
                placeholder="12345"
                maxLength={10}
                className={errors.homeZip ? "border-destructive" : ""}
              />
              {errors.homeZip && (
                <p className="text-sm text-destructive">{errors.homeZip.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Contact Preference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={watch("contactPreference")}
            onValueChange={(val) => setValue("contactPreference", val as Step1Data["contactPreference"])}
            className="flex gap-6"
          >
            {[
              { value: "email", label: "Email" },
              { value: "text", label: "Text Message" },
              { value: "phone", label: "Phone Call" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`contact-${option.value}`} />
                <Label htmlFor={`contact-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Existing Trust Amendment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Existing Trust Amendment
          </CardTitle>
          <CardDescription>
            If you have an existing trust that needs to be amended, provide the details below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasExistingTrust"
              checked={hasExistingTrust}
              onCheckedChange={(checked) => setValue("hasExistingTrust", checked as boolean)}
            />
            <Label htmlFor="hasExistingTrust" className="cursor-pointer">
              I have an existing trust that needs to be amended
            </Label>
          </div>

          {hasExistingTrust && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="existingTrustName">Current Trust Name</Label>
                <Input
                  id="existingTrustName"
                  {...register("existingTrustName")}
                  placeholder="The Smith Family Trust"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="amendmentClause">Amendment Details</Label>
                <Textarea
                  id="amendmentClause"
                  {...register("amendmentClause")}
                  placeholder="Describe the changes needed to your existing trust..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg">
          Continue to Family & Heirs
        </Button>
      </div>
    </form>
  );
};

export default Step1ClientIdentity;
