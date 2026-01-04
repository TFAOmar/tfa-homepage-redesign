import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitForm } from "@/lib/formSubmit";
import { useHoneypot } from "@/hooks/useHoneypot";

const interestOptions = [
  { id: "living-trust", label: "Living Trust / Estate Planning" },
  { id: "tax-deferred", label: "Tax-Deferred Retirement Strategies" },
  { id: "life-insurance", label: "Life Insurance for Tax-Free Income" },
  { id: "annuities", label: "Tax-Advantaged Annuities" },
  { id: "other", label: "Other Financial Planning" },
];

const RuthPachecoTaxStrategyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [] as string[],
    message: "",
  });
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(i => i !== interestId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBot()) {
      toast({
        title: "Submission blocked",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const interestLabels = formData.interests.map(id => 
        interestOptions.find(opt => opt.id === id)?.label || id
      ).join(", ");

      const result = await submitForm({
        form_name: "Tax Strategy Inquiry",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        notes: `Interests: ${interestLabels || "Not specified"}\n\nMessage: ${formData.message || "No additional message"}\n\nReferred by: Luis Pacheco, CPA (Layman's Tax & Accounting)\n\nPartner: Layman's Tax & Accounting`,
        advisor_slug: "ruth-pacheco",
        tags: ["CPA Referral", "Luis Pacheco"],
      });

      if (result.ok) {
        toast({
          title: "Thank you for your interest!",
          description: "Ruth will be in touch with you shortly.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interests: [],
          message: "",
        });
      } else {
        throw new Error(result.error || "Failed to submit");
      }
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

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-primary">
          Request Your Free Consultation
        </CardTitle>
        <p className="text-muted-foreground">
          Luis has referred you to Ruth for personalized financial guidance.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field */}
          <input {...honeypotProps} />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Your first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Your last name"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>I'm interested in: (select all that apply)</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {interestOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={formData.interests.includes(option.id)}
                    onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                  />
                  <Label 
                    htmlFor={option.id} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Questions (optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your financial goals or any specific questions..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Request Consultation
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to be contacted about financial planning services.
            Your information is confidential and will never be shared.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default RuthPachecoTaxStrategyForm;
