import { supabase } from "@/integrations/supabase/client";

interface LocalStorageAdvisor {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  region: string;
  bio: string;
  passionate_bio?: string;
  specialties: string[];
  licenses: string[];
  image?: string;
  image_url?: string;
  status: string;
  years_of_experience: number;
  type: string;
  scheduling_link?: string;
  display_priority?: number;
}

interface LocalStorageData {
  state: {
    advisors: LocalStorageAdvisor[];
  };
}

export interface MigrationResult {
  total: number;
  migrated: number;
  skipped: number;
  failed: number;
  errors: string[];
}

/**
 * Migrates advisor data from localStorage (old Zustand store) to Supabase
 * Converts base64 images to Supabase Storage URLs
 */
export async function migrateLocalStorageAdvisors(): Promise<MigrationResult> {
  const result: MigrationResult = {
    total: 0,
    migrated: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Read from localStorage
    const storedData = localStorage.getItem("advisor-storage");
    if (!storedData) {
      console.log("No localStorage data found");
      return result;
    }

    const parsed: LocalStorageData = JSON.parse(storedData);
    const advisors = parsed?.state?.advisors || [];
    result.total = advisors.length;

    if (advisors.length === 0) {
      console.log("No advisors in localStorage");
      return result;
    }

    console.log(`Found ${advisors.length} advisors in localStorage`);

    for (const advisor of advisors) {
      try {
        // Check if advisor already exists in database
        const { data: existing } = await supabase
          .from("dynamic_advisors")
          .select("id")
          .eq("email", advisor.email)
          .maybeSingle();

        if (existing) {
          console.log(`Skipping ${advisor.name} - already exists in database`);
          result.skipped++;
          continue;
        }

        let imageUrl: string | null = null;

        // Handle image upload if base64
        const imageData = advisor.image || advisor.image_url;
        if (imageData && imageData.startsWith("data:")) {
          imageUrl = await uploadBase64ToStorage(imageData, advisor.name);
        } else if (imageData && imageData.startsWith("http")) {
          imageUrl = imageData;
        }

        // Insert into database
        const { error: insertError } = await supabase
          .from("dynamic_advisors")
          .insert({
            name: advisor.name,
            title: advisor.title,
            email: advisor.email,
            phone: advisor.phone,
            city: advisor.city,
            state: advisor.state,
            region: advisor.region,
            bio: advisor.bio,
            passionate_bio: advisor.passionate_bio || null,
            specialties: advisor.specialties || [],
            licenses: advisor.licenses || [],
            image_url: imageUrl,
            status: advisor.status === "published" ? "published" : "pending",
            years_of_experience: advisor.years_of_experience || 0,
            type: advisor.type === "Broker" ? "Broker" : "Advisor",
            scheduling_link: advisor.scheduling_link || null,
            display_priority: advisor.display_priority || null,
          });

        if (insertError) {
          throw new Error(`Database insert failed: ${insertError.message}`);
        }

        result.migrated++;
        console.log(`Migrated: ${advisor.name}`);

      } catch (error) {
        result.failed++;
        const errorMsg = `Failed to migrate ${advisor.name}: ${error instanceof Error ? error.message : "Unknown error"}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    // Clear localStorage after successful migration
    if (result.migrated > 0 && result.failed === 0) {
      localStorage.removeItem("advisor-storage");
      console.log("Cleared localStorage after successful migration");
    }

    return result;

  } catch (error) {
    result.errors.push(`Migration error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return result;
  }
}

/**
 * Uploads a base64 image to Supabase Storage and returns the public URL
 */
async function uploadBase64ToStorage(base64Data: string, advisorName: string): Promise<string | null> {
  try {
    // Parse the base64 data URL
    const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid base64 format for", advisorName);
      return null;
    }

    const mimeType = matches[1];
    const base64Content = matches[2];

    // Determine file extension
    const extensionMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const extension = extensionMap[mimeType] || "jpg";

    // Decode base64 to Uint8Array
    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the bytes
    const blob = new Blob([bytes], { type: mimeType });

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const fileName = `advisors/${timestamp}-${randomId}.${extension}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("advisor-photos")
      .upload(fileName, blob, {
        contentType: mimeType,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error for", advisorName, uploadError);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("advisor-photos")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error("Error uploading image for", advisorName, error);
    return null;
  }
}

/**
 * Triggers the database migration edge function for existing base64 images
 */
export async function migrateDatabase(): Promise<MigrationResult> {
  try {
    const { data, error } = await supabase.functions.invoke("migrate-advisor-images");

    if (error) {
      throw new Error(error.message);
    }

    return data?.result || {
      total: 0,
      migrated: 0,
      skipped: 0,
      failed: 0,
      errors: [data?.message || "Unknown response"],
    };

  } catch (error) {
    return {
      total: 0,
      migrated: 0,
      skipped: 0,
      failed: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
}
