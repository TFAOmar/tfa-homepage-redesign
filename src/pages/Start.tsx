import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo";
import LandingHeader from "@/components/LandingHeader";
import { LanguageProvider, LangToggle, useLang } from "@/lib/i18n/LanguageContext";
import ServicePicker from "@/components/start/ServicePicker";
import Wizard from "@/components/start/Wizard";
import ContactStep, { type ContactData } from "@/components/start/ContactStep";
import { CONSENT_VERSION } from "@/lib/i18n/dictionary";
import { zipToTimezone, isQuietHours } from "@/lib/zipTimezone";
import { Button } from "@/components/ui/button";
import LegalFooter from "@/components/intake/LegalFooter";

type Stage = "pick" | "wizard" | "contact" | "done";

interface ReferrerInfo {
  id: string;
  slug: string;
  display_name: string;
  avatar_url: string | null;
}

function StartInner() {
  const { t } = useLang();
  const [params] = useSearchParams();
  const refSlug = params.get("ref");
  const [referrer, setReferrer] = useState<ReferrerInfo | null>(null);
  const [stage, setStage] = useState<Stage>("pick");
  const [services, setServices] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ name: string; quiet: boolean } | null>(null);

  useEffect(() => {
    if (!refSlug) return;
    void (async () => {
      const { data } = await supabase.rpc("get_intake_referrer_by_slug", { p_slug: refSlug });
      if (data && Array.isArray(data) && data[0]) setReferrer(data[0] as ReferrerInfo);
    })();
  }, [refSlug]);

  const handleContact = async (c: ContactData) => {
    setSubmitting(true);
    try {
      const tz = zipToTimezone(c.zip);
      const quiet = isQuietHours(tz);
      const { data, error } = await supabase.functions.invoke("intake-submit", {
        body: {
          source: "consumer",
          services,
          primary_service: services[0],
          answers,
          first_name: c.first_name,
          last_name: c.last_name,
          phone_e164: c.phone_e164,
          email: c.email || null,
          zip: c.zip,
          timezone: tz,
          language: c.language,
          best_time: c.best_time,
          referrer_id: referrer?.id ?? null,
          referrer_in_thread: !!c.consent_referrer,
          consent: {
            tcpa: c.consent_tcpa,
            referrer_inclusion: c.consent_referrer,
            version: CONSENT_VERSION,
          },
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        },
      });
      if (error) throw error;
      setResult({ name: c.first_name, quiet });
      setStage("done");
    } catch (e: any) {
      toast.error(e.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePartial = async (partial: Partial<ContactData>) => {
    try {
      await supabase.functions.invoke("intake-submit", {
        body: {
          source: "consumer",
          status: "abandoned",
          services,
          primary_service: services[0],
          answers,
          first_name: partial.first_name,
          last_name: partial.last_name,
          phone_e164: partial.phone_e164,
          email: partial.email || null,
          zip: partial.zip,
          language: partial.language ?? "en",
          referrer_id: referrer?.id ?? null,
          partial: true,
        },
      });
    } catch {
      /* silent */
    }
  };

  const isMinh = refSlug === "minh" || referrer?.slug === "minh";
  const ctaHref = isMinh ? "/book/minh" : "/book-consultation";

  return (
    <>
      <SEOHead title="Start — The Financial Architects" description="Two minutes. No spam. A real person follows up." />
      <LandingHeader ctaHref={ctaHref} rightSlot={<LangToggle />} />
      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          {stage !== "done" && (
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy">{t.heroTitle}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{t.heroSub}</p>
              {referrer && (
                <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white border border-accent/40 px-4 py-2 shadow-sm">
                  {referrer.avatar_url && (
                    <img src={referrer.avatar_url} alt={referrer.display_name} className="h-8 w-8 rounded-full object-cover" />
                  )}
                  <span className="text-sm font-medium text-navy">
                    {t.referredBy} <span className="font-bold">{referrer.display_name}</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {stage === "pick" && (
            <ServicePicker
              onPick={(svcs) => {
                setServices(svcs);
                setStage("wizard");
              }}
            />
          )}
          {stage === "wizard" && (
            <Wizard
              services={services}
              onDone={(a) => {
                setAnswers(a);
                setStage("contact");
              }}
              onBack={() => setStage("pick")}
            />
          )}
          {stage === "contact" && (
            <ContactStep
              referrerName={referrer?.display_name ?? null}
              onSubmit={handleContact}
              onPartial={handlePartial}
              submitting={submitting}
            />
          )}
          {stage === "done" && result && (
            <div className="max-w-lg mx-auto text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-3xl mb-6">✓</div>
              <h2 className="font-serif text-3xl font-bold text-navy mb-4">
                {result.quiet ? t.confirmTitleQuiet(result.name) : t.confirmTitleDay(result.name)}
              </h2>
              <Button asChild className="btn-primary-cta mt-4">
                <a href="/book-consultation">{t.orBook}</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <LegalFooter />
    </>
  );
}

export default function Start() {
  return (
    <LanguageProvider>
      <StartInner />
    </LanguageProvider>
  );
}