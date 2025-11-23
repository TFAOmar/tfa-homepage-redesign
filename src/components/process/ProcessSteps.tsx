import { MessageCircle, Search, Lightbulb, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Discovery",
    description: "We begin by listening. In a comfortable, no-pressure conversation, we learn about your goals, concerns, family dynamics, and what truly matters to you.",
    details: [
      "Understanding your current financial situation",
      "Identifying your short and long-term goals",
      "Discussing your values and priorities",
      "Establishing clear expectations"
    ]
  },
  {
    number: "02",
    icon: Search,
    title: "Analysis",
    description: "Our team conducts a comprehensive review of your complete financial picture, examining every detail to identify opportunities and potential risks.",
    details: [
      "In-depth analysis of assets and liabilities",
      "Risk assessment and gap identification",
      "Tax efficiency evaluation",
      "Insurance and estate plan review"
    ]
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Strategy",
    description: "We design a personalized financial plan tailored to your unique situation, aligning every recommendation with your values and objectives.",
    details: [
      "Custom investment strategy development",
      "Income and tax planning solutions",
      "Estate and legacy planning framework",
      "Risk management recommendations"
    ]
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Guidance & Review",
    description: "Your plan evolves as your life changes. We provide ongoing support, regular reviews, and proactive adjustments to keep you on track toward your goals.",
    details: [
      "Quarterly portfolio reviews",
      "Annual comprehensive plan updates",
      "Life event planning adjustments",
      "Continuous market monitoring and rebalancing"
    ]
  }
];

const ProcessSteps = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Icon & Number */}
              <div className="flex-shrink-0 relative">
                <div className="w-48 h-48 rounded-full glass flex items-center justify-center relative group hover:scale-105 transition-transform duration-300">
                  <step.icon className="w-24 h-24 text-accent" strokeWidth={1.5} />
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-navy text-primary-foreground flex items-center justify-center">
                    <span className="text-3xl font-bold">{step.number}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                  {step.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
