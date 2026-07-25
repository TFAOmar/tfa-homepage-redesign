import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface PartnerBranding {
  id: string;
  slug: string;
  display_name: string;
  brand_logo_url: string | null;
  brand_primary_hex: string | null;
  brand_accent_hex: string | null;
  brand_welcome_headline: string | null;
  brand_welcome_body: string | null;
  brand_support_email: string | null;
  parent_referrer_id: string | null;
  depth: number;
}

interface Ctx {
  branding: PartnerBranding | null;
  loading: boolean;
  refresh: () => void;
}

const PartnerBrandingContext = createContext<Ctx>({
  branding: null,
  loading: false,
  refresh: () => {},
});

export const usePartnerBranding = () => useContext(PartnerBrandingContext);

export function PartnerBrandingProvider({ children }: { children: ReactNode }) {
  const { user, isPartner, isAdmin, isStaff } = useAuth();
  const [branding, setBranding] = useState<PartnerBranding | null>(null);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Only apply branding when the viewer is a partner (not admin/staff).
    if (!user || !isPartner || isAdmin || isStaff) {
      setBranding(null);
      return;
    }
    setLoading(true);
    (async () => {
      const { data } = await supabase.rpc("get_my_partner_branding");
      const row = Array.isArray(data) ? (data[0] as PartnerBranding | undefined) : null;
      setBranding(row ?? null);
      setLoading(false);
    })();
  }, [user, isPartner, isAdmin, isStaff, tick]);

  const primary = branding?.brand_primary_hex || undefined;
  const accent = branding?.brand_accent_hex || undefined;

  const style: React.CSSProperties = {};
  if (primary) (style as any)["--partner-primary"] = primary;
  if (accent) (style as any)["--partner-accent"] = accent;

  return (
    <PartnerBrandingContext.Provider
      value={{ branding, loading, refresh: () => setTick((t) => t + 1) }}
    >
      <div style={style}>{children}</div>
    </PartnerBrandingContext.Provider>
  );
}

/** Header block shown at the top of /concierge when a partner has branding set. */
export function PartnerBrandingHeader() {
  const { branding } = usePartnerBranding();
  if (!branding) return null;
  const hasAny =
    branding.brand_logo_url ||
    branding.brand_welcome_headline ||
    branding.brand_welcome_body;
  if (!hasAny) return null;
  return (
    <div
      className="rounded-lg border p-5 mb-6 bg-white"
      style={{
        borderColor: branding.brand_primary_hex || undefined,
      }}
    >
      <div className="flex items-center gap-4">
        {branding.brand_logo_url && (
          <img
            src={branding.brand_logo_url}
            alt={`${branding.display_name} logo`}
            className="h-12 object-contain"
          />
        )}
        <div className="flex-1">
          {branding.brand_welcome_headline && (
            <h2
              className="font-serif text-xl font-bold"
              style={{ color: branding.brand_primary_hex || "#1E3A5F" }}
            >
              {branding.brand_welcome_headline}
            </h2>
          )}
          {branding.brand_welcome_body && (
            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
              {branding.brand_welcome_body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}