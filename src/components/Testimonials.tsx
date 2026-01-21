import { useEffect } from "react";

const Testimonials = () => {
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    const existingScript = document.querySelector(
      'script[src*="trustindex.io"]'
    );
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.trustindex.io/loader.js?58410d862849832fdb76669e5ee";
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-20 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real families, real peace of mind
          </p>
        </div>

        {/* Trustindex widget container */}
        <div className="max-w-6xl mx-auto">
          <div 
            className="src-trustindex-io" 
            data-widget-id="58410d862849832fdb76669e5ee"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
