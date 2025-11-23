import servicesHero from "@/assets/services-hero.jpg";

const ServicesHero = () => {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={servicesHero}
          alt="Financial planning services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/75" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
            Comprehensive financial solutions designed to protect your wealth, grow your assets, and secure your family's future.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default ServicesHero;
