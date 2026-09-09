import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { partnerCategories } from "@/components/preferred-partners/partnerCategories";

const PreferredPartnersPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 sm:p-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5">
            Preferred Partner Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Professionals We Work Alongside
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We team up with trusted lenders, realtors, tax professionals, and brokers so your whole
            financial picture is handled by people who talk to each other.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {partnerCategories.map((category) => {
              const Icon = category.icon;
              return (
                <span
                  key={category.id}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/60 text-sm font-medium text-foreground"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {category.short}
                </span>
              );
            })}
          </div>

          <Button asChild size="lg">
            <Link to="/preferred-partners">
              Partner Spotlight
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreferredPartnersPreview;
