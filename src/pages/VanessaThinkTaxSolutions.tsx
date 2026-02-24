import { Shield, FileText, Lock, Heart, Home, ArrowDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThinkTaxLivingTrustForm from "@/components/living-trust/ThinkTaxLivingTrustForm";
import tfaLogo from "@/assets/tfa-logo.png";
import thinkTaxLogo from "@/assets/partners/think-tax-solutions.png";
import thinkTaxLogoWhite from "@/assets/partners/think-tax-solutions-white.png";
import vanessaPhoto from "@/assets/advisors/vanessa-sanchez.jpg";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generatePersonSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export default function VanessaThinkTaxSolutions() {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    {
      icon: FileText,
      title: "Avoid Probate",
      description: "Skip the costly, time-consuming court process that can take months or even years.",
    },
    {
      icon: Lock,
      title: "Protect Privacy",
      description: "Keep your estate details private and out of public records.",
    },
    {
      icon: Shield,
      title: "Maintain Control",
      description: "Specify exactly how and when your assets are distributed to your beneficiaries.",
    },
    {
      icon: Home,
      title: "Mortgage Protection",
      description: "Ensure your home is protected and your mortgage is covered for your family's security.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Submit Your Information",
      description: "Complete the brief questionnaire below with your contact details and preferences.",
    },
    {
      number: "2",
      title: "Vanessa Contacts You",
      description: "Within 24-48 hours, Vanessa will reach out to discuss your needs.",
    },
    {
      number: "3",
      title: "Free Consultation",
      description: "Schedule a personalized, no-obligation consultation to explore your options.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Living Trust & Mortgage Protection with Vanessa Sanchez"
        description="Protect your family's future with a Living Trust and Mortgage Protection. Avoid probate, protect privacy, and ensure your home and assets are secure."
        canonical={`${siteConfig.url}/advisors/vanessa-sanchez/think-tax-solutions`}
        keywords="living trust, mortgage protection, estate planning, avoid probate, Vanessa Sanchez, Think Tax Solutions"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Living Trust & Mortgage Protection | The Financial Architects",
            "Protect your family's future with a Living Trust and Mortgage Protection.",
            `${siteConfig.url}/advisors/vanessa-sanchez/think-tax-solutions`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Living Trust & Mortgage Protection", url: `${siteConfig.url}/advisors/vanessa-sanchez/think-tax-solutions` },
          ]),
          generatePersonSchema(
            "Vanessa Sanchez",
            "Financial Strategist",
            "Vanessa Sanchez specializes in Living Trust and Mortgage Protection consultations.",
            `${siteConfig.url}/assets/advisors/vanessa-sanchez.jpg`,
            `${siteConfig.url}/advisors/vanessa-sanchez/think-tax-solutions`,
            ["Living Trust", "Mortgage Protection", "Estate Planning", "Asset Protection"]
          ),
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-primary via-primary-dark to-primary">
        {/* Co-Branded Header */}
        <header className="py-4 md:py-6 px-3 md:px-4 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 md:gap-6 lg:gap-10">
            <img src={tfaLogo} alt="The Financial Architects" className="h-10 md:h-12 lg:h-16 object-contain" />
            <div className="h-8 md:h-10 w-px bg-gray-200" />
            <img src={thinkTaxLogo} alt="Think Tax Solutions" className="h-16 md:h-20 lg:h-24 object-contain" />
          </div>
          <p className="text-center text-muted-foreground text-xs md:text-sm mt-2 md:mt-3 tracking-wide">
            A Trusted Partnership for Your Family's Future
          </p>
        </header>

        {/* Hero Section */}
        <section className="py-10 md:py-16 lg:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-6">
                  Protect Your Home & Family with a{" "}
                  <span className="text-accent">Living Trust</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/70 mb-6 md:mb-8 leading-relaxed">
                  Avoid probate, protect your privacy, and secure your mortgage and assets for the people you love—exactly how you want.
                </p>
                <Button
                  onClick={scrollToForm}
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all duration-300 group touch-manipulation"
                >
                  Get Started Today
                  <ArrowDown className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/15 p-4 md:p-6 lg:p-8">
                    <img
                      src={vanessaPhoto}
                      alt="Vanessa Sanchez"
                      className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg md:rounded-xl object-cover mx-auto mb-3 md:mb-4"
                    />
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-semibold text-white">Vanessa Sanchez</h3>
                      <p className="text-accent font-medium text-sm md:text-base">Financial Strategist</p>
                      <p className="text-white/60 text-xs md:text-sm mt-1 md:mt-2">The Financial Architects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                Why a Living Trust & Mortgage Protection?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
                A Living Trust combined with Mortgage Protection is one of the most powerful ways to safeguard your family and your home.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/15 p-4 md:p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                    <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{benefit.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/15 p-6 md:p-8 lg:p-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                A Partnership You Can Trust
              </h2>
              <p className="text-white/70 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Think Tax Solutions and The Financial Architects have partnered to bring you 
                comprehensive Living Trust and Mortgage Protection services. Vanessa Sanchez 
                personally handles all consultations for Think Tax Solutions clients, ensuring 
                you receive expert guidance tailored to your family's unique needs.
              </p>
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <img src={thinkTaxLogoWhite} alt="Think Tax Solutions" className="h-14 md:h-18 lg:h-20 object-contain" />
                <span className="text-accent font-medium">×</span>
                <img src={tfaLogo} alt="The Financial Architects" className="h-7 md:h-8 lg:h-10 object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="consultation-form" className="py-12 md:py-16 lg:py-20 px-4 bg-white/5 scroll-mt-4">
          <div className="max-w-xl md:max-w-2xl mx-auto">
            <ThinkTaxLivingTrustForm />
          </div>
        </section>

        {/* What Happens Next Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                What Happens Next?
              </h2>
              <p className="text-white/70 text-sm md:text-base">
                Your path to protecting your family's future is simple and straightforward.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-0.5 bg-accent/30" />
                  )}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent text-primary font-bold text-xl md:text-2xl rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Ready to Protect Your Family?
            </h2>
            <p className="text-white/70 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
              Don't leave your family's future to chance. Schedule your free consultation 
              with Vanessa today and take the first step toward peace of mind.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-4 md:px-10 md:py-6 text-base md:text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all duration-300 touch-manipulation"
            >
              Request Free Consultation
            </Button>
            <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-white/60">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-accent transition-colors min-h-[44px] touch-manipulation">
                <Phone className="w-5 h-5" />
                <span>Contact Vanessa</span>
              </a>
              <span className="hidden md:inline text-white/30">|</span>
              <a href="mailto:vsanchez@tfainsuranceadvisors.com" className="flex items-center gap-2 hover:text-accent transition-colors min-h-[44px] touch-manipulation text-sm md:text-base break-all md:break-normal">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>vsanchez@tfainsuranceadvisors.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:py-8 px-4 bg-white border-t border-gray-100 pb-safe">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
              <img src={tfaLogo} alt="The Financial Architects" className="h-6 md:h-8 object-contain" />
              <span className="text-gray-400">×</span>
              <img src={thinkTaxLogo} alt="Think Tax Solutions" className="h-14 md:h-16 object-contain" />
            </div>
            <p className="text-muted-foreground text-xs md:text-sm">
              © {new Date().getFullYear()} The Financial Architects. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This is not legal advice. Please consult with a licensed attorney for specific legal matters.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
