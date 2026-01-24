import { Badge } from "@/components/ui/badge";
import { Quote, TrendingUp, Users, Calendar, Award } from "lucide-react";

const stats = [
  { value: "50+", label: "Sponsors in 2025", icon: Award },
  { value: "1,000+", label: "Attendees Annually", icon: Users },
  { value: "5", label: "Events Per Year", icon: Calendar },
  { value: "95%", label: "Sponsor Satisfaction", icon: TrendingUp },
];

const testimonials = [
  {
    quote: "Sponsoring TFA events has been a game-changer for our business. The exposure to quality agents is unmatched.",
    author: "Insurance Industry Partner",
    role: "Title Sponsor 2025"
  },
  {
    quote: "The networking opportunities alone were worth the investment. We closed several deals directly from the event.",
    author: "Financial Services Provider",
    role: "Supporting Sponsor 2025"
  },
];

export const SocialProof = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Join a Growing Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top companies trust TFA events to connect with the next generation of financial professionals.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border text-center group hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-card border border-border"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-lg text-foreground mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past sponsors note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Past sponsors include companies from insurance, lending, real estate, tax, and marketing industries.
          </p>
        </div>
      </div>
    </section>
  );
};
