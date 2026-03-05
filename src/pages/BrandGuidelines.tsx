import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, X } from "lucide-react";
import { useState } from "react";
import { generateBrandGuidelinesPdf } from "@/lib/brandGuidelinesPdf";
import tfaLogo from "@/assets/tfa-logo.png";

const colorPalette = [
  { name: "Primary Navy", hsl: "215 45% 25%", hex: "#1E3A5F", usage: "Headers, backgrounds, authority & trust" },
  { name: "Primary Gold", hsl: "35 55% 60%", hex: "#C9A84C", usage: "Accents, CTAs, highlights & warmth" },
  { name: "Navy Light", hsl: "215 35% 35%", hex: "#3D5A80", usage: "Secondary text, hover states" },
  { name: "Gold Light", hsl: "35 65% 75%", hex: "#D4BC7A", usage: "Subtle accents, backgrounds" },
  { name: "Background", hsl: "0 0% 98%", hex: "#FAFAFA", usage: "Page backgrounds, clean surfaces" },
  { name: "Foreground", hsl: "215 25% 20%", hex: "#283845", usage: "Body text, readable content" },
  { name: "CTA Gold", hsl: "—", hex: "#E4B548", usage: "Primary call-to-action buttons" },
  { name: "CTA Hover", hsl: "—", hex: "#1A2744", usage: "Button hover state, dark contrast" },
];

const darkModeColors = [
  { name: "Background (Dark)", hsl: "215 30% 12%", hex: "#162032", usage: "Dark mode page background" },
  { name: "Card (Dark)", hsl: "215 25% 15%", hex: "#1C2D42", usage: "Dark mode cards & surfaces" },
  { name: "Accent (Dark)", hsl: "35 55% 60%", hex: "#C9A84C", usage: "Gold remains consistent in dark mode" },
];

const typographyScale = [
  { label: "Display / H1", className: "text-4xl md:text-5xl font-bold", size: "36–48px", weight: "700", sample: "Financial Guidance Built for Families" },
  { label: "H2", className: "text-3xl font-bold", size: "30px", weight: "700", sample: "Our Services" },
  { label: "H3", className: "text-2xl font-semibold", size: "24px", weight: "600", sample: "Retirement Planning" },
  { label: "H4", className: "text-xl font-semibold", size: "20px", weight: "600", sample: "Section Heading" },
  { label: "Body Large", className: "text-lg", size: "18px", weight: "400", sample: "We help families build generational wealth through personalized financial strategies." },
  { label: "Body", className: "text-base", size: "16px", weight: "400", sample: "Our team of licensed financial advisors is dedicated to your success." },
  { label: "Small / Caption", className: "text-sm text-muted-foreground", size: "14px", weight: "400", sample: "Terms and conditions apply. See advisor for details." },
];

const voiceDos = [
  "Use clear, jargon-free language that families can understand",
  "Lead with empowerment — 'Take control of your financial future'",
  "Emphasize family legacy, generational wealth, and security",
  "Be warm, professional, and approachable",
  "Use active voice and direct address ('you', 'your family')",
];

const voiceDonts = [
  "Use complex financial jargon without explanation",
  "Sound salesy or pushy — 'Act now before it's too late!'",
  "Make guarantees about investment returns",
  "Use fear-based or alarmist language",
  "Be vague — always be specific about the value offered",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="ml-2 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function ColorSwatch({ color }: { color: typeof colorPalette[0] }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
      <div className="p-3 space-y-1">
        <p className="font-semibold text-sm text-foreground">{color.name}</p>
        <div className="flex items-center text-xs font-mono text-muted-foreground">
          {color.hex}<CopyButton text={color.hex} />
        </div>
        {color.hsl !== "—" && (
          <div className="flex items-center text-xs font-mono text-muted-foreground">
            HSL({color.hsl})<CopyButton text={color.hsl} />
          </div>
        )}
        <p className="text-xs text-muted-foreground pt-1">{color.usage}</p>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 border-b border-border last:border-b-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function BrandGuidelines() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      await generateBrandGuidelinesPdf();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Brand Guidelines | The Financial Architects</title>
        <meta name="description" content="Official brand guidelines for The Financial Architects. Logo usage, color palette, typography, voice, and co-branding rules for internal teams and external partners." />
      </Helmet>

      {/* Hero */}
      <div className="relative bg-primary text-primary-foreground py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-90" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Brand Guidelines</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            The official guide to representing The Financial Architects — for internal teams, advisors, and external partners.
          </p>
          <Button onClick={handleDownloadPdf} disabled={downloading} size="lg" className="btn-primary-cta px-8 py-3">
            <Download className="w-5 h-5 mr-2" />
            {downloading ? "Generating PDF…" : "Download Brand Book (PDF)"}
          </Button>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <nav className="flex flex-wrap gap-3 justify-center text-sm">
            {[
              ["#logo", "Logo"],
              ["#colors", "Colors"],
              ["#typography", "Typography"],
              ["#buttons", "Buttons & Components"],
              ["#voice", "Brand Voice"],
              ["#photography", "Photography"],
              ["#cobranding", "Co-Branding"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Logo Usage */}
      <Section id="logo" title="Logo Usage">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="rounded-xl border border-border p-8 flex items-center justify-center bg-white">
            <img src={tfaLogo} alt="TFA Logo on light background" className="max-h-24 object-contain" />
          </div>
          <div className="rounded-xl border border-border p-8 flex items-center justify-center bg-primary">
            <img src={tfaLogo} alt="TFA Logo on dark background" className="max-h-24 object-contain brightness-0 invert" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Clear Space & Minimum Size</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Maintain a clear space equal to the height of the "T" in TFA on all sides</li>
              <li>• Minimum width: <strong className="text-foreground">120px</strong> for digital, <strong className="text-foreground">1 inch</strong> for print</li>
              <li>• Always use the official logo file — never recreate it</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Do's & Don'ts</h3>
            <div className="space-y-2 text-sm">
              <p className="text-green-700 dark:text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Use on white, navy, or subtle gray backgrounds</p>
              <p className="text-green-700 dark:text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Maintain original aspect ratio</p>
              <p className="text-destructive flex items-center gap-2"><X className="w-4 h-4" /> Don't stretch, rotate, or alter colors</p>
              <p className="text-destructive flex items-center gap-2"><X className="w-4 h-4" /> Don't place on busy or low-contrast backgrounds</p>
              <p className="text-destructive flex items-center gap-2"><X className="w-4 h-4" /> Don't add shadows, effects, or outlines</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a href={tfaLogo} download="tfa-logo.png">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Download Logo (PNG)</Button>
          </a>
        </div>
      </Section>

      {/* Color Palette */}
      <Section id="colors" title="Color Palette">
        <h3 className="text-lg font-semibold text-foreground mb-4">Light Mode — Primary Palette</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {colorPalette.map((c) => <ColorSwatch key={c.name} color={c} />)}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Dark Mode Adjustments</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {darkModeColors.map((c) => <ColorSwatch key={c.name} color={c} />)}
        </div>
        <div className="mt-8 p-4 rounded-lg bg-muted text-sm text-muted-foreground">
          <strong className="text-foreground">Usage Rule:</strong> Always reference design tokens (CSS variables) in code — never hardcode hex values in components. All colors flow from <code className="bg-background px-1.5 py-0.5 rounded text-xs">index.css</code> and <code className="bg-background px-1.5 py-0.5 rounded text-xs">tailwind.config.ts</code>.
        </div>
      </Section>

      {/* Typography */}
      <Section id="typography" title="Typography">
        <div className="mb-6 p-4 rounded-lg bg-muted text-sm text-muted-foreground">
          <strong className="text-foreground">Primary Font:</strong> Inter (sans-serif) — loaded via Google Fonts. Used for all headings and body text.
        </div>
        <div className="space-y-6">
          {typographyScale.map((t) => (
            <div key={t.label} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.size} / {t.weight}</span>
              </div>
              <p className={t.className}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Buttons & Components */}
      <Section id="buttons" title="Buttons & Component Styles">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Button Variants</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button className="btn-primary-cta px-6 py-2.5 text-sm">Primary CTA</button>
                <span className="text-xs text-muted-foreground font-mono">.btn-primary-cta</span>
              </div>
              <div className="flex items-center gap-4">
                <Button>Default (Navy)</Button>
                <span className="text-xs text-muted-foreground font-mono">variant="default"</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">Outline</Button>
                <span className="text-xs text-muted-foreground font-mono">variant="outline"</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary">Secondary</Button>
                <span className="text-xs text-muted-foreground font-mono">variant="secondary"</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost">Ghost</Button>
                <span className="text-xs text-muted-foreground font-mono">variant="ghost"</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Utility Classes</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl glass">
                <p className="text-sm font-semibold text-foreground">Glass Card</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">.glass — frosted glass effect</p>
              </div>
              <div className="p-4 rounded-xl glass-dark text-primary-foreground">
                <p className="text-sm font-semibold">Glass Dark</p>
                <p className="text-xs opacity-70 font-mono mt-1">.glass-dark — navy frosted glass</p>
              </div>
              <div>
                <button className="neuro-button bg-background px-6 py-2.5 rounded-xl text-sm font-medium text-foreground">Neumorphic Button</button>
                <p className="text-xs text-muted-foreground font-mono mt-2">.neuro-button</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-muted text-sm text-muted-foreground">
              <strong className="text-foreground">Border Radius:</strong> Default is <code className="bg-background px-1.5 py-0.5 rounded text-xs">0.75rem</code> (--radius). Use <code className="bg-background px-1.5 py-0.5 rounded text-xs">rounded-lg</code> for standard elements, <code className="bg-background px-1.5 py-0.5 rounded text-xs">rounded-full</code> for CTAs and pills.
            </div>
          </div>
        </div>
      </Section>

      {/* Brand Voice */}
      <Section id="voice" title="Brand Voice & Messaging">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-3">Tone</h3>
          <div className="flex flex-wrap gap-3">
            {["Clear", "Empowering", "Family-focused", "Professional", "Anti-jargon", "Warm"].map((t) => (
              <span key={t} className="px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-sm font-medium border border-accent/20">{t}</span>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-3">Key Phrases & Taglines</h3>
          <div className="space-y-3">
            <blockquote className="border-l-4 border-accent pl-4 text-lg italic text-foreground">"Financial Guidance Built for Families"</blockquote>
            <blockquote className="border-l-4 border-accent pl-4 text-lg italic text-foreground">"Change what you're doing to change what you're getting"</blockquote>
            <blockquote className="border-l-4 border-accent pl-4 text-lg italic text-foreground">"Protecting Your Legacy, Building Your Future"</blockquote>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2"><Check className="w-5 h-5" /> Do</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {voiceDos.map((d, i) => <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{d}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-destructive mb-3 flex items-center gap-2"><X className="w-5 h-5" /> Don't</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {voiceDonts.map((d, i) => <li key={i} className="flex items-start gap-2"><X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />{d}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* Photography */}
      <Section id="photography" title="Photography & Imagery">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Style Direction</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">Warm and natural:</strong> Avoid cold, corporate stock photos</li>
              <li>• <strong className="text-foreground">Family-oriented:</strong> Show multi-generational families, couples, real moments</li>
              <li>• <strong className="text-foreground">Professional:</strong> Advisors should be in business or business-casual attire</li>
              <li>• <strong className="text-foreground">Diverse:</strong> Represent the communities we serve across California, Arizona, and Oregon</li>
              <li>• <strong className="text-foreground">Authentic:</strong> Candid moments preferred over overly posed shots</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Advisor Headshots</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Neutral or brand-colored background (navy preferred)</li>
              <li>• Head-and-shoulders framing, direct eye contact</li>
              <li>• Consistent lighting across all advisor photos</li>
              <li>• Minimum resolution: 400×400px, square aspect ratio</li>
              <li>• Delivered as JPEG or PNG, optimized for web (&lt;200KB)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 p-4 rounded-lg bg-muted text-sm text-muted-foreground">
          <strong className="text-foreground">Hero Images:</strong> Use 16:9 aspect ratio, minimum 1920×1080. Apply a navy gradient overlay (from-primary/80) to ensure text readability. All hero images should evoke trust, warmth, and financial confidence.
        </div>
      </Section>

      {/* Co-Branding */}
      <Section id="cobranding" title="Co-Branding Rules">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Partner Logo Placement</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">White background required</strong> for all header and footer sections on co-branded pages</li>
              <li>• Partner logos must have equal or smaller visual weight than the TFA logo</li>
              <li>• Minimum 24px separation between logos</li>
              <li>• Use a subtle divider (border-gray-100) between TFA and partner branding</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Page Structure</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Co-branded pages are standalone (no global Header/Footer)</li>
              <li>• Include a custom white header with both logos</li>
              <li>• Content follows TFA typography and color system</li>
              <li>• Partner-specific CTAs may use partner brand colors sparingly</li>
              <li>• Footer must include TFA contact info and disclosures</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-border overflow-hidden">
          <div className="bg-white p-4 flex items-center justify-between">
            <img src={tfaLogo} alt="TFA Logo" className="h-8 object-contain" />
            <div className="text-xs text-gray-400 border border-dashed border-gray-300 px-4 py-2 rounded">Partner Logo Here</div>
          </div>
          <div className="p-4 bg-muted text-xs text-muted-foreground text-center">Example: Co-branded header layout with white background</div>
        </div>
      </Section>

      {/* Download CTA */}
      <div className="py-16 bg-muted">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-foreground mb-3">Need the full brand book?</h2>
          <p className="text-muted-foreground mb-6">Download the complete TFA Brand Guidelines as a shareable PDF for your team or partners.</p>
          <Button onClick={handleDownloadPdf} disabled={downloading} size="lg" className="btn-primary-cta px-8 py-3">
            <Download className="w-5 h-5 mr-2" />
            {downloading ? "Generating…" : "Download Brand Book (PDF)"}
          </Button>
        </div>
      </div>
    </>
  );
}
