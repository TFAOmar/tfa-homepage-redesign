import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, Shield, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import tfaLogo from "@/assets/tfa-logo.png";
import OmarReferralWizard from "@/components/prequalification/omar-referral/OmarReferralWizard";

export default function OmarReferralPrequalification() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Referral Received</h1>
          <p className="text-slate-600 mb-6">
            Thank you. Omar Sanchez will review this referral and reach out to the client within 1-2 business days.
            You'll also receive a copy of the confirmation.
          </p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Life Insurance Prequalification — Refer to Omar Sanchez | TFA</title>
        <meta name="description" content="Referral partners: submit a life insurance prequalification for Omar Sanchez to quote. Secure, confidential underwriter pre-screen." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/advisors/omar-sanchez" className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Back to Omar Sanchez">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <img src={tfaLogo} alt="TFA" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-slate-900">Referral Prequalification</h1>
                <p className="text-sm text-slate-500">For Omar Sanchez</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4 text-primary" />
              <span className="hidden md:inline">Secure & Confidential</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Refer a Client to Omar Sanchez
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              This underwriter-level prequalification helps Omar quote accurately on the first try.
              Complete the referrer info, then answer honestly on the client's behalf — every "yes" opens follow-up questions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <OmarReferralWizard onComplete={() => setDone(true)} />
          </div>
        </main>

        <footer className="bg-slate-900 text-white mt-12">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-sm mb-1">Questions about this referral form?</p>
                <h3 className="text-xl font-semibold">Omar Sanchez</h3>
                <p className="text-slate-400">The Financial Architects</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+18883505396" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Phone className="h-4 w-4" /><span>(888) 350-5396</span>
                </a>
                <a href="mailto:omar@tfainsuranceadvisors.com" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Mail className="h-4 w-4" /><span>omar@tfainsuranceadvisors.com</span>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
              <p>© {new Date().getFullYear()} TFA Group. All rights reserved.</p>
              <p className="mt-1">This questionnaire is for pre-screening purposes only and does not guarantee coverage.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}