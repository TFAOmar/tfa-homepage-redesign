import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import AdvisorPreview from "@/components/AdvisorPreview";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import FloatingCTA from "@/components/FloatingCTA";
import { SEOHead, JsonLd } from "@/components/seo";
import { siteConfig } from "@/lib/seo/siteConfig";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
} from "@/lib/seo/schemas";

const Index = () => {
  const schemas = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateWebPageSchema(
      "Expert Financial Planning & Wealth Management",
      siteConfig.description,
      siteConfig.url
    ),
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Expert Financial Planning & Wealth Management"
        description="Trusted financial advisors providing retirement planning, life insurance, estate planning, and wealth management. 280+ licensed advisors across 19 locations in California, Arizona, and Oregon."
        canonical={siteConfig.url}
        keywords="financial planning, retirement planning, life insurance, estate planning, wealth management, financial advisors, Chino Hills, California, Arizona, Oregon"
      />
      <JsonLd data={schemas} />
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <AdvisorPreview />
      <Testimonials />
      <FinalCTA />
      <FloatingCTA />
    </div>
  );
};

export default Index;
