import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { Loader2, Upload, Building2, CreditCard } from "lucide-react";
import { type SponsorshipPackage } from "./SponsorshipPackages";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  websiteSocial: z.string().optional(),
  sponsorshipPackage: z.enum(['title', 'supporting', 'community']),
  industry: z.string().min(1, "Please select an industry"),
  promotionDetails: z.string().optional(),
  needsPowerInternet: z.enum(['yes', 'no']),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const industries = [
  "Insurance",
  "Lending/Mortgage",
  "Real Estate",
  "Tax/Accounting",
  "Legal/Trusts",
  "Marketing/Tech",
  "Other"
];

const packageLabels: Record<SponsorshipPackage, string> = {
  title: "Title Sponsor — $4,000",
  supporting: "Supporting Sponsor — $2,000",
  community: "Community Sponsor — $500"
};

const packagePrices: Record<SponsorshipPackage, number> = {
  title: 4000,
  supporting: 2000,
  community: 500
};

interface SponsorApplicationFormProps {
  selectedPackage: SponsorshipPackage | null;
  onPackageChange: (pkg: SponsorshipPackage) => void;
}

export const SponsorApplicationForm = ({ selectedPackage, onPackageChange }: SponsorApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { honeypotProps, isBot } = useHoneypot();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsorshipPackage: selectedPackage || 'supporting',
      needsPowerInternet: 'no',
    },
  });

  const currentPackage = watch('sponsorshipPackage') as SponsorshipPackage;

  useEffect(() => {
    if (selectedPackage) {
      setValue('sponsorshipPackage', selectedPackage);
    }
  }, [selectedPackage, setValue]);

  const uploadLogo = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('sponsor-logos')
      .upload(fileName, file);

    if (error) {
      console.error('Logo upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('sponsor-logos')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      // Silently accept but don't process - redirect anyway to avoid detection
      window.location.href = '/events/tfa-2026-kickoff-sponsorship/success';
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'sponsorship_form_submit',
          sponsorship_package: data.sponsorshipPackage,
        });
      }

      let logoUrl: string | null = null;
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }

      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Save lead to database first (don't select back due to RLS policy)
      const { error } = await supabase.from('sponsorship_leads').insert({
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        website_social: data.websiteSocial || null,
        sponsorship_package: data.sponsorshipPackage,
        industry: data.industry,
        promotion_details: data.promotionDetails || null,
        needs_power_internet: data.needsPowerInternet === 'yes',
        logo_url: logoUrl,
        notes: data.notes || null,
        source_url: window.location.href,
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        status: 'pending',
      });

      if (error) throw error;

      // Try to send notification email (don't wait for it)
      supabase.functions.invoke('send-sponsorship-notification', {
        body: {
          companyName: data.companyName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          sponsorshipPackage: data.sponsorshipPackage,
          industry: data.industry,
        }
      }).catch((emailError) => {
        console.error('Email notification failed:', emailError);
      });

      // Create Stripe checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-sponsorship-checkout', {
        body: {
          sponsorshipPackage: data.sponsorshipPackage,
          email: data.email,
          companyName: data.companyName,
        }
      });

      if (checkoutError) throw checkoutError;

      if (checkoutData?.url) {
        // Open Stripe Checkout in new tab
        const checkoutWindow = window.open(checkoutData.url, '_blank');
        
        if (checkoutWindow) {
          toast.success("Checkout opened in a new tab. Complete your payment there.");
        } else {
          // Popup was blocked, fallback to redirect
          toast.info("Opening checkout page...");
          window.location.href = checkoutData.url;
        }
        setIsSubmitting(false);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Failed to proceed to payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply to Sponsor
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete the form below and our team will reach out to finalize your sponsorship.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field */}
            <input
              type="text"
              name="website_url"
              className={honeypotClassName}
              {...honeypotProps}
            />

            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              {/* Company & Contact Info */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Company Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      {...register("companyName")}
                      className="mt-1"
                      placeholder="Your Company"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      {...register("contactName")}
                      className="mt-1"
                      placeholder="John Smith"
                    />
                    {errors.contactName && (
                      <p className="text-sm text-destructive mt-1">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="mt-1"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="websiteSocial">Website / Social Link</Label>
                  <Input
                    id="websiteSocial"
                    {...register("websiteSocial")}
                    className="mt-1"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-8" />

              {/* Sponsorship Details */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground">Sponsorship Details</h3>

                <div>
                  <Label htmlFor="sponsorshipPackage">Sponsorship Package *</Label>
                  <Select 
                    value={currentPackage} 
                    onValueChange={(value) => {
                      setValue('sponsorshipPackage', value as SponsorshipPackage);
                      onPackageChange(value as SponsorshipPackage);
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">{packageLabels.title}</SelectItem>
                      <SelectItem value="supporting">{packageLabels.supporting}</SelectItem>
                      <SelectItem value="community">{packageLabels.community}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select onValueChange={(value) => setValue('industry', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-destructive mt-1">{errors.industry.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="promotionDetails">What do you want to promote?</Label>
                  <Textarea
                    id="promotionDetails"
                    {...register("promotionDetails")}
                    className="mt-1 min-h-[100px]"
                    placeholder="Tell us about your products, services, or message you'd like to share with the TFA community..."
                  />
                </div>

                <div>
                  <Label>Do you need power/internet at your booth? *</Label>
                  <RadioGroup 
                    defaultValue="no" 
                    onValueChange={(value) => setValue('needsPowerInternet', value as 'yes' | 'no')}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="power-yes" />
                      <Label htmlFor="power-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="power-no" />
                      <Label htmlFor="power-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="logo">Upload Logo</Label>
                  <div className="mt-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {logoFile ? logoFile.name : "Click to upload your logo"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG up to 5MB</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setLogoFile(file);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    className="mt-1"
                    placeholder="Any other information you'd like to share..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Continue to Payment — ${packagePrices[currentPackage].toLocaleString()}
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  You'll be redirected to Stripe to complete your secure payment
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile sticky summary bar */}
      {currentPackage && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-border p-4 shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Selected Package</p>
              <p className="font-semibold text-foreground">{packageLabels[currentPackage]}</p>
            </div>
            <div className="text-2xl font-bold text-primary">
              ${packagePrices[currentPackage].toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
