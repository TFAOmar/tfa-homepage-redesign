import ShopHero from "@/components/shop/ShopHero";
import ProductGrid from "@/components/shop/ProductGrid";
import { useEffect } from "react";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="TFA Shop"
        description="Shop The Financial Architects merchandise and branded products. Quality apparel and accessories for our team and supporters."
        canonical={`${siteConfig.url}/shop`}
        keywords="TFA merchandise, financial architects shop, branded apparel, team merchandise"
      />
      <JsonLd
        data={[
          generateWebPageSchema(
            "Shop | The Financial Architects",
            "Official merchandise and branded products from The Financial Architects.",
            `${siteConfig.url}/shop`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Shop", url: `${siteConfig.url}/shop` },
          ]),
        ]}
      />
      <div className="min-h-screen">
        <ShopHero />
        <ProductGrid />
      </div>
    </>
  );
};

export default Shop;
