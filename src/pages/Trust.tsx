import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Plus, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { useAttribution, notifyLead, saveLeadProgress } from "@/hooks/useLeads";
import { SEOHead } from "@/components/seo";

const TOTAL_STEPS = 8;
const LS_KEY = "tfa_trust_lead_id";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const MARITAL = ["Single", "Married", "Domestic partner", "Divorced", "Widowed"];
const TITLE_HELD = ["Sole", "Joint tenants", "Community property", "Tenants in common", "Already in a trust", "Not sure"];
const ACCOUNT_CATEGORIES = ["Bank", "Brokerage", "Retirement (401k/IRA)", "Life insurance", "Business interests", "Crypto"];
const AMOUNT_RANGES = ["Under $25k", "$25k – $100k", "$100k – $500k", "$500k – $1M", "Over $1M", "Not sure"];
const DISTRIBUTION = [
  { value: "equal", label: "Equal split among children/beneficiaries" },
  { value: "staggered", label: "Staggered by age (e.g. some now, more at 25/30)" },
  { value: "specific", label: "Specific bequests to specific people" },
  { value: "unsure", label: "Not sure yet — I want guidance" },
];

type Child = { name: string; dob: string; is_minor: boolean; prior_relationship: boolean };
type Property = { address: string; value: string; mortgage: string; title_held: string };
type Person = { name: string; relationship: string; phone: string; email: string };
type AccountEntry = { category: string; amount: string };

type FormState = {
  // Step 1
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  marital_status: string;
  // Step 2
  spouse_name: string;
  spouse_dob: string;
  trust_type: string; // joint | separate
  // Step 3
  children: Child[];
  // Step 4
  properties: Property[];
  // Step 5
  accounts: AccountEntry[];
  // Step 6
  trustee_primary: Person;
  trustee_alternate: Person;
  // Step 7
  guardian_primary: Person;
  guardian_alternate: Person;
  // Step 8
  distribution: string;
  notes: string;
};

const emptyPerson = (): Person => ({ name: "", relationship: "", phone: "", email: "" });

const initialState = (): FormState => ({
  first_name: "", last_name: "", email: "", phone: "", state: "", marital_status: "",
  spouse_name: "", spouse_dob: "", trust_type: "",
  children: [],
  properties: [],
  accounts: [],
  trustee_primary: emptyPerson(),
  trustee_alternate: emptyPerson(),
  guardian_primary: emptyPerson(),
  guardian_alternate: emptyPerson(),
  distribution: "",
  notes: "",
});

const Trust = () => {
  const attr = useAttribution();
  const { honeypotProps, isBot } = useHoneypot();
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [resumePrompt, setResumePrompt] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const existing = localStorage.getItem(LS_KEY);
    if (existing) setResumePrompt(existing);
  }, []);

  const hasMinorChildren = useMemo(
    () => form.children.some((c) => c.is_minor),
    [form.children],
  );

  const needsSpouseStep = form.marital_status === "Married" || form.marital_status === "Domestic partner";

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const patch = (updates: Partial<FormState>) => setForm((f) => ({ ...f, ...updates }));

  const buildPayload = (): Record<string, unknown> => ({
    marital_status: form.marital_status,
    spouse: needsSpouseStep
      ? { name: form.spouse_name, dob: form.spouse_dob, trust_type: form.trust_type }
      : null,
    children: form.children,
    properties: form.properties,
    accounts: form.accounts,
    trustee_primary: form.trustee_primary,
    trustee_alternate: form.trustee_alternate,
    guardian_primary: hasMinorChildren ? form.guardian_primary : null,
    guardian_alternate: hasMinorChildren ? form.guardian_alternate : null,
    distribution: form.distribution,
    notes: form.notes,
  });

  const persistStep1 = async () => {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        funnel: "trust",
        status: "new",
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        state: form.state,
        is_complete: false,
        last_step: 1,
        referral_source: attr.referral_source ?? "minh",
        utm_source: attr.utm_source,
        utm_medium: attr.utm_medium,
        utm_campaign: attr.utm_campaign,
        landing_page: attr.landing_page,
        user_agent: attr.user_agent,
        payload: { marital_status: form.marital_status },
      })
      .select("id")
      .single();
    if (error) throw error;
    localStorage.setItem(LS_KEY, data.id);
    setLeadId(data.id);
    return data.id;
  };

  const next = async () => {
    if (isBot()) return;

    // Step-specific validation
    if (step === 1) {
      if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.state || !form.marital_status) {
        toast.error("Please complete every field.");
        return;
      }
    }

    setSaving(true);
    try {
      let id = leadId;
      if (step === 1 && !id) {
        id = await persistStep1();
      } else if (id) {
        await saveLeadProgress({
          lead_id: id,
          last_step: step,
          payload: buildPayload(),
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          state: form.state,
        });
      }

      // Auto-skip conditional steps
      let nextStep = step + 1;
      if (nextStep === 2 && !needsSpouseStep) nextStep = 3;
      if (nextStep === 7 && !hasMinorChildren) nextStep = 8;
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      toast.error("Could not save progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const back = () => {
    let prev = step - 1;
    if (prev === 7 && !hasMinorChildren) prev = 6;
    if (prev === 2 && !needsSpouseStep) prev = 1;
    setStep(Math.max(1, prev));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finalize = async () => {
    if (!leadId) return;
    setSaving(true);
    try {
      await saveLeadProgress({
        lead_id: leadId,
        last_step: TOTAL_STEPS,
        payload: buildPayload(),
        is_complete: true,
      });
      await notifyLead(leadId);
      localStorage.removeItem(LS_KEY);
      setCompleted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      toast.error("Could not submit. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const resumeExisting = () => {
    if (resumePrompt) setLeadId(resumePrompt);
    setResumePrompt(null);
  };
  const startFresh = () => {
    localStorage.removeItem(LS_KEY);
    setResumePrompt(null);
  };

  if (completed) {
    return (
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-navy mb-3">Thank you.</h1>
          <p className="text-muted-foreground mb-2">
            We've received your information. A licensed advisor from The Financial Architects will reach out within one business day
            to walk you through what a living trust would look like for your family.
          </p>
          <p className="text-sm text-muted-foreground">
            If you'd like to reach us sooner, email{" "}
            <a href="mailto:leads@tfainsuranceadvisors.com" className="text-accent">
              leads@tfainsuranceadvisors.com
            </a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Living Trust Starter Intake | The Financial Architects"
        description="A guided intake to help our licensed advisors prepare for your living trust conversation. No account numbers required. Takes about 10 minutes."
        canonical="/trust"
      />

      <section className="py-10 md:py-16 bg-gradient-to-br from-navy to-navy/90 text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Living Trust Starter Intake</h1>
          <p className="text-white/85 text-sm md:text-base">
            About 10 minutes. You can stop and come back — we'll save your place.
          </p>
          <div className="mt-4 flex items-center gap-2 justify-center text-xs text-white/70">
            <Info className="h-3.5 w-3.5" />
            This is an information-gathering worksheet. It is not legal advice and does not create a trust.
          </div>
        </div>
      </section>

      <section className="py-8 md:py-14 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-xl">
          {resumePrompt && step === 1 && (
            <div className="mb-6 p-4 rounded-lg border bg-accent/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm">
                <p className="font-medium text-navy">Pick up where you left off?</p>
                <p className="text-muted-foreground text-xs">We saved your progress on this device.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={startFresh}>Start over</Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-navy" onClick={resumeExisting}>Resume</Button>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Step {step} of {TOTAL_STEPS}</span>
              <span>{progress}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <input {...honeypotProps} className={honeypotClassName} name="website" />

          <div className="space-y-5">
            {step === 1 && (
              <StepCard title="About you">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name">
                    <Input value={form.first_name} onChange={(e) => patch({ first_name: e.target.value })} autoComplete="given-name" required />
                  </Field>
                  <Field label="Last name">
                    <Input value={form.last_name} onChange={(e) => patch({ last_name: e.target.value })} autoComplete="family-name" required />
                  </Field>
                </div>
                <Field label="Email">
                  <Input type="email" autoComplete="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} required />
                </Field>
                <Field label="Phone">
                  <Input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} required />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="State of residence">
                    <Select value={form.state} onValueChange={(v) => patch({ state: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="Marital status">
                    <Select value={form.marital_status} onValueChange={(v) => patch({ marital_status: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{MARITAL.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                </div>
              </StepCard>
            )}

            {step === 2 && needsSpouseStep && (
              <StepCard title="Spouse / partner">
                <Field label="Full name">
                  <Input value={form.spouse_name} onChange={(e) => patch({ spouse_name: e.target.value })} />
                </Field>
                <Field label="Date of birth">
                  <Input type="date" value={form.spouse_dob} onChange={(e) => patch({ spouse_dob: e.target.value })} />
                </Field>
                <Field label="Trust type">
                  <RadioGroup value={form.trust_type} onValueChange={(v) => patch({ trust_type: v })} className="mt-1 space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="joint" /> Joint trust (recommended for most couples)
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="separate" /> Separate trusts
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="unsure" /> Not sure — we'll advise
                    </label>
                  </RadioGroup>
                </Field>
              </StepCard>
            )}

            {step === 3 && (
              <StepCard title="Children & dependents">
                {form.children.length === 0 && (
                  <p className="text-sm text-muted-foreground">No children or dependents? Skip ahead.</p>
                )}
                {form.children.map((child, i) => (
                  <div key={i} className="p-3 border rounded-md space-y-2 relative">
                    <button
                      type="button"
                      onClick={() => patch({ children: form.children.filter((_, j) => j !== i) })}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <Field label="Full name">
                      <Input value={child.name} onChange={(e) => updateItem(form.children, i, { name: e.target.value }, (v) => patch({ children: v }))} />
                    </Field>
                    <Field label="Date of birth">
                      <Input type="date" value={child.dob} onChange={(e) => updateItem(form.children, i, { dob: e.target.value }, (v) => patch({ children: v }))} />
                    </Field>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={child.is_minor} onCheckedChange={(v) => updateItem(form.children, i, { is_minor: v === true }, (arr) => patch({ children: arr }))} />
                      Minor (under 18)
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={child.prior_relationship} onCheckedChange={(v) => updateItem(form.children, i, { prior_relationship: v === true }, (arr) => patch({ children: arr }))} />
                      From a prior relationship
                    </label>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => patch({ children: [...form.children, { name: "", dob: "", is_minor: false, prior_relationship: false }] })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add child
                </Button>
              </StepCard>
            )}

            {step === 4 && (
              <StepCard title="Real estate">
                {form.properties.length === 0 && (
                  <p className="text-sm text-muted-foreground">Own property? Add each parcel below.</p>
                )}
                {form.properties.map((p, i) => (
                  <div key={i} className="p-3 border rounded-md space-y-2 relative">
                    <button
                      type="button"
                      onClick={() => patch({ properties: form.properties.filter((_, j) => j !== i) })}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <Field label="Address">
                      <Input value={p.address} onChange={(e) => updateItem(form.properties, i, { address: e.target.value }, (v) => patch({ properties: v }))} />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Approx value">
                        <Select value={p.value} onValueChange={(v) => updateItem(form.properties, i, { value: v }, (arr) => patch({ properties: arr }))}>
                          <SelectTrigger><SelectValue placeholder="Range" /></SelectTrigger>
                          <SelectContent>{AMOUNT_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                      </Field>
                      <Field label="Mortgage balance">
                        <Select value={p.mortgage} onValueChange={(v) => updateItem(form.properties, i, { mortgage: v }, (arr) => patch({ properties: arr }))}>
                          <SelectTrigger><SelectValue placeholder="Range" /></SelectTrigger>
                          <SelectContent>{[...AMOUNT_RANGES, "Paid off"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                      </Field>
                    </div>
                    <Field label="How is title currently held?">
                      <Select value={p.title_held} onValueChange={(v) => updateItem(form.properties, i, { title_held: v }, (arr) => patch({ properties: arr }))}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{TITLE_HELD.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                    </Field>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => patch({ properties: [...form.properties, { address: "", value: "", mortgage: "", title_held: "" }] })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add property
                </Button>
              </StepCard>
            )}

            {step === 5 && (
              <StepCard title="Financial accounts">
                <p className="text-sm text-muted-foreground">
                  Rough totals only. Never share account numbers or exact balances in this intake.
                </p>
                {ACCOUNT_CATEGORIES.map((cat) => {
                  const entry = form.accounts.find((a) => a.category === cat);
                  const checked = !!entry;
                  return (
                    <div key={cat} className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm flex-1">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            if (v === true) patch({ accounts: [...form.accounts, { category: cat, amount: "" }] });
                            else patch({ accounts: form.accounts.filter((a) => a.category !== cat) });
                          }}
                        />
                        {cat}
                      </label>
                      {checked && (
                        <Select
                          value={entry.amount}
                          onValueChange={(v) => patch({ accounts: form.accounts.map((a) => a.category === cat ? { ...a, amount: v } : a) })}
                        >
                          <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Range" /></SelectTrigger>
                          <SelectContent>{AMOUNT_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                      )}
                    </div>
                  );
                })}
              </StepCard>
            )}

            {step === 6 && (
              <StepCard title="Successor trustee">
                <p className="text-sm text-muted-foreground">
                  The successor trustee steps in to administer your trust if you can't. Name someone you trust to handle finances — plus an alternate in case your first choice can't serve.
                </p>
                <PersonFields label="Primary" value={form.trustee_primary} onChange={(v) => patch({ trustee_primary: v })} />
                <PersonFields label="Alternate" value={form.trustee_alternate} onChange={(v) => patch({ trustee_alternate: v })} />
              </StepCard>
            )}

            {step === 7 && hasMinorChildren && (
              <StepCard title="Guardians">
                <p className="text-sm text-muted-foreground">
                  If both parents pass away, who should raise your minor children?
                </p>
                <PersonFields label="Primary guardian" value={form.guardian_primary} onChange={(v) => patch({ guardian_primary: v })} />
                <PersonFields label="Alternate guardian" value={form.guardian_alternate} onChange={(v) => patch({ guardian_alternate: v })} />
              </StepCard>
            )}

            {step === 8 && (
              <StepCard title="Distribution wishes & notes">
                <Field label="How would you like assets distributed?">
                  <RadioGroup value={form.distribution} onValueChange={(v) => patch({ distribution: v })} className="space-y-2 mt-1">
                    {DISTRIBUTION.map((d) => (
                      <label key={d.value} className="flex items-start gap-2 text-sm">
                        <RadioGroupItem value={d.value} className="mt-1" />
                        <span>{d.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
                <Field label="Anything else we should know?">
                  <Textarea value={form.notes} onChange={(e) => patch({ notes: e.target.value })} rows={4} placeholder="Charitable gifts, specific heirlooms, family dynamics we should be aware of…" />
                </Field>

                <div className="p-4 rounded-md bg-muted/40 border text-sm space-y-2">
                  <p className="font-medium text-navy">Quick review</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>Name:</span><span>{form.first_name} {form.last_name}</span>
                    <span>Contact:</span><span>{form.email} · {form.phone}</span>
                    <span>State:</span><span>{form.state}</span>
                    <span>Marital:</span><span>{form.marital_status}</span>
                    <span>Children:</span><span>{form.children.length}</span>
                    <span>Properties:</span><span>{form.properties.length}</span>
                    <span>Accounts flagged:</span><span>{form.accounts.length}</span>
                  </div>
                </div>
              </StepCard>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button type="button" variant="outline" onClick={back} disabled={step === 1 || saving}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={next}
                disabled={saving}
                className="bg-accent hover:bg-accent/90 text-navy font-semibold"
              >
                {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving</> : <>Continue <ArrowRight className="h-4 w-4 ml-1" /></>}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={finalize}
                disabled={saving}
                className="bg-accent hover:bg-accent/90 text-navy font-semibold"
              >
                {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting</> : "Submit intake"}
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="py-6 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl text-xs text-muted-foreground text-center">
          The Financial Architects is a licensed insurance agency. This intake is not legal advice and does not create a trust.
          {/* TODO: Insert state-specific licensing disclosure line here */}
        </div>
      </div>
    </>
  );
};

/** Helpers */
function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 md:p-6 rounded-lg border bg-card space-y-4">
      <h2 className="text-xl font-bold text-navy">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function PersonFields({ label, value, onChange }: { label: string; value: Person; onChange: (v: Person) => void }) {
  return (
    <div className="p-3 border rounded-md space-y-2">
      <p className="text-sm font-medium text-navy">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name">
          <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
        </Field>
        <Field label="Relationship">
          <Input value={value.relationship} onChange={(e) => onChange({ ...value, relationship: e.target.value })} />
        </Field>
        <Field label="Phone">
          <Input type="tel" inputMode="tel" value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} />
        </Field>
        <Field label="Email">
          <Input type="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

function updateItem<T>(arr: T[], i: number, updates: Partial<T>, setter: (next: T[]) => void) {
  const next = arr.map((v, j) => (j === i ? { ...v, ...updates } : v));
  setter(next);
}

export default Trust;
