import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MigrationResult {
  total: number;
  migrated: number;
  failed: number;
  errors: string[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // First, verify the user is authenticated and is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a client with the user's token to verify their identity
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) {
      console.error("Failed to get user:", userError?.message);
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the user has admin role using the has_role function
    const { data: isAdmin, error: roleError } = await userSupabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      console.error("User is not an admin:", roleError?.message);
      return new Response(
        JSON.stringify({ success: false, error: "Forbidden - Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Admin user ${user.id} authorized for migration`);

    // Use service role key for admin operations (after verifying user is admin)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting base64 to Storage migration...");

    // Fetch all advisors with base64 images
    const { data: advisors, error: fetchError } = await supabase
      .from("dynamic_advisors")
      .select("id, name, image_url")
      .like("image_url", "data:%");

    if (fetchError) {
      console.error("Error fetching advisors:", fetchError);
      throw new Error(`Failed to fetch advisors: ${fetchError.message}`);
    }

    const result: MigrationResult = {
      total: advisors?.length || 0,
      migrated: 0,
      failed: 0,
      errors: [],
    };

    console.log(`Found ${result.total} advisors with base64 images`);

    if (!advisors || advisors.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "No base64 images found to migrate",
          result 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process each advisor
    for (const advisor of advisors) {
      try {
        if (!advisor.image_url || !advisor.image_url.startsWith("data:")) {
          continue;
        }

        console.log(`Processing advisor: ${advisor.name} (${advisor.id})`);

        // Parse the base64 data URL
        const matches = advisor.image_url.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) {
          throw new Error("Invalid base64 data URL format");
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        // Determine file extension
        const extensionMap: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/jpg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
        };
        const extension = extensionMap[mimeType] || "jpg";

        // Decode base64 to Uint8Array
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 9);
        const fileName = `advisors/${timestamp}-${randomId}.${extension}`;

        console.log(`Uploading to: ${fileName}`);

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("advisor-photos")
          .upload(fileName, bytes, {
            contentType: mimeType,
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("advisor-photos")
          .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;
        console.log(`Uploaded successfully: ${publicUrl}`);

        // Update the advisor record with the new URL
        const { error: updateError } = await supabase
          .from("dynamic_advisors")
          .update({ image_url: publicUrl })
          .eq("id", advisor.id);

        if (updateError) {
          throw new Error(`Database update failed: ${updateError.message}`);
        }

        result.migrated++;
        console.log(`Successfully migrated: ${advisor.name}`);

      } catch (error) {
        result.failed++;
        const errorMessage = `Failed to migrate ${advisor.name}: ${error instanceof Error ? error.message : "Unknown error"}`;
        result.errors.push(errorMessage);
        console.error(errorMessage);
      }
    }

    console.log("Migration complete:", result);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Migration complete. Migrated ${result.migrated} of ${result.total} images.`,
        result,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Migration error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
