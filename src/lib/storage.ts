import { supabase } from "@/integrations/supabase/client";

const BUCKET_NAME = "advisor-photos";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface UploadResult {
  url: string;
  path: string;
}

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}

/**
 * Validates a file before upload
 */
export function validateImageFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new StorageError("Invalid file type. Please upload a JPG, PNG, or WebP image.");
  }
  
  if (file.size > MAX_FILE_SIZE) {
    throw new StorageError("File too large. Maximum size is 5MB.");
  }
}

/**
 * Generates a unique filename for storage
 */
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  return `${timestamp}-${randomId}.${extension}`;
}

/**
 * Uploads an advisor photo to Supabase Storage
 * @returns The public URL of the uploaded image
 */
export async function uploadAdvisorPhoto(file: File): Promise<UploadResult> {
  validateImageFile(file);
  
  const fileName = generateFileName(file.name);
  const filePath = `advisors/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
    
  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw new StorageError("Failed to upload image. Please try again.");
  }
  
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
    
  return {
    url: publicUrlData.publicUrl,
    path: filePath,
  };
}

/**
 * Deletes an advisor photo from Supabase Storage
 */
export async function deleteAdvisorPhoto(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);
    
  if (error) {
    console.error("Storage delete error:", error);
    throw new StorageError("Failed to delete image.");
  }
}

/**
 * Extracts the file path from a Supabase Storage public URL
 */
export function getFilePathFromUrl(url: string): string | null {
  if (!url || url.startsWith("data:")) return null;
  
  const match = url.match(/advisor-photos\/(.+)$/);
  return match ? match[1] : null;
}
