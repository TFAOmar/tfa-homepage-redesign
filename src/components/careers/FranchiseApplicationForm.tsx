import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Building2, Phone, Mail } from "lucide-react";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

const franchiseFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(50),
  currentOccupation: z.string().trim().min(1, "Current occupation is required").max(100),
  hasInsuranceLicense: z.enum(["yes", "no"], {
    required_error: "Please select your license status",
  }),
  insuranceExperience: z.enum(["none", "1-3", "3-5", "5-10", "10+"], {
    required_error: "Please select your experience level",
  }),
  leadershipExperience: z.enum(["none", "1-3", "3-5", "5-10", "10+"], {
    required_error: "Please select your leadership experience",
  }),
  liquidCapital: z.enum(["under-25k", "25k-50k", "50k-100k", "100k-250k", "250k+"], {
    required_error: "Please select your liquid capital range",
  }),
  netWorth: z.enum(["under-100k", "100k-250k", "250k-500k", "500k-1m", "1m+"], {
    required_error: "Please select your net worth range",
  }),
  preferredTerritory: z.string().trim().min(1, "Preferred territory is required").max(200),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "6-12-months", "exploring"], {
    required_error: "Please select your timeline",
  }),
  referralSource: z.string().trim().max(200).optional(),
  whyFranchise: z.string().trim().min(50, "Please provide more detail (at least 50 characters)").max(2000),
  agreeToDisclosure: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive the FDD",
  }),
});

type FranchiseFormData = z.infer<typeof franchiseFormSchema>;

const experienceLabels: Record<string, string> = {
  none: "No experience",
  "1-3": "1-3 years",
  "3-5": "3-5 years",
  "5-10": "5-10 years",
  "10+": "10+ years",
};

const capitalLabels: Record<string, string> = {
  "under-25k": "Under $25,000",
  "25k-50k": "$25,000 - $50,000",
  "50k-100k": "$50,000 - $100,000",
  "100k-250k": "$100,000 - $250,000",
  "250k+": "$250,000+",
};

const netWorthLabels: Record<string, string> = {
  "under-100k": "Under $100,000",
  "100k-250k": "$100,000 - $250,000",
  "250k-500k": "$250,000 - $500,000",
  "500k-1m": "$500,000 - $1,000,000",
  "1m+": "$1,000,000+",
};

const timelineLabels: Record<string, string> = {
  asap: "As soon as possible",
  "1-3-months": "1-3 months",
  "3-6-months": "3-6 months",
  "6-12-months": "6-12 months",
  exploring: "Just exploring options",
};

const FranchiseApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const form = useForm<FranchiseFormData>({
    resolver: zodResolver(franchiseFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      currentOccupation: "",
      hasInsuranceLicense: undefined,
      insuranceExperience: undefined,
      leadershipExperience: undefined,
      liquidCapital: undefined,
      netWorth: undefined,
      preferredTerritory: "",
      timeline: undefined,
      referralSource: "",
      whyFranchise: "",
      agreeToDisclosure: false,
    },
  });

  const onSubmit = async (data: FranchiseFormData) => {
    // Silently reject bot submissions
    if (isBot()) {
      toast({
        title: "Franchise Application Submitted!",
        description: "Thank you for your interest in owning a TFA franchise. Our franchise development team will contact you within 48 hours.",
      });
      form.reset();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const notes = [
        `Location: ${data.city}, ${data.state}`,
        `Current Occupation: ${data.currentOccupation}`,
        `Insurance License: ${data.hasInsuranceLicense === "yes" ? "Yes" : "No"}`,
        `Insurance Experience: ${experienceLabels[data.insuranceExperience]}`,
        `Leadership Experience: ${experienceLabels[data.leadershipExperience]}`,
        `Liquid Capital: ${capitalLabels[data.liquidCapital]}`,
        `Net Worth: ${netWorthLabels[data.netWorth]}`,
        `Preferred Territory: ${data.preferredTerritory}`,
        `Timeline: ${timelineLabels[data.timeline]}`,
        data.referralSource ? `Referral Source: ${data.referralSource}` : null,
        `Why Franchise: ${data.whyFranchise}`,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: "Franchise Application",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        notes,
        tags: ["Careers", "Franchise Application"],
        honeypot: honeypotValue(),
      });

      if (!response.ok) throw new Error(response.error);
      
      toast({
        title: "Franchise Application Submitted!",
        description: "Thank you for your interest in owning a TFA franchise. Our franchise development team will contact you within 48 hours.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Franchise Application</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply for a TFA Franchise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this application to start the franchise discovery process. 
              All information is kept strictly confidential.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 md:p-12 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Honeypot field - hidden from humans, traps bots */}
                <div className={honeypotClassName}>
                  <label htmlFor="franchise_business_url">Business URL</label>
                  <input
                    type="text"
                    id="franchise_business_url"
                    name="franchise_business_url"
                    {...honeypotProps}
                  />
                </div>

                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                    Personal Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Los Angeles" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="California" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="currentOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Occupation *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Business Owner, Sales Director" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                    Experience & Background
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="hasInsuranceLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Do you hold an insurance license? *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="insuranceExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Industry Experience *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">No experience</SelectItem>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="leadershipExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Leadership/Management Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No experience</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Financial Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                    Financial Qualifications
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="liquidCapital"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available Liquid Capital *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-25k">Under $25,000</SelectItem>
                                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                                <SelectItem value="250k+">$250,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Cash or assets that can be quickly converted
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="netWorth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Net Worth *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-100k">Under $100,000</SelectItem>
                                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                                <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                                <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                                <SelectItem value="1m+">$1,000,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Territory & Timeline Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                    Territory & Timeline
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="preferredTerritory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Territory/Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Southern California, Dallas/Fort Worth" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Start Timeline *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asap">As soon as possible</SelectItem>
                                <SelectItem value="1-3-months">1-3 months</SelectItem>
                                <SelectItem value="3-6-months">3-6 months</SelectItem>
                                <SelectItem value="6-12-months">6-12 months</SelectItem>
                                <SelectItem value="exploring">Just exploring options</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                    Additional Information
                  </h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="referralSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How did you hear about TFA franchise opportunities?</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Current franchisee, website, industry event" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="whyFranchise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why are you interested in a TFA franchise? *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your entrepreneurial goals, why you're interested in the insurance industry, and what makes TFA the right fit for you..."
                              className="min-h-[150px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum 50 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Agreement Checkbox */}
                    <FormField
                      control={form.control}
                      name="agreeToDisclosure"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border/50 p-4 bg-muted/30">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              I agree to receive the Franchise Disclosure Document (FDD) *
                            </FormLabel>
                            <FormDescription>
                              By checking this box, you agree to be contacted by The Financial Architects regarding franchise opportunities 
                              and to receive the FDD for review. All information is kept confidential.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto btn-primary-cta px-8 py-6 text-lg group"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Franchise Application
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Have questions about franchise opportunities?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18883505396" className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                (888) 350-5396
              </a>
              <a href="mailto:franchise@tfainsuranceadvisors.com" className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                franchise@tfainsuranceadvisors.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseApplicationForm;