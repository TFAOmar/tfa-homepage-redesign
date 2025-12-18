import { useEffect } from "react";
import CareersHero from "@/components/careers/CareersHero";
import CareerPaths from "@/components/careers/CareerPaths";
import WhyJoinTFA from "@/components/careers/WhyJoinTFA";
import AgentPath from "@/components/careers/AgentPath";
import FranchisePath from "@/components/careers/FranchisePath";
import CareersInquiryForm from "@/components/careers/CareersInquiryForm";
import CareersCTA from "@/components/careers/CareersCTA";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateJobPostingSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Career Opportunities"
        description="Join The Financial Architects team. Explore career paths as a licensed financial advisor or franchise owner. Competitive compensation, training, and growth opportunities."
        canonical={`${siteConfig.url}/careers`}
        keywords="financial advisor jobs, insurance agent careers, franchise opportunities, financial planning careers, join TFA, financial services jobs"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Careers | The Financial Architects",
            "Explore career opportunities with The Financial Architects.",
            `${siteConfig.url}/careers`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Careers", url: `${siteConfig.url}/careers` },
          ]),
          generateJobPostingSchema(
            "Licensed Financial Advisor",
            "Join our team of 280+ licensed advisors. Help families achieve financial security while building your own successful practice. Full training and support provided.",
            `${siteConfig.url}/careers`
          ),
        ]}
      />
      <div className="min-h-screen">
        <CareersHero />
        <CareerPaths />
        <WhyJoinTFA />
        <AgentPath />
        <FranchisePath />
        <CareersInquiryForm />
        <CareersCTA />
      </div>
    </>
  );
};

export default Careers;
