import { useState, useEffect } from "react";
import { generateUUID } from "@/lib/uuid";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { Loader2, Send, Building2, Calendar, Sparkles, CreditCard } from "lucide-react";
import { useSponsorshipEvents, useSponsorshipTiers } from "@/hooks/useSponsorshipData";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select an industry"),
  eventsInterested: z.array(z.string()).min(1, "Please select at least one event"),
  preferredPackage: z.string().min(1, "Please select a package"),
  message: z.string().optional(),
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

interface GeneralSponsorshipFormProps {
  preselectedEvents?: string[];
  preselectedPackage?: string;
}

export const GeneralSponsorshipForm = ({ 
  preselectedEvents = [], 
  preselectedPackage 
}: GeneralSponsorshipFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(preselectedEvents);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const { honeypotProps, isBot } = useHoneypot();

  const { data: events = [] } = useSponsorshipEvents();
  const { data: tiers = [] } = useSponsorshipTiers();

  const packageLabels: Record<string, string> = {};
  tiers.forEach(t => {
    packageLabels[t.tier_id] = `${t.name} — $${t.price.toLocaleString()}/event`;
  });
  packageLabels['undecided'] = "Not sure yet — Help me decide";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventsInterested: preselectedEvents,
      preferredPackage: preselectedPackage || 'undecided',
    },
  });

  const watchedPackage = watch('preferredPackage');

  useEffect(() => {
    if (preselectedEvents.length > 0) {
      setSelectedEvents(preselectedEvents);
      setValue('eventsInterested', preselectedEvents);
    }
  }, [preselectedEvents, setValue]);

  useEffect(() => {
    if (preselectedPackage) {
      setValue('preferredPackage', preselectedPackage);
    }
  }, [preselectedPackage, setValue]);

  const handleEventToggle = (eventSlug: string) => {
    const updated = selectedEvents.includes(eventSlug)
      ? selectedEvents.filter(e => e !== eventSlug)
      : [...selectedEvents, eventSlug];
    setSelectedEvents(updated);
    setValue('eventsInterested', updated);
  };

  const handleProceedToPayment = async () => {
    if (!submittedLeadId || watchedPackage === 'undecided') return;
    setIsRedirecting(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-sponsorship-checkout', {
        body: {
          tierId: watchedPackage,
          email: watch('email'),
          companyName: watch('companyName'),
          leadId: submittedLeadId,
        }
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Could not start checkout. Please try again.");
    } finally {
      setIsRedirecting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      toast.success("Thank you! We'll be in touch soon.");
      return;
    }

    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);

      const leadId = generateUUID();
      const { error } = await supabase.from('sponsorship_leads').insert({
        id: leadId,
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        sponsorship_package: data.preferredPackage,
        notes: `Events interested: ${data.eventsInterested.join(', ')}. ${data.message || ''}`,
        source_url: window.location.href,
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        status: 'pending',
      });

      if (error) throw error;

      supabase.functions.invoke('send-sponsorship-notification', {
        body: {
          companyName: data.companyName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          sponsorshipPackage: data.preferredPackage,
          industry: data.industry,
          eventsInterested: data.eventsInterested,
          message: data.message,
          isGeneralInquiry: true,
        }
      }).catch((emailError) => {
        console.error('Email notification failed:', emailError);
      });

      if (data.preferredPackage !== 'undecided') {
        setSubmittedLeadId(leadId);
        toast.success("Inquiry submitted! You can now proceed to payment or we'll follow up within 24 hours.");
      } else {
        const params = new URLSearchParams({
          company: data.companyName,
          events: data.eventsInterested.join(','),
          package: data.preferredPackage
        });
        navigate(`/events/sponsorship/success?${params.toString()}`);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Reserve Your Spot
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Inquire About Sponsorship
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our team will reach out to discuss the best sponsorship options for you.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="text"
              name="website_url"
              className={honeypotClassName}
              {...honeypotProps}
            />

            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Company Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" {...register("companyName")} className="mt-1" placeholder="Your Company" />
                    {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input id="contactName" {...register("contactName")} className="mt-1" placeholder="Full Name" />
                    {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1" placeholder="you@company.com" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" {...register("phone")} className="mt-1" placeholder="(555) 123-4567" />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
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
                  {errors.industry && <p className="text-sm text-destructive mt-1">{errors.industry.message}</p>}
                </div>
              </div>

              <div className="border-t border-border my-8" />

              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Events of Interest
                </h3>

                <p className="text-sm text-muted-foreground">Select one or more events you'd like to sponsor:</p>

                {events.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Loading events...</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {events.map((event) => (
                    <label
                      key={event.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedEvents.includes(event.slug)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox
                        checked={selectedEvents.includes(event.slug)}
                        onCheckedChange={() => handleEventToggle(event.slug)}
                      />
                      <div className="flex-1">
                        <span className="font-medium text-foreground">{event.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({event.timing})</span>
                      </div>
                      {event.status === 'selling-fast' && (
                        <Badge variant="destructive" className="text-xs">Hot</Badge>
                      )}
                    </label>
                  ))}
                </div>
                )}
                {errors.eventsInterested && <p className="text-sm text-destructive">{errors.eventsInterested.message}</p>}
              </div>

              <div className="border-t border-border my-8" />

              <div className="space-y-4">
                <Label htmlFor="preferredPackage">Preferred Package</Label>
                {tiers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Loading packages...</p>
                ) : (
                <Select 
                  value={watchedPackage}
                  onValueChange={(value) => setValue('preferredPackage', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(packageLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                )}
              </div>

              <div className="mt-6">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className="mt-1 min-h-[100px]"
                  placeholder="Tell us about your goals for sponsorship, questions you have, or any specific requests..."
                />
              </div>

              <div className="mt-8 space-y-4">
                {!submittedLeadId ? (
                  <>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="w-5 h-5 mr-2" /> Submit Inquiry</>
                      )}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Our team will contact you within 24 hours to discuss your options.
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-accent/50 border border-primary/20 rounded-xl p-4 text-center">
                      <p className="text-foreground font-medium">✅ Inquiry submitted successfully!</p>
                      <p className="text-sm text-muted-foreground mt-1">We'll follow up within 24 hours.</p>
                    </div>
                    
                    {watchedPackage !== 'undecided' && (
                      <Button
                        type="button"
                        onClick={handleProceedToPayment}
                        disabled={isRedirecting}
                        className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
                        {isRedirecting ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Redirecting to checkout...</>
                        ) : (
                          <><CreditCard className="w-5 h-5 mr-2" /> Proceed to Payment</>
                        )}
                      </Button>
                    )}
                    
                    <p className="text-center text-sm text-muted-foreground">
                      You can also pay later — our team will send you a payment link via email.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
