import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";
import { ONBOARDING_RESOURCES } from "@/data/onboardingResources";

import tfaLogo from "@/assets/tfa-logo.png";
import skoolLogo from "@/assets/resources/skool-logo.png";
import pipedriveLogo from "@/assets/resources/pipedrive-logo.png";
import signalAdvisorsLogo from "@/assets/resources/signal-advisors-logo.png";

const logoMap: Record<string, string> = {
  "/src/assets/tfa-logo.png": tfaLogo,
  "/src/assets/resources/skool-logo.png": skoolLogo,
  "/src/assets/resources/pipedrive-logo.png": pipedriveLogo,
  "/src/assets/resources/signal-advisors-logo.png": signalAdvisorsLogo,
};

export const ResourcesPanel = () => {
  return (
    <div className="space-y-6 no-print">
      {/* Header with icon */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/20 text-accent">
          <BookOpen className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-navy">Resources</h2>
      </div>
      
      {/* Resource cards with glass styling */}
      <div className="grid gap-4">
        {ONBOARDING_RESOURCES.map((resource) => (
          <Card 
            key={resource.key} 
            className="glass border border-border/50 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group"
          >
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center gap-4">
                {resource.logo && logoMap[resource.logo] && (
                  <div className="h-16 w-16 flex items-center justify-center flex-shrink-0 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <img 
                      src={logoMap[resource.logo]} 
                      alt={`${resource.title} logo`}
                      className="max-h-12 max-w-12 object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-bold text-navy group-hover:text-accent transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {resource.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {resource.buttonText}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};