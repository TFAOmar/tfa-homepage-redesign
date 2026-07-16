import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Loader2, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SEOHead } from "@/components/seo";
import { useLeads, useUpdateLead, type Lead } from "@/hooks/useLeads";

const STATUS_OPTIONS = ["new", "contacted", "in_progress", "closed", "dead"] as const;

const statusColor: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  contacted: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  in_progress: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  closed: "bg-green-500/15 text-green-700 dark:text-green-300",
  dead: "bg-gray-500/15 text-gray-700 dark:text-gray-300",
};

const AdminLeads = () => {
  const { data: leads = [], isLoading } = useLeads();
  const updateLead = useUpdateLead();

  const [funnelFilter, setFunnelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  useEffect(() => {
    if (selected) setNotesDraft(selected.admin_notes ?? "");
  }, [selected]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (funnelFilter !== "all" && l.funnel !== funnelFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${l.first_name ?? ""} ${l.last_name ?? ""} ${l.email ?? ""} ${l.phone ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, funnelFilter, statusFilter, search]);

  const stats = useMemo(() => {
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = leads.filter((l) => new Date(l.created_at).getTime() >= weekAgo).length;
    const protectCount = leads.filter((l) => l.funnel === "protect").length;
    const trustAll = leads.filter((l) => l.funnel === "trust");
    const trustCompleteRate = trustAll.length
      ? Math.round((trustAll.filter((l) => l.is_complete).length / trustAll.length) * 100)
      : 0;
    return {
      total: leads.length,
      thisWeek,
      protectCount,
      trustCount: trustAll.length,
      trustCompleteRate,
    };
  }, [leads]);

  const exportCsv = () => {
    const rows = filtered.map((l) => ({
      created_at: l.created_at,
      funnel: l.funnel,
      status: l.status,
      first_name: l.first_name ?? "",
      last_name: l.last_name ?? "",
      email: l.email ?? "",
      phone: l.phone ?? "",
      state: l.state ?? "",
      is_complete: l.is_complete,
      last_step: l.last_step ?? 0,
      referral_source: l.referral_source ?? "",
      utm_campaign: l.utm_campaign ?? "",
      payload: JSON.stringify(l.payload ?? {}),
      admin_notes: l.admin_notes ?? "",
    }));
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => JSON.stringify((r as any)[h] ?? "")).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const setStatus = (lead: Lead, status: string) => {
    updateLead.mutate(
      { id: lead.id, updates: { status } as Partial<Lead> },
      {
        onSuccess: () => {
          toast.success("Status updated");
          if (selected?.id === lead.id) setSelected({ ...lead, status } as Lead);
        },
        onError: (e: any) => toast.error(e.message || "Failed to update"),
      },
    );
  };

  const saveNotes = () => {
    if (!selected) return;
    if (notesDraft === (selected.admin_notes ?? "")) return;
    updateLead.mutate(
      { id: selected.id, updates: { admin_notes: notesDraft } as Partial<Lead> },
      {
        onSuccess: () => {
          toast.success("Notes saved");
          setSelected({ ...selected, admin_notes: notesDraft } as Lead);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Admin — Referral Leads" description="Referral leads dashboard" noIndex />
      <div className="min-h-screen py-12 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild size="sm">
                <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Admin</Link>
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-navy">Referral Leads</h1>
                <p className="text-sm text-muted-foreground">Submissions from /protect and /trust</p>
              </div>
            </div>
            <Button variant="outline" onClick={exportCsv}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatCard label="Total leads" value={stats.total} />
            <StatCard label="This week" value={stats.thisWeek} />
            <StatCard label="Protect / Trust" value={`${stats.protectCount} / ${stats.trustCount}`} />
            <StatCard label="Trust completion" value={`${stats.trustCompleteRate}%`} />
          </div>

          {/* Filters */}
          <Card className="p-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, phone"
                  className="pl-9"
                />
              </div>
              <Select value={funnelFilter} onValueChange={setFunnelFilter}>
                <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All funnels</SelectItem>
                  <SelectItem value="protect">Protect</SelectItem>
                  <SelectItem value="trust">Trust</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Funnel</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No leads match your filters yet.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((lead) => (
                  <TableRow
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className={`cursor-pointer ${!lead.is_complete ? "opacity-70" : ""}`}
                  >
                    <TableCell className="text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {lead.first_name} {lead.last_name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{lead.funnel}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div>{lead.email}</div>
                      <div className="text-muted-foreground">{lead.phone}</div>
                    </TableCell>
                    <TableCell>{lead.state}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-xs ${statusColor[lead.status]}`}>
                        {lead.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">
                      {lead.is_complete ? (
                        <Badge className="bg-green-600 hover:bg-green-600">Complete</Badge>
                      ) : lead.funnel === "trust" ? (
                        <Badge variant="secondary">Step {lead.last_step ?? 0} of 8</Badge>
                      ) : (
                        <Badge variant="secondary">Incomplete</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      {/* Detail drawer */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.first_name} {selected.last_name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <section className="space-y-1 text-sm">
                  <p><strong>Funnel:</strong> <span className="capitalize">{selected.funnel}</span></p>
                  <p><strong>Email:</strong> {selected.email}</p>
                  <p><strong>Phone:</strong> {selected.phone}</p>
                  <p><strong>State:</strong> {selected.state}</p>
                  <p><strong>Referral:</strong> {selected.referral_source}{selected.utm_campaign ? ` / ${selected.utm_campaign}` : ""}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    Submitted {new Date(selected.created_at).toLocaleString()}
                  </p>
                </section>

                <section>
                  <Label className="text-xs">Status</Label>
                  <Select value={selected.status} onValueChange={(v) => setStatus(selected, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s} className="capitalize">{s.replace("_", " ")}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3 className="font-semibold text-sm mb-2">Submission details</h3>
                  <PayloadRenderer payload={selected.payload as Record<string, unknown>} />
                </section>

                <section>
                  <Label className="text-xs">Admin notes</Label>
                  <Textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    onBlur={saveNotes}
                    rows={4}
                    placeholder="Follow-up notes, timing, next step…"
                  />
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold text-navy mt-1">{value}</div>
    </Card>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm font-medium text-foreground mb-1 ${className}`}>{children}</div>;
}

function PayloadRenderer({ payload }: { payload: Record<string, unknown> }) {
  if (!payload || Object.keys(payload).length === 0) {
    return <p className="text-xs text-muted-foreground">No additional data.</p>;
  }
  return (
    <div className="space-y-3 text-sm">
      {Object.entries(payload).map(([k, v]) => (
        <div key={k} className="border-l-2 border-accent/30 pl-3">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{k.replace(/_/g, " ")}</div>
          <div className="text-sm break-words">
            {v == null || v === "" ? (
              <span className="text-muted-foreground italic">—</span>
            ) : typeof v === "object" ? (
              <pre className="text-xs whitespace-pre-wrap bg-muted/40 p-2 rounded">{JSON.stringify(v, null, 2)}</pre>
            ) : (
              String(v)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminLeads;
