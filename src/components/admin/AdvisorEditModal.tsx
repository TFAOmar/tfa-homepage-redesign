import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DynamicAdvisor, AdvisorStatus } from "@/stores/advisorStore";
import { Upload, CheckCircle2, X } from "lucide-react";
import { useState, useEffect } from "react";

const licenseOptions = ["Life", "Health", "Series 6", "Series 7", "Series 63", "Series 65", "Series 66"];
const specialtyOptions = [
  "Retirement Planning", "Estate Planning", "Tax Strategies", "Life Insurance",
  "Annuities", "Business Planning", "401(k) Guidance", "Investment Management", "College Planning",
];

const formSchema = z.object({
  name: z.string().min(2).max(100),
  title: z.string().min(1),
  type: z.enum(["Advisor", "Broker"]),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(1),
  bio: z.string().min(50).max(300),
  passionateBio: z.string().max(300).optional(),
  licenses: z.array(z.string()).min(1),
  specialties: z.array(z.string()).min(1),
  yearsOfExperience: z.number().min(0).max(50),
  schedulingLink: z.string().url().optional().or(z.literal("")),
  image: z.string().optional(),
  status: z.enum(["pending", "published", "hidden", "archived"]),
  displayPriority: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AdvisorEditModalProps {
  advisor: DynamicAdvisor | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<DynamicAdvisor>) => void;
}

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

const AdvisorEditModal = ({ advisor, open, onClose, onSave }: AdvisorEditModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(advisor?.image);

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
      image: "",
      status: "pending",
      displayPriority: 0,
    },
  });

  useEffect(() => {
    if (advisor) {
      form.reset({
        name: advisor.name,
        title: advisor.title,
        type: advisor.type,
        email: advisor.email,
        phone: advisor.phone,
        city: advisor.city,
        state: advisor.state,
        bio: advisor.bio,
        passionateBio: advisor.passionateBio || "",
        licenses: advisor.licenses,
        specialties: advisor.specialties,
        yearsOfExperience: advisor.yearsOfExperience,
        schedulingLink: advisor.schedulingLink || "",
        image: advisor.image || "",
        status: advisor.status,
        displayPriority: advisor.displayPriority || 0,
      });
      setImagePreview(advisor.image);
    }
  }, [advisor, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        form.setValue("image", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (advisor) {
      onSave(advisor.id, data);
      onClose();
    }
  };

  if (!advisor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass border-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy">Edit Advisor Profile</DialogTitle>
          <DialogDescription>Update advisor information and settings</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy border-b border-accent/20 pb-2">Personal Information</h3>
              
              {/* Headshot */}
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-accent" />
                    <CheckCircle2 className="absolute -top-1 -right-1 h-5 w-5 text-accent bg-background rounded-full" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy/20 to-accent/20 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
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

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
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
                      <FormLabel>City</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent className="bg-background z-50 max-h-[200px]">
                          {allStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Professional Credentials */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy border-b border-accent/20 pb-2">Professional Credentials</h3>
              
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="50" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
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
                    <FormLabel>Licenses</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
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
                              <FormLabel className="font-normal text-sm cursor-pointer">{license}</FormLabel>
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
                    <FormLabel>Specialties</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
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
                              <FormLabel className="font-normal text-sm cursor-pointer">{specialty}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy border-b border-accent/20 pb-2">Bio & Links</h3>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Bio</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none min-h-[80px]" maxLength={300} {...field} />
                    </FormControl>
                    <div className="text-xs text-muted-foreground text-right">{field.value.length}/300</div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="schedulingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduling Link</FormLabel>
                    <FormControl><Input type="url" placeholder="https://calendly.com/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Admin Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy border-b border-accent/20 pb-2">Admin Settings</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="hidden">Hidden</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayPriority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Priority</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-accent/20">
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdvisorEditModal;
