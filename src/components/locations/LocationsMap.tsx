import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { locations } from "@/data/locations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

// Validate Mapbox public token format
const validateMapboxToken = (token: string): boolean => {
  const regex = /^pk\.[a-zA-Z0-9_-]{60,}$/;
  return regex.test(token.trim());
};

// Create marker element using DOM API (avoids innerHTML XSS risk)
const createMarkerElement = (): HTMLDivElement => {
  const container = document.createElement("div");
  container.className = "custom-marker";

  const markerDiv = document.createElement("div");
  markerDiv.className = "w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.classList.add("text-accent-foreground");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z");

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "12");
  circle.setAttribute("cy", "10");
  circle.setAttribute("r", "3");

  svg.appendChild(path);
  svg.appendChild(circle);
  markerDiv.appendChild(svg);
  container.appendChild(markerDiv);

  return container;
};

// Create popup content using DOM API (avoids setHTML XSS risk)
const createPopupContent = (location: typeof locations[0]): HTMLDivElement => {
  const container = document.createElement("div");
  container.className = "p-2";

  const title = document.createElement("h3");
  title.className = "font-bold text-base mb-1";
  title.textContent = `${location.name}, ${location.state}`;

  const address = document.createElement("p");
  address.className = "text-sm text-gray-600 mb-1";
  address.textContent = location.address;

  const phone = document.createElement("p");
  phone.className = "text-sm text-gray-600 mb-1";
  phone.textContent = location.phone;

  const hours = document.createElement("p");
  hours.className = "text-xs text-gray-500";
  hours.textContent = location.hours;

  container.appendChild(title);
  container.appendChild(address);
  container.appendChild(phone);
  container.appendChild(hours);

  return container;
};

const LocationsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const [tokenError, setTokenError] = useState("");

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-98.5795, 39.8283], // Center of USA
        zoom: 3.5,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Add markers for each location using DOM API
      locations.forEach((location) => {
        const el = createMarkerElement();
        const popupContent = createPopupContent(location);
        
        const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast.error("Failed to initialize map. Please check your Mapbox token.");
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  const handleSubmitToken = () => {
    const trimmedToken = mapboxToken.trim();
    
    if (!trimmedToken) {
      setTokenError("Please enter a Mapbox token");
      return;
    }
    
    if (!validateMapboxToken(trimmedToken)) {
      setTokenError("Invalid Mapbox token format. Token should start with 'pk.' followed by at least 60 characters.");
      return;
    }
    
    setTokenError("");
    setMapboxToken(trimmedToken);
    setTokenSubmitted(true);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Find Your Nearest Office
          </h2>
          <p className="text-xl text-muted-foreground">
            29 locations across the United States, ready to serve you
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
                placeholder="Enter your Mapbox public token (pk.xxx...)"
                value={mapboxToken}
                onChange={(e) => {
                  setMapboxToken(e.target.value);
                  setTokenError("");
                }}
                className={`flex-1 ${tokenError ? "border-red-500" : ""}`}
              />
              <Button 
                onClick={handleSubmitToken}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Load Map
              </Button>
            </div>
            
            {tokenError && (
              <p className="text-sm text-red-500 mt-2">{tokenError}</p>
            )}
            
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
