import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead, JsonLd } from "@/components/seo";
import { siteConfig } from "@/lib/seo/siteConfig";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { partnerCategories } from "@/components/preferred-partners/partnerCategories";
import PartnerApplicationForm from "@/components/preferred-partners/PartnerApplicationForm";
import { Handshake, Users, CalendarCheck, Repeat, Award, MessageSquare } from "lucide-react";

const benefits = [
  {
    icon: Repeat,
    title: "Two-way referrals",
    description:
      "We send business back. Our advisors work with families who need lending, tax help, real estate, and coverage you already provide.",
  },
  {
    icon: Users,
    title: "300+ licensed advisors",
    description:
      "A team across 33 offices in California, Arizona, and Oregon, so your client is never far from a local specialist.",
  },
  {
    icon: Award,
    title: "Specialists, not generalists",
    description:
      "Life insurance, annuities, retirement income, and estate planning handled by people who do it every day.",
  },
  {
    icon: MessageSquare,
    title: "Marketing & event support",
    description:
      "Co-branded workshops, client education nights, and shared materials that make you look great to your own clients.",
  },
];

const steps = [
  {
    icon: Handshake,
    title: "1. Apply",
    description: "Tell us about your business and the clients you serve. It takes about two minutes.",
  },
  {
    icon: CalendarCheck,
    title: "2. Intro call",
    description:
      "We meet, confirm licensing and fit, and map out where your clients and ours overlap.",
  },
  {
    icon: Repeat,
    title: "3. Start referring",
    description:
      "You get a direct advisor contact, a simple referral process, and updates on every client you send.",
  },
];

const scrollToForm = () => {
  document.getElementById("partner-application")?.scrollIntoView({ behavior: "smooth" });
};

const PreferredPartners = () => {
  return (
    <>
      <SEOHead
        title="Preferred Partner Network"
        description="TFA partners with lenders, realtors, tax professionals, CPAs, P&C agents, business insurance brokers, and Medicare and health agents. Apply to join our referral network."
        canonical={`${siteConfig.url}/preferred-partners`}
        keywords="preferred partners, referral partners, realtor referral program, CPA referral partner, mortgage lender partnership, insurance broker referrals"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Preferred Partner Network | The Financial Architects",
            "Professional referral partnerships with lenders, realtors, tax professionals, CPAs, and insurance brokers.",
            `${siteConfig.url}/preferred-partners`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Preferred Partners", url: `${siteConfig.url}/preferred-partners` },
          ]),
        ]}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-b from-navy to-navy/95 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(217,165,63,0.25),transparent)]" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-6">
              Preferred Partner Network
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Trusted professionals, working together for your clients
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed mb-10">
              Great outcomes rarely come from one professional alone. We partner with lenders,
              realtors, tax professionals, CPAs, and insurance brokers so every client gets a
              complete plan — not a piece of one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToForm}>
                Become a Partner
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-navy"
              >
                <Link to="/book-consultation">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who We Partner With
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our preferred partners are vetted, licensed professionals who share our standard of
                care. Here's where our work fits alongside theirs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="glass p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why partner */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Professionals Partner With TFA
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="glass p-6 rounded-xl text-center">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="text-center">
                    <div className="h-14 w-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-5">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="partner-application" className="py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Become a Preferred Partner
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tell us a little about your practice and we'll set up an introduction call.
              </p>
            </div>
            <PartnerApplicationForm />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-b from-navy to-navy/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Have a client who needs help today?
            </h2>
            <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto mb-8">
              You don't have to be a partner yet. Send them to an advisor and we'll take good care
              of them.
            </p>
            <Button asChild size="lg">
              <Link to="/book-consultation">Book a Consultation</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PreferredPartners;
