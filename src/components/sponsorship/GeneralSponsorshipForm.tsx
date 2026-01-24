import { useState, useEffect } from "react";
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
import { Loader2, Send, Building2, Calendar, Sparkles } from "lucide-react";
import { events } from "./EventsShowcase";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select an industry"),
  eventsInterested: z.array(z.string()).min(1, "Please select at least one event"),
  preferredPackage: z.enum(['title', 'supporting', 'community', 'undecided']),
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

const packageLabels: Record<string, string> = {
  title: "Title Sponsor — $4,000/event",
  supporting: "Supporting Sponsor — $2,000/event",
  community: "Community Sponsor — $500/event",
  undecided: "Not sure yet — Help me decide"
};

interface GeneralSponsorshipFormProps {
  preselectedEvents?: string[];
  preselectedPackage?: string;
}

export const GeneralSponsorshipForm = ({ 
  preselectedEvents = [], 
  preselectedPackage 
}: GeneralSponsorshipFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(preselectedEvents);
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
      eventsInterested: preselectedEvents,
      preferredPackage: (preselectedPackage as FormData['preferredPackage']) || 'undecided',
    },
  });

  useEffect(() => {
    if (preselectedEvents.length > 0) {
      setSelectedEvents(preselectedEvents);
      setValue('eventsInterested', preselectedEvents);
    }
  }, [preselectedEvents, setValue]);

  useEffect(() => {
    if (preselectedPackage) {
      setValue('preferredPackage', preselectedPackage as FormData['preferredPackage']);
    }
  }, [preselectedPackage, setValue]);

  const handleEventToggle = (eventId: string) => {
    const updated = selectedEvents.includes(eventId)
      ? selectedEvents.filter(e => e !== eventId)
      : [...selectedEvents, eventId];
    setSelectedEvents(updated);
    setValue('eventsInterested', updated);
  };

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      toast.success("Thank you! We'll be in touch soon.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get UTM params
      const urlParams = new URLSearchParams(window.location.search);

      // Save to database
      const { error } = await supabase.from('sponsorship_leads').insert({
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

      // Send notification email
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

      toast.success("Thank you for your interest! Our team will contact you within 24 hours.");
      
      // Reset form
      setSelectedEvents([]);
      setValue('eventsInterested', []);

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
          {/* Section header */}
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

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot */}
            <input
              type="text"
              name="website_url"
              className={honeypotClassName}
              {...honeypotProps}
            />

            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              {/* Company Info */}
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
              </div>

              {/* Divider */}
              <div className="border-t border-border my-8" />

              {/* Events Selection */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Events of Interest
                </h3>

                <p className="text-sm text-muted-foreground">
                  Select one or more events you'd like to sponsor:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {events.map((event) => (
                    <label
                      key={event.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedEvents.includes(event.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => handleEventToggle(event.id)}
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
                {errors.eventsInterested && (
                  <p className="text-sm text-destructive">{errors.eventsInterested.message}</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-8" />

              {/* Package Preference */}
              <div className="space-y-4">
                <Label htmlFor="preferredPackage">Preferred Package</Label>
                <Select 
                  defaultValue={preselectedPackage || 'undecided'}
                  onValueChange={(value) => setValue('preferredPackage', value as FormData['preferredPackage'])}
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
              </div>

              {/* Message */}
              <div className="mt-6">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className="mt-1 min-h-[100px]"
                  placeholder="Tell us about your goals for sponsorship, questions you have, or any specific requests..."
                />
              </div>

              {/* Submit */}
              <div className="mt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  Our team will contact you within 24 hours to discuss your options.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
