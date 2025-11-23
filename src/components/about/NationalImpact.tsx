import { Users, MapPin, Award, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    value: "280+",
    label: "Licensed Advisors",
    description: "Highly trained professionals dedicated to your success",
  },
  {
    icon: MapPin,
    value: "29",
    label: "Office Locations",
    description: "Nationwide presence from coast to coast",
  },
  {
    icon: Award,
    value: "Thousands",
    label: "Families Served",
    description: "Building lasting relationships across generations",
  },
  {
    icon: DollarSign,
    value: "$2.5B+",
    label: "Assets Guided",
    description: "Trusted with families' financial futures",
  },
];

const regions = [
  "West Coast: CA, WA, OR",
  "Southwest: AZ, NV, TX",
  "Midwest: IL, OH, MI",
  "Southeast: FL, GA, NC",
  "Northeast: NY, MA, PA",
];

const NationalImpact = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our National Impact
          </h2>
          <p className="text-xl text-muted-foreground">
            Serving families across America with expertise and care
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="glass border-0 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <stat.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                
                <div className="text-4xl font-bold text-navy mb-2">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-accent mb-2">
                  {stat.label}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regional Presence */}
        <Card className="glass border-0 max-w-4xl mx-auto">
          <CardContent className="p-10">
            <h3 className="text-3xl font-bold text-navy text-center mb-8">
              Coast-to-Coast Coverage
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground font-medium">{region}</span>
                </div>
              ))}
              <div className="md:col-span-2 text-center mt-4">
                <p className="text-muted-foreground italic">
                  ...and expanding to serve even more communities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NationalImpact;
