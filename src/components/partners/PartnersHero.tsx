const PartnersHero = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-navy to-navy/95 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(217,165,63,0.2),transparent)]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          Our Trusted Insurance Carrier Partners
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
          We work with industry-leading life insurance and annuity companies to design strategies that fit your family, your career, and your retirement goals.
        </p>
      </div>
    </section>
  );
};

export default PartnersHero;
