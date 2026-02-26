import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Clock,
  Target,
  UserCheck,
  FileCheck,
  DollarSign
} from "lucide-react";
import manuelImage from "@/assets/advisors/manuel-soto.jpg";
import { SEOHead } from "@/components/seo";
import { siteConfig } from "@/lib/seo/siteConfig";

const valueCards = [
  {
    icon: Target,
    title: "Full Financial Review",
    description: "A comprehensive deep-dive into your current financial situation, identifying gaps and opportunities you may be missing."
  },
  {
    icon: UserCheck,
    title: "Direct Access to the Founder",
    description: "One-on-one time with Manuel Soto himself — not a junior advisor. Get insights from someone who's built TFA from the ground up."
  },
  {
    icon: FileCheck,
    title: "Personalized Action Plan",
    description: "Walk away with a clear, actionable strategy tailored to your unique goals, timeline, and financial situation."
  },
  {
    icon: DollarSign,
    title: "No Fluff, No Sales Pitch",
    description: "This is a serious, dedicated session focused entirely on your needs. Honest guidance with zero obligations."
  }
];

const ManuelSotoCoaching = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="1-on-1 Coaching with Manuel Soto"
        description="Book a dedicated 1-hour coaching session with Manuel Soto, Founder & CEO of The Financial Architects. $500 for personalized financial strategy and guidance."
        canonical={`${siteConfig.url}/advisors/manuel-soto/coaching`}
        keywords="Manuel Soto coaching, financial coaching session, TFA founder consultation, paid financial consultation"
      />
      <div className="min-h-screen bg-background">
        {/* Back Navigation */}
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4 py-3">
            <Link to="/advisors/manuel-soto" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Manuel's Profile
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Founder & CEO
                  </Badge>
                  <Badge className="bg-white/10 text-white border-white/20 text-lg px-4 py-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    $500 / hour
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  1-on-1 Coaching Session
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light">
                  with Manuel Soto
                </p>
                <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                  No more generic appointments. This is a dedicated, one-hour deep-dive 
                  with the founder of TFA — focused entirely on your financial situation, 
                  your goals, and the strategies that will actually move the needle.
                </p>
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>60-minute dedicated session</span>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
                  <img
                    src={manuelImage}
                    alt="Manuel Soto - Founder & CEO of The Financial Architects"
                    className="relative rounded-2xl shadow-2xl w-full max-w-sm object-cover aspect-[3/4]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-primary px-6 py-3 rounded-xl font-semibold shadow-lg">
                    <span className="text-2xl font-bold">$500</span>
                    <span className="text-sm block">per session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                What You Get
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                This Isn't Your Typical Consultation
              </h2>
              <p className="text-lg text-muted-foreground">
                A serious, results-driven session with the man who built TFA from scratch 
                and personally serves ~2,000 clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {valueCards.map((card) => (
                <Card key={card.title} className="bg-card border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <card.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Calendly Embed Section */}
        <section className="py-16 lg:py-24 bg-secondary/30" id="book">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Book Now
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Select Your Session Time
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose a date and time that works for you. Payment is handled at booking.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
              <iframe
                src="https://calendly.com/manuel-soto-/coaching"
                width="100%"
                height="700"
                frameBorder="0"
                title="Book a coaching session with Manuel Soto"
                className="w-full min-h-[700px]"
              />
            </div>

            <p className="text-center mt-6 text-muted-foreground text-sm">
              By booking, you agree to the session terms. Cancellations must be made 24 hours in advance.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ManuelSotoCoaching;
