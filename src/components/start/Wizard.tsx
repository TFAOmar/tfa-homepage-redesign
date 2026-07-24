import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/LanguageContext";
import { questionsFor, type Question } from "./steps";

interface Props {
  services: string[];
  onDone: (answers: Record<string, string>) => void;
  onBack: () => void;
}

export default function Wizard({ services, onDone, onBack }: Props) {
  const { lang, t } = useLang();
  const questions: Question[] = useMemo(() => questionsFor(services), [services]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (questions.length === 0) return null;
  const q = questions[idx];
  const progress = Math.round(((idx + 1) / (questions.length + 1)) * 100);

  const pick = (val: string) => {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (idx + 1 < questions.length) setIdx(idx + 1);
    else onDone(next);
  };

  const goBack = () => {
    if (idx === 0) onBack();
    else setIdx(idx - 1);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
        <button onClick={goBack} className="mt-4 text-sm text-navy inline-flex items-center gap-1 hover:underline">
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </button>
      </div>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-6">{lang === "es" ? q.es : q.en}</h2>
      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => pick(opt.value)}
            className="w-full text-left rounded-xl border-2 border-gray-200 bg-white px-5 py-4 hover:border-accent hover:shadow-md transition font-medium text-navy"
          >
            {lang === "es" ? opt.es : opt.en}
          </button>
        ))}
      </div>
    </div>
  );
}