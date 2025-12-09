import { useEffect } from "react";

const EventsList = () => {
  useEffect(() => {
    // Set the global event calendar ID
    (window as any).eventCalId = 16030;

    // Create and load the integration script
    const integrationScript = document.createElement("script");
    integrationScript.async = true;
    integrationScript.setAttribute("src", "https://api.eventcalendarapp.com/integration-script.js");
    document.head.appendChild(integrationScript);

    integrationScript.onload = () => {
      if ((window as any).eventCalendarAppUtilities) {
        (window as any).eventCalendarAppUtilities.init("c39fe183-ac9d-439a-b75f-7073faf60a47");
      }
    };

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(integrationScript)) {
        document.head.removeChild(integrationScript);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground">
            Join us for free educational workshops and webinars designed to help you make informed financial decisions
          </p>
        </div>

        {/* Embedded Calendar */}
        <div className="max-w-6xl mx-auto">
          <div 
            className="eca-app-container glass rounded-2xl p-4 min-h-[600px]" 
            data-widgetuuid="c39fe183-ac9d-439a-b75f-7073faf60a47"
          />
        </div>
      </div>
    </section>
  );
};

export default EventsList;
