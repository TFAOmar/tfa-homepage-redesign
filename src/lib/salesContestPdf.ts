import jsPDF from "jspdf";
import tfaLogoUrl from "@/assets/tfa-logo.png";
import mannySotoUrl from "@/assets/leadership/manny-soto.jpg";
import omarSanchezUrl from "@/assets/leadership/omar-sanchez.jpg";

type RGB = [number, number, number];
const NAVY: RGB = [30, 58, 95];
const GOLD: RGB = [201, 168, 76];
const WHITE: RGB = [255, 255, 255];
const LIGHT_GOLD: RGB = [240, 225, 180];
const DARK_NAVY: RGB = [20, 42, 72];

async function loadImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function drawGoldCornerAccents(doc: jsPDF, W: number, H: number) {
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  const len = 15;
  // Top-left
  doc.line(10, 10, 10 + len, 10);
  doc.line(10, 10, 10, 10 + len);
  // Top-right
  doc.line(W - 10, 10, W - 10 - len, 10);
  doc.line(W - 10, 10, W - 10, 10 + len);
  // Bottom-left
  doc.line(10, H - 10, 10 + len, H - 10);
  doc.line(10, H - 10, 10, H - 10 - len);
  // Bottom-right
  doc.line(W - 10, H - 10, W - 10 - len, H - 10);
  doc.line(W - 10, H - 10, W - 10, H - 10 - len);
}

export async function generateSalesContestPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // Load all images in parallel
  const [logoBase64, mannyBase64, omarBase64] = await Promise.all([
    loadImageAsBase64(tfaLogoUrl).catch(() => null),
    loadImageAsBase64(mannySotoUrl).catch(() => null),
    loadImageAsBase64(omarSanchezUrl).catch(() => null),
  ]);

  // Full navy background
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, H, "F");

  // Gold corner accents
  drawGoldCornerAccents(doc, W, H);

  // Double gold accent bars at top
  doc.setFillColor(...GOLD);
  doc.rect(25, 14, 160, 1.5, "F");
  doc.rect(35, 17, 140, 0.5, "F");

  // Add TFA logo
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 75, 22, 60, 15);
  }

  // Headline
  doc.setTextColor(...GOLD);
  doc.setFontSize(30);
  doc.setFont("helvetica", "bold");
  doc.text("ARCHITECT YOUR", W / 2, 50, { align: "center" });
  doc.text("BEST MONTH", W / 2, 62, { align: "center" });

  // Subheadline
  doc.setTextColor(...WHITE);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("April 2026 Sales Competition — The Financial Architects", W / 2, 73, { align: "center" });

  // Divider
  doc.setFillColor(...GOLD);
  doc.rect(55, 78, 100, 0.5, "F");

  // Body intro
  doc.setTextColor(...LIGHT_GOLD);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const introLines = doc.splitTextToSize(
    "This April, the top producers earn a seat at an exclusive high-end dinner and private mastermind session with TFA CEO Manny Soto and COO Omar Sanchez.",
    145
  );
  doc.text(introLines, W / 2, 87, { align: "center" });

  // Two Categories header
  doc.setTextColor(...GOLD);
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("Two Categories. Four Winners.", W / 2, 108, { align: "center" });

  // Category boxes
  const boxY = 114;
  const boxH = 34;
  const boxW = 72;

  // Box 1 - Living Trust
  doc.setFillColor(...DARK_NAVY);
  doc.roundedRect(22, boxY, boxW, boxH, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.7);
  doc.roundedRect(22, boxY, boxW, boxH, 3, 3, "S");
  // Gold top ribbon
  doc.setFillColor(...GOLD);
  doc.rect(22, boxY, boxW, 3, "F");
  doc.setTextColor(...NAVY);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("CATEGORY 1", 58, boxY + 2.5, { align: "center" });
  // Trophy + text
  doc.setTextColor(...GOLD);
  doc.setFontSize(18);
  doc.text("\u{1F3C6}", 58, boxY + 15, { align: "center" });
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Top 2 Agents", 58, boxY + 22, { align: "center" });
  doc.setFontSize(10);
  doc.text("Living Trust Sales", 58, boxY + 28, { align: "center" });

  // Box 2 - Life & Annuity
  doc.setFillColor(...DARK_NAVY);
  doc.roundedRect(116, boxY, boxW, boxH, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.roundedRect(116, boxY, boxW, boxH, 3, 3, "S");
  doc.setFillColor(...GOLD);
  doc.rect(116, boxY, boxW, 3, "F");
  doc.setTextColor(...NAVY);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("CATEGORY 2", 152, boxY + 2.5, { align: "center" });
  doc.setTextColor(...GOLD);
  doc.setFontSize(18);
  doc.text("\u{1F3C6}", 152, boxY + 15, { align: "center" });
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Top 2 Agents", 152, boxY + 22, { align: "center" });
  doc.setFontSize(10);
  doc.text("Life & Annuity", 152, boxY + 28, { align: "center" });

  // Meet Your Hosts section
  doc.setFillColor(...GOLD);
  doc.rect(30, 158, 150, 0.5, "F");

  doc.setTextColor(...GOLD);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Meet Your Hosts", W / 2, 168, { align: "center" });

  // Headshot frames
  const photoSize = 28;
  const photoY = 174;

  // Manny Soto - left
  const mannyX = 48;
  if (mannyBase64) {
    doc.addImage(mannyBase64, "JPEG", mannyX, photoY, photoSize, photoSize);
  }
  // Gold border around headshot
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.rect(mannyX, photoY, photoSize, photoSize, "S");

  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Manuel Soto", mannyX + photoSize / 2, photoY + photoSize + 7, { align: "center" });
  doc.setTextColor(...GOLD);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("CEO & Founder", mannyX + photoSize / 2, photoY + photoSize + 12, { align: "center" });
  doc.setTextColor(...LIGHT_GOLD);
  doc.setFontSize(7);
  const mannyBio = doc.splitTextToSize("Nearly two decades of experience. The architect behind TFA's mission.", 50);
  doc.text(mannyBio, mannyX + photoSize / 2, photoY + photoSize + 17, { align: "center" });

  // Omar Sanchez - right
  const omarX = 134;
  if (omarBase64) {
    doc.addImage(omarBase64, "JPEG", omarX, photoY, photoSize, photoSize);
  }
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.rect(omarX, photoY, photoSize, photoSize, "S");

  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Omar Sanchez", omarX + photoSize / 2, photoY + photoSize + 7, { align: "center" });
  doc.setTextColor(...GOLD);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("COO & Managing Partner", omarX + photoSize / 2, photoY + photoSize + 12, { align: "center" });
  doc.setTextColor(...LIGHT_GOLD);
  doc.setFontSize(7);
  const omarBio = doc.splitTextToSize("Leading TFA's national expansion with strategy and execution.", 50);
  doc.text(omarBio, omarX + photoSize / 2, photoY + photoSize + 17, { align: "center" });

  // Prize section
  doc.setFillColor(...GOLD);
  doc.rect(30, 232, 150, 0.5, "F");

  doc.setTextColor(...GOLD);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("The Prize", W / 2, 241, { align: "center" });

  doc.setTextColor(...WHITE);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const prizeLines = doc.splitTextToSize(
    "An intimate dinner and mastermind session with TFA leadership. Strategy, vision, and next-level growth — reserved for the elite 4.",
    145
  );
  doc.text(prizeLines, W / 2, 249, { align: "center" });

  // Contest period box
  doc.setFillColor(...DARK_NAVY);
  doc.roundedRect(55, 260, 100, 16, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.roundedRect(55, 260, 100, 16, 3, 3, "S");
  doc.setTextColor(...GOLD);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("CONTEST PERIOD", W / 2, 268, { align: "center" });
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.text("April 1 – April 30, 2026", W / 2, 274, { align: "center" });

  // Bottom tagline
  doc.setTextColor(...GOLD);
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.text("Only 4 seats at the table. Make them yours.", W / 2, 286, { align: "center" });

  // Footer
  doc.setTextColor(150, 160, 175);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("The Financial Architects — Building Legacies Together", W / 2, 292, { align: "center" });

  // Double gold bars at bottom
  doc.setFillColor(...GOLD);
  doc.rect(35, 294, 140, 0.5, "F");
  doc.rect(25, 296, 160, 1.5, "F");

  doc.save("TFA-April-2026-Sales-Contest.pdf");
}
