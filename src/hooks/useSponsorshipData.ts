import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SponsorshipEvent {
  id: string;
  name: string;
  slug: string;
  description: string;
  timing: string;
  event_date: string | null;
  attendees: string;
  atmosphere: string | null;
  status: string;
  icon: string;
  gradient: string;
  display_order: number;
  is_active: boolean;
}

export interface SponsorshipTier {
  id: string;
  tier_id: string;
  name: string;
  price: number;
  price_note: string;
  stripe_price_id: string | null;
  features: string[];
  highlight: string | null;
  is_popular: boolean;
  display_order: number;
  is_active: boolean;
}

export const useSponsorshipEvents = () => {
  return useQuery({
    queryKey: ["sponsorship-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sponsorship_events" as any)
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as SponsorshipEvent[];
    },
  });
};

export const useSponsorshipTiers = () => {
  return useQuery({
    queryKey: ["sponsorship-tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sponsorship_tiers" as any)
        .select("id, tier_id, name, price, price_note, features, highlight, is_popular, display_order, is_active")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as SponsorshipTier[];
    },
  });
};

// Admin hooks (no is_active filter)
export const useAllSponsorshipEvents = () => {
  return useQuery({
    queryKey: ["sponsorship-events-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sponsorship_events" as any)
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as SponsorshipEvent[];
    },
  });
};

export const useAllSponsorshipTiers = () => {
  return useQuery({
    queryKey: ["sponsorship-tiers-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_get_sponsorship_tiers" as any);
      if (error) throw error;
      return (data || []) as unknown as SponsorshipTier[];
    },
  });
};

export const useUpsertEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Partial<SponsorshipEvent> & { id?: string }) => {
      if (event.id) {
        const { error } = await supabase
          .from("sponsorship_events" as any)
          .update(event as any)
          .eq("id", event.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("sponsorship_events" as any)
          .insert(event as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsorship-events"] });
      queryClient.invalidateQueries({ queryKey: ["sponsorship-events-admin"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("sponsorship_events" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsorship-events"] });
      queryClient.invalidateQueries({ queryKey: ["sponsorship-events-admin"] });
    },
  });
};

export const useUpsertTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tier: Partial<SponsorshipTier> & { id?: string }) => {
      if (tier.id) {
        const { error } = await supabase
          .from("sponsorship_tiers" as any)
          .update(tier as any)
          .eq("id", tier.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("sponsorship_tiers" as any)
          .insert(tier as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsorship-tiers"] });
      queryClient.invalidateQueries({ queryKey: ["sponsorship-tiers-admin"] });
    },
  });
};
