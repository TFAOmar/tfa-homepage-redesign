import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CarrierPartners from "@/components/CarrierPartners";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Advisors from "@/components/Advisors";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Locations from "@/components/Locations";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CarrierPartners />
      <Stats />
      <Services />
      <Process />
      <Advisors />
      <Testimonials />
      <Education />
      <Locations />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
