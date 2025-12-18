import LocationsHero from "@/components/locations/LocationsHero";
import LocationsList from "@/components/locations/LocationsList";
import LocationsCTA from "@/components/locations/LocationsCTA";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import { locations } from "@/data/locations";

// Helper function to parse address components from full address string
const parseAddress = (fullAddress: string) => {
  // Pattern: "Street Address, City, State ZIP"
  const parts = fullAddress.split(',').map(p => p.trim());
  if (parts.length >= 3) {
    const street = parts.slice(0, -2).join(', ');
    const city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1].split(' ');
    const state = stateZip[0];
    const zip = stateZip[1] || '';
    return { street, city, state, zip };
  }
  // Fallback for satellite locations with minimal address
  return { street: fullAddress, city: '', state: '', zip: '' };
};

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate LocalBusiness schemas for all 19 locations
  const localBusinessSchemas = locations.map((location) => {
    const addressParts = parseAddress(location.address);
    return generateLocalBusinessSchema(
      location.name,
      {
        street: addressParts.street,
        city: location.city,
        state: location.state,
        zip: addressParts.zip,
      },
      location.phone,
      { lat: location.coordinates[1], lng: location.coordinates[0] }
    );
  });

  return (
    <>
      <SEOHead
        title="Office Locations"
        description="Find a The Financial Architects office near you. 19 locations across California, Arizona, and Oregon including Los Angeles, San Diego, Orange County, and Phoenix."
        canonical={`${siteConfig.url}/locations`}
        keywords="financial advisor near me, financial planner California, financial advisor Arizona, retirement planner Los Angeles, wealth management Orange County, financial advisor San Diego"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Office Locations | The Financial Architects",
            "Find a The Financial Architects office near you. 19 locations across California, Arizona, and Oregon.",
            `${siteConfig.url}/locations`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Locations", url: `${siteConfig.url}/locations` },
          ]),
          ...localBusinessSchemas,
        ]}
      />
      <div className="min-h-screen">
        <LocationsHero />
        <LocationsList />
        <LocationsCTA />
      </div>
    </>
  );
};

export default Locations;
