import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, Calendar } from "lucide-react";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";
import { estateGuruContent } from "@/pages/EstateGuru";
import { useConfetti } from "@/hooks/useConfetti";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(30),
  statesLicensed: z.array(z.string()).min(1, "Please select at least one state"),
  npn: z.string().max(20).optional(),
  currentlyWithTFA: z.enum(["yes", "no"], { required_error: "Please select an option" }),
  referredBy: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  consent: z.boolean().refine(val => val === true, { message: "You must agree to be contacted" }),
});

type FormData = z.infer<typeof formSchema>;

const EstateGuruRegistrationForm = () => {
  const { registration } = estateGuruContent;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();
  const { fireConfetti } = useConfetti();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      statesLicensed: [],
      npn: "",
      currentlyWithTFA: undefined,
      referredBy: "",
      notes: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    // Check honeypot
    if (isBot()) {
      // Silently accept but don't process
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitForm({
        form_name: "Estate Guru Registration",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        state: data.statesLicensed.join(", "),
        notes: [
          data.npn ? `NPN: ${data.npn}` : "",
          `Currently with TFA: ${data.currentlyWithTFA}`,
          data.referredBy ? `Referred by: ${data.referredBy}` : "",
          data.notes ? `Additional notes: ${data.notes}` : "",
        ].filter(Boolean).join("\n"),
        tags: ["estate-guru", "agent-registration"],
      });

      setIsSuccess(true);
      fireConfetti();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-[#0B1F3B] mb-4">
              {registration.successMessage}
            </h2>
            <p className="text-gray-600 mb-8">
              Our team will review your registration and activate your access within 24-48 hours.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold"
            >
              <a href={registration.successCtaLink}>
                <Calendar className="mr-2" size={20} />
                {registration.successCta}
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B1F3B] to-[#0F2847]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {registration.headline}
            </h2>
            <p className="text-white/70 text-lg">
              {registration.subtext}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot */}
                <div className={honeypotClassName}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    {...honeypotProps}
                  />
                </div>

                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
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
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
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
                        <FormLabel>Mobile Phone *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* States Licensed */}
                <FormField
                  control={form.control}
                  name="statesLicensed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State(s) Licensed *</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          if (!field.value.includes(value)) {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select states..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((state) => (
                            <span
                              key={state}
                              className="bg-[#0B1F3B]/10 text-[#0B1F3B] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                              {state}
                              <button
                                type="button"
                                onClick={() => field.onChange(field.value.filter(s => s !== state))}
                                className="hover:text-red-600"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* NPN */}
                <FormField
                  control={form.control}
                  name="npn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NPN (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your NPN number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currently with TFA */}
                <FormField
                  control={form.control}
                  name="currentlyWithTFA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you currently with TFA? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="tfa-yes" />
                            <Label htmlFor="tfa-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="tfa-no" />
                            <Label htmlFor="tfa-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Referred By */}
                <FormField
                  control={form.control}
                  name="referredBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If referred by someone, who? (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of referrer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information you'd like to share..."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consent */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal text-gray-600">
                          I agree to be contacted by TFA via call, text, or email about Estate Guru setup. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold text-lg py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    "Register Now"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstateGuruRegistrationForm;
