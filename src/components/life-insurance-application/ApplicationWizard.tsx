import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Save, Loader2, Send, LogOut, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useConfetti } from "@/hooks/useConfetti";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
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
}

// Generate a cryptographically secure resume token
const generateResumeToken = () => {
  const array = new Uint8Array(32); // 256 bits of entropy
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Error categorization and user-friendly messages
type SubmissionStage = 'save' | 'submit' | 'email';

interface SubmissionErrorDetails {
  title: string;
  description: string;
  canRetry: boolean;
}

const getErrorDetails = (error: unknown, stage: SubmissionStage): SubmissionErrorDetails => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Network/connection errors
  if (errorMessage.toLowerCase().includes('network') || 
      errorMessage.toLowerCase().includes('fetch') ||
      errorMessage.toLowerCase().includes('failed to fetch') ||
      errorMessage.toLowerCase().includes('connection')) {
    return {
      title: "Connection Problem",
      description: "Unable to connect to our servers. Please check your internet connection and try again.",
      canRetry: true,
    };
  }
  
  // RLS/Permission errors
  if (errorMessage.includes('row-level security') || 
      errorMessage.includes('policy') ||
      errorMessage.includes('permission denied')) {
    return {
      title: "Session Issue",
      description: "There was a problem with your session. Please try again, or refresh the page if the issue persists.",
      canRetry: true,
    };
  }
  
  // Application not found (token mismatch)
  if (errorMessage.includes('not found') || errorMessage.includes('already submitted')) {
    return {
      title: "Application Issue",
      description: "This application may have already been submitted or the session has expired. Please start a new application if needed.",
      canRetry: false,
    };
  }

  // Timeout errors
  if (errorMessage.toLowerCase().includes('timeout') || errorMessage.toLowerCase().includes('timed out')) {
    return {
      title: "Request Timeout",
      description: "The server took too long to respond. Please try again.",
      canRetry: true,
    };
  }
  
  // Stage-specific fallbacks
  const stageMessages: Record<SubmissionStage, { title: string; description: string }> = {
    save: {
      title: "Unable to Save Application",
      description: "We couldn't save your application data. Your information is safe locally - please try again.",
    },
    submit: {
      title: "Submission Failed",
      description: "We couldn't complete your submission. Your data has been saved - please try again in a moment.",
    },
    email: {
      title: "Notification Issue",
      description: "Your application was submitted but we couldn't send the confirmation email. Don't worry - we still received your application!",
    },
  };
  
  return { ...stageMessages[stage], canRetry: true };
};

const ApplicationWizard = ({
  advisorId,
  advisorName,
}: ApplicationWizardProps) => {
  const { toast } = useToast();
  const { fireConfetti } = useConfetti();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LifeInsuranceApplicationData>(defaultApplicationData);
  const [hasValidationErrors, setHasValidationErrors] = useState(false);
  
  // Submission error state for retry functionality
  const [submissionError, setSubmissionError] = useState<{
    stage: SubmissionStage;
    details: SubmissionErrorDetails;
  } | null>(null);
  
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

  // Get current form data - merges saved formData with current step values
  const getCurrentFormData = useCallback((): LifeInsuranceApplicationData => {
    const stepForms = [step1Form, step2Form, step3Form, step4Form, step5Form, step6Form, step7Form, step8Form, step9Form];
    
    // Start with saved form data
    const result: LifeInsuranceApplicationData = { ...formData };
    
    // Update data for completed steps and current step with form values
    const stepsToInclude = [...new Set([...completedSteps, currentStep])];
    
    stepsToInclude.forEach(step => {
      const stepKey = `step${step}` as keyof LifeInsuranceApplicationData;
      result[stepKey] = stepForms[step - 1].getValues();
    });
    
    return result;
  }, [formData, completedSteps, currentStep, step1Form, step2Form, step3Form, step4Form, step5Form, step6Form, step7Form, step8Form, step9Form]);

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
  // overrideFormData allows passing form data directly to avoid race conditions with state updates
  const saveDraftToServer = useCallback(
    async (showToast = false, overrideFormData?: LifeInsuranceApplicationData) => {
      const currentFormData = overrideFormData || getCurrentFormData();
      const applicantName = `${currentFormData.step1?.firstName || ""} ${currentFormData.step1?.lastName || ""}`.trim();
      const applicantEmail = currentFormData.step2?.email || null;
      const applicantPhone = currentFormData.step2?.mobilePhone || null;

      // Get (and persist) a stable resume token (avoid token drift between stages)
      const token = (() => {
        if (resumeToken) return resumeToken;

        const saved = localStorage.getItem("lifeInsuranceApplication");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed?.resumeToken) return String(parsed.resumeToken);
          } catch {
            // ignore
          }
        }

        return generateResumeToken();
      })();

      if (!resumeToken) {
        setResumeToken(token);
      }

      // Save only non-sensitive metadata to localStorage (no PII)
      const localDraft = {
        currentStep,
        completedSteps,
        advisorId,
        advisorName,
        lastSaved: new Date().toISOString(),
        draftId,
        resumeToken: token,
      };
      localStorage.setItem("lifeInsuranceApplication", JSON.stringify(localDraft));

      try {
        if (draftId) {
          // Update existing draft using secure RPC function (token-based)
          const { error } = await supabase.rpc("update_draft_application_by_token", {
            p_resume_token: token,
            p_form_data: currentFormData as unknown as Json,
            p_current_step: currentStep,
            p_applicant_name: applicantName || null,
            p_applicant_email: applicantEmail,
            p_applicant_phone: applicantPhone,
          });

          if (error) throw error;
        } else {
          // Create new draft (insert only; avoid SELECT under RLS)
          const newId = crypto.randomUUID();

          const { error } = await supabase
            .from("life_insurance_applications")
            .insert({
              id: newId,
              form_data: currentFormData as unknown as Json,
              current_step: currentStep,
              status: "draft",
              advisor_id: advisorId || null,
              advisor_name: advisorName || null,
              applicant_name: applicantName || null,
              applicant_email: applicantEmail,
              applicant_phone: applicantPhone,
              resume_token: token,
            });

          if (error) throw error;

          setDraftId(newId);

          // Update localStorage with new draftId
          localDraft.draftId = newId;
          localStorage.setItem("lifeInsuranceApplication", JSON.stringify(localDraft));
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
    },
    [
      getCurrentFormData,
      currentStep,
      completedSteps,
      advisorId,
      advisorName,
      draftId,
      resumeToken,
      toast,
    ]
  );

  // Check for resume token in URL
  useEffect(() => {
    const checkForResume = async () => {
      const resumeParam = searchParams.get("resume");
      
      if (resumeParam) {
        // Try to load from database using secure RPC function (token-based)
        try {
          const { data, error } = await supabase.rpc("get_draft_application_by_token", {
            p_resume_token: resumeParam,
          });
          
          // RPC returns array, get first item
          const draft = Array.isArray(data) ? data[0] : data;
          
          if (draft && !error) {
            const formDataFromDb = draft.form_data as unknown as LifeInsuranceApplicationData;
            setFormData(formDataFromDb);
            setCurrentStep(draft.current_step);
            setDraftId(draft.id);
            setResumeToken(draft.resume_token);
            setLastSaved(draft.updated_at);
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
      
      // Check localStorage for saved draft metadata (no PII stored)
      const savedDraft = localStorage.getItem("lifeInsuranceApplication");
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          
          // If we have a resumeToken, load the full form data from the database using secure RPC
          if (parsed.resumeToken) {
            const { data: rpcResult, error: dbError } = await supabase.rpc("get_draft_application_by_token", {
              p_resume_token: parsed.resumeToken,
            });
            
            // RPC returns array, get first item
            const dbDraft = Array.isArray(rpcResult) ? rpcResult[0] : rpcResult;
            
            if (dbDraft && !dbError) {
              const formDataFromDb = dbDraft.form_data as unknown as LifeInsuranceApplicationData;
              const applicantName = `${formDataFromDb?.step1?.firstName || ""} ${formDataFromDb?.step1?.lastName || ""}`.trim();
              
              setPendingDraft({
                formData: formDataFromDb,
                currentStep: dbDraft.current_step,
                completedSteps: parsed.completedSteps || [],
                lastSaved: dbDraft.updated_at,
                applicantName: applicantName || undefined,
                draftId: dbDraft.id,
                resumeToken: dbDraft.resume_token,
              });
              setShowResumeModal(true);
            } else {
              // Database record not found, clear invalid localStorage
              localStorage.removeItem("lifeInsuranceApplication");
            }
          } else {
            // No draftId means this is a very early draft, just show resume modal with current step
            setPendingDraft({
              formData: defaultApplicationData,
              currentStep: parsed.currentStep || 1,
              completedSteps: parsed.completedSteps || [],
              lastSaved: parsed.lastSaved,
              applicantName: undefined,
              draftId: undefined,
              resumeToken: parsed.resumeToken,
            });
            setShowResumeModal(true);
          }
        } catch (error) {
          console.error("Error loading saved draft:", error);
          localStorage.removeItem("lifeInsuranceApplication");
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

  // Auto-save every step change (skip when submitting to prevent race conditions)
  useEffect(() => {
    if (!isLoading && !isSubmitting) {
      const timeoutId = setTimeout(() => saveDraftToServer(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentStep, completedSteps, isLoading, isSubmitting]);

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
      setHasValidationErrors(false);
      
      // Get the current step's data
      const stepForms = [step1Form, step2Form, step3Form, step4Form, step5Form, step6Form, step7Form, step8Form, step9Form];
      const currentStepData = stepForms[currentStep - 1].getValues();
      const stepKey = `step${currentStep}` as keyof LifeInsuranceApplicationData;
      
      // Build updated form data with the current step's values
      const updatedFormData: LifeInsuranceApplicationData = {
        ...formData,
        [stepKey]: currentStepData,
      };
      
      // Update formData state
      setFormData(updatedFormData);
      
      // Update completed steps
      const newCompletedSteps = completedSteps.includes(currentStep) 
        ? completedSteps 
        : [...completedSteps, currentStep];
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(newCompletedSteps);
      }
      
      // If on step 9 and valid, submit the application
      if (currentStep === 9) {
        await handleSubmitApplication();
        return;
      }
      
      // Save to server with the updated data directly (avoids race condition with setState)
      await saveDraftToServer(false, updatedFormData);
      
      // Show success toast for step completion
      toast({
        title: `Step ${currentStep} Complete ✓`,
        description: `${STEPS[currentStep - 1]?.title} saved successfully.`,
        className: "bg-success/10 border-success text-success-foreground dark:bg-success/20",
      });
      
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    } else {
      setHasValidationErrors(true);
      toast({ 
        title: "Validation Error", 
        description: "Please complete all required fields before continuing.", 
        variant: "destructive",
        className: "animate-shake motion-reduce:animate-none",
      });
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    const finalFormData = getCurrentFormData();
    const applicantName = `${finalFormData.step1?.firstName || ""} ${finalFormData.step1?.lastName || ""}`.trim();
    const applicantEmail = finalFormData.step2?.email || null;
    const applicantPhone = finalFormData.step2?.mobilePhone || null;

    console.log("Starting submission, draftId:", draftId);

    // Ensure we have a draftId before submission
    let applicationId = draftId;

    // Use a stable token for the entire submission attempt (avoid state timing issues)
    const token = (() => {
      if (resumeToken) return resumeToken;

      const saved = localStorage.getItem("lifeInsuranceApplication");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed?.resumeToken) return String(parsed.resumeToken);
        } catch {
          // ignore
        }
      }

      return generateResumeToken();
    })();

    if (!resumeToken) {
      setResumeToken(token);
    }
    
    // Stage 1: Create draft if needed
    if (!applicationId) {
      try {
        console.log("No draftId found, creating draft first...");

        const newId = crypto.randomUUID();

        const { error: createError } = await supabase
          .from("life_insurance_applications")
          .insert({
            id: newId,
            form_data: finalFormData as unknown as Json,
            current_step: 9,
            status: "draft",
            advisor_id: advisorId || null,
            advisor_name: advisorName || null,
            applicant_name: applicantName || null,
            applicant_email: applicantEmail,
            applicant_phone: applicantPhone,
            resume_token: token,
          });

        if (createError) {
          console.error("Error creating draft before submission:", createError);
          const details = getErrorDetails(createError, "save");
          setSubmissionError({ stage: "save", details });
          toast({
            title: details.title,
            description: details.description,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        applicationId = newId;
        setDraftId(applicationId);

        // Persist non-sensitive metadata for retry/resume
        localStorage.setItem(
          "lifeInsuranceApplication",
          JSON.stringify({
            currentStep,
            completedSteps,
            advisorId,
            advisorName,
            lastSaved: new Date().toISOString(),
            draftId: applicationId,
            resumeToken: token,
          })
        );

        console.log("Created draft with ID:", applicationId);
      } catch (error) {
        console.error("Unexpected error creating draft:", error);
        const details = getErrorDetails(error, "save");
        setSubmissionError({ stage: "save", details });
        toast({
          title: details.title,
          description: details.description,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Stage 2: Save final form data using secure RPC
    try {
      console.log("Saving final form data via RPC, token:", token);
      const { data: updatedId, error: saveError } = await supabase.rpc(
        "update_draft_application_by_token",
        {
          p_resume_token: token,
          p_form_data: finalFormData as unknown as Json,
          p_current_step: 9,
          p_applicant_name: applicantName || null,
          p_applicant_email: applicantEmail,
          p_applicant_phone: applicantPhone,
        }
      );

      if (saveError) {
        console.error("Error saving final form data:", saveError);
        const details = getErrorDetails(saveError, "save");
        setSubmissionError({ stage: "save", details });
        toast({
          title: details.title,
          description: details.description,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!updatedId) {
        const details: SubmissionErrorDetails = {
          title: "Draft Not Found",
          description:
            "We couldn't find your saved draft to update. Please refresh the page and try again (or start a new application).",
          canRetry: true,
        };
        setSubmissionError({ stage: "save", details });
        toast({
          title: details.title,
          description: details.description,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Keep draftId in sync (should match applicationId)
      if (typeof updatedId === "string" && updatedId !== applicationId) {
        applicationId = updatedId;
        setDraftId(updatedId);
      }
    } catch (error) {
      console.error("Unexpected error saving form data:", error);
      const details = getErrorDetails(error, "save");
      setSubmissionError({ stage: "save", details });
      toast({
        title: details.title,
        description: details.description,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }


    // Stage 3: Submit application
    try {
      console.log("Submitting application via RPC, ID:", applicationId);
      const { error: submitError } = await supabase
        .rpc("submit_life_insurance_application", { application_id: applicationId });

      if (submitError) {
        console.error("Error submitting application:", submitError);
        const details = getErrorDetails(submitError, 'submit');
        setSubmissionError({ stage: 'submit', details });
        toast({
          title: details.title,
          description: details.description,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Unexpected error submitting application:", error);
      const details = getErrorDetails(error, 'submit');
      setSubmissionError({ stage: 'submit', details });
      toast({
        title: details.title,
        description: details.description,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    console.log("Application submitted successfully");

    // Stage 4: Send email notifications (non-blocking - don't fail submission)
    try {
      console.log("Sending life insurance notification emails...");
      const { error: emailError } = await supabase.functions.invoke(
        "send-life-insurance-notification",
        {
          body: {
            applicationId,
            applicantName,
            applicantEmail,
            applicantPhone,
            advisorId: advisorId || null,
            advisorName: advisorName || null,
            formData: finalFormData,
          },
        }
      );

      if (emailError) {
        console.error("Failed to send notification emails:", emailError);
        // Don't block success, just log the error
      } else {
        console.log("Notification emails sent successfully");
      }
    } catch (emailError) {
      console.error("Error invoking email function:", emailError);
      // Don't block success, just log the error
    }

    // Clear the draft from localStorage
    localStorage.removeItem("lifeInsuranceApplication");

    // Fire confetti celebration!
    fireConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
    });

    toast({
      title: "🎉 Application Submitted!",
      description: "Your life insurance application has been submitted successfully. We'll be in touch soon.",
      className: "animate-pop-in motion-reduce:animate-none",
    });

    setIsSubmitting(false);
    navigate("/thank-you");
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
    setHasValidationErrors(false);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEditStep = (stepNumber: number) => {
    // Save current step 9 data before navigating
    setFormData((prev) => ({ ...prev, step9: step9Form.getValues() }));
    setHasValidationErrors(false);
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
      <ProgressBar currentStep={currentStep} completedSteps={completedSteps} hasErrors={hasValidationErrors} />

      {/* Main Card */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl">
                Step {currentStep}: {currentStepInfo?.title}
              </CardTitle>
              <CardDescription className="mt-1 text-sm">
                {currentStep === 9 
                  ? "Review all information carefully before submitting"
                  : "Complete all required fields marked with *"
                }
              </CardDescription>
            </div>
            {advisorName && (
              <div className="text-left sm:text-right text-sm border-t sm:border-t-0 pt-2 sm:pt-0">
                <p className="text-muted-foreground">Your Advisor</p>
                <p className="font-medium text-foreground">{advisorName}</p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          {/* Step Content */}
          {renderStep()}

          {/* Submission Error Banner with Retry */}
          {submissionError && (
            <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg border mt-6 ${
              submissionError.details.canRetry 
                ? 'bg-destructive/10 border-destructive/30' 
                : 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800'
            }`}>
              <div className="flex items-start gap-3 flex-1">
                <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  submissionError.details.canRetry ? 'text-destructive' : 'text-amber-600 dark:text-amber-500'
                }`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${
                    submissionError.details.canRetry ? 'text-destructive' : 'text-amber-800 dark:text-amber-200'
                  }`}>
                    {submissionError.details.title}
                  </p>
                  <p className={`text-sm mt-0.5 ${
                    submissionError.details.canRetry ? 'text-destructive/80' : 'text-amber-700 dark:text-amber-300'
                  }`}>
                    {submissionError.details.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {submissionError.details.canRetry ? (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleSubmitApplication}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Try Again
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 sm:flex-none"
                  >
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons - Mobile optimized */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
            {/* Secondary actions */}
            <div className="flex flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex-1 sm:flex-auto min-h-[44px] gap-1 sm:gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="flex-1 sm:flex-auto min-h-[44px] gap-1 sm:gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Save Draft</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleSaveAndExit}
                disabled={isSaving}
                className="flex-1 sm:flex-auto min-h-[44px] gap-1 sm:gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Save & Exit</span>
              </Button>
            </div>

            {/* Primary action - full width on mobile */}
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="relative w-full sm:w-auto min-h-[48px] sm:min-h-[44px] gap-2 text-base sm:text-sm overflow-hidden"
            >
              {/* Shimmer overlay - only visible when submitting */}
              {isSubmitting && (
                <div className="absolute inset-0 -translate-x-full animate-shimmer motion-reduce:animate-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
              
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-2">
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
              </span>
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
