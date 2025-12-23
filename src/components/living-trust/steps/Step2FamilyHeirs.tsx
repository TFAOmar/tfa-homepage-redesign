import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2Data, Child } from "@/types/estatePlanningApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Step2FamilyHeirsProps {
  data: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

const Step2FamilyHeirs = ({ data, onNext, onBack }: Step2FamilyHeirsProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      children: data.children || [],
      acknowledgeAllChildrenListed: data.acknowledgeAllChildrenListed || false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const addChild = () => {
    append({
      id: crypto.randomUUID(),
      fullName: "",
      dateOfBirth: "",
      parentage: "joint",
    });
  };

  const onSubmit = (formData: Step2Data) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Children Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Children & Heirs
          </CardTitle>
          <CardDescription>
            List all natural-born and legally adopted children. This information is critical to prevent trust contests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No children added yet</p>
              <Button type="button" variant="outline" onClick={addChild}>
                <Plus className="w-4 h-4 mr-2" />
                Add Child
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-foreground">Child {index + 1}</h4>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`children.${index}.fullName`}>Full Legal Name *</Label>
                        <Input
                          {...register(`children.${index}.fullName`)}
                          placeholder="Full Name"
                          className={errors.children?.[index]?.fullName ? "border-destructive" : ""}
                        />
                        {errors.children?.[index]?.fullName && (
                          <p className="text-sm text-destructive">
                            {errors.children[index].fullName?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`children.${index}.dateOfBirth`}>Date of Birth *</Label>
                        <Input
                          type="date"
                          {...register(`children.${index}.dateOfBirth`)}
                          className={errors.children?.[index]?.dateOfBirth ? "border-destructive" : ""}
                        />
                        {errors.children?.[index]?.dateOfBirth && (
                          <p className="text-sm text-destructive">
                            {errors.children[index].dateOfBirth?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Parentage (HWJ) *</Label>
                        <RadioGroup
                          value={watch(`children.${index}.parentage`)}
                          onValueChange={(val) =>
                            setValue(`children.${index}.parentage`, val as Child["parentage"])
                          }
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="husband"
                              id={`parentage-${index}-husband`}
                            />
                            <Label
                              htmlFor={`parentage-${index}-husband`}
                              className="cursor-pointer text-sm"
                            >
                              Husband's
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="wife"
                              id={`parentage-${index}-wife`}
                            />
                            <Label
                              htmlFor={`parentage-${index}-wife`}
                              className="cursor-pointer text-sm"
                            >
                              Wife's
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="joint"
                              id={`parentage-${index}-joint`}
                            />
                            <Label
                              htmlFor={`parentage-${index}-joint`}
                              className="cursor-pointer text-sm"
                            >
                              Joint
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.children?.[index]?.parentage && (
                          <p className="text-sm text-destructive">
                            {errors.children[index].parentage?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button type="button" variant="outline" onClick={addChild} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Child
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> All natural-born and legally adopted children must be listed, 
          including children from previous relationships. Omitting any child could result in the 
          trust being contested in court.
        </AlertDescription>
      </Alert>

      {/* Acknowledgement */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acknowledgeAllChildrenListed"
              checked={watch("acknowledgeAllChildrenListed")}
              onCheckedChange={(checked) =>
                setValue("acknowledgeAllChildrenListed", checked as boolean)
              }
              className="mt-1"
            />
            <div>
              <Label htmlFor="acknowledgeAllChildrenListed" className="cursor-pointer font-medium">
                I acknowledge that all natural-born and legally adopted children are listed above *
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                By checking this box, I confirm that the list above includes all children who may have
                inheritance rights under this trust.
              </p>
              {errors.acknowledgeAllChildrenListed && (
                <p className="text-sm text-destructive mt-1">
                  {errors.acknowledgeAllChildrenListed.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Continue to Successor Trustees
        </Button>
      </div>
    </form>
  );
};

export default Step2FamilyHeirs;
