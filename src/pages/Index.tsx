import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import WhyTrustTFA from "@/components/WhyTrustTFA";
import Services from "@/components/Services";
import Process from "@/components/Process";
import AdvisorPreview from "@/components/AdvisorPreview";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustStrip />
      <Services />
      <WhyTrustTFA />
      <Process />
      <AdvisorPreview />
      <Testimonials />
      <FinalCTA />
    </div>
  );
};

export default Index;
