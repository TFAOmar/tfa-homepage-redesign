import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users } from "lucide-react";

interface Child {
  id: string;
  slug: string;
  display_name: string;
  active: boolean;
  leads_total: number;
  leads_30d: number;
  depth: number;
}

interface Props {
  /** Admin can pass a specific referrer id; partners omit to use their own. */
  referrerId?: string;
}

export default function PartnerChildrenPanel({ referrerId }: Props) {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .rpc("partner_list_children", { p_referrer_id: referrerId ?? null })
      .then(({ data }) => {
        setChildren((data as unknown as Child[]) ?? []);
        setLoading(false);
      });
  }, [referrerId]);

  if (loading) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading sub-partners…
      </Card>
    );
  }
  if (children.length === 0) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-navy" />
        <h3 className="font-semibold text-navy">Sub-partners</h3>
        <Badge variant="outline">{children.length}</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {children.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between border rounded-md p-2 text-sm"
          >
            <div>
              <div className="font-medium">{c.display_name}</div>
              <div className="text-xs text-muted-foreground font-mono">/refer/{c.slug}</div>
            </div>
            <div className="text-xs text-right">
              <div>
                {c.leads_30d} / {c.leads_total}
              </div>
              <div className="text-muted-foreground">30d / total</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}