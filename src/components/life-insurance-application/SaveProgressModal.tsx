import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SaveProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draftId: string | null;
  resumeToken: string | null;
  currentEmail?: string;
}

const SaveProgressModal = ({
  open,
  onOpenChange,
  draftId,
  resumeToken,
  currentEmail,
}: SaveProgressModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState(currentEmail || "");
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const resumeUrl = resumeToken
    ? `${window.location.origin}${window.location.pathname}?resume=${resumeToken}`
    : null;

  const handleSendEmail = async () => {
    if (!email || !draftId || !resumeToken) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      // Update the resume_email in the database
      const { error: updateError } = await supabase
        .from("life_insurance_applications")
        .update({ resume_email: email })
        .eq("id", draftId);

      if (updateError) throw updateError;

      // Send the email via edge function
      const { error: emailError } = await supabase.functions.invoke(
        "send-application-resume-link",
        {
          body: {
            email,
            resumeUrl,
            resumeToken,
          },
        }
      );

      if (emailError) throw emailError;

      setEmailSent(true);
      toast({
        title: "Email Sent!",
        description: "Check your inbox for a link to resume your application.",
      });
    } catch (error) {
      console.error("Error sending resume email:", error);
      toast({
        title: "Failed to Send Email",
        description: "Please try again or copy the link below.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyLink = async () => {
    if (resumeUrl) {
      await navigator.clipboard.writeText(resumeUrl);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Paste this link anywhere to resume your application.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setEmailSent(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Your Progress</DialogTitle>
          <DialogDescription>
            Your application has been saved. Get a link to continue later from
            any device.
          </DialogDescription>
        </DialogHeader>

        {emailSent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Sent!</h3>
            <p className="text-muted-foreground text-sm">
              We've sent a resume link to <strong>{email}</strong>. Check your
              inbox to continue your application later.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendEmail}
                  disabled={isSending || !email}
                  className="gap-2"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  Send Link
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send you a secure link to resume your application.
              </p>
            </div>

            {resumeUrl && (
              <div className="space-y-2 pt-4 border-t">
                <Label>Or copy your resume link</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={resumeUrl}
                    className="flex-1 text-xs bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {emailSent ? "Done" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveProgressModal;
