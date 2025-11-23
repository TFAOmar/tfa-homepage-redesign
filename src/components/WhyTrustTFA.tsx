import { Users, MapPin, Heart, Shield } from "lucide-react";

const reasons = [
  {
    icon: Users,
    value: "280+",
    label: "Licensed Advisors",
    description: "Experienced professionals dedicated to your success",
  },
  {
    icon: MapPin,
    value: "29",
    label: "Locations Nationwide",
    description: "Coast-to-coast presence to serve you locally",
  },
  {
    icon: Heart,
    value: "Thousands",
    label: "Families Served",
    description: "Building lasting relationships built on trust",
  },
  {
    icon: Shield,
    value: "Excellence",
    label: "Industry-Leading Partners",
    description: "Access to top-rated financial institutions",
  },
];

const WhyTrustTFA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Why Families Trust TFA
          </h2>
          <p className="text-xl text-muted-foreground">
            A family-oriented approach to financial planning backed by national expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <reason.icon className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                {reason.value}
              </div>
              <div className="text-lg font-semibold text-navy mb-2">
                {reason.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustTFA;
