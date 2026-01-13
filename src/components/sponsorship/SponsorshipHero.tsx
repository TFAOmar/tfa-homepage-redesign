import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Mic, Ticket } from "lucide-react";

interface SponsorshipHeroProps {
  onBecomeASponsor: () => void;
  onDownloadPDF: () => void;
}

export const SponsorshipHero = ({ onBecomeASponsor, onDownloadPDF }: SponsorshipHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] via-[#0D1428] to-[#0A0F1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#E4B548]/5 via-transparent to-transparent" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Limited spots badge */}
          <div className="mb-6 animate-fade-in">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm font-medium border-[#E4B548]/50 text-[#E4B548] bg-[#E4B548]/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Limited spots available
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in [animation-delay:100ms]">
            Sponsor the{" "}
            <span className="bg-gradient-to-r from-[#E4B548] to-[#F5D78E] bg-clip-text text-transparent">
              TFA 2026 Kick Off
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
            Start 2026 with clarity, confidence, and momentum. Get in front of agents, brokers, and clients with premium visibility and real lead flow.
          </p>

          {/* Bullet points */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 animate-fade-in [animation-delay:300ms]">
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 rounded-full bg-[#E4B548]/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-[#E4B548]" />
              </div>
              <span className="font-medium">On-stage exposure</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 rounded-full bg-[#E4B548]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#E4B548]" />
              </div>
              <span className="font-medium">Vendor booth traffic</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 rounded-full bg-[#E4B548]/20 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-[#E4B548]" />
              </div>
              <span className="font-medium">VIP + GA tickets included</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:400ms]">
            <Button 
              size="lg" 
              onClick={onBecomeASponsor}
              className="bg-gradient-to-r from-[#E4B548] to-[#D4A438] hover:from-[#D4A438] hover:to-[#C49428] text-[#0A0F1F] font-semibold px-8 py-6 text-lg shadow-lg shadow-[#E4B548]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#E4B548]/30 hover:scale-105"
            >
              Become a Sponsor
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={onDownloadPDF}
              className="px-8 py-6 text-lg transition-all duration-300 hover:border-white/50"
            >
              Download Sponsor PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
