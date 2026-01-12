import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";
import tfaLogo from "@/assets/tfa-logo.png";

const EstateGuruHeader = () => {
  const { header } = estateGuruContent;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToRegister = () => {
    const element = document.querySelector("#register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1F3B]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src={tfaLogo} alt="TFA Logo" className="h-10 w-auto brightness-0 invert" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {header.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={header.demoLink}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {header.secondaryCta}
            </a>
            <Button
              onClick={scrollToRegister}
              className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold px-6"
            >
              {header.primaryCta}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0B1F3B]/98 backdrop-blur-md border-t border-white/10">
            <nav className="flex flex-col py-4">
              {header.navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white/80 hover:text-white hover:bg-white/5 px-4 py-3 text-left font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-white/10 mt-2 pt-4 px-4 flex flex-col gap-3">
                <a
                  href={header.demoLink}
                  className="text-white/80 hover:text-white font-medium py-2"
                >
                  {header.secondaryCta}
                </a>
                <Button
                  onClick={scrollToRegister}
                  className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold w-full"
                >
                  {header.primaryCta}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default EstateGuruHeader;
