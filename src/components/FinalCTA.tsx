import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 max-w-[1280px]">
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Ready to Secure Your Family's Future?
            <span className="block text-gold mt-2">Let's Start the Conversation.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 leading-relaxed">
            Book your free, no-obligation consultation today and take the first step toward financial peace of mind.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-navy text-lg font-bold px-12 py-7 rounded-full shadow-[0_8px_32px_rgba(212,175,55,0.5)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.7)] transition-all duration-200 hover:scale-[1.05] border-2 border-gold group"
            >
              Book Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-primary-foreground/70 text-sm">
              Free consultation • No obligations • Completely confidential
            </p>
            
            <a 
              href="tel:8005550123"
              className="text-primary-foreground/80 hover:text-gold text-base transition-colors mt-2"
            >
              Or call us: <span className="font-semibold">(800) 555-0123</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
