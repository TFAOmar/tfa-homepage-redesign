import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  ageRange: z.string().min(1, "Please select your age range"),
  currentCoverage: z.string().min(1, "Please select your current coverage"),
  interest: z.string().min(1, "Please select your primary interest"),
});

type FormData = z.infer<typeof formSchema>;

const ageRanges = [
  { value: "under-65", label: "Under 65" },
  { value: "65", label: "65" },
  { value: "66-70", label: "66-70" },
  { value: "71-75", label: "71-75" },
  { value: "76+", label: "76+" },
];

const coverageOptions = [
  { value: "employer", label: "Employer Coverage" },
  { value: "individual", label: "Individual Plan" },
  { value: "medicare", label: "Already on Medicare" },
  { value: "none", label: "No Current Coverage" },
];

const interestOptions = [
  { value: "enrollment", label: "Medicare Enrollment" },
  { value: "comparison", label: "Plan Comparison" },
  { value: "part-d", label: "Part D Review" },
  { value: "supplement", label: "Medicare Supplement" },
  { value: "advantage", label: "Medicare Advantage" },
  { value: "long-term-care", label: "Long-Term Care Planning" },
];

export function TamaraLeeMedicareForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      // Store in database
      const { error: dbError } = await supabase.from("form_submissions").insert({
        form_type: "medicare-inquiry",
        form_data: data,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        source: "/advisors/tamara-lee/medicare",
        advisor: "tamara-lee",
      });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-form-notification",
        {
          body: {
            formType: "medicare-inquiry",
            formData: {
              firstName: data.firstName,
              lastName: data.lastName,
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              phone: data.phone,
              ageRange: data.ageRange,
              currentCoverage: data.currentCoverage,
              interest: data.interest,
              advisorName: "Tamara Lee",
              source: "/advisors/tamara-lee/medicare",
            },
            additionalRecipients: ["tlee@tfainsuranceadvisors.com"],
          },
        }
      );

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      toast({
        title: "Thank you for your inquiry!",
        description: "Tamara will be in touch within 24 hours.",
      });

      reset();
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

  const inputClasses =
    "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20";
  const labelClasses = "text-white/90";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="text" className={honeypotClassName} {...honeypotProps} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className={labelClasses}>
            First Name *
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={inputClasses}
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className={labelClasses}>
            Last Name *
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={inputClasses}
            placeholder="Your last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={labelClasses}>
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={inputClasses}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClasses}>
            Phone *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className={inputClasses}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ageRange" className={labelClasses}>
          Age Range *
        </Label>
        <Select onValueChange={(value) => setValue("ageRange", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
            <SelectValue placeholder="Select your age range" />
          </SelectTrigger>
          <SelectContent className="bg-navy border-white/20 z-[150]">
            {ageRanges.map((range) => (
              <SelectItem
                key={range.value}
                value={range.value}
                className="text-white hover:bg-white/10 focus:bg-white/10"
              >
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.ageRange && (
          <p className="text-red-400 text-sm">{errors.ageRange.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentCoverage" className={labelClasses}>
          Current Coverage *
        </Label>
        <Select onValueChange={(value) => setValue("currentCoverage", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
            <SelectValue placeholder="Select your current coverage" />
          </SelectTrigger>
          <SelectContent className="bg-navy border-white/20 z-[150]">
            {coverageOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white hover:bg-white/10 focus:bg-white/10"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.currentCoverage && (
          <p className="text-red-400 text-sm">{errors.currentCoverage.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest" className={labelClasses}>
          Primary Interest *
        </Label>
        <Select onValueChange={(value) => setValue("interest", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
            <SelectValue placeholder="What can we help you with?" />
          </SelectTrigger>
          <SelectContent className="bg-navy border-white/20 z-[150]">
            {interestOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white hover:bg-white/10 focus:bg-white/10"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.interest && (
          <p className="text-red-400 text-sm">{errors.interest.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg rounded-full"
      >
        {isSubmitting ? "Submitting..." : "Get Your Free Medicare Consultation"}
      </Button>

      <p className="text-white/60 text-xs text-center">
        By submitting this form, you agree to be contacted by Tamara Lee regarding
        Medicare planning options. This is a solicitation for insurance.
      </p>
    </form>
  );
}
