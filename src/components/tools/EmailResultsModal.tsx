import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required").max(50),
});

interface EmailResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calculatorName: string;
  onSendEmail: (email: string, firstName: string) => Promise<void>;
  isLoading: boolean;
}

export default function EmailResultsModal({
  open,
  onOpenChange,
  calculatorName,
  onSendEmail,
  isLoading,
}: EmailResultsModalProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; firstName?: string }>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = emailSchema.safeParse({ email, firstName });
    if (!result.success) {
      const fieldErrors: { email?: string; firstName?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "firstName") fieldErrors.firstName = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await onSendEmail(email, firstName);
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        setEmail("");
        setFirstName("");
      }, 2000);
    } catch {
      setErrors({ email: "Failed to send email. Please try again." });
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
      setSuccess(false);
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Mail className="h-5 w-5 text-primary" />
            Email Your Results
          </DialogTitle>
          <DialogDescription>
            We'll send your {calculatorName} results as a branded PDF to your inbox.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-foreground">Email Sent!</p>
            <p className="text-sm text-muted-foreground">Check your inbox shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="bg-background border-border text-foreground"
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="bg-background border-border text-foreground"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p>
                Your PDF will include your calculator inputs, results, and TFA contact information.
                We respect your privacy and won't share your email.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send PDF
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
