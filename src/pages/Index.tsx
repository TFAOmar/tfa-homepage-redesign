import Hero from "@/components/Hero";
import CarrierPartners from "@/components/CarrierPartners";
import CredibilityBadges from "@/components/CredibilityBadges";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Advisors from "@/components/Advisors";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Locations from "@/components/Locations";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CarrierPartners />
      <CredibilityBadges />
      <Stats />
      <Services />
      <Process />
      <Advisors />
      <Testimonials />
      <Education />
      <Locations />
      <FinalCTA />
    </div>
  );
};

export default Index;
