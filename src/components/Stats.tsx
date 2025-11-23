import { Users, MapPin, Heart, Calendar } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "280+",
    label: "Licensed Advisors",
  },
  {
    icon: MapPin,
    value: "29",
    label: "Locations Nationwide",
  },
  {
    icon: Heart,
    value: "Thousands",
    label: "Families Served",
  },
  {
    icon: Calendar,
    value: "Since 2015",
    label: "Years of Excellence",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <stat.icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
