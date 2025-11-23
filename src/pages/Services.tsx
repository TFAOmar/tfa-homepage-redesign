import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesCTA from "@/components/services/ServicesCTA";

const Services = () => {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </div>
  );
};

export default Services;
