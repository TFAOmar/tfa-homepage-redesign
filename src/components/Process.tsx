import { MessageCircle, ClipboardCheck, LineChart, Target } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Discover Your Goals",
    description: "We listen to what matters most to you in a relaxed, no-pressure conversation.",
  },
  {
    icon: ClipboardCheck,
    title: "Build Your Strategy",
    description: "Together, we create a clear path designed to help you reach your family's goals.",
  },
  {
    icon: Target,
    title: "Guide Your Journey",
    description: "We're with you every step, adjusting your plan as life changes.",
  },
];

const Process = () => {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6 md:px-20 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            How We Work Together
          </h2>
          <p className="text-xl text-muted-foreground">
            A simple, human approach to building your financial future
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line - Hidden on last item */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-1/2 w-full h-0.5 bg-accent/20 -z-10" />
              )}
              
              <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-accent/10 text-accent mb-8 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:scale-110">
                <step.icon className="h-12 w-12" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-navy text-primary-foreground flex items-center justify-center text-base font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-navy mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
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
