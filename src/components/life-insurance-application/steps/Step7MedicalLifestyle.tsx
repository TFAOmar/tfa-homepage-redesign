import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Cigarette, Plane, Scale, Stethoscope, AlertTriangle } from "lucide-react";
import { Step7Data } from "@/types/lifeInsuranceApplication";

interface Step7MedicalLifestyleProps {
  form: UseFormReturn<Step7Data>;
}

const TOBACCO_TYPES = [
  { value: "cigarettes", label: "Cigarettes" },
  { value: "cigars", label: "Cigars" },
  { value: "chewing", label: "Chewing Tobacco" },
  { value: "vaping", label: "Vaping/E-Cigarettes" },
  { value: "pipe", label: "Pipe" },
  { value: "other", label: "Other" },
];

const TOBACCO_FREQUENCY = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "occasionally", label: "Occasionally" },
  { value: "quit", label: "Quit (within last 5 years)" },
];

const Step7MedicalLifestyle = ({ form }: Step7MedicalLifestyleProps) => {
  const watchTobacco = form.watch("usedTobacco");
  const watchAviation = form.watch("aviation");
  const watchHazardous = form.watch("hazardousSports");
  const watchForeignTravel = form.watch("foreignTravel");
  const watchBankruptcy = form.watch("bankruptcy");
  const watchCriminal = form.watch("criminalHistory");
  const watchDriving = form.watch("drivingViolations");
  const watchMedical = form.watch("hasMedicalConditions");

  return (
    <Form {...form}>
      <form className="space-y-8">
        {/* Tobacco Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Cigarette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Tobacco Use</h3>
          </div>

          <FormField
            control={form.control}
            name="usedTobacco"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Have you used nicotine or tobacco products in the last 5 years?
                  </FormLabel>
                  <FormDescription>
                    Includes cigarettes, cigars, vaping, chewing tobacco, etc.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {watchTobacco && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border border-border bg-muted/30">
              <FormField
                control={form.control}
                name="tobaccoType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Tobacco</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOBACCO_TYPES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tobaccoFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOBACCO_FREQUENCY.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tobaccoLastUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Last Used</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* High-Risk Activities Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Plane className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">High-Risk Activities</h3>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="aviation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Do you pilot or intend to pilot any aircraft?
                    </FormLabel>
                    <FormDescription>
                      Excluding commercial airline travel as a passenger
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchAviation && (
              <FormField
                control={form.control}
                name="aviationDetails"
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>Please provide details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your aviation activities, certifications, and frequency"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="hazardousSports"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Do you participate in hazardous sports or activities?
                    </FormLabel>
                    <FormDescription>
                      Racing, scuba diving, skydiving, rock climbing, etc.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchHazardous && (
              <FormField
                control={form.control}
                name="hazardousSportsDetails"
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>Please provide details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="List the activities and frequency of participation"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="foreignTravel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Do you intend to travel outside the United States in the next 2 years?
                    </FormLabel>
                    <FormDescription>
                      For purposes other than vacation in developed countries
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchForeignTravel && (
              <FormField
                control={form.control}
                name="foreignTravelDetails"
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>Please provide details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="List destinations, duration, and purpose of travel"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Legal/Financial History Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Legal & Financial History</h3>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="bankruptcy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Have you filed for bankruptcy (active or discharged)?
                    </FormLabel>
                    <FormDescription>
                      Within the last 10 years
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchBankruptcy && (
              <FormField
                control={form.control}
                name="bankruptcyDetails"
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>Please provide details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Provide chapter type, date filed, and current status"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="criminalHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Have you ever been convicted of a felony or misdemeanor, or are you currently on probation?
                    </FormLabel>
                    <FormDescription>
                      Excluding minor traffic violations
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchCriminal && (
              <FormField
                control={form.control}
                name="criminalHistoryDetails"
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>Please provide details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe the nature of offense, date, and resolution"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="drivingViolations"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Have you had a DUI, DWI, or suspended license in the last 5 years?
                    </FormLabel>
                    <FormDescription>
                      Include any pending charges
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchDriving && (
              <FormField
                control={form.control}
                name="drivingViolationsDetails"
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>Please provide details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe the violation(s), date(s), and any court outcomes"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Medical Knockout Question */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Medical History</h3>
          </div>

          <Alert variant="default" className="border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-sm text-amber-700 dark:text-amber-300">
              Your answers to these questions may affect your underwriting classification and premium rates.
            </AlertDescription>
          </Alert>

          <FormField
            control={form.control}
            name="hasMedicalConditions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background/50">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Have you ever been diagnosed with or treated for any of the following?
                  </FormLabel>
                  <FormDescription>
                    Heart disease, stroke, cancer, diabetes, or immune system disorders
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {watchMedical && (
            <FormField
              control={form.control}
              name="medicalConditionsDetails"
              render={({ field }) => (
                <FormItem className="ml-4">
                  <FormLabel>Please provide details</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="List conditions, dates of diagnosis, treatments, and current status"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Include all relevant medical history, medications, and treating physicians
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default Step7MedicalLifestyle;
