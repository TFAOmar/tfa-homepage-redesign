import { estateGuruContent } from "@/pages/EstateGuru";
import tfaLogo from "@/assets/tfa-logo.png";

const EstateGuruFooter = () => {
  const { footer, header } = estateGuruContent;

  return (
    <footer className="bg-[#0B1F3B] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Contact */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={tfaLogo} alt="TFA Logo" className="h-10 w-auto" />
              <span className="font-semibold text-lg">{header.logoText}</span>
            </div>
            <div className="space-y-2 text-white/70">
              <p>{footer.address}</p>
              <p>
                <a href={`tel:${footer.phone.replace(/\D/g, '')}`} className="hover:text-[#D4AF37] transition-colors">
                  {footer.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${footer.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {footer.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Disclaimer */}
          <div>
            <h4 className="font-semibold mb-4">Important Notice</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              {footer.disclaimer}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default EstateGuruFooter;
