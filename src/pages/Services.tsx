import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesCTA from "@/components/services/ServicesCTA";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
      <Footer />
    </div>
  );
};

export default Services;
