import { useState } from "react";
import { HomeIcon, ShieldIcon, LineChartIcon, LayersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/LanguageContext";

interface Props {
  onPick: (services: string[]) => void;
}

const CARDS = [
  { key: "trust", Icon: HomeIcon },
  { key: "life", Icon: ShieldIcon },
  { key: "retirement", Icon: LineChartIcon },
  { key: "combo", Icon: LayersIcon },
] as const;

export default function ServicePicker({ onPick }: Props) {
  const { t } = useLang();
  const [combo, setCombo] = useState<string[]>([]);
  const [showCombo, setShowCombo] = useState(false);

  const labels: Record<string, { title: string; desc: string }> = {
    trust: { title: t.svcTrust, desc: t.svcTrustDesc },
    life: { title: t.svcLife, desc: t.svcLifeDesc },
    retirement: { title: t.svcRetire, desc: t.svcRetireDesc },
    combo: { title: t.svcCombo, desc: t.svcComboDesc },
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold text-center mb-2">{t.step0Title}</h2>
      <p className="text-center text-muted-foreground mb-8">{t.step0Sub}</p>

      {!showCombo ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CARDS.map(({ key, Icon }) => (
            <button
              key={key}
              onClick={() => (key === "combo" ? setShowCombo(true) : onPick([key]))}
              className="text-left rounded-2xl border-2 border-gray-200 bg-white p-6 hover:border-accent hover:shadow-lg transition group"
            >
              <Icon className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-serif text-xl font-bold text-navy mb-1">{labels[key].title}</h3>
              <p className="text-sm text-muted-foreground">{labels[key].desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-accent bg-white p-6">
          <h3 className="font-serif text-xl font-bold text-navy mb-4">{t.pickMultiple}</h3>
          <div className="space-y-3">
            {(["trust", "life", "retirement"] as const).map((k) => (
              <label key={k} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-navy"
                  checked={combo.includes(k)}
                  onChange={(e) =>
                    setCombo(e.target.checked ? [...combo, k] : combo.filter((x) => x !== k))
                  }
                />
                <span className="font-semibold text-navy">{labels[k].title}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowCombo(false)}>{t.back}</Button>
            <Button className="btn-primary-cta flex-1" disabled={combo.length === 0} onClick={() => onPick(combo)}>
              {t.continue}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}