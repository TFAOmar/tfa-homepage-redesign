import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, Step4Data } from "@/types/estatePlanningApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, Users, AlertCircle, Percent } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { generateUUID } from "@/lib/uuid";

interface Step4BeneficiariesProps {
  data: Step4Data;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
}

const Step4Beneficiaries = ({ data, onNext, onBack }: Step4BeneficiariesProps) => {
  const form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: data,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "beneficiaries",
  });

  const watchBeneficiaries = form.watch("beneficiaries");
  const totalPercentage = watchBeneficiaries?.reduce((sum, b) => sum + (b.percentage || 0), 0) || 0;

  const addBeneficiary = () => {
    append({
      id: generateUUID(),
      fullName: "",
      relationship: "",
      percentage: 0,
      contingencyPlan: "per_stirpes",
      charityName: "",
    });
  };

  const onSubmit = (formData: Step4Data) => {
    onNext(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Beneficiaries List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Primary Beneficiaries
            </CardTitle>
            <CardDescription>
              Designate who will inherit your estate and their share percentages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Percentage Tracker */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Allocation</span>
                <span className={cn(
                  "text-lg font-bold flex items-center gap-1",
                  totalPercentage === 100 ? "text-green-600" : totalPercentage > 100 ? "text-destructive" : "text-amber-600"
                )}>
                  <Percent className="h-4 w-4" />
                  {totalPercentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={cn(
                    "h-3 rounded-full transition-all",
                    totalPercentage === 100 ? "bg-green-500" : totalPercentage > 100 ? "bg-destructive" : "bg-amber-500"
                  )}
                  style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                />
              </div>
              {totalPercentage !== 100 && (
                <p className="text-xs text-muted-foreground mt-2">
                  {totalPercentage < 100 
                    ? `${100 - totalPercentage}% remaining to allocate`
                    : `Over-allocated by ${totalPercentage - 100}%`
                  }
                </p>
              )}
            </div>

            {fields.length === 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Add at least one beneficiary to continue
                </AlertDescription>
              </Alert>
            )}

            {fields.map((field, index) => {
              const contingencyPlan = form.watch(`beneficiaries.${index}.contingencyPlan`);
              
              return (
                <Card key={field.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Beneficiary #{index + 1}
                      </span>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.fullName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Legal Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.relationship`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship *</FormLabel>
                            <FormControl>
                              <Input placeholder="Daughter, Son, Spouse, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.percentage`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Share Percentage *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  placeholder="25"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.contingencyPlan`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>If This Beneficiary Passes Away *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select contingency plan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="per_stirpes">
                                  Per Stirpes (to their children)
                                </SelectItem>
                                <SelectItem value="per_capita">
                                  Per Capita (redistribute to others)
                                </SelectItem>
                                <SelectItem value="charity">
                                  Donate to Charity
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {contingencyPlan === "charity" && (
                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.charityName`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Charity Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Name of charitable organization" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Button
              type="button"
              variant="outline"
              onClick={addBeneficiary}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Beneficiary
            </Button>
          </CardContent>
        </Card>

        {/* Distribution Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution Settings</CardTitle>
            <CardDescription>
              Configure when and how beneficiaries receive their inheritance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="ultimateBeneficiaryAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ultimate Beneficiary Age</FormLabel>
                  <p className="text-sm text-muted-foreground mb-4">
                    Age at which beneficiaries receive full distribution of their inheritance
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Age 18</span>
                      <span className="text-2xl font-bold text-primary">{field.value}</span>
                      <span className="text-sm">Age 65</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={18}
                        max={65}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="custodianName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custodian for Minor Beneficiaries</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name of custodian" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Person who will manage funds for beneficiaries under the ultimate age
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="custodianPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custodian Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit"
            disabled={totalPercentage !== 100 || fields.length === 0}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Step4Beneficiaries;
