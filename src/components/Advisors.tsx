import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail } from "lucide-react";

const advisors = [
  {
    name: "Michael Chen",
    title: "Senior Wealth Advisor",
    location: "San Francisco, CA",
    bio: "20+ years guiding high-net-worth families through comprehensive wealth management.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Thompson",
    title: "Estate Planning Specialist",
    location: "Boston, MA",
    bio: "Expert in multigenerational wealth transfer and legacy planning strategies.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "David Rodriguez",
    title: "Retirement Planning Advisor",
    location: "Austin, TX",
    bio: "Specializing in tax-efficient retirement income strategies and 401(k) optimization.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    name: "Jennifer Wu",
    title: "Investment Strategist",
    location: "New York, NY",
    bio: "Portfolio management expert focused on risk-adjusted returns and diversification.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

const Advisors = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Meet Our Expert Advisors
          </h2>
          <p className="text-xl text-muted-foreground">
            Experienced professionals dedicated to your financial success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advisors.map((advisor, index) => (
            <Card
              key={index}
              className="glass border-0 overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-navy mb-1">
                  {advisor.name}
                </h3>
                <p className="text-accent font-medium mb-2">
                  {advisor.title}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {advisor.location}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {advisor.bio}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-primary-foreground">
            View All Advisors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Advisors;
