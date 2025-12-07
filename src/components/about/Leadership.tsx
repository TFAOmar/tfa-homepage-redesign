import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Facebook, Instagram, Youtube, Quote, CheckCircle } from "lucide-react";
import mannySotoImg from "@/assets/leadership/manny-soto.jpg";
import omarSanchezImg from "@/assets/leadership/omar-sanchez.jpg";
import { Button } from "@/components/ui/button";

interface Leader {
  name: string;
  title: string;
  subtitle?: string;
  image: string;
  intro: string;
  mantra?: string;
  highlights: string[];
  expertise?: string[];
  closing: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

const leaders: Leader[] = [
  {
    name: "Manuel Soto",
    title: "CEO & Founder",
    subtitle: "National Financial Strategist | Founder | Speaker",
    image: mannySotoImg,
    intro: `Manuel "Manny" Soto is the CEO and Founder of The Financial Architects, one of the fastest-growing financial services organizations in the country. With nearly two decades of experience across insurance, retirement planning, investments, business strategies, and income protection, Manny has dedicated his career to helping families and business owners gain clarity, confidence, and control over their financial future.`,
    mantra: "Change what you're doing to change what you're getting",
    highlights: [
      "Built a client base of nearly 2,000 households",
      "Trained thousands of insurance agents, investment advisors, and financial professionals across the United States",
      "Rose from top-producing agent to respected broker and agency owner at a young age",
      "Launched The Financial Architects Franchise Model during the pandemic, expanding TFA's mission nationwide",
      "Widely sought-after speaker known for breaking down complex concepts into simple, empowering guidance",
    ],
    expertise: [
      "Social Security Optimization",
      "Retirement & Income Planning",
      "Annuities & Protected Growth",
      "Life Insurance & Legacy",
      "Business Structures & Tax Planning",
      "College Planning",
      "Reverse Mortgage Planning",
      "Comprehensive Wealth Protection",
    ],
    closing: `What makes Manny different is his approach to planning. He rejects "one-size-fits-all" and instead champions needs-based, context-driven strategies. Today, Manny leads TFA with a focus on innovation, advisor development, and life-changing client outcomes — building a national organization grounded in integrity, education, and results.`,
    linkedin: "https://linkedin.com/in/manuelsoto",
    facebook: "https://facebook.com/manuelsoto",
    instagram: "https://instagram.com/moneybusinessmanny",
    youtube: "https://youtube.com/@thefinancialarchitects",
  },
  {
    name: "Omar Sanchez",
    title: "Chief Operating Officer & Managing Partner",
    image: omarSanchezImg,
    intro: `Omar Sanchez is the Chief Operating Officer and Managing Partner of The Financial Architects, where he leads the firm's national expansion, advisor development, and the implementation of modern financial planning systems. Known for his ability to simplify complex strategies and build scalable processes, Omar has become one of the leading architects behind TFA's mission.`,
    highlights: [
      "First-generation Mexican-American from Southern California who recognized a gap in financial education within the Latino community",
      "Founded InsuranceLatino.com in 2015 — one of the first platforms teaching Spanish-speaking families about financial protection",
      "Leads firm-wide operations, technology, and digital client experience",
      "Oversees advisor onboarding, training, and professional development",
      "Drives strategic partnerships, new business divisions, and organizational growth",
    ],
    closing: `Omar is recognized for blending high-level financial strategy with real-world practicality, making him a trusted guide for both clients and advisors. Outside of work, Omar is a dedicated husband and father who values family above all. His purpose — both personally and professionally — is to help families build stability, wealth, and generational security.`,
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

        <div className="max-w-6xl mx-auto space-y-16">
          {leaders.map((leader, index) => (
            <Card
              key={index}
              className="glass border-0 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Image */}
                <div className="relative h-80 lg:h-auto min-h-[400px] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  
                  {/* Name overlay on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-[#E4B548] font-semibold">
                      {leader.title}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="lg:col-span-2 p-6 md:p-8 lg:p-10">
                  {/* Header - desktop only */}
                  <div className="hidden lg:block mb-6">
                    <h3 className="text-3xl font-bold text-navy mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-xl text-accent font-semibold">
                      {leader.title}
                    </p>
                    {leader.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {leader.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Intro */}
                  <p className="text-foreground leading-relaxed mb-6">
                    {leader.intro}
                  </p>

                  {/* Mantra Quote */}
                  {leader.mantra && (
                    <div className="bg-[#E4B548]/10 border-l-4 border-[#E4B548] p-4 rounded-r-lg mb-6">
                      <div className="flex items-start gap-3">
                        <Quote className="h-5 w-5 text-[#E4B548] flex-shrink-0 mt-0.5" />
                        <p className="text-navy font-semibold italic">
                          "{leader.mantra}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {leader.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-[#E4B548] flex-shrink-0 mt-1" />
                          <span className="text-sm text-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expertise Tags */}
                  {leader.expertise && leader.expertise.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.expertise.map((item, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full border border-navy/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Closing */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {leader.closing}
                  </p>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
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