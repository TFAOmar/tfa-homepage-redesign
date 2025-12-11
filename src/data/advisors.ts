// Import advisor images
import manuelSotoImg from "@/assets/advisors/manuel-soto.jpg";
import israelCastanedaImg from "@/assets/advisors/israel-castaneda.jpg";
import elenaEsquivelImg from "@/assets/advisors/elena-esquivel.jpg";
import joseEstradaImg from "@/assets/advisors/jose-estrada.jpg";
import ronaldBrownImg from "@/assets/advisors/ronald-brown.jpg";
import erikaManzanoImg from "@/assets/advisors/erika-manzano.jpg";
import celesteSierraImg from "@/assets/advisors/celeste-sierra.jpg";
import jorgeHernandezImg from "@/assets/advisors/jorge-hernandez.jpg";
import joeJessieNietoImg from "@/assets/advisors/joe-jessie-nieto.jpg";
import jenniferRamosImg from "@/assets/advisors/jennifer-ramos.jpg";
import hamletOhandjanianImg from "@/assets/advisors/hamlet-ohandjanian.jpg";
import deliaPlascenciaImg from "@/assets/advisors/delia-plascencia.jpg";
import mariahLorenzenImg from "@/assets/advisors/mariah-lorenzen.jpg";
import seanCagleImg from "@/assets/advisors/sean-cagle.jpg";
import vanessaSanchezImg from "@/assets/advisors/vanessa-sanchez.jpg";

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
    licenses: ["Life & Health (Lic# 0D87636)"],
    image: manuelSotoImg
  },
  {
    id: "israel-castaneda",
    name: "Israel Castaneda",
    title: "Partner",
    type: "Advisor",
    state: "California",
    city: "Madera",
    region: "West",
    bio: "Israel helps families build generational security and long-term financial peace of mind. Specializing in life insurance, retirement planning, living trusts, and estate-protection strategies, he makes complex financial decisions easy to understand. Known for his clear communication and genuine care, Israel focuses on the 'why' behind every financial move, helping families protect what matters most and build a legacy for the next generation.",
    specialties: ["Life Insurance", "Retirement Planning", "Estate Planning", "Tax Strategies"],
    licenses: ["Life & Health (Lic# 0I35205)"],
    image: israelCastanedaImg
  },
  {
    id: "elena-esquivel",
    name: "Elena Esquivel",
    title: "Financial Strategist & Estate Planning Consultant",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "With over 15 years in Insurance and Financial Services, Elena specializes in Medicare planning, Income Protection, Retirement Strategies, and comprehensive Estate Planning. A former top producer at Kaiser Permanente for five consecutive years, she excels in guiding clients through 401(k) rollovers, wealth-preservation strategies, sustainable retirement income, and estate planning solutions including living trusts and legacy protection. Her mission: to empower families with clarity, confidence, and lasting financial freedom.",
    specialties: ["Retirement Planning", "401(k) Guidance", "Estate Planning", "Tax Strategies"],
    licenses: ["Life & Health (Lic# 4218087)"],
    image: elenaEsquivelImg,
    email: "eeesquivel@tfainsuranceadvisors.com",
    phone: "(951) 255-4997"
  },
  {
    id: "jose-estrada",
    name: "Jose Estrada",
    title: "Senior Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "San Dimas",
    region: "West",
    bio: "Experienced advisor focused on comprehensive wealth management and retirement planning solutions.",
    specialties: ["Retirement Planning", "Business Planning", "Tax Strategies"],
    licenses: ["Life & Health"],
    image: joseEstradaImg,
    email: "Jose@agefinancial.com",
    phone: "(909) 592-5481"
  },
  {
    id: "ronald-brown",
    name: "Ronald Brown",
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Rancho Cucamonga",
    region: "West",
    bio: "Ron retired from his first career of over 30 years in the automotive industry, working with top dealers including 18 years with the Penske organization where he grew from general sales manager to president of a region. With a love of helping people and seeing the need for sound financial education, Ron joined his life partner Jennifer Ramos in business to help families achieve financial security.",
    specialties: ["Retirement Planning", "Life Insurance", "Estate Planning"],
    licenses: ["Life & Health (Lic# 4418658)"],
    image: ronaldBrownImg
  },
  {
    id: "erika-manzano",
    name: "Erika Manzano",
    title: "Financial Educator",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Erika prides herself in financial education that helps individuals, families, and business owners align their financial decisions with their faith. Through personalized coaching, workshops, and educational resources, she fosters both financial health and spiritual growth while supporting clients' beliefs and long-term goals.",
    specialties: ["Retirement Planning", "Tax Strategies", "Investment Management"],
    licenses: ["Life & Health (Lic# 0L33842)"],
    image: erikaManzanoImg
  },
  {
    id: "celeste-sierra",
    name: "Celeste Sierra",
    title: "Mortgage Broker & Financial Advisor",
    type: "Broker",
    state: "California",
    city: "Claremont",
    region: "West",
    bio: "With 26 years in mortgage financing, Celeste is Broker/Owner of LOAN|BOX Loans. Her career spans leadership roles at Bank of Manhattan, JL Investments, and American General Finance. A California Real Estate Broker and 2011 'Outstanding Small Businesswoman' honoree, she's passionate about community involvement and is a proud mother of two daughters, Cayllie and Mayah.",
    specialties: ["Mortgage Financing", "Real Estate", "Retirement Planning"],
    licenses: ["Real Estate Broker", "Life & Health (Lic# 0C25357)"],
    image: celesteSierraImg
  },
  {
    id: "jorge-hernandez",
    name: "Jorge Hernandez",
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Glendora",
    region: "West",
    bio: "With over 30 years in estate planning, Jorge is a trusted guide for families and business owners. Holding an English degree from University of La Verne and a Juris Doctorate, he began his career at Transamerica before becoming a Managing Partner at TFA. Jorge regularly leads estate planning workshops, turning legal jargon into everyday language and helping families avoid probate, reduce taxes, and pass down wealth efficiently.",
    specialties: ["Estate Planning", "Tax Strategies", "Business Planning"],
    licenses: ["Life & Health (Lic# 0F66052)"],
    image: jorgeHernandezImg
  },
  {
    id: "joe-jessie-nieto",
    name: "Joe & Jessie Nieto",
    title: "Financial Advisors",
    type: "Advisor",
    state: "California",
    city: "Whittier",
    region: "West",
    bio: "A dynamic duo dedicated to helping families build generational wealth and financial security.",
    specialties: ["Retirement Planning", "Estate Planning", "Life Insurance"],
    licenses: ["Life & Health"],
    image: joeJessieNietoImg
  },
  {
    id: "jennifer-ramos",
    name: "Jennifer Ramos",
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Rancho Cucamonga",
    region: "West",
    bio: "Jennifer has been licensed in the financial services industry for over 20 years. Known as the 'trainer of the trainers,' she has coached hundreds of new financial advisors. A Sales Hall of Fame inductee for the number of clients she helped, Jennifer expanded TFA's footprint by opening an office in Rancho Cucamonga to serve her neighbors and community.",
    specialties: ["Retirement Planning", "Tax Strategies", "Investment Management"],
    licenses: ["Life & Health"],
    image: jenniferRamosImg
  },
  {
    id: "hamlet-ohandjanian",
    name: "Hamlet Ohandjanian",
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Granada Hills",
    region: "West",
    bio: "After a 28-year career in the hospitality industry as a Director of Operations, where he developed and promoted dozens of industry leaders, Hamlet saw the need for more result-driven financial educators and strategists. A God-loving family man, he is passionate about helping others with integrity and transparency, seeing every individual as an opportunity to help someone and their family with retirement and financial planning strategies.",
    specialties: ["Retirement Planning", "Financial Planning", "Tax Strategies"],
    licenses: ["Life & Health (Lic# 4379309)"],
    image: hamletOhandjanianImg
  },
  {
    id: "delia-plascencia",
    name: "Delia Plascencia",
    title: "Franchise Partner",
    type: "Advisor",
    state: "California",
    city: "Corona",
    region: "West",
    bio: "Born to parents who migrated from Guadalajara, Mexico, Delia has always been fueled by the immigrant spirit. A mother of two incredible children, she co-owned a staffing agency in the Inland Empire before launching an interior design firm in 2016. In 2020, she co-launched a podcast on relationships and faith. Today, she and her sister own a TFA franchise, helping families with financial planning—guided by her faith, resilience, and pursuit of meaningful connections.",
    specialties: ["Life Insurance", "Estate Planning", "Retirement Planning"],
    licenses: ["Life & Health (Lic# 4222120)"],
    image: deliaPlascenciaImg
  },
  {
    id: "mariah-lorenzen",
    name: "Mariah Lorenzen",
    title: "Head of Franchise Operations",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Mariah has extensive experience in financial services, serving as Head of Franchise Operations at TFA since 2019. Her career spans roles at New American Funding, Finance of America Commercial, CrossCountry Mortgage, Carrington Mortgage Services, and Green Tree Servicing. A licensed loan originator focused on purchase and refinance transactions, Mariah brings deep mortgage expertise to help clients achieve their financial goals.",
    specialties: ["Mortgage Financing", "Retirement Planning", "Tax Strategies"],
    licenses: ["Loan Originator", "Life & Health (Lic# 0F93770)"],
    image: mariahLorenzenImg
  },
  {
    id: "sean-cagle",
    name: "Sean Cagle",
    title: "Senior Estate Planning Partner",
    type: "Advisor",
    state: "Arizona",
    city: "Arizona",
    region: "Southwest",
    bio: "Sean specializes in all aspects of estate planning, creating customized strategies that safeguard assets and preserve family legacies. He is dedicated to helping clients design plans that reflect their values while providing peace of mind for generations to come.",
    specialties: ["Estate Planning", "Tax Strategies", "Retirement Planning"],
    licenses: ["Life & Health"],
    image: seanCagleImg
  },
  {
    id: "vanessa-sanchez",
    name: "Vanessa Crystal Sanchez",
    title: "Financial Strategist",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Vanessa guides individuals, families, and business owners through wealth building, protection, and long-term planning. Her holistic approach ensures every plan is intentional, strategic, and aligned with long-term goals—from retirement planning and tax-efficient life insurance to estate planning with living trusts. Known for her clarity and compassion, she turns overwhelming financial decisions into simple, actionable steps.",
    specialties: ["Retirement Planning", "Estate Planning", "Tax Strategies", "Business Planning", "Life Insurance"],
    licenses: ["Life & Health"],
    image: vanessaSanchezImg
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
