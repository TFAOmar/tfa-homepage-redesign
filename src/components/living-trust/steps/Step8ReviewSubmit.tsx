import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  User,
  Users,
  Shield,
  Heart,
  Scale,
  Stethoscope,
  Building2,
  FileCheck,
  Check,
  X,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  step8Schema,
  Step8Data,
  EstatePlanningApplicationData,
} from "@/types/estatePlanningApplication";

interface Step8ReviewSubmitProps {
  data: Step8Data;
  allData: EstatePlanningApplicationData;
  onNext: (data: Step8Data) => void;
  onBack: () => void;
  onGoToStep: (step: number) => void;
}

const Step8ReviewSubmit = ({
  data,
  allData,
  onNext,
  onBack,
  onGoToStep,
}: Step8ReviewSubmitProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step8Data>({
    resolver: zodResolver(step8Schema),
    defaultValues: {
      acknowledgeAccuracy: data.acknowledgeAccuracy || false,
      electronicSignature: data.electronicSignature || "",
      signatureDate: data.signatureDate || format(new Date(), "yyyy-MM-dd"),
    },
  });

  const watchAcknowledge = watch("acknowledgeAccuracy");

  const onSubmit = (formData: Step8Data) => {
    onNext(formData);
  };

  const maskSSN = (ssn?: string) => {
    if (!ssn) return "Not provided";
    const cleaned = ssn.replace(/\D/g, "");
    if (cleaned.length === 9) {
      return `XXX-XX-${cleaned.slice(-4)}`;
    }
    return "Invalid SSN";
  };

  const formatCurrency = (value?: number) => {
    if (!value) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const EditButton = ({ step }: { step: number }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => onGoToStep(step)}
      className="text-primary"
    >
      <Pencil className="h-4 w-4 mr-1" />
      Edit
    </Button>
  );

  const PowerBadge = ({ enabled, label }: { enabled?: boolean; label: string }) => (
    <Badge
      variant={enabled ? "default" : "secondary"}
      className="flex items-center gap-1"
    >
      {enabled ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {label}
    </Badge>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Review Your Information</h2>
        <p className="text-muted-foreground mt-2">
          Please review all information carefully before submitting
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["step1", "step2", "step3", "step4", "step5", "step6", "step7"]} className="space-y-4">
        {/* Step 1: Client Identity */}
        <AccordionItem value="step1" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <span className="font-semibold">Client Identity</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={1} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trustor 1</p>
                  <p className="font-medium">
                    {allData.step1?.trustor1FirstName} {allData.step1?.trustor1MiddleName} {allData.step1?.trustor1LastName}
                  </p>
                  <p className="text-sm">SSN: {maskSSN(allData.step1?.trustor1SSN)}</p>
                  <p className="text-sm">DOB: {allData.step1?.trustor1DOB}</p>
                  <p className="text-sm">{allData.step1?.trustor1Email}</p>
                  <p className="text-sm">{allData.step1?.trustor1Phone}</p>
                </div>
                {allData.step1?.hasTrustor2 && allData.step1?.trustor2FirstName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Trustor 2 (Spouse)</p>
                    <p className="font-medium">
                      {allData.step1?.trustor2FirstName} {allData.step1?.trustor2MiddleName} {allData.step1?.trustor2LastName}
                    </p>
                    <p className="text-sm">SSN: {maskSSN(allData.step1?.trustor2SSN)}</p>
                    <p className="text-sm">DOB: {allData.step1?.trustor2DOB}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {allData.step1?.homeStreet}, {allData.step1?.homeCity}, {allData.step1?.homeState} {allData.step1?.homeZip}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 2: Family & Heirs */}
        <AccordionItem value="step2" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">Family & Heirs</span>
              <Badge variant="secondary">{allData.step2?.children?.length || 0} children</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={2} />
              </div>
              {allData.step2?.children?.length === 0 ? (
                <p className="text-muted-foreground">No children listed</p>
              ) : (
                <div className="space-y-2">
                  {allData.step2?.children?.map((child, i) => (
                    <div key={child.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{child.fullName}</p>
                        <p className="text-sm text-muted-foreground">DOB: {child.dateOfBirth}</p>
                      </div>
                      <Badge variant="outline">{child.parentage}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 3: Successor Trustees */}
        <AccordionItem value="step3" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">Successor Trustees</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={3} />
              </div>
              <div className="space-y-2">
                {allData.step3?.successorTrustees?.map((trustee, i) => (
                  <div key={trustee.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{trustee.fullName}</p>
                      <p className="text-sm text-muted-foreground">{trustee.phone}</p>
                    </div>
                    <Badge variant={trustee.role === "primary" ? "default" : "outline"}>
                      {trustee.role}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Incapacity Judge 1</p>
                  <p className="font-medium">{allData.step3?.incapacityJudge1Name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Incapacity Judge 2</p>
                  <p className="font-medium">{allData.step3?.incapacityJudge2Name}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 4: Beneficiaries */}
        <AccordionItem value="step4" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-semibold">Beneficiaries</span>
              <Badge variant="secondary">
                {allData.step4?.beneficiaries?.reduce((sum, b) => sum + (b.percentage || 0), 0)}% allocated
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={4} />
              </div>
              <div className="space-y-2">
                {allData.step4?.beneficiaries?.map((beneficiary) => (
                  <div key={beneficiary.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{beneficiary.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {beneficiary.relationship} • {beneficiary.contingencyPlan?.replace("_", " ")}
                      </p>
                    </div>
                    <Badge variant="default">{beneficiary.percentage}%</Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Ultimate distribution age: {allData.step4?.ultimateBeneficiaryAge || 25} years old
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 5: Legal Powers */}
        <AccordionItem value="step5" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-primary" />
              <span className="font-semibold">Legal Powers (POA)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={5} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Financial POA</p>
                  <p className="font-medium">{allData.step5?.financialPOAPrimary || "Not specified"}</p>
                  {allData.step5?.financialPOAAlternate && (
                    <p className="text-sm">Alternate: {allData.step5?.financialPOAAlternate}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medical POA</p>
                  <p className="font-medium">{allData.step5?.medicalPOAPrimary || "Not specified"}</p>
                  {allData.step5?.medicalPOAAlternate && (
                    <p className="text-sm">Alternate: {allData.step5?.medicalPOAAlternate}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Granted Powers</p>
                <div className="flex flex-wrap gap-2">
                  <PowerBadge enabled={allData.step5?.powerRealEstate} label="Real Estate" />
                  <PowerBadge enabled={allData.step5?.powerBanking} label="Banking" />
                  <PowerBadge enabled={allData.step5?.powerSecurities} label="Securities" />
                  <PowerBadge enabled={allData.step5?.powerTaxes} label="Taxes" />
                  <PowerBadge enabled={allData.step5?.powerGifts} label="Gifts" />
                  <PowerBadge enabled={allData.step5?.powerRetirementPlans} label="Retirement" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 6: Healthcare */}
        <AccordionItem value="step6" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-5 w-5 text-primary" />
              <span className="font-semibold">Healthcare Directives</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={6} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span>HIPAA Authorization</span>
                  <Badge variant={allData.step6?.hipaaAuthorization ? "default" : "secondary"}>
                    {allData.step6?.hipaaAuthorization ? "Authorized" : "Not Authorized"}
                  </Badge>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span>Life-Prolonging Treatment</span>
                  <Badge variant={allData.step6?.lifeProlonging ? "default" : "secondary"}>
                    {allData.step6?.lifeProlonging ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span>Artificial Nutrition</span>
                  <Badge variant={allData.step6?.artificialNutrition ? "default" : "secondary"}>
                    {allData.step6?.artificialNutrition ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span>Surrogate Final Decision</span>
                  <Badge variant={allData.step6?.surrogateFinalDecision ? "default" : "secondary"}>
                    {allData.step6?.surrogateFinalDecision ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step 7: Assets */}
        <AccordionItem value="step7" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Assets</span>
              <Badge variant="secondary">
                {(allData.step7?.realEstateProperties?.length || 0) + (allData.step7?.financialAccounts?.length || 0)} items
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                <EditButton step={7} />
              </div>
              
              {/* Real Estate */}
              {(allData.step7?.realEstateProperties?.length || 0) > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Real Estate Properties</p>
                  {allData.step7?.realEstateProperties?.map((property) => (
                    <div key={property.id} className="p-3 bg-muted rounded-lg mb-2">
                      <p className="font-medium">{property.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.city}, {property.state} {property.zip} • {property.propertyType}
                      </p>
                      <p className="text-sm">{formatCurrency(property.estimatedValue)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Financial Accounts */}
              {(allData.step7?.financialAccounts?.length || 0) > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Financial Accounts</p>
                  {allData.step7?.financialAccounts?.map((account) => (
                    <div key={account.id} className="p-3 bg-muted rounded-lg mb-2">
                      <p className="font-medium">{account.institutionName}</p>
                      <p className="text-sm text-muted-foreground">
                        {account.accountType} {account.accountNumber && `• ****${account.accountNumber}`}
                      </p>
                      <p className="text-sm">{formatCurrency(account.approximateValue)}</p>
                    </div>
                  ))}
                </div>
              )}

              {allData.step7?.otherAssets && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Other Assets</p>
                  <p className="text-sm">{allData.step7.otherAssets}</p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Signature Section */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            Electronic Signature
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acknowledge"
              checked={watchAcknowledge}
              onCheckedChange={(checked) => setValue("acknowledgeAccuracy", checked as boolean)}
            />
            <Label htmlFor="acknowledge" className="font-normal leading-relaxed">
              I acknowledge that all information provided in this estate planning intake form is accurate 
              and complete to the best of my knowledge. I understand this information will be used to 
              prepare legal documents.
            </Label>
          </div>
          {errors.acknowledgeAccuracy && (
            <p className="text-sm text-destructive">{errors.acknowledgeAccuracy.message}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Electronic Signature (Type Full Legal Name) *</Label>
              <Input
                {...register("electronicSignature")}
                placeholder="John Doe"
                className="font-script text-lg"
              />
              {errors.electronicSignature && (
                <p className="text-sm text-destructive mt-1">{errors.electronicSignature.message}</p>
              )}
            </div>
            <div>
              <Label>Date</Label>
              <Input
                {...register("signatureDate")}
                type="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Submit Application
        </Button>
      </div>
    </form>
  );
};

export default Step8ReviewSubmit;
