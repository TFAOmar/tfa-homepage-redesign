import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Step2Data } from "@/types/lifeInsuranceApplication";
import { Phone, Briefcase, DollarSign, Users } from "lucide-react";

interface Step2Props {
  form: UseFormReturn<Step2Data>;
}

const Step2ContactEmployment = ({ form }: Step2Props) => {
  return (
    <Form {...form}>
      <div className="space-y-6 md:space-y-8">
        {/* Contact Information Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <FormField
              control={form.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Mobile Phone *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(555) 123-4567"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="homePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Home Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(555) 123-4567"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Work Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(555) 123-4567"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Employment Details Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Employment Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <FormField
              control={form.control}
              name="employerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Employer Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company Name"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Occupation *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Job Title"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Industry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Technology, Healthcare"
                      {...field}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsEmployed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Years Employed</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      value={field.value ?? ""}
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="jobDuties"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Job Duties</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe your job responsibilities..."
                    {...field}
                    className="bg-background/50 min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Financial Information Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <DollarSign className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Financial Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <FormField
              control={form.control}
              name="annualEarnedIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Annual Earned Income *</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      showPrefix
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="householdIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Household Income</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      showPrefix
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="netWorth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Net Worth *</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      showPrefix
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Family Insurance Section (AGL-specific) */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Family Insurance</h3>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Amount of life insurance currently in force on family members (if known).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <FormField
              control={form.control}
              name="spouseInsuranceAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Spouse</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      showPrefix
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentsInsuranceAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Parents</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      showPrefix
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siblingsInsuranceAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Siblings</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      showPrefix
                      className="bg-background/50 min-h-[44px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Step2ContactEmployment;
