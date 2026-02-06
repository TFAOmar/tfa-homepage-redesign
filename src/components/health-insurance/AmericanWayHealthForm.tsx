import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";
import { Phone } from "lucide-react";

const PHONE_NUMBER = "321-356-3450";
const PHONE_TEL = "tel:+13213563450";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").max(11, "Phone must be 10-11 characters"),
  yearlyIncome: z.string().min(1, "Please select yearly income"),
  dobMonth: z.string().min(1, "Month is required"),
  dobDay: z.string().min(1, "Day is required"),
  dobYear: z.string().min(4, "Year is required (YYYY)"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code").max(10, "Invalid ZIP code"),
  insuranceType: z.string().min(1, "Please select an insurance type"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  }),
});

type FormData = z.infer<typeof formSchema>;

const insuranceTypeLabels: Record<string, string> = {
  individual: "Individual Health Insurance",
  family: "Family Health Plan",
  business: "Business/Group Health",
  medicare: "Medicare Supplement",
  "short-term": "Short-Term Health",
  "dental-vision": "Dental & Vision",
  "aca-marketplace": "ACA/Marketplace Plan",
  accident: "Accident Insurance",
  "critical-illness": "Critical Illness",
  catastrophic: "Catastrophic Coverage",
};

const incomeOptions = [
  { value: "under-30k", label: "Under $30K" },
  { value: "30k-50k", label: "$30K - $50K" },
  { value: "50k-75k", label: "$50K - $75K" },
  { value: "75k-100k", label: "$75K - $100K" },
  { value: "over-100k", label: "Over $100K" },
];

const months = [
  { value: "01", label: "01 - January" },
  { value: "02", label: "02 - February" },
  { value: "03", label: "03 - March" },
  { value: "04", label: "04 - April" },
  { value: "05", label: "05 - May" },
  { value: "06", label: "06 - June" },
  { value: "07", label: "07 - July" },
  { value: "08", label: "08 - August" },
  { value: "09", label: "09 - September" },
  { value: "10", label: "10 - October" },
  { value: "11", label: "11 - November" },
  { value: "12", label: "12 - December" },
];

const AmericanWayHealthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      yearlyIncome: "",
      dobMonth: "",
      dobDay: "",
      dobYear: "",
      zipCode: "",
      insuranceType: "",
      termsAccepted: undefined,
    },
  });

  const phoneValue = form.watch("phone") || "";

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      toast.success("Thank you! We'll be in touch soon.");
      form.reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const dateOfBirth = `${data.dobMonth}/${data.dobDay}/${data.dobYear}`;
      const incomeLabel = incomeOptions.find(o => o.value === data.yearlyIncome)?.label || data.yearlyIncome;
      
      const notes = [
        `Insurance Type: ${insuranceTypeLabels[data.insuranceType] || data.insuranceType}`,
        `Date of Birth: ${dateOfBirth}`,
        `Yearly Income: ${incomeLabel}`,
        `ZIP Code: ${data.zipCode}`,
        `Partner: American Way Health`,
        `Terms Accepted: Yes`,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Health Insurance Inquiry",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes,
        tags: ["Health Insurance", insuranceTypeLabels[data.insuranceType] || data.insuranceType, "American Way Health"],
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);

      toast.success("Thank you! American Way Health will contact you within 24 hours.");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          className={honeypotClassName}
          {...honeypotProps}
        />

        {/* Instant Quote CTA */}
        <div className="text-center pb-2">
          <p className="text-white/80 text-sm mb-2">For an INSTANT quote, click the button below to call:</p>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <Phone className="w-5 h-5" />
            CALL NOW: {PHONE_NUMBER}
          </a>
        </div>

        <div className="border-t border-white/20 my-4" />

        <p className="text-white/70 text-sm text-center">
          Or fill out the form below to receive your free quote:
        </p>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">First Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Last Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Smith"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Phone *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      maxLength={11}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                      {...field}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">
                      {phoneValue.length} of 11 max characters
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Yearly Income */}
        <FormField
          control={form.control}
          name="yearlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Yearly Income *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                    <SelectValue placeholder="Select yearly income" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-navy border-white/20 z-[150]">
                  {incomeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <div>
          <FormLabel className="text-white/90 block mb-2">Date of Birth *</FormLabel>
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="dobMonth"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-navy border-white/20 z-[150] max-h-[200px]">
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value} className="text-white hover:bg-white/10">
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dobDay"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="DD"
                      maxLength={2}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20 text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dobYear"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="YYYY"
                      maxLength={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20 text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ZIP Code */}
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">ZIP Code *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Add your ZIP Code"
                  maxLength={10}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Insurance Type */}
        <FormField
          control={form.control}
          name="insuranceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">What type of insurance coverage are you looking for? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                    <SelectValue placeholder="--- Select Choice ---" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-navy border-white/20 z-[150]">
                  <SelectItem value="individual" className="text-white hover:bg-white/10">Individual Health Insurance</SelectItem>
                  <SelectItem value="family" className="text-white hover:bg-white/10">Family Health Plan</SelectItem>
                  <SelectItem value="business" className="text-white hover:bg-white/10">Business/Group Health</SelectItem>
                  <SelectItem value="aca-marketplace" className="text-white hover:bg-white/10">ACA/Marketplace Plan</SelectItem>
                  <SelectItem value="medicare" className="text-white hover:bg-white/10">Medicare Supplement</SelectItem>
                  <SelectItem value="short-term" className="text-white hover:bg-white/10">Short-Term Health</SelectItem>
                  <SelectItem value="accident" className="text-white hover:bg-white/10">Accident Insurance</SelectItem>
                  <SelectItem value="critical-illness" className="text-white hover:bg-white/10">Critical Illness</SelectItem>
                  <SelectItem value="catastrophic" className="text-white hover:bg-white/10">Catastrophic Coverage</SelectItem>
                  <SelectItem value="dental-vision" className="text-white hover:bg-white/10">Dental & Vision</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms & Conditions */}
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-white/40 data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-white/80 text-xs font-normal leading-relaxed">
                  I acknowledge that the TrustedForm certificate will be sent to the email address I provided above. By submitting this form, I consent to being contacted by American Way Health about insurance plans through phone calls, text messages, and emails. I understand that I can opt out of these communications at any time by responding 'STOP' to text messages or by clicking the unsubscribe link in emails. By submitting this form, I agree to the{" "}
                  <a href="https://health-market.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="https://health-market.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Privacy Policy
                  </a>
                  .
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        <p className="text-white/60 text-xs text-center">
          Your information is secure and will only be used to provide you with a quote.
        </p>
      </form>
    </Form>
  );
};

export default AmericanWayHealthForm;
