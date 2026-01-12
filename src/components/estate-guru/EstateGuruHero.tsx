import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";

const EstateGuruHero = () => {
  const { hero } = estateGuruContent;

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0B1F3B] via-[#0F2847] to-[#0B1F3B] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-16 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {hero.headline.split('.')[0]}.
              <span className="text-[#D4AF37]"> {hero.headline.split('.')[1]}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("#pricing")}
                className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all group"
              >
                {hero.primaryCta}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
        <Button
          size="lg"
          variant="hero"
          onClick={() => scrollToSection("#how-it-works")}
          className="hover:border-white/50 font-semibold text-lg px-8 py-6 rounded-xl transition-all group"
        >
                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          {/* Right Content - Product Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <span className="ml-4 text-white/50 text-sm">Estate Planning Dashboard</span>
                  </div>
                  
                  {/* Workflow Cards */}
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 font-medium">Client Intake</span>
                        <span className="text-[#D4AF37] text-sm">Complete ✓</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-[#D4AF37] rounded-full" />
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 font-medium">Document Review</span>
                        <span className="text-white/50 text-sm">In Progress</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-[#D4AF37]/70 rounded-full" />
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 font-medium">Attorney Sign-off</span>
                        <span className="text-white/50 text-sm">Pending</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-[#D4AF37]/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-[#D4AF37] text-[#0B1F3B] px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                Attorney-Led ✓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default EstateGuruHero;
