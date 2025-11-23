import { Heart, Shield, BookOpen, Home, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Family First",
    description: "We treat every client like family, building relationships that span generations and prioritizing your family's financial well-being above all else.",
  },
  {
    icon: Shield,
    title: "Unwavering Integrity",
    description: "Our recommendations are always grounded in what's best for you—never influenced by commissions or quotas. Transparency and honesty guide every conversation.",
  },
  {
    icon: BookOpen,
    title: "Education-Driven",
    description: "We believe informed clients make better decisions. Our advisors take time to educate, explain, and empower you to understand every aspect of your financial plan.",
  },
  {
    icon: Home,
    title: "Legacy Building",
    description: "We help you create more than wealth—we help you build a lasting legacy that reflects your values and provides for those you love most.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "We're committed to staying at the forefront of financial planning, continuously learning and adapting to serve you better in an ever-changing world.",
  },
];

const CoreValues = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-muted-foreground">
            The principles that guide every decision we make
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card
              key={index}
              className="glass border-0 hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <value.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
