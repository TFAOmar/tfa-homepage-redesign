import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import heroImage from "@/assets/hero-financial.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Family financial planning"
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-navy/85" />
      </div>

      {/* Content - Mobile First */}
      <div className="container mx-auto px-6 md:px-20 lg:px-20 relative z-10 py-24 md:py-32">
        <div className="max-w-[90%] md:max-w-[700px] mx-auto text-center animate-fade-in-up">
          {/* Headline */}
          <h1 className="text-[28px] leading-[1.2] md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
            Financial Guidance
            <span className="block text-gold mt-1">Built for Families.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-5 md:mb-6 leading-relaxed font-light">
            Trusted advisors helping you protect, grow, and secure your financial future.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-3 mb-4 md:mb-5">
            <Button 
              size="lg" 
              className="w-full sm:w-auto max-w-[320px] bg-gold hover:bg-gold/90 text-navy text-base md:text-lg font-bold px-10 py-6 md:py-7 rounded-full shadow-[0_8px_32px_rgba(212,175,55,0.5)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.7)] transition-all duration-200 hover:scale-[1.05] border-2 border-gold"
            >
              Book Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            
            {/* Conversion micro-copy */}
            <p className="text-sm text-white/60 font-light">
              Free consultation. No obligations.
            </p>
            
            {/* Supporting credibility text */}
            <p className="text-sm md:text-base text-white/70 font-light mt-1">
              29 locations • 280+ licensed advisors nationwide
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
