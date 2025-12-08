import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

const ToolCard = ({ icon: Icon, title, description, link }: ToolCardProps) => {
  return (
    <Card className="glass border-0 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 group h-full">
      <CardContent className="p-8 flex flex-col h-full">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-foreground/80 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group-hover:scale-[1.02] transition-transform neuro-button"
        >
          <Link to={link}>
            Open Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
