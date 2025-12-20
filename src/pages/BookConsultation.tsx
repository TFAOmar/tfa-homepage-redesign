import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Users, FileText, Clock, Shield, Award, Star, ArrowRight, Phone, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import { submitForm } from "@/lib/formSubmit";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";

// Carrier logos
import allianzLogo from "@/assets/carriers/allianz.png";
import prudentialLogo from "@/assets/carriers/prudential.png";
import lincolnLogo from "@/assets/carriers/lincoln.png";
import massmutualLogo from "@/assets/carriers/massmutual.png";
import principalLogo from "@/assets/carriers/principal.png";
import nationalLifeLogo from "@/assets/carriers/national-life.png";

const interestLabels: Record<string, string> = {
  retirement: "Retirement Planning",
  insurance: "Life Insurance",
  investment: "Investment Management",
  tax: "Tax Strategy",
  estate: "Estate Planning",
  business: "Business Insurance",
};

const consultationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  interestCategory: z.string().min(1, "Please select an interest category"),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const BookConsultation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, honeypotValue, isBot } = useHoneypot();

  const { register, handleSubmit, formState: { errors } } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  });

  // Track page view
  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'booking',
        event_label: 'consultation_page_view'
      });
    }
  }, []);

  const onSubmit = async (data: ConsultationFormData) => {
    // Silently reject bot submissions
    if (isBot()) {
      navigate("/thank-you");
      return;
    }

    setIsSubmitting(true);
    try {
      const interestLabel = interestLabels[data.interestCategory] || data.interestCategory;
      
      const result = await submitForm({
        form_name: "Book Consultation",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes: `Interest: ${interestLabel}\nSource: book-consultation-page`,
        tags: [interestLabel, "Consultation Request"],
        honeypot: honeypotValue,
      });

      if (!result.ok) throw new Error(result.error);

      // Analytics: Track Schedule event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'schedule', {
          event_category: 'booking',
          event_label: 'consultation_scheduled'
        });
      }

      navigate("/thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const processSteps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "Share your goals, concerns, and current financial situation in a confidential 30-minute conversation.",
      icon: Phone
    },
    {
      number: "02",
      title: "Custom Analysis",
      description: "We'll analyze your unique situation and develop personalized strategies tailored to your needs.",
      icon: FileText
    },
    {
      number: "03",
      title: "Action Plan",
      description: "Receive a clear roadmap with specific recommendations to help you achieve your financial goals.",
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      quote: "TFA helped us understand our retirement options clearly. We now have peace of mind knowing our future is secure.",
      author: "Robert & Maria S.",
      location: "Miami, FL",
      rating: 5
    },
    {
      quote: "The consultation was thorough and eye-opening. They found gaps in our coverage we didn't even know existed.",
      author: "David M.",
      location: "Houston, TX",
      rating: 5
    },
    {
      quote: "Professional, knowledgeable, and genuinely caring. TFA made financial planning accessible and stress-free.",
      author: "Jennifer L.",
      location: "Atlanta, GA",
      rating: 5
    }
  ];

  const carriers = [
    { name: "Allianz", logo: allianzLogo },
    { name: "Prudential", logo: prudentialLogo },
    { name: "Lincoln Financial", logo: lincolnLogo },
    { name: "MassMutual", logo: massmutualLogo },
    { name: "Principal", logo: principalLogo },
    { name: "National Life", logo: nationalLifeLogo }
  ];

  return (
    <>
      <SEOHead
        title="Book a Free Consultation"
        description="Schedule your complimentary 30-minute financial consultation with The Financial Architects. Get expert guidance on retirement, insurance, investments, and tax strategies."
        canonical={`${siteConfig.url}/book-consultation`}
        keywords="free financial consultation, financial advisor appointment, retirement planning consultation, schedule financial advisor, complimentary consultation"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Book a Consultation | The Financial Architects",
            "Schedule your free 30-minute financial planning consultation.",
            `${siteConfig.url}/book-consultation`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Book Consultation", url: `${siteConfig.url}/book-consultation` },
          ]),
        ]}
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-[hsl(var(--navy))] via-[hsl(215,40%,18%)] to-[hsl(215,45%,12%)] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(228,181,72,0.1) 0%, transparent 50%)`
            }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Book Your Consultation
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Get clear guidance on retirement, investments, insurance, and tax strategies — in one simple conversation.
              </p>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-white/60 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  30 Minutes
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  100% Confidential
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  No Obligation
                </span>
              </div>
            </div>

            {/* Calendly Embed Section */}
            <div className="max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  {/* Calendly Embed Placeholder - Replace with actual Calendly embed */}
                  <div className="bg-white rounded-xl m-4">
                    <div className="p-8 text-center">
                      <Calendar className="h-16 w-16 text-[#E4B548] mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-[hsl(var(--navy))] mb-4">
                        Financial Architects Consultation (30 Minutes)
                      </h3>
                      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Select a time that works for you. Our advisors are available Monday through Friday, 9 AM to 6 PM.
                      </p>
                      
                      {/* Form Fields */}
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mb-8">
                        {/* Honeypot field */}
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
                          <select 
                            {...register("interestCategory")}
                            className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all text-muted-foreground"
                          >
                            <option value="">Select Interest Category</option>
                            <option value="retirement">Retirement Planning</option>
                            <option value="insurance">Life Insurance</option>
                            <option value="investment">Investment Management</option>
                            <option value="tax">Tax Strategy</option>
                            <option value="estate">Estate Planning</option>
                            <option value="business">Business Insurance</option>
                          </select>
                          {errors.interestCategory && <p className="text-red-500 text-sm mt-1 text-left">{errors.interestCategory.message}</p>}
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
                              Schedule My Consultation
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What to Expect
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our consultation process is designed to be simple, informative, and completely pressure-free.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {processSteps.map((step, index) => (
                <Card 
                  key={step.number}
                  className="relative bg-white/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <div className="absolute top-4 right-4 text-6xl font-black text-[#E4B548]/10">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-[#E4B548]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <step.icon className="h-8 w-8 text-[#E4B548]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of families who have secured their financial future with The Financial Architects.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#E4B548] text-[#E4B548]" />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Credibility Strip */}
        <section className="py-16 bg-secondary/30 border-y border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                Partnered with Industry-Leading Carriers
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {carriers.map((carrier) => (
                <div 
                  key={carrier.name}
                  className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <img 
                    src={carrier.logo} 
                    alt={carrier.name}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#E4B548]" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#E4B548]" />
                <span className="text-sm">20+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#E4B548]" />
                <span className="text-sm">10,000+ Families Served</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-[hsl(var(--navy))] to-[hsl(215,45%,18%)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take the First Step?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Your financial future starts with a single conversation. Book your free consultation today.
            </p>
            <a href="#top">
              <Button 
                className="btn-primary-cta px-8 py-6 text-lg hover:scale-105"
              >
                Book Consultation Now
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookConsultation;
