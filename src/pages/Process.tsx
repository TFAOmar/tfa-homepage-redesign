import ProcessHero from "@/components/process/ProcessHero";
import ProcessSteps from "@/components/process/ProcessSteps";
import ProcessCTA from "@/components/process/ProcessCTA";
import { useEffect } from "react";

const Process = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ProcessHero />
      <ProcessSteps />
      <ProcessCTA />
    </div>
  );
};

export default Process;
