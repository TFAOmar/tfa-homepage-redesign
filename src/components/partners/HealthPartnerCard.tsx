import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
    <div className="glass p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-24 flex items-center justify-center w-full">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="max-h-20 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
        </div>
        
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-accent font-medium">{tagline}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>

        <Button 
          asChild
          variant="outline" 
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
        >
          <Link to={linkUrl}>
            View Partner Details
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HealthPartnerCard;
