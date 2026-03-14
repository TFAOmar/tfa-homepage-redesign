import { Shield, FileText, Lock, Heart, ArrowDown, Phone, Mail, MapPin, Award, Users, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import EscobarLivingTrustForm from "@/components/living-trust/EscobarLivingTrustForm";
import tfaLogo from "@/assets/tfa-logo.png";
import escobarLogo from "@/assets/partners/escobar-realty-group.png";
import kwLogo from "@/assets/partners/keller-williams.png";
import fusionLogo from "@/assets/partners/fusion-growth-partners.png";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export default function EscobarRealtyLivingTrust() {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    {
      icon: FileText,
      title: "Avoid Probate",
      description: "Skip the costly, time-consuming court process that can take months or even years — protecting the home you worked so hard to buy.",
    },
    {
      icon: Lock,
      title: "Protect Privacy",
      description: "Keep your estate details private and out of public records. Your property and assets stay between you and your family.",
    },
    {
      icon: Shield,
      title: "Maintain Control",
      description: "Specify exactly how and when your assets are distributed to your beneficiaries — on your terms.",
    },
    {
      icon: Heart,
      title: "Reduce Family Stress",
      description: "Give your loved ones peace of mind with a clear plan that avoids disputes, delays, and unnecessary legal fees.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Fill Out the Form",
      description: "Complete the brief questionnaire below with your contact details and preferences.",
    },
    {
      number: "2",
      title: "We Contact You",
      description: "Within 24-48 hours, our estate planning team will reach out to discuss your needs.",
    },
    {
      number: "3",
      title: "Free Consultation",
      description: "Schedule a personalized, no-obligation consultation to explore your Living Trust options.",
    },
  ];

  const partnerBenefits = [
    {
      icon: Handshake,
      title: "We Handle Everything",
      description: "From consultation to completion — your clients get white-glove service with zero effort on your part.",
    },
    {
      icon: Users,
      title: "Add Value to Your Clients",
      description: "Homeowners need estate planning. Offering this service deepens client relationships and builds loyalty.",
    },
    {
      icon: Award,
      title: "Trusted Expertise",
      description: "The Financial Architects brings 15+ years of estate planning experience to every consultation.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Living Trust Services | Escobar Realty Group × The Financial Architects"
        description="Protect your home and legacy with a Living Trust. Escobar Realty Group and The Financial Architects have partnered to bring you expert estate planning services."
        canonical={`${siteConfig.url}/advisors/manuel-soto/escobar-realty`}
        keywords="living trust, estate planning, avoid probate, Escobar Realty Group, real estate, asset protection, Upland CA"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Living Trust Services | Escobar Realty Group × The Financial Architects",
            "Protect your home and legacy with a Living Trust through the partnership of Escobar Realty Group and The Financial Architects.",
            `${siteConfig.url}/advisors/manuel-soto/escobar-realty`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Living Trust - Escobar Realty Group", url: `${siteConfig.url}/advisors/manuel-soto/escobar-realty` },
          ]),
        ]}
      />
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Co-Branded Header */}
        <header className="py-4 md:py-6 px-3 md:px-4 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-10">
              <img src={escobarLogo} alt="Escobar Realty Group" className="h-14 md:h-16 lg:h-20 object-contain" />
              <div className="h-10 md:h-12 w-px bg-gray-200" />
              <img src={tfaLogo} alt="The Financial Architects" className="h-10 md:h-12 lg:h-14 object-contain" />
            </div>
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-3 md:mt-4">
              <img src={kwLogo} alt="Keller Williams" className="h-6 md:h-8 object-contain opacity-60" />
              <img src={fusionLogo} alt="Fusion Growth Partners" className="h-6 md:h-8 object-contain opacity-60" />
            </div>
            <p className="text-center text-gray-500 text-xs md:text-sm mt-2 md:mt-3 tracking-wide">
              A Trusted Partnership for Your Family's Future
            </p>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 px-4 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />
          
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-6 md:mb-8">
              <Shield className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium">Estate Planning for Homeowners</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 md:mb-8">
              Protect Your Home &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8D48B]">
                Legacy
              </span>{" "}
              with a Living Trust
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              You worked hard to buy your home. Make sure it stays in your family — without the cost, 
              delays, or public exposure of probate.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-[#C9A84C] hover:bg-[#B8973D] text-black font-semibold px-8 py-5 md:px-10 md:py-6 text-base md:text-lg rounded-full shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all duration-300 group touch-manipulation"
            >
              Get Your Free Consultation
              <ArrowDown className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Escobar Personal Touch */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-[#C9A84C]/15 p-6 md:p-10 lg:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <img src={escobarLogo} alt="Escobar Realty Group" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Heiner & Natalia Escobar
                  </h2>
                  <p className="text-[#C9A84C] font-medium mb-1">REALTORS® | Keller Williams College Park</p>
                  <p className="text-white/40 text-sm mb-4">Lic# 01758326 | 01751260</p>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    As a husband-wife team, Heiner and Natalia bring full transparency to every transaction. 
                    They've partnered with The Financial Architects to ensure their clients' biggest 
                    investment — their home — is protected for generations to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Every Homeowner Needs a Living Trust
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-base">
                A Living Trust is one of the most powerful ways to protect your home, your assets, and your family's future.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-xl border border-white/[0.08] p-5 md:p-6 hover:border-[#C9A84C]/30 transition-all duration-500"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/20 transition-colors duration-500">
                    <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                A Turnkey Living Trust Solution
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-base">
                Escobar Realty Group and The Financial Architects handle everything — 
                so you can focus on what matters most.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {partnerBenefits.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-xl border border-white/[0.08] p-6 md:p-8 text-center"
                >
                  <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="consultation-form" className="py-12 md:py-20 px-4 scroll-mt-4">
          <div className="max-w-xl md:max-w-2xl mx-auto">
            <EscobarLivingTrustForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-white/50 text-sm md:text-base">
                Getting started is simple and straightforward.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-gradient-to-r from-[#C9A84C]/40 to-[#C9A84C]/10" />
                  )}
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#C9A84C] to-[#B8973D] text-black font-bold text-xl md:text-2xl rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg shadow-[#C9A84C]/20">
                    {step.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Protect What Matters Most?
            </h2>
            <p className="text-white/50 mb-8 max-w-2xl mx-auto text-sm md:text-base">
              Don't leave your family's future to chance. Request your free consultation 
              today and take the first step toward peace of mind.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-[#C9A84C] hover:bg-[#B8973D] text-black font-semibold px-8 py-5 md:px-10 md:py-6 text-base md:text-lg rounded-full shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all duration-300 touch-manipulation"
            >
              Request Free Consultation
            </Button>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-white/40">
              <a href="tel:+19519015997" className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors min-h-[44px] touch-manipulation">
                <Phone className="w-5 h-5" />
                <span>(951) 901-5997</span>
              </a>
              <span className="hidden md:inline text-white/20">|</span>
              <a href="mailto:heiner@escorealtygroup.com" className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors min-h-[44px] touch-manipulation text-sm md:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>heiner@escorealtygroup.com</span>
              </a>
              <span className="hidden md:inline text-white/20">|</span>
              <span className="flex items-center gap-2 text-sm md:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Upland, CA</span>
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:py-8 px-4 bg-white border-t border-gray-100 pb-safe">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4">
              <img src={escobarLogo} alt="Escobar Realty Group" className="h-12 md:h-14 object-contain" />
              <span className="text-gray-400">×</span>
              <img src={tfaLogo} alt="The Financial Architects" className="h-7 md:h-8 object-contain" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <img src={kwLogo} alt="Keller Williams" className="h-5 md:h-6 object-contain opacity-50" />
              <img src={fusionLogo} alt="Fusion Growth Partners" className="h-5 md:h-6 object-contain opacity-50" />
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
              © {new Date().getFullYear()} The Financial Architects. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              This is not legal advice. Please consult with a licensed attorney for specific legal matters.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
