import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AdvisorStatus = "pending" | "published" | "hidden" | "archived";
export type AdvisorType = "Advisor" | "Broker";

// Full advisor interface (includes PII - for admin use only)
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
  slug: string;
  status: AdvisorStatus;
  display_priority?: number;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

// Public advisor interface (excludes PII - email, phone)
export interface PublicAdvisor {
  id: string;
  name: string;
  title: string;
  type: AdvisorType;
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

// Fetch published advisors (public - uses secure view that excludes PII)
export const usePublishedAdvisors = () => {
  return useQuery({
    queryKey: ["published-advisors"],
    queryFn: async () => {
      // Query the public_advisors view which excludes email and phone
      // The view has security_invoker=true and is backed by RLS on dynamic_advisors
      const { data, error } = await supabase
        .rpc("get_public_advisors" as never);

      if (error) {
        // Fallback: if RPC doesn't exist, return empty array
        console.warn("Could not fetch public advisors:", error.message);
        return [] as PublicAdvisor[];
      }
      return (data ?? []) as PublicAdvisor[];
    },
  });
};

// Submit new advisor (public - for onboarding)
export const useSubmitAdvisor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (advisor: Omit<DynamicAdvisor, "id" | "created_at" | "updated_at" | "status" | "slug">) => {
      // Generate slug from name
      const slug = advisor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      const { data, error } = await supabase
        .from("dynamic_advisors")
        .insert([{ ...advisor, slug }])
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

// Advisor info returned by slug lookup (for life insurance application)
export interface AdvisorBySlug {
  id: string;
  name: string;
  email: string;
  title: string;
  image_url: string | null;
  scheduling_link: string | null;
}

// Fetch advisor by slug (public - for life insurance application linking)
export const useAdvisorBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["advisor-by-slug", slug],
    queryFn: async (): Promise<AdvisorBySlug | null> => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .rpc("get_advisor_by_slug", { advisor_slug: slug });

      if (error) {
        console.error("Error fetching advisor by slug:", error);
        return null;
      }
      
      // RPC returns an array, get first item
      const advisor = Array.isArray(data) ? data[0] : data;
      return advisor || null;
    },
    enabled: !!slug,
  });
};
