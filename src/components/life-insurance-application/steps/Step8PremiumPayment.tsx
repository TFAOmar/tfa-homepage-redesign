import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Building, Calendar, Wallet } from "lucide-react";
import { Step8Data } from "@/types/lifeInsuranceApplication";
import { ValidatedInput } from "../ValidatedInput";
import { ValidatedSelectTrigger } from "../ValidatedSelect";

interface Step8PremiumPaymentProps {
  form: UseFormReturn<Step8Data>;
}

const PAYMENT_FREQUENCIES = [
  { value: "annual", label: "Annual (Save ~8%)" },
  { value: "semi-annual", label: "Semi-Annual (2x per year)" },
  { value: "quarterly", label: "Quarterly (4x per year)" },
  { value: "monthly", label: "Monthly" },
];

const FUND_SOURCES = [
  { value: "income", label: "Employment Income" },
  { value: "savings", label: "Personal Savings" },
  { value: "loan", label: "Loan Proceeds" },
  { value: "gift", label: "Gift" },
  { value: "other", label: "Other" },
];

const Step8PremiumPayment = ({ form }: Step8PremiumPaymentProps) => {
  const watchPaymentMethod = form.watch("paymentMethod");
  const watchSourceOfFunds = form.watch("sourceOfFunds");

  return (
    <Form {...form}>
      <form className="space-y-6 md:space-y-8">
        {/* Payment Method Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Payment Method</h3>
          </div>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm md:text-base">How would you like to pay your premiums? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-border p-3 md:p-4 min-h-[72px] cursor-pointer hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="eft" />
                      </FormControl>
                      <div className="space-y-0.5 flex-1">
                        <FormLabel className="font-normal cursor-pointer text-sm md:text-base">
                          Electronic Funds Transfer (EFT)
                        </FormLabel>
                        <FormDescription className="text-xs md:text-sm">
                          Automatic bank draft - most convenient
                        </FormDescription>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-border p-3 md:p-4 min-h-[72px] cursor-pointer hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="check" />
                      </FormControl>
                      <div className="space-y-0.5 flex-1">
                        <FormLabel className="font-normal cursor-pointer text-sm md:text-base">
                          Direct Bill / Check
                        </FormLabel>
                        <FormDescription className="text-xs md:text-sm">
                          Paper statement mailed to you
                        </FormDescription>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
              </FormItem>
            )}
          />
        </div>

        {/* Payment Frequency Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Payment Frequency</h3>
          </div>

          <FormField
            control={form.control}
            name="paymentFrequency"
            render={({ field, fieldState }) => (
              <FormItem className="max-w-md">
                <FormLabel className="text-sm md:text-base">How often would you like to pay? *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <ValidatedSelectTrigger fieldState={fieldState} className="min-h-[44px]">
                      <SelectValue placeholder="Select payment frequency" />
                    </ValidatedSelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAYMENT_FREQUENCIES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs md:text-sm">
                  Annual payments typically offer the best value with premium discounts
                </FormDescription>
                <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
              </FormItem>
            )}
          />
        </div>

        {/* Bank Details Section (Conditional) */}
        {watchPaymentMethod === "eft" && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Building className="w-5 h-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">Bank Account Information</h3>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Please provide your bank account details for automatic premium payments.
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 p-3 md:p-4 rounded-lg border border-border bg-muted/30">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Bank Name *</FormLabel>
                    <FormControl>
                      <ValidatedInput
                        placeholder="Enter bank name"
                        fieldState={fieldState}
                        className="min-h-[44px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routingNumber"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Routing Number *</FormLabel>
                    <FormControl>
                      <ValidatedInput
                        placeholder="9-digit routing number"
                        maxLength={9}
                        fieldState={fieldState}
                        className="min-h-[44px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      9-digit number on the bottom left of your check
                    </FormDescription>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Account Number *</FormLabel>
                    <FormControl>
                      <ValidatedInput
                        placeholder="Enter account number"
                        type="password"
                        autoComplete="off"
                        fieldState={fieldState}
                        className="min-h-[44px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm md:text-base">Account Type *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 min-h-[44px]">
                          <FormControl>
                            <RadioGroupItem value="checking" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-sm md:text-base">
                            Checking
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 min-h-[44px]">
                          <FormControl>
                            <RadioGroupItem value="savings" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-sm md:text-base">
                            Savings
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Source of Funds Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Wallet className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Source of Funds</h3>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <FormField
              control={form.control}
              name="sourceOfFunds"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">What is the source of premium funds? *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <ValidatedSelectTrigger fieldState={fieldState} className="min-h-[44px]">
                        <SelectValue placeholder="Select source" />
                      </ValidatedSelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FUND_SOURCES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs md:text-sm">
                    Required for regulatory compliance
                  </FormDescription>
                  <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                </FormItem>
              )}
            />

            {watchSourceOfFunds === "other" && (
              <FormField
                control={form.control}
                name="sourceOfFundsOther"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Please specify *</FormLabel>
                    <FormControl>
                      <ValidatedInput
                        placeholder="Describe source of funds"
                        fieldState={fieldState}
                        className="min-h-[44px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Step8PremiumPayment;