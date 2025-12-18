import EventsHero from "@/components/events/EventsHero";
import EventsList from "@/components/events/EventsList";
import EventsCTA from "@/components/events/EventsCTA";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Upcoming Events & Seminars"
        description="Join The Financial Architects' free educational seminars and workshops on retirement planning, Social Security, Medicare, and wealth management strategies."
        canonical={`${siteConfig.url}/events`}
        keywords="financial planning seminars, retirement workshops, free financial education, Social Security seminar, Medicare workshop, investment seminars"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Events & Seminars | The Financial Architects",
            "Free educational events on retirement planning, Social Security, and wealth management.",
            `${siteConfig.url}/events`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Events", url: `${siteConfig.url}/events` },
          ]),
        ]}
      />
      <div className="min-h-screen">
        <EventsHero />
        <EventsList />
        <EventsCTA />
      </div>
    </>
  );
};

export default Events;
