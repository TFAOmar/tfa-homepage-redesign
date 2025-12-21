import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

const livingTrustFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    required_error: "Please select your marital status",
  }),
  ownsProperty: z.enum(["yes", "no"], {
    required_error: "Please indicate if you own property",
  }),
  estateValue: z.enum(["under-250k", "250k-500k", "500k-1m", "1m-2m", "over-2m"], {
    required_error: "Please select an estimated range",
  }),
  preferredContact: z.enum(["phone", "email", "text"], {
    required_error: "Please select your preferred contact method",
  }),
  bestTimeToReach: z.enum(["morning", "afternoon", "evening"], {
    required_error: "Please select the best time to reach you",
  }),
  notes: z.string().trim().max(500).optional(),
  agreeToContact: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type LivingTrustFormData = z.infer<typeof livingTrustFormSchema>;

export default function LivingTrustForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const form = useForm<LivingTrustFormData>({
    resolver: zodResolver(livingTrustFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      agreeToContact: false,
    },
  });

  const onSubmit = async (data: LivingTrustFormData) => {
    // Silently reject bot submissions
    if (isBot()) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const notes = [
        `Marital Status: ${data.maritalStatus}`,
        `Owns Property: ${data.ownsProperty}`,
        `Estate Value: ${data.estateValue}`,
        `Preferred Contact: ${data.preferredContact}`,
        `Best Time to Reach: ${data.bestTimeToReach}`,
        data.notes ? `Notes: ${data.notes}` : null,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Living Trust Inquiry - Vanessa",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes,
        tags: ["Living Trust", "Vanessa Sanchez", "The Brandon Group"],
        advisor_slug: "vanessa-sanchez",
        advisor_email: "vsanchez@tfainsuranceadvisors.com",
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);
      
      setIsSubmitted(true);
      toast({
        title: "Request Submitted!",
        description: "Vanessa will contact you within 24-48 hours.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">
          Thank You for Your Interest!
        </h3>
        <p className="text-white/70 max-w-md mx-auto">
          Vanessa will review your information and contact you within 24-48 hours 
          to schedule your free consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-6 md:p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Request Your Free Consultation
        </h3>
        <p className="text-white/70">
          Fill out this quick questionnaire and Vanessa will be in touch.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field - hidden from humans, traps bots */}
          <div className={honeypotClassName}>
            <label htmlFor="trust_website">Website</label>
            <input
              type="text"
              id="trust_website"
              name="trust_website"
              {...honeypotProps}
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
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
                  <FormLabel className="text-white/90">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Smith"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
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
                  <FormLabel className="text-white/90">Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Marital Status */}
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Marital Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your marital status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property Ownership */}
          <FormField
            control={form.control}
            name="ownsProperty"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-white/90">Do you own property?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="property-yes" className="border-white/40 text-accent" />
                      <label htmlFor="property-yes" className="text-white/90 cursor-pointer">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="property-no" className="border-white/40 text-accent" />
                      <label htmlFor="property-no" className="text-white/90 cursor-pointer">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estate Value */}
          <FormField
            control={form.control}
            name="estateValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Estimated Estate Value</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select an estimated range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="under-250k">Under $250,000</SelectItem>
                    <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                    <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                    <SelectItem value="1m-2m">$1,000,000 - $2,000,000</SelectItem>
                    <SelectItem value="over-2m">Over $2,000,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Preferred Contact Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="text">Text Message</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bestTimeToReach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Best Time to Reach You</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">
                  Additional Notes <span className="text-white/50">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific questions or concerns about Living Trusts?"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Consent Checkbox */}
          <FormField
            control={form.control}
            name="agreeToContact"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-white/40 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-white/70 text-sm font-normal cursor-pointer">
                    I agree to be contacted by Vanessa Sanchez regarding Living Trust services. 
                    I understand this is a free, no-obligation consultation.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Your Free Consultation"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}