import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/dictionary";

export interface ContactData {
  first_name: string;
  last_name: string;
  phone_e164: string;
  email: string;
  zip: string;
  best_time: string;
  language: Lang;
  consent_tcpa: boolean;
  consent_referrer: boolean;
}

interface Props {
  referrerName?: string | null;
  onSubmit: (data: ContactData) => Promise<void> | void;
  onPartial?: (partial: Partial<ContactData>) => void;
  submitting?: boolean;
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function ContactStep({ referrerName, onSubmit, onPartial, submitting }: Props) {
  const { lang, t } = useLang();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [best, setBest] = useState("morning");
  const [prefLang, setPrefLang] = useState<Lang>(lang);
  const [consentTcpa, setConsentTcpa] = useState(false);
  const [consentReferrer, setConsentReferrer] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // honeypot
  const [hp, setHp] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!first.trim()) e.first = t.required;
    if (!last.trim()) e.last = t.required;
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) e.phone = t.invalidPhone;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.invalidEmail;
    if (!/^\d{5}$/.test(zip.trim())) e.zip = t.invalidZip;
    if (!consentTcpa) e.consent = t.mustConsent;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (hp) return; // bot
    if (!validate()) return;
    const digits = phone.replace(/\D/g, "");
    void onSubmit({
      first_name: first.trim(),
      last_name: last.trim(),
      phone_e164: `+1${digits}`,
      email: email.trim(),
      zip: zip.trim(),
      best_time: best,
      language: prefLang,
      consent_tcpa: consentTcpa,
      consent_referrer: consentReferrer,
    });
  };

  const notifyPartial = () => {
    const digits = phone.replace(/\D/g, "");
    if (onPartial && (digits.length === 10 || email)) {
      onPartial({
        first_name: first.trim() || undefined,
        last_name: last.trim() || undefined,
        phone_e164: digits.length === 10 ? `+1${digits}` : "",
        email: email.trim(),
        zip: zip.trim(),
        language: prefLang,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-6">{t.contactTitle}</h2>
      <div className="space-y-4">
        {/* honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="absolute -left-[10000px] w-px h-px opacity-0"
          aria-hidden
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{t.firstName}</Label>
            <Input value={first} onChange={(e) => setFirst(e.target.value)} onBlur={notifyPartial} />
            {errors.first && <p className="text-xs text-destructive mt-1">{errors.first}</p>}
          </div>
          <div>
            <Label>{t.lastName}</Label>
            <Input value={last} onChange={(e) => setLast(e.target.value)} onBlur={notifyPartial} />
            {errors.last && <p className="text-xs text-destructive mt-1">{errors.last}</p>}
          </div>
        </div>
        <div>
          <Label>{t.phone}</Label>
          <Input
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            onBlur={notifyPartial}
            placeholder="(555) 555-5555"
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label>{t.email}</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={notifyPartial}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{t.zip}</Label>
            <Input inputMode="numeric" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value)} onBlur={notifyPartial} />
            {errors.zip && <p className="text-xs text-destructive mt-1">{errors.zip}</p>}
          </div>
          <div>
            <Label>{t.bestTime}</Label>
            <select value={best} onChange={(e) => setBest(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="morning">{t.times.morning}</option>
              <option value="afternoon">{t.times.afternoon}</option>
              <option value="evening">{t.times.evening}</option>
            </select>
          </div>
        </div>
        <div>
          <Label>{t.prefLang}</Label>
          <select value={prefLang} onChange={(e) => setPrefLang(e.target.value as Lang)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* Consent block */}
        <div className="pt-4 space-y-3 border-t">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={consentTcpa}
              onChange={(e) => setConsentTcpa(e.target.checked)}
              className="mt-1 h-4 w-4 accent-navy"
            />
            <span>{t.consentTcpa}</span>
          </label>
          {referrerName && (
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={consentReferrer}
                onChange={(e) => setConsentReferrer(e.target.checked)}
                className="mt-1 h-4 w-4 accent-navy"
              />
              <span>{t.consentReferrer(referrerName)}</span>
            </label>
          )}
          {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
        </div>

        <Button className="btn-primary-cta w-full py-6 text-base" onClick={submit} disabled={submitting}>
          {submitting ? "…" : t.submit}
        </Button>
      </div>
    </div>
  );
}