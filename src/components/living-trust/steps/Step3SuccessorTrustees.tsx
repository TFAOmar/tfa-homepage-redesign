import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3Data, Trustee } from "@/types/estatePlanningApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/ui/phone-input";
import { SSNInput } from "@/components/ui/ssn-input";
import { Shield, Plus, Trash2, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateUUID } from "@/lib/uuid";

interface Step3SuccessorTrusteesProps {
  data: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

const Step3SuccessorTrustees = ({ data, onNext, onBack }: Step3SuccessorTrusteesProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      successorTrustees: data.successorTrustees || [],
      managementStyle: data.managementStyle,
      incapacityJudge1Name: data.incapacityJudge1Name || "",
      incapacityJudge1Phone: data.incapacityJudge1Phone || "",
      incapacityJudge2Name: data.incapacityJudge2Name || "",
      incapacityJudge2Phone: data.incapacityJudge2Phone || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "successorTrustees",
  });

  const managementStyle = watch("managementStyle");

  const addTrustee = (role: "primary" | "alternate") => {
    append({
      id: generateUUID(),
      fullName: "",
      ssn: "",
      dob: "",
      phone: "",
      address: "",
      role,
    });
  };

  const primaryTrustees = fields.filter((_, i) => watch(`successorTrustees.${i}.role`) === "primary");
  const alternateTrustees = fields.filter((_, i) => watch(`successorTrustees.${i}.role`) === "alternate");

  const onSubmit = (formData: Step3Data) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Successor Trustees Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Successor Trustees
          </CardTitle>
          <CardDescription>
            Successor trustees will manage the trust if you become incapacitated or pass away.
            List primary trustees first, then alternates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Trustees */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                Primary Successor Trustees
                <Badge variant="secondary">{primaryTrustees.length}</Badge>
              </h4>
              <Button type="button" variant="outline" size="sm" onClick={() => addTrustee("primary")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Primary
              </Button>
            </div>

            {primaryTrustees.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-muted rounded-lg">
                <p className="text-muted-foreground text-sm">No primary trustees added</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => {
                  if (watch(`successorTrustees.${index}.role`) !== "primary") return null;
                  return (
                    <Card key={field.id} className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge>Primary Trustee</Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Full Legal Name *</Label>
                            <Input
                              {...register(`successorTrustees.${index}.fullName`)}
                              placeholder="Full Name"
                              className={errors.successorTrustees?.[index]?.fullName ? "border-destructive" : ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>SSN (Optional)</Label>
                            <SSNInput
                              value={watch(`successorTrustees.${index}.ssn`) || ""}
                              onChange={(val) => setValue(`successorTrustees.${index}.ssn`, val)}
                              showToggle
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Input
                              type="date"
                              {...register(`successorTrustees.${index}.dob`)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone Number *</Label>
                            <PhoneInput
                              value={watch(`successorTrustees.${index}.phone`) || ""}
                              onChange={(val) => setValue(`successorTrustees.${index}.phone`, val)}
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Address</Label>
                            <Input
                              {...register(`successorTrustees.${index}.address`)}
                              placeholder="Full Address"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Alternate Trustees */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                Alternate Successor Trustees
                <Badge variant="outline">{alternateTrustees.length}</Badge>
              </h4>
              <Button type="button" variant="outline" size="sm" onClick={() => addTrustee("alternate")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Alternate
              </Button>
            </div>

            {alternateTrustees.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-muted rounded-lg">
                <p className="text-muted-foreground text-sm">No alternate trustees added</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => {
                  if (watch(`successorTrustees.${index}.role`) !== "alternate") return null;
                  return (
                    <Card key={field.id} className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="outline">Alternate Trustee</Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Full Legal Name *</Label>
                            <Input
                              {...register(`successorTrustees.${index}.fullName`)}
                              placeholder="Full Name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>SSN (Optional)</Label>
                            <SSNInput
                              value={watch(`successorTrustees.${index}.ssn`) || ""}
                              onChange={(val) => setValue(`successorTrustees.${index}.ssn`, val)}
                              showToggle
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Input
                              type="date"
                              {...register(`successorTrustees.${index}.dob`)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone Number *</Label>
                            <PhoneInput
                              value={watch(`successorTrustees.${index}.phone`) || ""}
                              onChange={(val) => setValue(`successorTrustees.${index}.phone`, val)}
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Address</Label>
                            <Input
                              {...register(`successorTrustees.${index}.address`)}
                              placeholder="Full Address"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {errors.successorTrustees && (
            <p className="text-sm text-destructive">{errors.successorTrustees.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Management Style */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Trustee Management Style
          </CardTitle>
          <CardDescription>
            Choose how successor trustees should manage the trust if there are multiple.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={managementStyle}
            onValueChange={(val) => setValue("managementStyle", val as Step3Data["managementStyle"])}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="independent" id="independent" className="mt-1" />
              <div>
                <Label htmlFor="independent" className="cursor-pointer font-medium">
                  Independent (One After Another)
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  The first available successor trustee acts alone. If they can't serve, 
                  the next in line takes over.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="together" id="together" className="mt-1" />
              <div>
                <Label htmlFor="together" className="cursor-pointer font-medium">
                  Together (Co-Trustees)
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Multiple successor trustees must agree and act together on all decisions.
                  Requires cooperation between all named trustees.
                </p>
              </div>
            </div>
          </RadioGroup>
          {errors.managementStyle && (
            <p className="text-sm text-destructive mt-2">{errors.managementStyle.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Incapacity Determination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Incapacity Determination
          </CardTitle>
          <CardDescription>
            Name two trusted individuals who can determine if you are no longer capable 
            of managing the trust yourself.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              These individuals should know you well and be trusted to make objective decisions 
              about your mental and physical capacity. They do not need to be physicians.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Judge 1 */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6 space-y-4">
                <h4 className="font-semibold">First Incapacity Judge</h4>
                <div className="space-y-2">
                  <Label htmlFor="incapacityJudge1Name">Full Name *</Label>
                  <Input
                    id="incapacityJudge1Name"
                    {...register("incapacityJudge1Name")}
                    placeholder="Full Name"
                    className={errors.incapacityJudge1Name ? "border-destructive" : ""}
                  />
                  {errors.incapacityJudge1Name && (
                    <p className="text-sm text-destructive">{errors.incapacityJudge1Name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incapacityJudge1Phone">Phone Number</Label>
                  <PhoneInput
                    value={watch("incapacityJudge1Phone") || ""}
                    onChange={(val) => setValue("incapacityJudge1Phone", val)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Judge 2 */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6 space-y-4">
                <h4 className="font-semibold">Second Incapacity Judge</h4>
                <div className="space-y-2">
                  <Label htmlFor="incapacityJudge2Name">Full Name *</Label>
                  <Input
                    id="incapacityJudge2Name"
                    {...register("incapacityJudge2Name")}
                    placeholder="Full Name"
                    className={errors.incapacityJudge2Name ? "border-destructive" : ""}
                  />
                  {errors.incapacityJudge2Name && (
                    <p className="text-sm text-destructive">{errors.incapacityJudge2Name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incapacityJudge2Phone">Phone Number</Label>
                  <PhoneInput
                    value={watch("incapacityJudge2Phone") || ""}
                    onChange={(val) => setValue("incapacityJudge2Phone", val)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Continue to Beneficiaries
        </Button>
      </div>
    </form>
  );
};

export default Step3SuccessorTrustees;
