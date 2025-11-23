import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface FloatingCTAProps {
  hideOnPages?: string[];
}

const FloatingCTA = ({ hideOnPages = ["/contact"] }: FloatingCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  // Hide on specific pages
  const shouldHide = hideOnPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 800px)
      if (window.scrollY > 800 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 800) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (shouldHide || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-navy/95 backdrop-blur-lg border-t-2 border-gold/30 shadow-[0_-4px_24px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Mobile: Stacked layout */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <p className="text-white text-sm sm:text-base font-medium text-center sm:text-left">
              Ready to secure your financial future?
            </p>
            <Button
              size="default"
              className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-navy font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-gold/40 transition-all duration-200 hover:scale-105"
            >
              Book Free Consultation
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-white/60 hover:text-white transition-colors p-2"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;
