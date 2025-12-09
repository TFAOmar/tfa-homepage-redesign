import { Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const MissionVision = () => {
  return <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission */}
          <Card className="glass border-0 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <Target className="h-8 w-8" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-3xl font-bold text-navy mb-6">
                Our Mission
              </h3>
              
              <p className="text-lg text-foreground leading-relaxed">
                To educate and empower families with the knowledge, strategies, and ongoing support they need to achieve financial clarity, build lasting wealth, and create meaningful legacies for future generations.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="glass border-0 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <Eye className="h-8 w-8" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-3xl font-bold text-navy mb-6">
                Our Vision
              </h3>
              
              <p className="text-lg text-foreground leading-relaxed">
                To become America's most trusted financial planning partner, known for our unwavering integrity, educational approach, and genuine commitment to putting families first in every decision we make.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default MissionVision;