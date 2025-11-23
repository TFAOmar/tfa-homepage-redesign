import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const majorLocations = [
  "San Francisco, CA",
  "Los Angeles, CA",
  "Phoenix, AZ",
  "Denver, CO",
  "Austin, TX",
  "Dallas, TX",
  "Chicago, IL",
  "Boston, MA",
  "New York, NY",
  "Atlanta, GA",
  "Miami, FL",
  "Seattle, WA",
];

const Locations = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Nationwide Presence, Local Expertise
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            With 29 locations across the United States, we're here to serve you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {majorLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-4 glass rounded-lg hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <MapPin className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-navy font-medium">{location}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button">
            Find Your Nearest Office
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Locations;
