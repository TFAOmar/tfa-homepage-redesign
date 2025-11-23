import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const leaders = [
  {
    name: "Manny Soto",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    bio: "Manny founded The Financial Architects in 2015 with a vision to democratize comprehensive wealth planning. With over 25 years in the financial services industry, he has dedicated his career to helping families navigate complex financial decisions with confidence. Before founding TFA, Manny held senior leadership roles at major financial institutions, where he witnessed firsthand the gap in personalized service for middle-market families. A Certified Financial Planner® and frequent industry speaker, Manny believes that financial education is the foundation of lasting wealth. Outside the office, he volunteers with financial literacy programs and enjoys spending time with his wife and three children.",
    linkedin: "#",
  },
  {
    name: "Omar Sanchez",
    title: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop",
    bio: "Omar joined The Financial Architects as COO in 2016, bringing 20+ years of operational excellence and strategic growth experience. His leadership has been instrumental in scaling TFA from a single office to 29 nationwide locations while maintaining the firm's commitment to personalized service. Prior to TFA, Omar led operations for a national advisory network and held executive positions at Fortune 500 financial firms. He holds an MBA from Northwestern University's Kellogg School of Management and is a Chartered Financial Analyst® charterholder. Omar is passionate about building systems that empower advisors to serve clients better. He serves on the board of several community financial education initiatives and enjoys cycling and coaching youth soccer.",
    linkedin: "#",
  },
];

const Leadership = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our Leadership
          </h2>
          <p className="text-xl text-muted-foreground">
            Experienced professionals committed to your success
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {leaders.map((leader, index) => (
            <Card
              key={index}
              className="glass border-0 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Image */}
                <div className="relative h-80 md:h-auto overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                </div>

                {/* Content */}
                <CardContent className="md:col-span-2 p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-navy mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-xl text-accent font-semibold mb-6">
                    {leader.title}
                  </p>
                  
                  <p className="text-foreground leading-relaxed mb-6">
                    {leader.bio}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
