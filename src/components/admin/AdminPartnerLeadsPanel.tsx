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
 * Admin-only view of a specific partner's tagged leads + form_submissions.
 * Uses admin_list_partner_* RPCs (SECURITY DEFINER, admin-guarded).
 */
export default function AdminPartnerLeadsPanel({ slug }: { slug: string }) {
  const [leads, setLeads] = useState<LegacyLead[]>([]);
  const [subs, setSubs] = useState<FormSub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const [l, s] = await Promise.all([
        supabase.rpc("admin_list_partner_leads", { p_slug: slug }),
        supabase.rpc("admin_list_partner_form_submissions", { p_slug: slug }),
      ]);
      if (cancelled) return;
      if (!l.error && l.data) setLeads(l.data as unknown as LegacyLead[]);
      if (!s.error && s.data) setSubs(s.data as unknown as FormSub[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="animate-spin h-4 w-4" />
      </Card>
    );
  }

  if (leads.length === 0 && subs.length === 0) {
    return (
      <Card className="p-6 text-sm text-muted-foreground text-center">
        No leads or form submissions tagged to <span className="font-mono">{slug}</span> yet.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {leads.length > 0 && (
        <Card>
          <div className="p-3 text-xs text-muted-foreground">
            Landing page leads ({leads.length})
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
            Form submissions ({subs.length})
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
    </div>
  );
}