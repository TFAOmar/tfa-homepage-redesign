import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Save, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProgressBar from "./ProgressBar";
import Step1ProposedInsured from "./steps/Step1ProposedInsured";
import Step2ContactEmployment from "./steps/Step2ContactEmployment";
import Step3Ownership from "./steps/Step3Ownership";
import Step4Beneficiaries from "./steps/Step4Beneficiaries";
import Step5PolicyRiders from "./steps/Step5PolicyRiders";
import Step6ExistingCoverage from "./steps/Step6ExistingCoverage";
import Step7MedicalLifestyle from "./steps/Step7MedicalLifestyle";
import Step8PremiumPayment from "./steps/Step8PremiumPayment";
import Step9ReviewSubmit from "./steps/Step9ReviewSubmit";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
  step9Schema,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
  Step8Data,
  Step9Data,
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LifeInsuranceApplicationData>(defaultApplicationData);

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: formData.step1 as Step1Data, mode: "onChange" });
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: formData.step2 as Step2Data, mode: "onChange" });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: formData.step3 as Step3Data, mode: "onChange" });
  const step4Form = useForm<Step4Data>({ resolver: zodResolver(step4Schema), defaultValues: { beneficiaries: formData.step4?.beneficiaries || [] }, mode: "onChange" });
  const step5Form = useForm<Step5Data>({ resolver: zodResolver(step5Schema), defaultValues: formData.step5 as Step5Data, mode: "onChange" });
  const step6Form = useForm<Step6Data>({ resolver: zodResolver(step6Schema), defaultValues: formData.step6 as Step6Data, mode: "onChange" });
  const step7Form = useForm<Step7Data>({ resolver: zodResolver(step7Schema), defaultValues: formData.step7 as Step7Data, mode: "onChange" });
  const step8Form = useForm<Step8Data>({ resolver: zodResolver(step8Schema), defaultValues: formData.step8 as Step8Data, mode: "onChange" });
  const step9Form = useForm<Step9Data>({ resolver: zodResolver(step9Schema), defaultValues: { ...formData.step9, signatureDate: new Date().toLocaleDateString("en-US") } as Step9Data, mode: "onChange" });

  useEffect(() => {
    const savedDraft = localStorage.getItem("lifeInsuranceApplication");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed.formData || defaultApplicationData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        if (parsed.formData?.step1) step1Form.reset(parsed.formData.step1);
        if (parsed.formData?.step2) step2Form.reset(parsed.formData.step2);
        if (parsed.formData?.step3) step3Form.reset(parsed.formData.step3);
        if (parsed.formData?.step4?.beneficiaries) step4Form.reset({ beneficiaries: parsed.formData.step4.beneficiaries });
        if (parsed.formData?.step5) step5Form.reset(parsed.formData.step5);
        if (parsed.formData?.step6) step6Form.reset(parsed.formData.step6);
        if (parsed.formData?.step7) step7Form.reset(parsed.formData.step7);
        if (parsed.formData?.step8) step8Form.reset(parsed.formData.step8);
        if (parsed.formData?.step9) step9Form.reset({ ...parsed.formData.step9, signatureDate: new Date().toLocaleDateString("en-US") });
        toast({ title: "Draft Restored", description: "Your previous progress has been loaded." });
      } catch (error) {
        console.error("Error loading saved draft:", error);
      }
    }
  }, []);

  const saveDraft = () => {
    const currentFormData = {
      ...formData,
      step1: step1Form.getValues(),
      step2: step2Form.getValues(),
      step3: step3Form.getValues(),
      step4: step4Form.getValues(),
      step5: step5Form.getValues(),
      step6: step6Form.getValues(),
      step7: step7Form.getValues(),
      step8: step8Form.getValues(),
      step9: step9Form.getValues(),
    };
    const draft = { formData: currentFormData, currentStep, completedSteps, advisorId, advisorName, advisorEmail, lastSaved: new Date().toISOString() };
    localStorage.setItem("lifeInsuranceApplication", JSON.stringify(draft));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => saveDraft(), 1000);
    return () => clearTimeout(timeoutId);
  }, [currentStep, completedSteps]);

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await step1Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step1: step1Form.getValues() }));
        break;
      case 2:
        isValid = await step2Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step2: step2Form.getValues() }));
        break;
      case 3:
        isValid = await step3Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step3: step3Form.getValues() }));
        break;
      case 4:
        isValid = await step4Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step4: step4Form.getValues() }));
        break;
      case 5:
        isValid = await step5Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step5: step5Form.getValues() }));
        break;
      case 6:
        isValid = await step6Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step6: step6Form.getValues() }));
        break;
      case 7:
        isValid = await step7Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step7: step7Form.getValues() }));
        break;
      case 8:
        isValid = await step8Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step8: step8Form.getValues() }));
        break;
      case 9:
        isValid = await step9Form.trigger();
        if (isValid) setFormData((prev) => ({ ...prev, step9: step9Form.getValues() }));
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      if (!completedSteps.includes(currentStep)) setCompletedSteps((prev) => [...prev, currentStep]);
      
      // If on step 9 and valid, submit the application
      if (currentStep === 9) {
        await handleSubmitApplication();
        return;
      }
      
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      saveDraft();
    } else {
      toast({ title: "Validation Error", description: "Please complete all required fields before continuing.", variant: "destructive" });
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    try {
      const finalFormData = {
        step1: step1Form.getValues(),
        step2: step2Form.getValues(),
        step3: step3Form.getValues(),
        step4: step4Form.getValues(),
        step5: step5Form.getValues(),
        step6: step6Form.getValues(),
        step7: step7Form.getValues(),
        step8: step8Form.getValues(),
        step9: step9Form.getValues(),
      };

      const { error } = await supabase.from("life_insurance_applications").insert({
        form_data: finalFormData,
        current_step: 9,
        status: "submitted",
        advisor_id: advisorId || null,
        advisor_name: advisorName || null,
        advisor_email: advisorEmail || null,
        applicant_name: `${finalFormData.step1?.firstName || ""} ${finalFormData.step1?.lastName || ""}`.trim(),
        applicant_email: finalFormData.step2?.email || null,
        applicant_phone: finalFormData.step2?.mobilePhone || null,
      });

      if (error) throw error;

      // Clear the draft from localStorage
      localStorage.removeItem("lifeInsuranceApplication");

      toast({
        title: "Application Submitted!",
        description: "Your life insurance application has been submitted successfully. We'll be in touch soon.",
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 1: setFormData((prev) => ({ ...prev, step1: step1Form.getValues() })); break;
      case 2: setFormData((prev) => ({ ...prev, step2: step2Form.getValues() })); break;
      case 3: setFormData((prev) => ({ ...prev, step3: step3Form.getValues() })); break;
      case 4: setFormData((prev) => ({ ...prev, step4: step4Form.getValues() })); break;
      case 5: setFormData((prev) => ({ ...prev, step5: step5Form.getValues() })); break;
      case 6: setFormData((prev) => ({ ...prev, step6: step6Form.getValues() })); break;
      case 7: setFormData((prev) => ({ ...prev, step7: step7Form.getValues() })); break;
      case 8: setFormData((prev) => ({ ...prev, step8: step8Form.getValues() })); break;
      case 9: setFormData((prev) => ({ ...prev, step9: step9Form.getValues() })); break;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    saveDraft();
  };

  const handleEditStep = (stepNumber: number) => {
    // Save current step 9 data before navigating
    setFormData((prev) => ({ ...prev, step9: step9Form.getValues() }));
    setCurrentStep(stepNumber);
    saveDraft();
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    saveDraft();
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Draft Saved", description: "Your application has been saved. You can return to complete it later." });
    }, 500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1ProposedInsured form={step1Form} />;
      case 2: return <Step2ContactEmployment form={step2Form} />;
      case 3: return <Step3Ownership form={step3Form} />;
      case 4: return <Step4Beneficiaries form={step4Form} />;
      case 5: return <Step5PolicyRiders form={step5Form} />;
      case 6: return <Step6ExistingCoverage form={step6Form} />;
      case 7: return <Step7MedicalLifestyle form={step7Form} />;
      case 8: return <Step8PremiumPayment form={step8Form} />;
      case 9: return <Step9ReviewSubmit form={step9Form} formData={formData} onEditStep={handleEditStep} completedSteps={completedSteps} />;
      default: return null;
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
                {currentStep === 9 
                  ? "Review all information carefully before submitting"
                  : "Complete all required fields marked with *"
                }
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
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : currentStep === STEPS.length ? (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
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
