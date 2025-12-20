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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Valid email is required").max(255),
  phone: z.string().min(10, "Valid phone number is required").max(20),
  maritalStatus: z.string().min(1, "Please select your marital status"),
  ownsProperty: z.string().min(1, "Please select an option"),
  estateValue: z.string().min(1, "Please select an estate value range"),
  contactPreference: z.string().min(1, "Please select contact preference"),
  bestTimeToCall: z.string().optional(),
  additionalInfo: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

export const EstatePlanningForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

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
      toast.success("Thank you! We'll be in touch soon.");
      reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const notes = [
        `Marital Status: ${data.maritalStatus}`,
        `Owns Property: ${data.ownsProperty}`,
        `Estate Value: ${data.estateValue}`,
        `Contact Preference: ${data.contactPreference}`,
        data.bestTimeToCall ? `Best Time to Call: ${data.bestTimeToCall}` : null,
        data.additionalInfo ? `Additional Info: ${data.additionalInfo}` : null,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Estate Planning Inquiry",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes,
        tags: ["Estate Planning"],
        honeypot: honeypotValue(),
      });

      if (!response.ok) throw new Error(response.error);

      toast.success("Thank you! An estate planning specialist will contact you shortly.");
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field */}
      <div className={honeypotClassName}>
        <input
          type="text"
          name="website"
          {...honeypotProps}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/90">First Name *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/90">Last Name *</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="Your last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/90">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/90">Marital Status *</Label>
          <Select onValueChange={(value) => setValue("maritalStatus", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="single" className="text-white hover:bg-white/10">Single</SelectItem>
              <SelectItem value="married" className="text-white hover:bg-white/10">Married</SelectItem>
              <SelectItem value="divorced" className="text-white hover:bg-white/10">Divorced</SelectItem>
              <SelectItem value="widowed" className="text-white hover:bg-white/10">Widowed</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className="text-red-400 text-sm">{errors.maritalStatus.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">Do you own real estate? *</Label>
          <Select onValueChange={(value) => setValue("ownsProperty", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="yes" className="text-white hover:bg-white/10">Yes</SelectItem>
              <SelectItem value="no" className="text-white hover:bg-white/10">No</SelectItem>
              <SelectItem value="multiple" className="text-white hover:bg-white/10">Yes, multiple properties</SelectItem>
            </SelectContent>
          </Select>
          {errors.ownsProperty && (
            <p className="text-red-400 text-sm">{errors.ownsProperty.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/90">Estimated Estate Value *</Label>
          <Select onValueChange={(value) => setValue("estateValue", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="under-250k" className="text-white hover:bg-white/10">Under $250,000</SelectItem>
              <SelectItem value="250k-500k" className="text-white hover:bg-white/10">$250,000 - $500,000</SelectItem>
              <SelectItem value="500k-1m" className="text-white hover:bg-white/10">$500,000 - $1,000,000</SelectItem>
              <SelectItem value="1m-2m" className="text-white hover:bg-white/10">$1,000,000 - $2,000,000</SelectItem>
              <SelectItem value="2m-5m" className="text-white hover:bg-white/10">$2,000,000 - $5,000,000</SelectItem>
              <SelectItem value="over-5m" className="text-white hover:bg-white/10">Over $5,000,000</SelectItem>
            </SelectContent>
          </Select>
          {errors.estateValue && (
            <p className="text-red-400 text-sm">{errors.estateValue.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">Preferred Contact Method *</Label>
          <Select onValueChange={(value) => setValue("contactPreference", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="phone" className="text-white hover:bg-white/10">Phone Call</SelectItem>
              <SelectItem value="email" className="text-white hover:bg-white/10">Email</SelectItem>
              <SelectItem value="text" className="text-white hover:bg-white/10">Text Message</SelectItem>
            </SelectContent>
          </Select>
          {errors.contactPreference && (
            <p className="text-red-400 text-sm">{errors.contactPreference.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white/90">Best Time to Call (Optional)</Label>
        <Select onValueChange={(value) => setValue("bestTimeToCall", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent className="bg-navy border-white/20 z-[150]">
            <SelectItem value="morning" className="text-white hover:bg-white/10">Morning (9am - 12pm)</SelectItem>
            <SelectItem value="afternoon" className="text-white hover:bg-white/10">Afternoon (12pm - 5pm)</SelectItem>
            <SelectItem value="evening" className="text-white hover:bg-white/10">Evening (5pm - 8pm)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-white/90">Additional Information (Optional)</Label>
        <Textarea
          id="additionalInfo"
          {...register("additionalInfo")}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20 min-h-[100px]"
          placeholder="Tell us about your estate planning goals or any specific concerns..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary-cta py-6 text-lg"
      >
        {isSubmitting ? "Submitting..." : "Get Your Free Consultation"}
      </Button>

      <p className="text-white/60 text-xs text-center">
        By submitting this form, you agree to be contacted by a TFA representative. 
        Your information is secure and will never be shared.
      </p>
    </form>
  );
};