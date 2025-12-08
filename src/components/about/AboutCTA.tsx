import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience the TFA difference. Schedule a complimentary consultation with one of our expert advisors and discover how we can help you build the financial future you envision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-consultation">
              <Button 
                size="lg" 
                className="btn-primary-cta px-8 py-6 text-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Consultation
              </Button>
            </Link>
            
            <a href="tel:+18778324872">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (877) 832-4872
              </Button>
            </a>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            No pressure. No obligation. Just honest conversation about your financial goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
