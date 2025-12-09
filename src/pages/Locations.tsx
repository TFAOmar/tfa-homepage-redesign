import LocationsHero from "@/components/locations/LocationsHero";
import LocationsList from "@/components/locations/LocationsList";
import LocationsCTA from "@/components/locations/LocationsCTA";
import { useEffect } from "react";

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <LocationsHero />
      <LocationsList />
      <LocationsCTA />
    </div>
  );
};

export default Locations;
