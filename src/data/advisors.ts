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
    title: "Partner",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Israel helps families build generational security and long-term financial peace of mind. Specializing in life insurance, retirement planning, living trusts, and estate-protection strategies, he makes complex financial decisions easy to understand. Known for his clear communication and genuine care, Israel focuses on the 'why' behind every financial move, helping families protect what matters most and build a legacy for the next generation.",
    specialties: ["Life Insurance", "Retirement Planning", "Estate Planning", "Tax Strategies"],
    licenses: ["Series 65", "Life & Health"],
    image: "/src/assets/advisors/israel-castaneda.jpg"
  },
  {
    id: "elena-esquivel",
    name: "Elena Esquivel",
    title: "Financial Strategist & Retirement Specialist",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "With over 15 years in Insurance and Financial Services, Elena specializes in Medicare planning, Income Protection, and Retirement Strategies. A former top producer at Kaiser Permanente for five consecutive years, she now guides clients through 401(k) rollovers, wealth protection, and retirement income maximization. Her mission: to empower families to build a legacy of financial freedom and peace of mind.",
    specialties: ["Retirement Planning", "401(k) Guidance", "Estate Planning", "Tax Strategies"],
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
    title: "Managing Partner",
    type: "Advisor",
    state: "Texas",
    city: "Houston",
    region: "Southwest",
    bio: "Ron retired from his first career of over 30 years in the automotive industry, working with top dealers including 18 years with the Penske organization where he grew from general sales manager to president of a region. With a love of helping people and seeing the need for sound financial education, Ron joined his life partner Jennifer Ramos in business to help families achieve financial security.",
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
    title: "Mortgage Broker & Financial Advisor",
    type: "Broker",
    state: "California",
    city: "Riverside",
    region: "West",
    bio: "With 26 years in mortgage financing, Celeste is Broker/Owner of LOAN|BOX Loans. Her career spans leadership roles at Bank of Manhattan, JL Investments, and American General Finance. A California Real Estate Broker and 2011 'Outstanding Small Businesswoman' honoree, she's passionate about community involvement and is a proud mother of two daughters, Cayllie and Mayah.",
    specialties: ["Mortgage Financing", "Real Estate", "Retirement Planning"],
    licenses: ["Real Estate Broker", "Life & Health"],
    image: "/src/assets/advisors/celeste-sierra.jpg"
  },
  {
    id: "jorge-hernandez",
    name: "Jorge Hernandez",
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Inland Empire",
    region: "West",
    bio: "With over 30 years in estate planning, Jorge is a trusted guide for families and business owners. Holding an English degree from University of La Verne and a Juris Doctorate, he began his career at Transamerica before becoming a Managing Partner at TFA. Jorge regularly leads estate planning workshops, turning legal jargon into everyday language and helping families avoid probate, reduce taxes, and pass down wealth efficiently.",
    specialties: ["Estate Planning", "Tax Strategies", "Business Planning"],
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
    title: "Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Rancho Cucamonga",
    region: "West",
    bio: "Jennifer has been licensed in the financial services industry for over 20 years. Known as the 'trainer of the trainers,' she has coached hundreds of new financial advisors. A Sales Hall of Fame inductee for the number of clients she helped, Jennifer expanded TFA's footprint by opening an office in Rancho Cucamonga to serve her neighbors and community.",
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
    title: "Franchise Partner",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Born to parents who migrated from Guadalajara, Mexico, Delia has always been fueled by the immigrant spirit. A mother of two incredible children, she co-owned a staffing agency in the Inland Empire before launching an interior design firm in 2016. In 2020, she co-launched a podcast on relationships and faith. Today, she and her sister own a TFA franchise, helping families with financial planning—guided by her faith, resilience, and pursuit of meaningful connections.",
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
