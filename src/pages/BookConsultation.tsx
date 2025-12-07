import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Users, FileText, Clock, Shield, Award, Star, ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// Carrier logos
import allianzLogo from "@/assets/carriers/allianz.png";
import prudentialLogo from "@/assets/carriers/prudential.png";
import lincolnLogo from "@/assets/carriers/lincoln.png";
import massmutualLogo from "@/assets/carriers/massmutual.png";
import principalLogo from "@/assets/carriers/principal.png";
import nationalLifeLogo from "@/assets/carriers/national-life.png";

const BookConsultation = () => {
  // Track page view
  useEffect(() => {
    // Analytics: Track Lead event on page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'booking',
        event_label: 'consultation_page_view'
      });
    }
  }, []);

  const handleCalendlySchedule = () => {
    // Analytics: Track Schedule event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'schedule', {
        event_category: 'booking',
        event_label: 'consultation_scheduled'
      });
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
                      TFA Financial Consultation (30 Minutes)
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Select a time that works for you. Our advisors are available Monday through Friday, 9 AM to 6 PM.
                    </p>
                    
                    {/* Form Fields - These would be replaced by Calendly embed */}
                    <div className="space-y-4 max-w-md mx-auto mb-8">
                      <input 
                        type="text" 
                        placeholder="Your Full Name" 
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#E4B548] focus:ring-2 focus:ring-[#E4B548]/20 outline-none transition-all"
                      />
                      <select 
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
                    </div>

                    <Link to="/thank-you">
                      <Button 
                        onClick={handleCalendlySchedule}
                        className="rounded-full bg-[#E4B548] text-black font-semibold px-8 py-6 text-lg hover:shadow-[0_0_25px_rgba(228,181,72,0.45)] transition-all hover:scale-105"
                      >
                        Schedule My Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
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
              Join thousands of families who have secured their financial future with TFA.
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
              className="rounded-full bg-[#E4B548] text-black font-semibold px-8 py-6 text-lg hover:shadow-[0_0_25px_rgba(228,181,72,0.45)] transition-all hover:scale-105"
            >
              Book Consultation Now
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default BookConsultation;