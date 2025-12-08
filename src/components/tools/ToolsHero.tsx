import { Calculator } from "lucide-react";

const ToolsHero = () => {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-navy/90">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent/20 text-accent mb-6">
            <Calculator className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Financial Tools & Calculators
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
            Plan, project, and better understand your financial future with our easy-to-use calculators built for families and individuals.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default ToolsHero;
