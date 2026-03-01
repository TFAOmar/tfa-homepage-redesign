import SEOHead from "@/components/seo/SEOHead";
import { siteConfig } from "@/lib/seo/siteConfig";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | The Financial Architects"
        description="Privacy Policy for The Financial Architects. Learn how we collect, use, and protect your personal information."
        canonical={`${siteConfig.url}/privacy-policy`}
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-primary-foreground/70">Last Updated: March 1, 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8 text-foreground">

            <section>
              <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Financial Architects ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at{" "}
                <a href={siteConfig.url} className="text-accent hover:underline">{siteConfig.url}</a>, use our services, or communicate with us via phone, email, or SMS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
                <li><strong>Financial Information:</strong> Information you voluntarily provide through our forms, questionnaires, or consultations, such as income, assets, insurance needs, and retirement goals.</li>
                <li><strong>Communication Data:</strong> Records of your communications with us, including emails, phone calls, and SMS messages.</li>
                <li><strong>Website Usage Data:</strong> IP address, browser type, pages visited, and other analytics data collected through cookies and similar technologies.</li>
                <li><strong>Form Submissions:</strong> Any information you provide when filling out contact forms, consultation requests, insurance applications, or other forms on our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide financial planning, insurance, and advisory services you have requested.</li>
                <li>To respond to your inquiries and communicate with you about our services.</li>
                <li>To send appointment reminders and service-related notifications via SMS, email, or phone.</li>
                <li>To process insurance applications and financial planning questionnaires.</li>
                <li>To improve our website, services, and customer experience.</li>
                <li>To comply with legal and regulatory obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">4. Information Sharing — No Third-Party Marketing</h2>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                <p className="text-foreground font-semibold mb-2">
                  We do NOT sell, rent, trade, or share your personal information with third parties for marketing purposes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Your information will never be provided to outside companies for their own promotional or marketing use. We may share your information only in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li><strong>Service Providers:</strong> With trusted partners who assist us in operating our business (e.g., insurance carriers, CRM systems), bound by confidentiality agreements.</li>
                  <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                  <li><strong>Your Consent:</strong> When you have given explicit consent to share specific information.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">5. SMS/Text Messaging</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you opt in to receive SMS communications from The Financial Architects, we may send you appointment reminders, service updates, and responses to your inquiries. Message and data rates may apply. You may opt out at any time by texting <strong>STOP</strong> to any message. Text <strong>HELP</strong> for assistance. Your phone number and SMS consent will not be shared with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These include encrypted data transmission (SSL/TLS), secure data storage, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law and regulatory obligations. When your information is no longer needed, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">8. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect your ability to use certain features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">9. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements.</li>
                <li><strong>Opt-Out:</strong> Opt out of SMS communications by texting STOP, or email communications by using the unsubscribe link.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">10. California Privacy Rights (CCPA)</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to request deletion, and the right to opt out of the sale of personal information. We do not sell personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mt-3">
                <p className="text-foreground font-semibold">The Financial Architects</p>
                <p className="text-muted-foreground">{siteConfig.address.street}</p>
                <p className="text-muted-foreground">{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</p>
                <p className="text-muted-foreground mt-2">Phone: <a href={`tel:+18883505396`} className="text-accent hover:underline">{siteConfig.telephone}</a></p>
                <p className="text-muted-foreground">Email: <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
