import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { ShopifyProduct, fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        setLoading(true);
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        setSelectedVariant(data?.node.variants.edges[0].node);
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/shop")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const { node } = product;
  const imageUrl = node.images.edges[0]?.node.url;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const hasMultipleVariants = node.variants.edges.length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/shop")}
          className="mb-6 text-white hover:text-white/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center bg-secondary/20">
                <ShoppingCart className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
                {node.title}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                {node.description || "Premium TFA branded merchandise"}
              </p>
            </div>

            <div className="h-1.5 w-16 bg-primary rounded-full"></div>

            <div className="text-4xl font-bold text-primary">
              {selectedVariant?.price.currencyCode} ${price.toFixed(2)}
            </div>

            {hasMultipleVariants && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/90">
                  {node.options[0]?.name || "Variant"}
                </label>
                <Select
                  value={selectedVariant?.id}
                  onValueChange={(value) => {
                    const variant = node.variants.edges.find(v => v.node.id === value);
                    if (variant) setSelectedVariant(variant.node);
                  }}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {node.variants.edges.map(({ node: variant }) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.title} - ${parseFloat(variant.price.amount).toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
              size="lg"
              className="w-full md:w-auto px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
