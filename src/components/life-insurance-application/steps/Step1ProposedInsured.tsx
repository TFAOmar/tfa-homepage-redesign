import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import { Step1Data } from "@/types/lifeInsuranceApplication";
import { ValidatedInput } from "../ValidatedInput";
import { ValidatedSSNInput } from "../ValidatedSSNInput";
import { cn } from "@/lib/utils";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

interface Step1ProposedInsuredProps {
  form: UseFormReturn<Step1Data>;
}

const Step1ProposedInsured = ({ form }: Step1ProposedInsuredProps) => {
  const watchMailingDifferent = form.watch("mailingAddressDifferent");
  const watchCitizenship = form.watch("citizenshipStatus");

  return (
    <Form {...form}>
      <div className="space-y-6 md:space-y-8">
        {/* Personal ID Section */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground border-b border-border pb-2">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">First Name *</FormLabel>
                  <FormControl>
                    <ValidatedInput 
                      placeholder="John" 
                      className="min-h-[44px]" 
                      fieldState={fieldState}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <ValidatedInput 
                      placeholder="Michael" 
                      className="min-h-[44px]"
                      fieldState={fieldState}
                      showSuccessIndicator={false}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <ValidatedInput 
                      placeholder="Smith" 
                      className="min-h-[44px]"
                      fieldState={fieldState}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <div className="relative">
                        <SelectTrigger 
                          hasError={!!fieldState.error}
                          hasSuccess={fieldState.isDirty && !fieldState.error}
                          className={cn(fieldState.isDirty && !fieldState.error && "pr-10")}
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        {fieldState.isDirty && !fieldState.error && (
                          <CheckCircle2 className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-success pointer-events-none" />
                        )}
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Date of Birth *</FormLabel>
                  <FormControl>
                    <ValidatedInput 
                      type="date" 
                      className="min-h-[44px]"
                      fieldState={fieldState}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ssn"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Social Security Number *
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your SSN is required for underwriting and is securely encrypted.</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <ValidatedSSNInput
                      fieldState={fieldState}
                      className="min-h-[44px]"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <FormField
              control={form.control}
              name="birthplaceCountry"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Birthplace Country *</FormLabel>
                  <FormControl>
                    <ValidatedInput 
                      placeholder="United States" 
                      className="min-h-[44px]"
                      fieldState={fieldState}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthplaceState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthplace State (if USA)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
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
          </div>
        </div>

        {/* Home Address Section */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground border-b border-border pb-2">
            Home Address
          </h3>

          <FormField
            control={form.control}
            name="homeStreet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address *</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main Street, Apt 4B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <FormField
              control={form.control}
              name="homeCity"
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
              name="homeState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
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
              name="homeZip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code *</FormLabel>
                  <FormControl>
                    <Input placeholder="90001" {...field} maxLength={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mailingAddressDifferent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-3 md:p-4 bg-muted/30 min-h-[52px]">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Mailing address is different from home address</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {watchMailingDifferent && (
            <div className="space-y-3 md:space-y-4 p-3 md:p-4 border border-border rounded-lg bg-muted/20">
              <h4 className="font-medium text-foreground">Mailing Address</h4>

              <FormField
                control={form.control}
                name="mailingStreet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="P.O. Box 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                <FormField
                  control={form.control}
                  name="mailingCity"
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
                  name="mailingState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
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
                  name="mailingZip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="90001" {...field} maxLength={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* Citizenship Section */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground border-b border-border pb-2">
            Citizenship
          </h3>

          <FormField
            control={form.control}
            name="citizenshipStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship Status *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select citizenship status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="usa">United States Citizen</SelectItem>
                    <SelectItem value="other">Other Country</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchCitizenship === "other" && (
            <div className="space-y-3 md:space-y-4 p-3 md:p-4 border border-border rounded-lg bg-muted/20">
              <h4 className="font-medium text-foreground">Immigration Details</h4>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="countryOfCitizenship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country of Citizenship *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mexico" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfEntry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Entry to USA *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="visaType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visa Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visa type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="h1b">H-1B (Specialty Occupation)</SelectItem>
                          <SelectItem value="l1">L-1 (Intracompany Transfer)</SelectItem>
                          <SelectItem value="f1">F-1 (Student)</SelectItem>
                          <SelectItem value="j1">J-1 (Exchange Visitor)</SelectItem>
                          <SelectItem value="o1">O-1 (Extraordinary Ability)</SelectItem>
                          <SelectItem value="greencard">Permanent Resident (Green Card)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visaExpirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visa Expiration Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="permanentResidentCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permanent Resident Card # (if applicable)</FormLabel>
                    <FormControl>
                      <Input placeholder="LIN-XXX-XXX-XXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Identity Verification Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Identity Verification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="driversLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver's License Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="D1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driversLicenseState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Issue *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
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
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Step1ProposedInsured;
