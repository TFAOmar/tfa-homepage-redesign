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
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20 border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted Insurance Carrier Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We work with leading life insurance and annuity companies to design strategies that fit your family, your career, and your retirement goals.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {carriers.map((carrier, index) => (
              <div
                key={carrier.name}
                className="group relative w-full h-20 flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={carrier.logo}
                  alt={`${carrier.name} logo`}
                  className="max-h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  title={carrier.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarrierPartners;
