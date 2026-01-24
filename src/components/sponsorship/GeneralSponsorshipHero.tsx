import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Users, 
  Star, 
  Share2,
  ArrowRight,
  Clock,
  Zap
} from "lucide-react";

interface GeneralSponsorshipHeroProps {
  onInquireNow: () => void;
}

export const GeneralSponsorshipHero = ({ onInquireNow }: GeneralSponsorshipHeroProps) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* FOMO Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge 
              variant="destructive" 
              className="px-4 py-2 text-sm font-semibold animate-pulse bg-destructive/90"
            >
              <Zap className="w-4 h-4 mr-1" />
              Only 12 Sponsor Spots Per Event
            </Badge>
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground"
            >
              <Clock className="w-4 h-4 mr-1" />
              Next Event: Kick Off — January 2026
            </Badge>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Sponsor a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
              TFA Event
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Get your brand in front of <span className="text-foreground font-semibold">200+ agents, brokers, and clients</span> at our high-energy live events.{" "}
            <span className="text-primary font-semibold">5 events. 5 opportunities.</span>{" "}
            Don't miss your moment.
          </p>

          {/* Quick benefits bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {[
              { icon: Mic, label: "Stage Time" },
              { icon: Users, label: "Booth Traffic" },
              { icon: Star, label: "VIP Access" },
              { icon: Share2, label: "Social Exposure" },
            ].map((benefit, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{benefit.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onInquireNow}
              className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 group"
            >
              Reserve Your Spot
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-6 text-lg font-semibold border-2"
            >
              View All Events
            </Button>
          </div>

          {/* Social proof stat */}
          <div className="mt-12 flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm">
                <span className="text-foreground font-semibold">50+ sponsors</span> trusted us in 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
