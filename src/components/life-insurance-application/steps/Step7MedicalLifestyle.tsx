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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Cigarette, Plane, Scale, Stethoscope, AlertTriangle, UserCircle, Heart, Activity, Users, Wine } from "lucide-react";
import { Step7Data } from "@/types/lifeInsuranceApplication";
import { ValidatedInput } from "../ValidatedInput";
import { ValidatedSelectTrigger } from "../ValidatedSelect";
import { ValidatedTextarea } from "../ValidatedTextarea";

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

  // Reusable Yes/No + conditional-details renderer for the new medical sections
  const YesNoWithDetails = ({
    name,
    detailsName,
    label,
    description,
    detailsPlaceholder = "Provide diagnosis date, doctor, treatment, and current status",
  }: {
    name: keyof Step7Data;
    detailsName: keyof Step7Data;
    label: string;
    description?: string;
    detailsPlaceholder?: string;
  }) => {
    const watchVal = form.watch(name as never);
    return (
      <div className="space-y-2">
        <FormField
          control={form.control}
          name={name as never}
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 rounded-lg border border-border p-3 bg-background/50">
              <div className="space-y-1 flex-1">
                <FormLabel className="text-sm leading-snug">{label}</FormLabel>
                {description && <FormDescription className="text-xs">{description}</FormDescription>}
              </div>
              <FormControl className="self-start sm:self-center">
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {!!watchVal && (
          <FormField
            control={form.control}
            name={detailsName as never}
            render={({ field, fieldState }) => (
              <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                <FormControl>
                  <ValidatedTextarea
                    placeholder={detailsPlaceholder}
                    fieldState={fieldState}
                    className="min-h-[70px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    );
  };

  const FamilyMemberRow = ({ relation, fieldKey }: { relation: string; fieldKey: "father" | "mother" | "siblings" }) => {
    const watchHeart = form.watch(`familyHistory.${fieldKey}.heartDisease` as never);
    const watchCancer = form.watch(`familyHistory.${fieldKey}.cancer` as never);
    return (
      <div className="rounded-lg border border-border p-3 md:p-4 bg-background/50 space-y-3">
        <h4 className="font-medium text-sm md:text-base text-foreground">{relation}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name={`familyHistory.${fieldKey}.ageIfLiving` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Age if living</FormLabel>
                <FormControl><Input placeholder="—" {...field as object} value={(field as { value?: string }).value || ""} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`familyHistory.${fieldKey}.ageAtDeath` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Age at death</FormLabel>
                <FormControl><Input placeholder="—" {...field as object} value={(field as { value?: string }).value || ""} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`familyHistory.${fieldKey}.causeOfDeath` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Cause of death</FormLabel>
                <FormControl><Input placeholder="—" {...field as object} value={(field as { value?: string }).value || ""} /></FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name={`familyHistory.${fieldKey}.heartDisease` as never}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-2 rounded-md border border-border p-2">
                <FormLabel className="text-xs">Heart disease?</FormLabel>
                <FormControl><Switch checked={!!field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
          {!!watchHeart && (
            <FormField
              control={form.control}
              name={`familyHistory.${fieldKey}.heartDiseaseAgeOfOnset` as never}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Age of onset</FormLabel>
                  <FormControl><Input placeholder="e.g., 55" {...field as object} value={(field as { value?: string }).value || ""} /></FormControl>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name={`familyHistory.${fieldKey}.cancer` as never}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-2 rounded-md border border-border p-2">
                <FormLabel className="text-xs">Cancer?</FormLabel>
                <FormControl><Switch checked={!!field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
          {!!watchCancer && (
            <>
              <FormField
                control={form.control}
                name={`familyHistory.${fieldKey}.cancerAgeOfOnset` as never}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Cancer age of onset</FormLabel>
                    <FormControl><Input placeholder="e.g., 60" {...field as object} value={(field as { value?: string }).value || ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyHistory.${fieldKey}.cancerType` as never}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Cancer type</FormLabel>
                    <FormControl><Input placeholder="e.g., breast" {...field as object} value={(field as { value?: string }).value || ""} /></FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-6 md:space-y-8">
        {/* ============================================================ */}
        {/* PHYSICIAN INFORMATION                                          */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <UserCircle className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Primary Physician</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField control={form.control} name="primaryPhysicianName" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Physician's Name</FormLabel>
                <FormControl><ValidatedInput placeholder="Dr. Jane Doe" fieldState={fieldState} className="min-h-[44px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="primaryPhysicianPhone" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Physician's Phone</FormLabel>
                <FormControl><ValidatedInput placeholder="(555) 123-4567" fieldState={fieldState} className="min-h-[44px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="primaryPhysicianAddress" render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-sm">Physician's Address</FormLabel>
              <FormControl><ValidatedInput placeholder="Street, City, State, ZIP" fieldState={fieldState} className="min-h-[44px]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField control={form.control} name="lastVisitDate" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Date of Last Visit</FormLabel>
                <FormControl><ValidatedInput type="date" fieldState={fieldState} className="min-h-[44px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="lastVisitReason" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Reason / Findings / Treatment</FormLabel>
                <FormControl><ValidatedInput placeholder="Annual physical, normal results" fieldState={fieldState} className="min-h-[44px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <YesNoWithDetails
            name="pendingMedicalAppointment"
            detailsName="pendingAppointmentDetails"
            label="Do you have a pending medical appointment, or intend to make one in the next 3 months?"
            detailsPlaceholder="Date, doctor name, address, phone, and reason for visit"
          />
        </div>

        {/* ============================================================ */}
        {/* BUILD / WEIGHT                                                 */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Build</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <FormField control={form.control} name="heightFeet" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Height (ft)</FormLabel>
                <FormControl>
                  <ValidatedInput type="number" min={0} max={8} placeholder="5" fieldState={fieldState} className="min-h-[44px]"
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="heightInches" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Height (in)</FormLabel>
                <FormControl>
                  <ValidatedInput type="number" min={0} max={11} placeholder="10" fieldState={fieldState} className="min-h-[44px]"
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="weightLbs" render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Weight (lbs)</FormLabel>
                <FormControl>
                  <ValidatedInput type="number" min={0} max={900} placeholder="170" fieldState={fieldState} className="min-h-[44px]"
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="weightChangeOver10Lbs" render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 bg-background/50">
              <div className="space-y-1 flex-1">
                <FormLabel className="text-sm leading-snug">Have you had a weight change of more than 10 lbs in the past year?</FormLabel>
              </div>
              <FormControl><Switch checked={!!field.value} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
          )} />

          {form.watch("weightChangeOver10Lbs") && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-0 md:pl-4 md:border-l-2 md:border-primary/20">
              <FormField control={form.control} name="weightChangeDirection" render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm">Loss or Gain?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <ValidatedSelectTrigger fieldState={fieldState} className="min-h-[44px]">
                        <SelectValue placeholder="Select" />
                      </ValidatedSelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gain">Gain</SelectItem>
                      <SelectItem value="loss">Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="weightChangeAmount" render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm">Amount (lbs)</FormLabel>
                  <FormControl>
                    <ValidatedInput type="number" min={0} placeholder="15" fieldState={fieldState} className="min-h-[44px]"
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="weightChangeReason" render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm">Reason</FormLabel>
                  <FormControl><ValidatedInput placeholder="Diet, illness, pregnancy…" fieldState={fieldState} className="min-h-[44px]" {...field} /></FormControl>
                </FormItem>
              )} />
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* FAMILY HISTORY                                                 */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Family History</h3>
          </div>
          <FamilyMemberRow relation="Father" fieldKey="father" />
          <FamilyMemberRow relation="Mother" fieldKey="mother" />
          <FamilyMemberRow relation="Siblings" fieldKey="siblings" />

          <YesNoWithDetails
            name="familyExtendedConditions"
            detailsName="familyExtendedConditionsDetails"
            label="Other than above, has any immediate family member had heart disease before age 50, ALS, polycystic kidney disease, cardiomyopathy, sickle cell anemia, Huntington's disease, aneurysm, or cancer?"
            detailsPlaceholder="Type, age of onset, and relationship(s)"
          />
          <YesNoWithDetails
            name="familyMentalHealthHistory"
            detailsName="familyMentalHealthDetails"
            label="Family history of mental illness, suicide, or substance abuse (parents/siblings only)?"
            detailsPlaceholder="Diagnosis and relationship(s)"
          />
        </div>

        {/* ============================================================ */}
        {/* 10-YEAR DIAGNOSIS HISTORY                                      */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Personal Health History (Past 10 Years)</h3>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            In the past 10 years, have you been diagnosed, treated, tested positive for, or given medical advice for any of the following?
          </p>

          <YesNoWithDetails name="hx10HeartCondition" detailsName="hx10HeartConditionDetails"
            label="Heart conditions: irregular heartbeat, murmur, rheumatic fever, coronary artery disease, heart attack, chest pain, angina, high blood pressure, or high cholesterol?" />
          <YesNoWithDetails name="hx10VascularCondition" detailsName="hx10VascularConditionDetails"
            label="Circulatory/vascular: aneurysm, transient ischemic attack (TIA), stroke, carotid or arterial disease?" />
          <YesNoWithDetails name="hx10RespiratoryCondition" detailsName="hx10RespiratoryConditionDetails"
            label="Lungs / respiratory: sleep apnea, asthma, bronchitis, emphysema, COPD, tuberculosis, or chronic allergies?" />
          <YesNoWithDetails name="hx10DigestiveCondition" detailsName="hx10DigestiveConditionDetails"
            label="Digestive: ulcer, hepatitis, cirrhosis, jaundice, or disorder of liver, stomach, intestine, pancreas, gallbladder, or colon?" />
          <YesNoWithDetails name="hx10CancerOrTumor" detailsName="hx10CancerOrTumorDetails"
            label="Cancer, tumor, mass, leukemia, or melanoma?" />
          <YesNoWithDetails name="hx10EndocrineDiabetes" detailsName="hx10EndocrineDiabetesDetails"
            label="Diabetes, thyroid disorder, or other endocrine disorder?" />
          <YesNoWithDetails name="hx10KidneyUrinary" detailsName="hx10KidneyUrinaryDetails"
            label="Kidney, bladder, or urinary tract disorder?" />
          <YesNoWithDetails name="hx10NeurologicalCondition" detailsName="hx10NeurologicalConditionDetails"
            label="Brain / nervous system: seizures, epilepsy, MS, Parkinson's, paralysis, or fainting spells?" />
          <YesNoWithDetails name="hx10MentalEmotional" detailsName="hx10MentalEmotionalDetails"
            label="Mental / emotional: depression, anxiety, bipolar, suicide attempt, eating disorder, or PTSD?" />
          <YesNoWithDetails name="hx10MusculoskeletalAutoimmune" detailsName="hx10MusculoskeletalAutoimmuneDetails"
            label="Bones / joints / muscles: arthritis, back/neck disorder, or autoimmune disease?" />
          <YesNoWithDetails name="hx10BloodImmune" detailsName="hx10BloodImmuneDetails"
            label="Blood disorder, anemia, hemophilia, immune deficiency, or HIV/AIDS?" />
          <YesNoWithDetails name="hx10ReproductiveCondition" detailsName="hx10ReproductiveConditionDetails"
            label="Disorder of the reproductive system?" />
        </div>

        {/* ============================================================ */}
        {/* RECENT 12 MONTHS / SYMPTOMS / SELF TEST                        */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Recent Care (Past 12 Months)</h3>
          </div>
          <YesNoWithDetails name="recent12MonthsTreatment" detailsName="recent12MonthsTreatmentDetails"
            label="Other than disclosed above, have you taken any medications, had treatment or therapy, or been under medical observation in the past 12 months?" />
          <YesNoWithDetails name="recent12MonthsSymptomsUnconsulted" detailsName="recent12MonthsSymptomsDetails"
            label="In the past 12 months, have you had — but NOT consulted a medical professional for — fainting, dizziness, headaches, convulsions, chest pain, shortness of breath, hoarseness, unexplained cough, blood in stool/urine, unhealed sores, mole changes, anxiety, depression, memory loss, or confusion?" />
          <YesNoWithDetails name="selfAdministeredLabTest" detailsName="selfAdministeredLabTestDetails"
            label="In the past 12 months, have you undergone any self-administered laboratory test (other than for pregnancy or HIV)?" />
        </div>

        {/* ============================================================ */}
        {/* 5-YEAR ER + LONG-TERM CARE                                     */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Care Settings</h3>
          </div>
          <YesNoWithDetails name="erUrgentCareVisits5y" detailsName="erUrgentCareVisitsDetails"
            label="Any emergency room, urgent care, walk-in, or free clinic visits in the past 5 years?"
            detailsPlaceholder="Reason, date, facility name/address, resolution" />
          <YesNoWithDetails name="advisedNursingHomeOrHospice" detailsName="advisedNursingHomeDetails"
            label="Have you ever been advised to or chosen to enter a nursing home, hospice, or assisted living facility?" />
          <YesNoWithDetails name="disabilityClaim" detailsName="disabilityClaimDetails"
            label="Have you ever made a claim for or received benefits, compensation, or pension for an injury, sickness, or disability?" />
        </div>

        {/* ============================================================ */}
        {/* FUNCTIONAL / ADL                                                */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Daily Functioning</h3>
          </div>
          <YesNoWithDetails name="usesAssistiveDevice" detailsName="usesAssistiveDeviceDetails"
            label="Do you currently use a wheelchair, walker, multi-prong cane, hospital bed, dialysis machine, oxygen, motorized cart, or stair lift?" />
          <YesNoWithDetails name="needsHelpADLs" detailsName="needsHelpADLsDetails"
            label="Do you currently need help, assistance, or supervision for: bathing, eating, dressing, toileting, walking, transferring, or maintaining continence?" />
          <YesNoWithDetails name="needsHelpIADLs" detailsName="needsHelpIADLsDetails"
            label="Do you currently need help with: taking medication, doing housework, laundry, shopping, or meal preparation?" />
        </div>

        {/* ============================================================ */}
        {/* ALCOHOL & DRUGS                                                 */}
        {/* ============================================================ */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Wine className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Alcohol & Drug Use</h3>
          </div>
          <FormField control={form.control} name="usesAlcohol" render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 bg-background/50">
              <div className="space-y-1 flex-1">
                <FormLabel className="text-sm leading-snug">Have you used alcoholic beverages in the past 5 years?</FormLabel>
              </div>
              <FormControl><Switch checked={!!field.value} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
          )} />
          {form.watch("usesAlcohol") && (
            <FormField control={form.control} name="alcoholDrinksPerWeek" render={({ field, fieldState }) => (
              <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                <FormLabel className="text-sm">Average drinks per week</FormLabel>
                <FormControl>
                  <ValidatedInput type="number" min={0} placeholder="0" fieldState={fieldState} className="min-h-[44px] max-w-xs"
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}
          <YesNoWithDetails name="treatedForAlcoholOrDrugUse" detailsName="treatedForAlcoholOrDrugUseDetails"
            label="Have you ever been treated, counseled, or attended a support group for alcohol or drug use?" />
          <YesNoWithDetails name="usedDrugs" detailsName="usedDrugsDetails"
            label="Have you ever used illegal/recreational drugs or misused prescription medications?" />
        </div>

        {/* Tobacco Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Cigarette className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Tobacco Use</h3>
          </div>

          <FormField
            control={form.control}
            name="usedTobacco"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                <div className="space-y-1 flex-1">
                  <FormLabel className="text-sm md:text-base leading-snug">
                    Have you used nicotine or tobacco products in the last 5 years?
                  </FormLabel>
                  <FormDescription className="text-xs md:text-sm">
                    Includes cigarettes, cigars, vaping, chewing tobacco, etc.
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

          {watchTobacco && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-border bg-muted/30">
              <FormField
                control={form.control}
                name="tobaccoType"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Type of Tobacco</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <ValidatedSelectTrigger fieldState={fieldState} className="min-h-[44px]">
                          <SelectValue placeholder="Select type" />
                        </ValidatedSelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOBACCO_TYPES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tobaccoFrequency"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Frequency</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <ValidatedSelectTrigger fieldState={fieldState} className="min-h-[44px]">
                          <SelectValue placeholder="Select frequency" />
                        </ValidatedSelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOBACCO_FREQUENCY.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tobaccoLastUsed"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Date Last Used</FormLabel>
                    <FormControl>
                      <ValidatedInput
                        type="date"
                        fieldState={fieldState}
                        className="min-h-[44px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* High-Risk Activities Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Plane className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">High-Risk Activities</h3>
          </div>

          <div className="space-y-3 md:space-y-4">
            <FormField
              control={form.control}
              name="aviation"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-sm md:text-base leading-snug">
                      Do you pilot or intend to pilot any aircraft?
                    </FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Excluding commercial airline travel as a passenger
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

            {watchAviation && (
              <FormField
                control={form.control}
                name="aviationDetails"
                render={({ field, fieldState }) => (
                  <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                    <FormLabel className="text-sm md:text-base">Please provide details</FormLabel>
                    <FormControl>
                      <ValidatedTextarea
                        placeholder="Describe your aviation activities, certifications, and frequency"
                        fieldState={fieldState}
                        className="min-h-[80px] md:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="hazardousSports"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-sm md:text-base leading-snug">
                      Do you participate in hazardous sports or activities?
                    </FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Racing, scuba diving, skydiving, rock climbing, etc.
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

            {watchHazardous && (
              <FormField
                control={form.control}
                name="hazardousSportsDetails"
                render={({ field, fieldState }) => (
                  <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                    <FormLabel className="text-sm md:text-base">Please provide details</FormLabel>
                    <FormControl>
                      <ValidatedTextarea
                        placeholder="List the activities and frequency of participation"
                        fieldState={fieldState}
                        className="min-h-[80px] md:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="foreignTravel"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-sm md:text-base leading-snug">
                      Do you intend to travel outside the United States in the next 2 years?
                    </FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      For purposes other than vacation in developed countries
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

            {watchForeignTravel && (
              <FormField
                control={form.control}
                name="foreignTravelDetails"
                render={({ field, fieldState }) => (
                  <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                    <FormLabel className="text-sm md:text-base">Please provide details</FormLabel>
                    <FormControl>
                      <ValidatedTextarea
                        placeholder="List destinations, duration, and purpose of travel"
                        fieldState={fieldState}
                        className="min-h-[80px] md:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Legal/Financial History Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Legal & Financial History</h3>
          </div>

          <div className="space-y-3 md:space-y-4">
            <FormField
              control={form.control}
              name="bankruptcy"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-sm md:text-base leading-snug">
                      Have you filed for bankruptcy (active or discharged)?
                    </FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Within the last 10 years
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

            {watchBankruptcy && (
              <FormField
                control={form.control}
                name="bankruptcyDetails"
                render={({ field, fieldState }) => (
                  <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                    <FormLabel className="text-sm md:text-base">Please provide details</FormLabel>
                    <FormControl>
                      <ValidatedTextarea
                        placeholder="Provide chapter type, date filed, and current status"
                        fieldState={fieldState}
                        className="min-h-[80px] md:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="criminalHistory"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-sm md:text-base leading-snug">
                      Have you ever been convicted of a felony or misdemeanor, or are you currently on probation?
                    </FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Excluding minor traffic violations
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

            {watchCriminal && (
              <FormField
                control={form.control}
                name="criminalHistoryDetails"
                render={({ field, fieldState }) => (
                  <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                    <FormLabel className="text-sm md:text-base">Please provide details</FormLabel>
                    <FormControl>
                      <ValidatedTextarea
                        placeholder="Describe the nature of offense, date, and resolution"
                        fieldState={fieldState}
                        className="min-h-[80px] md:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="drivingViolations"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 bg-background/50">
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-sm md:text-base leading-snug">
                      Have you had a DUI, DWI, or suspended license in the last 5 years?
                    </FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Include any pending charges
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

            {watchDriving && (
              <FormField
                control={form.control}
                name="drivingViolationsDetails"
                render={({ field, fieldState }) => (
                  <FormItem className="pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/20">
                    <FormLabel className="text-sm md:text-base">Please provide details</FormLabel>
                    <FormControl>
                      <ValidatedTextarea
                        placeholder="Describe the violation(s), date(s), and any court outcomes"
                        fieldState={fieldState}
                        className="min-h-[80px] md:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="animate-slide-down-fade motion-reduce:animate-none" />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Medical Knockout Question */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Other / Catch-All</h3>
          </div>

          <Alert variant="default" className="border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-xs md:text-sm text-amber-700 dark:text-amber-300">
              Your answers to these questions may affect your underwriting classification and premium rates.
            </AlertDescription>
          </Alert>

          <YesNoWithDetails name="otherUndisclosedCondition" detailsName="otherUndisclosedConditionDetails"
            label="Have you been treated for, diagnosed with, or do you have any other medical, physical, or psychological condition NOT already disclosed above?"
            detailsPlaceholder="List conditions, dates of diagnosis, treatments, and current status" />
        </div>
      </form>
    </Form>
  );
};

export default Step7MedicalLifestyle;