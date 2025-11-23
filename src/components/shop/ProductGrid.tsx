import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import ProductCard from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";

const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 text-accent animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <PackageOpen className="h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold text-navy mb-4">
              No Products Yet
            </h2>
            <p className="text-xl text-muted-foreground max-w-md mb-8">
              Our merchandise collection is coming soon. Check back shortly for premium TFA branded apparel and accessories.
            </p>
            <p className="text-muted-foreground">
              Want to add products? Tell me what you'd like to sell (e.g., "Create a navy TFA polo for $45")
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our Collection
          </h2>
          <p className="text-xl text-muted-foreground">
            Premium branded merchandise for financial professionals
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
