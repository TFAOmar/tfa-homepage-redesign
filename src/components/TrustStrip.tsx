import { Link } from "react-router-dom";
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
  { name: "Allianz", logo: allianzLogo, id: "allianz" },
  { name: "Athene", logo: atheneLogoLogo, id: "athene" },
  { name: "Corebridge Financial", logo: corebridgeLogo, id: "corebridge" },
  { name: "F&G", logo: fngLogo, id: "fng" },
  { name: "Foresters Financial", logo: forestersLogo, id: "foresters" },
  { name: "Lincoln Financial", logo: lincolnLogo, id: "lincoln" },
  { name: "MassMutual", logo: massmutualLogo, id: "massmutual" },
  { name: "Midland National", logo: midlandLogo, id: "midland-national" },
  { name: "Mutual of Omaha", logo: mutualOmahaLogo, id: "mutual-of-omaha" },
  { name: "National Life Group", logo: nationalLifeLogo, id: "national-life" },
  { name: "North American", logo: northAmericanLogo, id: "north-american" },
  { name: "Principal", logo: principalLogo, id: "principal" },
  { name: "Prudential", logo: prudentialLogo, id: "prudential" },
  { name: "American National", logo: americanNationalLogo, id: "american-national" },
];

const TrustStrip = () => {
  const duplicatedCarriers = [...carriers, ...carriers];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* Section Header - Clean and simple */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Trusted by America's Leading Carriers
          </h2>
        </div>

        {/* Carrier Logos Carousel */}
        <div className="relative">
          <div className="flex gap-16 md:gap-20 animate-scroll hover:pause-animation">
            {duplicatedCarriers.map((carrier, index) => (
              <Link
                key={index}
                to={`/partners?carrier=${carrier.id}`}
                className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 w-36 md:w-44 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
              >
                <img
                  src={carrier.logo}
                  alt={`${carrier.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustStrip;
