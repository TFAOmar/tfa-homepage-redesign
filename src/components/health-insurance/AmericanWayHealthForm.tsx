import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  insuranceType: z.string().min(1, "Please select an insurance type"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AmericanWayHealthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      toast.success("Thank you! We'll be in touch soon.");
      form.reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "health-insurance-inquiry",
          formData: {
            firstName: data.firstName,
            lastName: data.lastName,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            insuranceType: data.insuranceType,
            message: data.message || "",
            partner: "American Way Health",
            source: "/health-insurance/american-way-health",
          },
          additionalRecipients: ["info@awhealthllc.com"],
        },
      });

      if (error) throw error;

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          className={honeypotClassName}
          {...honeypotProps}
        />

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
                <FormLabel className="text-white/90">Last Name</FormLabel>
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
                <FormLabel className="text-white/90">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="insuranceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Insurance Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                    <SelectValue placeholder="Select coverage type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-navy border-white/20 z-[150]">
                  <SelectItem value="individual" className="text-white hover:bg-white/10">Individual Health Insurance</SelectItem>
                  <SelectItem value="family" className="text-white hover:bg-white/10">Family Health Plan</SelectItem>
                  <SelectItem value="business" className="text-white hover:bg-white/10">Business/Group Health</SelectItem>
                  <SelectItem value="medicare" className="text-white hover:bg-white/10">Medicare Supplement</SelectItem>
                  <SelectItem value="short-term" className="text-white hover:bg-white/10">Short-Term Health</SelectItem>
                  <SelectItem value="dental-vision" className="text-white hover:bg-white/10">Dental & Vision</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your health coverage needs..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20 min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg"
        >
          {isSubmitting ? "Submitting..." : "Get Your Free Quote"}
        </Button>

        <p className="text-white/60 text-sm text-center">
          Your information is secure and will only be used to provide you with a quote.
        </p>
      </form>
    </Form>
  );
};

export default AmericanWayHealthForm;
