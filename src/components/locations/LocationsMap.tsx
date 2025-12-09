import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { locations } from "@/data/locations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const LocationsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-117.5, 34.0], // Center on Southern California
        zoom: 6,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Add markers for each location
      locations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.innerHTML = `
          <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent-foreground">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-base mb-1">${location.name}, ${location.state}</h3>
            <p class="text-sm text-gray-600 mb-1">${location.address}</p>
            <p class="text-sm text-gray-600 mb-1">${location.phone}</p>
            <p class="text-xs text-gray-500">${location.hours}</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  const handleSubmitToken = () => {
    if (mapboxToken.trim()) {
      setTokenSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Find Your Nearest Office
          </h2>
          <p className="text-xl text-muted-foreground">
            19 locations across California, Arizona, and Oregon
          </p>
        </div>

        {!tokenSubmitted ? (
          <div className="max-w-2xl mx-auto glass p-8 rounded-2xl">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-navy mb-2">
                  Enable Interactive Map
                </h3>
                <p className="text-muted-foreground mb-4">
                  To view our office locations on an interactive map, please enter your Mapbox public token. You can get a free token at{" "}
                  <a 
                    href="https://mapbox.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSubmitToken}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Load Map
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Or scroll down to browse our office listings below
            </p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div ref={mapContainer} className="w-full h-[600px]" />
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationsMap;
