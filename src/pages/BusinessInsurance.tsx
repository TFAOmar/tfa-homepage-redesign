import { Link } from "react-router-dom";
import { Building2, Briefcase, Wrench, Shield, Phone, CheckCircle } from "lucide-react";
import BusinessContactForm from "@/components/business-insurance/BusinessContactForm";
import businessInsuranceHero from "@/assets/business-insurance-hero.jpg";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateInsuranceAgencySchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const coverages = [
  "General Liability",
  "Business Owners Policy (BOP)",
  "Commercial Property",
  "Workers' Compensation",
  "Commercial Auto & Fleet",
  "Professional Liability (E&O)",
  "Cyber Liability",
  "EPLI (Employment Practices Liability)",
  "Umbrella / Excess Liability",
];

const BusinessInsurance = () => {
  return (
    <>
      <SEOHead
        title="Business Insurance"
        description="Protect what you've built with comprehensive business insurance. General liability, workers' comp, commercial property, and more tailored to your business needs."
        canonical={`${siteConfig.url}/business-insurance`}
        keywords="business insurance, commercial insurance, general liability, workers compensation, commercial property"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Business Insurance | The Financial Architects",
            "Comprehensive business insurance solutions designed to protect what you've built.",
            `${siteConfig.url}/business-insurance`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Business Insurance", url: `${siteConfig.url}/business-insurance` },
          ]),
          generateInsuranceAgencySchema(
            "TFA Business Insurance",
            "Expert commercial insurance solutions for businesses of all sizes.",
            `${siteConfig.url}/business-insurance`,
            coverages
          ),
        ]}
      />
      <div className="bg-gradient-to-b from-[#0A0F1F] to-[#131A2A] min-h-screen text-white font-sans">
      {/* SECTION 1 — HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={businessInsuranceHero}
            alt="Business Insurance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F]/90 via-[#0A0F1F]/80 to-[#131A2A]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            Business Insurance Designed to{" "}
            <span className="text-[#E4B548]">Protect What You've Built</span>
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto text-lg md:text-xl mb-10">
            Financial Architects Insurance Inc. helps business owners secure the right commercial
            insurance — liability, property, workers' comp, commercial auto, and more — tailored
            to how your business operates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#intake-form"
              data-analytics-id="hero-cta-request-review"
              className="btn-primary-cta px-8 py-4"
            >
              Request a Business Insurance Review
            </a>
            <a
              href="tel:+18005551234"
              data-analytics-id="hero-cta-call"
              className="flex items-center gap-2 text-white/80 hover:text-[#E4B548] transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHO WE SERVE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
            Built for <span className="text-[#E4B548]">Real-World Business Owners</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-center mb-12">
            We understand the unique risks each business type faces and design coverage accordingly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-xl bg-[#E4B548]/20 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#E4B548]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Small Businesses & Startups</h3>
              <p className="text-white/70">
                Retail, food service, home-based, and new ventures needing simple, strong coverage.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-xl bg-[#E4B548]/20 flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-[#E4B548]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Offices</h3>
              <p className="text-white/70">
                CPAs, lawyers, medical providers, consultants, financial offices.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-xl bg-[#E4B548]/20 flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-[#E4B548]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contractors & Service Companies</h3>
              <p className="text-white/70">
                Trades, logistics, field crews, equipment, multi-vehicle operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — COVERAGES WE OFFER */}
      <section className="py-16 md:py-24 bg-[#0A0F1F]/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
            Commercial Insurance Coverages We <span className="text-[#E4B548]">Commonly Review</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-center mb-12">
            We design coverage around your risks, contracts, and budget — not a one-size-fits-all template.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {coverages.map((coverage) => (
              <div
                key={coverage}
                className="rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm font-medium hover:bg-[#E4B548]/20 hover:border-[#E4B548]/40 transition-all cursor-default"
              >
                {coverage}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR SIMPLE 3-STEP PROCESS */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
            How We Help You <span className="text-[#E4B548]">Protect Your Business</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-center mb-12">
            Our streamlined process makes getting the right coverage simple and stress-free.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E4B548] text-black font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn Your Business</h3>
              <p className="text-white/70">
                Quick call + simple questionnaire to understand how you operate.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E4B548] text-black font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Review Current Coverage</h3>
              <p className="text-white/70">
                Identify gaps, overlaps, and opportunities.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E4B548] text-black font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Design a Custom Protection Plan</h3>
              <p className="text-white/70">
                Clear options aligned with your risks and cash flow.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#intake-form"
              data-analytics-id="process-cta-start-review"
              className="inline-block btn-primary-cta px-8 py-4"
            >
              Start My Business Insurance Review
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CHOOSE FINANCIAL ARCHITECTS */}
      <section className="py-16 md:py-24 bg-[#0A0F1F]/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
            Why Business Owners <span className="text-[#E4B548]">Trust Our Team</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-center mb-12">
            We go beyond just selling policies — we become your partner in protection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#E4B548] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Integrated Planning</h3>
                  <p className="text-white/70">
                    Your commercial insurance aligns with tax, retirement, and estate planning.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#E4B548] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Independent Access</h3>
                  <p className="text-white/70">
                    We shop multiple carriers to fit your risk and budget.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#E4B548] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Claims-Focused Thinking</h3>
                  <p className="text-white/70">
                    Designed for your worst day, not the cheapest premium.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-6 md:p-8 transition-all hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#E4B548] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ongoing Review</h3>
                  <p className="text-white/70">
                    As your business grows, we update coverage accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — INTAKE FORM */}
      <section id="intake-form" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-black/40 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Tell Us About Your <span className="text-[#E4B548]">Business</span>
              </h2>
              <p className="text-white/70">
                Complete this form and our team will reach out within 24 hours.
              </p>
            </div>
            <BusinessContactForm />
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#131A2A] to-[#0A0F1F]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-16 h-16 text-[#E4B548] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Make Sure Your Business Is{" "}
            <span className="text-[#E4B548]">Properly Protected?</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            We'll review your existing coverage, identify gaps, and help you secure a plan that
            protects your company and cash flow.
          </p>
          <Link
            to="/contact"
            data-analytics-id="final-cta-book-consultation"
            className="inline-block rounded-full bg-[#E4B548] text-black font-semibold px-10 py-5 text-lg hover:shadow-[0_0_25px_rgba(228,181,72,0.45)] transition-all"
          >
            Book My Business Insurance Consultation
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default BusinessInsurance;
