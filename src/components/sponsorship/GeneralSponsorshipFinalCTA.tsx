import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Zap } from "lucide-react";

interface GeneralSponsorshipFinalCTAProps {
  onInquireNow: () => void;
}

export const GeneralSponsorshipFinalCTA = ({ onInquireNow }: GeneralSponsorshipFinalCTAProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container relative px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Urgency badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              2025 events sold out quickly
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              Next Event: Kick Off — January 2026
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Spots Fill Fast.{" "}
            <span className="text-primary">Secure Yours Today.</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 50+ companies who've trusted TFA events to grow their brand. 
            Don't let your competitors get there first.
          </p>

          {/* CTA */}
          <Button 
            size="lg" 
            onClick={onInquireNow}
            className="px-10 py-7 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 group"
          >
            Inquire Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust note */}
          <p className="mt-6 text-sm text-muted-foreground">
            No payment required • Our team will contact you within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};
