import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AdvisorStatus = "pending" | "published" | "hidden" | "archived";
export type AdvisorType = "Advisor" | "Broker";

export interface DynamicAdvisor {
  id: string;
  name: string;
  title: string;
  type: AdvisorType;
  email: string;
  phone: string;
  state: string;
  city: string;
  region: string;
  bio: string;
  passionate_bio?: string;
  specialties: string[];
  licenses: string[];
  years_of_experience: number;
  image_url?: string;
  scheduling_link?: string;
  status: AdvisorStatus;
  display_priority?: number;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

// Fetch all advisors (admin only - requires auth)
export const useAdminAdvisors = () => {
  return useQuery({
    queryKey: ["admin-advisors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dynamic_advisors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DynamicAdvisor[];
    },
  });
};

// Fetch published advisors (public)
export const usePublishedAdvisors = () => {
  return useQuery({
    queryKey: ["published-advisors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dynamic_advisors")
        .select("*")
        .eq("status", "published")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as DynamicAdvisor[];
    },
  });
};

// Submit new advisor (public - for onboarding)
export const useSubmitAdvisor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (advisor: Omit<DynamicAdvisor, "id" | "created_at" | "updated_at" | "status">) => {
      const { data, error } = await supabase
        .from("dynamic_advisors")
        .insert([advisor])
        .select()
        .single();

      if (error) throw error;
      return data as DynamicAdvisor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-advisors"] });
      queryClient.invalidateQueries({ queryKey: ["published-advisors"] });
    },
  });
};

// Update advisor (admin only)
export const useUpdateAdvisor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DynamicAdvisor> }) => {
      const { data, error } = await supabase
        .from("dynamic_advisors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as DynamicAdvisor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-advisors"] });
      queryClient.invalidateQueries({ queryKey: ["published-advisors"] });
    },
  });
};

// Delete advisor permanently (admin only)
export const useDeleteAdvisor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("dynamic_advisors")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-advisors"] });
      queryClient.invalidateQueries({ queryKey: ["published-advisors"] });
    },
  });
};

// Bulk update advisors (admin only)
export const useBulkUpdateAdvisors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids, updates }: { ids: string[]; updates: Partial<DynamicAdvisor> }) => {
      const { error } = await supabase
        .from("dynamic_advisors")
        .update(updates)
        .in("id", ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-advisors"] });
      queryClient.invalidateQueries({ queryKey: ["published-advisors"] });
    },
  });
};
