import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step6Schema, Step6Data } from "@/types/estatePlanningApplication";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Heart, Activity, Brain, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Step6HealthcareProps {
  data: Step6Data;
  onNext: (data: Step6Data) => void;
  onBack: () => void;
}

const Step6Healthcare = ({ data, onNext, onBack }: Step6HealthcareProps) => {
  const form = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: data,
  });

  const onSubmit = (formData: Step6Data) => {
    onNext(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Important Notice */}
        <Alert>
          <Heart className="h-4 w-4" />
          <AlertDescription>
            These directives express your wishes for end-of-life care. Take time to discuss these decisions with your loved ones and healthcare providers.
          </AlertDescription>
        </Alert>

        {/* HIPAA Authorization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              HIPAA Authorization
            </CardTitle>
            <CardDescription>
              The Health Insurance Portability and Accountability Act protects your medical information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="hipaaAuthorization"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg bg-muted/30">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium cursor-pointer">
                      I authorize my designated healthcare agents to access my private medical records
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      This allows your healthcare agent to receive information about your diagnosis, treatment options, and prognosis from your healthcare providers.
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* End-of-Life Decisions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              End-of-Life Decisions
            </CardTitle>
            <CardDescription>
              Your wishes regarding life-prolonging treatment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Life Prolonging */}
            <FormField
              control={form.control}
              name="lifeProlonging"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <FormLabel className="text-base font-medium">
                        Life-Prolonging Treatment
                      </FormLabel>
                      <p className="text-sm text-muted-foreground mt-1">
                        If you are close to death or permanently unconscious, do you want your life to be prolonged through medical intervention?
                      </p>
                    </div>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      value={field.value === true ? "true" : field.value === false ? "false" : undefined}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="true" id="life-yes" />
                        <label htmlFor="life-yes" className="cursor-pointer font-medium">
                          Yes, prolong my life
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="false" id="life-no" />
                        <label htmlFor="life-no" className="cursor-pointer font-medium">
                          No, allow natural death
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Artificial Nutrition */}
            <FormField
              control={form.control}
              name="artificialNutrition"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <FormLabel className="text-base font-medium">
                        Artificial Nutrition & Hydration
                      </FormLabel>
                      <p className="text-sm text-muted-foreground mt-1">
                        Do you want artificial food and water (feeding tubes, IV fluids) to be administered if you cannot eat or drink naturally?
                      </p>
                    </div>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      value={field.value === true ? "true" : field.value === false ? "false" : undefined}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="true" id="nutrition-yes" />
                        <label htmlFor="nutrition-yes" className="cursor-pointer font-medium">
                          Yes, provide nutrition
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="false" id="nutrition-no" />
                        <label htmlFor="nutrition-no" className="cursor-pointer font-medium">
                          No, withhold nutrition
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surrogate Decision */}
            <FormField
              control={form.control}
              name="surrogateFinalDecision"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Brain className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <FormLabel className="text-base font-medium">
                        Surrogate Decision Authority
                      </FormLabel>
                      <p className="text-sm text-muted-foreground mt-1">
                        Should your healthcare agent (surrogate) have the final say in your healthcare decisions, even if it differs from your stated preferences?
                      </p>
                    </div>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      value={field.value === true ? "true" : field.value === false ? "false" : undefined}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="true" id="surrogate-yes" />
                        <label htmlFor="surrogate-yes" className="cursor-pointer font-medium">
                          Yes, trust their judgment
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="false" id="surrogate-no" />
                        <label htmlFor="surrogate-no" className="cursor-pointer font-medium">
                          No, follow my directives
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Additional Directives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Additional Healthcare Wishes
            </CardTitle>
            <CardDescription>
              Any other instructions regarding your healthcare (optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="additionalHealthcareDirectives"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional healthcare wishes, preferences for pain management, organ donation preferences, or other instructions..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-2">
                    Examples: religious considerations, specific treatment preferences, organ donation wishes, comfort care instructions
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Step6Healthcare;
