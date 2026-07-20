import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type NewLead = Database["public"]["Tables"]["leads"]["Insert"];

export function useLeads() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as Lead[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        () => {
          qc.invalidateQueries({ queryKey: ["leads"] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
}

export function useUpdateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Lead> }) => {
      const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });
}

/** Read attribution + landing metadata; persist in sessionStorage so it survives reloads. */
export function useAttribution(): Record<string, string | null> {
  if (typeof window === "undefined") return {};
  const KEY = "tfa_attribution";
  const stored = sessionStorage.getItem(KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      /* ignore */
    }
  }
  const params = new URLSearchParams(window.location.search);
  const attr = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    referral_source: params.get("ref") || "minh",
    landing_page: window.location.pathname,
    user_agent: navigator.userAgent,
  };
  sessionStorage.setItem(KEY, JSON.stringify(attr));
  return attr;
}

export async function notifyLead(leadId: string, resumeToken: string) {
  try {
    await supabase.functions.invoke("notify-lead", {
      body: { lead_id: leadId, resume_token: resumeToken },
    });
  } catch (e) {
    console.error("notify-lead failed:", e);
  }
}

export async function saveLeadProgress(args: {
  lead_id: string;
  resume_token: string;
  last_step: number;
  payload: Record<string, unknown>;
  is_complete?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  state?: string;
}) {
  const { error } = await supabase.functions.invoke("save-lead-progress", { body: args });
  if (error) throw error;
}
