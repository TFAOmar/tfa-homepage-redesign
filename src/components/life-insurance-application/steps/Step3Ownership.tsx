import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step3Data } from "@/types/lifeInsuranceApplication";
import { UserCheck, Building2, FileText, User } from "lucide-react";

interface Step3Props {
  form: UseFormReturn<Step3Data>;
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
  "Parent",
  "Child",
  "Sibling",
  "Business Partner",
  "Employer",
  "Other",
];

const Step3Ownership = ({ form }: Step3Props) => {
  const insuredIsOwner = form.watch("insuredIsOwner");
  const ownerType = form.watch("ownerType");
  const ownerCitizenshipStatus = form.watch("ownerCitizenshipStatus");

  return (
    <Form {...form}>
      <div className="space-y-6 md:space-y-8">
        {/* Owner Toggle Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <UserCheck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Policy Ownership</h3>
          </div>

          <FormField
            control={form.control}
            name="insuredIsOwner"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border p-3 md:p-4 bg-background/50">
                <div className="space-y-1 flex-1">
                  <FormLabel className="text-sm md:text-base leading-snug">
                    Is the Proposed Insured also the Policy Owner?
                  </FormLabel>
                  <FormDescription className="text-xs md:text-sm">
                    Toggle off if someone else will own the policy.
                  </FormDescription>
                </div>
                <FormControl className="self-start sm:self-center">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Conditional Owner Information */}
        {!insuredIsOwner && (
          <>
            {/* Owner Type Selection */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Owner Type</h3>
              </div>

              <FormField
                control={form.control}
                name="ownerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Owner Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select owner type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Individual
                          </div>
                        </SelectItem>
                        <SelectItem value="trust">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Trust
                          </div>
                        </SelectItem>
                        <SelectItem value="business">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Business
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {ownerType === "individual" && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Individual Owner Information</h3>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  <FormField
                    control={form.control}
                    name="ownerName"
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
                    name="ownerSSN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Security Number *</FormLabel>
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
                    name="ownerDateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
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
                    name="ownerRelationshipToInsured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship to Insured *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select relationship" />
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
                </div>
              </div>
            )}

            {ownerType === "trust" && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Trust Information</h3>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trust Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name of Trust"
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
                    name="ownerSSN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="XX-XXXXXXX"
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
                    name="ownerTrustDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trust Date *</FormLabel>
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
                    name="trusteeNames"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trustee Name(s) *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Names of trustees"
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {ownerType === "business" && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Business Information</h3>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Legal entity name"
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
                    name="ownerSSN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID (EIN) *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="XX-XXXXXXX"
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Common Owner Fields (Address, Contact, Citizenship) */}
            {ownerType && (
              <>
                {/* Owner Address */}
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-sm md:text-base font-medium text-foreground border-b border-border pb-2">
                    Owner Address
                  </h4>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                    <FormField
                      control={form.control}
                      name="ownerStreet"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address *</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="ownerCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
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

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="ownerState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
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
                        name="ownerZip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP *</FormLabel>
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
                  </div>
                </div>

                {/* Owner Contact */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                    Owner Contact
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ownerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
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
                      name="ownerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
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
                </div>

                {/* Owner Citizenship (Individual only) */}
                {ownerType === "individual" && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                      Owner Citizenship
                    </h4>

                    <FormField
                      control={form.control}
                      name="ownerCitizenshipStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizenship Status *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50">
                                <SelectValue placeholder="Select citizenship status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="usa">U.S. Citizen</SelectItem>
                              <SelectItem value="other">Non-U.S. Citizen</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {ownerCitizenshipStatus === "other" && (
                      <FormField
                        control={form.control}
                        name="ownerCountryOfCitizenship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country of Citizenship *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Country"
                                {...field}
                                className="bg-background/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Info when insured is owner */}
        {insuredIsOwner && (
          <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
            <UserCheck className="w-12 h-12 mx-auto text-primary mb-3" />
            <p className="text-foreground font-medium">
              The proposed insured will be the policy owner.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              No additional owner information is required.
            </p>
          </div>
        )}
      </div>
    </Form>
  );
};

export default Step3Ownership;
