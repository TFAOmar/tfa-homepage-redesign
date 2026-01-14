import { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { SponsorshipHero } from "@/components/sponsorship/SponsorshipHero";
import { EventOverview } from "@/components/sponsorship/EventOverview";
import { WhySponsor } from "@/components/sponsorship/WhySponsor";
import { SponsorshipPackages, type SponsorshipPackage } from "@/components/sponsorship/SponsorshipPackages";
import { SponsorApplicationForm } from "@/components/sponsorship/SponsorApplicationForm";
import { SponsorshipFAQ } from "@/components/sponsorship/SponsorshipFAQ";
import { SponsorshipFinalCTA } from "@/components/sponsorship/SponsorshipFinalCTA";
import { 
  generateWebPageSchema, 
  generateOrganizationSchema,
  generateEventSchema 
} from "@/lib/seo/schemas";

const TFA2026KickoffSponsorship = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<SponsorshipPackage | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  const scrollToPackages = useCallback(() => {
    packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToForm = useCallback((packageId?: SponsorshipPackage) => {
    if (packageId) {
      setSelectedPackage(packageId);
      // Track package selection
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'sponsorship_package_click',
          sponsorship_package: packageId,
        });
      }
    }
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleDownloadPDF = useCallback(() => {
    // Track PDF download
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'sponsorship_pdf_download',
      });
    }
    // Open PDF in new tab (placeholder - can be replaced with actual PDF)
    window.open('/sponsorship-packet.pdf', '_blank');
  }, []);

  const handleTalkToTeam = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // Schema markup
  const pageSchema = generateWebPageSchema(
    "TFA 2026 Kick Off Sponsorships | The Financial Architects",
    "Sponsor the TFA 2026 Kick Off and get on-stage exposure, booth traffic, and VIP tickets. Choose a package and apply in minutes.",
    "https://tfawealthplanning.lovable.app/events/tfa-2026-kickoff-sponsorship"
  );

  const eventSchema = generateEventSchema(
    "TFA 2026 Kick Off",
    "The TFA 2026 Kick Off is our once-a-year live event where agents, brokers, and clients align on strategy, sharpen skills, and set bold goals for the year ahead.",
    "2026-01-01",
    "2026-01-01",
    "Los Angeles, CA",
    "https://tfawealthplanning.lovable.app/events/tfa-2026-kickoff-sponsorship"
  );

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    "name": "TFA 2026 Kick Off Sponsorship Packages",
    "lowPrice": "500",
    "highPrice": "4000",
    "priceCurrency": "USD",
    "offerCount": 3,
    "offers": [
      {
        "@type": "Offer",
        "name": "Title Sponsor",
        "price": "4000",
        "priceCurrency": "USD",
        "description": "Promo Video Feature, 15 minutes on stage, booth, 2 VIP + 6 GA tickets"
      },
      {
        "@type": "Offer",
        "name": "Supporting Sponsor",
        "price": "2000",
        "priceCurrency": "USD",
        "description": "5 minutes on stage, booth, 2 VIP + 2 GA tickets"
      },
      {
        "@type": "Offer",
        "name": "Community Sponsor",
        "price": "500",
        "priceCurrency": "USD",
        "description": "Shout out, booth, 2 GA tickets"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>TFA 2026 Kick Off Sponsorships | The Financial Architects</title>
        <meta 
          name="description" 
          content="Sponsor the TFA 2026 Kick Off and get on-stage exposure, booth traffic, and VIP tickets. Choose a package and apply in minutes." 
        />
        <meta 
          name="keywords" 
          content="TFA 2026, event sponsorship, financial services sponsorship, TFA Kick Off, sponsor booth, on-stage promotion" 
        />
        <link rel="canonical" href="https://tfawealthplanning.com/events/tfa-2026-kickoff-sponsorship" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TFA 2026 Kick Off Sponsorships | The Financial Architects" />
        <meta property="og:description" content="Sponsor the TFA 2026 Kick Off and get on-stage exposure, booth traffic, and VIP tickets." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tfawealthplanning.com/events/tfa-2026-kickoff-sponsorship" />
        <meta property="og:image" content="https://tfawealthplanning.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://tfawealthplanning.com/og-image.jpg" />
        
        {/* Schema markup */}
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(offerSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(generateOrganizationSchema())}</script>
      </Helmet>

      <main className="min-h-screen">
        <SponsorshipHero onBecomeASponsor={scrollToPackages} />
        
        <EventOverview />
        
        <WhySponsor />
        
        <div ref={packagesRef}>
          <SponsorshipPackages onSelectPackage={(pkg) => scrollToForm(pkg)} />
        </div>
        
        <div ref={formRef}>
          <SponsorApplicationForm 
            selectedPackage={selectedPackage}
            onPackageChange={setSelectedPackage}
          />
        </div>
        
        <SponsorshipFAQ />
        
        <SponsorshipFinalCTA 
          onBecomeASponsor={scrollToPackages}
          onTalkToTeam={handleTalkToTeam}
        />
      </main>
    </>
  );
};

export default TFA2026KickoffSponsorship;
