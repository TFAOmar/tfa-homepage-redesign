import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import tfaLogo from "@/assets/tfa-logo.png";

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10 w-auto" />
          </Link>
          <Link to="/book-consultation">
            <Button className="btn-primary-cta px-4 sm:px-6 py-2 sm:py-5 text-sm">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;