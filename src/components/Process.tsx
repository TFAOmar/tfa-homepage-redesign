import { MessageCircle, ClipboardCheck, LineChart, Target } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Discovery",
    description: "Understand your goals, values, and financial aspirations in a comfortable environment.",
  },
  {
    icon: ClipboardCheck,
    title: "Strategy",
    description: "Build a custom financial plan aligned with your unique objectives and life vision.",
  },
  {
    icon: Target,
    title: "Guidance",
    description: "Lifetime support with regular reviews and updates as your needs evolve.",
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our Proven Process
          </h2>
          <p className="text-xl text-muted-foreground">
            A systematic approach to building your financial future
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line - Hidden on last item */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-accent/20 -z-10" />
              )}
              
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:scale-110">
                <step.icon className="h-10 w-10" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-navy mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
