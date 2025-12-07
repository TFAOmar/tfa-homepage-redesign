import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  forWhom: string;
  benefits: string[];
  link?: string;
}

const ServiceCard = ({ icon: Icon, title, description, forWhom, benefits, link }: ServiceCardProps) => {
  return (
    <Card className="glass border-0 hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-8 md:p-10">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left: Icon & Title */}
          <div className="md:col-span-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
              <Icon className="h-8 w-8" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-3xl font-bold text-navy mb-4">
              {title}
            </h3>
            
            <p className="text-foreground leading-relaxed mb-6">
              {description}
            </p>

            {link ? (
              <Button 
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground group-hover:scale-105 transition-transform"
              >
                <Link to={link}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground group-hover:scale-105 transition-transform"
              >
                Speak With an Advisor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Right: Details */}
          <div className="md:col-span-8 space-y-6">
            {/* Who This Is For */}
            <div>
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
                Who This Is For
              </h4>
              <p className="text-foreground leading-relaxed">
                {forWhom}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
                What You Get
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                    </div>
                    <span className="text-foreground text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
