import jsPDF from "jspdf";

const NAVY = [30, 58, 95] as const;    // #1E3A5F
const GOLD = [201, 168, 76] as const;  // #C9A84C
const WHITE = [255, 255, 255] as const;
const DARK = [40, 56, 69] as const;    // #283845
const LIGHT_BG = [250, 250, 250] as const;
const GRAY = [120, 130, 140] as const;

function addPageHeader(doc: jsPDF, pageTitle: string) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(pageTitle, 20, 20);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("The Financial Architects — Brand Guidelines", 210 - 20, 20, { align: "right" });
}

function addFooter(doc: jsPDF, pageNum: number) {
  doc.setTextColor(...GRAY);
  doc.setFontSize(7);
  doc.text(`© ${new Date().getFullYear()} The Financial Architects  |  Confidential`, 20, 287);
  doc.text(`Page ${pageNum}`, 190, 287, { align: "right" });
}

export async function generateBrandGuidelinesPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let page = 1;

  // === COVER PAGE ===
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 297, "F");
  
  // Gold accent bar
  doc.setFillColor(...GOLD);
  doc.rect(20, 100, 60, 3, "F");

  doc.setTextColor(...WHITE);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text("Brand", 20, 125);
  doc.text("Guidelines", 20, 140);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GOLD);
  doc.text("The Financial Architects", 20, 160);

  doc.setFontSize(10);
  doc.setTextColor(180, 190, 200);
  doc.text("Official guide for internal teams, advisors,", 20, 175);
  doc.text("and external partners.", 20, 182);

  doc.setFontSize(8);
  doc.setTextColor(140, 150, 160);
  doc.text(`Version 1.0  |  ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`, 20, 270);

  // === PAGE 2: COLOR PALETTE ===
  doc.addPage();
  page++;
  addPageHeader(doc, "Color Palette");
  addFooter(doc, page);

  const colors = [
    { name: "Primary Navy", hex: "#1E3A5F", rgb: NAVY, usage: "Headers, backgrounds, trust" },
    { name: "Primary Gold", hex: "#C9A84C", rgb: GOLD, usage: "Accents, CTAs, warmth" },
    { name: "Navy Light", hex: "#3D5A80", rgb: [61, 90, 128] as [number, number, number], usage: "Secondary text, hover" },
    { name: "Gold Light", hex: "#D4BC7A", rgb: [212, 188, 122] as [number, number, number], usage: "Subtle accents" },
    { name: "CTA Gold", hex: "#E4B548", rgb: [228, 181, 72] as [number, number, number], usage: "Call-to-action buttons" },
    { name: "CTA Hover", hex: "#1A2744", rgb: [26, 39, 68] as [number, number, number], usage: "Button hover state" },
    { name: "Background", hex: "#FAFAFA", rgb: LIGHT_BG, usage: "Page backgrounds" },
    { name: "Foreground", hex: "#283845", rgb: DARK, usage: "Body text" },
  ];

  let y = 42;
  colors.forEach((c, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 20 + col * 90;
    const cy = 42 + row * 30;

    doc.setFillColor(...c.rgb);
    doc.roundedRect(x, cy, 20, 20, 2, 2, "F");
    // Outline for light colors
    if (c.hex === "#FAFAFA") {
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(x, cy, 20, 20, 2, 2, "S");
    }

    doc.setTextColor(...DARK);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(c.name, x + 24, cy + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(`${c.hex}  —  ${c.usage}`, x + 24, cy + 14);
  });

  // Usage rule
  y = 42 + Math.ceil(colors.length / 2) * 30 + 10;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, y, 170, 18, 2, 2, "F");
  doc.setTextColor(...DARK);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Usage Rule:", 25, y + 7);
  doc.setFont("helvetica", "normal");
  doc.text("Always use CSS design tokens — never hardcode hex values in components.", 25, y + 13);

  // === PAGE 3: TYPOGRAPHY ===
  doc.addPage();
  page++;
  addPageHeader(doc, "Typography");
  addFooter(doc, page);

  doc.setTextColor(...DARK);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Primary Font: Inter (sans-serif)", 20, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text("Loaded via Google Fonts. Used for all headings and body text across digital properties.", 20, 49);

  const typeScale = [
    { label: "Display / H1", size: "36–48px", weight: "Bold (700)", sample: "Financial Guidance Built for Families", fontSize: 20 },
    { label: "H2", size: "30px", weight: "Bold (700)", sample: "Our Services", fontSize: 16 },
    { label: "H3", size: "24px", weight: "Semibold (600)", sample: "Retirement Planning", fontSize: 13 },
    { label: "H4", size: "20px", weight: "Semibold (600)", sample: "Section Heading", fontSize: 11 },
    { label: "Body Large", size: "18px", weight: "Regular (400)", sample: "We help families build generational wealth.", fontSize: 10 },
    { label: "Body", size: "16px", weight: "Regular (400)", sample: "Our team of licensed financial advisors is dedicated to your success.", fontSize: 9 },
    { label: "Caption", size: "14px", weight: "Regular (400)", sample: "Terms and conditions apply.", fontSize: 8 },
  ];

  y = 58;
  typeScale.forEach((t) => {
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(20, y, 170, 18, 1, 1, "F");

    doc.setTextColor(...GRAY);
    doc.setFontSize(7);
    doc.text(`${t.label}  |  ${t.size}  |  ${t.weight}`, 25, y + 5);

    doc.setTextColor(...DARK);
    doc.setFontSize(Math.min(t.fontSize, 14));
    doc.setFont("helvetica", t.weight.includes("Bold") ? "bold" : "normal");
    doc.text(t.sample, 25, y + 13, { maxWidth: 160 });
    doc.setFont("helvetica", "normal");

    y += 22;
  });

  // === PAGE 4: BUTTONS & COMPONENTS ===
  doc.addPage();
  page++;
  addPageHeader(doc, "Buttons & Component Styles");
  addFooter(doc, page);

  y = 42;
  const buttons = [
    { name: "Primary CTA (.btn-primary-cta)", bg: [228, 181, 72] as const, text: [0, 0, 0] as const, desc: "Gold background, black text. On hover: navy bg (#1A2744), white text, gold glow." },
    { name: "Default (variant=\"default\")", bg: NAVY, text: WHITE, desc: "Navy background, white text. Standard actions and navigation." },
    { name: "Outline (variant=\"outline\")", bg: WHITE, text: DARK, desc: "White bg with border. Secondary actions." },
    { name: "Secondary (variant=\"secondary\")", bg: [230, 234, 240] as const, text: DARK, desc: "Light gray bg. Tertiary actions." },
  ];

  buttons.forEach((b) => {
    doc.setFillColor(...b.bg);
    doc.roundedRect(20, y, 80, 12, 3, 3, "F");
    if (b.name.includes("Outline")) {
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(20, y, 80, 12, 3, 3, "S");
    }
    doc.setTextColor(...b.text);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Button Label", 60, y + 8, { align: "center" });

    doc.setTextColor(...DARK);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(b.name, 108, y + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text(b.desc, 108, y + 10, { maxWidth: 85 });

    y += 22;
  });

  // Border radius
  y += 5;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, y, 170, 14, 2, 2, "F");
  doc.setTextColor(...DARK);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Border Radius:", 25, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text("Default 0.75rem (--radius). Use rounded-lg for cards, rounded-full for CTAs and pills.", 25, y + 11);

  // === PAGE 5: BRAND VOICE ===
  doc.addPage();
  page++;
  addPageHeader(doc, "Brand Voice & Messaging");
  addFooter(doc, page);

  y = 42;
  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Tone", 20, y);
  y += 7;

  const tones = ["Clear", "Empowering", "Family-focused", "Professional", "Anti-jargon", "Warm"];
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(tones.join("  •  "), 20, y);

  y += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Key Taglines", 20, y);
  y += 8;

  const taglines = [
    '"Financial Guidance Built for Families"',
    '"Change what you\'re doing to change what you\'re getting"',
    '"Protecting Your Legacy, Building Your Future"',
  ];
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...NAVY);
  taglines.forEach((t) => {
    doc.setFillColor(...GOLD);
    doc.rect(20, y - 3, 2, 10, "F");
    doc.text(t, 26, y + 4);
    y += 14;
  });

  y += 5;
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  // Do's
  doc.setTextColor(22, 163, 74);
  doc.text("✓ Do", 20, y);
  y += 6;
  doc.setTextColor(...DARK);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const dos = [
    "Use clear, jargon-free language families can understand",
    "Lead with empowerment and positive outcomes",
    "Emphasize family legacy and generational wealth",
    "Be warm, professional, and approachable",
    "Use active voice and direct address",
  ];
  dos.forEach((d) => { doc.text(`• ${d}`, 24, y); y += 5; });

  y += 5;
  doc.setTextColor(220, 38, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("✗ Don't", 20, y);
  y += 6;
  doc.setTextColor(...DARK);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const donts = [
    "Use complex financial jargon without explanation",
    "Sound salesy or pushy",
    "Make guarantees about investment returns",
    "Use fear-based or alarmist language",
    "Be vague — always be specific about value",
  ];
  donts.forEach((d) => { doc.text(`• ${d}`, 24, y); y += 5; });

  // === PAGE 6: PHOTOGRAPHY & CO-BRANDING ===
  doc.addPage();
  page++;
  addPageHeader(doc, "Photography & Co-Branding");
  addFooter(doc, page);

  y = 42;
  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Photography Style", 20, y);
  y += 8;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const photoRules = [
    "Warm and natural — avoid cold, corporate stock photos",
    "Family-oriented — multi-generational families, couples, real moments",
    "Diverse — represent communities across CA, AZ, and OR",
    "Authentic — candid moments preferred over posed shots",
    "Advisor headshots: neutral/navy bg, head-and-shoulders, min 400×400px",
    "Hero images: 16:9 ratio, min 1920×1080, navy gradient overlay for text",
  ];
  photoRules.forEach((r) => { doc.text(`• ${r}`, 24, y); y += 6; });

  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Co-Branding Rules", 20, y);
  y += 8;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const cobrandRules = [
    "White background required for all header/footer sections on co-branded pages",
    "Partner logos must have equal or smaller visual weight than TFA logo",
    "Minimum 24px separation between logos",
    "Co-branded pages are standalone — no global Header/Footer",
    "Include custom white header with both logos",
    "Content follows TFA typography and color system",
    "Footer must include TFA contact info and disclosures",
  ];
  cobrandRules.forEach((r) => { doc.text(`• ${r}`, 24, y); y += 6; });

  // === PAGE 7: LOGO USAGE ===
  doc.addPage();
  page++;
  addPageHeader(doc, "Logo Usage");
  addFooter(doc, page);

  y = 42;
  doc.setTextColor(...DARK);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Clear Space & Minimum Size", 20, y);
  y += 8;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text('• Maintain clear space equal to height of "T" in TFA on all sides', 24, y); y += 6;
  doc.text("• Minimum width: 120px digital, 1 inch print", 24, y); y += 6;
  doc.text("• Always use the official logo file — never recreate it", 24, y); y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Do's", 20, y);
  y += 7;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("• Use on white, navy, or subtle gray backgrounds", 24, y); y += 5;
  doc.text("• Maintain original aspect ratio", 24, y); y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Don'ts", 20, y);
  y += 7;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("• Don't stretch, rotate, or alter logo colors", 24, y); y += 5;
  doc.text("• Don't place on busy or low-contrast backgrounds", 24, y); y += 5;
  doc.text("• Don't add shadows, effects, or outlines", 24, y);

  // Save
  doc.save("TFA-Brand-Guidelines.pdf");
}
