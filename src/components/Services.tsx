import { 
  TrendingUp, 
  Shield, 
  Calculator, 
  Heart, 
  PiggyBank, 
  Users,
  ArrowRight,
  FileText,
  RefreshCw,
  Umbrella,
  Building2
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Income Planning",
    description: "Create reliable income streams that last throughout retirement.",
  },
  {
    icon: PiggyBank,
    title: "Investment Management",
    description: "Build a diversified portfolio aligned with your goals.",
  },
  {
    icon: FileText,
    title: "Estate & Legacy Planning",
    description: "Ensure your wealth transfers efficiently to loved ones.",
  },
  {
    icon: Calculator,
    title: "Tax Planning",
    description: "Reduce your tax burden and keep more of what you earn.",
  },
  {
    icon: Heart,
    title: "Health Care Planning",
    description: "Navigate Medicare and healthcare cost projections.",
  },
  {
    icon: Shield,
    title: "Annuities",
    description: "Guaranteed income and principal protection options.",
  },
  {
    icon: RefreshCw,
    title: "401(k) Rollovers",
    description: "Consolidate retirement accounts with more options.",
  },
  {
    icon: Umbrella,
    title: "Insurance",
    description: "Protect your family with life, disability, and LTC coverage.",
  },
  {
    icon: Users,
    title: "Group Retirement Plans",
    description: "Design employer-sponsored retirement benefits.",
  },
  {
    icon: Building2,
    title: "Business Insurance",
    description: "Commercial coverage tailored to your business needs.",
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
          {services.map((service, index) => {
            const isLastOdd = services.length % 3 === 1 && index === services.length - 1;
            return (
              <div
                key={index}
                className={`group p-10 rounded-2xl glass border border-transparent hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in ${isLastOdd ? 'lg:col-start-2' : ''}`}
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
            );
          })}
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
