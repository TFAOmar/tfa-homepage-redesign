import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EstateGuruPricing = () => {
  const { pricing } = estateGuruContent;
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, isPromo: boolean) => {
    setLoadingPlan(priceId + (isPromo ? "-promo" : ""));
    
    try {
      const { data, error } = await supabase.functions.invoke("create-estate-guru-checkout", {
        body: { priceId, isPromo },
      });

      if (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to start checkout. Please try again.");
        return;
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        toast.error("No checkout URL returned. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
            {pricing.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricing.plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:shadow-xl ${
                plan.isPromo
                  ? "bg-gradient-to-br from-[#D4AF37] to-[#B8962F] text-[#0B1F3B] shadow-lg shadow-[#D4AF37]/25 scale-105 border-2 border-[#D4AF37]"
                  : "bg-white border border-gray-200 hover:border-[#D4AF37]/50"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                    plan.isPromo 
                      ? "bg-[#0B1F3B] text-white" 
                      : "bg-[#D4AF37] text-[#0B1F3B]"
                  }`}>
                    <Sparkles size={14} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.isPromo ? "text-[#0B1F3B]" : "text-[#0B1F3B]"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl lg:text-5xl font-bold ${plan.isPromo ? "text-[#0B1F3B]" : "text-[#0B1F3B]"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.isPromo ? "text-[#0B1F3B]/70" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>
                {plan.originalPrice && (
                  <p className={`mt-1 text-sm ${plan.isPromo ? "text-[#0B1F3B]/70" : "text-gray-500"}`}>
                    <span className="line-through">{plan.originalPrice}</span>
                  </p>
                )}
              </div>

              <p className={`text-center mb-6 ${plan.isPromo ? "text-[#0B1F3B]/80" : "text-gray-600"}`}>
                {plan.description}
              </p>

              {plan.code && (
                <div className={`mb-6 p-3 rounded-lg text-center ${
                  plan.isPromo ? "bg-[#0B1F3B]/10" : "bg-[#D4AF37]/10"
                }`}>
                  <p className={`text-sm ${plan.isPromo ? "text-[#0B1F3B]/80" : "text-gray-600"}`}>
                    Use code:
                  </p>
                  <p className={`font-bold text-lg ${plan.isPromo ? "text-[#0B1F3B]" : "text-[#D4AF37]"}`}>
                    {plan.code}
                  </p>
                </div>
              )}

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`mt-0.5 flex-shrink-0 ${plan.isPromo ? "text-[#0B1F3B]" : "text-[#D4AF37]"}`} size={18} />
                    <span className={plan.isPromo ? "text-[#0B1F3B]/90" : "text-gray-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(plan.priceId, plan.isPromo)}
                disabled={loadingPlan !== null}
                size="lg"
                className={`w-full font-semibold ${
                  plan.isPromo
                    ? "bg-[#0B1F3B] hover:bg-[#0B1F3B]/90 text-white"
                    : "bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B]"
                }`}
              >
                {loadingPlan === plan.priceId + (plan.isPromo ? "-promo" : "") ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 max-w-xl mx-auto">
          {pricing.note}
        </p>
      </div>
    </section>
  );
};

export default EstateGuruPricing;
