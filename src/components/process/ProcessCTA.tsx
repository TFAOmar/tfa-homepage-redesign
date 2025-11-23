import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const ProcessCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Ready to Experience Our Process?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Take the first step toward financial clarity. Schedule a complimentary consultation and discover how our proven process can help you achieve your goals.
          </p>

          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-6 neuro-button"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Your Consultation
          </Button>

          <p className="text-muted-foreground mt-6 text-sm">
            No pressure. No sales pitch. Just honest conversation about your financial future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessCTA;
