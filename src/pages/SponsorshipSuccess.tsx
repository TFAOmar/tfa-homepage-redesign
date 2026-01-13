import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Calendar, Mail, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SponsorshipSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Track successful payment
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "sponsorship_payment_complete",
        session_id: sessionId,
      });
    }
  }, [sessionId]);

  return (
    <>
      <Helmet>
        <title>Payment Successful | TFA 2026 Kick Off Sponsorship</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in duration-500">
              <CheckCircle2 className="w-14 h-14 text-green-600" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for becoming a sponsor of the TFA 2026 Kick Off event.
            </p>

            {/* Confirmation Details */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8 text-left">
              <h2 className="font-semibold text-lg text-foreground mb-6 text-center">
                What Happens Next?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Confirmation Email</h3>
                    <p className="text-muted-foreground text-sm">
                      You'll receive a payment confirmation and receipt from Stripe within the next few minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Team Outreach</h3>
                    <p className="text-muted-foreground text-sm">
                      Our sponsorship team will contact you within 1 business day to discuss booth setup, logo submission, and event details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Event Date</h3>
                    <p className="text-muted-foreground text-sm">
                      Mark your calendar for <strong>February 8, 2026</strong> at the Ontario Convention Center. We'll send you all the details as the event approaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline">
                <Link to="/events/tfa-2026-kickoff-sponsorship">
                  View Sponsorship Details
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/">
                  Return to Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Support Note */}
            <p className="text-sm text-muted-foreground mt-8">
              Questions? Contact our team at{" "}
              <a href="mailto:events@tfainsuranceadvisors.com" className="text-primary hover:underline">
                events@tfainsuranceadvisors.com
              </a>
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SponsorshipSuccess;
