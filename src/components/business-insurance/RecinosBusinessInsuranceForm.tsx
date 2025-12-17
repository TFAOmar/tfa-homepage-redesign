import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot } from "@/hooks/useHoneypot";

const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required").max(100),
  contactName: z.string().min(1, "Contact name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Valid phone number required").max(20),
  businessType: z.string().min(1, "Please select a business type"),
  coverageInterests: z.array(z.string()).min(1, "Select at least one coverage type"),
  message: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const businessTypes = [
  "Retail / E-commerce",
  "Restaurant / Food Service",
  "Construction / Contractor",
  "Professional Services",
  "Healthcare / Medical",
  "Manufacturing",
  "Real Estate",
  "Technology / IT",
  "Transportation / Logistics",
  "Other"
];

const coverageOptions = [
  { id: "general-liability", label: "General Liability" },
  { id: "bop", label: "Business Owner's Policy (BOP)" },
  { id: "commercial-property", label: "Commercial Property" },
  { id: "workers-comp", label: "Workers' Compensation" },
  { id: "commercial-auto", label: "Commercial Auto" },
  { id: "professional-liability", label: "Professional Liability (E&O)" },
  { id: "cyber-liability", label: "Cyber Liability" },
  { id: "epli", label: "Employment Practices Liability" },
  { id: "umbrella", label: "Commercial Umbrella" },
];

const RecinosBusinessInsuranceForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverageInterests: [],
    },
  });

  const coverageInterests = watch("coverageInterests");

  const toggleCoverage = (coverageId: string) => {
    const current = coverageInterests || [];
    const updated = current.includes(coverageId)
      ? current.filter((id) => id !== coverageId)
      : [...current, coverageId];
    setValue("coverageInterests", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "business-insurance-recinos",
          formData: {
            ...data,
            firstName: data.contactName.split(" ")[0],
            advisorName: "Rolando and Savannah Recinos",
            coverageInterests: data.coverageInterests.map(id => 
              coverageOptions.find(opt => opt.id === id)?.label || id
            ),
            source: "Recinos Business Insurance Landing Page",
            advisor: "Rolando & Savannah Recinos"
          },
          recipientEmail: "leads@tfainsuranceadvisors.com",
          additionalRecipients: [
            "rrecinos@tfainsuranceadvisors.com",
            "srecinos@tfainsuranceadvisors.com"
          ]
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Quote Request Received!",
        description: "Rolando and Savannah will contact you within 24 hours.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or call us directly at (888) 350-5396.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-white/80 mb-6">
          We've received your business insurance quote request. Rolando and Savannah will review your information and contact you within 24 hours.
        </p>
        <p className="text-white/60 text-sm">
          Need immediate assistance? Call us at{" "}
          <a href="tel:8883505396" className="text-accent hover:underline">(888) 350-5396</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
      {/* Honeypot field */}
      <input {...honeypotProps} />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-white/90">Business Name *</Label>
          <Input
            id="businessName"
            {...register("businessName")}
            placeholder="Your Business Name"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          />
          {errors.businessName && (
            <p className="text-red-400 text-sm">{errors.businessName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactName" className="text-white/90">Contact Name *</Label>
          <Input
            id="contactName"
            {...register("contactName")}
            placeholder="Your Name"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          />
          {errors.contactName && (
            <p className="text-red-400 text-sm">{errors.contactName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@business.com"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/90">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="(555) 555-5555"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <Label htmlFor="businessType" className="text-white/90">Business Type *</Label>
        <Select onValueChange={(value) => setValue("businessType", value, { shouldValidate: true })}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
            <SelectValue placeholder="Select your business type" />
          </SelectTrigger>
          <SelectContent className="bg-navy border-white/20 z-[150]">
            {businessTypes.map((type) => (
              <SelectItem key={type} value={type} className="text-white hover:bg-white/10 focus:bg-white/10">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.businessType && (
          <p className="text-red-400 text-sm">{errors.businessType.message}</p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <Label className="text-white/90">Coverage Interests *</Label>
        <p className="text-white/60 text-sm">Select all coverage types you're interested in:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coverageOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                coverageInterests?.includes(option.id)
                  ? "bg-accent/20 border-accent"
                  : "bg-white/5 border-white/20 hover:border-white/40"
              }`}
              onClick={() => toggleCoverage(option.id)}
            >
              <Checkbox
                checked={coverageInterests?.includes(option.id)}
                className="border-white/40 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span className="text-white text-sm">{option.label}</span>
            </div>
          ))}
        </div>
        {errors.coverageInterests && (
          <p className="text-red-400 text-sm">{errors.coverageInterests.message}</p>
        )}
      </div>

      <div className="space-y-2 mb-8">
        <Label htmlFor="message" className="text-white/90">Additional Information (Optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell us about your business, current coverage, or specific concerns..."
          rows={4}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all"
      >
        {isSubmitting ? "Submitting..." : "Request Free Quote"}
      </Button>

      <p className="text-white/50 text-xs text-center mt-4">
        By submitting this form, you agree to be contacted regarding your business insurance needs.
        Your information is secure and will never be shared.
      </p>
    </form>
  );
};

export default RecinosBusinessInsuranceForm;
