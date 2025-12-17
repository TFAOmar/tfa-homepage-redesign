import { jsPDF } from "jspdf";

export interface CalculatorPdfOptions {
  calculatorName: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string; highlight?: boolean }[];
  insights?: string[];
}

const TFA_GOLD = "#E4B548";
const TFA_NAVY = "#0A0F1F";

export const generateCalculatorPdf = (options: CalculatorPdfOptions): string => {
  const { calculatorName, inputs, results, insights } = options;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Header with TFA branding
  doc.setFillColor(10, 15, 31); // TFA Navy
  doc.rect(0, 0, pageWidth, 45, "F");

  // Company name
  doc.setTextColor(228, 181, 72); // TFA Gold
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("THE FINANCIAL ARCHITECTS", margin, 25);

  // Generated date
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated: ${today}`, pageWidth - margin - 50, 25);

  // Calculator title
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(calculatorName.toUpperCase(), margin, 38);

  yPos = 60;

  // Inputs Section
  doc.setTextColor(10, 15, 31);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("YOUR INPUTS", margin, yPos);
  yPos += 8;

  // Inputs box
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 248, 248);
  const inputsHeight = inputs.length * 8 + 10;
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, inputsHeight, 3, 3, "FD");
  yPos += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  inputs.forEach((input) => {
    doc.text(input.label + ":", margin + 5, yPos);
    doc.setFont("helvetica", "bold");
    doc.text(input.value, pageWidth - margin - 5, yPos, { align: "right" });
    doc.setFont("helvetica", "normal");
    yPos += 8;
  });

  yPos += 15;

  // Results Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("YOUR RESULTS", margin, yPos);
  yPos += 8;

  // Results box with gold accent
  doc.setDrawColor(228, 181, 72);
  doc.setFillColor(255, 251, 235);
  const resultsHeight = results.length * 12 + 15;
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, resultsHeight, 3, 3, "FD");

  // Gold accent bar
  doc.setFillColor(228, 181, 72);
  doc.rect(margin, yPos, 4, resultsHeight, "F");

  yPos += 10;
  doc.setFontSize(10);

  results.forEach((result) => {
    if (result.highlight) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(10, 15, 31);
      doc.text(result.label, margin + 10, yPos);
      doc.setTextColor(228, 181, 72);
      doc.text(result.value, pageWidth - margin - 10, yPos, { align: "right" });
      yPos += 14;
      doc.setFontSize(10);
      doc.setTextColor(10, 15, 31);
    } else {
      doc.setFont("helvetica", "normal");
      doc.text(result.label + ":", margin + 10, yPos);
      doc.setFont("helvetica", "bold");
      doc.text(result.value, pageWidth - margin - 10, yPos, { align: "right" });
      yPos += 10;
    }
    doc.setFont("helvetica", "normal");
  });

  yPos += 15;

  // Insights Section (if provided)
  if (insights && insights.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("KEY INSIGHTS", margin, yPos);
    yPos += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    insights.forEach((insight) => {
      doc.text("• " + insight, margin + 5, yPos);
      yPos += 7;
    });
    yPos += 10;
  }

  // Disclaimer
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, "F");
  yPos += 8;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  const disclaimer = "DISCLAIMER: This is for illustrative purposes only and does not guarantee actual results. Past performance is not indicative of future returns. Consult with a licensed financial advisor before making any financial decisions.";
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - margin * 2 - 10);
  doc.text(splitDisclaimer, margin + 5, yPos);

  yPos += 35;

  // CTA Section
  doc.setFillColor(10, 15, 31);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 30, 3, 3, "F");
  yPos += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Ready to discuss your financial goals?", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(228, 181, 72);
  doc.text("Book a free consultation at tfainsuranceadvisors.com", pageWidth / 2, yPos, { align: "center" });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("The Financial Architects | (888) 350-5396 | info@tfainsuranceadvisors.com", pageWidth / 2, footerY, { align: "center" });
  doc.text("13890 Peyton Dr, Chino Hills, CA 91709", pageWidth / 2, footerY + 5, { align: "center" });

  // Return as base64
  return doc.output("datauristring").split(",")[1];
};
