import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import KaiZenFormFields, { KaiZenFormData } from "./KaiZenFormFields";
import type { Json } from "@/integrations/supabase/types";

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
  const { honeypotProps, isBot } = useHoneypot();

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
      // Store in database
      const { error: dbError } = await supabase
        .from('form_submissions')
        .insert([{
          form_type: 'kai-zen-inquiry',
          form_data: formData as unknown as Json,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          advisor: 'mariah-lorenzen',
          source: '/advisors/mariah-lorenzen/kai-zen',
          status: 'new'
        }]);

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'Kai-Zen Inquiry (Mariah Lorenzen)',
          formData: {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`,
            advisor: 'Mariah Lorenzen',
            source: '/advisors/mariah-lorenzen/kai-zen'
          },
          additionalRecipients: ['mariah@tfainsuranceadvisors.com']
        }
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
      }

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
