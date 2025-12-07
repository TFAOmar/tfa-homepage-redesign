import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Ready to Take the Next Step?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Schedule a complimentary consultation with one of our expert advisors. No pressure, no sales pitch—just honest conversation about your financial future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-consultation">
              <Button 
                size="lg" 
                className="rounded-full bg-[#E4B548] text-black font-semibold px-8 py-6 text-lg hover:shadow-[0_0_25px_rgba(228,181,72,0.45)] transition-all"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Consultation
              </Button>
            </Link>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground text-lg px-8 py-6"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Live Chat
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Free consultation • Available in-person or virtually • No obligation
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
