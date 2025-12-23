import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Landmark, Plus, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyInput } from "@/components/ui/currency-input";
import {
  step7Schema,
  Step7Data,
  US_STATES,
} from "@/types/estatePlanningApplication";

interface Step7AssetsProps {
  data: Step7Data;
  onNext: (data: Step7Data) => void;
  onBack: () => void;
}

const PROPERTY_TYPES = [
  { value: "primary", label: "Primary Residence" },
  { value: "rental", label: "Rental Property" },
  { value: "vacation", label: "Vacation Home" },
  { value: "commercial", label: "Commercial Property" },
] as const;

const ACCOUNT_TYPES = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "brokerage", label: "Brokerage" },
  { value: "401k", label: "401(k)" },
  { value: "ira", label: "Traditional IRA" },
  { value: "roth_ira", label: "Roth IRA" },
  { value: "life_insurance", label: "Life Insurance" },
  { value: "annuity", label: "Annuity" },
] as const;

const Step7Assets = ({ data, onNext, onBack }: Step7AssetsProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step7Data>({
    resolver: zodResolver(step7Schema),
    defaultValues: {
      realEstateProperties: data.realEstateProperties || [],
      financialAccounts: data.financialAccounts || [],
      otherAssets: data.otherAssets || "",
    },
  });

  const {
    fields: propertyFields,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control,
    name: "realEstateProperties",
  });

  const {
    fields: accountFields,
    append: appendAccount,
    remove: removeAccount,
  } = useFieldArray({
    control,
    name: "financialAccounts",
  });

  const watchedProperties = watch("realEstateProperties");
  const watchedAccounts = watch("financialAccounts");

  const addProperty = () => {
    appendProperty({
      id: crypto.randomUUID(),
      address: "",
      city: "",
      state: "",
      zip: "",
      propertyType: "primary",
      estimatedValue: undefined,
      hasGrantDeed: false,
    });
  };

  const addAccount = () => {
    appendAccount({
      id: crypto.randomUUID(),
      institutionName: "",
      accountType: "checking",
      approximateValue: undefined,
      accountNumber: "",
    });
  };

  const onSubmit = (formData: Step7Data) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Real Estate Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Real Estate Properties
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            List all properties to be titled to the trust
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {propertyFields.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No properties added yet. Click below to add a property.
            </p>
          ) : (
            propertyFields.map((field, index) => (
              <Card key={field.id} className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Property #{index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProperty(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <Label>Street Address *</Label>
                      <Input
                        {...register(`realEstateProperties.${index}.address`)}
                        placeholder="123 Main Street"
                      />
                      {errors.realEstateProperties?.[index]?.address && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.realEstateProperties[index]?.address?.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <Label>City *</Label>
                        <Input
                          {...register(`realEstateProperties.${index}.city`)}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label>State *</Label>
                        <Select
                          value={watchedProperties?.[index]?.state || ""}
                          onValueChange={(value) =>
                            setValue(`realEstateProperties.${index}.state`, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.value}
                              </SelectItem>
                            ))}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>ZIP *</Label>
                        <Input
                          {...register(`realEstateProperties.${index}.zip`)}
                          placeholder="12345"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Property Type *</Label>
                        <Select
                          value={watchedProperties?.[index]?.propertyType || "primary"}
                          onValueChange={(value: "primary" | "rental" | "vacation" | "commercial") =>
                            setValue(`realEstateProperties.${index}.propertyType`, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {PROPERTY_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Estimated Value</Label>
                        <CurrencyInput
                          value={watchedProperties?.[index]?.estimatedValue || 0}
                          onChange={(value) =>
                            setValue(`realEstateProperties.${index}.estimatedValue`, value)
                          }
                          showPrefix
                          placeholder="500,000"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`grant-deed-${index}`}
                        checked={watchedProperties?.[index]?.hasGrantDeed || false}
                        onCheckedChange={(checked) =>
                          setValue(`realEstateProperties.${index}.hasGrantDeed`, checked as boolean)
                        }
                      />
                      <Label htmlFor={`grant-deed-${index}`} className="font-normal">
                        Grant Deed is available for this property
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            onClick={addProperty}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </CardContent>
      </Card>

      {/* Financial Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            Financial Accounts
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            List bank accounts, investment accounts, retirement accounts, etc.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {accountFields.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No accounts added yet. Click below to add an account.
            </p>
          ) : (
            accountFields.map((field, index) => (
              <Card key={field.id} className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Account #{index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAccount(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <Label>Institution Name *</Label>
                      <Input
                        {...register(`financialAccounts.${index}.institutionName`)}
                        placeholder="Bank of America, Fidelity, etc."
                      />
                      {errors.financialAccounts?.[index]?.institutionName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.financialAccounts[index]?.institutionName?.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Account Type *</Label>
                        <Select
                          value={watchedAccounts?.[index]?.accountType || "checking"}
                          onValueChange={(value: "checking" | "savings" | "brokerage" | "401k" | "ira" | "roth_ira" | "life_insurance" | "annuity") =>
                            setValue(`financialAccounts.${index}.accountType`, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ACCOUNT_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Last 4 Digits</Label>
                        <Input
                          {...register(`financialAccounts.${index}.accountNumber`)}
                          placeholder="1234"
                          maxLength={4}
                        />
                      </div>
                      <div>
                        <Label>Approximate Value</Label>
                        <CurrencyInput
                          value={watchedAccounts?.[index]?.approximateValue || 0}
                          onChange={(value) =>
                            setValue(`financialAccounts.${index}.approximateValue`, value)
                          }
                          showPrefix
                          placeholder="100,000"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            onClick={addAccount}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </CardContent>
      </Card>

      {/* Other Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Other Assets
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Describe any other assets (vehicles, jewelry, collectibles, business interests, etc.)
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            {...register("otherAssets")}
            placeholder="List any additional assets you would like to include in the trust..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
};

export default Step7Assets;
