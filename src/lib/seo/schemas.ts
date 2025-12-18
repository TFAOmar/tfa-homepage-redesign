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
