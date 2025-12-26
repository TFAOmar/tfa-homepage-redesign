// Import advisor images
import manuelSotoImg from "@/assets/advisors/manuel-soto.jpg";
import israelCastanedaImg from "@/assets/advisors/israel-castaneda.jpg";
import elenaEsquivelImg from "@/assets/advisors/elena-esquivel.jpg";
import joseEstradaImg from "@/assets/advisors/jose-estrada.jpg";
import erikaManzanoImg from "@/assets/advisors/erika-manzano.jpg";
import celesteSierraImg from "@/assets/advisors/celeste-sierra.jpg";
import jorgeHernandezImg from "@/assets/advisors/jorge-hernandez.jpg";
import joeJessieNietoImg from "@/assets/advisors/joe-jessie-nieto.jpg";
import hamletOhandjanianImg from "@/assets/advisors/hamlet-ohandjanian.jpg";
import deliaPlascenciaImg from "@/assets/advisors/delia-plascencia.jpg";
import mariahLorenzenImg from "@/assets/advisors/mariah-lorenzen.jpg";
import seanCagleImg from "@/assets/advisors/sean-cagle.jpg";
import vanessaSanchezImg from "@/assets/advisors/vanessa-sanchez.jpg";
import ruthPachecoImg from "@/assets/advisors/ruth-pacheco.jpg";
import tamaraLeeImg from "@/assets/advisors/tamara-lee.jpg";
import ismaelVerveraImg from "@/assets/advisors/ismael-ververa.jpg";
import anthonyBottleyImg from "@/assets/advisors/anthony-bottley.jpg";
import conradOlveraImg from "@/assets/advisors/conrad-olvera.jpg";
import patriciaSerafinImg from "@/assets/advisors/patricia-serafin.jpg";
import omarSanchezImg from "@/assets/advisors/omar-sanchez.jpg";

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
  landingPage?: string;
  schedulingLink?: string;
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
    bio: "Founder of The Financial Architects, dedicated to helping families achieve financial security and build lasting legacies.",
    specialties: ["Retirement Planning", "Tax Strategies", "Estate Planning", "Business Planning"],
    licenses: ["Life & Health (Lic# 0D87636)"],
    image: manuelSotoImg,
    email: "manuel@tfainsuranceadvisors.com",
    landingPage: "/advisors/manuel-soto"
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
    specialties: ["Bilingual • Bilingüe", "Life Insurance", "Retirement Planning", "Estate Planning", "Tax Strategies"],
    licenses: ["Life & Health (Lic# 0I35205)"],
    image: israelCastanedaImg,
    email: "israel@tfainsuranceadvisors.com"
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
    specialties: ["Bilingual • Bilingüe", "Retirement Planning", "401(k) Guidance", "Estate Planning", "Tax Strategies", "Medicare Planning", "Life Insurance"],
    licenses: ["Life & Health (Lic# 4218087)"],
    image: elenaEsquivelImg,
    email: "eeesquivel@tfainsuranceadvisors.com",
    phone: "(951) 255-4997",
    yearsOfExperience: 15
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
    specialties: ["Retirement Planning", "Business Planning", "Tax Strategies", "Investment Management"],
    licenses: ["Life & Health"],
    image: joseEstradaImg,
    email: "Jose@agefinancial.com",
    phone: "(909) 592-5481"
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
    specialties: ["Retirement Planning", "Tax Strategies", "Investment Management", "Business Planning"],
    licenses: ["Life & Health (Lic# 0L33842)"],
    image: erikaManzanoImg,
    email: "erika@tfainsuranceadvisors.com"
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
    specialties: ["Bilingual • Bilingüe", "Mortgage Financing", "Real Estate", "Retirement Planning"],
    licenses: ["Real Estate Broker", "Life & Health (Lic# 0C25357)"],
    image: celesteSierraImg,
    yearsOfExperience: 26
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
    specialties: ["Bilingual • Bilingüe", "Estate Planning", "Tax Strategies", "Business Planning"],
    licenses: ["Life & Health (Lic# 0F66052)"],
    image: jorgeHernandezImg,
    yearsOfExperience: 30
  },
  {
    id: "ismael-ververa",
    name: "Ismael Ververa",
    title: "Financial Strategist",
    type: "Advisor",
    state: "California",
    city: "Claremont",
    region: "West",
    bio: "With nearly 25 years as a licensed realtor and 30 years in law enforcement, Ismael brings a unique blend of expertise to financial planning. His background instilled a strong sense of duty and ethical standards that he carries into helping families achieve financial success. Known for his community service mindset, Ismael focuses on sustainable investment strategies and empowering clients to achieve stability in their lives.",
    specialties: ["Bilingual • Bilingüe", "Real Estate", "Retirement Planning", "Investment Management", "Estate Planning"],
    licenses: ["Life & Health (Lic# 4152322)"],
    image: ismaelVerveraImg,
    email: "ismael@tfainsuranceadvisors.com",
    yearsOfExperience: 25,
    landingPage: "/advisors/ismael-ververa"
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
    specialties: ["Bilingual • Bilingüe", "Retirement Planning", "Estate Planning", "Life Insurance"],
    licenses: ["Life & Health"],
    image: joeJessieNietoImg,
    email: "joe@tfainsuranceadvisors.com"
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
    specialties: ["Retirement Planning", "Tax Strategies", "Life Insurance"],
    licenses: ["Life & Health (Lic# 4379309)"],
    image: hamletOhandjanianImg,
    email: "hamleto@tfainsuranceadvisors.com",
    yearsOfExperience: 28,
    landingPage: "/advisors/hamlet-ohandjanian"
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
    specialties: ["Bilingual • Bilingüe", "Life Insurance", "Estate Planning", "Retirement Planning"],
    licenses: ["Life & Health (Lic# 4222120)"],
    image: deliaPlascenciaImg,
    email: "delia@tfainsuranceadvisors.com"
  },
  {
    id: "mariah-lorenzen",
    name: "Mariah Lorenzen",
    title: "Head of Franchise Operations",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "With a career in financial services spanning nearly three decades, Mariah Lorenzen brings deep industry experience and a heart for long-term planning. She began her career in 1995 and spent many years in real estate and mortgage lending before becoming a licensed Life & Health insurance professional in 2008. Seeing firsthand how unstable markets and lack of proper guidance can impact families, she committed her career to helping individuals and business owners protect their income, plan for retirement, and build lasting financial security. Her approach is rooted in education, strategy, and long-term relationships—helping clients make confident decisions today that support their future and their families.",
    specialties: ["Mortgage Financing", "Retirement Planning", "Tax Strategies", "Real Estate", "Kai-Zen Strategy"],
    licenses: ["Loan Originator", "Life & Health (Lic# 0F93770)"],
    image: mariahLorenzenImg,
    email: "mariah@tfainsuranceadvisors.com",
    landingPage: "/advisors/mariah-lorenzen",
    yearsOfExperience: 30
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
    specialties: ["Estate Planning", "Tax Strategies", "Retirement Planning", "Life Insurance"],
    licenses: ["Life & Health"],
    image: seanCagleImg,
    email: "scagle@tfainsuranceadvisors.com",
    landingPage: "/advisors/sean-cagle"
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
    specialties: ["Bilingual • Bilingüe", "Retirement Planning", "Estate Planning", "Tax Strategies", "Business Planning", "Life Insurance"],
    licenses: ["Life & Health"],
    image: vanessaSanchezImg,
    email: "vsanchez@tfainsuranceadvisors.com",
    landingPage: "/advisors/vanessa-sanchez"
  },
  {
    id: "ruth-pacheco",
    name: "Ruth Pacheco",
    title: "Reverse Mortgage Specialist",
    type: "Broker",
    state: "California",
    city: "Upland",
    region: "West",
    bio: "With more than 36 years of lending experience, Ruth is a prominent residential mortgage professional and Reverse Mortgage Certified specialist. Her diverse experience as business owner, loan processor, and loan officer through several market cycles gives her a competitive edge. Her passion for people and dedication to excellence ensures every transaction is handled with care. 'I am not number one, YOU are!'",
    specialties: ["Bilingual • Bilingüe", "Mortgage Financing", "Retirement Planning", "Real Estate"],
    licenses: ["NMLS# 252846", "Reverse Mortgage Certified"],
    image: ruthPachecoImg,
    email: "ruth@tfainsuranceadvisors.com",
    yearsOfExperience: 36,
    landingPage: "/advisors/ruth-pacheco"
  },
  {
    id: "tamara-lee",
    name: "Tamara Lee",
    title: "Finance and Business Strategist",
    type: "Advisor",
    state: "California",
    city: "Claremont",
    region: "West",
    bio: "With over 11 years of experience in the healthcare field, Tamara helps clients and businesses navigate the complexities of retirement strategies, aligning long-term financial and healthcare goals. She is committed to empowering individuals and businesses with the information they need to make informed decisions about their financial and healthcare futures, fostering an environment of accessible support and informed decision-making.",
    specialties: ["Business Strategy", "Financial Planning", "Retirement Strategy", "Employee Benefits", "Healthcare Solutions"],
    licenses: ["Life & Health"],
    image: tamaraLeeImg,
    email: "tlee@tfainsuranceadvisors.com",
    yearsOfExperience: 11,
    landingPage: "/advisors/tamara-lee"
  },
  {
    id: "rolando-recinos",
    name: "Rolando Recinos",
    title: "Business Insurance Specialist",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Rolando specializes in commercial insurance solutions, helping business owners protect their operations, employees, and assets. With expertise in business liability, workers' compensation, and comprehensive commercial coverage, he guides businesses of all sizes through the complexities of commercial insurance.",
    specialties: ["Bilingual • Bilingüe", "Business Insurance", "Business Planning"],
    licenses: ["Life & Health"],
    email: "rrecinos@tfainsuranceadvisors.com",
    landingPage: "/advisors/recinos"
  },
  {
    id: "savannah-recinos",
    name: "Savannah Recinos",
    title: "Business Insurance Specialist",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Savannah is dedicated to helping businesses secure comprehensive commercial insurance coverage. She specializes in business liability, property insurance, workers' compensation, and tailored commercial policies that protect what business owners have worked hard to build.",
    specialties: ["Business Insurance", "Business Planning"],
    licenses: ["Life & Health"],
    email: "srecinos@tfainsuranceadvisors.com",
    landingPage: "/advisors/recinos"
  },
  {
    id: "anthony-bottley",
    name: "Anthony Bottley",
    title: "President, American Way Health",
    type: "Advisor",
    state: "Florida",
    city: "West Palm Beach",
    region: "Southeast",
    bio: "Anthony is the owner and founder of American Way Health, an insurance agency specializing in healthcare and insurance solutions. With a background in executive recruiting and a passion for developing and guiding others to their full potential, he helps individuals and families navigate the complexities of health insurance and Medicare. A graduate of Florida Atlantic University, Anthony brings entrepreneurial vision and a client-first approach to health insurance planning.",
    specialties: ["Health Insurance", "Medicare Planning"],
    licenses: ["Life & Health"],
    image: anthonyBottleyImg,
    email: "info@awhealthllc.com",
    yearsOfExperience: 4,
    landingPage: "/advisors/anthony-bottley"
  },
  {
    id: "conrad-olvera",
    name: "Conrad Olvera",
    title: "Mortgage and Financial Specialist",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Since 2014, I have dedicated myself to providing exceptional mortgage and financial services. With a focus on delivering the best customer experience, I strive to build lasting relationships with my clients. My expertise in the industry, combined with a commitment to understanding each client's unique needs, ensures tailored solutions that facilitate their financial goal whether it's a home loan, estate planning or retirement needs.",
    specialties: ["Bilingual • Bilingüe", "Mortgage Financing", "Estate Planning", "Retirement Planning"],
    licenses: ["Life & Health"],
    image: conradOlveraImg,
    email: "conradolvera21@gmail.com",
    yearsOfExperience: 11,
    landingPage: "/advisors/conrad-olvera"
  },
  {
    id: "patricia-serafin",
    name: "Patricia Serafin",
    title: "Financial Strategist",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "With nearly a decade of experience, Patricia is known for her ability to identify the right solutions for each client—never one-size-fits-all, always intentional. Fluent in both English and Spanish, she proudly serves bilingual communities, ensuring every client feels understood, protected, and prepared. Her passion lies in helping people build clarity, security, and peace of mind through thoughtful financial architecture.",
    specialties: ["Bilingual • Bilingüe", "Financial Literacy", "Retirement Planning", "Estate Planning", "Tax Strategies", "Life Insurance", "Family Financial Planning"],
    licenses: ["Life & Health"],
    image: patriciaSerafinImg,
    email: "patricia@tfainsuranceadvisors.com",
    landingPage: "/advisors/patricia-serafin"
  },
  {
    id: "omar-sanchez",
    name: "Omar Sanchez",
    title: "Chief Operating Officer & Managing Partner",
    type: "Advisor",
    state: "California",
    city: "Chino Hills",
    region: "West",
    bio: "Omar Sanchez is the Chief Operating Officer and Managing Partner of The Financial Architects, where he leads the firm's national expansion, advisor development, and the implementation of modern financial planning systems. Known for his ability to simplify complex strategies and build scalable processes, Omar has become one of the leading architects behind TFA's mission.",
    specialties: ["Bilingual • Bilingüe", "Life Insurance", "Retirement Planning", "Estate Planning"],
    licenses: ["Life & Health"],
    image: omarSanchezImg,
    email: "omar@tfainsuranceadvisors.com",
    schedulingLink: "https://tfa.pipedrive.com/scheduler/M93alkfo/strategic-call-with-omar-sanchez-the-financial-architects"
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
  "Business Insurance",
  "Health Insurance",
  "401(k) Guidance",
  "Investment Management",
  "Mortgage Financing",
  "Real Estate",
  "Medicare Planning"
];
