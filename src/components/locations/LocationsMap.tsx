import { useEffect, useRef, useState, useCallback } from "react";
import { locations } from "@/data/locations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const LocationsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [keySubmitted, setKeySubmitted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const initializeMap = useCallback(() => {
    if (!mapContainer.current || typeof google === "undefined") return;

    // Center on Southern California
    const center = { lat: 34.0, lng: -117.5 };

    mapRef.current = new google.maps.Map(mapContainer.current, {
      center,
      zoom: 7,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ saturation: -20 }]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#d4e4f7" }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
    });

    // Add markers for each location
    const infoWindow = new google.maps.InfoWindow();

    locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.coordinates[1], lng: location.coordinates[0] },
        map: mapRef.current,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#E4B548",
          fillOpacity: 1,
          strokeColor: "#0A0F1F",
          strokeWeight: 2,
        },
      });

      const contentString = `
        <div style="padding: 8px; max-width: 250px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 4px; color: #0A0F1F;">${location.city}, ${location.state}</h3>
          <p style="font-size: 13px; color: #555; margin-bottom: 4px;">${location.address}</p>
          <p style="font-size: 13px; color: #555; margin-bottom: 4px;">
            <a href="tel:${location.phone}" style="color: #E4B548; text-decoration: none;">${location.phone}</a>
          </p>
          <p style="font-size: 12px; color: #888;">${location.hours}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}" 
             target="_blank" 
             style="display: inline-block; margin-top: 8px; padding: 6px 12px; background: #E4B548; color: #0A0F1F; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: 600;">
            Get Directions
          </a>
        </div>
      `;

      marker.addListener("click", () => {
        infoWindow.setContent(contentString);
        infoWindow.open(mapRef.current, marker);
      });
    });

    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (!keySubmitted || !apiKey) return;

    // Check if Google Maps is already loaded
    if (typeof google !== "undefined" && google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).initMap = initializeMap;

    script.onerror = () => {
      console.error("Failed to load Google Maps");
      setKeySubmitted(false);
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [keySubmitted, apiKey, initializeMap]);

  const handleSubmitKey = () => {
    if (apiKey.trim()) {
      setKeySubmitted(true);
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

        {!keySubmitted ? (
          <div className="max-w-2xl mx-auto glass p-8 rounded-2xl">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-navy mb-2">
                  Enable Interactive Map
                </h3>
                <p className="text-muted-foreground mb-4">
                  To view our office locations on an interactive map, please enter your Google Maps API key. You can get one at{" "}
                  <a 
                    href="https://console.cloud.google.com/google/maps-apis" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Google Cloud Console
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter your Google Maps API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSubmitKey()}
              />
              <Button 
                onClick={handleSubmitKey}
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
          <div className="glass rounded-2xl overflow-hidden relative">
            <div ref={mapContainer} className="w-full h-[600px]" />
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationsMap;
