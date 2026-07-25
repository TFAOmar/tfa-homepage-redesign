import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface LegacyLead {
  id: string;
  created_at: string;
  funnel: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  state: string | null;
  is_complete: boolean;
  last_step: number | null;
}

interface FormSub {
  id: string;
  created_at: string;
  form_type: string;
  status: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  state_location: string | null;
}

/**
 * Shows leads captured on landing pages (Protect / Trust / Newsletter) and
 * form_submissions (Homeowner Protection) that were attributed to the
 * currently signed-in partner via `partner_slug`.
 *
 * Uses SECURITY DEFINER RPCs so we don't rely on client-side filtering.
 */
export default function PartnerLegacyLeadsPanel() {
  const [leads, setLeads] = useState<LegacyLead[]>([]);
  const [subs, setSubs] = useState<FormSub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [l, s] = await Promise.all([
        supabase.rpc("partner_list_my_leads"),
        supabase.rpc("partner_list_my_form_submissions"),
      ]);
      if (cancelled) return;
      if (!l.error && l.data) setLeads(l.data as unknown as LegacyLead[]);
      if (!s.error && s.data) setSubs(s.data as unknown as FormSub[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="animate-spin h-4 w-4" />
      </Card>
    );
  }

  if (leads.length === 0 && subs.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-lg font-bold text-navy">Landing Page & Newsletter Leads</h2>

      {leads.length > 0 && (
        <Card>
          <div className="p-3 text-xs text-muted-foreground">
            From /protect, /trust, and /whatsamortgage-newsletter
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Funnel</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs">
                    {new Date(l.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {l.funnel}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {l.first_name} {l.last_name}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{l.email}</div>
                    <div className="text-muted-foreground">{l.phone}</div>
                  </TableCell>
                  <TableCell className="text-xs">{l.state}</TableCell>
                  <TableCell>
                    <Badge variant={l.is_complete ? "default" : "secondary"} className="capitalize">
                      {l.is_complete ? "Complete" : `Step ${l.last_step ?? 0}`}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {subs.length > 0 && (
        <Card>
          <div className="p-3 text-xs text-muted-foreground">
            From /homeowner-protection
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subs.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-xs">
                    {new Date(s.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-xs">{s.form_type}</TableCell>
                  <TableCell className="font-medium">
                    {s.first_name} {s.last_name}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{s.email}</div>
                    <div className="text-muted-foreground">{s.phone}</div>
                  </TableCell>
                  <TableCell className="text-xs">{s.state_location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {s.status || "new"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </section>
  );
}