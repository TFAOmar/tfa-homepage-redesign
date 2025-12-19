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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Building, Calendar, Wallet } from "lucide-react";
import { Step8Data } from "@/types/lifeInsuranceApplication";

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
      <form className="space-y-8">
        {/* Payment Method Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
          </div>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How would you like to pay your premiums? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="eft" />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel className="font-normal cursor-pointer">
                          Electronic Funds Transfer (EFT)
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Automatic bank draft - most convenient
                        </FormDescription>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="check" />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel className="font-normal cursor-pointer">
                          Direct Bill / Check
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Paper statement mailed to you
                        </FormDescription>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Payment Frequency Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Payment Frequency</h3>
          </div>

          <FormField
            control={form.control}
            name="paymentFrequency"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>How often would you like to pay? *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAYMENT_FREQUENCIES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Annual payments typically offer the best value with premium discounts
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bank Details Section (Conditional) */}
        {watchPaymentMethod === "eft" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Building className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Bank Account Information</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Please provide your bank account details for automatic premium payments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-border bg-muted/30">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter bank name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="9-digit routing number"
                        maxLength={9}
                        pattern="[0-9]*"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      9-digit number on the bottom left of your check
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter account number"
                        type="password"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Account Type *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="checking" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Checking
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="savings" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Savings
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Source of Funds Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Wallet className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Source of Funds</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sourceOfFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is the source of premium funds? *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FUND_SOURCES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Required for regulatory compliance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchSourceOfFunds === "other" && (
              <FormField
                control={form.control}
                name="sourceOfFundsOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Describe source of funds" />
                    </FormControl>
                    <FormMessage />
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
