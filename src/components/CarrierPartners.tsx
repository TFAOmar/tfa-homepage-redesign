import allianz from "@/assets/carriers/allianz.png";
import fng from "@/assets/carriers/fng.png";
import nationalLife from "@/assets/carriers/national-life.png";
import corebridge from "@/assets/carriers/corebridge.png";
import mutualOfOmaha from "@/assets/carriers/mutual-of-omaha.png";
import foresters from "@/assets/carriers/foresters.png";
import northAmerican from "@/assets/carriers/north-american.png";
import athene from "@/assets/carriers/athene.png";
import midlandNational from "@/assets/carriers/midland-national.png";
import lincoln from "@/assets/carriers/lincoln.png";
import prudential from "@/assets/carriers/prudential.png";
import massmutual from "@/assets/carriers/massmutual.png";
import americanNational from "@/assets/carriers/american-national.png";
import principal from "@/assets/carriers/principal.png";

const carriers = [
  { name: "Allianz", logo: allianz },
  { name: "F&G Annuities & Life", logo: fng },
  { name: "National Life Group", logo: nationalLife },
  { name: "Corebridge Financial", logo: corebridge },
  { name: "Mutual of Omaha", logo: mutualOfOmaha },
  { name: "Foresters Financial", logo: foresters },
  { name: "North American", logo: northAmerican },
  { name: "Athene", logo: athene },
  { name: "Midland National", logo: midlandNational },
  { name: "Lincoln Financial Group", logo: lincoln },
  { name: "Prudential", logo: prudential },
  { name: "MassMutual", logo: massmutual },
  { name: "American National", logo: americanNational },
  { name: "Principal", logo: principal },
];

const CarrierPartners = () => {
  // Duplicate carriers array for seamless infinite loop
  const duplicatedCarriers = [...carriers, ...carriers];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted Insurance Carrier Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We work with leading life insurance and annuity companies to design strategies that fit your family, your career, and your retirement goals.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl overflow-hidden">
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/50 to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="carousel-scroll group/carousel">
              <div className="carousel-track flex gap-16 md:gap-20 items-center">
                {duplicatedCarriers.map((carrier, index) => (
                  <div
                    key={`${carrier.name}-${index}`}
                    className="group relative flex-shrink-0 w-48 sm:w-56 md:w-96 h-28 sm:h-32 md:h-48 flex items-center justify-center transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={carrier.logo}
                      alt={`${carrier.name} logo`}
                      className="max-h-24 sm:max-h-28 md:max-h-44 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                      title={carrier.name}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-scroll {
          overflow: hidden;
          width: 100%;
        }

        .carousel-track {
          animation: scroll 60s linear infinite;
          width: fit-content;
        }

        .carousel-scroll:hover .carousel-track {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .carousel-track {
            animation-duration: 40s;
          }
        }

        @media (max-width: 640px) {
          .carousel-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default CarrierPartners;
