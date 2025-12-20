import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Edit, User, Briefcase, Users, Heart, FileText, Shield, Stethoscope, CreditCard } from "lucide-react";
import { Step9Data, LifeInsuranceApplicationData } from "@/types/lifeInsuranceApplication";
import { ValidatedInput } from "../ValidatedInput";

interface Step9ReviewSubmitProps {
  form: UseFormReturn<Step9Data>;
  formData: LifeInsuranceApplicationData;
  onEditStep: (stepNumber: number) => void;
  completedSteps: number[];
}

const formatCurrency = (value?: number) => {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
};

const formatSSN = (value?: string) => {
  if (!value) return "—";
  const clean = value.replace(/\D/g, "");
  if (clean.length >= 4) return `XXX-XX-${clean.slice(-4)}`;
  return "XXX-XX-XXXX";
};

const formatPhone = (value?: string) => {
  if (!value) return "—";
  const clean = value.replace(/\D/g, "");
  if (clean.length === 10) return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
  return value;
};

const formatAccountNumber = (value?: string) => {
  if (!value) return "—";
  if (value.length >= 4) return `XXXXXX${value.slice(-4)}`;
  return "XXXXXXXXXX";
};

const DataRow = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div className="min-w-0">
    <p className="text-xs text-muted-foreground truncate">{label}</p>
    <p className="font-medium text-foreground text-sm md:text-base break-words">{value || "—"}</p>
  </div>
);

const SectionHeader = ({
  icon: Icon,
  title,
  stepNumber,
  isComplete,
  onEdit,
}: {
  icon: React.ElementType;
  title: string;
  stepNumber: number;
  isComplete: boolean;
  onEdit: () => void;
}) => (
  <div className="flex items-center justify-between w-full pr-2 md:pr-4">
    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
      {isComplete ? (
        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
      ) : (
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
      )}
      <span className="font-medium text-sm md:text-base truncate">Step {stepNumber}: {title}</span>
    </div>
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className="gap-1 text-primary hover:text-primary min-h-[36px] flex-shrink-0"
    >
      <Edit className="w-3 h-3" />
      <span className="hidden sm:inline">Edit</span>
    </Button>
  </div>
);

const Step9ReviewSubmit = ({ form, formData, onEditStep, completedSteps }: Step9ReviewSubmitProps) => {
  const isStepComplete = (step: number) => completedSteps.includes(step);

  return (
    <Form {...form}>
      <div className="space-y-4 md:space-y-6">
        <div className="text-center pb-4 border-b border-border">
          <h3 className="text-base md:text-lg font-semibold text-foreground">Review Your Application</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Please review all information carefully before submitting. Click "Edit" to make changes.
          </p>
        </div>

        <Accordion type="multiple" defaultValue={["step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8"]} className="space-y-2">
          {/* Step 1: Proposed Insured */}
          <AccordionItem value="step1" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={User}
                title="Proposed Insured"
                stepNumber={1}
                isComplete={isStepComplete(1)}
                onEdit={() => onEditStep(1)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <DataRow label="Full Name" value={`${formData.step1?.firstName || ""} ${formData.step1?.middleName || ""} ${formData.step1?.lastName || ""}`.trim()} />
                <DataRow label="Gender" value={formData.step1?.gender} />
                <DataRow label="Date of Birth" value={formData.step1?.dateOfBirth} />
                <DataRow label="SSN" value={formatSSN(formData.step1?.ssn)} />
                <DataRow label="Birthplace" value={`${formData.step1?.birthplaceState || ""}, ${formData.step1?.birthplaceCountry || ""}`.replace(/^, |, $/g, "")} />
                <DataRow label="Citizenship" value={formData.step1?.citizenshipStatus === "usa" ? "U.S. Citizen" : formData.step1?.countryOfCitizenship} />
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Home Address</p>
                <p className="text-sm text-foreground break-words">
                  {formData.step1?.homeStreet}, {formData.step1?.homeCity}, {formData.step1?.homeState} {formData.step1?.homeZip}
                </p>
              </div>
              {formData.step1?.mailingAddressDifferent && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Mailing Address</p>
                  <p className="text-sm text-foreground break-words">
                    {formData.step1?.mailingStreet}, {formData.step1?.mailingCity}, {formData.step1?.mailingState} {formData.step1?.mailingZip}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Step 2: Contact & Employment */}
          <AccordionItem value="step2" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={Briefcase}
                title="Contact & Employment"
                stepNumber={2}
                isComplete={isStepComplete(2)}
                onEdit={() => onEditStep(2)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <DataRow label="Mobile Phone" value={formatPhone(formData.step2?.mobilePhone)} />
                <DataRow label="Email" value={formData.step2?.email} />
                <DataRow label="Employer" value={formData.step2?.employerName} />
                <DataRow label="Occupation" value={formData.step2?.occupation} />
                <DataRow label="Annual Income" value={formatCurrency(formData.step2?.annualEarnedIncome)} />
                <DataRow label="Net Worth" value={formatCurrency(formData.step2?.netWorth)} />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Step 3: Ownership */}
          <AccordionItem value="step3" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={Users}
                title="Ownership"
                stepNumber={3}
                isComplete={isStepComplete(3)}
                onEdit={() => onEditStep(3)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {formData.step3?.insuredIsOwner ? (
                <p className="text-foreground text-sm md:text-base">The proposed insured is the policy owner.</p>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <DataRow label="Owner Type" value={formData.step3?.ownerType} />
                  <DataRow label="Owner Name" value={formData.step3?.ownerName} />
                  <DataRow label="Relationship to Insured" value={formData.step3?.ownerRelationshipToInsured} />
                  <DataRow label="Owner Email" value={formData.step3?.ownerEmail} />
                  <DataRow label="Owner Phone" value={formatPhone(formData.step3?.ownerPhone)} />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Step 4: Beneficiaries */}
          <AccordionItem value="step4" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={Heart}
                title="Beneficiaries"
                stepNumber={4}
                isComplete={isStepComplete(4)}
                onEdit={() => onEditStep(4)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {formData.step4?.beneficiaries && formData.step4.beneficiaries.length > 0 ? (
                <div className="space-y-3">
                  {formData.step4.beneficiaries.map((ben, idx) => (
                    <div key={ben.id || idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        <Badge variant={ben.designation === "primary" ? "default" : "secondary"} className="flex-shrink-0">
                          {ben.designation === "primary" ? "Primary" : "Contingent"}
                        </Badge>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base truncate">{ben.fullName}</p>
                          <p className="text-xs text-muted-foreground">{ben.relationship}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground text-sm md:text-base">{ben.sharePercentage}%</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No beneficiaries added.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Step 5: Policy & Riders */}
          <AccordionItem value="step5" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={FileText}
                title="Policy & Riders"
                stepNumber={5}
                isComplete={isStepComplete(5)}
                onEdit={() => onEditStep(5)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <DataRow label="Plan Name" value={formData.step5?.planName} />
                <DataRow label="Face Amount" value={formatCurrency(formData.step5?.faceAmount)} />
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Selected Riders</p>
                <div className="flex flex-wrap gap-2">
                  {formData.step5?.ridersWaiverOfPremium && <Badge variant="outline">Waiver of Premium</Badge>}
                  {formData.step5?.ridersAcceleratedBenefits && <Badge variant="outline">Accelerated Benefits</Badge>}
                  {formData.step5?.ridersChronicIllness && <Badge variant="outline">Chronic Illness</Badge>}
                  {formData.step5?.ridersAccidentalDeath && <Badge variant="outline">Accidental Death</Badge>}
                  {formData.step5?.ridersChildrenTerm && <Badge variant="outline">Children's Term</Badge>}
                  {!formData.step5?.ridersWaiverOfPremium && !formData.step5?.ridersAcceleratedBenefits && !formData.step5?.ridersChronicIllness && !formData.step5?.ridersAccidentalDeath && !formData.step5?.ridersChildrenTerm && (
                    <span className="text-muted-foreground text-sm">No riders selected</span>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Step 6: Existing Coverage */}
          <AccordionItem value="step6" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={Shield}
                title="Existing Coverage"
                stepNumber={6}
                isComplete={isStepComplete(6)}
                onEdit={() => onEditStep(6)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {formData.step6?.hasExistingCoverage ? (
                <div className="space-y-3">
                  {formData.step6.existingPolicies?.map((policy, idx) => (
                    <div key={policy.id || idx} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base truncate">{policy.companyName}</p>
                          <p className="text-xs text-muted-foreground">Policy #{policy.policyNumber}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-semibold text-foreground text-sm md:text-base">{formatCurrency(policy.amountOfCoverage)}</p>
                          {policy.isBeingReplaced && <Badge variant="destructive" className="text-xs">Being Replaced</Badge>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground text-sm">No existing life insurance coverage.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Step 7: Medical & Lifestyle */}
          <AccordionItem value="step7" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={Stethoscope}
                title="Medical & Lifestyle"
                stepNumber={7}
                isComplete={isStepComplete(7)}
                onEdit={() => onEditStep(7)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <DataRow label="Tobacco Use" value={formData.step7?.usedTobacco ? `Yes - ${formData.step7?.tobaccoType}` : "No"} />
                <DataRow label="Aviation" value={formData.step7?.aviation ? "Yes" : "No"} />
                <DataRow label="Hazardous Sports" value={formData.step7?.hazardousSports ? "Yes" : "No"} />
                <DataRow label="Foreign Travel" value={formData.step7?.foreignTravel ? "Yes" : "No"} />
                <DataRow label="Bankruptcy History" value={formData.step7?.bankruptcy ? "Yes" : "No"} />
                <DataRow label="Medical Conditions" value={formData.step7?.hasMedicalConditions ? "Yes" : "No"} />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Step 8: Premium Payment */}
          <AccordionItem value="step8" className="border border-border rounded-lg px-3 md:px-4">
            <AccordionTrigger className="hover:no-underline py-3 md:py-4 min-h-[56px]">
              <SectionHeader
                icon={CreditCard}
                title="Premium Payment"
                stepNumber={8}
                isComplete={isStepComplete(8)}
                onEdit={() => onEditStep(8)}
              />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <DataRow label="Payment Method" value={formData.step8?.paymentMethod === "eft" ? "Electronic Funds Transfer (EFT)" : "Check"} />
                <DataRow label="Payment Frequency" value={formData.step8?.paymentFrequency?.replace("-", " ")} />
                <DataRow label="Source of Funds" value={formData.step8?.sourceOfFunds} />
                {formData.step8?.paymentMethod === "eft" && (
                  <>
                    <DataRow label="Bank Name" value={formData.step8?.bankName} />
                    <DataRow label="Account Number" value={formatAccountNumber(formData.step8?.accountNumber)} />
                    <DataRow label="Account Type" value={formData.step8?.accountType} />
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Signature Section */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 border-2 border-primary/30 rounded-lg bg-primary/5 space-y-4 md:space-y-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground">Authorization & Electronic Signature</h3>

          <FormField
            control={form.control}
            name="acknowledged"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs md:text-sm font-normal text-foreground leading-relaxed">
                    I certify that all information provided in this application is true, complete, and accurate to the best of my knowledge. I understand that any false statements or material misrepresentations may result in denial of coverage or cancellation of the policy.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <FormField
              control={form.control}
              name="electronicSignature"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Electronic Signature (Type your full legal name) *</FormLabel>
                  <FormControl>
                    <ValidatedInput
                      placeholder="John Michael Smith"
                      fieldState={fieldState}
                      className="font-serif italic text-base md:text-lg min-h-[48px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="signatureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Date</FormLabel>
                  <FormControl>
                    <ValidatedInput
                      readOnly
                      showSuccessIndicator={false}
                      className="bg-muted min-h-[48px]"
                      {...field}
                    />
                  </FormControl>
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

export default Step9ReviewSubmit;
