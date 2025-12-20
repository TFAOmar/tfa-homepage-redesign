import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import KaiZenFormFields, { KaiZenFormData } from "./KaiZenFormFields";
import { submitForm } from "@/lib/formSubmit";

const ageRangeLabels: Record<string, string> = {
  "30-40": "30-40",
  "41-50": "41-50",
  "51-60": "51-60",
  "61+": "61+",
};

const incomeLabels: Record<string, string> = {
  "200-300k": "$200,000 - $300,000",
  "300-500k": "$300,000 - $500,000",
  "500k-1m": "$500,000 - $1,000,000",
  "1m+": "$1,000,000+",
};

const MariahKaiZenForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<KaiZenFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ageRange: "",
    householdIncome: "",
  });
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Silent rejection for bots
    if (isBot()) {
      toast({
        title: "Thank you!",
        description: "We'll be in touch shortly.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const notes = [
        `Age Range: ${ageRangeLabels[formData.ageRange] || formData.ageRange}`,
        `Household Income: ${incomeLabels[formData.householdIncome] || formData.householdIncome}`,
      ].join("\n");

      const response = await submitForm({
        form_name: "Kai-Zen Inquiry - Mariah",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        notes,
        tags: ["Kai-Zen", "Mariah Lorenzen"],
        advisor_slug: "mariah-lorenzen",
        advisor_email: "mariah@tfainsuranceadvisors.com",
        honeypot: honeypotValue(),
      });

      if (!response.ok) throw new Error(response.error);

      toast({
        title: "Thank you for your interest!",
        description: "Mariah will be in touch with you shortly to discuss your Kai-Zen options.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        ageRange: "",
        householdIncome: "",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="website"
        className={honeypotClassName}
        {...honeypotProps}
      />
      
      <KaiZenFormFields
        formData={formData}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-full shadow-[0_0_30px_rgba(228,181,72,0.4)] hover:shadow-[0_0_40px_rgba(228,181,72,0.6)] transition-all duration-300"
      >
        {isSubmitting ? "Submitting..." : "See If You Qualify"}
      </Button>

      <p className="text-xs text-white/60 text-center">
        By submitting this form, you agree to be contacted by Mariah Lorenzen regarding Kai-Zen and related financial strategies.
      </p>
    </form>
  );
};

export default MariahKaiZenForm;