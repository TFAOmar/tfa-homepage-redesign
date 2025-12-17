import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface AdminSettings {
  admin_approval_enabled: boolean;
  homepage_advisor_ids: (number | string)[];
  homepage_advisor_count: number;
  directory_hidden_ids: (number | string)[];
  directory_advisor_order: (number | string)[];
}

// Fetch admin settings (public for homepage display settings)
export const useAdminSettings = () => {
  return useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("key, value");

      if (error) throw error;

      const settings: AdminSettings = {
        admin_approval_enabled: false,
        homepage_advisor_ids: [],
        homepage_advisor_count: 3,
        directory_hidden_ids: [],
        directory_advisor_order: [],
      };

      data?.forEach((row) => {
        if (row.key === "admin_approval_enabled") {
          settings.admin_approval_enabled = row.value === true || row.value === "true";
        } else if (row.key === "homepage_advisor_ids") {
          settings.homepage_advisor_ids = Array.isArray(row.value) 
            ? (row.value as (string | number)[]) 
            : [];
        } else if (row.key === "homepage_advisor_count") {
          settings.homepage_advisor_count = typeof row.value === "number" ? row.value : 3;
        } else if (row.key === "directory_hidden_ids") {
          settings.directory_hidden_ids = Array.isArray(row.value) 
            ? (row.value as (string | number)[]) 
            : [];
        } else if (row.key === "directory_advisor_order") {
          settings.directory_advisor_order = Array.isArray(row.value) 
            ? (row.value as (string | number)[]) 
            : [];
        }
      });

      return settings;
    },
  });
};

// Update a single admin setting (admin only)
export const useUpdateAdminSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: Json }) => {
      const { error } = await supabase
        .from("admin_settings")
        .update({ value })
        .eq("key", key);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
  });
};

// Helper hooks for specific settings
export const useHomepageAdvisorSettings = () => {
  const { data: settings, isLoading } = useAdminSettings();
  const updateSetting = useUpdateAdminSetting();

  return {
    homepageAdvisorIds: settings?.homepage_advisor_ids ?? [],
    homepageAdvisorCount: settings?.homepage_advisor_count ?? 3,
    isLoading,
    setHomepageAdvisorIds: (ids: (number | string)[]) => 
      updateSetting.mutate({ key: "homepage_advisor_ids", value: ids }),
    setHomepageAdvisorCount: (count: number) => 
      updateSetting.mutate({ key: "homepage_advisor_count", value: count }),
    toggleHomepageAdvisor: (id: number | string) => {
      const currentIds = settings?.homepage_advisor_ids ?? [];
      const newIds = currentIds.includes(id) 
        ? currentIds.filter((i) => i !== id)
        : [...currentIds, id];
      updateSetting.mutate({ key: "homepage_advisor_ids", value: newIds });
    },
    clearHomepageAdvisors: () => 
      updateSetting.mutate({ key: "homepage_advisor_ids", value: [] }),
    reorderHomepageAdvisors: (oldIndex: number, newIndex: number) => {
      const currentIds = [...(settings?.homepage_advisor_ids ?? [])];
      const [removed] = currentIds.splice(oldIndex, 1);
      currentIds.splice(newIndex, 0, removed);
      updateSetting.mutate({ key: "homepage_advisor_ids", value: currentIds });
    },
  };
};

export const useAdminApprovalSetting = () => {
  const { data: settings, isLoading } = useAdminSettings();
  const updateSetting = useUpdateAdminSetting();

  return {
    adminApprovalEnabled: settings?.admin_approval_enabled ?? false,
    isLoading,
    toggleAdminApproval: () => 
      updateSetting.mutate({ 
        key: "admin_approval_enabled", 
        value: !(settings?.admin_approval_enabled ?? false) 
      }),
  };
};

// Directory advisor settings hook
export const useDirectoryAdvisorSettings = () => {
  const { data: settings, isLoading } = useAdminSettings();
  const updateSetting = useUpdateAdminSetting();

  return {
    hiddenAdvisorIds: settings?.directory_hidden_ids ?? [],
    advisorOrder: settings?.directory_advisor_order ?? [],
    isLoading,
    toggleAdvisorVisibility: (id: number | string) => {
      const currentIds = settings?.directory_hidden_ids ?? [];
      const newIds = currentIds.includes(id) 
        ? currentIds.filter((i) => i !== id)
        : [...currentIds, id];
      updateSetting.mutate({ key: "directory_hidden_ids", value: newIds });
    },
    setAdvisorOrder: (ids: (number | string)[]) => 
      updateSetting.mutate({ key: "directory_advisor_order", value: ids }),
    reorderAdvisors: (oldIndex: number, newIndex: number) => {
      const currentOrder = [...(settings?.directory_advisor_order ?? [])];
      const [removed] = currentOrder.splice(oldIndex, 1);
      currentOrder.splice(newIndex, 0, removed);
      updateSetting.mutate({ key: "directory_advisor_order", value: currentOrder });
    },
    resetToAlphabetical: () => 
      updateSetting.mutate({ key: "directory_advisor_order", value: [] }),
  };
};
