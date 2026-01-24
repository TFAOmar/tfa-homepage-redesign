import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Mail, Clock, Phone, Gift, ArrowRight, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfetti } from "@/hooks/useConfetti";
import { SEOHead } from "@/components/seo";

const eventLabels: Record<string, { name: string; timing: string; attendees: string }> = {
  'kickoff': { name: 'Kick Off', timing: 'January', attendees: '200+' },
  'crash-courses': { name: 'Crash Courses', timing: 'Spring', attendees: '75+' },
  'leadership-summit': { name: 'Leadership Summit', timing: 'Summer', attendees: '100+' },
  'summer-sizzler': { name: 'Summer Sizzler', timing: 'Mid-Year', attendees: '150+' },
  'christmas-party': { name: 'Christmas Party', timing: 'December', attendees: '200+' }
};

const packageLabels: Record<string, string> = {
  title: "Title Sponsor",
  supporting: "Supporting Sponsor",
  community: "Community Sponsor",
  undecided: "Package TBD"
};

const GeneralSponsorshipSuccess = () => {
  const [searchParams] = useSearchParams();
  const { fireFireworks } = useConfetti();

  const company = searchParams.get("company") || "Your Company";
  const eventsParam = searchParams.get("events") || "";
  const events = eventsParam ? eventsParam.split(",").filter(Boolean) : [];
  const packageType = searchParams.get("package") || "undecided";

  // Fire confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fireFireworks();
    }, 300);
    return () => clearTimeout(timer);
  }, [fireFireworks]);

  // Analytics tracking
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "sponsorship_inquiry_complete",
        company_name: company,
        events_interested: events,
        package_type: packageType,
      });
    }
  }, [company, events, packageType]);

  const steps = [
    {
      icon: Mail,
      title: "Email Confirmation",
      description: "Check your inbox for a summary of your inquiry",
      timing: "Within 5 minutes"
    },
    {
      icon: Clock,
      title: "Team Review",
      description: "We'll review your preferred events and package selection",
      timing: "1 business day"
    },
    {
      icon: Phone,
      title: "Personalized Follow-Up",
      description: "A team member will call to discuss availability and finalize details",
      timing: "Within 24 hours"
    },
    {
      icon: Gift,
      title: "Secure Your Spot",
      description: "Complete payment and receive your sponsor welcome kit",
      timing: "2-3 days"
    }
  ];

  return (
    <>
      <SEOHead
        title="Thank You - TFA Sponsorship Inquiry Received"
        description="Your sponsorship inquiry has been received. Our team will contact you within 24 hours."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Animated Success Icon */}
              <div className="relative inline-flex mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative bg-primary/10 rounded-full p-6 animate-[scale-in_0.5s_ease-out]">
                  <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Thank You for Your Interest!
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Your sponsorship inquiry for <span className="font-semibold text-foreground">{company}</span> has been received.
              </p>

              <Badge variant="secondary" className="text-sm px-4 py-2">
                {packageLabels[packageType] || packageType}
              </Badge>

              {/* Selected Events */}
              {events.length > 0 && (
                <div className="mt-8 p-6 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Events You're Interested In
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {events.map((eventId) => {
                      const event = eventLabels[eventId];
                      return event ? (
                        <Badge key={eventId} variant="outline" className="px-3 py-1.5">
                          {event.name} ({event.timing}) — {event.attendees} attendees
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-16 md:py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
                What Happens Next?
              </h2>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex gap-4 md:gap-6 p-5 md:p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <step.icon className="w-4 h-4 text-primary" />
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                        <Badge variant="secondary" className="flex-shrink-0 text-xs">
                          {step.timing}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Expectations */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-center text-foreground mb-8">
                Timeline Expectations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground">Confirmation email</p>
                  <p className="font-semibold text-foreground">Within 5 minutes</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground">Team contact</p>
                  <p className="font-semibold text-foreground">Within 24 hours</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground">Package finalization</p>
                  <p className="font-semibold text-foreground">2-3 business days</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground">Event prep materials</p>
                  <p className="font-semibold text-foreground">2 weeks before event</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/events">
                  <Calendar className="w-4 h-4" />
                  View All Events
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Return to Home
                </Link>
              </Button>
            </div>

            {/* Contact */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Questions? Contact us at{" "}
                <a 
                  href="mailto:events@tfainsuranceadvisors.com" 
                  className="text-primary hover:underline font-medium"
                >
                  events@tfainsuranceadvisors.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GeneralSponsorshipSuccess;
