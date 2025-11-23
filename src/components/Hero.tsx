import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import heroImage from "@/assets/hero-financial.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay - Mobile */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <img
          src={heroImage}
          alt="Family financial planning"
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-navy/85" />
      </div>

      {/* Desktop Background - Solid Navy */}
      <div className="absolute inset-0 z-0 hidden lg:block bg-navy" />

      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 py-24 md:py-32 lg:py-40">
        {/* Mobile/Tablet: Centered Layout */}
        <div className="lg:hidden max-w-[90%] md:max-w-[700px] mx-auto text-center animate-fade-in-up">
          <h1 className="text-[28px] leading-[1.2] md:text-5xl font-semibold text-white mb-3 md:mb-4 tracking-tight">
            Financial Guidance
            <span className="block text-gold mt-1">Built for Families.</span>
          </h1>
          
          <p className="text-base md:text-xl text-white/90 mb-5 md:mb-6 leading-relaxed font-light">
            Trusted advisors helping you protect, grow, and secure your financial future.
          </p>

          <div className="flex flex-col items-center gap-3 mb-4 md:mb-5">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gold hover:bg-gold/90 hover:scale-[1.03] text-navy text-base md:text-lg font-semibold px-10 py-6 md:py-7 rounded-lg shadow-lg hover:shadow-gold/40 transition-all duration-300"
            >
              Book Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm md:text-base text-white/70 font-light">
              29 locations • 280+ licensed advisors nationwide
            </p>
          </div>
        </div>

        {/* Desktop: Two-Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-20 lg:items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-[700px] animate-fade-in-up">
            <h1 className="text-5xl xl:text-6xl font-semibold text-white mb-5 leading-[1.15] tracking-tight">
              Financial Guidance
              <span className="block text-gold mt-2">Built for Families.</span>
            </h1>
            
            <p className="text-xl xl:text-2xl text-white/85 mb-8 leading-relaxed font-light max-w-[620px]">
              Trusted advisors helping you protect, grow, and secure your financial future.
            </p>

            <div className="flex flex-col items-start gap-4">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/90 hover:scale-[1.03] text-navy text-lg font-semibold px-12 py-7 rounded-lg shadow-xl hover:shadow-gold/40 transition-all duration-300"
              >
                Book Consultation
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-white/60 font-light">
                Serving thousands of families nationwide with 280+ licensed advisors.
              </p>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Financial advisors meeting with family"
                className="w-full h-[600px] xl:h-[680px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
