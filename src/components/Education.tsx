import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookOpen, Video } from "lucide-react";

const resources = [
  {
    icon: Calendar,
    title: "Upcoming Workshops",
    description: "Join our free educational seminars on retirement planning, tax strategies, and estate planning.",
    cta: "View Events",
  },
  {
    icon: BookOpen,
    title: "Financial Insights Blog",
    description: "Stay informed with articles on market trends, planning strategies, and financial news that matters.",
    cta: "Read Articles",
  },
  {
    icon: Video,
    title: "Educational Resources",
    description: "Access our library of guides, videos, and tools designed to empower your financial decisions.",
    cta: "Explore Library",
  },
];

const Education = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Education & Events
          </h2>
          <p className="text-xl text-muted-foreground">
            Empowering you with knowledge for confident financial decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="glass border-0 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <resource.icon className="h-10 w-10" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-semibold text-navy mb-4">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <Button 
                  variant="outline"
                  className="group-hover:bg-navy group-hover:text-primary-foreground group-hover:border-navy transition-colors"
                >
                  {resource.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
