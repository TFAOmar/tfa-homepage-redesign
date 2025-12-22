import { supabase } from "@/integrations/supabase/client";

export interface FormSubmitPayload {
  form_name: string;
  source_url?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  preferred_language?: string;
  state?: string;
  company_name?: string;
  notes?: string;
  advisor_id?: string;
  advisor_slug?: string;
  advisor_email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  tags?: string[];
  honeypot?: string; // Bot trap field - should always be empty
  interest_category?: string; // For Pipedrive lead labels
}

export interface FormSubmitResponse {
  ok: boolean;
  routed_to?: string;
  routing_result?: "advisor_match" | "default_manny";
  pipedrive_ids?: {
    person_id?: number;
    org_id?: number;
    lead_id?: string;
  };
  submission_id?: string;
  duplicate?: boolean;
  error?: string;
  details?: unknown;
}

/**
 * Extract UTM parameters from the current URL
 */
export const extractUTMParams = (): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
} => {
  if (typeof window === "undefined") return {};
  
  const params = new URLSearchParams(window.location.search);
  
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
  };
};

/**
 * Submit a form to the Pipedrive integration endpoint
 * Automatically includes UTM parameters and source URL
 */
export const submitForm = async (
  payload: FormSubmitPayload
): Promise<FormSubmitResponse> => {
  // Get UTM params from URL if not provided
  const utmParams = extractUTMParams();
  
  // Get current page URL as source
  const sourceUrl = typeof window !== "undefined" ? window.location.href : undefined;
  
  const fullPayload: FormSubmitPayload = {
    ...payload,
    source_url: payload.source_url || sourceUrl,
    utm_source: payload.utm_source || utmParams.utm_source,
    utm_medium: payload.utm_medium || utmParams.utm_medium,
    utm_campaign: payload.utm_campaign || utmParams.utm_campaign,
    utm_content: payload.utm_content || utmParams.utm_content,
    utm_term: payload.utm_term || utmParams.utm_term,
  };
  
  try {
    const { data, error } = await supabase.functions.invoke("pipedrive-submit", {
      body: fullPayload,
    });
    
    if (error) {
      console.error("[Form Submit Error]", error);
      return {
        ok: false,
        error: error.message || "Failed to submit form",
      };
    }
    
    return data as FormSubmitResponse;
  } catch (err) {
    console.error("[Form Submit Exception]", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
};

/**
 * Retry a failed form submission by ID
 */
export const retryFormSubmission = async (
  submissionId: string
): Promise<FormSubmitResponse> => {
  try {
    // Fetch the original submission data
    const { data: submission, error: fetchError } = await supabase
      .from("form_submissions")
      .select("form_data")
      .eq("id", submissionId)
      .single();
    
    if (fetchError || !submission?.form_data) {
      return {
        ok: false,
        error: "Failed to fetch original submission",
      };
    }
    
    // Re-submit with original data (cast to expected type)
    const formData = submission.form_data as Record<string, unknown>;
    const { data, error } = await supabase.functions.invoke("pipedrive-submit", {
      body: formData,
    });
    
    if (error) {
      return {
        ok: false,
        error: error.message || "Failed to retry submission",
      };
    }
    
    return data as FormSubmitResponse;
  } catch (err) {
    console.error("[Retry Submission Error]", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
};
