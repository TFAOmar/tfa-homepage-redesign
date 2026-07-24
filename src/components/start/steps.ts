import type { Dict } from "@/lib/i18n/dictionary";

export type Option = { value: string; en: string; es: string };
export type Question = {
  id: string;
  en: string;
  es: string;
  options: Option[];
};

const AGE_RANGES: Option[] = [
  { value: "<30", en: "Under 30", es: "Menos de 30" },
  { value: "30-40", en: "30–40", es: "30–40" },
  { value: "40-50", en: "40–50", es: "40–50" },
  { value: "50-65", en: "50–65", es: "50–65" },
  { value: "65+", en: "65+", es: "65+" },
];

export const TRUST_STEPS: Question[] = [
  {
    id: "real_estate",
    en: "Do you own real estate?",
    es: "¿Eres dueño de propiedades?",
    options: [
      { value: "ca", en: "Own in California", es: "En California" },
      { value: "ca_plus", en: "California + elsewhere", es: "California y otro estado" },
      { value: "no", en: "Not yet", es: "Todavía no" },
    ],
  },
  {
    id: "family_status",
    en: "Family status",
    es: "Estado familiar",
    options: [
      { value: "single", en: "Single", es: "Soltero/a" },
      { value: "married", en: "Married / partnered", es: "Casado/a o en pareja" },
      { value: "widowed", en: "Widowed", es: "Viudo/a" },
      { value: "divorced", en: "Divorced", es: "Divorciado/a" },
    ],
  },
  {
    id: "dependents",
    en: "Children or dependents",
    es: "Hijos o dependientes",
    options: [
      { value: "none", en: "None", es: "Ninguno" },
      { value: "adult", en: "Adult children", es: "Hijos adultos" },
      { value: "minor", en: "Minor children", es: "Hijos menores" },
      { value: "special", en: "Special-needs dependent", es: "Dependiente con necesidades especiales" },
    ],
  },
  {
    id: "existing_docs",
    en: "Do you have a will or trust already?",
    es: "¿Ya tienes testamento o fideicomiso?",
    options: [
      { value: "nothing", en: "Nothing yet", es: "Nada todavía" },
      { value: "will", en: "A will", es: "Un testamento" },
      { value: "old_trust", en: "An older trust", es: "Un fideicomiso antiguo" },
      { value: "not_sure", en: "Not sure", es: "No estoy seguro" },
    ],
  },
  {
    id: "estate",
    en: "Estate composition",
    es: "Composición del patrimonio",
    options: [
      { value: "home_savings", en: "Home + savings", es: "Casa y ahorros" },
      { value: "home_invest", en: "Home + investments + retirement", es: "Casa, inversiones y retiro" },
      { value: "business", en: "Business or multiple properties", es: "Negocio o varias propiedades" },
      { value: "discuss", en: "Prefer to discuss", es: "Prefiero hablarlo" },
    ],
  },
  {
    id: "why_now",
    en: "What's prompting this now?",
    es: "¿Qué te motiva ahora?",
    options: [
      { value: "planning", en: "Planning ahead", es: "Planear con tiempo" },
      { value: "life_event", en: "Life event", es: "Evento de vida" },
      { value: "health", en: "Health concern in family", es: "Preocupación de salud familiar" },
      { value: "deadline", en: "A deadline", es: "Una fecha límite" },
    ],
  },
];

export const LIFE_STEPS: Question[] = [
  { id: "age", en: "Age range", es: "Rango de edad", options: AGE_RANGES },
  {
    id: "nicotine",
    en: "Nicotine use in the last 12 months",
    es: "Uso de nicotina en los últimos 12 meses",
    options: [
      { value: "no", en: "No", es: "No" },
      { value: "occasional", en: "Occasionally", es: "Ocasional" },
      { value: "yes", en: "Yes", es: "Sí" },
    ],
  },
  {
    id: "health",
    en: "How would you rate your health?",
    es: "¿Cómo calificas tu salud?",
    options: [
      { value: "excellent", en: "Excellent", es: "Excelente" },
      { value: "good", en: "Good", es: "Buena" },
      { value: "condition", en: "Managing a condition", es: "Manejando una condición" },
      { value: "discuss", en: "Prefer to discuss", es: "Prefiero hablarlo" },
    ],
  },
  {
    id: "purpose",
    en: "What's the coverage for?",
    es: "¿Para qué es la cobertura?",
    options: [
      { value: "family", en: "Family income", es: "Ingreso familiar" },
      { value: "mortgage", en: "Mortgage", es: "Hipoteca" },
      { value: "kids", en: "Kids' future", es: "Futuro de los hijos" },
      { value: "business", en: "Business", es: "Negocio" },
      { value: "help", en: "Not sure — help me", es: "No estoy seguro — ayúdame" },
    ],
  },
  {
    id: "coverage",
    en: "Coverage amount",
    es: "Monto de cobertura",
    options: [
      { value: "250k", en: "$250K", es: "$250K" },
      { value: "500k", en: "$500K", es: "$500K" },
      { value: "1m", en: "$1M", es: "$1M" },
      { value: "1m+", en: "$1M+", es: "Más de $1M" },
      { value: "help", en: "Help me estimate", es: "Ayúdame a calcular" },
    ],
  },
  {
    id: "term",
    en: "Term length",
    es: "Duración del plazo",
    options: [
      { value: "10", en: "10 years", es: "10 años" },
      { value: "20", en: "20 years", es: "20 años" },
      { value: "30", en: "30 years", es: "30 años" },
      { value: "until_kids", en: "Until kids grown", es: "Hasta que crezcan los hijos" },
      { value: "not_sure", en: "Not sure", es: "No estoy seguro" },
    ],
  },
  {
    id: "existing",
    en: "Existing coverage",
    es: "Cobertura actual",
    options: [
      { value: "none", en: "None", es: "Ninguna" },
      { value: "work", en: "Through work only", es: "Solo por el trabajo" },
      { value: "personal", en: "Personal policy", es: "Póliza personal" },
    ],
  },
];

export const RETIRE_STEPS: Question[] = [
  { id: "age", en: "Age range", es: "Rango de edad", options: AGE_RANGES },
  {
    id: "window",
    en: "Target retirement window",
    es: "Cuándo planeas retirarte",
    options: [
      { value: "<5", en: "Less than 5 years", es: "Menos de 5 años" },
      { value: "5-15", en: "5–15 years", es: "5–15 años" },
      { value: "15+", en: "15+ years", es: "Más de 15 años" },
      { value: "retired", en: "Already retired", es: "Ya retirado/a" },
    ],
  },
  {
    id: "work",
    en: "Work situation",
    es: "Situación laboral",
    options: [
      { value: "employed_plan", en: "Employed with a retirement plan", es: "Empleado con plan de retiro" },
      { value: "employed_no_plan", en: "Employed, no plan", es: "Empleado, sin plan" },
      { value: "self", en: "Self-employed / business owner", es: "Independiente o dueño de negocio" },
      { value: "retired", en: "Retired", es: "Retirado/a" },
    ],
  },
  {
    id: "old_401k",
    en: "Old 401(k)s from previous jobs?",
    es: "¿Tienes 401(k) de trabajos anteriores?",
    options: [
      { value: "yes", en: "Yes", es: "Sí" },
      { value: "no", en: "No", es: "No" },
      { value: "not_sure", en: "Not sure", es: "No estoy seguro" },
    ],
  },
  {
    id: "savings",
    en: "Approximate retirement savings",
    es: "Ahorros aproximados para retiro",
    options: [
      { value: "<50k", en: "Under $50K", es: "Menos de $50K" },
      { value: "50-250k", en: "$50–250K", es: "$50–250K" },
      { value: "250k-1m", en: "$250K–1M", es: "$250K–1M" },
      { value: "1m+", en: "$1M+", es: "Más de $1M" },
      { value: "discuss", en: "Prefer to discuss", es: "Prefiero hablarlo" },
    ],
  },
  {
    id: "worry",
    en: "Biggest worry",
    es: "Mayor preocupación",
    options: [
      { value: "outliving", en: "Outliving my money", es: "Que se acabe el dinero" },
      { value: "market", en: "Market drops", es: "Caídas del mercado" },
      { value: "taxes", en: "Taxes", es: "Impuestos" },
      { value: "ss", en: "Social Security timing", es: "Cuándo tomar Seguro Social" },
      { value: "start", en: "Just getting started", es: "Apenas empezando" },
    ],
  },
  {
    id: "save_monthly",
    en: "Able to save monthly?",
    es: "¿Puedes ahorrar mensualmente?",
    options: [
      { value: "regular", en: "Regularly", es: "Regularmente" },
      { value: "sometimes", en: "Sometimes", es: "A veces" },
      { value: "no", en: "Not right now", es: "Ahora no" },
    ],
  },
];

export function buildCombinationSteps(services: string[]): Question[] {
  const steps: Question[] = [
    { id: "age", en: "Age range", es: "Rango de edad", options: AGE_RANGES },
    TRUST_STEPS[1], // family_status
    {
      id: "homeowner",
      en: "Do you own a home?",
      es: "¿Eres dueño de una casa?",
      options: [
        { value: "yes", en: "Yes", es: "Sí" },
        { value: "no", en: "No", es: "No" },
      ],
    },
    RETIRE_STEPS[2], // work situation
  ];
  if (services.includes("trust")) steps.push(TRUST_STEPS[3]);
  if (services.includes("life")) {
    steps.push(LIFE_STEPS[1]); // nicotine
    steps.push(LIFE_STEPS[6]); // existing
  }
  if (services.includes("retirement")) steps.push(RETIRE_STEPS[3]); // old 401k
  steps.push({
    id: "anchor",
    en: "If we could solve one thing first, which one?",
    es: "Si pudiéramos resolver una sola cosa primero, ¿cuál sería?",
    options: services.map((s) =>
      s === "trust"
        ? { value: "trust", en: "Living trust", es: "Fideicomiso" }
        : s === "life"
          ? { value: "life", en: "Term life insurance", es: "Seguro de vida" }
          : { value: "retirement", en: "Retirement planning", es: "Plan de retiro" },
    ),
  });
  return steps.slice(0, 8);
}

export function questionsFor(services: string[]): Question[] {
  if (services.length > 1) return buildCombinationSteps(services);
  const s = services[0];
  if (s === "trust") return TRUST_STEPS;
  if (s === "life") return LIFE_STEPS;
  if (s === "retirement") return RETIRE_STEPS;
  return [];
}