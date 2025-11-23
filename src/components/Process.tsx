import { MessageCircle, ClipboardCheck, LineChart, Target } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Discover Your Goals",
    description: "We listen to your dreams, concerns, and financial aspirations in a no-pressure conversation.",
  },
  {
    icon: ClipboardCheck,
    title: "Build Your Plan",
    description: "Together, we create a personalized roadmap designed to achieve your family's unique goals.",
  },
  {
    icon: Target,
    title: "Stay on Track",
    description: "You'll never be alone — we provide ongoing guidance and adjust your plan as life changes.",
  },
];

const Process = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our Proven Process
          </h2>
          <p className="text-xl text-muted-foreground">
            A systematic approach to building your financial future
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
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
              
              <h3 className="text-xl font-semibold text-navy mb-2.5">
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
