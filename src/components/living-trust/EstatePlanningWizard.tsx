import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import EstatePlanningProgressBar from "./EstatePlanningProgressBar";
import Step1ClientIdentity from "./steps/Step1ClientIdentity";
import Step2FamilyHeirs from "./steps/Step2FamilyHeirs";
import Step3SuccessorTrustees from "./steps/Step3SuccessorTrustees";
import Step4Beneficiaries from "./steps/Step4Beneficiaries";
import Step5AttorneyInFact from "./steps/Step5AttorneyInFact";
import Step6Healthcare from "./steps/Step6Healthcare";
import Step7Assets from "./steps/Step7Assets";
import Step8ReviewSubmit from "./steps/Step8ReviewSubmit";
import {
  EstatePlanningApplicationData,
  defaultApplicationData,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
  Step8Data,
} from "@/types/estatePlanningApplication";

const STORAGE_KEY = "estate-planning-draft";

interface EstatePlanningWizardProps {
  onComplete?: (data: EstatePlanningApplicationData) => void;
  advisorId?: string;
  advisorName?: string;
  advisorEmail?: string;
}

const EstatePlanningWizard = ({ onComplete, advisorId, advisorName, advisorEmail }: EstatePlanningWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<EstatePlanningApplicationData>(defaultApplicationData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || defaultApplicationData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        toast.info("Draft loaded", { description: "Your previous progress has been restored." });
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
  }, []);

  // Auto-save on step change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          currentStep,
          completedSteps,
          lastSaved: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [formData, currentStep, completedSteps]);

  const handleStepComplete = (step: number, data: unknown) => {
    const stepKey = `step${step}` as keyof EstatePlanningApplicationData;
    
    setFormData((prev) => ({
      ...prev,
      [stepKey]: data,
    }));

    setCompletedSteps((prev) => [...new Set([...prev, step])]);

    if (step < 8) {
      setCurrentStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 8) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (step8Data: Step8Data) => {
    setIsSubmitting(true);
    
    const finalData: EstatePlanningApplicationData = {
      ...formData,
      step8: step8Data,
    };

    const step1 = finalData.step1 || {};

    try {
      const { error } = await supabase.functions.invoke("send-estate-planning-notification", {
        body: {
          applicantName: `${step1.trustor1FirstName || ""} ${step1.trustor1LastName || ""}`.trim(),
          applicantEmail: step1.trustor1Email || "",
          applicantPhone: step1.trustor1Phone || "",
          spouseName: step1.hasTrustor2 
            ? `${step1.trustor2FirstName || ""} ${step1.trustor2LastName || ""}`.trim() 
            : null,
          formData: finalData,
          advisorId: advisorId,
          advisorName: advisorName || "TFA Advisor",
          advisorEmail: advisorEmail || "info@tfainsuranceadvisors.com",
          sourceUrl: window.location.href,
        },
      });

      if (error) {
        throw error;
      }

      // Clear draft on successful submit
      localStorage.removeItem(STORAGE_KEY);
      
      toast.success("Application Submitted!", {
        description: "Your estate planning intake form has been submitted successfully.",
      });

      if (onComplete) {
        onComplete(finalData);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Submission Failed", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ClientIdentity
            data={formData.step1 as Step1Data}
            onNext={(data) => handleStepComplete(1, data)}
          />
        );
      case 2:
        return (
          <Step2FamilyHeirs
            data={formData.step2 as Step2Data}
            onNext={(data) => handleStepComplete(2, data)}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3SuccessorTrustees
            data={formData.step3 as Step3Data}
            onNext={(data) => handleStepComplete(3, data)}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4Beneficiaries
            data={formData.step4 as Step4Data}
            onNext={(data) => handleStepComplete(4, data)}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step5AttorneyInFact
            data={formData.step5 as Step5Data}
            onNext={(data) => handleStepComplete(5, data)}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Step6Healthcare
            data={formData.step6 as Step6Data}
            onNext={(data) => handleStepComplete(6, data)}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <Step7Assets
            data={formData.step7 as Step7Data}
            onNext={(data) => handleStepComplete(7, data)}
            onBack={handleBack}
          />
        );
      case 8:
        return (
          <Step8ReviewSubmit
            data={formData.step8 as Step8Data}
            allData={formData}
            onNext={handleSubmit}
            onBack={handleBack}
            onGoToStep={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <EstatePlanningProgressBar
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      
      <div className="mt-8">
        {renderStep()}
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="mt-4 text-foreground">Submitting your application...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstatePlanningWizard;
