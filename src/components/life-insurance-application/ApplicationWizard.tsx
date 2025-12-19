import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "./ProgressBar";
import Step1ProposedInsured from "./steps/Step1ProposedInsured";
import Step2ContactEmployment from "./steps/Step2ContactEmployment";
import Step3Ownership from "./steps/Step3Ownership";
import Step4Beneficiaries from "./steps/Step4Beneficiaries";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  STEPS,
  LifeInsuranceApplicationData,
  defaultApplicationData,
} from "@/types/lifeInsuranceApplication";

interface ApplicationWizardProps {
  advisorId?: string;
  advisorName?: string;
  advisorEmail?: string;
}

const ApplicationWizard = ({
  advisorId,
  advisorName,
  advisorEmail,
}: ApplicationWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<LifeInsuranceApplicationData>(defaultApplicationData);

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1 as Step1Data,
    mode: "onChange",
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData.step2 as Step2Data,
    mode: "onChange",
  });

  // Step 3 form
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData.step3 as Step3Data,
    mode: "onChange",
  });

  // Step 4 form
  const step4Form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      beneficiaries: formData.step4?.beneficiaries || [],
    },
    mode: "onChange",
  });

  // Load saved draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("lifeInsuranceApplication");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed.formData || defaultApplicationData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        
        // Reset forms with saved data
        if (parsed.formData?.step1) {
          step1Form.reset(parsed.formData.step1);
        }
        if (parsed.formData?.step2) {
          step2Form.reset(parsed.formData.step2);
        }
        if (parsed.formData?.step3) {
          step3Form.reset(parsed.formData.step3);
        }
        if (parsed.formData?.step4?.beneficiaries) {
          step4Form.reset({ beneficiaries: parsed.formData.step4.beneficiaries });
        }

        toast({
          title: "Draft Restored",
          description: "Your previous progress has been loaded.",
        });
      } catch (error) {
        console.error("Error loading saved draft:", error);
      }
    }
  }, []);

  // Auto-save to localStorage
  const saveDraft = () => {
    const currentFormData = {
      ...formData,
      step1: step1Form.getValues(),
      step2: step2Form.getValues(),
      step3: step3Form.getValues(),
      step4: step4Form.getValues(),
    };
    
    const draft = {
      formData: currentFormData,
      currentStep,
      completedSteps,
      advisorId,
      advisorName,
      advisorEmail,
      lastSaved: new Date().toISOString(),
    };
    
    localStorage.setItem("lifeInsuranceApplication", JSON.stringify(draft));
  };

  // Save on step changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentStep, completedSteps]);

  const handleNext = async () => {
    let isValid = false;

    // Validate current step
    switch (currentStep) {
      case 1:
        isValid = await step1Form.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            step1: step1Form.getValues(),
          }));
        }
        break;
      case 2:
        isValid = await step2Form.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            step2: step2Form.getValues(),
          }));
        }
        break;
      case 3:
        isValid = await step3Form.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            step3: step3Form.getValues(),
          }));
        }
        break;
      case 4:
        isValid = await step4Form.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            step4: step4Form.getValues(),
          }));
        }
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      saveDraft();
    } else {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields before continuing.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    // Save current step data before going back
    switch (currentStep) {
      case 1:
        setFormData((prev) => ({ ...prev, step1: step1Form.getValues() }));
        break;
      case 2:
        setFormData((prev) => ({ ...prev, step2: step2Form.getValues() }));
        break;
      case 3:
        setFormData((prev) => ({ ...prev, step3: step3Form.getValues() }));
        break;
      case 4:
        setFormData((prev) => ({ ...prev, step4: step4Form.getValues() }));
        break;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    saveDraft();
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    saveDraft();
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Draft Saved",
        description: "Your application has been saved. You can return to complete it later.",
      });
    }, 500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ProposedInsured form={step1Form} />;
      case 2:
        return <Step2ContactEmployment form={step2Form} />;
      case 3:
        return <Step3Ownership form={step3Form} />;
      case 4:
        return <Step4Beneficiaries form={step4Form} />;
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <div className="py-12 text-center text-muted-foreground">
            <p className="text-lg">Step {currentStep} is coming soon...</p>
            <p className="text-sm mt-2">This step will be implemented in the next phase.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const currentStepInfo = STEPS[currentStep - 1];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />

      {/* Main Card */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Step {currentStep}: {currentStepInfo?.title}
              </CardTitle>
              <CardDescription className="mt-1">
                Complete all required fields marked with *
              </CardDescription>
            </div>
            {advisorName && (
              <div className="text-right text-sm">
                <p className="text-muted-foreground">Your Advisor</p>
                <p className="font-medium text-foreground">{advisorName}</p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Draft
              </Button>
            </div>

            <Button
              type="button"
              onClick={handleNext}
              disabled={currentStep === STEPS.length}
              className="gap-2"
            >
              {currentStep === STEPS.length ? "Submit Application" : "Continue"}
              {currentStep < STEPS.length && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto-save indicator */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Your progress is automatically saved as you complete each section.
      </p>
    </div>
  );
};

export default ApplicationWizard;
