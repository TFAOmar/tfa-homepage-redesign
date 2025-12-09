import { TrendingUp, Users, GraduationCap, Zap, Shield, Globe } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "$84 Trillion Opportunity",
    description: "The largest wealth transfer in history is happening now. Between now and 2045, multigenerational wealth transfer will total $84.4 trillion.",
  },
  {
    icon: GraduationCap,
    title: "Comprehensive Training",
    description: "From pre-licensing education to advanced sales systems, we provide all the training you need to succeed in financial services.",
  },
  {
    icon: Shield,
    title: "Top Carrier Access",
    description: "Partner with industry-leading carriers including Prudential, Athene, Transamerica, and more for the best products for your clients.",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "Join our Skool community for ongoing support, training materials, resources, and connection with fellow advisors.",
  },
  {
    icon: Zap,
    title: "Proven Systems",
    description: "Our turnkey 5-step sales process and back-office support help you hit the ground running from day one.",
  },
  {
    icon: Globe,
    title: "Growing Network",
    description: "With 19+ office locations across California, Arizona, and Oregon, you're part of a rapidly expanding organization.",
  },
];

const WhyJoinTFA = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Join The Financial Architects?
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide the education, tools, and support to help you build a successful career in financial services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Franchise Stats */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Franchise Success Statistics</h3>
            <p className="text-white/70">Why franchising outperforms independent business ownership</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "92%", label: "2-Year Survival Rate" },
              { value: "780K+", label: "U.S. Franchise Businesses" },
              { value: "3%", label: "of National GDP" },
              { value: "20%", label: "Independent Failure Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinTFA;
