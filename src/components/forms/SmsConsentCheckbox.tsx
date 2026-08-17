import { Link } from "react-router-dom";

/**
 * Version identifier for the disclosure wording below. Bump when the text changes
 * so stored consent records stay auditable.
 */
export const SMS_CONSENT_TEXT_VERSION = "sms-consent-v1-2026-08";

export const SMS_CONSENT_TEXT_EN =
  "By checking this box, you agree to receive SMS text messages from The Financial Architects at the number provided, including appointment reminders and service updates. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.";

export const SMS_CONSENT_TEXT_ES =
  "Al marcar esta casilla, aceptas recibir mensajes de texto SMS de The Financial Architects al número proporcionado, incluidos recordatorios de citas y actualizaciones de servicio. El consentimiento no es condición de compra. La frecuencia de mensajes varía. Pueden aplicar tarifas de mensajes y datos. Responde STOP para cancelar o HELP para ayuda.";

interface SmsConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  lang?: "en" | "es";
  /** Use light text on dark backgrounds */
  variant?: "light" | "dark";
  id?: string;
  className?: string;
}

/**
 * Optional SMS (TCPA / 10DLC) consent checkbox.
 * Never required to submit — always rendered with the form's initial markup.
 */
const SmsConsentCheckbox = ({
  checked,
  onChange,
  lang = "en",
  variant = "light",
  id = "sms-consent",
  className = "",
}: SmsConsentCheckboxProps) => {
  const es = lang === "es";
  const textClass = variant === "dark" ? "text-white/70" : "text-muted-foreground";
  const linkClass = variant === "dark" ? "text-white underline" : "text-primary underline";

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <input
        type="checkbox"
        id={id}
        name="sms_consent"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-current cursor-pointer"
      />
      <label htmlFor={id} className={`text-xs leading-relaxed cursor-pointer ${textClass}`}>
        {es ? SMS_CONSENT_TEXT_ES : SMS_CONSENT_TEXT_EN}{" "}
        <Link to="/privacy-policy" className={linkClass}>
          {es ? "Política de Privacidad" : "Privacy Policy"}
        </Link>
        {" · "}
        <Link to="/sms-terms" className={linkClass}>
          {es ? "Términos SMS" : "SMS Terms"}
        </Link>
        {". "}
        <span className="opacity-80">
          {es ? "(Opcional)" : "(Optional — not required to submit.)"}
        </span>
      </label>
    </div>
  );
};

export default SmsConsentCheckbox;