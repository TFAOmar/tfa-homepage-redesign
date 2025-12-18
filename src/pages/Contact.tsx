import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactCTA from "@/components/contact/ContactCTA";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateContactPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with The Financial Architects. Call (888) 350-5396, email us, or visit one of our 19 office locations across California, Arizona, and Oregon."
        canonical={`${siteConfig.url}/contact`}
        keywords="contact financial advisor, financial planner phone number, wealth management contact, TFA contact, financial planning appointment"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Contact Us | The Financial Architects",
            "Contact The Financial Architects for personalized financial planning assistance.",
            `${siteConfig.url}/contact`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Contact", url: `${siteConfig.url}/contact` },
          ]),
          generateContactPageSchema(`${siteConfig.url}/contact`),
        ]}
      />
      <div className="min-h-screen">
        <ContactHero />
        <div className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </div>
        <ContactCTA />
      </div>
    </>
  );
};

export default Contact;
