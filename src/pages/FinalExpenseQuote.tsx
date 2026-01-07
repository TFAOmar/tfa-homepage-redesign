import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const FinalExpenseQuote = () => {
  return (
    <>
      <SEOHead
        title="Final Expense Quote Tool | TFA Financial Advisors"
        description="Get instant Final Expense insurance quotes for your clients. Simple, fast quoting tool for TFA agents."
        keywords="final expense insurance, burial insurance, funeral insurance, life insurance quote, agent tools"
      />
      <JsonLd data={generateWebPageSchema(
        "Final Expense Quote Tool",
        "Agent tool for generating Final Expense insurance quotes",
        `${siteConfig.url}/tools/final-expense-quote`
      )} />

      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        {/* Hero Section */}
        <div className="pt-24 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Final Expense Quote Tool
              </h1>
            </div>

            <p className="text-lg text-white/80 max-w-2xl">
              Quickly generate Final Expense insurance quotes for your clients. 
              Enter client details below to get instant quotes from multiple carriers.
            </p>
          </div>
        </div>

        {/* Iframe Section */}
        <div className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <iframe
                style={{ border: "none", height: "800px", width: "100%" }}
                src="https://insurancetoolkits.com/fex/lite-form/?token=q1kl93CCvtQ4wSGpighrgxo222Tzg8_9DMGKux4K"
                title="Final Expense Quote Tool"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalExpenseQuote;
