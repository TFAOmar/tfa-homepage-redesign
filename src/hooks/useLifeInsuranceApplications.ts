import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

export interface LifeInsuranceApplication {
  id: string;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  advisor_id: string | null;
  advisor_name: string | null;
  advisor_email: string | null;
  status: ApplicationStatus;
  current_step: number;
  form_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export const useAdminApplications = () => {
  return useQuery({
    queryKey: ["admin-life-insurance-applications"],
    queryFn: async (): Promise<LifeInsuranceApplication[]> => {
      const { data, error } = await supabase
        .from("life_insurance_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return (data || []).map((app) => ({
        ...app,
        form_data: app.form_data as Record<string, unknown>,
      }));
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: ApplicationStatus;
    }) => {
      const { error } = await supabase
        .from("life_insurance_applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-life-insurance-applications"],
      });
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("life_insurance_applications")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-life-insurance-applications"],
      });
    },
  });
};

export const useResendApplicationPdf = () => {
  return useMutation({
    mutationFn: async (applicationId: string) => {
      const { data, error } = await supabase.functions.invoke(
        "resend-life-insurance-pdf",
        { body: { applicationId } }
      );
      if (error) throw error;
      return data as { success: boolean; message: string };
    },
  });
};
