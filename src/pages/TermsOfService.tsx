import SEOHead from "@/components/seo/SEOHead";
import { siteConfig } from "@/lib/seo/siteConfig";

const TermsOfService = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service | The Financial Architects"
        description="Terms and Conditions for The Financial Architects, including SMS program details, opt-out instructions, and service terms."
        canonical={`${siteConfig.url}/terms-of-service`}
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Terms &amp; Conditions</h1>
            <p className="mt-2 text-primary-foreground/70">Last Updated: March 1, 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8 text-foreground">

            <section>
              <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the website at{" "}
                <a href={siteConfig.url} className="text-accent hover:underline">{siteConfig.url}</a>{" "}
                (the "Site") or any services provided by The Financial Architects ("we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Site or our services.
              </p>
            </section>

            {/* A2P 10DLC SMS Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground">2. SMS Communications Program</h2>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-foreground font-semibold">Program Name:</p>
                  <p className="text-muted-foreground">The Financial Architects SMS Communications</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Program Description:</p>
                  <p className="text-muted-foreground">
                    By opting in to our SMS program, you consent to receive text messages from The Financial Architects including appointment reminders, service updates, follow-ups to your inquiries, and information you have requested about our financial planning, insurance, and advisory services.
                  </p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Message Frequency:</p>
                  <p className="text-muted-foreground">
                    Message frequency varies based on your interactions with us. You may receive up to 5 messages per month. Recurring messages may be sent for appointment reminders and service follow-ups.
                  </p>
                </div>
                <div className="bg-background/60 rounded-md p-4 border border-border">
                  <p className="text-foreground font-bold text-lg mb-2">Message and data rates may apply.</p>
                  <p className="text-muted-foreground">
                    Standard message and data rates from your wireless carrier may apply to SMS messages sent and received. Check with your carrier for details about your messaging plan.
                  </p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Opt-Out Instructions:</p>
                  <p className="text-muted-foreground">
                    You can cancel SMS messages at any time. Simply text <strong className="text-foreground">STOP</strong> to any message you receive from us. After texting <strong className="text-foreground">STOP</strong>, you will receive a one-time confirmation message and will no longer receive SMS messages from us unless you opt in again.
                  </p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Help:</p>
                  <p className="text-muted-foreground">
                    If you need assistance, text <strong className="text-foreground">HELP</strong> to any message you receive from us, or contact us directly:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                    <li>Email: <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a></li>
                    <li>Phone: <a href="tel:+18883505396" className="text-accent hover:underline">{siteConfig.telephone}</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Privacy:</p>
                  <p className="text-muted-foreground">
                    Your phone number and SMS opt-in consent will not be shared with third parties or affiliates for marketing or promotional purposes. See our full{" "}
                    <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a> for details on how we handle your information.
                  </p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Supported Carriers:</p>
                  <p className="text-muted-foreground">
                    Compatible with major US carriers including AT&T, Verizon, T-Mobile, Sprint, and others. Carriers are not liable for delayed or undelivered messages.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">3. Use of the Website</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to use this Site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the Site. You may not use the Site to distribute harmful content, attempt to gain unauthorized access to our systems, or engage in any activity that could damage or impair the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">4. Financial Services Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The content on this Site is for informational purposes only and does not constitute financial, investment, tax, or legal advice. Any financial strategies, projections, or illustrations presented are hypothetical and may not reflect actual results. Past performance does not guarantee future results. You should consult with a qualified financial professional before making any financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this Site, including text, graphics, logos, images, and software, is the property of The Financial Architects or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">6. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Site may contain links to third-party websites. These links are provided for your convenience only. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, The Financial Architects shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or our services. Our total liability to you for any claims arising from the use of the Site shall not exceed the amount you have paid us, if any, in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">8. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless The Financial Architects, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including attorney's fees) arising from your use of the Site or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in San Bernardino County, California.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">10. Changes to These Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Site after any changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mt-3">
                <p className="text-foreground font-semibold">The Financial Architects</p>
                <p className="text-muted-foreground">{siteConfig.address.street}</p>
                <p className="text-muted-foreground">{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</p>
                <p className="text-muted-foreground mt-2">Phone: <a href="tel:+18883505396" className="text-accent hover:underline">{siteConfig.telephone}</a></p>
                <p className="text-muted-foreground">Email: <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
