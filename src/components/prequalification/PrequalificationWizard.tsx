import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PrequalificationProgressBar from "./PrequalificationProgressBar";
import Step1PersonalInfo from "./steps/Step1PersonalInfo";
import Step2HealthLifestyle from "./steps/Step2HealthLifestyle";
import Step3CoverageNeeds from "./steps/Step3CoverageNeeds";
import Step4ReviewSubmit from "./steps/Step4ReviewSubmit";
import {
  PrequalificationApplicationData,
  defaultPrequalificationData,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
} from "@/types/prequalificationApplication";

const STORAGE_KEY = "prequalification-draft";

interface PrequalificationWizardProps {
  onComplete?: (data: PrequalificationApplicationData) => void;
  advisorId?: string;
  advisorName?: string;
  advisorEmail?: string;
}

const PrequalificationWizard = ({ onComplete, advisorId, advisorName, advisorEmail }: PrequalificationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<PrequalificationApplicationData>(defaultPrequalificationData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || defaultPrequalificationData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        toast.info("Draft loaded", { description: "Your previous progress has been restored." });
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
  }, []);

  // Auto-save on changes
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
    const stepKey = `step${step}` as keyof PrequalificationApplicationData;
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    setCompletedSteps((prev) => [...new Set([...prev, step])]);

    if (step < 4) {
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
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (step4Data: Step4Data) => {
    setIsSubmitting(true);

    const finalData: PrequalificationApplicationData = {
      ...formData,
      step4: step4Data,
    };

    const step1 = finalData.step1 as Step1Data;
    const applicantName = `${step1.firstName || ""} ${step1.lastName || ""}`.trim();
    const applicantEmail = step1.email || "";
    const applicantPhone = step1.phone || "";

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("prequalification_applications" as never)
        .insert({
          status: "submitted",
          advisor_id: advisorId,
          advisor_name: advisorName || "TFA Advisor",
          advisor_email: advisorEmail || "info@tfainsuranceadvisors.com",
          applicant_name: applicantName,
          applicant_email: applicantEmail,
          applicant_phone: applicantPhone,
          form_data: finalData,
          current_step: 4,
          source_url: window.location.href,
          submitted_at: new Date().toISOString(),
        } as never);

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(`Failed to save: ${dbError.message}`);
      }

      // Send notification email
      const notifyPromise = supabase.functions.invoke("send-prequalification-notification", {
        body: {
          applicantName,
          applicantEmail,
          applicantPhone,
          formData: finalData,
          advisorId,
          advisorName: advisorName || "TFA Advisor",
          advisorEmail: advisorEmail || "info@tfainsuranceadvisors.com",
          sourceUrl: window.location.href,
        },
      });

      // Race with timeout
      await Promise.race([
        notifyPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Notification timeout")), 15000)),
      ]).catch((err) => {
        console.warn("Notification send warning (non-blocking):", err);
      });

      localStorage.removeItem(STORAGE_KEY);

      toast.success("Pre-Qualification Submitted!", {
        description: "Your advisor will review your information and reach out soon.",
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
        return <Step1PersonalInfo data={formData.step1} onNext={(data) => handleStepComplete(1, data)} />;
      case 2:
        return <Step2HealthLifestyle data={formData.step2} onNext={(data) => handleStepComplete(2, data)} onBack={handleBack} />;
      case 3:
        return <Step3CoverageNeeds data={formData.step3} onNext={(data) => handleStepComplete(3, data)} onBack={handleBack} />;
      case 4:
        return <Step4ReviewSubmit data={formData.step4} allData={formData} onNext={handleSubmit} onBack={handleBack} onGoToStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <PrequalificationProgressBar currentStep={currentStep} completedSteps={completedSteps} />
      <div className="mt-8">{renderStep()}</div>
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="mt-4 text-foreground">Submitting your pre-qualification...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrequalificationWizard;
