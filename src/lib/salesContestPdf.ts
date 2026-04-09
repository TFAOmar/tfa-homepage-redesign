import jsPDF from "jspdf";
import tfaLogoUrl from "@/assets/tfa-logo.png";

type RGB = [number, number, number];
const NAVY: RGB = [30, 58, 95];
const GOLD: RGB = [201, 168, 76];
const WHITE: RGB = [255, 255, 255];
const LIGHT_GOLD: RGB = [240, 225, 180];

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

export async function generateSalesContestPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // Full navy background
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, H, "F");

  // Top gold accent bar
  doc.setFillColor(...GOLD);
  doc.rect(30, 15, 150, 2, "F");

  // Add TFA logo
  try {
    const logoBase64 = await loadImageAsBase64(tfaLogoUrl);
    doc.addImage(logoBase64, "PNG", 75, 22, 60, 15);
  } catch {
    // Fallback if logo fails to load
  }

  // Headline
  doc.setTextColor(...GOLD);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("ARCHITECT YOUR", W / 2, 55, { align: "center" });
  doc.text("BEST MONTH", W / 2, 68, { align: "center" });

  // Subheadline
  doc.setTextColor(...WHITE);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("April 2026 Sales Competition — The Financial Architects", W / 2, 82, { align: "center" });

  // Divider
  doc.setFillColor(...GOLD);
  doc.rect(60, 90, 90, 0.5, "F");

  // Body intro
  doc.setTextColor(...LIGHT_GOLD);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const introLines = doc.splitTextToSize(
    "This April, the top producers earn a seat at an exclusive high-end dinner and private mastermind session with TFA CEO Manny Soto and COO Omar Sanchez.",
    150
  );
  doc.text(introLines, W / 2, 102, { align: "center" });

  // Two Categories header
  doc.setTextColor(...GOLD);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Two Categories. Four Winners.", W / 2, 130, { align: "center" });

  // Category boxes
  const boxY = 140;
  const boxH = 30;
  const boxW = 70;

  // Box 1 - Living Trust
  doc.setFillColor(25, 50, 82);
  doc.roundedRect(25, boxY, boxW, boxH, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.roundedRect(25, boxY, boxW, boxH, 3, 3, "S");
  doc.setTextColor(...GOLD);
  doc.setFontSize(10);
  doc.text("TOP 2 AGENTS", 60, boxY + 12, { align: "center" });
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Living Trust Sales", 60, boxY + 20, { align: "center" });

  // Box 2 - Life & Annuity
  doc.setFillColor(25, 50, 82);
  doc.roundedRect(115, boxY, boxW, boxH, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.roundedRect(115, boxY, boxW, boxH, 3, 3, "S");
  doc.setTextColor(...GOLD);
  doc.setFontSize(10);
  doc.text("TOP 2 AGENTS", 150, boxY + 12, { align: "center" });
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Life & Annuity", 150, boxY + 20, { align: "center" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Submitted Business", 150, boxY + 26, { align: "center" });

  // Prize section
  doc.setFillColor(...GOLD);
  doc.rect(30, 185, 150, 0.5, "F");

  doc.setTextColor(...GOLD);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("The Prize", W / 2, 198, { align: "center" });

  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const prizeLines = doc.splitTextToSize(
    "An intimate dinner and mastermind session with TFA leadership. Strategy, vision, and next-level growth — reserved for the elite 4.",
    150
  );
  doc.text(prizeLines, W / 2, 210, { align: "center" });

  // Contest period
  doc.setFillColor(25, 50, 82);
  doc.roundedRect(50, 228, 110, 18, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.roundedRect(50, 228, 110, 18, 3, 3, "S");
  doc.setTextColor(...GOLD);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CONTEST PERIOD", W / 2, 237, { align: "center" });
  doc.setTextColor(...WHITE);
  doc.setFontSize(12);
  doc.text("April 1 – April 30, 2026", W / 2, 244, { align: "center" });

  // Bottom tagline
  doc.setFillColor(...GOLD);
  doc.rect(30, 258, 150, 0.5, "F");

  doc.setTextColor(...GOLD);
  doc.setFontSize(13);
  doc.setFont("helvetica", "italic");
  doc.text("Only 4 seats at the table. Make them yours.", W / 2, 268, { align: "center" });

  // Footer
  doc.setTextColor(150, 160, 175);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("The Financial Architects — Building Legacies Together", W / 2, 285, { align: "center" });

  // Bottom gold bar
  doc.setFillColor(...GOLD);
  doc.rect(30, 290, 150, 2, "F");

  doc.save("TFA-April-2026-Sales-Contest.pdf");
}
