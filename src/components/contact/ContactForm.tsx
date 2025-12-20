import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

const contactFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z.string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .regex(/^[\d\s\-\+\(\)]+$/, { message: "Please enter a valid phone number" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const serviceLabels: Record<string, string> = {
  retirement: "Retirement Planning",
  investment: "Investment Management",
  estate: "Estate & Legacy Planning",
  tax: "Tax Planning",
  healthcare: "Health Care Planning",
  annuities: "Annuities",
  "401k": "401(k) Rollover",
  insurance: "Insurance",
  group: "Group Retirement Plans",
  other: "General Inquiry",
};

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, honeypotValue, isBot } = useHoneypot();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: "",
    },
  });

  const serviceValue = watch("service");

  const onSubmit = async (data: ContactFormData) => {
    // Silently reject bot submissions
    if (isBot()) {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceLabel = serviceLabels[data.service] || data.service;
      
      const result = await submitForm({
        form_name: "Contact Form",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes: `Service Interest: ${serviceLabel}\n\nMessage:\n${data.message}`,
        tags: [serviceLabel],
        honeypot: honeypotValue,
      });

      if (result.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        reset();
      } else {
        throw new Error(result.error || "Submission failed");
      }
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
    <div className="glass p-8 rounded-2xl">
      <h2 className="text-3xl font-bold text-navy mb-6">Send Us a Message</h2>
      <p className="text-muted-foreground mb-8">
        Fill out the form below and one of our advisors will contact you shortly.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from humans, traps bots */}
        <div className={honeypotClassName}>
          <label htmlFor="website_url">Website</label>
          <input
            type="text"
            id="website_url"
            name="website_url"
            {...honeypotProps}
          />
        </div>

        {/* Name Fields - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName")}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName")}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            {...register("phone")}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Service Interest */}
        <div className="space-y-2">
          <Label htmlFor="service" className="text-foreground">
            What service are you interested in? <span className="text-destructive">*</span>
          </Label>
          <Select
            value={serviceValue}
            onValueChange={(value) => setValue("service", value)}
          >
            <SelectTrigger className={errors.service ? "border-destructive" : ""}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retirement">Retirement Planning</SelectItem>
              <SelectItem value="investment">Investment Management</SelectItem>
              <SelectItem value="estate">Estate & Legacy Planning</SelectItem>
              <SelectItem value="tax">Tax Planning</SelectItem>
              <SelectItem value="healthcare">Health Care Planning</SelectItem>
              <SelectItem value="annuities">Annuities</SelectItem>
              <SelectItem value="401k">401(k) Rollover</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="group">Group Retirement Plans</SelectItem>
              <SelectItem value="other">Not Sure / General Inquiry</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-sm text-destructive">{errors.service.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your financial goals and how we can help..."
            rows={5}
            {...register("message")}
            className={errors.message ? "border-destructive" : ""}
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
        >
          <Send className="mr-2 h-5 w-5" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
