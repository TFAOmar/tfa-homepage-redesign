import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicationWizard from "@/components/life-insurance-application/ApplicationWizard";
import tfaLogo from "@/assets/tfa-logo.png";
import { useAdvisorBySlug } from "@/hooks/useDynamicAdvisors";
import { advisors as staticAdvisors } from "@/data/advisors";

// Helper to find static advisor by slug
const findStaticAdvisor = (slug: string) => {
  return staticAdvisors.find(a => a.landingPage === `/advisors/${slug}`);
};

const LifeInsuranceApplication = () => {
  const { advisorSlug } = useParams<{ advisorSlug: string }>();
  const { data: dbAdvisor, isLoading } = useAdvisorBySlug(advisorSlug);
  
  // Hybrid lookup: try database first, then fall back to static data
  const staticAdvisor = advisorSlug ? findStaticAdvisor(advisorSlug) : null;
  const advisor = dbAdvisor || (staticAdvisor ? {
    id: String(staticAdvisor.id),
    name: staticAdvisor.name,
    email: staticAdvisor.email,
    title: staticAdvisor.title,
    image_url: staticAdvisor.image,
    scheduling_link: undefined,
  } : null);

  // Show loading state while fetching advisor
  if (advisorSlug && isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If slug provided but advisor not found in DB or static data, show error
  if (advisorSlug && !isLoading && !advisor && !staticAdvisor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Advisor Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The advisor you're looking for is not available. They may not be accepting applications at this time.
          </p>
          <Link to="/advisors">
            <Button>Browse All Advisors</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Life Insurance Application{advisor ? ` - ${advisor.name}` : ""} | TFA
        </title>
        <meta
          name="description"
          content="Complete your life insurance application online. Secure, confidential, and easy to use."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
        {/* Header - Sticky with safe area support */}
        <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50 safe-area-inset">
          <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <Link to={advisor ? `/advisors/${advisorSlug}` : "/"}>
                  <img src={tfaLogo} alt="TFA" className="h-8 md:h-10 w-auto" />
                </Link>
                <div className="hidden md:block h-6 w-px bg-border" />
                <div className="hidden md:block">
                  <p className="text-sm text-muted-foreground">Life Insurance Application</p>
                  <p className="text-xs text-muted-foreground">Secure & Confidential</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="hidden md:inline">256-bit SSL Encrypted</span>
                  <span className="md:hidden">Secure</span>
                </div>
                {advisor && (
                  <Link to={`/advisors/${advisorSlug}`}>
                    <Button variant="ghost" size="sm" className="gap-1 md:gap-2 min-h-[44px] px-2 md:px-3">
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Back to {advisor.name}</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Mobile optimized padding */}
        <main className="container mx-auto px-3 md:px-4 py-4 md:py-8 pb-safe">
          {/* Page Title - Smaller on mobile */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              Life Insurance Application
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Complete this secure application to get started with your life insurance coverage.
              {advisor && (
                <span className="block mt-1">
                  Your advisor <strong className="text-foreground">{advisor.name}</strong> will review your submission.
                </span>
              )}
            </p>
          </div>

          {/* Application Wizard */}
          <ApplicationWizard
            advisorId={advisor?.id}
            advisorName={advisor?.name}
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LifeInsuranceApplication;
