import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import AdvisorPreview from "@/components/AdvisorPreview";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <AdvisorPreview />
      <Testimonials />
      <FinalCTA />
      <FloatingCTA />
    </div>
  );
};

export default Index;
