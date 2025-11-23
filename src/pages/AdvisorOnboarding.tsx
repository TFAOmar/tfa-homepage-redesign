import OnboardingForm from "@/components/advisors/OnboardingForm";
import { useEffect } from "react";

const AdvisorOnboarding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <OnboardingForm />;
};

export default AdvisorOnboarding;
