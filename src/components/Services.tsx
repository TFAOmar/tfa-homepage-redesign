import { 
  TrendingUp, 
  Shield, 
  FileText, 
  Calculator, 
  Heart, 
  PiggyBank, 
  RefreshCw, 
  Umbrella, 
  Users 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: TrendingUp,
    title: "Income Planning",
    description: "Create steady, reliable income streams for your retirement years.",
  },
  {
    icon: PiggyBank,
    title: "Investment Management",
    description: "Personalized portfolio strategies aligned with your financial goals.",
  },
  {
    icon: FileText,
    title: "Estate & Legacy Planning",
    description: "Preserve and transfer wealth to future generations efficiently.",
  },
  {
    icon: Calculator,
    title: "Tax Planning",
    description: "Minimize tax burden and maximize wealth retention strategies.",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Comprehensive protection for what matters most to your family.",
  },
  {
    icon: RefreshCw,
    title: "401(k) Rollovers & Retirement Plans",
    description: "Seamlessly transition and manage retirement accounts with guidance.",
  },
];

const Services = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Comprehensive Financial Planning Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Tailored strategies designed to meet your unique goals and secure your family's future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12 lg:mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="glass border-0 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-6 md:p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <service.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/services"
            className="inline-flex items-center text-accent hover:text-accent/80 font-semibold transition-colors group"
          >
            View All Services
            <RefreshCw className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
