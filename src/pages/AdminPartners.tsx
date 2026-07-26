import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Mail, Plus, RefreshCw, Trash2, Unlink, BarChart3, Upload, Palette, Inbox } from "lucide-react";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PartnerStatsPanel from "@/components/admin/PartnerStatsPanel";
import PartnerCsvImport from "@/components/admin/PartnerCsvImport";
import PartnerBrandingForm from "@/components/admin/PartnerBrandingForm";
import AdminPartnerLeadsPanel from "@/components/admin/AdminPartnerLeadsPanel";
import { SEOHead } from "@/components/seo";

interface Partner {
  id: string;
  slug: string;
  display_name: string;
  phone_e164: string | null;
  avatar_url: string | null;
  active: boolean;
  sms_notify_optin: boolean;
  owner_user_id: string | null;
  owner_email: string | null;
  leads_total: number;
  leads_30d: number;
  created_at: string;
  parent_referrer_id: string | null;
  parent_slug: string | null;
  depth: number;
  brand_logo_url: string | null;
  brand_primary_hex: string | null;
  brand_accent_hex: string | null;
  brand_welcome_headline: string | null;
  brand_welcome_body: string | null;
  brand_support_email: string | null;
}

const emptyForm = {
  id: null as string | null,
  slug: "",
  display_name: "",
  phone_e164: "",
  avatar_url: "",
  active: true,
  sms_notify_optin: false,
  owner_email: "",
  parent_referrer_id: "" as string,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showInactive, setShowInactive] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [statsFor, setStatsFor] = useState<Partner | null>(null);
  const [brandingFor, setBrandingFor] = useState<Partner | null>(null);
  const [leadsFor, setLeadsFor] = useState<Partner | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [includeDescendants, setIncludeDescendants] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("admin_list_referrers_with_owner");
    if (error) {
      toast.error(error.message);
    } else {
      setPartners((data as unknown as Partner[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      if (!showInactive && !p.active) return false;
      if (search) {
        const q = search.toLowerCase();
        return `${p.display_name} ${p.slug} ${p.owner_email ?? ""}`
          .toLowerCase()
          .includes(q);
      }
      return true;
    });
  }, [partners, search, showInactive]);

  const openCreate = () => {
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (p: Partner) => {
    setForm({
      id: p.id,
      slug: p.slug,
      display_name: p.display_name,
      phone_e164: p.phone_e164 ?? "",
      avatar_url: p.avatar_url ?? "",
      active: p.active,
      sms_notify_optin: p.sms_notify_optin,
      owner_email: p.owner_email ?? "",
      parent_referrer_id: p.parent_referrer_id ?? "",
    });
    setFormOpen(true);
  };

  const save = async () => {
    if (!form.display_name.trim()) {
      toast.error("Display name is required");
      return;
    }
    const slug = form.slug.trim() || slugify(form.display_name);
    setSaving(true);
    const { data: newId, error } = await supabase.rpc("admin_upsert_referrer", {
      p_id: form.id,
      p_slug: slug,
      p_display_name: form.display_name.trim(),
      p_phone_e164: form.phone_e164.trim(),
      p_avatar_url: form.avatar_url.trim(),
      p_active: form.active,
      p_sms_notify_optin: form.sms_notify_optin,
      p_parent_referrer_id: form.parent_referrer_id || null,
    });
    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }
    const referrerId = (newId as unknown as string) || form.id;
    // Invite if new owner email supplied
    if (form.owner_email && referrerId) {
      const { error: invErr } = await supabase.functions.invoke("invite-partner", {
        body: { referrer_id: referrerId, email: form.owner_email.trim().toLowerCase() },
      });
      if (invErr) toast.error(`Saved, but invite failed: ${invErr.message}`);
      else toast.success("Saved and invite sent");
    } else {
      toast.success("Saved");
    }
    setSaving(false);
    setFormOpen(false);
    void load();
  };

  const invite = async (p: Partner, emailOverride?: string) => {
    const email = emailOverride ?? p.owner_email ?? window.prompt(`Invite email for ${p.display_name}:`) ?? "";
    if (!email) return;
    setBusyId(p.id);
    const { error } = await supabase.functions.invoke("invite-partner", {
      body: { referrer_id: p.id, email: email.trim().toLowerCase() },
    });
    setBusyId(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Invite sent");
      void load();
    }
  };

  const unlink = async (p: Partner) => {
    if (!confirm(`Unlink ${p.owner_email} from ${p.display_name}?`)) return;
    setBusyId(p.id);
    const { error } = await supabase.rpc("admin_unlink_referrer_owner", { p_referrer_id: p.id });
    setBusyId(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Owner unlinked");
      void load();
    }
  };

  const remove = async (p: Partner) => {
    if (!confirm(`Delete partner ${p.display_name}? This cannot be undone.`)) return;
    setBusyId(p.id);
    const { error } = await supabase.rpc("admin_delete_referrer", { p_id: p.id });
    setBusyId(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      void load();
    }
  };

  const toggleActive = async (p: Partner) => {
    const { error } = await supabase.rpc("admin_upsert_referrer", {
      p_id: p.id,
      p_slug: p.slug,
      p_display_name: p.display_name,
      p_phone_e164: p.phone_e164 ?? "",
      p_avatar_url: p.avatar_url ?? "",
      p_active: !p.active,
      p_sms_notify_optin: p.sms_notify_optin,
      p_parent_referrer_id: p.parent_referrer_id,
      p_brand_logo_url: p.brand_logo_url ?? "",
      p_brand_primary_hex: p.brand_primary_hex ?? "",
      p_brand_accent_hex: p.brand_accent_hex ?? "",
      p_brand_welcome_headline: p.brand_welcome_headline ?? "",
      p_brand_welcome_body: p.brand_welcome_body ?? "",
      p_brand_support_email: p.brand_support_email ?? "",
    });
    if (error) toast.error(error.message);
    else void load();
  };

  return (
    <>
      <SEOHead title="Partners — Admin" description="Manage referral partners" noIndex />
      <AdminTopBar />
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-10">
        <div className="container mx-auto px-4 max-w-7xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-navy">Referral Partners</h1>
              <p className="text-muted-foreground text-sm">
                Manage partner accounts, link owners, and send invites.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => load()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4 mr-2" />
                New partner
              </Button>
            </div>
          </div>

          <Card className="p-3 flex flex-wrap items-center gap-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, slug, or email"
              className="max-w-sm h-9"
            />
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={showInactive} onCheckedChange={setShowInactive} />
              Show inactive
            </label>
            <span className="ml-auto text-xs text-muted-foreground">
              {loading ? "Loading…" : `${filtered.length} of ${partners.length}`}
            </span>
          </Card>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead className="text-right">Leads (30d / total)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin inline" />
                    </TableCell>
                  </TableRow>
                )}
                {!loading && filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No partners yet.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {p.avatar_url && (
                          <img
                            src={p.avatar_url}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{p.display_name}</div>
                          {p.phone_e164 && (
                            <div className="text-xs text-muted-foreground">{p.phone_e164}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono">/refer/{p.slug}</TableCell>
                    <TableCell className="text-xs">
                      {p.owner_email ? (
                        p.owner_email
                      ) : (
                        <span className="text-muted-foreground">Not linked</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">
                      {p.parent_slug ? (
                        <span className="font-mono">{p.parent_slug}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {p.leads_30d} / {p.leads_total}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={p.active ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleActive(p)}
                      >
                        {p.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setStatsFor(p)}
                          title="View stats"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setLeadsFor(p)}
                          title="View leads"
                        >
                          <Inbox className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setBrandingFor(p)}
                          title="Branding"
                        >
                          <Palette className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => invite(p)}
                          disabled={busyId === p.id}
                          title={p.owner_email ? "Re-invite" : "Invite owner"}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        {p.owner_email && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => unlink(p)}
                            disabled={busyId === p.id}
                            title="Unlink owner"
                          >
                            <Unlink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => openEdit(p)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => remove(p)}
                          disabled={busyId === p.id || p.leads_total > 0}
                          title={p.leads_total > 0 ? "Cannot delete: has leads" : "Delete"}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit partner" : "New partner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Display name *</Label>
              <Input
                value={form.display_name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    display_name: e.target.value,
                    slug: f.id ? f.slug : slugify(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                placeholder="auto-generated from name"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Phone (E.164)</Label>
                <Input
                  value={form.phone_e164}
                  onChange={(e) => setForm((f) => ({ ...f, phone_e164: e.target.value }))}
                  placeholder="+15551234567"
                />
              </div>
              <div>
                <Label>Avatar URL</Label>
                <Input
                  value={form.avatar_url}
                  onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))}
                  placeholder="https://…"
                />
              </div>
            </div>
            <div>
              <Label>Owner email (optional — sends invite)</Label>
              <Input
                type="email"
                value={form.owner_email}
                onChange={(e) => setForm((f) => ({ ...f, owner_email: e.target.value }))}
                placeholder="partner@example.com"
              />
            </div>
          <div>
            <Label>Parent partner (optional)</Label>
            <select
              value={form.parent_referrer_id}
              onChange={(e) =>
                setForm((f) => ({ ...f, parent_referrer_id: e.target.value }))
              }
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              <option value="">— None (top level) —</option>
              {partners
                .filter((p) => p.id !== form.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.display_name} ({p.slug})
                  </option>
                ))}
            </select>
          </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={form.active}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))}
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={form.sms_notify_optin}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, sms_notify_optin: v }))}
                />
                SMS notify opt-in
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={!!statsFor} onOpenChange={(o) => !o && setStatsFor(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {statsFor && (
            <>
              <SheetHeader>
                <SheetTitle>{statsFor.display_name} — Analytics</SheetTitle>
              </SheetHeader>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Switch
                  checked={includeDescendants}
                  onCheckedChange={setIncludeDescendants}
                />
                <Label className="cursor-pointer">Include sub-partners</Label>
              </div>
              <div className="mt-4">
                <PartnerStatsPanel
                  referrerId={statsFor.id}
                  includeDescendants={includeDescendants}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={!!brandingFor} onOpenChange={(o) => !o && setBrandingFor(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {brandingFor && (
            <>
              <SheetHeader>
                <SheetTitle>{brandingFor.display_name} — Branding</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <PartnerBrandingForm
                  referrerId={brandingFor.id}
                  adminMode
                  partnerRecord={{
                    slug: brandingFor.slug,
                    display_name: brandingFor.display_name,
                    phone_e164: brandingFor.phone_e164,
                    avatar_url: brandingFor.avatar_url,
                    active: brandingFor.active,
                    sms_notify_optin: brandingFor.sms_notify_optin,
                    parent_referrer_id: brandingFor.parent_referrer_id,
                  }}
                  initial={{
                    brand_logo_url: brandingFor.brand_logo_url,
                    brand_primary_hex: brandingFor.brand_primary_hex,
                    brand_accent_hex: brandingFor.brand_accent_hex,
                    brand_welcome_headline: brandingFor.brand_welcome_headline,
                    brand_welcome_body: brandingFor.brand_welcome_body,
                    brand_support_email: brandingFor.brand_support_email,
                  }}
                  onSaved={() => {
                    setBrandingFor(null);
                    void load();
                  }}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <PartnerCsvImport
        open={importOpen}
        onOpenChange={setImportOpen}
        onDone={() => void load()}
      />

      <Sheet open={!!leadsFor} onOpenChange={(o) => !o && setLeadsFor(null)}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
          {leadsFor && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {leadsFor.display_name} — Leads & submissions
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <AdminPartnerLeadsPanel slug={leadsFor.slug} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}