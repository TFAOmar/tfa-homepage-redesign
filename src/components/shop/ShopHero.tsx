import heroImage from "@/assets/shop-hero.jpg";

const ShopHero = () => {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/90" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in">
          TFA Merchandise
        </h1>
        <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
          Premium branded apparel and accessories for financial professionals
        </p>
      </div>
    </section>
  );
};

export default ShopHero;
