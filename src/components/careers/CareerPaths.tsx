import { Button } from "@/components/ui/button";
import { UserPlus, Building2, ArrowRight, CheckCircle } from "lucide-react";

const CareerPaths = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground">
            Two powerful ways to build your career in financial services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Agent Path */}
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/50 rounded-t-2xl" />
            
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserPlus className="h-8 w-8 text-accent" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3">Become an Agent</h3>
            <p className="text-muted-foreground mb-6">
              Start your career as a licensed insurance professional with comprehensive training and mentorship.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Get licensed with our pre-licensing program",
                "Access to top-tier insurance carriers",
                "Weekly training & ongoing support",
                "Up to 100% commission potential",
                "Professional community via Skool",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => scrollToSection("agent-path")}
              className="w-full btn-primary-cta group/btn"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Franchise Path */}
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-t-2xl" />
            
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="h-8 w-8 text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3">Become a Franchisee</h3>
            <p className="text-muted-foreground mb-6">
              Own your own TFA franchise with proven systems, training, and support to scale your business.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Turnkey business model",
                "Established brand & systems",
                "Scalable income potential (up to 120%)",
                "Tap into $84 trillion wealth transfer",
                "Build & lead your own team",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => scrollToSection("franchise-path")}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white group/btn"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;
