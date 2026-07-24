import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Loader2, Search, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/seo";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Lead {
  id: string;
  created_at: string;
  source: string;
  status: string;
  services: string[];
  primary_service: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_e164: string | null;
  email: string | null;
  language: string;
  temperature: string | null;
  ghl_forward_status: string | null;
  ghl_forward_attempts: number | null;
  ghl_last_error: string | null;
  ghl_forwarded_at: string | null;
  answers: Record<string, unknown>;
}

const SELECT_COLS =
  "id,created_at,source,status,services,primary_service,first_name,last_name,phone_e164,email,language,temperature,ghl_forward_status,ghl_forward_attempts,ghl_last_error,ghl_forwarded_at,answers";

export default function IntakeDashboard() {
  const { user, isLoading: loading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [svcFilter, setSvcFilter] = useState("all");
  const [ghlFilter, setGhlFilter] = useState<"all" | "failed" | "pending" | "sent">("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [resending, setResending] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { data, error } = await supabase
        .from("intake_leads")
        .select(SELECT_COLS)
        .order("created_at", { ascending: false })
        .limit(500);
      if (!error && data) setLeads(data as Lead[]);
      setFetching(false);
    })();

    const channel = supabase
      .channel("intake-leads-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "intake_leads" }, () => {
        void supabase
          .from("intake_leads")
          .select(SELECT_COLS)
          .order("created_at", { ascending: false })
          .limit(500)
          .then(({ data }) => data && setLeads(data as Lead[]));
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (svcFilter !== "all" && !l.services?.includes(svcFilter)) return false;
      if (ghlFilter !== "all" && l.ghl_forward_status !== ghlFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${l.first_name ?? ""} ${l.last_name ?? ""} ${l.email ?? ""} ${l.phone_e164 ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, svcFilter, ghlFilter]);

  const resendToGhl = async (leadId: string) => {
    setResending(leadId);
    try {
      const { data, error } = await supabase.functions.invoke("forward-to-ghl", {
        body: { lead_id: leadId },
      });
      if (error) throw error;
      if ((data as any)?.status === "sent") toast.success("Resent to GHL");
      else toast.error(`Resend failed: ${(data as any)?.error || "unknown"}`);
    } catch (e: any) {
      toast.error(e.message || "Resend failed");
    } finally {
      setResending(null);
    }
  };

  const ghlBadge = (status: string | null) => {
    const variant =
      status === "sent" ? "default" : status === "failed" ? "destructive" : "secondary";
    return (
      <Badge variant={variant as any} className="text-xs capitalize">
        {status || "pending"}
      </Badge>
    );
  };

  if (loading) return <div className="p-12"><Loader2 className="animate-spin" /></div>;
  if (!user) return <Navigate to="/auth?next=/dashboard" replace />;

  return (
    <>
      <SEOHead title="Intake Dashboard — TFA" description="Staff dashboard" noIndex />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <h1 className="font-serif text-lg font-bold text-navy">Intake Dashboard</h1>
            <Link to="/concierge" className="text-sm text-navy underline">+ New concierge intake</Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone" className="pl-9" />
            </div>
            <select value={svcFilter} onChange={(e) => setSvcFilter(e.target.value)} className="h-10 rounded-md border px-3 text-sm">
              <option value="all">All services</option>
              <option value="trust">Trust</option>
              <option value="life">Life</option>
              <option value="retirement">Retirement</option>
            </select>
            <select
              value={ghlFilter}
              onChange={(e) => setGhlFilter(e.target.value as any)}
              className="h-10 rounded-md border px-3 text-sm"
            >
              <option value="all">All GHL statuses</option>
              <option value="sent">Sent to GHL</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed to GHL</option>
            </select>
          </Card>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Lang</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>GHL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fetching && <TableRow><TableCell colSpan={7} className="text-center py-8"><Loader2 className="animate-spin inline" /></TableCell></TableRow>}
                {!fetching && filtered.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No leads yet.</TableCell></TableRow>}
                {filtered.map((l) => (
                  <TableRow key={l.id} className="cursor-pointer" onClick={() => setSelected(l)}>
                    <TableCell className="text-xs">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{l.first_name} {l.last_name}</TableCell>
                    <TableCell>{l.services?.map((s) => <Badge key={s} variant="outline" className="mr-1 capitalize">{s}</Badge>)}</TableCell>
                    <TableCell className="text-xs"><div>{l.email}</div><div className="text-muted-foreground">{l.phone_e164}</div></TableCell>
                    <TableCell className="uppercase text-xs">{l.language}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{l.status}</Badge></TableCell>
                    <TableCell>{ghlBadge(l.ghl_forward_status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </main>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader><SheetTitle>{selected.first_name} {selected.last_name}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4 text-sm">
                <p><strong>Services:</strong> {selected.services?.join(", ")}</p>
                <p><strong>Phone:</strong> {selected.phone_e164}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Language:</strong> {selected.language}</p>
                <p><strong>Source:</strong> {selected.source}</p>
                <div className="flex items-center gap-2">
                  <strong>GHL:</strong> {ghlBadge(selected.ghl_forward_status)}
                  <span className="text-xs text-muted-foreground">
                    {selected.ghl_forward_attempts ?? 0} attempt(s)
                    {selected.ghl_forwarded_at ? ` · sent ${new Date(selected.ghl_forwarded_at).toLocaleString()}` : ""}
                  </span>
                </div>
                {selected.ghl_last_error && (
                  <p className="text-xs text-destructive break-all">
                    <strong>Last error:</strong> {selected.ghl_last_error}
                  </p>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => resendToGhl(selected.id)}
                  disabled={resending === selected.id}
                >
                  <RefreshCw className={`h-3 w-3 mr-2 ${resending === selected.id ? "animate-spin" : ""}`} />
                  Resend to GHL
                </Button>
                <div>
                  <strong>Answers:</strong>
                  <pre className="text-xs bg-gray-50 border rounded p-2 mt-1 overflow-x-auto">{JSON.stringify(selected.answers, null, 2)}</pre>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}