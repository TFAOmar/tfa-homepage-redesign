import allianz from "@/assets/carriers/allianz.png";
import fng from "@/assets/carriers/fng.png";
import nationalLife from "@/assets/carriers/national-life.png";
import corebridge from "@/assets/carriers/corebridge.png";
import mutualOfOmaha from "@/assets/carriers/mutual-of-omaha.png";
import foresters from "@/assets/carriers/foresters.png";
import northAmerican from "@/assets/carriers/north-american.png";
import athene from "@/assets/carriers/athene.png";
import midlandNational from "@/assets/carriers/midland-national.png";
import lincoln from "@/assets/carriers/lincoln.png";
import prudential from "@/assets/carriers/prudential.png";
import massmutual from "@/assets/carriers/massmutual.png";
import americanNational from "@/assets/carriers/american-national.png";
import principal from "@/assets/carriers/principal.png";

export interface CarrierDetail {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  established: string;
  headquarters: string;
  rating: string;
  summary: string;
  history: string;
  specialties: string[];
  productFamilies: {
    category: string;
    description: string;
    bestFor: string;
    benefits: string[];
  }[];
  whyPartner: string;
}

export const carrierDetails: CarrierDetail[] = [
  {
    id: "allianz",
    name: "Allianz",
    logo: allianz,
    tagline: "Global Leader in Financial Protection & Retirement Solutions",
    established: "1890",
    headquarters: "Munich, Germany (US Operations in Minneapolis, MN)",
    rating: "A+ (Superior)",
    summary: "One of the world's leading insurers with innovative fixed indexed annuities designed for retirement income.",
    history: "Founded over 130 years ago, Allianz is a global powerhouse in insurance and asset management. Allianz Life Insurance Company of North America has been serving American families since 1896, offering sophisticated retirement planning solutions backed by centuries of financial strength and innovation.",
    specialties: [
      "Fixed Indexed Annuities (FIA)",
      "Income Riders",
      "Death Benefit Protection",
      "Market-Linked Growth Strategies",
      "Retirement Income Planning",
    ],
    productFamilies: [
      {
        category: "Fixed Indexed Annuities",
        description: "Market-linked growth potential with downside protection",
        bestFor: "Retirees seeking guaranteed income with growth opportunities",
        benefits: ["Principal protection", "Tax-deferred growth", "Lifetime income options", "Legacy planning features"]
      },
      {
        category: "Fixed Annuities",
        description: "Guaranteed interest rates for predictable growth",
        bestFor: "Conservative savers prioritizing stability",
        benefits: ["Guaranteed returns", "No market risk", "Flexible withdrawal options", "Competitive rates"]
      }
    ],
    whyPartner: "We partner with Allianz because of their global financial strength, innovative product design, and commitment to helping retirees achieve predictable income. Their fixed indexed annuities offer the right balance of growth potential and protection for families planning their retirement years."
  },
  {
    id: "fng",
    name: "F&G Annuities & Life",
    logo: fng,
    tagline: "Experience the Power of Collaborative Thinking",
    established: "1959",
    headquarters: "Des Moines, IA",
    rating: "A- (Excellent)",
    summary: "Innovative annuity provider focused on retirement income and wealth accumulation strategies.",
    history: "F&G has been dedicated to helping Americans achieve financial security through life insurance and annuities for over 60 years. With a collaborative approach to financial planning, F&G designs products that address the evolving needs of modern retirees and working families.",
    specialties: [
      "Fixed Indexed Annuities",
      "Multi-Year Guaranteed Annuities (MYGA)",
      "Income-Focused Solutions",
      "Accumulation Products",
      "Legacy Planning",
    ],
    productFamilies: [
      {
        category: "Fixed Indexed Annuities",
        description: "Growth-oriented annuities with principal protection",
        bestFor: "Pre-retirees seeking tax-deferred accumulation",
        benefits: ["Upside potential", "Downside protection", "Flexible income options", "Death benefit protection"]
      },
      {
        category: "Multi-Year Guaranteed Annuities",
        description: "Fixed rate guarantees for a set term",
        bestFor: "Conservative investors wanting predictable returns",
        benefits: ["Guaranteed interest rates", "Term flexibility", "Safe money alternative", "Tax advantages"]
      }
    ],
    whyPartner: "F&G's collaborative philosophy aligns perfectly with our client-first approach. Their competitive rates, innovative riders, and commitment to transparent product design make them an excellent partner for families who value both growth and guarantees."
  },
  {
    id: "national-life",
    name: "National Life Group",
    logo: nationalLife,
    tagline: "Keep Good Going®",
    established: "1848",
    headquarters: "Montpelier, VT",
    rating: "A+ (Superior)",
    summary: "Trusted mutual company specializing in life insurance and annuities with a focus on doing good.",
    history: "For over 175 years, National Life Group has been committed to helping individuals and families achieve financial security. As a mutual company, they operate for the benefit of policyholders, not shareholders, ensuring client interests always come first.",
    specialties: [
      "Whole Life Insurance",
      "Universal Life Insurance",
      "Fixed & Indexed Annuities",
      "Living Benefits",
      "Legacy & Estate Planning",
    ],
    productFamilies: [
      {
        category: "Whole Life Insurance",
        description: "Permanent protection with guaranteed cash value growth",
        bestFor: "Families seeking lifelong coverage and wealth accumulation",
        benefits: ["Guaranteed death benefit", "Cash value growth", "Policy loans available", "Dividend potential"]
      },
      {
        category: "Indexed Universal Life",
        description: "Flexible permanent life insurance with market-linked potential",
        bestFor: "Clients wanting flexible premiums and growth opportunities",
        benefits: ["Market participation", "Downside protection", "Flexible premiums", "Tax-advantaged growth"]
      }
    ],
    whyPartner: "National Life's mutual structure and commitment to 'Keep Good Going' resonates with our values-driven approach. Their strong financial ratings, comprehensive living benefits, and focus on generational wealth transfer make them ideal for families building lasting legacies."
  },
  {
    id: "prudential",
    name: "Prudential",
    logo: prudential,
    tagline: "Bringing Possibilities Within Reach",
    established: "1875",
    headquarters: "Newark, NJ",
    rating: "A+ (Superior)",
    summary: "Industry leader in life insurance, retirement planning, and investment management solutions.",
    history: "Prudential has been a trusted name in financial services for nearly 150 years. With a reputation for innovation and financial strength, Prudential serves millions of customers worldwide with comprehensive insurance and retirement solutions designed to help families thrive.",
    specialties: [
      "Term Life Insurance",
      "Universal Life Insurance",
      "Variable Life Insurance",
      "Annuities",
      "Retirement Income Solutions",
    ],
    productFamilies: [
      {
        category: "Term Life Insurance",
        description: "Affordable protection for specific time periods",
        bestFor: "Young families needing maximum coverage at lowest cost",
        benefits: ["High coverage amounts", "Affordable premiums", "Conversion options", "Flexible terms"]
      },
      {
        category: "Universal Life Insurance",
        description: "Flexible permanent coverage with cash value accumulation",
        bestFor: "Individuals seeking adjustable premiums and lifelong protection",
        benefits: ["Premium flexibility", "Cash value growth", "Death benefit options", "Tax advantages"]
      }
    ],
    whyPartner: "Prudential's financial strength, diverse product portfolio, and commitment to innovation make them an essential partner. Their competitive underwriting and comprehensive solutions help us serve clients across all life stages and financial situations."
  },
  {
    id: "massmutual",
    name: "MassMutual",
    logo: massmutual,
    tagline: "We'll Help You Get There",
    established: "1851",
    headquarters: "Springfield, MA",
    rating: "A++ (Superior)",
    summary: "Leading mutual life insurance company with exceptional financial strength and dividend history.",
    history: "MassMutual has been helping individuals, families, and businesses thrive for over 170 years. As one of the highest-rated mutual companies in the industry, MassMutual's commitment to policyholders is unwavering, with a proven track record of dividend payments and financial stability.",
    specialties: [
      "Whole Life Insurance",
      "Disability Income Insurance",
      "Long-Term Care Insurance",
      "Annuities",
      "Business Planning Solutions",
    ],
    productFamilies: [
      {
        category: "Whole Life Insurance",
        description: "Permanent protection with guaranteed growth and dividend potential",
        bestFor: "Families prioritizing guaranteed values and long-term wealth building",
        benefits: ["Guaranteed cash values", "Dividend participation", "Loan provisions", "Legacy planning"]
      },
      {
        category: "Disability Income Insurance",
        description: "Income replacement if unable to work due to illness or injury",
        bestFor: "Working professionals protecting their earning potential",
        benefits: ["Income protection", "Own-occupation coverage", "Flexible benefit periods", "Partial disability benefits"]
      }
    ],
    whyPartner: "MassMutual's A++ rating, exceptional dividend history, and mutual structure make them a cornerstone partner. Their focus on long-term value creation and comprehensive protection solutions aligns perfectly with our commitment to building financial security for families."
  },
  {
    id: "lincoln",
    name: "Lincoln Financial Group",
    logo: lincoln,
    tagline: "You're In Charge®",
    established: "1905",
    headquarters: "Radnor, PA",
    rating: "A+ (Superior)",
    summary: "Innovative leader in life insurance, annuities, and retirement plan services.",
    history: "For over a century, Lincoln Financial has been committed to empowering Americans to take charge of their financial futures. With a focus on innovation and client-centric design, Lincoln offers comprehensive solutions for protection, retirement, and wealth accumulation.",
    specialties: [
      "Indexed Universal Life",
      "Variable Universal Life",
      "Fixed Indexed Annuities",
      "Living Benefits",
      "Executive Benefits",
    ],
    productFamilies: [
      {
        category: "Indexed Universal Life Insurance",
        description: "Flexible protection with market-linked growth opportunities",
        bestFor: "Individuals seeking permanent coverage with upside potential",
        benefits: ["Market participation", "Principal protection", "Flexible premiums", "Living benefits riders"]
      },
      {
        category: "Fixed Indexed Annuities",
        description: "Retirement savings with growth potential and guarantees",
        bestFor: "Pre-retirees and retirees seeking balanced growth and security",
        benefits: ["Tax-deferred growth", "Principal protection", "Income options", "Death benefit features"]
      }
    ],
    whyPartner: "Lincoln's innovative product design and commitment to putting clients in control aligns with our advisory philosophy. Their competitive living benefits riders and flexible solutions help us tailor strategies to each family's unique goals and risk tolerance."
  },
  {
    id: "american-national",
    name: "American National",
    logo: americanNational,
    tagline: "Strong & Trusted Since 1905",
    established: "1905",
    headquarters: "Galveston, TX",
    rating: "A (Excellent)",
    summary: "Family-owned company offering personalized life insurance and annuity solutions.",
    history: "American National has operated with integrity and financial strength for over a century. As a family-owned company, they understand the importance of protecting what matters most and offer personalized solutions backed by exceptional service and competitive pricing.",
    specialties: [
      "Whole Life Insurance",
      "Universal Life Insurance",
      "Term Life Insurance",
      "Fixed Annuities",
      "Final Expense Insurance",
    ],
    productFamilies: [
      {
        category: "Term Life Insurance",
        description: "Affordable temporary protection for families",
        bestFor: "Young families and mortgage protection needs",
        benefits: ["Low premiums", "High coverage amounts", "Conversion privileges", "Flexible terms"]
      },
      {
        category: "Whole Life Insurance",
        description: "Lifetime protection with guaranteed cash value",
        bestFor: "Individuals seeking permanent coverage and savings",
        benefits: ["Guaranteed growth", "Lifetime coverage", "Cash value accumulation", "Loan options"]
      }
    ],
    whyPartner: "American National's family-owned values and personalized approach mirror our commitment to treating every client like family. Their competitive pricing and straightforward product design make protection accessible for working families at every income level."
  },
  {
    id: "principal",
    name: "Principal",
    logo: principal,
    tagline: "When You Retire, We Don't®",
    established: "1879",
    headquarters: "Des Moines, IA",
    rating: "A+ (Superior)",
    summary: "Global financial leader specializing in retirement, insurance, and asset management.",
    history: "Principal has been helping individuals and businesses build financial security for over 140 years. With expertise in retirement planning, life insurance, and investment management, Principal offers integrated solutions designed to help clients achieve their long-term financial goals.",
    specialties: [
      "Fixed Indexed Annuities",
      "Income Annuities",
      "Universal Life Insurance",
      "Retirement Income Planning",
      "Business Solutions",
    ],
    productFamilies: [
      {
        category: "Fixed Indexed Annuities",
        description: "Market-linked growth with downside protection for retirement",
        bestFor: "Individuals seeking tax-deferred growth and income options",
        benefits: ["Growth potential", "Principal protection", "Income riders", "Legacy features"]
      },
      {
        category: "Universal Life Insurance",
        description: "Flexible permanent coverage with cash value growth",
        bestFor: "Families wanting adjustable premiums and lifelong protection",
        benefits: ["Premium flexibility", "Death benefit options", "Cash accumulation", "Tax advantages"]
      }
    ],
    whyPartner: "Principal's commitment to serving clients throughout retirement and beyond aligns with our long-term relationship approach. Their integrated retirement and insurance solutions help us create comprehensive strategies that adapt as families' needs evolve over time."
  },
  {
    id: "corebridge",
    name: "Corebridge Financial",
    logo: corebridge,
    tagline: "We're Here to Help You Thrive",
    established: "2022 (Heritage dating to 1919)",
    headquarters: "Houston, TX",
    rating: "A (Excellent)",
    summary: "Modern financial services company with deep heritage in life insurance and retirement solutions.",
    history: "Corebridge Financial, formerly known as AIG Life & Retirement, combines over a century of insurance expertise with a fresh, client-focused approach. With a commitment to innovation and accessibility, Corebridge helps individuals and families thrive through every stage of life.",
    specialties: [
      "Fixed Indexed Annuities",
      "Fixed Annuities",
      "Index Universal Life",
      "Retirement Income Solutions",
      "Wealth Accumulation Strategies",
    ],
    productFamilies: [
      {
        category: "Fixed Indexed Annuities",
        description: "Growth-oriented annuities with principal protection",
        bestFor: "Savers seeking market participation without market risk",
        benefits: ["Upside potential", "Downside protection", "Income options", "Death benefits"]
      },
      {
        category: "Index Universal Life Insurance",
        description: "Permanent life insurance with flexible premiums and growth",
        bestFor: "Individuals wanting lifelong coverage with accumulation potential",
        benefits: ["Market-linked growth", "Premium flexibility", "Tax-advantaged savings", "Living benefits"]
      }
    ],
    whyPartner: "Corebridge's combination of deep industry experience and modern innovation makes them a valuable partner. Their competitive products and commitment to helping families thrive resonate with our mission to provide accessible, effective financial strategies."
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    logo: mutualOfOmaha,
    tagline: "Aha Moment®",
    established: "1909",
    headquarters: "Omaha, NE",
    rating: "A+ (Superior)",
    summary: "Trusted mutual company known for accessible life insurance and innovative underwriting.",
    history: "Mutual of Omaha has been protecting American families for over a century. As a mutual company, they prioritize policyholders' interests and are known for their simplified issue products, competitive pricing, and exceptional customer service.",
    specialties: [
      "Term Life Insurance",
      "Whole Life Insurance",
      "Final Expense Insurance",
      "Guaranteed Issue Life",
      "Simplified Underwriting",
    ],
    productFamilies: [
      {
        category: "Term Life Insurance",
        description: "Affordable coverage for temporary protection needs",
        bestFor: "Families needing high coverage amounts at low cost",
        benefits: ["Competitive rates", "Simplified underwriting options", "Conversion privileges", "Flexible terms"]
      },
      {
        category: "Final Expense Insurance",
        description: "Guaranteed issue coverage for end-of-life expenses",
        bestFor: "Seniors seeking burial and final expense coverage",
        benefits: ["No medical exam", "Guaranteed acceptance", "Affordable premiums", "Quick approval"]
      }
    ],
    whyPartner: "Mutual of Omaha's accessible underwriting and focus on serving underserved markets make them essential for ensuring all families can access protection. Their simplified issue and guaranteed issue products help us serve clients who may not qualify for traditional coverage."
  },
  {
    id: "foresters",
    name: "Foresters Financial",
    logo: foresters,
    tagline: "Enriching Lives, Families and Communities",
    established: "1874",
    headquarters: "Toronto, Canada (US Operations in Raleigh, NC)",
    rating: "A (Excellent)",
    summary: "International fraternal benefit society offering life insurance with unique member benefits.",
    history: "Foresters Financial has been enriching lives for nearly 150 years. As a fraternal benefit society, Foresters offers not just life insurance but also member benefits, scholarships, and community programs designed to support families in meaningful ways beyond financial protection.",
    specialties: [
      "Whole Life Insurance",
      "Term Life Insurance",
      "Universal Life Insurance",
      "Member Benefits Programs",
      "Simplified Issue Products",
    ],
    productFamilies: [
      {
        category: "Whole Life Insurance",
        description: "Permanent coverage with guaranteed growth and member benefits",
        bestFor: "Families seeking lifelong protection and community connection",
        benefits: ["Guaranteed values", "Member benefits", "Scholarship programs", "Community support"]
      },
      {
        category: "Term Life Insurance",
        description: "Affordable temporary coverage with Foresters member perks",
        bestFor: "Young families wanting protection plus additional benefits",
        benefits: ["Competitive rates", "Member benefits", "Orphan benefits", "Scholarship opportunities"]
      }
    ],
    whyPartner: "Foresters' unique fraternal structure and commitment to enriching communities align with our family-centered values. Their member benefits, scholarship programs, and community support offer clients more than just insurance—they offer belonging and support."
  },
  {
    id: "north-american",
    name: "North American",
    logo: northAmerican,
    tagline: "A Sammons Financial® Company",
    established: "1886",
    headquarters: "West Des Moines, IA",
    rating: "A+ (Superior)",
    summary: "Premier provider of indexed universal life insurance and competitive annuity products.",
    history: "North American, part of the Sammons Financial Group, has over 135 years of experience in providing innovative life insurance and annuity solutions. Known for their indexed universal life products and competitive pricing, North American helps families achieve financial security through smart, flexible strategies.",
    specialties: [
      "Indexed Universal Life Insurance",
      "Fixed Indexed Annuities",
      "Competitive Caps & Rates",
      "Living Benefits Riders",
      "Accumulation-Focused Products",
    ],
    productFamilies: [
      {
        category: "Indexed Universal Life Insurance",
        description: "Premium IUL products with competitive caps and growth potential",
        bestFor: "Clients seeking permanent protection with significant cash value growth",
        benefits: ["Industry-leading caps", "Flexible premiums", "Living benefits options", "Tax-advantaged growth"]
      },
      {
        category: "Fixed Indexed Annuities",
        description: "Market-linked annuities with principal protection",
        bestFor: "Pre-retirees seeking growth and safety for retirement savings",
        benefits: ["Competitive crediting methods", "Principal protection", "Income riders", "Legacy planning"]
      }
    ],
    whyPartner: "North American's industry-leading indexed products and competitive pricing make them a go-to partner for clients seeking maximum accumulation potential. Their flexible underwriting and innovative product features help us design strategies that maximize long-term wealth building."
  },
  {
    id: "athene",
    name: "Athene",
    logo: athene,
    tagline: "Driven to Do More®",
    established: "2009",
    headquarters: "West Des Moines, IA",
    rating: "A (Excellent)",
    summary: "Leading retirement services company specializing in fixed and indexed annuities.",
    history: "Athene has rapidly become a leader in the retirement income space by focusing exclusively on fixed annuity solutions. With a technology-driven approach and commitment to competitive pricing, Athene helps retirees and pre-retirees achieve predictable, reliable retirement income.",
    specialties: [
      "Fixed Indexed Annuities",
      "Multi-Year Guaranteed Annuities",
      "Income-Focused Solutions",
      "Competitive Crediting Rates",
      "Retirement Income Planning",
    ],
    productFamilies: [
      {
        category: "Fixed Indexed Annuities",
        description: "Growth-focused annuities with market-linked potential",
        bestFor: "Pre-retirees seeking accumulation and future income",
        benefits: ["Competitive caps", "Principal protection", "Income riders", "Flexible withdrawal options"]
      },
      {
        category: "Multi-Year Guaranteed Annuities",
        description: "Fixed rates for a guaranteed term",
        bestFor: "Conservative savers seeking CD alternative with tax deferral",
        benefits: ["Guaranteed rates", "No market risk", "Tax-deferred growth", "Flexible terms"]
      }
    ],
    whyPartner: "Athene's laser focus on retirement income and competitive product design make them an excellent partner for clients in or approaching retirement. Their technology-driven efficiency translates to better rates and features, helping our clients maximize their retirement savings."
  },
  {
    id: "midland-national",
    name: "Midland National",
    logo: midlandNational,
    tagline: "A Sammons Financial® Company",
    established: "1906",
    headquarters: "West Des Moines, IA",
    rating: "A+ (Superior)",
    summary: "Trusted provider of life insurance and annuities with over a century of financial strength.",
    history: "Midland National, part of Sammons Financial Group, has been serving American families for over 115 years. With a reputation for financial stability, innovative products, and exceptional service, Midland National offers comprehensive solutions for protection and retirement planning.",
    specialties: [
      "Fixed Indexed Annuities",
      "Index Universal Life Insurance",
      "Multi-Year Guaranteed Annuities",
      "Income Riders",
      "Accumulation Solutions",
    ],
    productFamilies: [
      {
        category: "Fixed Indexed Annuities",
        description: "Market-linked growth with downside protection",
        bestFor: "Individuals seeking balanced growth and security for retirement",
        benefits: ["Competitive rates", "Principal protection", "Income options", "Death benefit protection"]
      },
      {
        category: "Index Universal Life Insurance",
        description: "Flexible permanent coverage with accumulation potential",
        bestFor: "Families wanting lifelong protection and tax-advantaged savings",
        benefits: ["Market participation", "Flexible premiums", "Cash value growth", "Living benefits"]
      }
    ],
    whyPartner: "Midland National's combination of financial strength, competitive products, and comprehensive service make them a cornerstone partner. Their diverse product portfolio allows us to serve clients across all financial situations and planning goals with confidence."
  },
];
