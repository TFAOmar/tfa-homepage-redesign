import { SEOHead } from "@/components/seo";
import LandingHeader from "@/components/LandingHeader";
import { LanguageProvider, LangToggle, useLang } from "@/lib/i18n/LanguageContext";
import LegalFooter from "@/components/intake/LegalFooter";

function Content() {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-3xl prose prose-slate">
        <h1 className="font-serif text-4xl text-navy">
          {es ? "Términos de Mensajes de Texto (SMS)" : "SMS Messaging Terms"}
        </h1>
        <p>
          {es
            ? "Al optar por recibir mensajes de The Financial Architects, aceptas recibir mensajes SMS relacionados con tu consulta y servicios."
            : "By opting in to messages from The Financial Architects, you agree to receive SMS messages related to your inquiry and services."}
        </p>
        <h2>{es ? "Frecuencia" : "Frequency"}</h2>
        <p>
          {es
            ? "La frecuencia de mensajes varía. Normalmente enviaremos entre 1 y 8 mensajes durante tu proceso."
            : "Message frequency varies. Typically 1–8 messages across the course of your inquiry."}
        </p>
        <h2>{es ? "Costos" : "Costs"}</h2>
        <p>
          {es
            ? "Pueden aplicar tarifas de mensajes y datos. Consulta con tu operador."
            : "Message & data rates may apply. Check with your mobile carrier."}
        </p>
        <h2>{es ? "Cancelar / Ayuda" : "HELP / STOP"}</h2>
        <p>
          {es
            ? "Responde ALTO o STOP en cualquier momento para dejar de recibir mensajes. Responde AYUDA o HELP para ayuda."
            : "Reply STOP or ALTO at any time to unsubscribe. Reply HELP for help."}
        </p>
        <h2>{es ? "Descargo" : "Disclaimer"}</h2>
        <h2>{es ? "Compartir Datos" : "Data Sharing"}</h2>
        <p>
          {es
            ? "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All information-sharing categories above exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
            : "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All information-sharing categories above exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."}
        </p>
        <h2>{es ? "Descargo" : "Disclaimer"}</h2>
        <p>
          {es
            ? "Los operadores no son responsables por mensajes retrasados o no entregados."
            : "Carriers are not liable for delayed or undelivered messages."}
        </p>
      </div>
    </main>
  );
}

export default function SmsTerms() {
  return (
    <LanguageProvider>
      <SEOHead title="SMS Terms" description="SMS messaging terms and opt-in/opt-out information." />
      <LandingHeader />
      <div className="fixed top-3 right-3 z-[60]">
        <LangToggle />
      </div>
      <Content />
      <LegalFooter />
    </LanguageProvider>
  );
}