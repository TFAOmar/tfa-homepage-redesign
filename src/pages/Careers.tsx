import { useEffect } from "react";
import CareersHero from "@/components/careers/CareersHero";
import CareerPaths from "@/components/careers/CareerPaths";
import WhyJoinTFA from "@/components/careers/WhyJoinTFA";
import AgentPath from "@/components/careers/AgentPath";
import FranchisePath from "@/components/careers/FranchisePath";
import CareersInquiryForm from "@/components/careers/CareersInquiryForm";
import CareersCTA from "@/components/careers/CareersCTA";

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <CareersHero />
      <CareerPaths />
      <WhyJoinTFA />
      <AgentPath />
      <FranchisePath />
      <CareersInquiryForm />
      <CareersCTA />
    </div>
  );
};

export default Careers;
