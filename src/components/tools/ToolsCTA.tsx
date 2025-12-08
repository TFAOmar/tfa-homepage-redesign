import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const ToolsCTA = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-6">
              <MessageSquare className="h-7 w-7" strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Need Personalized Guidance?
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Our advisors can help you refine your financial strategy, stress-test your assumptions, and build a comprehensive plan tailored to your family's unique goals.
            </p>
            
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button px-8"
            >
              <Link to="/contact">
                Talk to a TFA Advisor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            These calculators are for educational purposes only and do not constitute financial advice. Results are estimates based on the information provided and assumptions built into each tool. Actual outcomes may vary. Please consult with a licensed financial advisor before making investment or retirement decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsCTA;
