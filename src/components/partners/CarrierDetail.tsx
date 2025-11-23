import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Award, ArrowRight } from "lucide-react";
import { CarrierDetail as CarrierDetailType } from "@/data/carrierDetails";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CarrierDetailProps {
  carrier: CarrierDetailType;
}

const CarrierDetail = ({ carrier }: CarrierDetailProps) => {
  return (
    <div className="glass p-8 rounded-2xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-border/40">
        <div className="flex-shrink-0 h-24 flex items-center">
          <img
            src={carrier.logo}
            alt={`${carrier.name} logo`}
            className="max-h-20 w-auto object-contain"
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{carrier.name}</h2>
          <p className="text-lg text-muted-foreground italic">{carrier.tagline}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>Est. {carrier.established}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{carrier.headquarters}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span className="font-semibold text-accent">Rating: {carrier.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <p className="text-lg text-foreground leading-relaxed font-medium">
          {carrier.summary}
        </p>
      </div>

      {/* History */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-foreground">Company History</h3>
        <p className="text-muted-foreground leading-relaxed">
          {carrier.history}
        </p>
      </div>

      {/* Specialties */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-foreground">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {carrier.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      {/* Product Families */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Product Offerings</h3>
        <Accordion type="single" collapsible className="space-y-3">
          {carrier.productFamilies.map((product, index) => (
            <AccordionItem key={index} value={`product-${index}`} className="border border-border/40 rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 hover:bg-secondary/20 text-left">
                <span className="font-semibold text-foreground">{product.category}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 space-y-4">
                <p className="text-muted-foreground">{product.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Best For: <span className="font-normal text-muted-foreground">{product.bestFor}</span>
                  </p>
                  
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Key Benefits:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {product.benefits.map((benefit, bIndex) => (
                        <li key={bIndex}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Why We Partner */}
      <div className="space-y-3 bg-accent/5 p-6 rounded-xl border border-accent/20">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span className="text-accent">Why</span> We Partner With {carrier.name}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {carrier.whyPartner}
        </p>
      </div>

      {/* CTA */}
      <div className="pt-6 border-t border-border/40">
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button w-full md:w-auto">
          See How This Carrier Fits Your Financial Strategy
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CarrierDetail;
