import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const leaders = [
  {
    name: "Manuel Soto",
    title: "C.E.O. & Managing Partner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    bio: `Manuel Soto, "The Financial Architect," has been in the financial industry for nearly two decades. He is the owner and CEO of TFA Insurance Advisors, which is headquartered in Chino Hills, CA.

Manny went from a TOP producing agent to a broker/owner at a young age. By following his personal mantra, "Change what you're doing to change what you're getting", Manny has accumulated close to 2,000 personal clients and has trained thousands of insurance agents, registered representatives, and investment advisors.

What sets Manny apart from other financial representatives is his needs based planning programs. He does not believe in a one size fits all strategy. Manny knows that designing a course of action varies contextually — a beginner family has different needs than a senior citizen in their retirement age. His ability to customize these plans is possible because of his financial skill set developed through years of experience and study.

Manny is a HUGE believer in results based financial strategies and enjoys sharing his knowledge by speaking publicly. He often speaks at events on programs ranging from Social Security, annuities, life insurance, college planning, business structures, reverse mortgages, and many more.

During the pandemic, Manny also made a decision to franchise the financial planning opportunity. In this way, he hopes to expand The Financial Architects' reach so that people all over the United States are receiving the financial knowledge they deserve.`,
    linkedin: "https://linkedin.com/in/manuelsoto",
    facebook: "https://facebook.com/manuelsoto",
    instagram: "https://instagram.com/moneybusinessmanny",
    youtube: "https://youtube.com/@thefinancialarchitects",
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

                  <div className="flex flex-wrap gap-3">
                    {leader.linkedin && (
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                      </a>
                    )}
                    {leader.facebook && (
                      <a href={leader.facebook} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                      </a>
                    )}
                    {leader.instagram && (
                      <a href={leader.instagram} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                        >
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </Button>
                      </a>
                    )}
                    {leader.youtube && (
                      <a href={leader.youtube} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-navy text-navy hover:bg-navy hover:text-primary-foreground"
                        >
                          <Youtube className="h-4 w-4 mr-2" />
                          YouTube
                        </Button>
                      </a>
                    )}
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
