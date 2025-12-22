import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  
  const [selectedVariant, setSelectedVariant] = useState(node.variants.edges[0].node);
  const hasMultipleVariants = node.variants.edges.length > 1;

  const handleAddToCart = () => {
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
      description: `${node.title} has been added to your cart.`,
    });
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(selectedVariant.price.amount);

  return (
    <Card className="glass hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link to={`/shop/${node.handle}`} className="cursor-pointer">
        <div className="aspect-square overflow-hidden rounded-t-lg bg-white">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={node.title}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>

      <CardHeader>
        <CardTitle className="text-xl text-navy line-clamp-2">
          {node.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {node.description || "Premium TFA branded merchandise"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="mb-4">
          <p className="text-2xl font-bold text-accent">
            {selectedVariant.price.currencyCode} ${price.toFixed(2)}
          </p>
        </div>

        {hasMultipleVariants && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {node.options[0]?.name || "Variant"}
            </label>
            <Select
              value={selectedVariant.id}
              onValueChange={(value) => {
                const variant = node.variants.edges.find(v => v.node.id === value);
                if (variant) setSelectedVariant(variant.node);
              }}
            >
              <SelectTrigger>
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
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          disabled={!selectedVariant.availableForSale}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {selectedVariant.availableForSale ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
