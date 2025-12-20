import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import { FileStack, Plus, Trash2 } from "lucide-react";
import { Step6Data } from "@/types/lifeInsuranceApplication";

interface Step6ExistingCoverageProps {
  form: UseFormReturn<Step6Data>;
}

const Step6ExistingCoverage = ({ form }: Step6ExistingCoverageProps) => {
  const watchHasExisting = form.watch("hasExistingCoverage");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "existingPolicies",
  });

  const addPolicy = () => {
    append({
      id: crypto.randomUUID(),
      companyName: "",
      policyNumber: "",
      amountOfCoverage: 0,
      isBeingReplaced: false,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6 md:space-y-8">
        {/* Existing Coverage Toggle */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <FileStack className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Existing Insurance</h3>
          </div>

          <FormField
            control={form.control}
            name="hasExistingCoverage"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                <div className="space-y-1">
                  <FormLabel className="text-sm md:text-base leading-snug">
                    Do you have any existing life insurance or annuity policies?
                  </FormLabel>
                  <FormDescription className="text-xs md:text-sm">
                    This includes any in-force policies with other companies
                  </FormDescription>
                </div>
                <FormControl className="self-start sm:self-center">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Existing Policies List */}
        {watchHasExisting && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs md:text-sm text-muted-foreground">
                Please list all existing life insurance and annuity policies.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPolicy}
                className="gap-2 min-h-[44px] w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add Policy
              </Button>
            </div>

            {fields.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground text-sm">No policies added yet.</p>
                <Button
                  type="button"
                  variant="link"
                  onClick={addPolicy}
                  className="mt-2"
                >
                  Add your first policy
                </Button>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-3 md:p-4 rounded-lg border border-border bg-card/50 space-y-3 md:space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Policy #{index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive gap-2 min-h-[36px]"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      <FormField
                        control={form.control}
                        name={`existingPolicies.${index}.companyName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm md:text-base">Company Name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Insurance company name" className="min-h-[44px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`existingPolicies.${index}.policyNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm md:text-base">Policy Number *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Policy number" className="min-h-[44px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`existingPolicies.${index}.amountOfCoverage`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm md:text-base">Amount of Coverage</FormLabel>
                            <FormControl>
                              <CurrencyInput
                                value={field.value || 0}
                                onChange={field.onChange}
                                showPrefix
                                placeholder="Coverage amount"
                                className="min-h-[44px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`existingPolicies.${index}.isBeingReplaced`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm">Being Replaced?</FormLabel>
                              <FormDescription className="text-xs">
                                Will this policy be replaced?
                              </FormDescription>
                            </div>
                            <FormControl className="self-start sm:self-center">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </form>
    </Form>
  );
};

export default Step6ExistingCoverage;
