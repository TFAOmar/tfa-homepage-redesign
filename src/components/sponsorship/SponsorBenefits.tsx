import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Mic2, 
  Target, 
  Users2, 
  Share2, 
  CalendarDays,
  CheckCircle2 
} from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Brand Authority",
    description: "Build credibility and trust with the TFA community of insurance professionals and their clients.",
  },
  {
    icon: Mic2,
    title: "On-Stage Spotlight",
    description: "Share your value proposition directly with a captive audience of motivated professionals.",
  },
  {
    icon: Target,
    title: "Lead Generation",
    description: "Capture qualified leads at your branded booth and turn attendees into customers.",
  },
  {
    icon: Users2,
    title: "VIP Networking",
    description: "Connect with top performers, agency leaders, and decision-makers in exclusive settings.",
  },
  {
    icon: Share2,
    title: "Social Media Amplification",
    description: "Get featured across TFA's social channels, reaching thousands of followers.",
  },
  {
    icon: CalendarDays,
    title: "Year-Round Visibility",
    description: "Multi-event packages keep your brand top-of-mind throughout the entire year.",
  },
];

export const SponsorBenefits = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Why Sponsor?
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What You Get
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every sponsorship package includes powerful benefits designed to grow your business.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>

              {/* Hover gradient accent */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
