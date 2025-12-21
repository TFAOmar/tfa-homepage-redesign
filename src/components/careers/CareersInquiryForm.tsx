import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
import { Send, UserPlus, Building2 } from "lucide-react";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

const careersFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone must be less than 20 characters"),
  careerInterest: z.enum(["agent", "franchise", "both"], {
    required_error: "Please select your career interest",
  }),
  currentOccupation: z.string().trim().max(100, "Occupation must be less than 100 characters").optional(),
  experience: z.enum(["none", "1-2", "3-5", "5+"], {
    required_error: "Please select your experience level",
  }),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type CareersFormData = z.infer<typeof careersFormSchema>;

const careerInterestLabels: Record<string, string> = {
  agent: "Licensed Agent",
  franchise: "Franchise Opportunity",
  both: "Both Options",
};

const experienceLabels: Record<string, string> = {
  none: "No prior experience",
  "1-2": "1-2 years",
  "3-5": "3-5 years",
  "5+": "5+ years",
};

const CareersInquiryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const form = useForm<CareersFormData>({
    resolver: zodResolver(careersFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      careerInterest: undefined,
      currentOccupation: "",
      experience: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: CareersFormData) => {
    // Silently reject bot submissions
    if (isBot()) {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. Our team will contact you within 24-48 hours.",
      });
      form.reset();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const notes = [
        `Career Interest: ${careerInterestLabels[data.careerInterest]}`,
        `Experience: ${experienceLabels[data.experience]}`,
        data.currentOccupation ? `Current Occupation: ${data.currentOccupation}` : null,
        data.message ? `Message: ${data.message}` : null,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Careers Inquiry",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes,
        tags: ["Careers", careerInterestLabels[data.careerInterest]],
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. Our team will contact you within 24-48 hours.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers-form" className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Your Application
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in joining The Financial Architects? Fill out the form below and our team will reach out to discuss opportunities.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 md:p-12 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from humans, traps bots */}
                <div className={honeypotClassName}>
                  <label htmlFor="careers_linkedin">LinkedIn URL</label>
                  <input
                    type="text"
                    id="careers_linkedin"
                    name="careers_linkedin"
                    {...honeypotProps}
                  />
                </div>

                {/* Name Row */}
                <div className="grid md:grid-cols-2 gap-6">
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
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
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
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Career Interest */}
                <FormField
                  control={form.control}
                  name="careerInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Interest *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your career interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="agent">
                            <div className="flex items-center gap-2">
                              <UserPlus className="h-4 w-4 text-accent" />
                              <span>Become a Licensed Agent</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="franchise">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-primary" />
                              <span>Franchise Opportunity</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="both">
                            <span>Interested in Both Options</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Experience & Occupation Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Financial Services Experience *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">No prior experience</SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5+">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Sales Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell Us About Yourself</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your background, goals, and why you're interested in joining TFA..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto btn-primary-cta px-8 py-6 text-lg group"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Application
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-muted-foreground text-center md:text-left">
                  By submitting this form, you agree to be contacted by The Financial Architects regarding career opportunities. 
                  Your information will be kept confidential.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersInquiryForm;