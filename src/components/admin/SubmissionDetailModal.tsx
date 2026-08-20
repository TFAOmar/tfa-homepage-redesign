import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Submission {
  id: string;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  advisor_name: string | null;
  advisor_email: string | null;
  status: string;
  current_step: number;
  form_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  submitted_at?: string | null;
}

interface Props {
  title: string;
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
  statusOptions: { value: string; label: string }[];
  onUpdateStatus: (id: string, status: string) => void;
  /** Enables the admin-only "Resend PDF to advisor" action (estate planning). */
  enableAdvisorPdfResend?: boolean;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border rounded-lg p-4 bg-card">
    <h3 className="font-semibold text-navy mb-3">{title}</h3>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: unknown }) => {
  if (value === null || value === undefined || value === "") return null;
  let display: React.ReactNode;
  if (typeof value === "boolean") display = value ? "Yes" : "No";
  else if (Array.isArray(value)) display = value.join(", ") || "—";
  else if (typeof value === "object") display = <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
  else display = String(value);
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="text-muted-foreground col-span-1 capitalize">{label.replace(/_/g, " ")}</span>
      <span className="col-span-2 break-words">{display}</span>
    </div>
  );
};

const renderObject = (obj: Record<string, unknown>) =>
  Object.entries(obj).map(([k, v]) => <Row key={k} label={k} value={v} />);

export const SubmissionDetailModal = ({
  title, submission, open, onClose, statusOptions, onUpdateStatus, enableAdvisorPdfResend,
}: Props) => {
  const [resending, setResending] = useState(false);
  if (!submission) return null;

  const handleResend = async () => {
    setResending(true);
    try {
      const { data, error } = await supabase.functions.invoke("resend-estate-planning-pdf", {
        body: { submissionId: submission.id },
      });
      if (error) throw error;
      toast.success(`Questionnaire PDF sent to ${(data as { recipient?: string })?.recipient ?? "the advisor"}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to resend PDF");
    } finally {
      setResending(false);
    }
  };

  const fd = submission.form_data || {};
  const sectionEntries = Object.entries(fd).filter(([, v]) => v && typeof v === "object" && !Array.isArray(v));
  const flatEntries = Object.entries(fd).filter(([, v]) => !(v && typeof v === "object" && !Array.isArray(v)));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{title}</span>
            <Badge variant="outline" className="font-mono text-xs">{submission.id.slice(0, 8).toUpperCase()}</Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh] pr-4">
          <div className="space-y-4">
            <Section title="Overview">
              <Row label="Applicant" value={submission.applicant_name} />
              <Row label="Email" value={submission.applicant_email} />
              <Row label="Phone" value={submission.applicant_phone} />
              <Row label="Advisor" value={submission.advisor_name} />
              <Row label="Advisor Email" value={submission.advisor_email} />
              <Row label="Step" value={submission.current_step} />
              <Row label="Created" value={format(new Date(submission.created_at), "PPpp")} />
              <Row label="Updated" value={format(new Date(submission.updated_at), "PPpp")} />
              {submission.submitted_at && (
                <Row label="Submitted" value={format(new Date(submission.submitted_at), "PPpp")} />
              )}
              <div className="grid grid-cols-3 gap-2 items-center pt-2">
                <span className="text-muted-foreground">Status</span>
                <div className="col-span-2">
                  <Select value={submission.status} onValueChange={(v) => onUpdateStatus(submission.id, v)}>
                    <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {enableAdvisorPdfResend && (
                <div className="pt-3">
                  <Button size="sm" variant="outline" onClick={handleResend} disabled={resending}>
                    {resending
                      ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      : <Send className="h-4 w-4 mr-2" />}
                    Resend questionnaire PDF to advisor
                  </Button>
                </div>
              )}
            </Section>

            {flatEntries.length > 0 && (
              <Section title="Form Data">{renderObject(Object.fromEntries(flatEntries))}</Section>
            )}

            {sectionEntries.map(([k, v]) => (
              <Section key={k} title={k.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}>
                {renderObject(v as Record<string, unknown>)}
              </Section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
