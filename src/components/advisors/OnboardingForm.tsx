import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubmitAdvisor } from "@/hooks/useDynamicAdvisors";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { uploadAdvisorPhoto, validateImageFile, StorageError } from "@/lib/storage";

const licenseOptions = ["Life", "Health", "Series 6", "Series 7", "Series 63", "Series 65", "Series 66"];
const specialtyOptions = [
  "Retirement Planning",
  "Estate Planning",
  "Tax Strategies",
  "Life Insurance",
  "Annuities",
  "Business Planning",
  "401(k) Guidance",
  "Investment Management",
  "College Planning",
];

const allStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const getRegion = (state: string): string => {
  const regionMap: Record<string, string> = {
    "Connecticut": "Northeast", "Maine": "Northeast", "Massachusetts": "Northeast",
    "New Hampshire": "Northeast", "Rhode Island": "Northeast", "Vermont": "Northeast",
    "New Jersey": "Northeast", "New York": "Northeast", "Pennsylvania": "Northeast",
    "Illinois": "Midwest", "Indiana": "Midwest", "Michigan": "Midwest", "Ohio": "Midwest",
    "Wisconsin": "Midwest", "Iowa": "Midwest", "Kansas": "Midwest", "Minnesota": "Midwest",
    "Missouri": "Midwest", "Nebraska": "Midwest", "North Dakota": "Midwest", "South Dakota": "Midwest",
    "Delaware": "Southeast", "Florida": "Southeast", "Georgia": "Southeast", "Maryland": "Southeast",
    "North Carolina": "Southeast", "South Carolina": "Southeast", "Virginia": "Southeast",
    "West Virginia": "Southeast", "Alabama": "Southeast", "Kentucky": "Southeast",
    "Mississippi": "Southeast", "Tennessee": "Southeast", "Arkansas": "Southeast", "Louisiana": "Southeast",
    "Oklahoma": "Southwest", "Texas": "Southwest", "Arizona": "Southwest", "New Mexico": "Southwest",
    "Colorado": "Mountain", "Idaho": "Mountain", "Montana": "Mountain", "Nevada": "Mountain",
    "Utah": "Mountain", "Wyoming": "Mountain",
    "Alaska": "West", "California": "West", "Hawaii": "West", "Oregon": "West", "Washington": "West",
  };
  return regionMap[state] || "National";
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  title: z.string().min(1, "Please select a title"),
  type: z.enum(["Advisor", "Broker"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(300, "Bio must be less than 300 characters"),
  passionateBio: z.string().max(300).optional(),
  licenses: z.array(z.string()).min(1, "Select at least one license"),
  specialties: z.array(z.string()).min(1, "Select at least one specialty"),
  yearsOfExperience: z.number().min(0).max(50),
  schedulingLink: z.string().url().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const OnboardingForm = () => {
  const navigate = useNavigate();
  const submitAdvisor = useSubmitAdvisor();
  const { data: settings } = useAdminSettings();
  const adminApprovalEnabled = settings?.admin_approval_enabled ?? false;
  const [imagePreview, setImagePreview] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      type: "Advisor",
      email: "",
      phone: "",
      city: "",
      state: "",
      bio: "",
      passionateBio: "",
      licenses: [],
      specialties: [],
      yearsOfExperience: 0,
      schedulingLink: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        validateImageFile(file);
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        if (error instanceof StorageError) {
          toast.error(error.message);
        }
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Silently reject bot submissions
    if (isBot()) {
      toast.success("Profile Submitted!", {
        description: adminApprovalEnabled 
          ? "Your profile is pending admin approval." 
          : "Your advisor profile is now live in the directory.",
      });
      navigate("/advisors");
      return;
    }

    const region = getRegion(data.state);
    let imageUrl: string | undefined;
    
    // Upload image to Supabase Storage if provided
    if (imageFile) {
      setIsUploading(true);
      try {
        const result = await uploadAdvisorPhoto(imageFile);
        imageUrl = result.url;
      } catch (error) {
        setIsUploading(false);
        if (error instanceof StorageError) {
          toast.error(error.message);
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
        return;
      }
      setIsUploading(false);
    }
    
    // Send email notification
    try {
      await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "advisor-onboarding",
          formData: {
            ...data,
            firstName: data.name.split(" ")[0],
            region,
            image: imageUrl ? "[Image uploaded]" : "No image",
          },
        },
      });
    } catch (error) {
      console.error("Email notification error:", error);
    }
    
    // Submit to Supabase
    submitAdvisor.mutate({
      name: data.name,
      title: data.title,
      type: data.type,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      region,
      bio: data.bio,
      passionate_bio: data.passionateBio || undefined,
      specialties: data.specialties,
      licenses: data.licenses,
      years_of_experience: data.yearsOfExperience,
      image_url: imageUrl,
      scheduling_link: data.schedulingLink || undefined,
    }, {
      onSuccess: () => {
        if (adminApprovalEnabled) {
          toast.success("Profile Submitted!", {
            description: "Your profile is pending admin approval.",
          });
        } else {
          toast.success("Profile Created!", {
            description: "Your advisor profile is now live in the directory.",
          });
        }
        navigate("/advisors");
      },
      onError: () => {
        toast.error("Submission Failed", {
          description: "Please try again later.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground">
            Create your professional advisor profile
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Honeypot field - hidden from humans, traps bots */}
            <div className={honeypotClassName}>
              <label htmlFor="advisor_profile_website">Website</label>
              <input
                type="text"
                id="advisor_profile_website"
                name="advisor_profile_website"
                {...honeypotProps}
              />
            </div>

            {/* Personal Information */}
            <Card className="glass animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-navy">Personal Information</CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Headshot Upload */}
                <FormItem>
                  <FormLabel>Professional Headshot</FormLabel>
                  <div className="flex items-center gap-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover border-2 border-accent"
                        />
                        <CheckCircle2 className="absolute -top-1 -right-1 h-6 w-6 text-accent bg-background rounded-full" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-navy/20 to-accent/20 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="max-w-xs"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload a professional photo (JPG, PNG)
                      </p>
                    </div>
                  </div>
                </FormItem>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select title" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="Financial Advisor">Financial Advisor</SelectItem>
                            <SelectItem value="Senior Financial Advisor">Senior Financial Advisor</SelectItem>
                            <SelectItem value="Life Insurance Broker">Life Insurance Broker</SelectItem>
                            <SelectItem value="Senior Life Insurance Broker">Senior Life Insurance Broker</SelectItem>
                            <SelectItem value="Retirement Planning Specialist">Retirement Planning Specialist</SelectItem>
                            <SelectItem value="Estate Planning Advisor">Estate Planning Advisor</SelectItem>
                            <SelectItem value="Tax Strategy Advisor">Tax Strategy Advisor</SelectItem>
                            <SelectItem value="Annuity Specialist">Annuity Specialist</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="Advisor">Financial Advisor</SelectItem>
                          <SelectItem value="Broker">Insurance Broker</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Los Angeles" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background z-50 max-h-[300px]">
                            {allStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Credentials */}
            <Card className="glass animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-navy">Professional Credentials</CardTitle>
                <CardDescription>Share your qualifications and expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="50"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licenses"
                  render={() => (
                    <FormItem>
                      <FormLabel>Licenses & Certifications *</FormLabel>
                      <FormDescription>Select all that apply</FormDescription>
                      <div className="grid md:grid-cols-2 gap-3 mt-2">
                        {licenseOptions.map((license) => (
                          <FormField
                            key={license}
                            control={form.control}
                            name="licenses"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(license)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, license]
                                        : field.value.filter((val) => val !== license);
                                      field.onChange(newValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {license}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialties"
                  render={() => (
                    <FormItem>
                      <FormLabel>Specialties *</FormLabel>
                      <FormDescription>Select your areas of expertise</FormDescription>
                      <div className="grid md:grid-cols-2 gap-3 mt-2">
                        {specialtyOptions.map((specialty) => (
                          <FormField
                            key={specialty}
                            control={form.control}
                            name="specialties"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(specialty)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, specialty]
                                        : field.value.filter((val) => val !== specialty);
                                      field.onChange(newValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {specialty}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Bio Section */}
            <Card className="glass animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="text-navy">About You</CardTitle>
                <CardDescription>Help clients get to know your approach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Bio *</FormLabel>
                      <FormDescription>
                        Tell us about your approach to helping families (50-300 characters)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="I help families build lasting wealth through comprehensive retirement and investment strategies..."
                          className="resize-none min-h-[100px]"
                          maxLength={300}
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground text-right">
                        {field.value.length}/300
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passionateBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What Makes You Passionate? (Optional)</FormLabel>
                      <FormDescription>
                        Share what drives your passion for financial planning (max 300 characters)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="I'm passionate about empowering families to achieve financial freedom..."
                          className="resize-none min-h-[100px]"
                          maxLength={300}
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground text-right">
                        {field.value?.length || 0}/300
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schedulingLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduling Link (Optional)</FormLabel>
                      <FormDescription>
                        Add your Calendly or booking link
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://calendly.com/yourname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button
                type="submit"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button px-12"
                disabled={isUploading || submitAdvisor.isPending}
              >
                {(isUploading || submitAdvisor.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isUploading ? "Uploading Photo..." : adminApprovalEnabled ? "Submit for Review" : "Create Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OnboardingForm;
