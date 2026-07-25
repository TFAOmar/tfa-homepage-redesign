import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Stats {
  total: number;
  last_30d: number;
  last_7d: number;
  appointments: number;
  ghl_sent: number;
  ghl_failed: number;
  by_week: { week_start: string; count: number }[];
  by_service: Record<string, number>;
  by_language: Record<string, number>;
  by_status: Record<string, number>;
}

export default function PartnerStatsPanel({ referrerId }: { referrerId: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("admin_partner_stats", {
        p_referrer_id: referrerId,
      });
      if (!cancelled) {
        if (error) console.error(error);
        setStats((data as unknown as Stats) ?? null);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [referrerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (!stats) return null;

  const kpis = [
    { label: "Total leads", value: stats.total },
    { label: "Last 30d", value: stats.last_30d },
    { label: "Last 7d", value: stats.last_7d },
    { label: "Appointments", value: stats.appointments },
    { label: "GHL sent", value: stats.ghl_sent },
    { label: "GHL failed", value: stats.ghl_failed },
  ];

  const weekData = (stats.by_week ?? []).map((w) => ({
    week: new Date(w.week_start).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    count: w.count,
  }));

  const renderMix = (title: string, data: Record<string, number>) => {
    const entries = Object.entries(data ?? {});
    if (!entries.length) return null;
    const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
    return (
      <div>
        <div className="text-xs font-semibold text-navy mb-2">{title}</div>
        <div className="space-y-1">
          {entries
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs">
                <div className="w-20 capitalize truncate">{k}</div>
                <div className="flex-1 bg-gray-100 h-2 rounded">
                  <div
                    className="bg-accent h-2 rounded"
                    style={{ width: `${(v / total) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-right text-muted-foreground">{v}</div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <Card key={k.label} className="p-3 text-center">
            <div className="text-2xl font-bold text-navy">{k.value}</div>
            <div className="text-xs text-muted-foreground">{k.label}</div>
          </Card>
        ))}
      </div>
      {weekData.length > 0 && (
        <Card className="p-4">
          <div className="text-xs font-semibold text-navy mb-2">Leads per week (last 12)</div>
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" fontSize={11} />
                <YAxis allowDecimals={false} fontSize={11} />
                <Tooltip />
                <Bar dataKey="count" fill="#C9A84C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">{renderMix("Services", stats.by_service)}</Card>
        <Card className="p-4">{renderMix("Languages", stats.by_language)}</Card>
        <Card className="p-4">{renderMix("Status", stats.by_status)}</Card>
      </div>
    </div>
  );
}