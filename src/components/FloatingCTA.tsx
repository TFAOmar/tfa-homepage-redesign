import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  showOnTablet?: boolean;
  hideOnPages?: string[];
}

const FloatingCTA = ({ showOnTablet = false, hideOnPages = ["/contact"] }: FloatingCTAProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Hide on specific pages
  const shouldHide = hideOnPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolling up, hide when scrolling down fast
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up or near top
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (shouldHide) return null;

  return (
    <Link to="/contact">
      <button
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl transition-all duration-300",
          "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-semibold",
          "hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95",
          "backdrop-blur-sm border border-accent/20",
          // Mobile only by default
          showOnTablet ? "md:hidden" : "lg:hidden",
          // Visibility animation
          isVisible 
            ? "translate-y-0 opacity-100" 
            : "translate-y-24 opacity-0 pointer-events-none"
        )}
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25), 0 0 20px rgba(212, 175, 55, 0.3)",
          minHeight: "48px",
        }}
      >
        <Calendar className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">
          Book Consultation
        </span>
      </button>
    </Link>
  );
};

export default FloatingCTA;
