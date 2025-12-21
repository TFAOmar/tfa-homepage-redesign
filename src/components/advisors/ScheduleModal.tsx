import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  advisorName: string;
  advisorEmail?: string;
  advisorImage?: string;
  schedulingLink?: string;
  advisorSlug?: string;
}

const ScheduleModal = ({ 
  open, 
  onOpenChange, 
  advisorName, 
  advisorEmail,
  advisorImage,
  schedulingLink,
  advisorSlug,
}: ScheduleModalProps) => {
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
        title: "Request Submitted",
        description: `${advisorName} will be in touch soon.`,
      });
      onOpenChange(false);
      if (schedulingLink) {
        window.open(schedulingLink, "_blank");
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const notes = [
        `Advisor: ${advisorName}`,
        `Has Scheduling Link: ${schedulingLink ? "Yes" : "No"}`,
        formData.message ? `Message: ${formData.message}` : null,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Schedule Request",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        notes,
        tags: ["Schedule Request", advisorName],
        advisor_slug: advisorSlug,
        advisor_email: advisorEmail,
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);

      toast({
        title: "Request Submitted!",
        description: `${advisorName} has been notified and will reach out soon.`,
      });

      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      onOpenChange(false);

      // Open scheduling link if available
      if (schedulingLink) {
        window.open(schedulingLink, "_blank");
      }
    } catch (error) {
      console.error("Error submitting schedule request:", error);
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
            Schedule with {advisorFirstName}
          </DialogTitle>
          <DialogDescription>
            Share your contact info so {advisorFirstName} can prepare for your meeting.
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
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              What would you like to discuss? <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="E.g., retirement planning, life insurance, estate planning..."
              rows={3}
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
                Submitting...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Continue to Scheduling
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your information will be shared with {advisorFirstName} to help prepare for your consultation.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;