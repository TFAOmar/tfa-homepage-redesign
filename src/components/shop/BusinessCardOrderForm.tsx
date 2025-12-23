import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

const businessCardSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  jobTitle: z.string().min(1, "Job title is required").max(100),
  phoneNumber: z.string().min(1, "Phone number is required").max(20),
  emailAddress: z.string().email("Invalid email address"),
  website: z.string().max(255, "Website must be less than 255 characters").optional().or(z.literal("")),
  companyAddress: z.string().max(500).optional(),
  specialInstructions: z.string().max(1000).optional(),
});

export type BusinessCardFormData = z.infer<typeof businessCardSchema> & {
  headshotUrl?: string;
  headshotFileName?: string;
};

interface BusinessCardOrderFormProps {
  onSubmit: (data: BusinessCardFormData) => void;
  isSubmitting: boolean;
  variantTitle?: string;
  price?: string;
  currencyCode?: string;
}

export const BusinessCardOrderForm = ({
  onSubmit,
  isSubmitting,
  variantTitle,
  price,
  currencyCode = "USD",
}: BusinessCardOrderFormProps) => {
  const [headshotFile, setHeadshotFile] = useState<File | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [uploadingHeadshot, setUploadingHeadshot] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof businessCardSchema>>({
    resolver: zodResolver(businessCardSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PNG, JPG, or PDF file.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Maximum file size is 10MB.",
      });
      return;
    }

    setHeadshotFile(file);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeadshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setHeadshotPreview(null);
    }
  };

  const removeHeadshot = () => {
    setHeadshotFile(null);
    setHeadshotPreview(null);
  };

  const uploadHeadshot = async (): Promise<{ url: string; fileName: string } | null> => {
    if (!headshotFile) return null;

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = headshotFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${timestamp}-${randomId}.${extension}`;
    const filePath = `headshots/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("business-card-uploads")
      .upload(filePath, headshotFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Headshot upload error:", uploadError);
      throw new Error("Failed to upload headshot");
    }

    const { data: publicUrlData } = supabase.storage
      .from("business-card-uploads")
      .getPublicUrl(filePath);

    return {
      url: publicUrlData.publicUrl,
      fileName: headshotFile.name,
    };
  };

  const handleFormSubmit = async (data: z.infer<typeof businessCardSchema>) => {
    try {
      setUploadingHeadshot(true);

      let headshotData: { url: string; fileName: string } | null = null;
      if (headshotFile) {
        headshotData = await uploadHeadshot();
      }

      const formData: BusinessCardFormData = {
        ...data,
        headshotUrl: headshotData?.url,
        headshotFileName: headshotData?.fileName,
      };

      onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit order", {
        description: "Please try again.",
      });
    } finally {
      setUploadingHeadshot(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Business Card Information</h3>
        <p className="text-white/70 text-sm mb-6">
          Please provide the details you'd like printed on your business cards.
        </p>

        <div className="grid gap-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white/90">
              Full Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="John Smith"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-white/90">
              Job Title/Position <span className="text-red-400">*</span>
            </Label>
            <Input
              id="jobTitle"
              {...register("jobTitle")}
              placeholder="Senior Financial Advisor"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {errors.jobTitle && (
              <p className="text-red-400 text-sm">{errors.jobTitle.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-white/90">
              Phone Number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="(555) 123-4567"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {errors.phoneNumber && (
              <p className="text-red-400 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-white/90">
              Email Address <span className="text-red-400">*</span>
            </Label>
            <Input
              id="emailAddress"
              type="email"
              {...register("emailAddress")}
              placeholder="john@example.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {errors.emailAddress && (
              <p className="text-red-400 text-sm">{errors.emailAddress.message}</p>
            )}
          </div>

          {/* Headshot Upload */}
          <div className="space-y-2">
            <Label className="text-white/90">Headshot Photo</Label>
            <div className="flex items-start gap-4">
              {headshotPreview ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20">
                  <img
                    src={headshotPreview}
                    alt="Headshot preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeHeadshot}
                    className="absolute top-1 right-1 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : headshotFile ? (
                <div className="relative flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3 border border-white/20">
                  <span className="text-white text-sm truncate max-w-[150px]">
                    {headshotFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={removeHeadshot}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null}

              {!headshotFile && (
                <label className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 border-dashed rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                  <Upload className="h-5 w-5 text-white/70" />
                  <span className="text-white/70 text-sm">Upload PNG, JPG, or PDF</span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website" className="text-white/90">
              Website
            </Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="www.yourwebsite.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {errors.website && (
              <p className="text-red-400 text-sm">{errors.website.message}</p>
            )}
          </div>

          {/* Company Address */}
          <div className="space-y-2">
            <Label htmlFor="companyAddress" className="text-white/90">
              Company Address
            </Label>
            <Textarea
              id="companyAddress"
              {...register("companyAddress")}
              placeholder="123 Main Street, Suite 100&#10;Los Angeles, CA 90001"
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions" className="text-white/90">
              Special Instructions
            </Label>
            <Textarea
              id="specialInstructions"
              {...register("specialInstructions")}
              placeholder="Any specific requests for your business cards..."
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/70 text-sm">Selected Package</p>
            <p className="text-white font-medium">{variantTitle || "Standard"}</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Price</p>
            <p className="text-accent font-bold text-xl">
              {currencyCode} ${parseFloat(price || "0").toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || uploadingHeadshot}
        size="lg"
        className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all"
      >
        {isSubmitting || uploadingHeadshot ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {uploadingHeadshot ? "Uploading..." : "Adding to Cart..."}
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </>
        )}
      </Button>
    </form>
  );
};
