import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthPartnerCardProps {
  name: string;
  logo: string;
  tagline: string;
  description: string;
  linkUrl: string;
}

const HealthPartnerCard = ({ name, logo, tagline, description, linkUrl }: HealthPartnerCardProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group">
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-full flex items-center justify-center mb-4">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-accent font-medium mb-3">{tagline}</p>
        <p className="text-muted-foreground text-sm mb-6">{description}</p>
        
        <Button asChild className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          <Link to={linkUrl}>
            Learn More & Get Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HealthPartnerCard;
