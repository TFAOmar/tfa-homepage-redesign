import { Users, Zap, Target, Handshake } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Audience",
    description: "Agents, brokers, and clients in one room"
  },
  {
    icon: Zap,
    title: "Atmosphere",
    description: "High-energy, goal-setting kickoff"
  },
  {
    icon: Target,
    title: "Outcomes",
    description: "Actionable playbooks and market insights"
  },
  {
    icon: Handshake,
    title: "Networking",
    description: "VIP connections and relationship-building"
  }
];

export const EventOverview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About the Event
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Start 2026 with clarity, confidence, and momentum. The TFA 2026 Kick Off is our once-a-year live event where agents, brokers, and clients align on strategy, sharpen skills, and set bold goals for the year ahead. Expect powerful playbooks, market insights, and practical training you can use immediately.
            </p>
          </div>

          {/* Highlight tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={highlight.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <highlight.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
