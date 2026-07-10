import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  label: string;
  value: "Yes" | "No" | "" | undefined;
  onChange: (v: "Yes" | "No") => void;
  children?: ReactNode; // Follow-up fields rendered when value === "Yes"
  idBase: string;
}

export default function ConditionalYesNo({ label, value, onChange, children, idBase }: Props) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-3 bg-card">
      <div className="flex items-start justify-between gap-4">
        <Label className="flex-1 text-sm font-medium">{label}</Label>
        <RadioGroup
          value={value || ""}
          onValueChange={(v) => onChange(v as "Yes" | "No")}
          className="flex gap-4 shrink-0"
        >
          <div className="flex items-center gap-1">
            <RadioGroupItem value="Yes" id={`${idBase}-yes`} />
            <Label htmlFor={`${idBase}-yes`} className="text-sm cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem value="No" id={`${idBase}-no`} />
            <Label htmlFor={`${idBase}-no`} className="text-sm cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </div>
      {value === "Yes" && children && (
        <div className="pt-3 border-t border-border space-y-3">{children}</div>
      )}
    </div>
  );
}