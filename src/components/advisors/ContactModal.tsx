import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  advisorName: string;
  advisorEmail?: string;
  advisorImage?: string;
  advisorSlug?: string;
}

const ContactModal = ({ 
  open, 
  onOpenChange, 
  advisorName, 
  advisorEmail,
  advisorImage,
  advisorSlug,
}: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Silent rejection for bots
    if (isBot()) {
      toast({
        title: "Message Sent",
        description: `${advisorName} will be in touch soon.`,
      });
      onOpenChange(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const notes = [
        `Advisor: ${advisorName}`,
        formData.message ? `Message: ${formData.message}` : null,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Advisor Contact",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        notes,
        tags: ["Advisor Inquiry", advisorName],
        advisor_slug: advisorSlug,
        advisor_email: advisorEmail,
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);

      // If this is Vanessa's contact form, also submit to her Pipedrive
      if (advisorSlug === "vanessa-sanchez" || 
          advisorEmail === "vsanchez@tfainsuranceadvisors.com") {
        try {
          const { supabase } = await import("@/integrations/supabase/client");
          await supabase.functions.invoke("vanessa-pipedrive-submit", {
            body: {
              submission_type: "contact",
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              notes: formData.message,
              tags: ["Advisor Inquiry"],
              source_url: window.location.href,
            },
          });
          console.log("Successfully submitted to Vanessa's Pipedrive as Lead");
        } catch (pipedriveError) {
          console.error("Pipedrive submission error (non-blocking):", pipedriveError);
        }
      }

      toast({
        title: "Message Sent!",
        description: `${advisorName} has been notified and will reach out soon.`,
      });

      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contact request:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const advisorFirstName = advisorName.split(" ")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-3">
          {advisorImage && (
            <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-2 border-accent/30">
              <img 
                src={advisorImage} 
                alt={advisorName}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
          <DialogTitle className="text-xl">
            Contact {advisorFirstName}
          </DialogTitle>
          <DialogDescription>
            Send a message to {advisorFirstName} and they'll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Honeypot field - hidden from humans */}
          <input
            type="text"
            name="website"
            className={honeypotClassName}
            {...honeypotProps}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="contact-firstName">First Name</Label>
              <Input
                id="contact-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-lastName">Last Name</Label>
              <Input
                id="contact-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="How can I help you?"
              rows={4}
              className="resize-none"
            />
          </div>

          <Button
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neuro-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your message will be sent directly to {advisorFirstName}.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;