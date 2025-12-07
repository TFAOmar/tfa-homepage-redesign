import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const leaders = [
  {
    name: "Manuel Soto",
    title: "CEO & Founder",
    subtitle: "National Financial Strategist | Founder | Speaker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    bio: `Manuel "Manny" Soto is the CEO and Founder of The Financial Architects, one of the fastest-growing financial services organizations in the country. With nearly two decades of experience across insurance, retirement planning, investments, business strategies, and income protection, Manny has dedicated his career to helping families and business owners gain clarity, confidence, and control over their financial future.

Manny began as a top-producing agent at a young age and quickly rose to become a respected broker and agency owner. Guided by his personal mantra — "Change what you're doing to change what you're getting" — he built a client base of nearly 2,000 households and has trained thousands of insurance agents, investment advisors, and financial professionals across the United States.

What makes Manny different is his approach to planning. He rejects the idea of "one-size-fits-all" and instead champions needs-based, context-driven strategies. A young family, a business owner, and a retiree each face unique financial challenges — and Manny is known for designing precise, actionable plans that match each client's real-world situation.

His expertise spans Social Security optimization, retirement & income planning, annuities & protected growth strategies, life insurance & legacy strategies, business structures & tax-efficient planning, college planning, reverse mortgage planning, and comprehensive wealth protection.

Manny is also a widely sought-after speaker, known for breaking down complex concepts into simple, empowering guidance. His educational events have helped thousands of families and professionals understand how money works and how to make it work for them.

During the pandemic, Manny launched The Financial Architects Franchise Model, expanding TFA's mission nationwide. His vision is bold and simple: Provide every American household and business with access to the financial knowledge, tools, and strategies they deserve.

Today, Manny leads TFA with a focus on innovation, advisor development, and life-changing client outcomes — building a national organization grounded in integrity, education, and results.`,
    linkedin: "https://linkedin.com/in/manuelsoto",
    facebook: "https://facebook.com/manuelsoto",
    instagram: "https://instagram.com/moneybusinessmanny",
    youtube: "https://youtube.com/@thefinancialarchitects",
  },
  {
    name: "Omar Sanchez",
    title: "Chief Operating Officer & Managing Partner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop",
    bio: `Omar Sanchez is the Chief Operating Officer and Managing Partner of The Financial Architects, where he leads the firm's national expansion, advisor development, and the implementation of modern financial planning systems. Known for his ability to simplify complex strategies and build scalable processes, Omar has become one of the leading architects behind TFA's mission: helping families, business owners, and agents make smarter financial decisions with confidence.

A first-generation Mexican-American from Southern California, Omar built his career by recognizing a gap in financial education within the Latino community. In 2015, he founded InsuranceLatino.com, one of the first platforms dedicated to teaching Spanish-speaking families about life insurance, retirement planning, and financial protection. His commitment to clarity, transparency, and education continues to shape his leadership at TFA today.

At The Financial Architects, Omar oversees firm-wide operations and technology, advisor onboarding, training, and development, strategic partnerships and new business divisions, digital client experience and modern planning tools, and expansion systems and organizational growth.

Omar is recognized for blending high-level financial strategy with real-world practicality, making him a trusted guide for both clients and advisors. Whether he's coaching a new agent, designing a planning system, or helping a family secure their financial future, he brings the same focus: integrity, education, and long-term protection.

Outside of work, Omar is a dedicated husband and father who values family above all. His purpose — both personally and professionally — is to help families build stability, wealth, and generational security.`,
    linkedin: "https://linkedin.com/in/omarsanchez",
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
                  <h3 className="text-3xl font-bold text-navy mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-xl text-accent font-semibold mb-1">
                    {leader.title}
                  </p>
                  {leader.subtitle && (
                    <p className="text-sm text-muted-foreground mb-5">
                      {leader.subtitle}
                    </p>
                  )}
                  {!leader.subtitle && <div className="mb-5" />}
                  
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
