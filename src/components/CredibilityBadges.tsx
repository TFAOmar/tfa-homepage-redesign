import { Shield, Award, Building2, BadgeCheck, Users, FileCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface Affiliation {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const affiliations: Affiliation[] = [
  {
    name: "NAIFA Member",
    icon: <Users className="h-8 w-8" />,
    description: "National Association of Insurance and Financial Advisors – Advancing ethical financial advice since 1890",
    color: "text-blue-600"
  },
  {
    name: "FSP Certified",
    icon: <Award className="h-8 w-8" />,
    description: "Society of Financial Service Professionals – Committed to excellence in financial planning",
    color: "text-purple-600"
  },
  {
    name: "BBB A+ Rated",
    icon: <BadgeCheck className="h-8 w-8" />,
    description: "Better Business Bureau A+ Rating – Trusted by families nationwide for ethical business practices",
    color: "text-green-600"
  },
  {
    name: "State Licensed",
    icon: <Shield className="h-8 w-8" />,
    description: "Licensed in multiple states – Fully compliant with state insurance regulations",
    color: "text-navy"
  },
  {
    name: "FINRA Compliant",
    icon: <FileCheck className="h-8 w-8" />,
    description: "FINRA-compliant advisory practices – Ensuring regulatory compliance and client protection",
    color: "text-red-600"
  },
  {
    name: "Community Partner",
    icon: <Building2 className="h-8 w-8" />,
    description: "Active member of local business chambers and community organizations",
    color: "text-gold"
  },
];

const CredibilityBadges = () => {
  const [expandedInfo, setExpandedInfo] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/20 to-background border-y border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Affiliations & Industry Credibility
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our advisors partner with respected financial associations, compliance organizations, and industry-leading platforms to ensure every recommendation meets the highest standards of integrity and excellence.
          </p>
        </div>

        <div className="glass p-8 md:p-12 rounded-2xl">
          <TooltipProvider>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {affiliations.map((affiliation, index) => (
                <Tooltip key={affiliation.name} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div
                      className="flex flex-col items-center justify-center text-center space-y-3 p-4 rounded-xl hover:bg-secondary/20 transition-all duration-300 hover:scale-105 group cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${affiliation.color}`}>
                        {affiliation.icon}
                      </div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {affiliation.name}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="max-w-xs text-center p-4 bg-popover/95 backdrop-blur-sm"
                  >
                    <p className="text-sm leading-relaxed">{affiliation.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          {/* Expandable Info Section */}
          <div className="mt-8 pt-8 border-t border-border/40">
            <button
              onClick={() => setExpandedInfo(!expandedInfo)}
              className="text-accent hover:text-accent/80 text-sm font-semibold transition-colors mx-auto block"
            >
              {expandedInfo ? "− Hide" : "+ Learn More"} About These Affiliations
            </button>
            
            {expandedInfo && (
              <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in">
                <p>
                  <strong className="text-foreground">Compliance & Licensing:</strong> All advisors at The Financial Architects maintain active state licenses and adhere to strict regulatory standards. We are committed to operating with full transparency and in compliance with federal and state regulations.
                </p>
                <p>
                  <strong className="text-foreground">Professional Memberships:</strong> Our team actively participates in leading industry organizations, ensuring we stay current with best practices, continuing education requirements, and ethical standards that protect our clients' interests.
                </p>
                <p>
                  <strong className="text-foreground">Community Trust:</strong> We've earned our reputation through decades of service, ethical conduct, and a commitment to putting families first. Our affiliations reflect our dedication to excellence and accountability.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            <span>State Regulated</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-accent" />
            <span>Background Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-accent" />
            <span>Compliance Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            <span>Industry Recognized</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityBadges;
