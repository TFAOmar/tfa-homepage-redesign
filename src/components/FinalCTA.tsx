import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Your Financial Future Deserves a Plan.
            <span className="block text-gold mt-2">Let's Build It Together.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 leading-relaxed">
            Take the first step toward financial confidence. Schedule your complimentary consultation with one of our expert advisors today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-7 neuro-button group text-base"
            >
              <Phone className="mr-2 h-5 w-5" />
              Schedule Your Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-navy text-lg px-10 py-7 backdrop-blur-sm bg-white/10 text-base"
            >
              Call (800) 555-0123
            </Button>
          </div>

          <p className="text-primary-foreground/70 mt-8 text-sm">
            No obligation. Completely confidential. Expert guidance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
