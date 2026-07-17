import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import tfaLogo from "@/assets/tfa-logo.png";

interface LandingHeaderProps {
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
}

const LandingHeader = ({
  ctaLabel = "Book Consultation",
  ctaHref = "/book-consultation",
  ctaExternal = false,
}: LandingHeaderProps) => {
  const button = (
    <Button className="btn-primary-cta px-4 sm:px-6 py-2 sm:py-5 text-sm">
      {ctaLabel}
    </Button>
  );
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
          </Link>
          {ctaExternal ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              {button}
            </a>
          ) : (
            <Link to={ctaHref}>{button}</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;