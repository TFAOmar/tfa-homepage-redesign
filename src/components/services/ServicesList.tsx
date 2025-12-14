import ServiceCard from "./ServiceCard";
import { 
  TrendingUp, 
  PiggyBank, 
  FileText, 
  Calculator, 
  Heart, 
  Shield, 
  RefreshCw, 
  Umbrella, 
  Users,
  Building2
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Income Planning",
    description: "Create reliable income streams that last throughout your retirement years, ensuring you never outlive your savings.",
    forWhom: "Pre-retirees and retirees seeking predictable income without market volatility stress",
    benefits: [
      "Design tax-efficient withdrawal strategies",
      "Maximize Social Security and pension benefits",
      "Create sustainable income for 20-30+ years",
      "Plan for inflation and healthcare costs",
    ],
    link: "/services/income-planning",
  },
  {
    icon: PiggyBank,
    title: "Investment Management",
    description: "Build and maintain a diversified portfolio aligned with your risk tolerance, timeline, and financial goals.",
    forWhom: "Individuals and families looking to grow wealth while managing risk appropriately",
    benefits: [
      "Personalized asset allocation strategies",
      "Regular portfolio rebalancing and monitoring",
      "Tax-loss harvesting opportunities",
      "Transparent fee structures with no hidden costs",
    ],
    link: "/services/investment-management",
  },
  {
    icon: FileText,
    title: "Estate & Legacy Planning",
    description: "Ensure your wealth transfers efficiently to your loved ones while minimizing taxes and avoiding probate complications.",
    forWhom: "Families who want to protect their legacy and provide for future generations",
    benefits: [
      "Coordinate with attorneys on trust structures",
      "Minimize estate taxes and transfer costs",
      "Establish beneficiary designations correctly",
      "Plan for charitable giving and family values",
    ],
    link: "/services/estate-planning",
  },
  {
    icon: Calculator,
    title: "Tax Planning",
    description: "Implement year-round strategies to reduce your tax burden and keep more of what you earn and grow.",
    forWhom: "High-income earners and retirees facing significant tax liabilities",
    benefits: [
      "Reduce taxable income through strategic planning",
      "Optimize Roth conversion strategies",
      "Coordinate with CPAs for comprehensive approach",
      "Plan for IRMAA Medicare surcharge avoidance",
    ],
    link: "/services/tax-planning",
  },
  {
    icon: Heart,
    title: "Health Care Planning",
    description: "Navigate Medicare options, long-term care considerations, and healthcare cost projections for retirement.",
    forWhom: "Those approaching 65 or concerned about rising healthcare costs in retirement",
    benefits: [
      "Medicare enrollment guidance and plan selection",
      "Long-term care insurance evaluation",
      "Healthcare expense projections and budgeting",
      "HSA optimization strategies",
    ],
    link: "/services/healthcare-planning",
  },
  {
    icon: Shield,
    title: "Annuities",
    description: "Evaluate fixed and variable annuity options that can provide guaranteed income and principal protection.",
    forWhom: "Risk-averse individuals seeking guaranteed income and market protection",
    benefits: [
      "Guaranteed lifetime income options",
      "Principal protection from market downturns",
      "Death benefit options for beneficiaries",
      "Unbiased product recommendations",
    ],
    link: "/services/annuities",
  },
  {
    icon: RefreshCw,
    title: "401(k) Rollovers",
    description: "Seamlessly consolidate old employer retirement accounts into IRA or new plans with more investment options.",
    forWhom: "Job changers, retirees, or those with multiple old 401(k) accounts",
    benefits: [
      "Avoid costly early withdrawal penalties",
      "Access to broader investment choices",
      "Consolidate accounts for easier management",
      "Maintain tax-deferred growth potential",
    ],
    link: "/services/401k-rollovers",
  },
  {
    icon: Umbrella,
    title: "Insurance",
    description: "Protect your family and assets with life, disability, and long-term care insurance tailored to your situation.",
    forWhom: "Breadwinners, business owners, and families needing income protection",
    benefits: [
      "Replace lost income for your dependents",
      "Cover final expenses and outstanding debts",
      "Protect business continuity and succession",
      "Objective needs analysis without sales pressure",
    ],
    link: "/services/insurance",
  },
  {
    icon: Users,
    title: "Group Retirement Plans",
    description: "Design and manage 401(k), 403(b), and other employer-sponsored retirement plans that attract and retain talent.",
    forWhom: "Business owners and HR leaders seeking competitive retirement benefits",
    benefits: [
      "Fiduciary support and compliance assistance",
      "Employee education and enrollment services",
      "Plan design and vendor selection",
      "Ongoing administration and benchmarking",
    ],
    link: "/services/group-retirement",
  },
  {
    icon: Building2,
    title: "Business Insurance",
    description: "Secure the right commercial insurance — liability, property, workers' comp, commercial auto, and more — tailored to how your business operates.",
    forWhom: "Small businesses, professional offices, contractors, and service companies",
    benefits: [
      "General liability and property coverage",
      "Workers' compensation and commercial auto",
      "Professional liability (E&O) and cyber coverage",
      "Custom protection plans for your unique risks",
    ],
    link: "/business-insurance",
  },
];

const ServicesList = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
