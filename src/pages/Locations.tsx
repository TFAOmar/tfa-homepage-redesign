import LocationsHero from "@/components/locations/LocationsHero";
import { useEffect } from "react";
import { MapPin, Clock } from "lucide-react";

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <LocationsHero />
      
      {/* Coming Soon Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass rounded-2xl p-12 md:p-16 border border-white/10">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center">
                <MapPin className="w-10 h-10 text-accent" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Coming Soon
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're gathering detailed information about all our office locations across the nation. 
                Check back soon for a complete directory with addresses, hours, and directions.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" strokeWidth={1.5} />
                <span>Location details being updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
