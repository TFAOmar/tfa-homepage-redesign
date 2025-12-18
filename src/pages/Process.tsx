import ProcessHero from "@/components/process/ProcessHero";
import ProcessSteps from "@/components/process/ProcessSteps";
import ProcessCTA from "@/components/process/ProcessCTA";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Process = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processSteps = [
    {
      name: "Discovery Consultation",
      text: "We start with a complimentary consultation to understand your financial goals, current situation, and concerns. This no-pressure conversation helps us learn what matters most to you and your family."
    },
    {
      name: "Personalized Analysis",
      text: "Our team analyzes your complete financial picture including income, assets, liabilities, insurance coverage, and tax situation to identify opportunities and gaps."
    },
    {
      name: "Custom Strategy Development",
      text: "We create a tailored financial strategy addressing your specific goals for retirement, protection, wealth building, and legacy planning."
    },
    {
      name: "Implementation & Support",
      text: "We guide you through implementing your plan and provide ongoing support, adjusting strategies as your life circumstances change."
    }
  ];

  return (
    <>
      <SEOHead
        title="Our Financial Planning Process"
        description="Discover how The Financial Architects works with you step-by-step to build your personalized financial plan. From consultation to implementation, we guide your journey."
        canonical={`${siteConfig.url}/process`}
        keywords="financial planning process, how financial planning works, wealth management steps, financial advisor consultation, personalized financial plan"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Our Process | The Financial Architects",
            "Learn how we work with you to create and implement your personalized financial plan.",
            `${siteConfig.url}/process`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Our Process", url: `${siteConfig.url}/process` },
          ]),
          generateHowToSchema(
            "How to Create a Personalized Financial Plan with TFA",
            "Step-by-step process for working with The Financial Architects to build your comprehensive financial strategy.",
            processSteps,
            `${siteConfig.url}/process`
          ),
        ]}
      />
      <div className="min-h-screen">
        <ProcessHero />
        <ProcessSteps />
        <ProcessCTA />
      </div>
    </>
  );
};

export default Process;
