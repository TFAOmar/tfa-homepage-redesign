import { useState, useRef } from "react";
import SEOHead from "@/components/seo/SEOHead";
import { GeneralSponsorshipHero } from "@/components/sponsorship/GeneralSponsorshipHero";
import { EventsShowcase } from "@/components/sponsorship/EventsShowcase";
import { SponsorBenefits } from "@/components/sponsorship/SponsorBenefits";
import { SocialProof } from "@/components/sponsorship/SocialProof";
import { GeneralSponsorshipTiers } from "@/components/sponsorship/GeneralSponsorshipTiers";
import { GeneralSponsorshipForm } from "@/components/sponsorship/GeneralSponsorshipForm";
import { GeneralSponsorshipFAQ } from "@/components/sponsorship/GeneralSponsorshipFAQ";
import { GeneralSponsorshipFinalCTA } from "@/components/sponsorship/GeneralSponsorshipFinalCTA";

const EventSponsorship = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('undecided');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEventSelect = (eventId: string) => {
    if (!selectedEvents.includes(eventId)) {
      setSelectedEvents([...selectedEvents, eventId]);
    }
    scrollToForm();
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedPackage(tierId);
    scrollToForm();
  };

  return (
    <>
      <SEOHead
        title="Sponsor a TFA Event | The Financial Architects"
        description="Sponsor TFA events and get on-stage exposure, booth traffic, and VIP access. 5 annual events, limited sponsor spots. Inquire today."
        canonical="/events/sponsorship"
        keywords="TFA event sponsorship, financial services sponsorship, insurance industry events, sponsor booth, brand exposure"
      />

      <main className="min-h-screen bg-background">
        {/* Hero with FOMO elements */}
        <GeneralSponsorshipHero onInquireNow={scrollToForm} />

        {/* Events showcase */}
        <EventsShowcase onSelectEvent={handleEventSelect} />

        {/* Benefits section */}
        <SponsorBenefits />

        {/* Social proof */}
        <SocialProof />

        {/* Sponsorship tiers */}
        <GeneralSponsorshipTiers onSelectTier={handleTierSelect} />

        {/* Lead capture form */}
        <div ref={formRef}>
          <GeneralSponsorshipForm 
            preselectedEvents={selectedEvents}
            preselectedPackage={selectedPackage}
          />
        </div>

        {/* FAQ */}
        <GeneralSponsorshipFAQ />

        {/* Final CTA */}
        <GeneralSponsorshipFinalCTA onInquireNow={scrollToForm} />
      </main>
    </>
  );
};

export default EventSponsorship;
