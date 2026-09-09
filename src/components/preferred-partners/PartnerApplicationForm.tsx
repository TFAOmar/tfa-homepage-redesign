import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import SmsConsentCheckbox, {
  SMS_CONSENT_TEXT_VERSION,
} from "@/components/forms/SmsConsentCheckbox";
import { submitForm } from "@/lib/formSubmit";
import { partnerCategories } from "./partnerCategories";
import { CheckCircle2, Loader2 } from "lucide-react";

const PartnerApplicationForm = () => {
  const { toast } = useToast();
  const { honeypotProps, isBot } = useHoneypot();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [profession, setProfession] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    areasServed: "",
    website: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBot()) return;

    if (!form.firstName || !form.lastName || !form.email || !form.phone || !profession) {
      toast({
        title: "Missing information",
        description: "Please fill in your name, email, phone, and profession.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const categoryName =
      partnerCategories.find((c) => c.id === profession)?.name || profession;

    const notes = [
      `Profession: ${categoryName}`,
      form.areasServed ? `Areas served: ${form.areasServed}` : null,
      form.website ? `Website: ${form.website}` : null,
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitForm({
      form_name: "preferred_partner_application",
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      company_name: form.company || undefined,
      notes,
      tags: ["preferred-partner", categoryName],
      interest_category: categoryName,
      sms_consent: smsConsent,
      sms_consent_text_version: smsConsent ? SMS_CONSENT_TEXT_VERSION : undefined,
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      toast({
        title: "Something went wrong",
        description: result.error || "Please try again or call (888) 350-5396.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="glass p-10 rounded-2xl text-center max-w-2xl mx-auto">
        <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Thank you — your application is in
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          A member of our partnership team will reach out within one business day to
          schedule an introduction call and walk you through how referrals work.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto space-y-6">
      <input type="text" name="company_website" className={honeypotClassName} {...honeypotProps} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="pp-first">First name *</Label>
          <Input id="pp-first" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-last">Last name *</Label>
          <Input id="pp-last" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-email">Email *</Label>
          <Input id="pp-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-phone">Phone *</Label>
          <Input id="pp-phone" type="tel" placeholder="(888) 350-5396" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-company">Company / firm</Label>
          <Input id="pp-company" value={form.company} onChange={(e) => update("company", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-profession">Profession *</Label>
          <Select value={profession} onValueChange={setProfession}>
            <SelectTrigger id="pp-profession">
              <SelectValue placeholder="Select your profession" />
            </SelectTrigger>
            <SelectContent>
              {partnerCategories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-areas">States / areas served</Label>
          <Input id="pp-areas" placeholder="e.g. Southern California, Arizona" value={form.areasServed} onChange={(e) => update("areasServed", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp-website">Website (optional)</Label>
          <Input id="pp-website" placeholder="https://" value={form.website} onChange={(e) => update("website", e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pp-message">Tell us about your business</Label>
        <Textarea
          id="pp-message"
          rows={4}
          placeholder="Who do you serve, and what kind of referral relationship are you looking for?"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <SmsConsentCheckbox checked={smsConsent} onChange={setSmsConsent} id="pp-sms-consent" />

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Partner Application"
        )}
      </Button>
    </form>
  );
};

export default PartnerApplicationForm;
