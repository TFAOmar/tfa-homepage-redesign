import { SEOHead } from "@/components/seo";
import EventSubmissionHero from "@/components/events/EventSubmissionHero";
import EventSubmissionForm from "@/components/events/EventSubmissionForm";

const SubmitEvent = () => {
  return (
    <>
      <SEOHead
        title="Submit Your Event | TFA Insurance"
        description="Submit your event details for inclusion on the TFA community calendar. Share workshops, webinars, and community events with our network."
        canonical="/submit-event"
      />
      <EventSubmissionHero />
      <EventSubmissionForm />
    </>
  );
};

export default SubmitEvent;
