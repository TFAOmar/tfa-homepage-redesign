import { Shield, FileText, Lock, Heart, ArrowDown, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import LivingTrustForm from "@/components/living-trust/LivingTrustForm";
import tfaLogo from "@/assets/tfa-logo.png";
import brandonGroupLogo from "@/assets/partners/the-brandon-group.png";
import vanessaPhoto from "@/assets/advisors/vanessa-sanchez.jpg";

export default function VanessaLivingTrust() {
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
      icon: Heart,
      title: "Reduce Family Stress",
      description: "Make the transition easier for your loved ones during a difficult time.",
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
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary-dark to-primary">
      {/* Co-Branded Header */}
      <header className="py-6 px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 md:gap-10">
          <img src={tfaLogo} alt="The Financial Architects" className="h-12 md:h-16 object-contain [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.9))_drop-shadow(0_0_4px_rgba(255,255,255,0.8))]" />
          <div className="h-10 w-px bg-accent/50" />
          <img src={brandonGroupLogo} alt="THE BRANDON DREW GROUP" className="h-14 md:h-16 object-contain [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.9))_drop-shadow(0_0_4px_rgba(255,255,255,0.8))]" />
        </div>
        <p className="text-center text-white/60 text-sm mt-3 tracking-wide">
          A Trusted Partnership for Your Family's Future
        </p>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                Protect Your Family's Future with a{" "}
                <span className="text-accent">Living Trust</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
                Avoid probate, protect your privacy, and ensure your assets go to the people you love—exactly how you want.
              </p>
              <Button
                onClick={scrollToForm}
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all duration-300 group"
              >
                Get Started Today
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl" />
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-6 md:p-8">
                  <img
                    src={vanessaPhoto}
                    alt="Vanessa Sanchez"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover mx-auto mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white">Vanessa Sanchez</h3>
                    <p className="text-accent font-medium">Financial Strategist</p>
                    <p className="text-white/60 text-sm mt-2">The Financial Architects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why a Living Trust?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              A Living Trust is one of the most powerful tools for protecting your family and your legacy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              A Partnership You Can Trust
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              THE BRANDON DREW GROUP and The Financial Architects have partnered to bring you 
              comprehensive Living Trust services. Vanessa Sanchez personally handles all 
              Living Trust consultations for Brandon Drew Group clients, ensuring you receive 
              expert guidance tailored to your family's unique needs.
            </p>
            <div className="flex items-center justify-center gap-6">
              <img src={brandonGroupLogo} alt="THE BRANDON DREW GROUP" className="h-12 object-contain [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.9))_drop-shadow(0_0_4px_rgba(255,255,255,0.8))]" />
              <span className="text-accent font-medium">×</span>
              <img src={tfaLogo} alt="The Financial Architects" className="h-10 object-contain [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.9))_drop-shadow(0_0_4px_rgba(255,255,255,0.8))]" />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="consultation-form" className="py-16 md:py-20 px-4 bg-white/5">
        <div className="max-w-2xl mx-auto">
          <LivingTrustForm />
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Happens Next?
            </h2>
            <p className="text-white/70">
              Your path to protecting your family's future is simple and straightforward.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent text-primary font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Protect Your Family?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Don't leave your family's future to chance. Schedule your free consultation 
            with Vanessa today and take the first step toward peace of mind.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-accent hover:bg-accent/90 text-primary font-semibold px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            Request Free Consultation
          </Button>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-white/60">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              <span>Contact Vanessa</span>
            </a>
            <span className="hidden md:inline text-white/30">|</span>
            <a href="mailto:vanessa@tfainsuranceadvisors.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />
              <span>vanessa@tfainsuranceadvisors.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={tfaLogo} alt="The Financial Architects" className="h-8 object-contain [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.9))_drop-shadow(0_0_3px_rgba(255,255,255,0.8))]" />
            <span className="text-white/30">×</span>
            <img src={brandonGroupLogo} alt="THE BRANDON DREW GROUP" className="h-10 object-contain [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.9))_drop-shadow(0_0_3px_rgba(255,255,255,0.8))]" />
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} The Financial Architects. All rights reserved.
          </p>
          <p className="text-white/30 text-xs mt-2">
            This is not legal advice. Please consult with a licensed attorney for specific legal matters.
          </p>
        </div>
      </footer>
    </div>
  );
}
