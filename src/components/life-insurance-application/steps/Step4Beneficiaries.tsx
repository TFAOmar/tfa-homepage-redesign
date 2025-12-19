import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PercentageInput } from "@/components/ui/percentage-input";
import { Step4Data } from "@/types/lifeInsuranceApplication";
import { Users, Plus, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";

interface Step4Props {
  form: UseFormReturn<Step4Data>;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

const RELATIONSHIPS = [
  "Spouse",
  "Child",
  "Parent",
  "Sibling",
  "Grandchild",
  "Friend",
  "Business Partner",
  "Trust",
  "Estate",
  "Charity",
  "Other",
];

const Step4Beneficiaries = ({ form }: Step4Props) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "beneficiaries",
  });

  const beneficiaries = form.watch("beneficiaries") || [];
  
  const primaryTotal = beneficiaries
    .filter(b => b.designation === "primary")
    .reduce((sum, b) => sum + (b.sharePercentage || 0), 0);
  
  const contingentTotal = beneficiaries
    .filter(b => b.designation === "contingent")
    .reduce((sum, b) => sum + (b.sharePercentage || 0), 0);

  const addBeneficiary = () => {
    append({
      id: crypto.randomUUID(),
      fullName: "",
      relationship: "",
      ssn: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      sharePercentage: 0,
      designation: "primary",
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Beneficiaries</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Add one or more beneficiaries. Primary beneficiaries must total 100%.
          </p>
        </div>

        {/* Percentage Totals */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-lg border p-4 ${primaryTotal === 100 ? 'border-green-500/50 bg-green-500/10' : 'border-destructive/50 bg-destructive/10'}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Primary Total</span>
              {primaryTotal === 100 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
            </div>
            <p className={`text-2xl font-bold ${primaryTotal === 100 ? 'text-green-500' : 'text-destructive'}`}>
              {primaryTotal}%
            </p>
            {primaryTotal !== 100 && (
              <p className="text-xs text-destructive mt-1">Must equal 100%</p>
            )}
          </div>
          <div className={`rounded-lg border p-4 ${contingentTotal === 0 || contingentTotal === 100 ? 'border-border bg-muted/50' : 'border-yellow-500/50 bg-yellow-500/10'}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contingent Total</span>
              {(contingentTotal === 0 || contingentTotal === 100) && (
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">
              {contingentTotal}%
            </p>
            {contingentTotal > 0 && contingentTotal !== 100 && (
              <p className="text-xs text-yellow-600 mt-1">Should equal 100% if used</p>
            )}
          </div>
        </div>

        {/* Beneficiaries List */}
        {fields.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-foreground font-medium">No beneficiaries added yet</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Add at least one beneficiary to continue.
            </p>
            <Button type="button" onClick={addBeneficiary} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Beneficiary
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-3">
            {fields.map((field, index) => {
              const beneficiary = beneficiaries[index];
              return (
                <AccordionItem
                  key={field.id}
                  value={field.id}
                  className="border border-border rounded-lg bg-card/50 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${beneficiary?.designation === 'primary' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                        <span className="font-medium">
                          {beneficiary?.fullName || `Beneficiary ${index + 1}`}
                        </span>
                        <span className="text-sm text-muted-foreground capitalize">
                          ({beneficiary?.designation || 'primary'})
                        </span>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {beneficiary?.sharePercentage || 0}%
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4 pt-2">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.fullName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Full legal name"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.relationship`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Relationship *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background/50">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {RELATIONSHIPS.map((rel) => (
                                    <SelectItem key={rel} value={rel.toLowerCase()}>
                                      {rel}
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
                          name={`beneficiaries.${index}.sharePercentage`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Share Percentage *</FormLabel>
                              <FormControl>
                                <PercentageInput
                                  value={field.value}
                                  onChange={field.onChange}
                                  min={0}
                                  max={100}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Designation */}
                      <FormField
                        control={form.control}
                        name={`beneficiaries.${index}.designation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="primary" id={`primary-${index}`} />
                                  <label htmlFor={`primary-${index}`} className="text-sm font-medium cursor-pointer">
                                    Primary
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="contingent" id={`contingent-${index}`} />
                                  <label htmlFor={`contingent-${index}`} className="text-sm font-medium cursor-pointer">
                                    Contingent
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Optional Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.ssn`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SSN</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="XXX-XX-XXXX"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.dateOfBirth`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="(555) 123-4567"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="email@example.com"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.street`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Main St"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.city`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="City"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.state`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background/50">
                                    <SelectValue placeholder="State" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {US_STATES.map((state) => (
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

                        <FormField
                          control={form.control}
                          name={`beneficiaries.${index}.zip`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="12345"
                                  {...field}
                                  className="bg-background/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Delete Button */}
                      <div className="pt-2 border-t border-border">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove Beneficiary
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}

        {/* Add Button */}
        {fields.length > 0 && (
          <Button type="button" variant="outline" onClick={addBeneficiary} className="gap-2 w-full">
            <Plus className="w-4 h-4" />
            Add Another Beneficiary
          </Button>
        )}
      </div>
    </Form>
  );
};

export default Step4Beneficiaries;
