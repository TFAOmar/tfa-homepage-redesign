import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { Loader2, Send } from "lucide-react";

const KaiZenForm = () => {
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    householdIncome: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBot()) {
      toast({
        title: "Request received",
        description: "We'll be in touch soon.",
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
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          source: '/services/kai-zen',
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'Kai-Zen Strategy Inquiry',
          formData: {
            Name: `${formData.firstName} ${formData.lastName}`,
            Email: formData.email,
            Phone: formData.phone,
            Age: formData.age,
            'Household Income': formData.householdIncome,
          },
        },
      });

      if (emailError) console.error('Email notification error:', emailError);

      toast({
        title: "Thank you for your interest!",
        description: "A Kai-Zen specialist will contact you within 24 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
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
      <input {...honeypotProps} className={honeypotClassName} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/90">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/90">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/90">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/90">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-white/90">Your Age *</Label>
          <Select onValueChange={(value) => handleSelectChange("age", value)} value={formData.age}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="18-24" className="text-white hover:bg-white/10 focus:bg-white/10">18-24</SelectItem>
              <SelectItem value="25-34" className="text-white hover:bg-white/10 focus:bg-white/10">25-34</SelectItem>
              <SelectItem value="35-44" className="text-white hover:bg-white/10 focus:bg-white/10">35-44</SelectItem>
              <SelectItem value="45-54" className="text-white hover:bg-white/10 focus:bg-white/10">45-54</SelectItem>
              <SelectItem value="55-60" className="text-white hover:bg-white/10 focus:bg-white/10">55-60</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="householdIncome" className="text-white/90">Household Income *</Label>
          <Select onValueChange={(value) => handleSelectChange("householdIncome", value)} value={formData.householdIncome}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="100k-150k" className="text-white hover:bg-white/10 focus:bg-white/10">$100,000 - $150,000</SelectItem>
              <SelectItem value="150k-250k" className="text-white hover:bg-white/10 focus:bg-white/10">$150,000 - $250,000</SelectItem>
              <SelectItem value="250k-500k" className="text-white hover:bg-white/10 focus:bg-white/10">$250,000 - $500,000</SelectItem>
              <SelectItem value="500k+" className="text-white hover:bg-white/10 focus:bg-white/10">$500,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-full shadow-[0_0_20px_rgba(228,181,72,0.3)] hover:shadow-[0_0_30px_rgba(228,181,72,0.5)] transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Get Your Free Kai-Zen Analysis
          </>
        )}
      </Button>

      <p className="text-xs text-white/60 text-center">
        By submitting this form, you agree to be contacted by a licensed professional regarding Kai-Zen eligibility.
      </p>
    </form>
  );
};

export default KaiZenForm;
