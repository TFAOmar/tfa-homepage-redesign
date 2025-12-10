import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, FileCheck, UserCheck, Rocket, ArrowRight, DollarSign } from "lucide-react";

const steps = [
  {
    icon: GraduationCap,
    title: "Pre-Licensing Education",
    description: "Complete 32 hours of pre-licensing education through XCEL Solutions. Cost: $49 with TFA discount code.",
    details: ["Life Pre-Licensing Bundle", "Self-paced online learning", "TFA discount code available"],
  },
  {
    icon: FileCheck,
    title: "Pass Your Exam",
    description: "Schedule and pass your Life Agent Examination through PSI Exams.",
    details: ["$55-$88 exam fee", "Fingerprinting at test site ($68.95)", "Arrive 30 minutes early with ID"],
  },
  {
    icon: UserCheck,
    title: "Get Licensed & Contract",
    description: "Apply for your California Life & Health License through Sircon, then complete TFA contracting.",
    details: ["$193 license application", "TFA Membership: $49.99 (one-time)", "Skool Community: $29.99/month"],
  },
  {
    icon: Rocket,
    title: "Launch Your Career",
    description: "Complete TFA Quick Start training, get appointed with carriers, and start building your client base.",
    details: ["Signal Advisors portal setup", "Request carrier appointments", "Weekly training & support"],
  },
];

const compensationLevels = [
  { position: "Agent", percentage: "50%" },
  { position: "Advisor", percentage: "60%" },
  { position: "Sr. Advisor", percentage: "70%" },
  { position: "Partner", percentage: "80%" },
  { position: "Sr. Partner", percentage: "90%" },
  { position: "Managing Partner", percentage: "100%" },
];

const AgentPath = () => {
  return (
    <section id="agent-path" className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <GraduationCap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Agent Path</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Become a Licensed Insurance Agent
          </h2>
          <p className="text-lg text-muted-foreground">
            Start your journey from pre-licensing through to building your client base. 
            We provide the roadmap and support every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent/20 hidden md:block" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-2xl flex items-center justify-center z-10 shadow-lg">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">STEP {index + 1}</span>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="flex flex-wrap gap-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="text-xs bg-muted/50 text-muted-foreground px-3 py-1 rounded-full">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compensation Structure */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-8 w-8 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">Compensation Structure</h3>
          </div>
          <p className="text-muted-foreground mb-8">
            Advance through our tiered compensation structure based on your production. 
            The more you grow, the more you earn.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {compensationLevels.map((level, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 text-center border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-accent mb-1">{level.percentage}</div>
                <div className="text-xs text-muted-foreground">{level.position}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/careers/agent">
              <Button className="btn-primary-cta group">
                Learn More & Apply
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentPath;
