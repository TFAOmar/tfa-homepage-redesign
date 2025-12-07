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
    title: "Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Dedicated to providing comprehensive financial planning and wealth management strategies.",
    specialties: ["Retirement Planning", "Investment Management", "Tax Strategies"],
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
    id: 1,
    name: "Michael Rodriguez",
    title: "Senior Financial Advisor",
    type: "Advisor",
    state: "California",
    city: "Los Angeles",
    region: "West",
    bio: "Helping families build lasting wealth through comprehensive retirement and investment strategies.",
    specialties: ["Retirement Planning", "Tax Strategies", "Estate Planning"],
    licenses: ["Series 65", "Life & Health"]
  },
  {
    id: 2,
    name: "Jennifer Chen",
    title: "Life Insurance Broker",
    type: "Broker",
    state: "New York",
    city: "New York",
    region: "Northeast",
    bio: "Specializing in life insurance solutions that protect what matters most to your family.",
    specialties: ["Life Insurance", "Estate Planning"],
    licenses: ["Life & Health", "Long-term Care"]
  },
  {
    id: 3,
    name: "David Thompson",
    title: "Retirement Planning Specialist",
    type: "Advisor",
    state: "Texas",
    city: "Dallas",
    region: "Southwest",
    bio: "Guiding clients through confident retirement transitions with personalized income strategies.",
    specialties: ["Retirement Planning", "401(k) Guidance", "Annuities"],
    licenses: ["Series 65", "Series 63"]
  },
  {
    id: 4,
    name: "Sarah Williams",
    title: "Estate Planning Advisor",
    type: "Advisor",
    state: "Florida",
    city: "Miami",
    region: "Southeast",
    bio: "Creating legacy plans that honor your values and protect your loved ones for generations.",
    specialties: ["Estate Planning", "Tax Strategies", "Business Planning"],
    licenses: ["Series 65", "Life & Health"]
  },
  {
    id: 5,
    name: "James Park",
    title: "Senior Life Insurance Broker",
    type: "Broker",
    state: "Illinois",
    city: "Chicago",
    region: "Midwest",
    bio: "Providing comprehensive insurance solutions tailored to your unique family needs.",
    specialties: ["Life Insurance", "Annuities", "Long-term Care"],
    licenses: ["Life & Health", "Long-term Care"]
  },
  {
    id: 6,
    name: "Emily Martinez",
    title: "Tax Strategy Advisor",
    type: "Advisor",
    state: "Washington",
    city: "Seattle",
    region: "West",
    bio: "Maximizing wealth preservation through strategic tax planning and investment management.",
    specialties: ["Tax Strategies", "Investment Management", "Retirement Planning"],
    licenses: ["Series 65", "CPA"]
  },
  {
    id: 7,
    name: "Robert Johnson",
    title: "Business Planning Specialist",
    type: "Advisor",
    state: "Georgia",
    city: "Atlanta",
    region: "Southeast",
    bio: "Helping business owners navigate succession planning and executive benefits.",
    specialties: ["Business Planning", "Executive Benefits", "Estate Planning"],
    licenses: ["Series 65", "Series 7"]
  },
  {
    id: 8,
    name: "Lisa Nguyen",
    title: "Financial Advisor",
    type: "Advisor",
    state: "Arizona",
    city: "Phoenix",
    region: "West",
    bio: "Building personalized financial roadmaps that align with your family's goals and values.",
    specialties: ["Retirement Planning", "Investment Management", "401(k) Guidance"],
    licenses: ["Series 65", "Life & Health"]
  },
  {
    id: 9,
    name: "Christopher Davis",
    title: "Annuity Specialist",
    type: "Broker",
    state: "Pennsylvania",
    city: "Philadelphia",
    region: "Northeast",
    bio: "Designing secure income strategies with guaranteed lifetime income solutions.",
    specialties: ["Annuities", "Retirement Planning", "Life Insurance"],
    licenses: ["Life & Health", "Series 65"]
  },
  {
    id: 10,
    name: "Amanda Taylor",
    title: "Senior Financial Advisor",
    type: "Advisor",
    state: "Colorado",
    city: "Denver",
    region: "Mountain",
    bio: "Empowering families to achieve financial independence through education and planning.",
    specialties: ["Retirement Planning", "Tax Strategies", "Investment Management"],
    licenses: ["Series 65", "CFP"]
  },
  {
    id: 11,
    name: "Marcus Anderson",
    title: "401(k) Guidance Specialist",
    type: "Advisor",
    state: "North Carolina",
    city: "Charlotte",
    region: "Southeast",
    bio: "Optimizing employer retirement plans and maximizing employee benefits.",
    specialties: ["401(k) Guidance", "Group Retirement Plans", "Business Planning"],
    licenses: ["Series 65", "Series 7"]
  },
  {
    id: 12,
    name: "Sophia Patel",
    title: "Life Insurance Broker",
    type: "Broker",
    state: "Minnesota",
    city: "Minneapolis",
    region: "Midwest",
    bio: "Protecting families with compassionate guidance and comprehensive coverage solutions.",
    specialties: ["Life Insurance", "Estate Planning", "Long-term Care"],
    licenses: ["Life & Health", "Long-term Care"]
  },
  {
    id: 13,
    name: "Daniel Kim",
    title: "Investment Management Advisor",
    type: "Advisor",
    state: "Massachusetts",
    city: "Boston",
    region: "Northeast",
    bio: "Creating diversified portfolios designed for long-term growth and risk management.",
    specialties: ["Investment Management", "Tax Strategies", "Retirement Planning"],
    licenses: ["Series 65", "CFA"]
  },
  {
    id: 14,
    name: "Rachel Moore",
    title: "Financial Advisor",
    type: "Advisor",
    state: "Oregon",
    city: "Portland",
    region: "West",
    bio: "Guiding young families toward financial security with practical, achievable strategies.",
    specialties: ["Retirement Planning", "Estate Planning", "401(k) Guidance"],
    licenses: ["Series 65", "Life & Health"]
  },
  {
    id: 15,
    name: "Thomas Wright",
    title: "Senior Annuity Broker",
    type: "Broker",
    state: "Tennessee",
    city: "Nashville",
    region: "Southeast",
    bio: "Specializing in guaranteed income solutions that provide peace of mind in retirement.",
    specialties: ["Annuities", "Retirement Planning", "Tax Strategies"],
    licenses: ["Life & Health", "Series 65"]
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
