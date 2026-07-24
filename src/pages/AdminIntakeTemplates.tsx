import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo";

interface Template {
  id: string;
  team_key: string;
  language: string;
  kind: string;
  body: string;
}

function render(tpl: string) {
  return tpl
    .replace(/\{first_name\}/g, "Alex")
    .replace(/\{referrer_name\}/g, "Jamie")
    .replace(/\{member_name\}/g, "Sam")
    .replace(/\{scheduling_url\}/g, "https://cal.example.com/sam");
}

export default function AdminIntakeTemplates() {
  const [rows, setRows] = useState<Template[]>([]);
  const [preview, setPreview] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("intake_sms_templates")
        .select("*")
        .order("team_key")
        .order("language")
        .order("kind");
      setRows((data || []) as Template[]);
    })();
  }, []);

  return (
    <>
      <SEOHead title="Intake SMS Templates" description="Preview intake SMS templates." />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-serif font-bold text-navy">Intake SMS Templates</h1>
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} />
              Show rendered preview
            </label>
          </div>
          <div className="space-y-4">
            {rows.map((t) => (
              <div key={t.id} className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
                  <span className="rounded bg-navy/10 text-navy px-2 py-0.5">{t.team_key}</span>
                  <span className="rounded bg-accent/10 text-accent px-2 py-0.5">{t.language}</span>
                  <span className="rounded bg-gray-100 text-gray-600 px-2 py-0.5">{t.kind}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                  {preview ? render(t.body) : t.body}
                </p>
              </div>
            ))}
            {rows.length === 0 && <p className="text-muted-foreground">No templates loaded.</p>}
          </div>
        </div>
      </main>
    </>
  );
}