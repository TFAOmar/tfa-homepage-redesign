import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export interface BrandingValues {
  brand_logo_url: string | null;
  brand_primary_hex: string | null;
  brand_accent_hex: string | null;
  brand_welcome_headline: string | null;
  brand_welcome_body: string | null;
  brand_support_email: string | null;
}

interface Props {
  /** Referrer record id to update. */
  referrerId: string;
  /** Initial values (from parent). */
  initial: Partial<BrandingValues>;
  /**
   * When true, uses the admin RPC path (which requires other partner fields).
   * When false, updates the row directly via the "Owners update branding" policy.
   */
  adminMode?: boolean;
  /** For adminMode: the full partner record so we can re-send required fields. */
  partnerRecord?: {
    slug: string;
    display_name: string;
    phone_e164: string | null;
    avatar_url: string | null;
    active: boolean;
    sms_notify_optin: boolean;
    parent_referrer_id: string | null;
  };
  onSaved?: () => void;
}

const empty: BrandingValues = {
  brand_logo_url: "",
  brand_primary_hex: "",
  brand_accent_hex: "",
  brand_welcome_headline: "",
  brand_welcome_body: "",
  brand_support_email: "",
};

export default function PartnerBrandingForm({
  referrerId,
  initial,
  adminMode = false,
  partnerRecord,
  onSaved,
}: Props) {
  const [v, setV] = useState<BrandingValues>({ ...empty, ...initial } as BrandingValues);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setV({ ...empty, ...initial } as BrandingValues);
  }, [initial, referrerId]);

  const save = async () => {
    setSaving(true);
    try {
      if (adminMode && partnerRecord) {
        const { error } = await supabase.rpc("admin_upsert_referrer", {
          p_id: referrerId,
          p_slug: partnerRecord.slug,
          p_display_name: partnerRecord.display_name,
          p_phone_e164: partnerRecord.phone_e164 ?? "",
          p_avatar_url: partnerRecord.avatar_url ?? "",
          p_active: partnerRecord.active,
          p_sms_notify_optin: partnerRecord.sms_notify_optin,
          p_parent_referrer_id: partnerRecord.parent_referrer_id,
          p_brand_logo_url: v.brand_logo_url ?? "",
          p_brand_primary_hex: v.brand_primary_hex ?? "",
          p_brand_accent_hex: v.brand_accent_hex ?? "",
          p_brand_welcome_headline: v.brand_welcome_headline ?? "",
          p_brand_welcome_body: v.brand_welcome_body ?? "",
          p_brand_support_email: v.brand_support_email ?? "",
        });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("intake_referrers")
          .update({
            brand_logo_url: v.brand_logo_url || null,
            brand_primary_hex: v.brand_primary_hex || null,
            brand_accent_hex: v.brand_accent_hex || null,
            brand_welcome_headline: v.brand_welcome_headline || null,
            brand_welcome_body: v.brand_welcome_body || null,
            brand_support_email: v.brand_support_email || null,
          })
          .eq("id", referrerId);
        if (error) throw error;
      }
      toast.success("Branding saved");
      onSaved?.();
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Logo URL</Label>
        <Input
          value={v.brand_logo_url ?? ""}
          onChange={(e) => setV((s) => ({ ...s, brand_logo_url: e.target.value }))}
          placeholder="https://…/logo.png"
        />
        {v.brand_logo_url && (
          <img
            src={v.brand_logo_url}
            alt="Logo preview"
            className="mt-2 h-12 object-contain bg-gray-50 rounded p-1"
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Primary color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={v.brand_primary_hex || "#1E3A5F"}
              onChange={(e) => setV((s) => ({ ...s, brand_primary_hex: e.target.value }))}
              className="w-14 h-10 p-1"
            />
            <Input
              value={v.brand_primary_hex ?? ""}
              onChange={(e) => setV((s) => ({ ...s, brand_primary_hex: e.target.value }))}
              placeholder="#1E3A5F"
            />
          </div>
        </div>
        <div>
          <Label>Accent color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={v.brand_accent_hex || "#C9A84C"}
              onChange={(e) => setV((s) => ({ ...s, brand_accent_hex: e.target.value }))}
              className="w-14 h-10 p-1"
            />
            <Input
              value={v.brand_accent_hex ?? ""}
              onChange={(e) => setV((s) => ({ ...s, brand_accent_hex: e.target.value }))}
              placeholder="#C9A84C"
            />
          </div>
        </div>
      </div>
      <div>
        <Label>Welcome headline</Label>
        <Input
          value={v.brand_welcome_headline ?? ""}
          onChange={(e) => setV((s) => ({ ...s, brand_welcome_headline: e.target.value }))}
          placeholder="Welcome to Acme Referral Portal"
          maxLength={120}
        />
      </div>
      <div>
        <Label>Welcome body</Label>
        <Textarea
          value={v.brand_welcome_body ?? ""}
          onChange={(e) => setV((s) => ({ ...s, brand_welcome_body: e.target.value }))}
          rows={3}
          maxLength={500}
        />
      </div>
      <div>
        <Label>Support email</Label>
        <Input
          type="email"
          value={v.brand_support_email ?? ""}
          onChange={(e) => setV((s) => ({ ...s, brand_support_email: e.target.value }))}
          placeholder="you@company.com"
        />
      </div>
      <Button onClick={save} disabled={saving}>
        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        Save branding
      </Button>
    </div>
  );
}