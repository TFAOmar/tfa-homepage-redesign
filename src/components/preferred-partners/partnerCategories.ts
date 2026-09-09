import {
  Home,
  Building2,
  Calculator,
  FileSpreadsheet,
  ShieldCheck,
  Briefcase,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export interface PartnerCategory {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  description: string;
}

export const partnerCategories: PartnerCategory[] = [
  {
    id: "lenders",
    name: "Lenders & Mortgage Professionals",
    short: "Lenders",
    icon: Home,
    description:
      "Loan officers and mortgage brokers who help families finance a home. We pair every new mortgage with protection so the loan is covered if life changes.",
  },
  {
    id: "realtors",
    name: "Realtors & Real Estate Professionals",
    short: "Realtors",
    icon: Building2,
    description:
      "Agents and teams guiding buyers and sellers. Their clients get homeowner protection, living trusts, and titling guidance at the moment it matters most.",
  },
  {
    id: "tax-professionals",
    name: "Tax Professionals",
    short: "Tax Pros",
    icon: Calculator,
    description:
      "Tax preparers and enrolled agents whose clients need tax-efficient retirement income, rollover strategies, and long-term planning beyond filing season.",
  },
  {
    id: "cpas",
    name: "CPAs & Accounting Firms",
    short: "CPAs",
    icon: FileSpreadsheet,
    description:
      "Accounting firms serving individuals and business owners who need succession planning, key-person coverage, and tax-advantaged accumulation strategies.",
  },
  {
    id: "property-casualty",
    name: "Property & Casualty Agents and Brokers",
    short: "P&C Agents",
    icon: ShieldCheck,
    description:
      "Home and auto professionals who protect what clients own. We add the life, income, and legacy side of the household's protection plan.",
  },
  {
    id: "business-insurance",
    name: "Business Insurance Brokers",
    short: "Business Brokers",
    icon: Briefcase,
    description:
      "Commercial brokers working with employers on group benefits, buy-sell funding, executive bonus plans, and business continuation strategies.",
  },
  {
    id: "medicare-health",
    name: "Medicare & Health Insurance Agents and Brokers",
    short: "Medicare & Health",
    icon: HeartPulse,
    description:
      "Health and Medicare specialists whose clients also need final expense coverage, retirement income, and estate planning as they transition into retirement.",
  },
];
