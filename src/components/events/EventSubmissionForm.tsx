import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { Loader2, Upload, User, Calendar, MapPin, Image, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  agentName: z.string().min(2, "Your name is required").max(100),
  agentEmail: z.string().email("Valid email is required").max(255),
  agentPhone: z.string().optional(),
  eventName: z.string().min(2, "Event name is required").max(200),
  description: z.string().min(10, "Please provide a description").max(2000),
  shortDescription: z.string().min(10, "Short description is required").max(300),
  location: z.string().min(2, "Location is required").max(500),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  enableRsvp: z.boolean().default(true),
  rsvpEmail: z.string().email("Valid email required").optional().or(z.literal("")),
  maxAttendees: z.string().optional(),
}).refine((data) => {
  if (data.startTime && data.endTime) {
    return new Date(data.endTime) > new Date(data.startTime);
  }
  return true;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
}).refine((data) => {
  if (data.enableRsvp && !data.rsvpEmail) {
    return false;
  }
  return true;
}, {
  message: "RSVP email is required when RSVP is enabled",
  path: ["rsvpEmail"],
});

type FormData = z.infer<typeof formSchema>;

const EventSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const { honeypotProps, isBot } = useHoneypot();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableRsvp: true,
    },
  });

  const enableRsvp = watch("enableRsvp");

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast.error("Only JPG, PNG, or WebP images are allowed");
        return;
      }
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File, prefix: string): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("event-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      setIsSubmitted(true);
      return;
    }

    if (!primaryImageFile) {
      toast.error("Please upload a primary image for your event");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload images
      const primaryImageUrl = await uploadImage(primaryImageFile, "primary");
      if (!primaryImageUrl) {
        throw new Error("Failed to upload primary image");
      }

      let thumbnailUrl: string | null = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile, "thumbnail");
      }

      // Get UTM params
      const urlParams = new URLSearchParams(window.location.search);

      // Save to database
      const { error } = await supabase.from("event_submissions").insert({
        agent_name: data.agentName,
        agent_email: data.agentEmail,
        agent_phone: data.agentPhone || null,
        event_name: data.eventName,
        description: data.description,
        short_description: data.shortDescription,
        location: data.location,
        start_time: new Date(data.startTime).toISOString(),
        end_time: new Date(data.endTime).toISOString(),
        primary_image_url: primaryImageUrl,
        thumbnail_url: thumbnailUrl,
        enable_rsvp: data.enableRsvp,
        rsvp_email: data.rsvpEmail || null,
        max_attendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        status: "pending",
      });

      if (error) throw error;

      // Send notification email (don't wait)
      supabase.functions.invoke("send-event-notification", {
        body: {
          agentName: data.agentName,
          agentEmail: data.agentEmail,
          agentPhone: data.agentPhone || null,
          eventName: data.eventName,
          description: data.description,
          shortDescription: data.shortDescription,
          location: data.location,
          startTime: data.startTime,
          endTime: data.endTime,
          primaryImageUrl,
          thumbnailUrl,
          enableRsvp: data.enableRsvp,
          rsvpEmail: data.rsvpEmail || null,
          maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        },
      }).catch((emailError) => {
        console.error("Email notification failed:", emailError);
      });

      setIsSubmitted(true);
      toast.success("Event submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Event Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                Thank you for submitting your event. Our team will review it and add it to the calendar once approved. You'll receive a confirmation email shortly.
              </p>
              <Button onClick={() => navigate("/events")} className="bg-primary hover:bg-primary/90">
                Back to Events
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field */}
            <input
              type="text"
              name="website_url"
              className={honeypotClassName}
              {...honeypotProps}
            />

            {/* Agent Information */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-primary" />
                Your Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agentName">Your Name *</Label>
                  <Input
                    id="agentName"
                    {...register("agentName")}
                    className="mt-1"
                    placeholder="John Smith"
                  />
                  {errors.agentName && (
                    <p className="text-sm text-destructive mt-1">{errors.agentName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="agentEmail">Your Email *</Label>
                  <Input
                    id="agentEmail"
                    type="email"
                    {...register("agentEmail")}
                    className="mt-1"
                    placeholder="john@tfainsurance.com"
                  />
                  {errors.agentEmail && (
                    <p className="text-sm text-destructive mt-1">{errors.agentEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="agentPhone">Phone (Optional)</Label>
                <Input
                  id="agentPhone"
                  {...register("agentPhone")}
                  className="mt-1"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                Event Details
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    {...register("eventName")}
                    className="mt-1"
                    placeholder="What is the name of your event?"
                  />
                  {errors.eventName && (
                    <p className="text-sm text-destructive mt-1">{errors.eventName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="mt-1 min-h-[120px]"
                    placeholder="Provide a detailed description of your event..."
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    {...register("shortDescription")}
                    className="mt-1"
                    placeholder="A brief summary used where the full description doesn't fit (max 300 characters)"
                  />
                  {errors.shortDescription && (
                    <p className="text-sm text-destructive mt-1">{errors.shortDescription.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Location *
                  </Label>
                  <Input
                    id="location"
                    {...register("location")}
                    className="mt-1"
                    placeholder="Where is your event taking place?"
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Date & Time *</Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      {...register("startTime")}
                      className="mt-1"
                    />
                    {errors.startTime && (
                      <p className="text-sm text-destructive mt-1">{errors.startTime.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="endTime">End Date & Time *</Label>
                    <Input
                      id="endTime"
                      type="datetime-local"
                      {...register("endTime")}
                      className="mt-1"
                    />
                    {errors.endTime && (
                      <p className="text-sm text-destructive mt-1">{errors.endTime.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 mb-6">
                <Image className="w-5 h-5 text-primary" />
                Event Images
              </h3>

              <div className="space-y-6">
                <div>
                  <Label>Primary Image *</Label>
                  <p className="text-sm text-muted-foreground mb-2">The main image displayed for your event</p>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors overflow-hidden">
                    {primaryImagePreview ? (
                      <img src={primaryImagePreview} alt="Primary preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload primary image</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, or WebP up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleImageChange(e, setPrimaryImageFile, setPrimaryImagePreview)}
                    />
                  </label>
                </div>

                <div>
                  <Label>Thumbnail (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-2">A smaller image for list views</p>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors overflow-hidden">
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload thumbnail</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleImageChange(e, setThumbnailFile, setThumbnailPreview)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* RSVP Settings */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                RSVP Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableRsvp">Enable RSVP</Label>
                    <p className="text-sm text-muted-foreground">Allow attendees to RSVP for this event</p>
                  </div>
                  <Switch
                    id="enableRsvp"
                    checked={enableRsvp}
                    onCheckedChange={(checked) => setValue("enableRsvp", checked)}
                  />
                </div>

                {enableRsvp && (
                  <>
                    <div>
                      <Label htmlFor="rsvpEmail">RSVP Contact Email *</Label>
                      <Input
                        id="rsvpEmail"
                        type="email"
                        {...register("rsvpEmail")}
                        className="mt-1"
                        placeholder="Where should RSVPs be sent?"
                      />
                      {errors.rsvpEmail && (
                        <p className="text-sm text-destructive mt-1">{errors.rsvpEmail.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="maxAttendees">Max Attendees (Optional)</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        {...register("maxAttendees")}
                        className="mt-1"
                        placeholder="Leave blank for unlimited"
                        min="1"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting Event...
                </>
              ) : (
                "Submit Event for Review"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventSubmissionForm;
