import { useState } from "react";
import PartnersHero from "@/components/partners/PartnersHero";
import CarrierCard from "@/components/partners/CarrierCard";
import CarrierDetail from "@/components/partners/CarrierDetail";
import { carrierDetails } from "@/data/carrierDetails";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Partners = () => {
  const [selectedCarrier, setSelectedCarrier] = useState<string | null>(null);

  const handleCarrierSelect = (carrierId: string) => {
    setSelectedCarrier(carrierId);
    // Scroll to detail section
    setTimeout(() => {
      document.getElementById('carrier-detail')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedCarrierData = carrierDetails.find(c => c.id === selectedCarrier);

  return (
    <div className="min-h-screen">
      <PartnersHero />
      
      {/* Carrier Cards Grid */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry-Leading Insurance Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Click on any carrier below to learn more about their history, specialties, and why we've chosen to partner with them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carrierDetails.map((carrier) => (
              <CarrierCard
                key={carrier.id}
                name={carrier.name}
                logo={carrier.logo}
                tagline={carrier.tagline}
                rating={carrier.rating}
                onClick={() => handleCarrierSelect(carrier.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Carrier Detail Section */}
      {selectedCarrierData && (
        <section id="carrier-detail" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={scrollToTop}
                className="text-accent hover:text-accent/80"
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Back to All Carriers
              </Button>
            </div>
            
            <CarrierDetail carrier={selectedCarrierData} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Partners;
