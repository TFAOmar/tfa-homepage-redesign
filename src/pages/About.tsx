import AboutHero from "@/components/about/AboutHero";
import FoundingStory from "@/components/about/FoundingStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import Timeline from "@/components/about/Timeline";
import NationalImpact from "@/components/about/NationalImpact";
import AboutCTA from "@/components/about/AboutCTA";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="About Us"
        description="Our 20+ year history of helping families build financial security. Meet the leadership team behind The Financial Architects."
        canonical={`${siteConfig.url}/about`}
        keywords="about TFA, financial planning company, financial advisors history, Manuel Soto, wealth management firm, financial planning mission"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "About Us | The Financial Architects",
            "Learn about The Financial Architects' history, mission, values, and leadership team.",
            `${siteConfig.url}/about`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "About", url: `${siteConfig.url}/about` },
          ]),
          generateOrganizationSchema(),
        ]}
      />
      <div className="min-h-screen">
        <AboutHero />
        <FoundingStory />
        <MissionVision />
        <CoreValues />
        <Leadership />
        <Timeline />
        <NationalImpact />
        <AboutCTA />
      </div>
    </>
  );
};

export default About;
