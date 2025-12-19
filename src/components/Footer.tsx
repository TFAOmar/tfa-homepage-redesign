import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import tfaLogo from "@/assets/tfa-logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img 
                src={tfaLogo} 
                alt="The Financial Architects" 
                className="h-16 w-auto mb-6 brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Building financial legacies through comprehensive wealth planning and personalized advisory services.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/tfainsuranceadvisors" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/tfainsuranceadvisors" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/tfainsuranceadvisors" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-gold transition-colors">Income Planning</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-gold transition-colors">Investment Management</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-gold transition-colors">Estate Planning</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-gold transition-colors">Tax Planning</Link></li>
              <li><Link to="/business-insurance" className="text-primary-foreground/80 hover:text-gold transition-colors">Business Insurance</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/advisors" className="text-primary-foreground/80 hover:text-gold transition-colors">Our Team</Link></li>
              <li><Link to="/careers" className="text-primary-foreground/80 hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/events" className="text-primary-foreground/80 hover:text-gold transition-colors">News & Events</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+18883505396" className="text-primary-foreground/80 hover:text-gold transition-colors">(888) 350-5396</a>
                  <p className="text-primary-foreground/60 text-sm">Mon-Fri 8am-6pm PST</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <a href="mailto:info@tfainsuranceadvisors.com" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  info@tfainsuranceadvisors.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <Link to="/locations" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  13890 Peyton Dr<br />Chino Hills, CA 91709
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 The Financial Architects. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/contact" className="text-primary-foreground/60 hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="text-primary-foreground/60 hover:text-gold transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-primary-foreground/60 hover:text-gold transition-colors">Disclosures</Link>
            </div>
          </div>
          <p className="text-primary-foreground/50 text-xs mt-4 text-center md:text-left">
            Securities and advisory services offered through licensed representatives. Investment advisory services offered through TFA Wealth Planning, LLC. Insurance products and services offered through The Financial Architects.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
