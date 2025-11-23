import { Shield, Award, CheckCircle2, Building2, Scale, Users2 } from "lucide-react";
import allianzLogo from "@/assets/carriers/allianz.png";
import atheneLogoLogo from "@/assets/carriers/athene.png";
import corebridgeLogo from "@/assets/carriers/corebridge.png";
import fngLogo from "@/assets/carriers/fng.png";
import forestersLogo from "@/assets/carriers/foresters.png";
import lincolnLogo from "@/assets/carriers/lincoln.png";
import massmutualLogo from "@/assets/carriers/massmutual.png";
import midlandLogo from "@/assets/carriers/midland-national.png";
import mutualOmahaLogo from "@/assets/carriers/mutual-of-omaha.png";
import nationalLifeLogo from "@/assets/carriers/national-life.png";
import northAmericanLogo from "@/assets/carriers/north-american.png";
import principalLogo from "@/assets/carriers/principal.png";
import prudentialLogo from "@/assets/carriers/prudential.png";
import americanNationalLogo from "@/assets/carriers/american-national.png";

const carriers = [
  { name: "Allianz", logo: allianzLogo },
  { name: "Athene", logo: atheneLogoLogo },
  { name: "Corebridge Financial", logo: corebridgeLogo },
  { name: "F&G", logo: fngLogo },
  { name: "Foresters Financial", logo: forestersLogo },
  { name: "Lincoln Financial", logo: lincolnLogo },
  { name: "MassMutual", logo: massmutualLogo },
  { name: "Midland National", logo: midlandLogo },
  { name: "Mutual of Omaha", logo: mutualOmahaLogo },
  { name: "National Life Group", logo: nationalLifeLogo },
  { name: "North American", logo: northAmericanLogo },
  { name: "Principal", logo: principalLogo },
  { name: "Prudential", logo: prudentialLogo },
  { name: "American National", logo: americanNationalLogo },
];

const affiliations = [
  {
    icon: Shield,
    name: "NAIFA Member",
    description: "National Association of Insurance and Financial Advisors",
  },
  {
    icon: Award,
    name: "BBB Accredited",
    description: "Better Business Bureau A+ Rating",
  },
  {
    icon: CheckCircle2,
    name: "State Licensed",
    description: "Licensed across all 50 states",
  },
  {
    icon: Building2,
    name: "FSP Professional",
    description: "Society of Financial Service Professionals",
  },
  {
    icon: Scale,
    name: "FINRA Compliant",
    description: "Adhering to regulatory standards",
  },
  {
    icon: Users2,
    name: "MDRT Member",
    description: "Million Dollar Round Table",
  },
];

const TrustStrip = () => {
  const duplicatedCarriers = [...carriers, ...carriers];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Trusted By Leading Insurance & Financial Institutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We partner with industry-leading life insurance and annuity carriers to build strategies tailored to your financial future.
          </p>
        </div>

        {/* Carrier Logos Carousel */}
        <div className="relative mb-20">
          <div className="flex gap-12 animate-scroll hover:pause-animation mb-8">
            {duplicatedCarriers.map((carrier, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <img
                  src={carrier.logo}
                  alt={`${carrier.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Professional Affiliations */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">
            Professional Affiliations & Credentials
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advisors maintain the highest standards of professional excellence and regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {affiliations.map((affiliation, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-6 rounded-xl glass hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <affiliation.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h4 className="font-semibold text-navy text-sm mb-2">
                {affiliation.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {affiliation.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustStrip;
