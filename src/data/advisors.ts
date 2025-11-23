export interface Advisor {
  id: number;
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
}

export const advisors: Advisor[] = [
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
