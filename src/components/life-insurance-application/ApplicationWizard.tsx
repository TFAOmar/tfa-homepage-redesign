import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "./ProgressBar";
import Step1ProposedInsured from "./steps/Step1ProposedInsured";
import {
  step1Schema,
  Step1Data,
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

  // Load saved draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("lifeInsuranceApplication");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed.formData || defaultApplicationData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        
        // Reset form with saved data
        if (parsed.formData?.step1) {
          step1Form.reset(parsed.formData.step1);
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
      // Future steps will be added here
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
    if (currentStep === 1) {
      setFormData((prev) => ({
        ...prev,
        step1: step1Form.getValues(),
      }));
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
      case 3:
      case 4:
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
