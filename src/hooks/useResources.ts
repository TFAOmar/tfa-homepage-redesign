import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  category_id: string;
  file_path: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
  updated_at: string;
  category?: ResourceCategory;
}

const BUCKET = "resource-library";

export const useResourceCategories = () =>
  useQuery({
    queryKey: ["resource-categories"],
    queryFn: async (): Promise<ResourceCategory[]> => {
      const { data, error } = await supabase
        .from("resource_categories")
        .select("*")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return data as ResourceCategory[];
    },
  });

export const useResources = () =>
  useQuery({
    queryKey: ["resources"],
    queryFn: async (): Promise<Resource[]> => {
      const { data, error } = await supabase
        .from("resources")
        .select("*, category:resource_categories(id, name, slug, display_order)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Resource[];
    },
  });

export const getSignedUrl = async (
  path: string,
  download: boolean | string = false,
) => {
  const downloadOption =
    typeof download === "string" ? { download: download } : download ? { download: true } : undefined;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60, downloadOption);
  if (error) throw error;
  return data.signedUrl;
};

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const { data, error } = await supabase
        .from("resource_categories")
        .insert({ name: name.trim(), slug, display_order: 100 })
        .select()
        .single();
      if (error) throw error;
      return data as ResourceCategory;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resource-categories"] }),
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resource_categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resource-categories"] }),
  });
};

export const useUploadResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      title: string;
      description?: string;
      category_id: string;
      file: File;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      const ext = input.file.name.split(".").pop() || "pdf";
      const path = `${input.category_id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, input.file, { contentType: input.file.type || "application/pdf" });
      if (upErr) throw upErr;
      const { data, error } = await supabase
        .from("resources")
        .insert({
          title: input.title,
          description: input.description || null,
          category_id: input.category_id,
          file_path: path,
          file_name: input.file.name,
          file_size: input.file.size,
          mime_type: input.file.type || "application/pdf",
          uploaded_by: userId ?? null,
        })
        .select()
        .single();
      if (error) {
        await supabase.storage.from(BUCKET).remove([path]);
        throw error;
      }
      return data as Resource;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

export const useUpdateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      id: string;
      title?: string;
      description?: string | null;
      category_id?: string;
    }) => {
      const { id, ...rest } = input;
      const { error } = await supabase.from("resources").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

export const useDeleteResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resource: Resource) => {
      await supabase.storage.from(BUCKET).remove([resource.file_path]);
      const { error } = await supabase.from("resources").delete().eq("id", resource.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

export const formatFileSize = (bytes: number) => {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};