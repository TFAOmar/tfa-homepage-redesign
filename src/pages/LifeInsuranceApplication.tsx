import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicationWizard from "@/components/life-insurance-application/ApplicationWizard";
import tfaLogo from "@/assets/tfa-logo.png";

// Static advisor mapping for now - can be extended with dynamic lookup
const ADVISOR_SLUGS: Record<string, { name: string; email: string; id: string }> = {
  "vanessa-sanchez": {
    id: "vanessa-sanchez",
    name: "Vanessa Sanchez",
    email: "vsanchez@tfaconnect.com",
  },
  "mariah-lorenzen": {
    id: "mariah-lorenzen",
    name: "Mariah Lorenzen",
    email: "mlorenzen@tfaconnect.com",
  },
  "tamara-lee": {
    id: "tamara-lee",
    name: "Tamara Lee",
    email: "tlee@tfaconnect.com",
  },
  "ismael-ververa": {
    id: "ismael-ververa",
    name: "Ismael Ververa",
    email: "iververa@tfaconnect.com",
  },
  "manuel-soto": {
    id: "manuel-soto",
    name: "Manuel Soto",
    email: "msoto@tfaconnect.com",
  },
};

const LifeInsuranceApplication = () => {
  const { advisorSlug } = useParams<{ advisorSlug: string }>();
  const advisor = advisorSlug ? ADVISOR_SLUGS[advisorSlug] : undefined;

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
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={advisor ? `/advisors/${advisorSlug}` : "/"}>
                  <img src={tfaLogo} alt="TFA" className="h-10 w-auto" />
                </Link>
                <div className="hidden md:block h-6 w-px bg-border" />
                <div className="hidden md:block">
                  <p className="text-sm text-muted-foreground">Life Insurance Application</p>
                  <p className="text-xs text-muted-foreground">Secure & Confidential</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>256-bit SSL Encrypted</span>
                </div>
                {advisor && (
                  <Link to={`/advisors/${advisorSlug}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to {advisor.name}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Life Insurance Application
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
            advisorEmail={advisor?.email}
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
