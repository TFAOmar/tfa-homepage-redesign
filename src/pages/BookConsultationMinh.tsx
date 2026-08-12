import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckCircle, Clock, Shield, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/seo";
import { submitForm } from "@/lib/formSubmit";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import LandingHeader from "@/components/LandingHeader";

const PARTNER_SLUG = "minh";
const PARTNER_DISPLAY = "Minh";

const interestOptions = [
  { value: "mortgage-protection", label: "Mortgage Protection" },
  { value: "life-insurance", label: "Life Insurance" },
  { value: "living-trust", label: "Living Trust / Estate Planning" },
  { value: "retirement", label: "Retirement Planning" },
  { value: "investment", label: "Investment Management" },
  { value: "tax", label: "Tax Strategy" },
];

const interestLabels: Record<string, string> = Object.fromEntries(
  interestOptions.map((o) => [o.value, o.label])
);

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  interestCategories: z.array(z.string()).min(1, "Please select at least one interest"),
});

type FormData = z.infer<typeof schema>;

const BookConsultationMinh = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, honeypotValue, isBot } = useHoneypot();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interestCategories: [] },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      navigate("/thank-you");
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedInterests = data.interestCategories
        .map((k) => interestLabels[k] || k)
        .join(", ");
      const interestTags = data.interestCategories.map((k) => interestLabels[k] || k);

      const result = await submitForm({
        form_name: "Book Consultation — Minh",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes: `Interests: ${selectedInterests}\nSource: book-consultation-minh\nReferral partner: ${PARTNER_DISPLAY}`,
        tags: [...interestTags, "Consultation Request", "Minh Referral"],
        honeypot: honeypotValue,
        interest_category: data.interestCategories.join(","),
        partner_slug: PARTNER_SLUG,
        utm_source: "minh",
        utm_medium: "referral",
        utm_campaign: "book-minh",
      });

      if (!result.ok) throw new Error(result.error);

      navigate("/thank-you");
    } catch (err) {
      console.error("Form submission error:", err);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Book Your Consultation"
        description="Schedule your complimentary 30-minute financial consultation. Referred through Minh at The Financial Architects."
        noIndex
      />
      <LandingHeader ctaLabel="Call (888) 350-5396" ctaHref="tel:+18883505396" ctaExternal />
      <div className="min-h-screen bg-background">
        <section className="relative py-12 md:py-20 bg-gradient-to-br from-[hsl(var(--navy))] via-[hsl(215,40%,18%)] to-[hsl(215,45%,12%)] overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#E4B548]" />
                <span className="text-sm text-white/90">Referred through {PARTNER_DISPLAY}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Book Your Consultation
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                A no-pressure 30-minute conversation to talk through mortgage protection, life insurance, trusts, and retirement.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-white/60 text-sm">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 30 Minutes</span>
                <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> 100% Confidential</span>
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> No Obligation</span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="bg-white rounded-xl m-4">
                    <div className="p-6 sm:p-8 text-center">
                      <Calendar className="h-14 w-14 text-[#E4B548] mx-auto mb-6" />
                      <h2 className="text-2xl font-bold text-[hsl(var(--navy))] mb-3">
                        Tell us how to reach you
                      </h2>
                      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        We'll follow up within one business day to lock in a time that works for you.
                      </p>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                        <div className={honeypotClassName}>
                          <label htmlFor="website_url">Website</label>
                          <input type="text" id="website_url" name="website_url" {...honeypotProps} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              placeholder="First Name"
                              {...register("firstName")}
                              className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1 text-left">{errors.firstName.message}</p>}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Last Name"
                              {...register("lastName")}
                              className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1 text-left">{errors.lastName.message}</p>}
                          </div>
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>}
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1 text-left">{errors.phone.message}</p>}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground text-left mb-3">What would you like to talk about?</p>
                          <Controller
                            name="interestCategories"
                            control={control}
                            render={({ field }) => (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {interestOptions.map((option) => {
                                  const isSelected = field.value.includes(option.value);
                                  return (
                                    <label
                                      key={option.value}
                                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                        isSelected
                                          ? "border-[#E4B548] bg-[#E4B548]/10"
                                          : "border-border hover:border-[#E4B548]/50 hover:bg-secondary/50"
                                      }`}
                                    >
                                      <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={(checked) => {
                                          if (checked) field.onChange([...field.value, option.value]);
                                          else field.onChange(field.value.filter((v) => v !== option.value));
                                        }}
                                        className="data-[state=checked]:bg-[#E4B548] data-[state=checked]:border-[#E4B548]"
                                      />
                                      <span className={`text-sm text-left ${isSelected ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                        {option.label}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                          />
                          {errors.interestCategories && <p className="text-red-500 text-sm mt-2 text-left">{errors.interestCategories.message}</p>}
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary-cta px-8 py-6 text-lg hover:scale-105 w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Request My Consultation
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          By submitting, you agree to be contacted by The Financial Architects about your inquiry.
                        </p>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookConsultationMinh;