import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";
import { SEOHead } from "@/components/seo";

const INTERESTS = [
  { id: "trust", label: "Trust / Estate Planning" },
  { id: "mortgage", label: "Mortgage Protection" },
  { id: "retirement", label: "Retirement Planning" },
];

const schema = z.object({
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  zip: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
});

type FormData = z.infer<typeof schema>;

const HomeownerProtection = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hidden, setHidden] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    referral_partner: "",
    lead_source: "",
  });
  const { toast } = useToast();
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interests: [] },
  });

  const interests = watch("interests");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHidden({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      referral_partner: params.get("referral_partner") || "",
      lead_source: params.get("lead_source") || "",
    });
  }, []);

  const toggle = (id: string) => {
    const current = interests || [];
    setValue(
      "interests",
      current.includes(id) ? current.filter((i) => i !== id) : [...current, id],
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    try {
      const interestLabels = data.interests.map(
        (id) => INTERESTS.find((i) => i.id === id)?.label || id
      );
      const parts = data.fullName.trim().split(/\s+/);
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";

      const notes = [
        `Interests: ${interestLabels.join(", ")}`,
        `ZIP: ${data.zip}`,
        hidden.referral_partner ? `Referral Partner: ${hidden.referral_partner}` : null,
        hidden.lead_source ? `Lead Source: ${hidden.lead_source}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const response = await submitForm({
        form_name: "Homeowner Protection Squeeze",
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone,
        notes,
        advisor_slug: "mariah-lorenzen",
        advisor_email: "mariah@tfainsuranceadvisors.com",
        tags: ["Homeowner Protection", ...interestLabels],
        interest_category: interestLabels.join(", "),
        utm_source: hidden.utm_source || undefined,
        utm_medium: hidden.utm_medium || undefined,
        utm_campaign: hidden.utm_campaign || undefined,
        utm_content: hidden.utm_content || undefined,
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);

      setSubmitted(true);
    } catch (err) {
      console.error("Homeowner Protection submit error:", err);
      toast({
        title: "Submission Error",
        description: "Please try again or call (888) 350-5396.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Protect What You've Worked Hard to Build | The Financial Architects"
        description="Request a free consultation with a licensed TFA advisor. Trust, mortgage protection, and retirement planning for homeowners."
        noIndex
      />
      <div className="min-h-screen bg-[#030406] text-white flex flex-col">
        {/* Header */}
        <header className="py-6 px-4 border-b border-white/10">
          <div className="max-w-md mx-auto flex justify-center">
            <Link to="/">
              <img
                src="/images/tfa-stacked-logo.png"
                alt="The Financial Architects"
                className="h-14 w-auto"
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:py-12">
          <div className="max-w-md mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
                style={{ color: "#C9A84C" }}
              >
                Protect What You've Worked Hard to Build
              </h1>
              <p className="text-white/80 text-base sm:text-lg">
                Tell us what matters most to your family — takes under 30 seconds.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(201, 168, 76, 0.15)" }}
                >
                  <CheckCircle2 className="h-8 w-8" style={{ color: "#C9A84C" }} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Thank you!</h2>
                <p className="text-white/80">
                  A licensed TFA advisor will reach out within 24 hours based on your
                  interests.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5"
              >
                <input {...honeypotProps} />

                {/* Interests */}
                <div className="space-y-3">
                  <Label className="text-white text-base font-medium">
                    What are you interested in?
                  </Label>
                  <div className="space-y-2">
                    {INTERESTS.map((opt) => {
                      const active = interests?.includes(opt.id);
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => toggle(opt.id)}
                          className={`w-full min-h-[56px] flex items-center gap-3 px-4 rounded-xl border text-left transition-colors ${
                            active
                              ? "border-transparent"
                              : "border-white/20 hover:border-white/40"
                          }`}
                          style={
                            active
                              ? {
                                  backgroundColor: "rgba(201, 168, 76, 0.15)",
                                  borderColor: "#C9A84C",
                                }
                              : { backgroundColor: "rgba(255,255,255,0.03)" }
                          }
                        >
                          <Checkbox
                            checked={active}
                            className="border-white/40 data-[state=checked]:border-transparent"
                            style={
                              active
                                ? { backgroundColor: "#C9A84C", borderColor: "#C9A84C" }
                                : undefined
                            }
                          />
                          <span className="text-white text-base">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && (
                    <p className="text-red-400 text-sm">{errors.interests.message}</p>
                  )}
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/90">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    autoComplete="name"
                    placeholder="Your full name"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    placeholder="(555) 555-5555"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    {...register("email")}
                    placeholder="you@email.com"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* ZIP */}
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-white/90">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    {...register("zip")}
                    placeholder="12345"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.zip && (
                    <p className="text-red-400 text-sm">{errors.zip.message}</p>
                  )}
                </div>

                <p className="text-white/60 text-xs leading-relaxed">
                  By submitting, you agree to be contacted by The Financial Architects
                  regarding your selected interests. No obligation.
                </p>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-14 text-base font-semibold rounded-full text-[#1E3A5F] hover:opacity-90"
                  style={{ backgroundColor: "#C9A84C" }}
                >
                  {submitting ? "Submitting..." : "Request My Free Consultation"}
                </Button>

                <p className="text-center text-white/50 text-xs">
                  Licensed professionals. Your information is never sold.
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeownerProtection;