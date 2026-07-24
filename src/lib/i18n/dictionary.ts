export type Lang = "en" | "es";

export const CONSENT_VERSION = "v1-2026-07";

export const dict = {
  en: {
    // Global
    langToggle: { en: "EN", es: "ES", aria: "Change language" },
    brand: "The Financial Architects",

    // /start hero
    heroTitle: "Let's build your blueprint.",
    heroSub: "2 minutes. No spam. A real person follows up.",
    referredBy: "Referred by",

    // Service picker
    step0Title: "What are you here to build?",
    step0Sub: "Pick one to get started — you can add more later.",
    svcTrust: "Living Trust",
    svcTrustDesc: "Protect your family and your home in California.",
    svcLife: "Term Life Insurance",
    svcLifeDesc: "Affordable coverage for income, mortgage, or family.",
    svcRetire: "Retirement Planning",
    svcRetireDesc: "Grow, protect, and turn savings into income.",
    svcCombo: "A combination",
    svcComboDesc: "Pick more than one — we'll adapt the questions.",
    pickMultiple: "Which services interest you?",
    continue: "Continue",
    back: "Back",

    // Contact
    contactTitle: "Last step — how do we reach you?",
    firstName: "First name",
    lastName: "Last name",
    phone: "Mobile phone",
    email: "Email (optional)",
    zip: "ZIP code",
    bestTime: "Best time to talk",
    times: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
    prefLang: "Preferred language",

    // Consent
    consentTcpa:
      "By checking this box and tapping “Get My Blueprint”, I provide my electronic signature and expressly consent to receive calls and text messages — including via automated technology and prerecorded messages — from The Financial Architects / TFA Insurance Advisors at the number I provided, about my inquiry and related financial services. Consent is not a condition of purchase. Message frequency varies; message & data rates may apply. Reply STOP to cancel, HELP for help. See our Privacy Policy and Terms.",
    consentReferrer: (name: string) =>
      `It's OK to include ${name}, who referred me, on the introductory text thread.`,
    submit: "Get My Blueprint",

    // Confirmation
    confirmTitleDay: (n: string) =>
      `Perfect, ${n}! Watch your texts — we're introducing you to your TFA specialist now.`,
    confirmTitleQuiet: (n: string) =>
      `Thanks, ${n}! We received your info. Your TFA specialist will reach out first thing in the morning.`,
    orBook: "Or book directly",

    // Validation
    required: "Required",
    invalidPhone: "Enter a valid US mobile number",
    invalidEmail: "Enter a valid email",
    invalidZip: "Enter a 5-digit ZIP",
    mustConsent: "You must consent to be contacted",
  },
  es: {
    langToggle: { en: "EN", es: "ES", aria: "Cambiar idioma" },
    brand: "The Financial Architects",

    heroTitle: "Construyamos tu plan.",
    heroSub: "2 minutos. Sin spam. Una persona real te responde.",
    referredBy: "Referido por",

    step0Title: "¿Qué te trae aquí hoy?",
    step0Sub: "Elige uno para empezar — puedes agregar más después.",
    svcTrust: "Fideicomiso Familiar",
    svcTrustDesc: "Protege a tu familia y tu casa en California.",
    svcLife: "Seguro de Vida Temporal",
    svcLifeDesc: "Cobertura accesible para ingresos, hipoteca o familia.",
    svcRetire: "Plan de Retiro",
    svcRetireDesc: "Haz crecer, protege y convierte tus ahorros en ingresos.",
    svcCombo: "Una combinación",
    svcComboDesc: "Elige más de uno — adaptamos las preguntas.",
    pickMultiple: "¿Qué servicios te interesan?",
    continue: "Continuar",
    back: "Atrás",

    contactTitle: "Último paso — ¿cómo te contactamos?",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono celular",
    email: "Correo electrónico (opcional)",
    zip: "Código postal",
    bestTime: "Mejor hora para llamarte",
    times: { morning: "Mañana", afternoon: "Tarde", evening: "Noche" },
    prefLang: "Idioma preferido",

    consentTcpa:
      "Al marcar esta casilla y tocar “Obtener mi plan”, doy mi firma electrónica y consiento expresamente recibir llamadas y mensajes de texto — incluso mediante tecnología automatizada y mensajes pregrabados — de The Financial Architects / TFA Insurance Advisors al número que proporcioné, sobre mi consulta y servicios financieros relacionados. El consentimiento no es condición para comprar. La frecuencia de mensajes varía; pueden aplicar tarifas por mensaje y datos. Responde STOP para cancelar, HELP para ayuda. Consulta nuestra Política de Privacidad y Términos.",
    consentReferrer: (name: string) =>
      `Está bien incluir a ${name}, quien me refirió, en el hilo de texto de presentación.`,
    submit: "Obtener mi plan",

    confirmTitleDay: (n: string) =>
      `¡Perfecto, ${n}! Revisa tus mensajes — te estamos presentando con tu especialista de TFA ahora.`,
    confirmTitleQuiet: (n: string) =>
      `¡Gracias, ${n}! Recibimos tu información. Tu especialista de TFA te contactará mañana temprano.`,
    orBook: "O agenda directamente",

    required: "Requerido",
    invalidPhone: "Ingresa un número de celular válido",
    invalidEmail: "Ingresa un correo válido",
    invalidZip: "Ingresa un código postal de 5 dígitos",
    mustConsent: "Debes dar tu consentimiento para ser contactado",
  },
} as const;

export type Dict = typeof dict.en;