import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema, generateBlogSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Financial Planning Blog"
        description="Expert insights on retirement planning, investment strategies, tax optimization, and wealth management. Stay informed with The Financial Architects' latest articles."
        canonical={`${siteConfig.url}/blog`}
        keywords="financial planning blog, retirement planning articles, investment advice, tax planning tips, wealth management insights, financial education"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Financial Planning Blog | The Financial Architects",
            "Expert articles and insights on retirement planning, investments, and wealth management.",
            `${siteConfig.url}/blog`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog` },
          ]),
          generateBlogSchema(`${siteConfig.url}/blog`),
        ]}
      />
      <div className="min-h-screen">
        <BlogHero />
        <BlogGrid />
      </div>
    </>
  );
};

export default Blog;
