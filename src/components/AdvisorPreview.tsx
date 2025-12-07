import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { advisors } from "@/data/advisors";

const AdvisorPreview = () => {
  // Get first 3 approved advisors
  const featuredAdvisors = advisors.slice(0, 3);

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-20 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            Meet Our Advisors
          </h2>
          <p className="text-xl text-muted-foreground">
            Experienced professionals dedicated to your financial success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-14">
          {featuredAdvisors.map((advisor, index) => (
            <div
              key={advisor.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-b from-gray-400 to-gray-600">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy mb-2">
                  {advisor.name}
                </h3>
                
                <p className="text-accent font-semibold mb-4 text-base">
                  {advisor.city}, {advisor.state}
                </p>
                
                <p className="text-muted-foreground text-base leading-relaxed mb-6 line-clamp-2">
                  {advisor.bio}
                </p>
                
                <Link to={`/contact?advisor=${advisor.id}`}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all text-base py-6"
                  >
                    Connect with {advisor.name.split(" ")[0]}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/advisors">
            <a className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg transition-colors group">
              View all advisors
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdvisorPreview;
