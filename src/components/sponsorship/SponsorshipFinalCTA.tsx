import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

interface SponsorshipFinalCTAProps {
  onBecomeASponsor: () => void;
  onTalkToTeam: () => void;
}

export const SponsorshipFinalCTA = ({ onBecomeASponsor, onTalkToTeam }: SponsorshipFinalCTAProps) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] via-[#0D1428] to-[#0A0F1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to get in front of the{" "}
            <span className="bg-gradient-to-r from-[#E4B548] to-[#F5D78E] bg-clip-text text-transparent">
              TFA community
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join our growing list of sponsors and make 2026 your best year yet. Limited spots available.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={onBecomeASponsor}
              className="bg-gradient-to-r from-[#E4B548] to-[#D4A438] hover:from-[#D4A438] hover:to-[#C49428] text-[#0A0F1F] font-semibold px-8 py-6 text-lg shadow-lg shadow-[#E4B548]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#E4B548]/30 hover:scale-105"
            >
              Become a Sponsor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="hero"
              onClick={onTalkToTeam}
              className="px-8 py-6 text-lg transition-all duration-300 hover:border-white/50"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
