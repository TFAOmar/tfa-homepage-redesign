import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-financial.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-40 md:py-44 lg:py-52">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Financial planning consultation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-[720px] mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
            Building Financial
            <span className="block text-gold"> Legacies Together</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-6 leading-relaxed">
            Guiding families toward financial clarity, security, and lasting prosperity through personalized wealth planning strategies.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 neuro-button group"
            >
              Book Consultation
              <Calendar className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-navy text-lg px-8 py-6 backdrop-blur-sm bg-white/10"
            >
              Learn Our Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
