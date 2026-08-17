import SmsConsentCheckbox, { SMS_CONSENT_TEXT_VERSION } from "@/components/forms/SmsConsentCheckbox";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { generateUUID } from "@/lib/uuid";
import ConditionalYesNo from "./ConditionalYesNo";
import {
  OmarReferralFormData,
  defaultOmarReferralData,
  OMAR_REFERRAL_STEPS,
  US_STATES,
  CARDIAC_CONDITIONS,
  RESPIRATORY_CONDITIONS,
  NEURO_CONDITIONS,
  MENTAL_CONDITIONS,
  OTHER_CONDITIONS,
  ConditionDetail,
  HealthHistory,
  Medication,
  FamilyHistoryEntry,
} from "@/types/omarReferralPrequal";

const STORAGE_KEY = "omar-referral-prequal-draft";

const emptyCondition = (): ConditionDetail => ({ yes: "" });

type StepProps<T> = {
  data: T;
  update: (patch: Partial<T>) => void;
  onNext: () => void;
  onBack?: () => void;
};

// ---------- Reusable input helpers ----------
function TextField({
  label, value, onChange, required, type = "text", placeholder, className,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}{required && " *"}</Label>
      <Input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options, required, placeholder = "Select...", className,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}{required && " *"}</Label>
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

// Follow-up fields for a generic condition detail block
function ConditionDetailFields({
  value, onChange, showControlled = true, showLastEpisode = true,
}: {
  value: ConditionDetail;
  onChange: (patch: Partial<ConditionDetail>) => void;
  showControlled?: boolean;
  showLastEpisode?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <TextField label="Date diagnosed (mo/yr)" value={value.diagnosisDate} onChange={(v) => onChange({ diagnosisDate: v })} />
      {showLastEpisode && (
        <TextField label="Last episode / event" value={value.lastEpisode} onChange={(v) => onChange({ lastEpisode: v })} />
      )}
      <TextField label="Current medications & dosage" value={value.medications} onChange={(v) => onChange({ medications: v })} className="md:col-span-2" />
      <TextField label="Treating physician / specialist" value={value.specialist} onChange={(v) => onChange({ specialist: v })} />
      {showControlled && (
        <SelectField
          label="Currently controlled?"
          value={value.controlled}
          onChange={(v) => onChange({ controlled: v as "Yes" | "No" })}
          options={["Yes", "No"]}
        />
      )}
      <div className="md:col-span-2">
        <Label>Additional details</Label>
        <Textarea rows={2} value={value.details || ""} onChange={(e) => onChange({ details: e.target.value })} />
      </div>
    </div>
  );
}

// ---------- Step 1: Referrer ----------
function Step1Referrer({ data, update, onNext }: StepProps<OmarReferralFormData>) {
  const r = data.referrer;
  const set = (patch: Partial<typeof r>) => update({ referrer: { ...r, ...patch } });

  const handleNext = () => {
    if (!r.referrerType || !r.fullName || !r.email || !r.phone || !r.handoffPreference) {
      toast.error("Please complete all required referrer fields.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Who's referring this client?</h2>
        <p className="text-muted-foreground mt-1">
          This helps Omar credit the referral and follow up with you directly.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="I am a"
          value={r.referrerType}
          onChange={(v) => set({ referrerType: v as typeof r.referrerType })}
          options={["Referral Partner", "Licensed Agent/Advisor", "Other"]}
          required
        />
        <TextField label="Full name" value={r.fullName} onChange={(v) => set({ fullName: v })} required />
        <TextField label="Email" type="email" value={r.email} onChange={(v) => set({ email: v })} required />
        <TextField label="Phone" type="tel" value={r.phone} onChange={(v) => set({ phone: v })} required />
        <div className="md:col-span-2 space-y-2">
          <Label>Notes for Omar (optional)</Label>
          <Textarea rows={3} value={r.notes || ""} onChange={(e) => set({ notes: e.target.value })} />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Label>How would you like Omar to handle this referral? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {([
            {
              value: "Full handoff",
              title: "Full handoff",
              desc: "Omar contacts the client, presents quotes, and manages the case end-to-end.",
            },
            {
              value: "Quotes only",
              title: "Quotes only",
              desc: "Omar gathers quote options and sends them back to me — I'll present and share them with the client myself.",
            },
          ] as const).map((opt) => {
            const selected = r.handoffPreference === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => set({ handoffPreference: opt.value })}
                className={cn(
                  "text-left p-4 border rounded-lg transition-colors",
                  selected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/40"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <div className="font-semibold text-sm">{opt.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

// ---------- Step 2: Insured ----------
function Step2Insured({ data, update, onNext, onBack }: StepProps<OmarReferralFormData>) {
  const i = data.insured;
  const set = (patch: Partial<typeof i>) => update({ insured: { ...i, ...patch } });
  const quotesOnly = data.referrer.handoffPreference === "Quotes only";

  const handleNext = () => {
    if (!i.firstName || !i.lastName || !i.dateOfBirth || !i.gender || !i.stateOfResidence) {
      toast.error("Please complete all required client fields.");
      return;
    }
    if (!quotesOnly && (!i.phone || !i.email)) {
      toast.error("Client phone and email are required for full handoff.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Proposed Insured</h2>
        <p className="text-muted-foreground mt-1">Basic information about the person seeking coverage.</p>
        {quotesOnly && (
          <div className="mt-3 p-3 bg-primary/5 border border-primary/30 rounded-lg text-sm">
            Since you'll be presenting to the client, their contact info is optional — Omar will send quotes to you directly.
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="First name" value={i.firstName} onChange={(v) => set({ firstName: v })} required />
        <TextField label="Last name" value={i.lastName} onChange={(v) => set({ lastName: v })} required />
        <TextField label="Date of birth" type="date" value={i.dateOfBirth} onChange={(v) => set({ dateOfBirth: v })} required />
        <SelectField label="Gender" value={i.gender} onChange={(v) => set({ gender: v })} options={["Male", "Female", "Other"]} required />
        <SelectField label="State of residence" value={i.stateOfResidence} onChange={(v) => set({ stateOfResidence: v })} options={US_STATES} required />
        {!quotesOnly && (
          <>
            <TextField label="ZIP code" value={i.zip} onChange={(v) => set({ zip: v })} />
            <TextField label="Best phone" type="tel" value={i.phone} onChange={(v) => set({ phone: v })} required />
            <TextField label="Email" type="email" value={i.email} onChange={(v) => set({ email: v })} required />
            <SelectField label="Preferred contact method" value={i.preferredContactMethod} onChange={(v) => set({ preferredContactMethod: v })} options={["Phone call", "Text", "Email"]} />
            <SelectField label="Best time to reach" value={i.preferredContactTime} onChange={(v) => set({ preferredContactTime: v })} options={["Morning", "Afternoon", "Evening", "Anytime"]} />
          </>
        )}
        <SelectField label="Citizenship / residency" value={i.citizenshipStatus} onChange={(v) => set({ citizenshipStatus: v })} options={["US Citizen", "Permanent Resident (Green Card)", "Visa Holder", "ITIN", "Other"]} />
        {i.citizenshipStatus === "Visa Holder" && (
          <TextField label="Visa type" value={i.visaType} onChange={(v) => set({ visaType: v })} />
        )}
        {!quotesOnly && (
          <>
            <TextField label="Occupation" value={i.occupation} onChange={(v) => set({ occupation: v })} />
            <TextField label="Employer" value={i.employer} onChange={(v) => set({ employer: v })} />
            <SelectField label="Annual household income" value={i.annualIncome} onChange={(v) => set({ annualIncome: v })}
              options={["Under $50k", "$50k - $100k", "$100k - $250k", "$250k - $500k", "$500k - $1M", "$1M+"]} />
            <SelectField label="Estimated net worth" value={i.netWorth} onChange={(v) => set({ netWorth: v })}
              options={["Under $100k", "$100k - $500k", "$500k - $1M", "$1M - $5M", "$5M+"]} />
          </>
        )}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button size="lg" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

// ---------- Step 3: Coverage ----------
function Step3Coverage({ data, update, onNext, onBack }: StepProps<OmarReferralFormData>) {
  const c = data.coverage;
  const set = (patch: Partial<typeof c>) => update({ coverage: { ...c, ...patch } });

  const toggleProduct = (p: string) => {
    const list = c.productInterest || [];
    set({ productInterest: list.includes(p) ? list.filter((x) => x !== p) : [...list, p] });
  };
  const togglePurpose = (p: string) => {
    const list = c.purpose || [];
    set({ purpose: list.includes(p) ? list.filter((x) => x !== p) : [...list, p] });
  };

  const handleNext = () => {
    if (!c.productInterest?.length || !c.coverageAmount || !c.urgency) {
      toast.error("Please select product interest, coverage amount, and urgency.");
      return;
    }
    onNext();
  };

  const products = ["Term", "IUL (Indexed Universal Life)", "Whole Life", "Final Expense", "Not sure — need recommendation"];
  const purposes = ["Income replacement", "Mortgage protection", "Business / key person", "Estate planning", "Cash accumulation", "Final expense / burial", "Other"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Coverage Needs</h2>
        <p className="text-muted-foreground mt-1">Help us understand what the client is looking for.</p>
      </div>

      <div className="space-y-2">
        <Label>Product interest * (select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {products.map((p) => (
            <label key={p} className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <Checkbox checked={c.productInterest?.includes(p) || false} onCheckedChange={() => toggleProduct(p)} />
              <span className="text-sm">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Desired coverage amount" value={c.coverageAmount} onChange={(v) => set({ coverageAmount: v })} required
          options={["Under $100k", "$100k - $250k", "$250k - $500k", "$500k - $1M", "$1M - $2M", "$2M - $5M", "$5M+"]} />
        {c.productInterest?.includes("Term") && (
          <SelectField label="Term length (if term)" value={c.termLength} onChange={(v) => set({ termLength: v })}
            options={["10 years", "15 years", "20 years", "25 years", "30 years", "Not sure"]} />
        )}
        <SelectField label="Monthly budget" value={c.monthlyBudget} onChange={(v) => set({ monthlyBudget: v })}
          options={["Under $50", "$50 - $100", "$100 - $250", "$250 - $500", "$500 - $1,000", "$1,000+", "Not sure"]} />
        <SelectField label="Urgency" value={c.urgency} onChange={(v) => set({ urgency: v })} required
          options={["Within the next hour", "Same day", "Immediate (within days)", "This month", "Next 1-3 months", "Just exploring"]} />
      </div>

      <div className="space-y-2">
        <Label>Purpose of coverage (select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {purposes.map((p) => (
            <label key={p} className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <Checkbox checked={c.purpose?.includes(p) || false} onCheckedChange={() => togglePurpose(p)} />
              <span className="text-sm">{p}</span>
            </label>
          ))}
        </div>
        {c.purpose?.includes("Other") && (
          <TextField label="Please specify" value={c.purposeOther} onChange={(v) => set({ purposeOther: v })} />
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button size="lg" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

// ---------- Step 4: Health baseline ----------
function Step4Baseline({ data, update, onNext, onBack }: StepProps<OmarReferralFormData>) {
  const h = data.healthBaseline;
  const set = (patch: Partial<typeof h>) => update({ healthBaseline: { ...h, ...patch } });

  const bmi = (() => {
    const ft = parseFloat(h.heightFeet || "0");
    const inch = parseFloat(h.heightInches || "0");
    const w = parseFloat(h.weight || "0");
    const totalInches = ft * 12 + inch;
    if (!totalInches || !w) return null;
    return (703 * w) / (totalInches * totalInches);
  })();

  const handleNext = () => {
    if (!h.heightFeet || !h.heightInches || !h.weight) {
      toast.error("Please provide height and weight.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Health Baseline</h2>
        <p className="text-muted-foreground mt-1">Build & recent medical activity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SelectField label="Height (ft)" value={h.heightFeet} onChange={(v) => set({ heightFeet: v })} options={["4","5","6","7"]} required />
        <SelectField label="Height (in)" value={h.heightInches} onChange={(v) => set({ heightInches: v })} options={Array.from({length:12},(_,i)=>String(i))} required />
        <TextField label="Weight (lbs)" value={h.weight} onChange={(v) => set({ weight: v })} required />
        {bmi && (
          <div className="space-y-2">
            <Label>BMI</Label>
            <div className="h-10 px-3 flex items-center rounded-md border border-border bg-muted text-sm font-medium">
              {bmi.toFixed(1)}
            </div>
          </div>
        )}
      </div>

      <ConditionalYesNo
        idBase="weight-change"
        label="Weight change of more than 10 lbs in the past 12 months?"
        value={h.weightChange12mo}
        onChange={(v) => set({ weightChange12mo: v })}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField label="How much (lbs, + or -)" value={h.weightChangeAmount} onChange={(v) => set({ weightChangeAmount: v })} />
          <TextField label="Reason (diet, illness, medication, etc.)" value={h.weightChangeReason} onChange={(v) => set({ weightChangeReason: v })} />
        </div>
      </ConditionalYesNo>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Date of last physician visit" type="date" value={h.lastVisitDate} onChange={(v) => set({ lastVisitDate: v })} />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button size="lg" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

// ---------- Step 5: Health history (conditional) ----------
function Step5History({ data, update, onNext, onBack }: StepProps<OmarReferralFormData>) {
  const hh = data.healthHistory;
  const setHH = (patch: Partial<HealthHistory>) => update({ healthHistory: { ...hh, ...patch } });

  const updateCondition = (key: keyof HealthHistory, patch: Partial<ConditionDetail>) => {
    const current = (hh[key] as ConditionDetail) || emptyCondition();
    setHH({ [key]: { ...current, ...patch } } as Partial<HealthHistory>);
  };
  const setYesNo = (key: keyof HealthHistory, v: "Yes" | "No") => {
    const current = (hh[key] as ConditionDetail) || emptyCondition();
    setHH({ [key]: { ...current, yes: v } } as Partial<HealthHistory>);
  };
  const yn = (key: keyof HealthHistory): "Yes" | "No" | "" => {
    return ((hh[key] as ConditionDetail | undefined)?.yes as "Yes" | "No" | "") || "";
  };

  // Medications repeatable
  const meds = hh.medications || [];
  const addMed = () => setHH({ medications: [...meds, { name: "", dose: "", frequency: "", condition: "" }] });
  const updateMed = (idx: number, patch: Partial<Medication>) => {
    const next = meds.map((m, i) => i === idx ? { ...m, ...patch } : m);
    setHH({ medications: next });
  };
  const removeMed = (idx: number) => setHH({ medications: meds.filter((_, i) => i !== idx) });

  // Family history repeatable
  const fam = hh.familyHistory || [];
  const addFam = () => setHH({ familyHistory: [...fam, { relative: "", condition: "", ageAtDiagnosis: "", livingOrDeceased: "" }] });
  const updateFam = (idx: number, patch: Partial<FamilyHistoryEntry>) => {
    const next = fam.map((f, i) => i === idx ? { ...f, ...patch } : f);
    setHH({ familyHistory: next });
  };
  const removeFam = (idx: number) => setHH({ familyHistory: fam.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Health History</h2>
        <p className="text-muted-foreground mt-1">
          Answer yes or no. If yes, please provide details — accuracy speeds up quoting.
        </p>
      </div>

      {/* Cardiovascular */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Cardiovascular</h3>
        {CARDIAC_CONDITIONS.map(({ key, label }) => (
          <ConditionalYesNo
            key={key as string}
            idBase={key as string}
            label={label}
            value={yn(key)}
            onChange={(v) => setYesNo(key, v)}
          >
            <ConditionDetailFields
              value={(hh[key] as ConditionDetail) || emptyCondition()}
              onChange={(patch) => updateCondition(key, patch)}
            />
          </ConditionalYesNo>
        ))}
      </section>

      {/* Cancer */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Cancer</h3>
        <ConditionalYesNo idBase="cancer" label="Ever diagnosed with cancer (other than basal-cell skin)?" value={yn("cancer")} onChange={(v) => setYesNo("cancer", v)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField label="Type / site" value={(hh.cancer as HealthHistory["cancer"])?.type} onChange={(v) => setHH({ cancer: { ...(hh.cancer || emptyCondition()), type: v } })} />
            <SelectField label="Stage" value={(hh.cancer as HealthHistory["cancer"])?.stage} onChange={(v) => setHH({ cancer: { ...(hh.cancer || emptyCondition()), stage: v } })} options={["Stage I","Stage II","Stage III","Stage IV","Unknown"]} />
            <TextField label="Treatment" value={(hh.cancer as ConditionDetail)?.details} onChange={(v) => updateCondition("cancer", { details: v })} className="md:col-span-2" />
            <TextField label="Date of diagnosis" value={(hh.cancer as ConditionDetail)?.diagnosisDate} onChange={(v) => updateCondition("cancer", { diagnosisDate: v })} />
            <TextField label="Remission date (if applicable)" value={(hh.cancer as HealthHistory["cancer"])?.remissionDate} onChange={(v) => setHH({ cancer: { ...(hh.cancer || emptyCondition()), remissionDate: v } })} />
          </div>
        </ConditionalYesNo>
      </section>

      {/* Endocrine */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Endocrine</h3>
        <ConditionalYesNo idBase="diabetes" label="Diabetes" value={yn("diabetes")} onChange={(v) => setYesNo("diabetes", v)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectField label="Type" value={(hh.diabetes as HealthHistory["diabetes"])?.diabetesType} onChange={(v) => setHH({ diabetes: { ...(hh.diabetes || emptyCondition()), diabetesType: v } })} options={["Type 1","Type 2","Gestational","Pre-diabetes"]} />
            <TextField label="Most recent A1C" value={(hh.diabetes as HealthHistory["diabetes"])?.a1c} onChange={(v) => setHH({ diabetes: { ...(hh.diabetes || emptyCondition()), a1c: v } })} placeholder="e.g. 6.8" />
            <SelectField label="On insulin?" value={(hh.diabetes as HealthHistory["diabetes"])?.onInsulin} onChange={(v) => setHH({ diabetes: { ...(hh.diabetes || emptyCondition()), onInsulin: v } })} options={["No","Yes"]} />
            <TextField label="Year diagnosed" value={(hh.diabetes as ConditionDetail)?.diagnosisDate} onChange={(v) => updateCondition("diabetes", { diagnosisDate: v })} />
            <TextField label="Medications" value={(hh.diabetes as ConditionDetail)?.medications} onChange={(v) => updateCondition("diabetes", { medications: v })} className="md:col-span-2" />
          </div>
        </ConditionalYesNo>
        <ConditionalYesNo idBase="thyroid" label="Thyroid condition" value={yn("thyroid")} onChange={(v) => setYesNo("thyroid", v)}>
          <ConditionDetailFields value={(hh.thyroid as ConditionDetail) || emptyCondition()} onChange={(p) => updateCondition("thyroid", p)} />
        </ConditionalYesNo>
      </section>

      {/* Respiratory */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Respiratory</h3>
        {RESPIRATORY_CONDITIONS.map(({ key, label }) => (
          <ConditionalYesNo key={key as string} idBase={key as string} label={label} value={yn(key)} onChange={(v) => setYesNo(key, v)}>
            <ConditionDetailFields value={(hh[key] as ConditionDetail) || emptyCondition()} onChange={(p) => updateCondition(key, p)} />
          </ConditionalYesNo>
        ))}
        <ConditionalYesNo idBase="sleepApnea" label="Sleep apnea" value={yn("sleepApnea")} onChange={(v) => setYesNo("sleepApnea", v)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectField label="Uses CPAP?" value={(hh.sleepApnea as HealthHistory["sleepApnea"])?.usesCpap} onChange={(v) => setHH({ sleepApnea: { ...(hh.sleepApnea || emptyCondition()), usesCpap: v } })} options={["Yes","No"]} />
            <SelectField label="CPAP compliant?" value={(hh.sleepApnea as HealthHistory["sleepApnea"])?.compliant} onChange={(v) => setHH({ sleepApnea: { ...(hh.sleepApnea || emptyCondition()), compliant: v } })} options={["Yes","No","N/A"]} />
            <TextField label="Diagnosed" value={(hh.sleepApnea as ConditionDetail)?.diagnosisDate} onChange={(v) => updateCondition("sleepApnea", { diagnosisDate: v })} />
          </div>
        </ConditionalYesNo>
      </section>

      {/* Neurological */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Neurological</h3>
        {NEURO_CONDITIONS.map(({ key, label }) => (
          <ConditionalYesNo key={key as string} idBase={key as string} label={label} value={yn(key)} onChange={(v) => setYesNo(key, v)}>
            <ConditionDetailFields value={(hh[key] as ConditionDetail) || emptyCondition()} onChange={(p) => updateCondition(key, p)} />
          </ConditionalYesNo>
        ))}
      </section>

      {/* Mental health */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Mental Health</h3>
        {MENTAL_CONDITIONS.map(({ key, label }) => (
          <ConditionalYesNo key={key as string} idBase={key as string} label={label} value={yn(key)} onChange={(v) => setYesNo(key, v)}>
            <ConditionDetailFields value={(hh[key] as ConditionDetail) || emptyCondition()} onChange={(p) => updateCondition(key, p)} />
          </ConditionalYesNo>
        ))}
        <ConditionalYesNo idBase="mental-hosp" label="Ever hospitalized for a mental health condition?" value={hh.mentalHospitalization} onChange={(v) => setHH({ mentalHospitalization: v })}>
          <Textarea rows={2} placeholder="When, where, reason" value={hh.mentalHospitalizationDetails || ""} onChange={(e) => setHH({ mentalHospitalizationDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="suicide" label="Any history of suicide attempt or self-harm?" value={hh.suicideAttempt} onChange={(v) => setHH({ suicideAttempt: v })}>
          <Textarea rows={2} placeholder="Date, current status, treatment" value={hh.suicideAttemptDetails || ""} onChange={(e) => setHH({ suicideAttemptDetails: e.target.value })} />
        </ConditionalYesNo>
      </section>

      {/* Substance use */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Substance Use</h3>
        <ConditionalYesNo idBase="alcohol" label="Does the client drink alcohol?" value={hh.alcohol?.uses} onChange={(v) => setHH({ alcohol: { ...(hh.alcohol || {}), uses: v } })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField label="Drinks per week (average)" value={hh.alcohol?.drinksPerWeek} onChange={(v) => setHH({ alcohol: { ...(hh.alcohol || {}), drinksPerWeek: v } })} />
            <SelectField label="Ever received treatment for alcohol?" value={hh.alcohol?.everTreatment} onChange={(v) => setHH({ alcohol: { ...(hh.alcohol || {}), everTreatment: v as "Yes" | "No" } })} options={["No","Yes"]} />
            {hh.alcohol?.everTreatment === "Yes" && (
              <TextField label="Treatment details" value={hh.alcohol?.treatmentDetails} onChange={(v) => setHH({ alcohol: { ...(hh.alcohol || {}), treatmentDetails: v } })} className="md:col-span-2" />
            )}
            <SelectField label="DUI/DWI history?" value={hh.alcohol?.duiHistory} onChange={(v) => setHH({ alcohol: { ...(hh.alcohol || {}), duiHistory: v as "Yes" | "No" } })} options={["No","Yes"]} />
            {hh.alcohol?.duiHistory === "Yes" && (
              <TextField label="DUI dates & details" value={hh.alcohol?.duiDetails} onChange={(v) => setHH({ alcohol: { ...(hh.alcohol || {}), duiDetails: v } })} className="md:col-span-2" />
            )}
          </div>
        </ConditionalYesNo>
        <ConditionalYesNo idBase="drugs" label="Any recreational or illegal drug use?" value={hh.drugs?.uses} onChange={(v) => setHH({ drugs: { ...(hh.drugs || {}), uses: v } })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField label="Substance(s)" value={hh.drugs?.substances} onChange={(v) => setHH({ drugs: { ...(hh.drugs || {}), substances: v } })} />
            <TextField label="Date of last use" value={hh.drugs?.lastUse} onChange={(v) => setHH({ drugs: { ...(hh.drugs || {}), lastUse: v } })} />
            <SelectField label="Ever received treatment?" value={hh.drugs?.treatment} onChange={(v) => setHH({ drugs: { ...(hh.drugs || {}), treatment: v as "Yes" | "No" } })} options={["No","Yes"]} />
            {hh.drugs?.treatment === "Yes" && (
              <TextField label="Treatment details" value={hh.drugs?.treatmentDetails} onChange={(v) => setHH({ drugs: { ...(hh.drugs || {}), treatmentDetails: v } })} className="md:col-span-2" />
            )}
          </div>
        </ConditionalYesNo>
      </section>

      {/* Other */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Other Conditions</h3>
        {OTHER_CONDITIONS.map(({ key, label }) => (
          <ConditionalYesNo key={key as string} idBase={key as string} label={label} value={yn(key)} onChange={(v) => setYesNo(key, v)}>
            <ConditionDetailFields value={(hh[key] as ConditionDetail) || emptyCondition()} onChange={(p) => updateCondition(key, p)} />
          </ConditionalYesNo>
        ))}
        <ConditionalYesNo idBase="hepatitis" label="Hepatitis" value={yn("hepatitis")} onChange={(v) => setYesNo("hepatitis", v)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectField label="Type" value={(hh.hepatitis as HealthHistory["hepatitis"])?.hepType} onChange={(v) => setHH({ hepatitis: { ...(hh.hepatitis || emptyCondition()), hepType: v } })} options={["Hepatitis A","Hepatitis B","Hepatitis C","Unknown"]} />
            <TextField label="Diagnosed" value={(hh.hepatitis as ConditionDetail)?.diagnosisDate} onChange={(v) => updateCondition("hepatitis", { diagnosisDate: v })} />
            <TextField label="Current treatment" value={(hh.hepatitis as ConditionDetail)?.medications} onChange={(v) => updateCondition("hepatitis", { medications: v })} className="md:col-span-2" />
          </div>
        </ConditionalYesNo>
      </section>

      {/* Medications list */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Current Medications</h3>
        <p className="text-sm text-muted-foreground">List all prescription medications the client is currently taking.</p>
        {meds.map((m, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end p-3 border border-border rounded-lg">
            <TextField label="Name" value={m.name} onChange={(v) => updateMed(idx, { name: v })} />
            <TextField label="Dose" value={m.dose} onChange={(v) => updateMed(idx, { dose: v })} />
            <TextField label="Frequency" value={m.frequency} onChange={(v) => updateMed(idx, { frequency: v })} />
            <div className="flex gap-2">
              <TextField label="Condition" value={m.condition} onChange={(v) => updateMed(idx, { condition: v })} className="flex-1" />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeMed(idx)} className="mb-0.5"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addMed}><Plus className="w-4 h-4 mr-1" />Add medication</Button>
      </section>

      {/* Family history */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Family History</h3>
        <p className="text-sm text-muted-foreground">Parents or siblings with cancer, heart disease, stroke, or diabetes diagnosed before age 60.</p>
        {fam.map((f, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end p-3 border border-border rounded-lg">
            <SelectField label="Relative" value={f.relative} onChange={(v) => updateFam(idx, { relative: v })} options={["Mother","Father","Sister","Brother","Other"]} />
            <TextField label="Condition" value={f.condition} onChange={(v) => updateFam(idx, { condition: v })} />
            <TextField label="Age at diagnosis" value={f.ageAtDiagnosis} onChange={(v) => updateFam(idx, { ageAtDiagnosis: v })} />
            <div className="flex gap-2">
              <SelectField label="Status" value={f.livingOrDeceased} onChange={(v) => updateFam(idx, { livingOrDeceased: v })} options={["Living","Deceased"]} className="flex-1" />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeFam(idx)} className="mb-0.5"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addFam}><Plus className="w-4 h-4 mr-1" />Add family history</Button>
      </section>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button size="lg" onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}

// ---------- Step 6: Lifestyle & risk ----------
function Step6Lifestyle({ data, update, onNext, onBack }: StepProps<OmarReferralFormData>) {
  const l = data.lifestyle;
  const set = (patch: Partial<typeof l>) => update({ lifestyle: { ...l, ...patch } });

  const toggleTobacco = (t: string) => {
    const list = l.tobaccoTypes || [];
    set({ tobaccoTypes: list.includes(t) ? list.filter((x) => x !== t) : [...list, t] });
  };

  const handleNext = () => {
    if (!l.tobaccoUse) {
      toast.error("Please answer the tobacco use question.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Lifestyle & Risk</h2>
        <p className="text-muted-foreground mt-1">Habits, driving, legal, and hazardous activities.</p>
      </div>

      {/* Tobacco */}
      <ConditionalYesNo idBase="tobacco" label="Tobacco or nicotine use in the past 5 years?" value={l.tobaccoUse} onChange={(v) => set({ tobaccoUse: v })}>
        <div className="space-y-3">
          <div>
            <Label>Type(s)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {["Cigarettes","Cigars","Pipe","Vape / e-cig","Chew / dip","Nicotine gum / patch"].map((t) => (
                <label key={t} className="flex items-center gap-2 p-2 border border-border rounded cursor-pointer">
                  <Checkbox checked={l.tobaccoTypes?.includes(t) || false} onCheckedChange={() => toggleTobacco(t)} />
                  <span className="text-sm">{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TextField label="Frequency" value={l.tobaccoFrequency} onChange={(v) => set({ tobaccoFrequency: v })} placeholder="e.g. 1 pack/day" />
            <TextField label="Date of last use" value={l.tobaccoLastUse} onChange={(v) => set({ tobaccoLastUse: v })} placeholder="mo/yr" />
            <TextField label="Quit date (if quit)" value={l.tobaccoQuitDate} onChange={(v) => set({ tobaccoQuitDate: v })} placeholder="mo/yr" />
          </div>
        </div>
      </ConditionalYesNo>

      {/* Marijuana */}
      <ConditionalYesNo idBase="marijuana" label="Marijuana / cannabis use?" value={l.marijuanaUse} onChange={(v) => set({ marijuanaUse: v })}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <SelectField label="Medical or recreational?" value={l.marijuanaMedicalRec} onChange={(v) => set({ marijuanaMedicalRec: v })} options={["Medical","Recreational","Both"]} />
          <TextField label="Frequency" value={l.marijuanaFrequency} onChange={(v) => set({ marijuanaFrequency: v })} placeholder="e.g. 2x/week" />
          <SelectField label="Route" value={l.marijuanaRoute} onChange={(v) => set({ marijuanaRoute: v })} options={["Smoke","Vape","Edible","Other"]} />
        </div>
      </ConditionalYesNo>

      {/* Driving */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Driving Record (past 5 years)</h3>
        <ConditionalYesNo idBase="dui" label="Any DUI/DWI convictions?" value={l.duiHistory} onChange={(v) => set({ duiHistory: v })}>
          <Textarea rows={2} placeholder="Date(s), state, resolution" value={l.duiDetails || ""} onChange={(e) => set({ duiDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="reckless" label="Any reckless driving convictions?" value={l.recklessDriving} onChange={(v) => set({ recklessDriving: v })}>
          <Textarea rows={2} placeholder="Details" value={l.recklessDetails || ""} onChange={(e) => set({ recklessDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="suspend" label="License suspended or revoked?" value={l.licenseSuspended} onChange={(v) => set({ licenseSuspended: v })}>
          <Textarea rows={2} placeholder="When, reason" value={l.suspendedDetails || ""} onChange={(e) => set({ suspendedDetails: e.target.value })} />
        </ConditionalYesNo>
        <TextField label="Number of moving violations (past 5 yr)" value={l.movingViolations5yr} onChange={(v) => set({ movingViolations5yr: v })} />
      </section>

      {/* Legal */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Legal</h3>
        <ConditionalYesNo idBase="felony" label="Any felony or misdemeanor convictions?" value={l.felonyMisdemeanor} onChange={(v) => set({ felonyMisdemeanor: v })}>
          <Textarea rows={2} placeholder="Charge, date, disposition" value={l.felonyDetails || ""} onChange={(e) => set({ felonyDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="probation" label="Currently on probation or pending charges?" value={l.probationOrPending} onChange={(v) => set({ probationOrPending: v })}>
          <Textarea rows={2} placeholder="Details" value={l.probationDetails || ""} onChange={(e) => set({ probationDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="bankruptcy" label="Bankruptcy in past 7 years?" value={l.bankruptcy7yr} onChange={(v) => set({ bankruptcy7yr: v })}>
          <TextField label="Discharge date" value={l.bankruptcyDischargeDate} onChange={(v) => set({ bankruptcyDischargeDate: v })} />
        </ConditionalYesNo>
      </section>

      {/* Hazardous activities */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Hazardous Activities</h3>
        <ConditionalYesNo idBase="aviation" label="Private aviation (pilot or crew)?" value={l.aviation} onChange={(v) => set({ aviation: v })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField label="Total flight hours" value={l.aviationHours} onChange={(v) => set({ aviationHours: v })} />
            <TextField label="Ratings held" value={l.aviationRatings} onChange={(v) => set({ aviationRatings: v })} placeholder="e.g. PPL, IFR, ATP" />
          </div>
        </ConditionalYesNo>
        <ConditionalYesNo idBase="scuba" label="Scuba diving?" value={l.scuba} onChange={(v) => set({ scuba: v })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField label="Max depth (ft)" value={l.scubaMaxDepth} onChange={(v) => set({ scubaMaxDepth: v })} />
            <TextField label="Dives per year" value={l.scubaDivesPerYear} onChange={(v) => set({ scubaDivesPerYear: v })} />
          </div>
        </ConditionalYesNo>
        <ConditionalYesNo idBase="racing" label="Motor / vehicle racing?" value={l.racing} onChange={(v) => set({ racing: v })}>
          <Textarea rows={2} placeholder="Type, frequency, professional/amateur" value={l.racingDetails || ""} onChange={(e) => set({ racingDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="climbing" label="Mountain / rock climbing?" value={l.climbing} onChange={(v) => set({ climbing: v })}>
          <Textarea rows={2} placeholder="Type, elevation, frequency" value={l.climbingDetails || ""} onChange={(e) => set({ climbingDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="skydiving" label="Skydiving?" value={l.skydiving} onChange={(v) => set({ skydiving: v })}>
          <Textarea rows={2} placeholder="Jumps per year, licenses" value={l.skydivingDetails || ""} onChange={(e) => set({ skydivingDetails: e.target.value })} />
        </ConditionalYesNo>
        <ConditionalYesNo idBase="base" label="BASE jumping?" value={l.baseJumping} onChange={(v) => set({ baseJumping: v })} />
        <ConditionalYesNo idBase="mma" label="MMA / competitive fighting?" value={l.mma} onChange={(v) => set({ mma: v })} />
        <TextField label="Other hazardous activities (optional)" value={l.otherHazardous} onChange={(v) => set({ otherHazardous: v })} />
      </section>

      {/* Foreign travel & military */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Foreign Travel & Military</h3>
        <ConditionalYesNo idBase="foreign" label="Any foreign travel or residence in the next 12 months?" value={l.foreignTravel12mo} onChange={(v) => set({ foreignTravel12mo: v })}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TextField label="Countries" value={l.foreignTravelCountries} onChange={(v) => set({ foreignTravelCountries: v })} />
            <TextField label="Duration" value={l.foreignTravelDuration} onChange={(v) => set({ foreignTravelDuration: v })} />
            <TextField label="Purpose" value={l.foreignTravelPurpose} onChange={(v) => set({ foreignTravelPurpose: v })} />
          </div>
        </ConditionalYesNo>
        <SelectField label="Military status" value={l.militaryStatus} onChange={(v) => set({ militaryStatus: v })} options={["Not military","Active duty","Reserve / National Guard","Veteran"]} />
        <ConditionalYesNo idBase="deploy" label="Any pending deployment orders?" value={l.deploymentPlans} onChange={(v) => set({ deploymentPlans: v })}>
          <Textarea rows={2} placeholder="Where, when" value={l.deploymentDetails || ""} onChange={(e) => set({ deploymentDetails: e.target.value })} />
        </ConditionalYesNo>
      </section>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button size="lg" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

// ---------- Step 7: Review & submit ----------
function Step7Review({
  data, update, onBack, onSubmit, goToStep, isSubmitting,
}: {
  data: OmarReferralFormData;
  update: (patch: Partial<OmarReferralFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  goToStep: (n: number) => void;
  isSubmitting: boolean;
}) {
  const c = data.consent;
  const setC = (patch: Partial<typeof c>) => update({ consent: { ...c, ...patch } });

  const yesConditions = (Object.entries(data.healthHistory) as [string, unknown][])
    .filter(([, v]) => v && typeof v === "object" && (v as ConditionDetail).yes === "Yes")
    .map(([k]) => k);

  const handleSubmit = () => {
    if (!c.consent) { toast.error("Please agree to the consent statement."); return; }
    if (!c.signature) { toast.error("Please type your electronic signature."); return; }
    onSubmit();
  };

  const Section = ({ title, step, children }: { title: string; step: number; children: React.ReactNode }) => (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-primary">{title}</h3>
        <Button variant="ghost" size="sm" onClick={() => goToStep(step)}>Edit</Button>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Submit</h2>
        <p className="text-muted-foreground mt-1">Please review before submitting to Omar Sanchez.</p>
      </div>

      <Section title="Referrer" step={1}>
        <p className="text-sm">
          {data.referrer.fullName} ({data.referrer.referrerType || "—"})<br />
          {data.referrer.email} · {data.referrer.phone}
        </p>
        <p className="text-sm mt-2">
          <span className="font-semibold text-primary">Handoff:</span>{" "}
          {data.referrer.handoffPreference === "Quotes only"
            ? "Quotes only — referrer will present to client"
            : data.referrer.handoffPreference === "Full handoff"
            ? "Full handoff — Omar contacts the client"
            : "—"}
        </p>
      </Section>
      <Section title="Proposed Insured" step={2}>
        <p className="text-sm">{data.insured.firstName} {data.insured.lastName} · DOB {data.insured.dateOfBirth}<br />{data.insured.stateOfResidence} · {data.insured.email} · {data.insured.phone}</p>
      </Section>
      <Section title="Coverage" step={3}>
        <p className="text-sm">{data.coverage.productInterest?.join(", ") || "—"} · {data.coverage.coverageAmount || "—"} · {data.coverage.urgency || "—"}</p>
      </Section>
      <Section title="Health Baseline" step={4}>
        <p className="text-sm">{data.healthBaseline.heightFeet}'{data.healthBaseline.heightInches}" · {data.healthBaseline.weight} lbs</p>
      </Section>
      <Section title="Health History – Yes flags" step={5}>
        <p className="text-sm">{yesConditions.length ? yesConditions.join(", ") : "None flagged"}</p>
        <p className="text-sm text-muted-foreground mt-1">{data.healthHistory.medications?.length || 0} medication(s), {data.healthHistory.familyHistory?.length || 0} family entry(ies)</p>
      </Section>
      <Section title="Lifestyle" step={6}>
        <p className="text-sm">Tobacco: {data.lifestyle.tobaccoUse || "—"} · Marijuana: {data.lifestyle.marijuanaUse || "—"} · DUI: {data.lifestyle.duiHistory || "—"}</p>
      </Section>

      <div className="border border-primary/40 bg-primary/5 rounded-lg p-4 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox checked={c.consent || false} onCheckedChange={(v) => setC({ consent: !!v })} className="mt-1" />
          <span className="text-sm">
            I confirm the information provided is accurate to the best of my knowledge.
          </span>
        </label>
        <SmsConsentCheckbox
          checked={c.smsConsent || false}
          onChange={(v) => setC({ smsConsent: v, smsConsentTextVersion: v ? SMS_CONSENT_TEXT_VERSION : undefined })}
        />
        <TextField label="Electronic signature (type full name)" value={c.signature} onChange={(v) => setC({ signature: v, signedDate: new Date().toISOString() })} required />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>Back</Button>
        <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : "Submit to Omar"}
        </Button>
      </div>
    </div>
  );
}

// ---------- Progress bar ----------
function ProgressBar({ currentStep, completedSteps }: { currentStep: number; completedSteps: number[] }) {
  return (
    <div className="w-full py-4">
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-border" />
        <div className="absolute left-0 top-5 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (OMAR_REFERRAL_STEPS.length - 1)) * 100}%` }} />
        {OMAR_REFERRAL_STEPS.map((s) => {
          const done = completedSteps.includes(s.number);
          const current = currentStep === s.number;
          return (
            <div key={s.number} className="flex flex-col items-center relative z-10">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all",
                done ? "bg-primary border-primary text-primary-foreground"
                : current ? "bg-background border-primary text-primary"
                : "bg-background border-muted-foreground/30 text-muted-foreground"
              )}>
                {done ? <Check className="w-5 h-5" /> : s.number}
              </div>
              <span className={cn("mt-2 text-xs font-medium text-center max-w-[80px]",
                current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground")}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {OMAR_REFERRAL_STEPS.length}</span>
          <span className="text-sm text-muted-foreground">{OMAR_REFERRAL_STEPS[currentStep - 1]?.title}</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(currentStep / OMAR_REFERRAL_STEPS.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

// ---------- Main wizard ----------
export default function OmarReferralWizard({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [formData, setFormData] = useState<OmarReferralFormData>(defaultOmarReferralData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();

  // Load draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({ ...defaultOmarReferralData, ...parsed.formData });
        setStep(parsed.step || 1);
        setCompleted(parsed.completed || []);
        toast.info("Draft restored", { description: "Your previous progress was loaded." });
      }
    } catch (e) { console.error("load draft failed", e); }
  }, []);

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step, completed, savedAt: new Date().toISOString() }));
    } catch (e) { console.error("save failed", e); }
  }, [formData, step, completed]);

  const update = (patch: Partial<OmarReferralFormData>) => setFormData((prev) => ({ ...prev, ...patch }));

  const nextStep = () => {
    setCompleted((prev) => [...new Set([...prev, step])]);
    setStep((s) => Math.min(s + 1, 7));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const backStep = () => { setStep((s) => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goToStep = (n: number) => { setStep(Math.max(1, Math.min(7, n))); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleSubmit = async () => {
    if (isBot()) { toast.success("Submitted"); return; } // silently reject
    setIsSubmitting(true);
    try {
      const applicantName = `${formData.insured.firstName || ""} ${formData.insured.lastName || ""}`.trim() || "Referral Client";
      const applicantEmail = formData.insured.email || formData.referrer.email || "";
      const applicantPhone = formData.insured.phone || formData.referrer.phone || "";

      const submissionId = generateUUID();
      const finalData = { ...formData, submissionId };

      const { error: dbError } = await supabase
        .from("prequalification_applications" as never)
        .insert({
          status: "submitted",
          advisor_id: "omar-sanchez",
          advisor_name: "Omar Sanchez",
          advisor_email: "omar@tfainsuranceadvisors.com",
          applicant_name: applicantName,
          applicant_email: applicantEmail,
          applicant_phone: applicantPhone,
          form_data: finalData,
          current_step: 7,
          source_url: window.location.href,
          submitted_at: new Date().toISOString(),
        } as never);

      if (dbError) throw new Error(dbError.message);

      const notifyPromise = supabase.functions.invoke("send-prequalification-notification", {
        body: {
          applicantName,
          applicantEmail,
          applicantPhone,
          formData: finalData,
          advisorId: "omar-sanchez",
          advisorName: "Omar Sanchez",
          advisorEmail: "omar@tfainsuranceadvisors.com",
          sourceUrl: window.location.href,
        },
      });
      await Promise.race([
        notifyPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Notification timeout")), 15000)),
      ]).catch((err) => console.warn("Notification warning (non-blocking):", err));

      localStorage.removeItem(STORAGE_KEY);
      toast.success("Submitted!", { description: "Omar will review this referral shortly." });
      onComplete?.();
    } catch (e) {
      console.error("Submit error:", e);
      toast.error("Submission failed", { description: "Please try again or contact support." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <ProgressBar currentStep={step} completedSteps={completed} />
      <div className="mt-8">
        {step === 1 && <Step1Referrer data={formData} update={update} onNext={nextStep} />}
        {step === 2 && <Step2Insured data={formData} update={update} onNext={nextStep} onBack={backStep} />}
        {step === 3 && <Step3Coverage data={formData} update={update} onNext={nextStep} onBack={backStep} />}
        {step === 4 && <Step4Baseline data={formData} update={update} onNext={nextStep} onBack={backStep} />}
        {step === 5 && <Step5History data={formData} update={update} onNext={nextStep} onBack={backStep} />}
        {step === 6 && <Step6Lifestyle data={formData} update={update} onNext={nextStep} onBack={backStep} />}
        {step === 7 && (
          <Step7Review data={formData} update={update} onBack={backStep} onSubmit={handleSubmit} goToStep={goToStep} isSubmitting={isSubmitting} />
        )}
      </div>
      {/* Honeypot */}
      <input type="text" {...honeypotProps} className={honeypotClassName} name="website" />
    </div>
  );
}