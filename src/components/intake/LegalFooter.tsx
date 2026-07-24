import { useLang } from "@/lib/i18n/LanguageContext";

export default function LegalFooter() {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white/60 py-8 px-4">
      <div className="container mx-auto max-w-4xl text-center text-xs text-muted-foreground space-y-3">
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href="/privacy-policy" className="underline hover:text-navy">
            {es ? "Política de Privacidad" : "Privacy Policy"}
          </a>
          <a href="/terms-of-service" className="underline hover:text-navy">
            {es ? "Términos" : "Terms"}
          </a>
          <a href="/sms-terms" className="underline hover:text-navy">
            {es ? "Términos de SMS" : "SMS Terms"}
          </a>
        </p>
        <p className="max-w-2xl mx-auto leading-relaxed">
          {es
            ? "TFA no proporciona asesoría legal; los documentos de fideicomiso son preparados por abogados independientes con licencia."
            : "TFA does not provide legal advice; trust documents are prepared by independent licensed attorneys."}
        </p>
      </div>
    </footer>
  );
}