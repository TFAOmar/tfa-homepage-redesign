import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { locations } from "@/data/locations";

const LocationsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", "West", "Mountain", "Southwest", "Midwest", "Southeast", "Northeast"];

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === "All" || location.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by city, state, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg glass"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {regions.map((region) => (
                <Badge
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-2 text-sm transition-all ${
                    selectedRegion === region
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "hover:bg-accent/10"
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-center text-muted-foreground mb-8">
            Showing {filteredLocations.length} {filteredLocations.length === 1 ? "location" : "locations"}
          </p>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="glass hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl text-navy">
                      {location.city}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      {location.state}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 flex-grow">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{location.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                    <a 
                      href={`tel:${location.phone}`}
                      className="text-sm text-foreground hover:text-accent transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{location.hours}</p>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Link to="/book-consultation" className="flex-1">
                    <Button 
                      className="w-full rounded-full bg-[#E4B548] text-black font-semibold hover:shadow-[0_0_25px_rgba(228,181,72,0.45)] transition-all"
                    >
                      Book Consultation
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                  >
                    Directions
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No locations found matching your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationsList;
