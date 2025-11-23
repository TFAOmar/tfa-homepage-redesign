import aboutHero from "@/assets/about-hero.jpg";

const AboutHero = () => {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={aboutHero}
          alt="The Financial Architects team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
            Who We Are
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
            Building lasting relationships through trusted financial guidance, one family at a time.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default AboutHero;
