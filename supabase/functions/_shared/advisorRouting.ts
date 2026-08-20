// Resolves the approved business email for an advisor submission and blocks
// personal / free-mail addresses from ever being used as a recipient.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const FALLBACK_RECIPIENT = "info@tfainsuranceadvisors.com";

const FREE_MAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "hotmail.com",
  "outlook.com", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "proton.me", "protonmail.com", "gmx.com", "mail.com", "zoho.com",
]);

export const isPersonalEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && FREE_MAIL_DOMAINS.has(domain);
};

export interface ResolvedRecipient {
  recipient: string;
  source: "routing_table" | "submitted" | "fallback";
  rejected?: string | null;
  reason?: string | null;
}

export async function resolveAdvisorRecipient(
  supabase: SupabaseClient,
  advisorSlug?: string | null,
  submittedEmail?: string | null,
): Promise<ResolvedRecipient> {
  // 1. Approved business email configured for this advisor slug wins.
  if (advisorSlug) {
    const { data } = await supabase
      .from("advisor_email_routing")
      .select("approved_email, active")
      .eq("advisor_slug", advisorSlug)
      .eq("active", true)
      .maybeSingle();

    if (data?.approved_email) {
      const rejected =
        submittedEmail && submittedEmail.toLowerCase() !== data.approved_email.toLowerCase()
          ? submittedEmail
          : null;
      return {
        recipient: data.approved_email,
        source: "routing_table",
        rejected,
        reason: rejected ? "overridden_by_approved_routing" : null,
      };
    }
  }

  // 2. Submitted advisor email, but never a personal/free-mail address.
  if (submittedEmail && !isPersonalEmail(submittedEmail)) {
    return { recipient: submittedEmail, source: "submitted" };
  }

  return {
    recipient: FALLBACK_RECIPIENT,
    source: "fallback",
    rejected: submittedEmail ?? null,
    reason: submittedEmail
      ? "personal_email_blocked_no_approved_routing"
      : "no_advisor_email_supplied",
  };
}
