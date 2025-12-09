import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const CareersCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Whether you're looking to become a licensed agent or explore franchise opportunities, 
            we're here to help you take the first step toward financial independence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg group">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/book-consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Schedule a Call
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white/80">
            <a href="tel:8778324872" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-5 w-5" />
              <span>(877) 832-4872</span>
            </a>
            <a href="mailto:info@tfainsuranceadvisors.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-5 w-5" />
              <span>info@tfainsuranceadvisors.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>19+ Locations Nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersCTA;
