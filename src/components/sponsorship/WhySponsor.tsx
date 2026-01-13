import { Award, TrendingUp, Mic2, Share2, Crown } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Brand Authority",
    description: "Build credibility with the TFA community of agents, brokers, and clients"
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    description: "Capture leads at your booth and through post-event follow up"
  },
  {
    icon: Mic2,
    title: "On-Stage Spotlight",
    description: "Share your value proposition directly with an engaged audience"
  },
  {
    icon: Share2,
    title: "Social Media Exposure",
    description: "Title Sponsors receive a custom promo video across TFA channels"
  },
  {
    icon: Crown,
    title: "VIP Access",
    description: "Build relationships with top performers and decision makers"
  }
];

export const WhySponsor = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Sponsor?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Position your brand in front of motivated professionals ready to partner and grow.
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
