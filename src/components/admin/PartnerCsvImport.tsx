import { useState } from "react";
import Papa from "papaparse";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Download, Upload } from "lucide-react";

const TEMPLATE =
  "slug,display_name,phone_e164,avatar_url,active,sms_notify_optin,owner_email,parent_slug\n" +
  "acme-partners,Acme Partners,+15551234567,,true,false,partner@acme.com,\n" +
  "acme-sub-a,Acme Sub A,,,true,false,,acme-partners\n";

interface ResultRow {
  slug: string;
  id: string | null;
  status: "ok" | "warning" | "error";
  message: string | null;
}

type Row = Record<string, string>;

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onDone: () => void;
}

export default function PartnerCsvImport({ open, onOpenChange, onDone }: Props) {
  const [csv, setCsv] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [results, setResults] = useState<ResultRow[] | null>(null);
  const [busy, setBusy] = useState(false);

  const parse = (text: string) => {
    setCsv(text);
    setResults(null);
    if (!text.trim()) {
      setRows([]);
      return;
    }
    const out = Papa.parse<Row>(text, { header: true, skipEmptyLines: true });
    setRows(out.data as Row[]);
  };

  const onFile = async (f: File | null) => {
    if (!f) return;
    const t = await f.text();
    parse(t);
  };

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "partners-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const commit = async () => {
    if (rows.length === 0) return toast.error("No rows to import");
    setBusy(true);
    const { data, error } = await supabase.rpc("admin_bulk_upsert_referrers", {
      p_rows: rows as any,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setResults((data as unknown as ResultRow[]) ?? []);
    onDone();
  };

  const counts = results
    ? results.reduce(
        (acc, r) => {
          acc[r.status] = (acc[r.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      )
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Bulk import partners</DialogTitle>
          <DialogDescription>
            Upload a CSV with columns:{" "}
            <code className="text-xs">
              slug, display_name, phone_e164, avatar_url, active, sms_notify_optin,
              owner_email, parent_slug
            </code>
            . Existing partners with the same slug will be updated.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
          <label className="inline-flex">
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0] || null)}
            />
            <span className="inline-flex items-center gap-2 text-sm px-3 h-9 rounded-md border cursor-pointer">
              <Upload className="h-4 w-4" /> Upload file
            </span>
          </label>
        </div>

        <Textarea
          value={csv}
          onChange={(e) => parse(e.target.value)}
          rows={8}
          placeholder="Paste CSV here…"
          className="font-mono text-xs"
        />

        {rows.length > 0 && !results && (
          <div className="text-xs text-muted-foreground">
            {rows.length} row(s) parsed. Click Import to commit.
          </div>
        )}

        {results && (
          <div className="border rounded-md p-3 max-h-72 overflow-y-auto text-xs space-y-2">
            <div className="flex gap-2">
              {counts &&
                Object.entries(counts).map(([k, v]) => (
                  <Badge
                    key={k}
                    variant={
                      k === "error" ? "destructive" : k === "warning" ? "outline" : "default"
                    }
                  >
                    {k}: {v}
                  </Badge>
                ))}
            </div>
            <table className="w-full">
              <thead className="text-left">
                <tr>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1 font-mono">{r.slug}</td>
                    <td
                      className={
                        r.status === "error"
                          ? "text-destructive"
                          : r.status === "warning"
                            ? "text-amber-600"
                            : "text-green-700"
                      }
                    >
                      {r.status}
                    </td>
                    <td className="text-muted-foreground">{r.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={commit} disabled={busy || rows.length === 0 || !!results}>
            {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Import {rows.length || ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}