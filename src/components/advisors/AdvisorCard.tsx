import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Shield, Calendar, ExternalLink, Award } from "lucide-react";
import { Advisor } from "@/data/advisors";
import { Link } from "react-router-dom";

interface ExtendedAdvisor extends Advisor {
  schedulingLink?: string;
}

interface AdvisorCardProps {
  advisor: Advisor | ExtendedAdvisor;
  index: number;
}

const AdvisorCard = ({ advisor, index }: AdvisorCardProps) => {
  return (
    <Card 
      className="glass hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col group overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Headshot */}
      <div className="relative h-72 bg-secondary/30 overflow-hidden">
        {advisor.image ? (
          <img 
            src={advisor.image} 
            alt={advisor.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy to-accent/60 flex items-center justify-center text-primary-foreground text-4xl font-bold">
              {advisor.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-navy tracking-tight group-hover:text-accent transition-colors">
            {advisor.name}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {advisor.title}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span>{advisor.city}, {advisor.state}</span>
            </div>
            {advisor.yearsOfExperience && (
              <div className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-accent" />
                <span>{advisor.yearsOfExperience}+ Years</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4 pt-0">
        {/* Bio */}
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
          {advisor.bio}
        </p>

        {/* Specialties */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Specialties
          </p>
          <div className="flex flex-wrap gap-1.5">
            {advisor.specialties.slice(0, 3).map((specialty, idx) => (
              <Badge 
                key={idx}
                variant="secondary"
                className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Licenses */}
        <div className="flex items-center gap-2 flex-wrap">
          {advisor.licenses.map((license, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-1 text-xs text-muted-foreground"
            >
              <Shield className="h-3 w-3 text-accent" />
              <span>{license}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        {('schedulingLink' in advisor && advisor.schedulingLink) ? (
          <a href={advisor.schedulingLink} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neuro-button group/btn"
            >
              <Calendar className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              Meet {advisor.name.split(' ')[0]}
              <ExternalLink className="ml-2 h-3 w-3 opacity-70" />
            </Button>
          </a>
        ) : (
          <Link to={`/contact?advisor=${encodeURIComponent(advisor.name)}`} className="w-full">
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neuro-button group/btn"
            >
              <Calendar className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              Schedule with {advisor.name.split(' ')[0]}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdvisorCard;
