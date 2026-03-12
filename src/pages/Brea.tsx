import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Clock, ShieldCheck, Globe, Trophy, ClipboardList, PenTool, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo/SEOHead";
import BreaContactForm from "@/components/brea/BreaContactForm";

// REPLACE: Update phone number if different for Brea office
const PHONE_NUMBER = "+18883505396";
const PHONE_DISPLAY = "(888) 350-5396";
// REPLACE: Update address for Brea office
const ADDRESS = "200 W Imperial Hwy, Brea, CA 92821";

const scrollToBook = () => {
  document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
};

const Brea = () => {
  const [showSticky, setShowSticky] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (widgetContainerRef.current && !widgetContainerRef.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://cdn.trustindex.io/loader.js?58410d862849832fdb76669e5ee";
      script.defer = true;
      script.async = true;
      widgetContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Free Financial Consultation in Brea, CA"
        description="Book a free 30-minute strategy session with a licensed financial architect at our Brea, CA office. Protect your family and build real wealth."
        canonical="https://tfawealthplanning.lovable.app/brea"
        noIndex
      />

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border/20 transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-primary-foreground font-bold text-sm tracking-wide">
            The Financial Architects
          </span>
          <div className="flex items-center gap-2">
            <a href={`tel:${PHONE_NUMBER}`} aria-label="Call us">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="h-5 w-5" />
              </Button>
            </a>
            <Button
              size="sm"
              onClick={scrollToBook}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(215,45%,18%)]" />
        <div className="relative max-w-3xl mx-auto px-5 py-20 md:py-28 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 text-primary-foreground/90 text-xs font-medium mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <MapPin className="h-3.5 w-3.5" />
            Now Open in Brea, CA
          </div>

          {/* Headline */}
          <h1
            className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
          >
            Protect Your Family.
            <br />
            Build Real Wealth.
          </h1>

          {/* Subheadline */}
          <p
            className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            Schedule a free 30-minute strategy session with a licensed financial architect.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-in"
            style={{ animationDelay: "550ms", animationFillMode: "forwards" }}
          >
            <Button
              size="lg"
              onClick={scrollToBook}
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              Book My Free Appointment
            </Button>
            <a href={`tel:${PHONE_NUMBER}`} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="hero"
                className="w-full font-semibold text-base px-8"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-y border-border bg-card">
        <div className="max-w-4xl mx-auto px-5 py-5 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="font-medium">Licensed &amp; Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-accent" />
            <span className="font-medium">Hablamos Español</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            <span className="font-medium">100+ Families Served</span>
          </div>
        </div>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section className="bg-background py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            What to Expect
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: "We Review Your Situation",
                desc: "No judgment, no pressure — just a clear look at where you stand today.",
              },
              {
                icon: PenTool,
                title: "We Build Your Plan",
                desc: "Customized to your family's needs, goals, and timeline.",
              },
              {
                icon: CheckCircle,
                title: "You Walk Away Protected",
                desc: "Clear next steps, no confusion — you'll know exactly what to do.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="bg-card rounded-lg border border-border p-6 border-l-4 border-l-accent transition-transform duration-200 hover:-translate-y-1 hover:shadow-md opacity-0 animate-fade-in"
                style={{ animationDelay: `${700 + i * 150}ms`, animationFillMode: "forwards" }}
              >
                <card.icon className="h-7 w-7 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-1.5">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            What Our Clients Say
          </h2>
          <div ref={widgetContainerRef} />
        </div>
      </section>

      {/* ===== BOOKING SECTION ===== */}
      <section id="book" className="bg-secondary py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Choose a Time That Works for You
          </h2>
          <p className="text-muted-foreground mb-8">
            In-person at our Brea office or over the phone — your choice.
          </p>

          {/* REPLACE: Swap the Calendly URL below with your actual Calendly link */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <iframe
              src="https://calendly.com/thefinancialarchitects/30min"
              className="w-full h-[600px] md:h-[650px] border-0"
              title="Schedule an appointment"
              loading="lazy"
            />
          </div>

          {/* Fallback CTA */}
          <div className="mt-8 text-muted-foreground text-sm">
            <p className="mb-2">Prefer to speak with someone directly?</p>
            <a href={`tel:${PHONE_NUMBER}`}>
              <Button variant="outline" className="font-semibold">
                <Phone className="h-4 w-4 mr-2" />
                Call {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== LOCATION STRIP ===== */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-sm mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span>{ADDRESS}</span>
            </div>
            <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-5 w-5 text-accent" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              {/* REPLACE: Update office hours if different */}
              <span>Mon–Sat 9am–6pm</span>
            </div>
          </div>

          {/* REPLACE: Swap with actual Google Maps embed URL for Brea office */}
          <div className="rounded-xl overflow-hidden border border-primary-foreground/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.0!2d-117.9!3d33.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU1JzEyLjAiTiAxMTfCsDU0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1"
              className="w-full h-[250px] md:h-[300px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TFA Brea Office Location"
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[hsl(215,45%,18%)] text-primary-foreground/70 py-10">
        <div className="max-w-4xl mx-auto px-5 text-center text-sm space-y-3">
          <p className="text-primary-foreground font-bold text-base">
            The Financial Architects
          </p>
          <p className="italic text-primary-foreground/50">
            Building Generational Wealth Since Day One.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/privacy-policy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a href="/terms-of-service" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-primary-foreground/40 text-xs">
            © 2025 The Financial Architects. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Brea;
