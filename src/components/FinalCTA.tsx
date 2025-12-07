import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-20 lg:px-20 relative z-10 max-w-[1280px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
            Ready to Secure Your Family's Future?
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
            Book your free consultation and take the first step toward financial peace of mind.
          </p>

          <div className="flex flex-col items-center gap-5">
            <Link to="/book-consultation">
              <Button 
                size="lg" 
                className="btn-primary-cta px-8 py-8 text-lg hover:scale-[1.05] border-2 border-[#E4B548] hover:border-[#1a2744] group"
              >
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <p className="text-primary-foreground/80 text-base mt-1">
              Free consultation • No obligations • Completely confidential
            </p>
            
            <a 
              href="tel:8005550123"
              className="text-primary-foreground/70 hover:text-gold text-base transition-colors mt-3"
            >
              Or call <span className="font-semibold">(800) 555-0123</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
