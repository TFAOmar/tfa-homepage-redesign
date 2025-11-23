import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={tfaLogo} 
              alt="The Financial Architects" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground hover:text-accent font-medium transition-colors">
              Home
            </a>
            <a href="/about" className="text-foreground hover:text-accent font-medium transition-colors">
              About Us
            </a>
            <a href="/services" className="text-foreground hover:text-accent font-medium transition-colors">
              Services
            </a>
            <a href="/#advisors" className="text-foreground hover:text-accent font-medium transition-colors">
              Advisors
            </a>
            <a href="/#locations" className="text-foreground hover:text-accent font-medium transition-colors">
              Locations
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
              Book Consultation
            </Button>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
