import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  ageRange: z.string().min(1, "Please select your age range"),
  investmentRange: z.string().min(1, "Please select your investment range"),
  contactPreference: z.string().min(1, "Please select contact preference"),
  message: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceConsultationFormProps {
  serviceType: string;
  serviceName: string;
  ctaText?: string;
}

export const ServiceConsultationForm = ({
  serviceType,
  serviceName,
  ctaText = "Get Your Free Consultation",
}: ServiceConsultationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ageRange: "",
      investmentRange: "",
      contactPreference: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      toast({
        title: "Thank you!",
        description: "We'll be in touch soon.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: serviceType,
          formData: {
            ...data,
            service: serviceName,
            source: window.location.pathname,
          },
          recipientEmail: "leads@tfainsuranceadvisors.com",
        },
      });

      if (error) throw error;

      toast({
        title: "Thank you for your interest!",
        description: "A TFA advisor will contact you within 24 hours.",
      });

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us at (888) 350-5396.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field */}
        <div className={honeypotClassName}>
          <input
            type="text"
            name="website"
            {...honeypotProps}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
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
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
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
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ageRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Age Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-navy border-white/20 z-[150]">
                    <SelectItem value="under-40" className="text-white">Under 40</SelectItem>
                    <SelectItem value="40-49" className="text-white">40-49</SelectItem>
                    <SelectItem value="50-59" className="text-white">50-59</SelectItem>
                    <SelectItem value="60-69" className="text-white">60-69</SelectItem>
                    <SelectItem value="70+" className="text-white">70+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Investment/Savings Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-navy border-white/20 z-[150]">
                    <SelectItem value="under-100k" className="text-white">Under $100,000</SelectItem>
                    <SelectItem value="100k-250k" className="text-white">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250k-500k" className="text-white">$250,000 - $500,000</SelectItem>
                    <SelectItem value="500k-1m" className="text-white">$500,000 - $1 Million</SelectItem>
                    <SelectItem value="1m+" className="text-white">$1 Million+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Preferred Contact Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                    <SelectValue placeholder="How should we contact you?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-navy border-white/20 z-[150]">
                  <SelectItem value="phone" className="text-white">Phone Call</SelectItem>
                  <SelectItem value="email" className="text-white">Email</SelectItem>
                  <SelectItem value="text" className="text-white">Text Message</SelectItem>
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
              <FormLabel className="text-white/90">Questions or Comments (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your goals..."
                  {...field}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20 min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary-cta py-6 text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            ctaText
          )}
        </Button>

        <p className="text-white/60 text-xs text-center">
          Your information is secure and will never be shared. A TFA advisor will 
          contact you within 24 hours.
        </p>
      </form>
    </Form>
  );
};
