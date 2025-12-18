// Schema.org structured data generators for SEO
import { siteConfig } from "./siteConfig";

// Organization/FinancialService schema for homepage
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: siteConfig.logo,
    width: 512,
    height: 512,
  },
  image: siteConfig.logo,
  description: siteConfig.description,
  telephone: siteConfig.telephone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.9898,
    longitude: -117.7326,
  },
  areaServed: siteConfig.areasServed.map((area) => ({
    "@type": "State",
    name: area,
  })),
  numberOfLocations: siteConfig.numberOfLocations,
  foundingDate: siteConfig.foundingDate,
  founder: {
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.title,
  },
  sameAs: Object.values(siteConfig.social),
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Financial Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retirement Planning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Life Insurance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estate Planning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Planning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Annuities" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "401(k) Rollovers" } },
    ],
  },
});

// WebPage schema
export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string,
  dateModified?: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}/#webpage`,
  url,
  name: title,
  description,
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
  dateModified: dateModified || new Date().toISOString(),
  inLanguage: "en-US",
});

// WebSite schema
export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-US",
});

// BreadcrumbList schema
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// FAQPage schema
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Service schema
export const generateServiceSchema = (
  serviceName: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${url}/#service`,
  name: serviceName,
  description,
  url,
  provider: { "@id": `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areasServed.map((area) => ({
    "@type": "State",
    name: area,
  })),
  serviceType: "Financial Planning",
});

// Person schema for advisors
export const generatePersonSchema = (
  name: string,
  title: string,
  description: string,
  imageUrl: string,
  url: string,
  specialties?: string[]
) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${url}/#person`,
  name,
  jobTitle: title,
  description,
  image: imageUrl,
  url,
  worksFor: { "@id": `${siteConfig.url}/#organization` },
  knowsAbout: specialties || [],
});

// LocalBusiness schema for individual locations
export const generateLocalBusinessSchema = (
  locationName: string,
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  },
  phone: string,
  geo?: { lat: number; lng: number }
) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/locations/${address.city.toLowerCase().replace(/\s+/g, "-")}/#localbusiness`,
  name: `${siteConfig.name} - ${locationName}`,
  image: siteConfig.logo,
  telephone: phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.zip,
    addressCountry: "US",
  },
  geo: geo
    ? {
        "@type": "GeoCoordinates",
        latitude: geo.lat,
        longitude: geo.lng,
      }
    : undefined,
  parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
});

// WebApplication schema for calculators/tools
export const generateWebApplicationSchema = (
  name: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${url}/#webapp`,
  name,
  description,
  url,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: { "@id": `${siteConfig.url}/#organization` },
});

// ContactPage schema
export const generateContactPageSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${url}/#contactpage`,
  url,
  name: "Contact Us | The Financial Architects",
  description: "Get in touch with our financial planning team. Contact us by phone, email, or visit one of our 19 office locations.",
  mainEntity: { "@id": `${siteConfig.url}/#organization` },
});

// Blog schema
export const generateBlogSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${url}/#blog`,
  url,
  name: "Financial Planning Insights | The Financial Architects",
  description: "Expert articles on retirement planning, investment strategies, tax planning, and wealth management.",
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-US",
});

// Event schema
export const generateEventSchema = (
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  location: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "@id": `${url}/#event`,
  name,
  description,
  startDate,
  endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: {
    "@type": "Place",
    name: location,
  },
  organizer: { "@id": `${siteConfig.url}/#organization` },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
});

// JobPosting schema
export const generateJobPostingSchema = (
  title: string,
  description: string,
  url: string,
  employmentType: string = "FULL_TIME"
) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "@id": `${url}/#jobposting`,
  title,
  description,
  url,
  datePosted: new Date().toISOString().split("T")[0],
  validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  employmentType,
  hiringOrganization: { "@id": `${siteConfig.url}/#organization` },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
  },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: {
      "@type": "QuantitativeValue",
      minValue: 50000,
      maxValue: 150000,
      unitText: "YEAR",
    },
  },
});

// HowTo schema for process pages
export const generateHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${url}/#howto`,
  name,
  description,
  url,
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});

// Product schema for shop pages
export const generateProductSchema = (
  name: string,
  description: string,
  price: string,
  currency: string,
  imageUrl: string,
  url: string,
  availability: string = "InStock"
) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${url}/#product`,
  name,
  description,
  image: imageUrl,
  url,
  offers: {
    "@type": "Offer",
    price: parseFloat(price.replace(/[^0-9.]/g, "")),
    priceCurrency: currency,
    availability: `https://schema.org/${availability}`,
    seller: { "@id": `${siteConfig.url}/#organization` },
  },
});

// Article schema for blog posts
export const generateArticleSchema = (
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  imageUrl: string,
  authorName: string = "The Financial Architects"
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${url}/#article`,
  headline: title,
  description,
  url,
  image: imageUrl,
  datePublished,
  dateModified,
  author: {
    "@type": "Organization",
    name: authorName,
    url: siteConfig.url,
  },
  publisher: { "@id": `${siteConfig.url}/#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
});

// InsuranceAgency schema for business insurance pages
export const generateInsuranceAgencySchema = (
  name: string,
  description: string,
  url: string,
  specialties: string[]
) => ({
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${url}/#insuranceagency`,
  name,
  description,
  url,
  parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areasServed.map((area) => ({
    "@type": "State",
    name: area,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business Insurance Services",
    itemListElement: specialties.map((specialty) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: specialty },
    })),
  },
});

// MedicalBusiness schema for healthcare/medicare pages
export const generateMedicalBusinessSchema = (
  name: string,
  description: string,
  url: string,
  specialties: string[]
) => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${url}/#medicalbusiness`,
  name,
  description,
  url,
  parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  medicalSpecialty: specialties,
  areaServed: siteConfig.areasServed.map((area) => ({
    "@type": "State",
    name: area,
  })),
});
