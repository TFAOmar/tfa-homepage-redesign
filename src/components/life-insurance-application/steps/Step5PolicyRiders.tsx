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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText, Shield, HelpCircle, Plus, Trash2, Baby } from "lucide-react";
import { Step5Data } from "@/types/lifeInsuranceApplication";

interface Step5PolicyRidersProps {
  form: UseFormReturn<Step5Data>;
}

const PLAN_OPTIONS = [
  { value: "term-life", label: "Term Life Insurance" },
  { value: "whole-life", label: "Whole Life Insurance" },
  { value: "universal-life", label: "Universal Life Insurance" },
  { value: "indexed-universal-life", label: "Indexed Universal Life (IUL)" },
];

const TERM_DURATIONS = [
  { value: "10", label: "10 Years" },
  { value: "15", label: "15 Years" },
  { value: "20", label: "20 Years" },
  { value: "25", label: "25 Years" },
  { value: "30", label: "30 Years" },
];

const Step5PolicyRiders = ({ form }: Step5PolicyRidersProps) => {
  const watchPlanName = form.watch("planName");
  const watchChildrenRider = form.watch("ridersChildrenTerm");
  const isTermProduct = watchPlanName === "term-life";

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "childrenDetails",
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        {/* Product Selection Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Product Selection</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="planName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PLAN_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isTermProduct && (
              <FormField
                control={form.control}
                name="termDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term Duration *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select term length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TERM_DURATIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="faceAmount"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Face Amount (Death Benefit) *</FormLabel>
                <FormControl>
                  <CurrencyInput
                    value={field.value || 0}
                    onChange={field.onChange}
                    showPrefix
                    placeholder="Enter face amount"
                  />
                </FormControl>
                <FormDescription>Minimum face amount is $1,000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Riders Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Optional Riders</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Select any additional riders you'd like to add to your policy.
          </p>

          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ridersChildrenTerm"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">Children's Term Rider</FormLabel>
                      <FormDescription>
                        Provides term coverage for eligible children
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ridersWaiverOfPremium"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <div className="flex items-center gap-2">
                        <FormLabel className="cursor-pointer">Waiver of Premium</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>If you become disabled, this rider waives future premium payments while keeping your policy in force.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormDescription>
                        Waives premiums if you become disabled
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ridersAcceleratedBenefits"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">Accelerated Benefits Rider</FormLabel>
                      <FormDescription>
                        Access death benefit if diagnosed with terminal illness
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ridersChronicIllness"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">Chronic Illness Rider</FormLabel>
                      <FormDescription>
                        Access benefits if you cannot perform daily living activities
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ridersAccidentalDeath"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">Accidental Death Benefit</FormLabel>
                      <FormDescription>
                        Additional benefit if death is due to an accident
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </TooltipProvider>
        </div>

        {/* Children Details (Conditional) */}
        {watchChildrenRider && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Baby className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Children's Information</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Please provide information for each child to be covered under the Children's Term Rider.
            </p>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border border-border bg-muted/30"
                >
                  <FormField
                    control={form.control}
                    name={`childrenDetails.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child's Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Full name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`childrenDetails.${index}.dateOfBirth`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ name: "", dateOfBirth: "" })}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Child
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default Step5PolicyRiders;
