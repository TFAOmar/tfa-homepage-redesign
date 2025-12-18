import { Helmet } from "react-helmet-async";
import { siteConfig, defaultMeta } from "@/lib/seo/siteConfig";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
  children?: React.ReactNode;
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  noIndex = false,
  children,
}: SEOHeadProps) => {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : defaultMeta.title;
  const pageDescription = description || defaultMeta.description;
  const pageKeywords = keywords || defaultMeta.keywords;
  const pageImage = ogImage || defaultMeta.ogImage;
  const pageUrl = canonical || siteConfig.url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content={siteConfig.name} />
      <meta name="publisher" content={siteConfig.name} />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Chino Hills" />
      
      {/* Mobile */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#0A0F1F" />
      
      {children}
    </Helmet>
  );
};

export default SEOHead;
