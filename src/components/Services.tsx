import { 
  TrendingUp, 
  Shield, 
  Calculator, 
  Heart, 
  PiggyBank, 
  Users,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Protect your family's future if something happens to you.",
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description: "Enjoy retirement without worrying about money.",
  },
  {
    icon: TrendingUp,
    title: "Investment Planning",
    description: "Grow your wealth with guidance you can trust.",
  },
  {
    icon: Heart,
    title: "Estate Planning",
    description: "Ensure your legacy is protected and your family is cared for.",
  },
  {
    icon: Calculator,
    title: "Tax Strategies",
    description: "Keep more of what you earn with simple, smart planning.",
  },
  {
    icon: Users,
    title: "Family Protection",
    description: "Comprehensive care that grows with your family.",
  },
];

const Services = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-20 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            What We Help You With
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive financial guidance designed around your family's needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-10 rounded-2xl glass border-0 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-7 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:scale-110">
                <service.icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/services"
            className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg transition-colors group"
          >
            Learn more about our services
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
