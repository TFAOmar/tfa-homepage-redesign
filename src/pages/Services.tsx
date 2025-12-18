import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesCTA from "@/components/services/ServicesCTA";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Financial Services Overview"
        description="Explore The Financial Architects' comprehensive financial services including retirement planning, life insurance, estate planning, tax strategies, and investment management."
        canonical={`${siteConfig.url}/services`}
        keywords="financial services, retirement planning services, life insurance, estate planning, tax planning, investment management, annuities, 401k rollover"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Financial Services | The Financial Architects",
            "Comprehensive financial planning services for individuals and families.",
            `${siteConfig.url}/services`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Services", url: `${siteConfig.url}/services` },
          ]),
          generateServiceSchema(
            "Comprehensive Financial Planning",
            "Full-service financial planning including retirement, insurance, estate planning, and investment management.",
            `${siteConfig.url}/services`
          ),
        ]}
      />
      <div className="min-h-screen">
        <ServicesHero />
        <ServicesList />
        <ServicesCTA />
      </div>
    </>
  );
};

export default Services;
