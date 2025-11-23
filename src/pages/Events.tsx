import EventsHero from "@/components/events/EventsHero";
import EventsList from "@/components/events/EventsList";
import EventsCTA from "@/components/events/EventsCTA";
import { useEffect } from "react";

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <EventsHero />
      <EventsList />
      <EventsCTA />
    </div>
  );
};

export default Events;
