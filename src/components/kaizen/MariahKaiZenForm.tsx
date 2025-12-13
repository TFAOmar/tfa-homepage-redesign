import { useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";

const MariahKaiZenForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
        .insert({
          form_type: 'kai-zen-inquiry',
          form_data: formData,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          advisor: 'mariah-lorenzen',
          source: '/advisors/mariah-lorenzen/kai-zen',
          status: 'new'
        });

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
          }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="bg-white/10 border-white/20 focus:border-accent text-foreground"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="bg-white/10 border-white/20 focus:border-accent text-foreground"
            placeholder="Smith"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 focus:border-accent text-foreground"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 focus:border-accent text-foreground"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground">Your Age Range *</Label>
          <Select
            value={formData.ageRange}
            onValueChange={(value) => handleSelectChange("ageRange", value)}
            required
          >
            <SelectTrigger className="bg-white/10 border-white/20 focus:border-accent text-foreground">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25-35">25-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="56-60">56-60</SelectItem>
              <SelectItem value="60+">60+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Household Income *</Label>
          <Select
            value={formData.householdIncome}
            onValueChange={(value) => handleSelectChange("householdIncome", value)}
            required
          >
            <SelectTrigger className="bg-white/10 border-white/20 focus:border-accent text-foreground">
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
              <SelectItem value="150k-250k">$150,000 - $250,000</SelectItem>
              <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
              <SelectItem value="500k+">$500,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-full shadow-[0_0_30px_rgba(228,181,72,0.4)] hover:shadow-[0_0_40px_rgba(228,181,72,0.6)] transition-all duration-300"
      >
        {isSubmitting ? "Submitting..." : "See If You Qualify"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to be contacted by Mariah Lorenzen regarding Kai-Zen and related financial strategies.
      </p>
    </form>
  );
};

export default MariahKaiZenForm;
