import { SEOHead } from "@/components/seo";
import AdminTopBar from "@/components/admin/AdminTopBar";

/**
 * Messaging automation has moved to GoHighLevel (GHL).
 * This app forwards every intake_leads insert to the GHL webhook
 * (edge function `forward-to-ghl`). GHL owns all SMS/email templates,
 * quiet hours, routing sends, and opt-outs.
 */
export default function AdminIntakeTemplates() {
  return (
    <>
      <SEOHead title="Messaging — Managed in GoHighLevel" description="Messaging automation is owned by GHL." noIndex />
      <AdminTopBar />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-serif font-bold text-navy mb-4">Messaging lives in GoHighLevel</h1>
          <p className="text-muted-foreground mb-6">
            All SMS and email automation for intake leads is now managed inside GoHighLevel.
            This app no longer sends texts or emails directly.
          </p>

          <div className="rounded-lg bg-white border p-5 space-y-3 text-sm">
            <h2 className="font-semibold text-navy">What this app still does</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Collects leads at <code>/start</code> and <code>/concierge</code>.</li>
              <li>Writes each lead to Supabase (system of record) with an append-only consent log.</li>
              <li>Forwards every lead (submitted <em>and</em> abandoned) to the GHL inbound webhook.</li>
              <li>Mirrors GHL opt-outs back into <code>intake_suppressions</code> via the <code>ghl-optout-sync</code> endpoint.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white border p-5 space-y-3 text-sm mt-4">
            <h2 className="font-semibold text-navy">What GoHighLevel owns</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>SMS &amp; email templates (EN + ES)</li>
              <li>Contact-timezone-aware quiet hours</li>
              <li>Routing sends, drip campaigns, opt-out handling</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white border p-5 space-y-3 text-sm mt-4">
            <h2 className="font-semibold text-navy">Required Supabase secrets</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><code>GHL_WEBHOOK_URL</code> — the inbound webhook URL GHL provides.</li>
              <li><code>GHL_SHARED_SECRET</code> — matches the secret set on GHL's outbound opt-out webhook.</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Legacy <code>TWILIO_*</code> secrets are unused and can be removed from Supabase &gt; Edge Function Secrets.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}