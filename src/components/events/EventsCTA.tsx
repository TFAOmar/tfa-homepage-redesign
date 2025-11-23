import { Button } from "@/components/ui/button";
import { Calendar, Bell } from "lucide-react";

const EventsCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Reserve Your Spot Today
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Our events fill up quickly. Secure your place at an upcoming workshop or webinar and take the next step in your financial education journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 neuro-button"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Browse All Events
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground text-lg px-8 py-6"
            >
              <Bell className="mr-2 h-5 w-5" />
              Get Event Notifications
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            All events are complimentary and open to the public • No sales pitches, just education
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsCTA;
