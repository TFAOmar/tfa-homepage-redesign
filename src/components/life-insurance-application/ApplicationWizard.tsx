import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Save, Loader2, Send, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProgressBar from "./ProgressBar";
import SaveProgressModal from "./SaveProgressModal";
import ResumeApplicationModal from "./ResumeApplicationModal";
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

// Generate a unique resume token
const generateResumeToken = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

const ApplicationWizard = ({
  advisorId,
  advisorName,
  advisorEmail,
}: ApplicationWizardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LifeInsuranceApplicationData>(defaultApplicationData);
  
  // Server-side draft state
  const [draftId, setDraftId] = useState<string | null>(null);
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  // Modal states
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<{
    formData: LifeInsuranceApplicationData;
    currentStep: number;
    completedSteps: number[];
    lastSaved: string;
    applicantName?: string;
    draftId?: string;
    resumeToken?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: formData.step1 as Step1Data, mode: "onChange" });
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: formData.step2 as Step2Data, mode: "onChange" });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: formData.step3 as Step3Data, mode: "onChange" });
  const step4Form = useForm<Step4Data>({ resolver: zodResolver(step4Schema), defaultValues: { beneficiaries: formData.step4?.beneficiaries || [] }, mode: "onChange" });
  const step5Form = useForm<Step5Data>({ resolver: zodResolver(step5Schema), defaultValues: formData.step5 as Step5Data, mode: "onChange" });
  const step6Form = useForm<Step6Data>({ resolver: zodResolver(step6Schema), defaultValues: formData.step6 as Step6Data, mode: "onChange" });
  const step7Form = useForm<Step7Data>({ resolver: zodResolver(step7Schema), defaultValues: formData.step7 as Step7Data, mode: "onChange" });
  const step8Form = useForm<Step8Data>({ resolver: zodResolver(step8Schema), defaultValues: formData.step8 as Step8Data, mode: "onChange" });
  const step9Form = useForm<Step9Data>({ resolver: zodResolver(step9Schema), defaultValues: { ...formData.step9, signatureDate: new Date().toLocaleDateString("en-US") } as Step9Data, mode: "onChange" });

  // Get current form data
  const getCurrentFormData = useCallback(() => {
    return {
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
  }, [step1Form, step2Form, step3Form, step4Form, step5Form, step6Form, step7Form, step8Form, step9Form]);

  // Reset all forms with data
  const resetFormsWithData = useCallback((data: LifeInsuranceApplicationData) => {
    if (data.step1) step1Form.reset(data.step1);
    if (data.step2) step2Form.reset(data.step2);
    if (data.step3) step3Form.reset(data.step3);
    if (data.step4?.beneficiaries) step4Form.reset({ beneficiaries: data.step4.beneficiaries });
    if (data.step5) step5Form.reset(data.step5);
    if (data.step6) step6Form.reset(data.step6);
    if (data.step7) step7Form.reset(data.step7);
    if (data.step8) step8Form.reset(data.step8);
    if (data.step9) step9Form.reset({ ...data.step9, signatureDate: new Date().toLocaleDateString("en-US") });
  }, [step1Form, step2Form, step3Form, step4Form, step5Form, step6Form, step7Form, step8Form, step9Form]);

  // Save draft to both localStorage and database
  const saveDraftToServer = useCallback(async (showToast = false) => {
    const currentFormData = getCurrentFormData();
    const applicantName = `${currentFormData.step1?.firstName || ""} ${currentFormData.step1?.lastName || ""}`.trim();
    const applicantEmail = currentFormData.step2?.email || null;
    const applicantPhone = currentFormData.step2?.mobilePhone || null;
    
    // Generate resume token if not exists
    const token = resumeToken || generateResumeToken();
    if (!resumeToken) {
      setResumeToken(token);
    }
    
    // Save to localStorage first (quick save)
    const localDraft = {
      formData: currentFormData,
      currentStep,
      completedSteps,
      advisorId,
      advisorName,
      advisorEmail,
      lastSaved: new Date().toISOString(),
      draftId,
      resumeToken: token,
    };
    localStorage.setItem("lifeInsuranceApplication", JSON.stringify(localDraft));
    
    try {
      if (draftId) {
        // Update existing draft
        const { error } = await supabase
          .from("life_insurance_applications")
          .update({
            form_data: currentFormData,
            current_step: currentStep,
            applicant_name: applicantName || null,
            applicant_email: applicantEmail,
            applicant_phone: applicantPhone,
            updated_at: new Date().toISOString(),
          })
          .eq("id", draftId);
        
        if (error) throw error;
      } else {
        // Create new draft
        const { data, error } = await supabase
          .from("life_insurance_applications")
          .insert({
            form_data: currentFormData,
            current_step: currentStep,
            status: "draft",
            advisor_id: advisorId || null,
            advisor_name: advisorName || null,
            advisor_email: advisorEmail || null,
            applicant_name: applicantName || null,
            applicant_email: applicantEmail,
            applicant_phone: applicantPhone,
            resume_token: token,
          })
          .select("id")
          .single();
        
        if (error) throw error;
        
        if (data) {
          setDraftId(data.id);
          // Update localStorage with new draftId
          localDraft.draftId = data.id;
          localStorage.setItem("lifeInsuranceApplication", JSON.stringify(localDraft));
        }
      }
      
      setLastSaved(new Date().toISOString());
      
      if (showToast) {
        toast({
          title: "Draft Saved",
          description: "Your application has been saved. You can return to complete it later.",
        });
      }
    } catch (error) {
      console.error("Error saving draft to server:", error);
      // Still saved to localStorage, so don't show error
    }
  }, [getCurrentFormData, currentStep, completedSteps, advisorId, advisorName, advisorEmail, draftId, resumeToken, toast]);

  // Check for resume token in URL
  useEffect(() => {
    const checkForResume = async () => {
      const resumeParam = searchParams.get("resume");
      
      if (resumeParam) {
        // Try to load from database using resume token
        try {
          const { data, error } = await supabase
            .from("life_insurance_applications")
            .select("*")
            .eq("resume_token", resumeParam)
            .eq("status", "draft")
            .single();
          
          if (data && !error) {
            const formDataFromDb = data.form_data as unknown as LifeInsuranceApplicationData;
            setFormData(formDataFromDb);
            setCurrentStep(data.current_step);
            setDraftId(data.id);
            setResumeToken(data.resume_token);
            setLastSaved(data.updated_at);
            resetFormsWithData(formDataFromDb);
            
            // Clear the URL param
            setSearchParams({});
            
            toast({
              title: "Application Restored",
              description: "Your saved application has been loaded.",
            });
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error loading from resume token:", error);
        }
      }
      
      // Check localStorage for saved draft
      const savedDraft = localStorage.getItem("lifeInsuranceApplication");
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          const applicantName = `${parsed.formData?.step1?.firstName || ""} ${parsed.formData?.step1?.lastName || ""}`.trim();
          
          setPendingDraft({
            formData: parsed.formData || defaultApplicationData,
            currentStep: parsed.currentStep || 1,
            completedSteps: parsed.completedSteps || [],
            lastSaved: parsed.lastSaved,
            applicantName: applicantName || undefined,
            draftId: parsed.draftId,
            resumeToken: parsed.resumeToken,
          });
          setShowResumeModal(true);
        } catch (error) {
          console.error("Error loading saved draft:", error);
        }
      }
      
      setIsLoading(false);
    };
    
    checkForResume();
  }, []);

  // Handle resume from pending draft
  const handleResumeDraft = () => {
    if (pendingDraft) {
      setFormData(pendingDraft.formData);
      setCurrentStep(pendingDraft.currentStep);
      setCompletedSteps(pendingDraft.completedSteps);
      setDraftId(pendingDraft.draftId || null);
      setResumeToken(pendingDraft.resumeToken || null);
      setLastSaved(pendingDraft.lastSaved);
      resetFormsWithData(pendingDraft.formData);
      
      toast({
        title: "Draft Restored",
        description: "Your previous progress has been loaded.",
      });
    }
    setShowResumeModal(false);
    setPendingDraft(null);
  };

  // Handle start fresh
  const handleStartFresh = () => {
    localStorage.removeItem("lifeInsuranceApplication");
    setFormData(defaultApplicationData);
    setCurrentStep(1);
    setCompletedSteps([]);
    setDraftId(null);
    setResumeToken(null);
    setLastSaved(null);
    resetFormsWithData(defaultApplicationData);
    setShowResumeModal(false);
    setPendingDraft(null);
  };

  // Auto-save every step change
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => saveDraftToServer(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentStep, completedSteps, isLoading]);

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
    } else {
      toast({ title: "Validation Error", description: "Please complete all required fields before continuing.", variant: "destructive" });
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    try {
      const finalFormData = getCurrentFormData();
      const applicantName = `${finalFormData.step1?.firstName || ""} ${finalFormData.step1?.lastName || ""}`.trim();
      const applicantEmail = finalFormData.step2?.email || null;
      const applicantPhone = finalFormData.step2?.mobilePhone || null;

      if (draftId) {
        // Update existing draft to submitted
        const { error } = await supabase
          .from("life_insurance_applications")
          .update({
            form_data: finalFormData,
            current_step: 9,
            status: "submitted",
            applicant_name: applicantName,
            applicant_email: applicantEmail,
            applicant_phone: applicantPhone,
            updated_at: new Date().toISOString(),
          })
          .eq("id", draftId);

        if (error) throw error;

        // Send email notifications
        try {
          console.log("Sending life insurance notification emails...");
          const { error: emailError } = await supabase.functions.invoke(
            "send-life-insurance-notification",
            {
              body: {
                applicationId: draftId,
                applicantName,
                applicantEmail,
                applicantPhone,
                advisorName: advisorName || null,
                advisorEmail: advisorEmail || null,
                formData: finalFormData,
              },
            }
          );

          if (emailError) {
            console.error("Failed to send notification emails:", emailError);
          } else {
            console.log("Notification emails sent successfully");
          }
        } catch (emailError) {
          console.error("Error invoking email function:", emailError);
        }
      } else {
        // Insert new submission
        const { data: insertedData, error } = await supabase
          .from("life_insurance_applications")
          .insert({
            form_data: finalFormData,
            current_step: 9,
            status: "submitted",
            advisor_id: advisorId || null,
            advisor_name: advisorName || null,
            advisor_email: advisorEmail || null,
            applicant_name: applicantName,
            applicant_email: applicantEmail,
            applicant_phone: applicantPhone,
          })
          .select("id")
          .single();

        if (error) throw error;

        // Send email notifications via edge function
        if (insertedData?.id) {
          try {
            console.log("Sending life insurance notification emails...");
            const { error: emailError } = await supabase.functions.invoke(
              "send-life-insurance-notification",
              {
                body: {
                  applicationId: insertedData.id,
                  applicantName,
                  applicantEmail,
                  applicantPhone,
                  advisorName: advisorName || null,
                  advisorEmail: advisorEmail || null,
                  formData: finalFormData,
                },
              }
            );

            if (emailError) {
              console.error("Failed to send notification emails:", emailError);
            } else {
              console.log("Notification emails sent successfully");
            }
          } catch (emailError) {
            console.error("Error invoking email function:", emailError);
          }
        }
      }

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
  };

  const handleEditStep = (stepNumber: number) => {
    // Save current step 9 data before navigating
    setFormData((prev) => ({ ...prev, step9: step9Form.getValues() }));
    setCurrentStep(stepNumber);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await saveDraftToServer(true);
    setIsSaving(false);
  };

  const handleSaveAndExit = async () => {
    setIsSaving(true);
    await saveDraftToServer(false);
    setIsSaving(false);
    setShowSaveModal(true);
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
  const currentEmail = step2Form.getValues()?.email;

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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

              <Button
                type="button"
                variant="ghost"
                onClick={handleSaveAndExit}
                disabled={isSaving}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                Save & Exit
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
        {lastSaved 
          ? `Last saved ${new Date(lastSaved).toLocaleTimeString()}`
          : "Your progress is automatically saved as you complete each section."
        }
      </p>

      {/* Save Progress Modal */}
      <SaveProgressModal
        open={showSaveModal}
        onOpenChange={setShowSaveModal}
        draftId={draftId}
        resumeToken={resumeToken}
        currentEmail={currentEmail}
      />

      {/* Resume Application Modal */}
      <ResumeApplicationModal
        open={showResumeModal}
        onOpenChange={setShowResumeModal}
        onResume={handleResumeDraft}
        onStartFresh={handleStartFresh}
        lastSaved={pendingDraft?.lastSaved}
        applicantName={pendingDraft?.applicantName}
        currentStep={pendingDraft?.currentStep}
      />
    </div>
  );
};

export default ApplicationWizard;
