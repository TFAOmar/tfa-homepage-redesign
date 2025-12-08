export interface Advisor {
  id: number | string;
  name: string;
  title: string;
  type: "Advisor" | "Broker";
  state: string;
  city: string;
  region: string;
  bio: string;
  specialties: string[];
  licenses: string[];
  image?: string;
  email?: string;
  phone?: string;
  yearsOfExperience?: number;
}

export const advisors: Advisor[] = [
  {
    id: 0,
    name: "Manuel Soto",
    title: "Founder & CEO",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Founder of TFA Insurance Advisors, dedicated to helping families achieve financial security and build lasting legacies.",
    specialties: ["Retirement Planning", "Tax Strategies", "Estate Planning", "Business Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/manuel-soto.jpg"
  },
  {
    id: "israel-castaneda",
    name: "Israel Castaneda",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Passionate about helping families build wealth and secure their financial futures through personalized strategies.",
    specialties: ["Retirement Planning", "Life Insurance", "Investment Management"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/israel-castaneda.jpg"
  },
  {
    id: "elena-esquivel",
    name: "Elena Esquivel",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Dedicated to empowering clients with financial knowledge and strategies for long-term success.",
    specialties: ["Estate Planning", "Tax Strategies", "Retirement Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/elena-esquivel.jpg"
  },
  {
    id: "jose-estrada",
    name: "Jose Estrada",
    title: "Senior Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Orange County",
    region: "West",
    bio: "Experienced advisor focused on comprehensive wealth management and retirement planning solutions.",
    specialties: ["Retirement Planning", "Business Planning", "Tax Strategies"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/jose-estrada.jpg"
  },
  {
    id: "ronald-brown",
    name: "Ronald Brown",
    title: "Financial Advisor",
    type: "Advisor",
    state: "Texas",
    city: "Houston",
    region: "Southwest",
    bio: "Committed to helping families achieve financial independence through tailored planning strategies.",
    specialties: ["Retirement Planning", "Life Insurance", "Estate Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/ronald-brown.jpg"
  },
  {
    id: "erika-manzano",
    name: "Erika Manzano",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "San Diego",
    region: "West",
    bio: "Helping clients navigate their financial journey with personalized guidance and expertise.",
    specialties: ["Retirement Planning", "Tax Strategies", "Investment Management"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/erika-manzano.jpg"
  },
  {
    id: "celeste-sierra",
    name: "Celeste Sierra",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Riverside",
    region: "West",
    bio: "Passionate about building lasting client relationships and creating customized financial plans.",
    specialties: ["Life Insurance", "Estate Planning", "Retirement Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/celeste-sierra.jpg"
  },
  {
    id: "jorge-hernandez",
    name: "Jorge Hernandez",
    title: "Senior Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Inland Empire",
    region: "West",
    bio: "Bringing years of experience to help clients achieve their financial goals and protect their families.",
    specialties: ["Business Planning", "Retirement Planning", "Tax Strategies"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/jorge-hernandez.jpg"
  },
  {
    id: "joe-jessie-nieto",
    name: "Joe & Jessie Nieto",
    title: "Financial Advisors",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "A dynamic duo dedicated to helping families build generational wealth and financial security.",
    specialties: ["Retirement Planning", "Estate Planning", "Life Insurance"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/joe-jessie-nieto.jpg"
  },
  {
    id: "jennifer-ramos",
    name: "Jennifer Ramos",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Orange County",
    region: "West",
    bio: "Focused on empowering clients with the knowledge and tools to achieve lasting financial success.",
    specialties: ["Retirement Planning", "Tax Strategies", "Investment Management"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/jennifer-ramos.jpg"
  },
  {
    id: "hamlet-ohandjanian",
    name: "Hamlet Ohandjanian",
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "After a 28-year career in the hospitality industry as a Director of Operations, where he developed and promoted dozens of industry leaders, Hamlet saw the need for more result-driven financial educators and strategists. A God-loving family man, he is passionate about helping others with integrity and transparency, seeing every individual as an opportunity to help someone and their family with retirement and financial planning strategies.",
    specialties: ["Retirement Planning", "Financial Planning", "Tax Strategies"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/hamlet-ohandjanian.jpg"
  },
  {
    id: "delia-plascencia",
    name: "Delia Plascencia",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Passionate about helping families achieve their financial dreams through personalized guidance.",
    specialties: ["Life Insurance", "Estate Planning", "Retirement Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/delia-plascencia.jpg"
  },
  {
    id: "mariah-lorenzen",
    name: "Mariah Lorenzen",
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Orange County",
    region: "West",
    bio: "Committed to building lasting relationships and creating customized financial solutions.",
    specialties: ["Retirement Planning", "Tax Strategies", "Estate Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/mariah-lorenzen.jpg"
  },
  {
    id: "sean-cagle",
    name: "Sean Cagle",
    title: "Senior Estate Planning Partner",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Sean specializes in all aspects of estate planning, creating customized strategies that safeguard assets and preserve family legacies. He is dedicated to helping clients design plans that reflect their values while providing peace of mind for generations to come.",
    specialties: ["Estate Planning", "Tax Strategies", "Retirement Planning"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/sean-cagle.jpg"
  }
];

export const states = [
  "All States",
  ...Array.from(new Set(advisors.map(a => a.state))).sort()
];

export const specialties = [
  "All Specialties",
  "Retirement Planning",
  "Tax Strategies",
  "Estate Planning",
  "Life Insurance",
  "Annuities",
  "Business Planning",
  "401(k) Guidance",
  "Investment Management"
];
