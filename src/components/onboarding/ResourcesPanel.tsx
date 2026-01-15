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
    <div className="space-y-4 no-print">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Resources</h2>
      </div>
      
      <div className="grid gap-3">
        {ONBOARDING_RESOURCES.map((resource) => (
          <Card 
            key={resource.key} 
            className="border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors"
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start gap-3">
                {resource.logo && logoMap[resource.logo] && (
                  <div className="h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={logoMap[resource.logo]} 
                      alt={`${resource.title} logo`}
                      className="max-h-8 max-w-8 object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {resource.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                asChild
              >
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {resource.buttonText}
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
