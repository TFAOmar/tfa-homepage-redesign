import { Button } from "@/components/ui/button";
import { Phone, Calendar, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const AdvisorsCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 tracking-tight">
            Not Sure Who to Choose?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Our team will match you with the perfect advisor based on your unique needs, goals, and location. Let us help you find your ideal financial partner.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 neuro-button"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Request a Match
              </Button>
            </Link>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground text-lg px-8 py-6"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (800) 555-0123
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Free consultation • No pressure • Personalized advisor recommendations
          </p>

          <div className="mt-8 pt-8 border-t border-border/50">
            <p className="text-muted-foreground mb-4">Are you an advisor or broker?</p>
            <Link to="/advisors/onboard">
              <Button size="lg" variant="secondary" className="group">
                <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Join Our Network
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsCTA;
