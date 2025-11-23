import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { advisors } from "@/data/advisors";

const AdvisorPreview = () => {
  // Get first 3 approved advisors
  const featuredAdvisors = advisors.slice(0, 3);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Meet Our Advisors & Brokers
          </h2>
          <p className="text-xl text-muted-foreground">
            A national team dedicated to serving families and business owners with integrity and care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12 lg:mb-16">
          {featuredAdvisors.map((advisor, index) => (
            <Card
              key={advisor.id}
              className="glass border-0 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Advisor Image */}
                <div className="relative h-64 bg-gradient-to-br from-accent/20 to-navy/20 flex items-center justify-center overflow-hidden">
                  {advisor.image ? (
                    <img
                      src={advisor.image}
                      alt={`${advisor.name} headshot`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-accent">
                        {advisor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Advisor Info */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-navy mb-1 group-hover:text-accent transition-colors">
                    {advisor.name}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-2">
                    {advisor.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {advisor.city}, {advisor.state}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {advisor.bio}
                  </p>
                  <Link to={`/contact?advisor=${advisor.id}`}>
                    <Button
                      variant="outline"
                      className="w-full border-accent/20 hover:border-accent hover:bg-accent/10"
                    >
                      Meet {advisor.name.split(" ")[0]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/advisors">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base neuro-button group"
            >
              View All Advisors
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdvisorPreview;
