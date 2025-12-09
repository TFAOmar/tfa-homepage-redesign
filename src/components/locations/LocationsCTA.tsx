import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

const LocationsCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Can't Find a Nearby Location?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We also offer virtual consultations! Connect with one of our expert advisors from the comfort of your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 neuro-button"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Virtual Meeting
            </Button>
            
            <a href="tel:+18883505396">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (888) 350-5396
              </Button>
            </a>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Serving clients nationwide through in-person and virtual consultations
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationsCTA;
