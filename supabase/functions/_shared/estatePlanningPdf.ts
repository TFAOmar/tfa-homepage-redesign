// Generates a complete PDF of an estate planning (living trust) questionnaire
// submission. Every field the client submitted is rendered — the walker is
// generic so new wizard fields appear automatically.
import jsPDF from "https://esm.sh/jspdf@2.5.1?bundle";

const NAVY: [number, number, number] = [30, 58, 95];
const GOLD: [number, number, number] = [201, 168, 76];
const DARK: [number, number, number] = [17, 24, 39];
const GRAY: [number, number, number] = [107, 114, 128];

const STEP_TITLES: Record<string, string> = {
  step1: "Client / Trustor Information",
  step2: "Family, Children & Heirs",
  step3: "Successor Trustees",
  step4: "Beneficiaries",
  step5: "Attorney-in-Fact (Power of Attorney)",
  step6: "Healthcare Directives",
  step7: "Assets & Liabilities",
  step8: "Review, Signature & Consent",
};

const prettifyKey = (key: string): string =>
  key
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\bSsn\b/gi, "SSN")
    .replace(/\bDob\b/gi, "DOB")
    .replace(/\bZip\b/gi, "ZIP")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map((v) => formatValue(v)).join(", ");
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(([k, v]) => `${prettifyKey(k)}: ${formatValue(v)}`)
      .join("; ");
  }
  return String(value);
};

export interface EstatePdfMeta {
  submissionId: string;
  submittedAt: string;
  advisorName: string;
  advisorSlug: string;
  advisorEmail: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  spouseName?: string | null;
  sourceUrl?: string | null;
}

/** Returns the PDF as a base64 string (no data-uri prefix). */
export function generateEstatePlanningPdf(
  meta: EstatePdfMeta,
  formData: Record<string, unknown>,
): string {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  const newPage = () => {
    doc.addPage();
    y = margin;
  };
  const ensure = (needed: number) => {
    if (y + needed > pageHeight - margin) newPage();
  };

  // ---- Header banner
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 96, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Living Trust Questionnaire", margin, 42);
  doc.setFillColor(...GOLD);
  doc.rect(margin, 52, 56, 3, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("The Financial Architects — Estate Planning Intake", margin, 74);
  y = 124;

  // ---- Submission summary
  const summary: Array<[string, string]> = [
    ["Submission ID", meta.submissionId],
    ["Submitted", meta.submittedAt],
    ["Advisor", meta.advisorName],
    ["Advisor Slug", meta.advisorSlug || "—"],
    ["Advisor Email", meta.advisorEmail],
    ["Client", meta.applicantName],
    ["Client Email", meta.applicantEmail],
    ["Client Phone", meta.applicantPhone],
    ["Spouse / Co-Trustee", meta.spouseName || "—"],
    ["Source", meta.sourceUrl || "—"],
  ];

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  const boxHeight = summary.length * 16 + 20;
  doc.roundedRect(margin, y, contentWidth, boxHeight, 6, 6, "FD");
  let sy = y + 20;
  for (const [label, value] of summary) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(label, margin + 12, sy);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...DARK);
    const lines = doc.splitTextToSize(String(value), contentWidth - 160) as string[];
    doc.text(lines[0] ?? "—", margin + 150, sy);
    sy += 16;
  }
  y += boxHeight + 24;

  // ---- Sections
  const writeSectionTitle = (title: string) => {
    ensure(48);
    doc.setFillColor(...NAVY);
    doc.rect(margin, y, contentWidth, 22, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title, margin + 10, y + 15);
    y += 34;
  };

  const writeField = (label: string, value: string, indent = 0) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    const labelLines = doc.splitTextToSize(label, 170 - indent) as string[];
    doc.setFont("helvetica", "normal");
    const valueLines = doc.splitTextToSize(value, contentWidth - 190 - indent) as string[];
    const rowHeight = Math.max(labelLines.length, valueLines.length) * 12 + 4;
    ensure(rowHeight + 6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GRAY);
    doc.text(labelLines, margin + 8 + indent, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...DARK);
    doc.text(valueLines, margin + 186, y);
    y += rowHeight;
  };

  const writeSubTitle = (title: string) => {
    ensure(24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text(title, margin + 8, y);
    y += 16;
  };

  const walk = (obj: Record<string, unknown>, indent = 0) => {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined || value === "") {
        writeField(prettifyKey(key), "—", indent);
        continue;
      }
      if (Array.isArray(value)) {
        if (value.length === 0) {
          writeField(prettifyKey(key), "None provided", indent);
          continue;
        }
        writeSubTitle(`${prettifyKey(key)} (${value.length})`);
        value.forEach((item, i) => {
          if (item && typeof item === "object" && !Array.isArray(item)) {
            writeSubTitle(`  ${prettifyKey(key)} #${i + 1}`);
            walk(item as Record<string, unknown>, indent + 12);
          } else {
            writeField(`#${i + 1}`, formatValue(item), indent + 12);
          }
        });
        continue;
      }
      if (typeof value === "object") {
        writeSubTitle(prettifyKey(key));
        walk(value as Record<string, unknown>, indent + 12);
        continue;
      }
      writeField(prettifyKey(key), formatValue(value), indent);
    }
  };

  const orderedKeys = [
    ...Object.keys(STEP_TITLES).filter((k) => k in formData),
    ...Object.keys(formData).filter((k) => !(k in STEP_TITLES)),
  ];

  for (const stepKey of orderedKeys) {
    const stepValue = formData[stepKey];
    writeSectionTitle(STEP_TITLES[stepKey] ?? prettifyKey(stepKey));
    if (stepValue && typeof stepValue === "object" && !Array.isArray(stepValue)) {
      walk(stepValue as Record<string, unknown>);
    } else {
      writeField(prettifyKey(stepKey), formatValue(stepValue));
    }
    y += 12;
  }

  // ---- Footers
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(
      `TFA Living Trust Questionnaire · Submission ${meta.submissionId} · Confidential`,
      margin,
      pageHeight - 24,
    );
    doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin - 60, pageHeight - 24);
  }

  const out = doc.output("datauristring");
  return out.split(",")[1];
}
