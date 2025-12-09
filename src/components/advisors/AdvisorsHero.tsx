import heroImage from "@/assets/advisors-hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

const AdvisorsHero = () => {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/90" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in tracking-tight">
          Meet Our Advisors & Brokers
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
          280+ licensed professionals across 29 locations, ready to guide you toward financial confidence
        </p>
        <Link to="/careers">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button px-8 py-6 text-lg"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Join Our Team
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AdvisorsHero;
