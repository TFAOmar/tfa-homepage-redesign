import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  price: number;
  priceNote: string;
  popular?: boolean;
  features: string[];
  highlight?: string;
}

const tiers: Tier[] = [
  {
    id: 'title',
    name: 'Title Sponsor',
    price: 4000,
    priceNote: 'per event',
    highlight: 'Maximum Exposure',
    features: [
      'On-stage speaking opportunity (3-5 min)',
      'Premium booth location',
      '4 VIP tickets',
      'Logo on all event materials',
      'Social media feature posts',
      'Email blast mention',
      'Banner placement at event',
    ]
  },
  {
    id: 'supporting',
    name: 'Supporting Sponsor',
    price: 2000,
    priceNote: 'per event',
    popular: true,
    features: [
      'Vendor booth space',
      '2 VIP tickets',
      'Logo on event signage',
      'Social media mention',
      'Email recognition',
      'Networking access',
    ]
  },
  {
    id: 'community',
    name: 'Community Sponsor',
    price: 500,
    priceNote: 'per event',
    features: [
      '1 event ticket',
      'Logo on sponsor wall',
      'Social media thank you',
      'Community recognition',
    ]
  },
];

interface GeneralSponsorshipTiersProps {
  onSelectTier: (tierId: string) => void;
}

export const GeneralSponsorshipTiers = ({ onSelectTier }: GeneralSponsorshipTiersProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Zap className="w-4 h-4 mr-2" />
            Sponsorship Packages
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Level
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All packages are priced per event. Bundle multiple events for additional savings.
          </p>
        </div>

        {/* Tiers grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all ${
                tier.popular 
                  ? 'border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Highlight label */}
              {tier.highlight && (
                <Badge variant="outline" className="mb-4 text-xs">
                  {tier.highlight}
                </Badge>
              )}

              {/* Tier name and price */}
              <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${tier.price.toLocaleString()}</span>
                <span className="text-muted-foreground ml-2">/{tier.priceNote}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                onClick={() => onSelectTier(tier.id)}
                className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                variant={tier.popular ? 'default' : 'outline'}
              >
                Select {tier.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Multi-event savings reminder */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            💰 <span className="font-medium text-foreground">Multi-event discount:</span> Sponsor 3+ events and save 15% on your total package.
          </p>
        </div>
      </div>
    </section>
  );
};
