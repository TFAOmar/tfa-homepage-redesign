import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Video, Mic, Store, Crown, Ticket, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

export type SponsorshipPackage = 'title' | 'supporting' | 'community';

interface PackageCardProps {
  name: string;
  price: number;
  packageId: SponsorshipPackage;
  features: { icon: React.ComponentType<{ className?: string }>; text: string }[];
  isPopular?: boolean;
  onSelect: (packageId: SponsorshipPackage) => void;
}

const PackageCard = ({ name, price, packageId, features, isPopular, onSelect }: PackageCardProps) => {
  return (
    <div 
      className={cn(
        "relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02]",
        isPopular 
          ? "bg-gradient-to-b from-primary/10 via-card to-card border-2 border-primary shadow-xl shadow-primary/10" 
          : "bg-card border border-border hover:border-primary/30 hover:shadow-lg"
      )}
    >
      {/* Popular badge */}
      {isPopular && (
        <Badge 
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1"
        >
          Most Popular
        </Badge>
      )}

      {/* Package name */}
      <h3 className="text-xl font-bold text-foreground mb-2 text-center">{name}</h3>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-foreground">${price.toLocaleString()}</span>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <feature.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-foreground">{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button 
        onClick={() => onSelect(packageId)}
        className={cn(
          "w-full py-6 font-semibold transition-all duration-300",
          isPopular 
            ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30" 
            : "bg-foreground hover:bg-foreground/90 text-background"
        )}
      >
        Select {name}
      </Button>
    </div>
  );
};

interface SponsorshipPackagesProps {
  onSelectPackage: (packageId: SponsorshipPackage) => void;
}

export const SponsorshipPackages = ({ onSelectPackage }: SponsorshipPackagesProps) => {
  const packages = [
    {
      name: "Title Sponsor",
      price: 4000,
      packageId: 'title' as SponsorshipPackage,
      isPopular: false,
      features: [
        { icon: Video, text: "Promo Video Feature (TFA creates a custom video showcasing your business)" },
        { icon: Mic, text: "15 minutes on stage to promote your business" },
        { icon: Store, text: "Premium booth location" },
        { icon: Crown, text: "2 VIP tickets included" },
        { icon: Ticket, text: "6 General Admission tickets included" }
      ]
    },
    {
      name: "Supporting Sponsor",
      price: 2000,
      packageId: 'supporting' as SponsorshipPackage,
      isPopular: true,
      features: [
        { icon: Mic, text: "5 minutes on stage to promote your business" },
        { icon: Store, text: "Booth included" },
        { icon: Crown, text: "2 VIP tickets included" },
        { icon: Ticket, text: "2 General Admission tickets included" }
      ]
    },
    {
      name: "Community Sponsor",
      price: 500,
      packageId: 'community' as SponsorshipPackage,
      isPopular: false,
      features: [
        { icon: Megaphone, text: "Shout out during event" },
        { icon: Store, text: "Booth included" },
        { icon: Ticket, text: "2 General Admission tickets included" }
      ]
    }
  ];

  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sponsorship Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the package that fits your goals and budget. All packages include valuable exposure to the TFA community.
            </p>
          </div>

          {/* Packages grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={pkg.packageId}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PackageCard {...pkg} onSelect={onSelectPackage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
