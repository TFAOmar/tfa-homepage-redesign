import { useState } from "react";
import { Shield, Users, Heart, Phone, CheckCircle, Building2, UserCheck, FileText, Headphones, CreditCard, FileCheck, IdCard, MapPin, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import tfaLogo from "@/assets/tfa-logo.png";
import awhLogo from "@/assets/partners/american-way-health.png";
import anthonyBottleyImg from "@/assets/advisors/anthony-bottley.jpg";
import AmericanWayHealthForm from "@/components/health-insurance/AmericanWayHealthForm";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

// Health insurance carrier logos
import cignaLogo from "@/assets/carriers/health/cigna.png";
import humanaLogo from "@/assets/carriers/health/humana.png";
import aetnaLogo from "@/assets/carriers/health/aetna.png";
import ambetterLogo from "@/assets/carriers/health/ambetter-health.png";
import molinaLogo from "@/assets/carriers/health/molina-healthcare.png";
import bluecrossLogo from "@/assets/carriers/health/bluecross-blueshield.png";
import oscarLogo from "@/assets/carriers/health/oscar.png";
import unitedLogo from "@/assets/carriers/health/united-healthcare.png";
import firstHealthLogo from "@/assets/carriers/health/first-health-network.png";
import marketplaceLogo from "@/assets/carriers/health/health-insurance-marketplace.png";

const PHONE_NUMBER = "321-356-3450";
const PHONE_TEL = "tel:+13213563450";

const scrollToForm = () => {
  document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
};

const benefits = [
  {
    icon: UserCheck,
    title: "Individual & Family Plans",
    description: "Comprehensive health coverage tailored to your personal and family needs.",
  },
  {
    icon: Building2,
    title: "Business & Group Health",
    description: "Affordable group plans to protect your employees and attract top talent.",
  },
  {
    icon: Heart,
    title: "Medicare Options",
    description: "Expert guidance on Medicare supplements and Advantage plans.",
  },
  {
    icon: Shield,
    title: "Expert Guidance",
    description: "Licensed specialists help you navigate the complex health insurance landscape.",
  },
];

const insurancePlans = [
  "Short-Term Health",
  "Long-Term Health",
  "Marketplace Plans (ACA)",
  "Individual Plans",
  "Family Plans",
  "Group Plans",
  "Accident Insurance",
  "Catastrophic Coverage",
  "Critical Illness",
  "Cancer Insurance",
];

const whyUsFeatures = [
  { icon: Headphones, text: "Live licensed health insurance agents." },
  { icon: CreditCard, text: "Create and view your Payment Statements." },
  { icon: FileCheck, text: "Review your Explanations of Benefits." },
  { icon: IdCard, text: "Print and order your ID cards." },
  { icon: MapPin, text: "Locate Preferred Providers in your network." },
];

const insuranceCarriers = [
  { name: "Cigna", logo: cignaLogo },
  { name: "Humana", logo: humanaLogo },
  { name: "Aetna", logo: aetnaLogo },
  { name: "Ambetter Health", logo: ambetterLogo },
  { name: "Molina Healthcare", logo: molinaLogo },
  { name: "BlueCross BlueShield", logo: bluecrossLogo },
  { name: "Oscar", logo: oscarLogo },
  { name: "United Healthcare", logo: unitedLogo },
  { name: "First Health Network", logo: firstHealthLogo },
  { name: "Health Insurance Marketplace", logo: marketplaceLogo },
];

const steps = [
  {
    number: "1",
    title: "Submit Your Information",
    description: "Fill out the quick form below with your coverage needs.",
  },
  {
    number: "2",
    title: "Receive Your Quote",
    description: "A licensed specialist will contact you within 24 hours with options.",
  },
  {
    number: "3",
    title: "Get Covered",
    description: "Choose the plan that fits your needs and budget—no pressure.",
  },
];

const AmericanWayHealth = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="American Way Health - Health Insurance Solutions"
        description="Affordable health coverage for individuals, families, and businesses. Expert guidance on individual, group, and Medicare health insurance options. Call 888-669-7553 for a free quote."
        canonical={`${siteConfig.url}/american-way-health`}
        keywords="health insurance, individual health plans, family health insurance, group health, Medicare, ACA marketplace"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "American Way Health | The Financial Architects",
            "Affordable health coverage for you, your family, and your business.",
            `${siteConfig.url}/american-way-health`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Health Insurance", url: `${siteConfig.url}/american-way-health` },
          ]),
          generateServiceSchema(
            "Health Insurance Services",
            "Individual, family, and group health insurance solutions.",
            `${siteConfig.url}/american-way-health`
          ),
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-primary via-navy to-primary">
        {/* Co-Branded Header with Phone CTA */}
        <header className="py-4 px-6 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              <img src={tfaLogo} alt="The Financial Architects" className="h-10 md:h-12" />
              <div className="h-8 w-px bg-gray-200" />
              <img src={awhLogo} alt="American Way Health" className="h-10 md:h-12" />
            </div>
            <div className="flex items-center gap-4">
              <a
                href={PHONE_TEL}
                className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-full transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
              <div className="hidden lg:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">Anthony Bottley</p>
                  <p className="text-xs text-muted-foreground">President, American Way Health</p>
                </div>
                <img 
                  src={anthonyBottleyImg} 
                  alt="Anthony Bottley" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Phone CTA Banner */}
        <div className="bg-green-600 py-3 px-6 text-center">
          <a href={PHONE_TEL} className="inline-flex items-center gap-2 text-white font-bold text-lg hover:underline">
            <Phone className="w-5 h-5" />
            Call Now for a Fast FREE Quote: {PHONE_NUMBER}
          </a>
        </div>

        {/* Hero Section */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-accent font-semibold text-lg mb-4 tracking-wide">GET FREE INSURANCE QUOTES NOW</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              EASY WAY TO SHOP FOR INSURANCE
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
              GET EXACTLY WHAT YOU NEED
            </p>
            <p className="text-lg text-white/70 mb-8">
              PERSONAL PLANS / FAMILY PLANS / GROUP PLANS
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={scrollToForm}
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full"
              >
                Get Your Free Quote
              </Button>
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-medium">Watch Video</span>
              </button>
            </div>
            <p className="text-white/60 mt-4 text-sm">No obligation. No cost. Just answers.</p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why Choose American Way Health
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all"
                >
                  <benefit.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Plans Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Insurance Plans We Offer
            </h2>
            <p className="text-white/70 text-center mb-8 max-w-3xl mx-auto">
              We provide comprehensive coverage options to fit every situation and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {insurancePlans.map((plan, index) => (
                <span
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm"
                >
                  {plan}
                </span>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Major Medical ACA / Marketplace Plans</h3>
              <p className="text-white/80 mb-4">
                Major Medical ACA plans, also known as Marketplace Plans, were developed to help individuals access affordable health insurance through a federally regulated marketplace. These plans offer comprehensive coverage and are available for purchase during the annual Open Enrollment period.
              </p>
              <p className="text-white/70">
                To qualify, you must enroll during Open Enrollment. However, you may still be eligible if you've experienced a qualifying life event such as changing jobs, getting married or divorced, or moving. We'll help determine your eligibility and match you with the best Major Medical ACA or Marketplace Plan for your needs.
              </p>
              <div className="mt-6">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  Call us today: {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Companies Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              INSURANCE COMPANIES
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              We compare health insurance plans from recognized companies nationwide.
            </p>
            <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-sm">
              Don't assume your current health insurance plan is still the right fit. American Way Health compares plans from more than 200 insurance companies nationwide to find the right plan, that's the right fit, at no cost to you.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {insuranceCarriers.map((carrier, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 flex items-center justify-center h-32 border border-gray-100 hover:border-accent/30 transition-colors"
                >
                  <img
                    src={carrier.logo}
                    alt={carrier.name}
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
              >
                <Phone className="w-4 h-4" />
                Contact us today: {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-16 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              WHY US?
            </h2>
            <p className="text-white/70 text-center mb-12">What we offer to you</p>
            <div className="space-y-4">
              {whyUsFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary font-bold text-lg flex items-center justify-center">
                    {index + 1}
                  </div>
                  <feature.icon className="w-6 h-6 text-accent flex-shrink-0" />
                  <p className="text-white font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              AMERICAN WAY HEALTH
            </h2>
            <p className="text-white/80 text-lg mb-6">
              We've got you covered! Contact us today to see what a difference we can make in getting you the coverage you need.
            </p>
            <p className="text-white/70 mb-8">
              At American Way Health we have been helping people everyday find health insurance that is right for them without all the confusion and hassles. It is our goal for you to have a positive experience buying insurance with us.
            </p>
            <blockquote className="text-2xl md:text-3xl font-bold text-accent italic mb-8">
              "WE OFFER THE BEST PLANS FOR YOU AND YOUR FAMILY."
            </blockquote>
            <p className="text-white/70 mb-8">
              We take the confusion out of buying insurance, and will find you the right insurance plan that fits exactly with your needs. American Way Health scans and ranks thousands of health insurance plans to find the right fit for you. We'll recommend the top plans in your area and help save you money in the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Phone className="w-5 h-5" />
                SPEAK TO A LIVE AGENT
              </a>
              <span className="text-white/60">or</span>
              <Button
                onClick={scrollToForm}
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-6 py-3 rounded-full"
              >
                Get Your Free Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-8">
              <img src={awhLogo} alt="American Way Health" className="h-16 md:h-20" />
              <span className="text-white/40 text-2xl">+</span>
              <img src={tfaLogo} alt="The Financial Architects" className="h-16 md:h-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Partnership Built on Trust
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto">
              American Way Health and The Financial Architects have joined forces to provide comprehensive health insurance solutions. With Anthony Bottley's expertise in health insurance and TFA's commitment to protecting families, you get the best of both worlds.
            </p>
            <p className="text-white/70 max-w-2xl mx-auto">
              "Health Insurance the American Way" — focused on finding you the coverage you need at a price you can afford.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section id="quote-form" className="py-16 px-6 bg-gradient-to-b from-navy to-primary">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
              Insurance Quote
            </h2>
            <p className="text-accent font-semibold text-center mb-4">
              PERSONAL PLANS / FAMILY PLANS / GROUP PLANS
            </p>
            <p className="text-white/70 text-center mb-8">
              Please fill out the form below to receive your free quote or call: {PHONE_NUMBER}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <AmericanWayHealthForm />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              What Happens Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-6 bg-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find the Right Coverage?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Don't wait until you need it. Get covered today with a plan that fits your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToForm}
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full"
              >
                Get Your Free Quote Now
              </Button>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg rounded-full transition-colors"
              >
                <Phone className="w-5 h-5" />
                {PHONE_NUMBER}
              </a>
            </div>
            <div className="mt-8 text-white/60">
              <p>Email: info@awhealthllc.com</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <img src={awhLogo} alt="American Way Health" className="h-8" />
                <span className="text-gray-400">×</span>
                <img src={tfaLogo} alt="The Financial Architects" className="h-8" />
              </div>
              <p className="text-muted-foreground text-sm text-center md:text-right">
                © {new Date().getFullYear()} American Way Health & The Financial Architects. All rights reserved.
              </p>
            </div>
            
            {/* Legal Disclaimer */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-500 text-xs leading-relaxed">
                <strong>Disclaimer:</strong> This website is operated by American Way Health LLC and is not the Health Insurance Marketplace® website. American Way Health is licensed as an insurance agency in 35 states. American Way Health (Health-Market.com) is an independent broker and is not a federal or state Marketplace website. Not all agents are licensed to sell all products. Service and product availability varies by state. Sales agents may be compensated based on a consumer's enrollment in a health plan. No obligation to enroll. Agent cannot provide tax or legal advice. Contact your tax or legal professional to discuss details regarding your individual business circumstances. Our quoting tool is provided for your information only. All quotes are estimates and are not final until consumer is enrolled.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed mt-4">
                In offering this website, American Way Health is required to comply with all applicable federal laws, including the standards established under 45 C.F.R. § 155.220(c) and (d) and standards established under 45 C.F.R. § 155.260 to protect the privacy and security of personally identifiable information. This website may not display all data on Qualified Health Plans (QHPs) being offered in your state through the Health Insurance Marketplace® website. To see all available data on Qualified Health Plan options in your state, go to the Health Insurance Marketplace® website at HealthCare.gov.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed mt-4">
                American Way Health offers the opportunity to enroll in either QHPs or off-Marketplace coverage. Please visit HealthCare.gov for information on the benefits of enrolling in a QHP. Off-Marketplace coverage is not eligible for the cost savings offered for coverage through the Marketplaces. Premium subsidies vary by address and subject to eligibility. Those with incomes between 100% and 150% of the federal poverty level (FPL) may qualify for a zero-dollar premium silver plan (after tax credits). They may also qualify for a zero-dollar premium bronze plan (after tax credits). Cost sharing (deductibles and coinsurance) may be higher. Medicare has neither reviewed nor endorsed this information.
              </p>
            </div>
          </div>
        </footer>
      </div>
      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
          <DialogTitle className="sr-only">
            Partnership Video - American Way Health
          </DialogTitle>
          <div className="aspect-video">
            <iframe
              src="https://www.loom.com/embed/bed6522f3c6a4b9aa857a60bd0be9f85"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AmericanWayHealth;
