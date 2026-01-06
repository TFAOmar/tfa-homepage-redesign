import { format } from "date-fns";
import { Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LifeInsuranceApplication } from "@/hooks/useLifeInsuranceApplications";
import { downloadApplicationPdf } from "@/lib/lifeInsurancePdfGenerator";
import type { Database } from "@/integrations/supabase/types";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

interface ApplicationDetailModalProps {
  application: LifeInsuranceApplication | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "approved", label: "Approved" },
  { value: "needs_info", label: "Needs Info" },
  { value: "rejected", label: "Rejected" },
];

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  needs_info: "bg-orange-100 text-orange-800",
  rejected: "bg-red-100 text-red-800",
};

interface FormData {
  step1?: Record<string, unknown>;
  step2?: Record<string, unknown>;
  step3?: Record<string, unknown>;
  step4?: Record<string, unknown>;
  step5?: Record<string, unknown>;
  step6?: Record<string, unknown>;
  step7?: Record<string, unknown>;
  step8?: Record<string, unknown>;
  step9?: Record<string, unknown>;
}

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    if (value >= 1000) return `$${value.toLocaleString()}`;
    return String(value);
  }
  if (Array.isArray(value)) return value.map((v) => formatValue(v)).join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
};

const FieldRow = ({ label, value }: { label: string; value: unknown }) => (
  <div className="grid grid-cols-2 py-2 border-b border-border/50 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-right">{formatValue(value)}</span>
  </div>
);

const StepContent = ({
  title,
  data,
  fields,
}: {
  title: string;
  data: Record<string, unknown> | undefined;
  fields: { key: string; label: string }[];
}) => (
  <div className="space-y-1">
    <h4 className="font-semibold text-navy mb-3">{title}</h4>
    {data ? (
      <div className="bg-muted/30 rounded-lg p-4">
        {fields.map(({ key, label }) => (
          <FieldRow key={key} label={label} value={data[key]} />
        ))}
      </div>
    ) : (
      <p className="text-muted-foreground text-sm">No data for this step</p>
    )}
  </div>
);

// Beneficiary display component
const BeneficiariesDisplay = ({ beneficiaries }: { beneficiaries: Array<Record<string, unknown>> }) => {
  if (!beneficiaries || beneficiaries.length === 0) {
    return <p className="text-muted-foreground text-sm">No beneficiaries specified</p>;
  }

  return (
    <div className="space-y-3">
      {beneficiaries.map((ben, idx) => (
        <div key={String(ben.id) || idx} className="bg-muted/50 rounded-lg p-3 border">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={ben.designation === "primary" ? "default" : "secondary"}>
              {ben.designation === "primary" ? "Primary" : "Contingent"}
            </Badge>
            <span className="font-medium">{String(ben.fullName || "N/A")}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <FieldRow label="Relationship" value={ben.relationship} />
            <FieldRow label="Share" value={ben.sharePercentage ? `${ben.sharePercentage}%` : "N/A"} />
            <FieldRow label="SSN" value={ben.ssn ? "***-**-" + String(ben.ssn).slice(-4) : "N/A"} />
            <FieldRow label="Date of Birth" value={ben.dateOfBirth} />
            {(ben.street || ben.city || ben.state || ben.zip) && (
              <FieldRow 
                label="Address" 
                value={`${ben.street || ""}, ${ben.city || ""}, ${ben.state || ""} ${ben.zip || ""}`.trim()} 
              />
            )}
            {ben.phone && <FieldRow label="Phone" value={ben.phone} />}
            {ben.email && <FieldRow label="Email" value={ben.email} />}
          </div>
        </div>
      ))}
    </div>
  );
};

// Existing policies display component
const ExistingPoliciesDisplay = ({ policies }: { policies: Array<Record<string, unknown>> }) => {
  if (!policies || policies.length === 0) {
    return <p className="text-muted-foreground text-sm">No existing policies</p>;
  }

  return (
    <div className="space-y-3">
      {policies.map((policy, idx) => (
        <div key={String(policy.id) || idx} className="bg-muted/50 rounded-lg p-3 border">
          <div className="font-medium mb-2">{String(policy.companyName || "N/A")}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <FieldRow label="Policy Number" value={policy.policyNumber} />
            <FieldRow label="Coverage Amount" value={policy.amountOfCoverage} />
            <FieldRow label="Being Replaced" value={policy.isBeingReplaced} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ApplicationDetailModal = ({
  application,
  open,
  onClose,
  onUpdateStatus,
}: ApplicationDetailModalProps) => {
  if (!application) return null;

  const formData = application.form_data as FormData;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-xl">
              Application {application.id.slice(0, 8).toUpperCase()}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-2">
              <Badge
                variant="secondary"
                className={statusColors[application.status]}
              >
                {application.status.replace(/_/g, " ").toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Submitted{" "}
                {format(new Date(application.created_at), "MMM d, yyyy h:mm a")}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Update Status:</span>
            <Select
              value={application.status}
              onValueChange={(value: ApplicationStatus) =>
                onUpdateStatus(application.id, value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadApplicationPdf(application)}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>

        <ScrollArea className="h-[500px] pr-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="policy">Policy</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-navy mb-3">Applicant</h4>
                  <FieldRow label="Name" value={application.applicant_name} />
                  <FieldRow label="Email" value={application.applicant_email} />
                  <FieldRow label="Phone" value={application.applicant_phone} />
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-navy mb-3">Advisor</h4>
                  <FieldRow label="Name" value={application.advisor_name} />
                  <FieldRow label="Email" value={application.advisor_email} />
                  <FieldRow label="ID" value={application.advisor_id} />
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-navy mb-3">
                  Application Progress
                </h4>
                <FieldRow
                  label="Current Step"
                  value={`${application.current_step} of 9`}
                />
                <FieldRow
                  label="Last Updated"
                  value={format(
                    new Date(application.updated_at),
                    "MMM d, yyyy h:mm a"
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-6">
              <StepContent
                title="Proposed Insured (Step 1)"
                data={formData.step1}
                fields={[
                  { key: "firstName", label: "First Name" },
                  { key: "middleName", label: "Middle Name" },
                  { key: "lastName", label: "Last Name" },
                  { key: "dateOfBirth", label: "Date of Birth" },
                  { key: "gender", label: "Gender" },
                  { key: "ssn", label: "SSN" },
                  { key: "birthplaceCountry", label: "Birthplace Country" },
                  { key: "birthplaceState", label: "Birthplace State" },
                  { key: "homeStreet", label: "Home Street" },
                  { key: "homeCity", label: "Home City" },
                  { key: "homeState", label: "Home State" },
                  { key: "homeZip", label: "Home ZIP" },
                  { key: "mailingAddressDifferent", label: "Mailing Address Different" },
                  { key: "mailingStreet", label: "Mailing Street" },
                  { key: "mailingCity", label: "Mailing City" },
                  { key: "mailingState", label: "Mailing State" },
                  { key: "mailingZip", label: "Mailing ZIP" },
                  { key: "citizenshipStatus", label: "Citizenship Status" },
                  { key: "countryOfCitizenship", label: "Country of Citizenship" },
                  { key: "dateOfEntry", label: "Date of Entry" },
                  { key: "visaType", label: "Visa Type" },
                  { key: "permanentResidentCard", label: "Permanent Resident Card" },
                  { key: "visaExpirationDate", label: "Visa Expiration Date" },
                  { key: "driversLicenseNumber", label: "Driver's License Number" },
                  { key: "driversLicenseState", label: "Driver's License State" },
                ]}
              />
              <StepContent
                title="Contact & Employment (Step 2)"
                data={formData.step2}
                fields={[
                  { key: "mobilePhone", label: "Mobile Phone" },
                  { key: "homePhone", label: "Home Phone" },
                  { key: "workPhone", label: "Work Phone" },
                  { key: "email", label: "Email" },
                  { key: "employerName", label: "Employer" },
                  { key: "occupation", label: "Occupation" },
                  { key: "industry", label: "Industry" },
                  { key: "yearsEmployed", label: "Years Employed" },
                  { key: "jobDuties", label: "Job Duties" },
                  { key: "annualEarnedIncome", label: "Annual Earned Income" },
                  { key: "householdIncome", label: "Household Income" },
                  { key: "netWorth", label: "Net Worth" },
                  { key: "spouseInsuranceAmount", label: "Spouse Insurance" },
                  { key: "parentsInsuranceAmount", label: "Parents Insurance" },
                  { key: "siblingsInsuranceAmount", label: "Siblings Insurance" },
                ]}
              />
              <StepContent
                title="Ownership (Step 3)"
                data={formData.step3}
                fields={[
                  { key: "insuredIsOwner", label: "Insured Is Owner" },
                  { key: "ownerType", label: "Owner Type" },
                  { key: "ownerName", label: "Owner Name" },
                  { key: "ownerSSN", label: "Owner SSN/TIN/EIN" },
                  { key: "ownerDateOfBirth", label: "Owner Date of Birth" },
                  { key: "ownerRelationshipToInsured", label: "Owner Relationship" },
                  { key: "ownerStreet", label: "Owner Street" },
                  { key: "ownerCity", label: "Owner City" },
                  { key: "ownerState", label: "Owner State" },
                  { key: "ownerZip", label: "Owner ZIP" },
                  { key: "ownerEmail", label: "Owner Email" },
                  { key: "ownerPhone", label: "Owner Phone" },
                  { key: "ownerCitizenshipStatus", label: "Owner Citizenship Status" },
                  { key: "ownerCountryOfCitizenship", label: "Owner Country of Citizenship" },
                  { key: "ownerTrustDate", label: "Trust Date" },
                  { key: "trusteeNames", label: "Trustee Names" },
                ]}
              />
              {/* Beneficiaries with expanded display */}
              <div className="space-y-1">
                <h4 className="font-semibold text-navy mb-3">Beneficiaries (Step 4)</h4>
                <BeneficiariesDisplay 
                  beneficiaries={(formData.step4?.beneficiaries || []) as Array<Record<string, unknown>>} 
                />
              </div>
            </TabsContent>

            <TabsContent value="policy" className="space-y-6">
              <StepContent
                title="Policy & Riders (Step 5)"
                data={formData.step5}
                fields={[
                  { key: "planName", label: "Plan Name" },
                  { key: "termDuration", label: "Term Duration" },
                  { key: "faceAmount", label: "Face Amount" },
                  { key: "ridersChildrenTerm", label: "Children's Term Rider" },
                  { key: "ridersWaiverOfPremium", label: "Waiver of Premium Rider" },
                  { key: "ridersAcceleratedBenefits", label: "Accelerated Benefits Rider" },
                  { key: "ridersChronicIllness", label: "Chronic Illness Rider" },
                  { key: "ridersAccidentalDeath", label: "Accidental Death Benefit" },
                  { key: "childrenDetails", label: "Children Details" },
                ]}
              />
              {/* Existing Coverage with expanded display */}
              <div className="space-y-1">
                <h4 className="font-semibold text-navy mb-3">Existing Coverage (Step 6)</h4>
                <div className="bg-muted/30 rounded-lg p-4">
                  <FieldRow label="Has Existing Coverage" value={formData.step6?.hasExistingCoverage} />
                </div>
                <ExistingPoliciesDisplay 
                  policies={(formData.step6?.existingPolicies || []) as Array<Record<string, unknown>>} 
                />
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6">
              <StepContent
                title="Medical & Lifestyle (Step 7)"
                data={formData.step7}
                fields={[
                  { key: "usedTobacco", label: "Used Tobacco (Last 5 Years)" },
                  { key: "tobaccoType", label: "Tobacco Type" },
                  { key: "tobaccoFrequency", label: "Tobacco Frequency" },
                  { key: "tobaccoLastUsed", label: "Last Used" },
                  { key: "aviation", label: "Pilots Aircraft" },
                  { key: "aviationDetails", label: "Aviation Details" },
                  { key: "hazardousSports", label: "Hazardous Sports" },
                  { key: "hazardousSportsDetails", label: "Hazardous Sports Details" },
                  { key: "foreignTravel", label: "Foreign Travel Planned" },
                  { key: "foreignTravelDetails", label: "Foreign Travel Details" },
                  { key: "drivingViolations", label: "Driving Violations (Last 5 Years)" },
                  { key: "drivingViolationsDetails", label: "Driving Violations Details" },
                  { key: "bankruptcy", label: "Bankruptcy Filed" },
                  { key: "bankruptcyDetails", label: "Bankruptcy Details" },
                  { key: "criminalHistory", label: "Criminal History" },
                  { key: "criminalHistoryDetails", label: "Criminal History Details" },
                  { key: "hasMedicalConditions", label: "Has Medical Conditions" },
                  { key: "medicalConditionsDetails", label: "Medical Conditions Details" },
                ]}
              />
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <StepContent
                title="Premium Payment (Step 8)"
                data={formData.step8}
                fields={[
                  { key: "paymentMethod", label: "Payment Method" },
                  { key: "paymentFrequency", label: "Payment Frequency" },
                  { key: "bankName", label: "Bank Name" },
                  { key: "routingNumber", label: "Routing Number" },
                  { key: "accountNumber", label: "Account Number" },
                  { key: "accountType", label: "Account Type" },
                  { key: "sourceOfFunds", label: "Source of Funds" },
                  { key: "sourceOfFundsOther", label: "Source of Funds (Other)" },
                ]}
              />
              <StepContent
                title="Acknowledgment (Step 9)"
                data={formData.step9}
                fields={[
                  { key: "acknowledged", label: "Acknowledged" },
                  { key: "electronicSignature", label: "Electronic Signature" },
                  { key: "signatureDate", label: "Signature Date" },
                ]}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
