import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Phone, Mail, FileText, ArrowLeft, Loader2 } from "lucide-react";
import EstatePlanningWizard from "@/components/living-trust/EstatePlanningWizard";
import { EstatePlanningApplicationData } from "@/types/estatePlanningApplication";
import { useAdvisorBySlug } from "@/hooks/useDynamicAdvisors";
import { advisors } from "@/data/advisors";
import tfaLogo from "@/assets/tfa-logo.png";

// Helper to find static advisor data by id
const findStaticAdvisor = (slug: string) => {
  return advisors.find((a) => a.id === slug);
};

const LivingTrustQuestionnaire = () => {
  const navigate = useNavigate();
  const { advisorSlug } = useParams<{ advisorSlug: string }>();
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch advisor from database if slug provided
  const { data: dbAdvisor, isLoading: isLoadingAdvisor } = useAdvisorBySlug(advisorSlug);

  // Merge database and static advisor data
  const staticAdvisor = advisorSlug ? findStaticAdvisor(advisorSlug) : null;
  const advisor = dbAdvisor || (staticAdvisor ? {
    id: staticAdvisor.name.toLowerCase().replace(/\s+/g, "-"),
    name: staticAdvisor.name,
    title: staticAdvisor.title,
    image_url: null,
    scheduling_link: null,
  } : null);

  // Get advisor email from static data (db advisor doesn't expose email for privacy)
  const advisorEmail = staticAdvisor?.email || undefined;

  // Loading state
  if (advisorSlug && isLoadingAdvisor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Advisor not found (only when slug is provided)
  if (advisorSlug && !advisor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Advisor Not Found</h1>
          <p className="text-slate-600 mb-6">
            We couldn't find an advisor with that profile.
          </p>
          <Link
            to="/advisors"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity inline-block"
          >
            Browse Advisors
          </Link>
        </div>
      </div>
    );
  }

  const handleComplete = (data: EstatePlanningApplicationData) => {
    console.log("Estate planning application completed:", data);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Thank You!
          </h1>
          <p className="text-slate-600 mb-6">
            Your estate planning intake form has been submitted successfully. 
            {advisor ? ` ${advisor.name} will` : " Your advisor will"} review your information and contact you within 1-2 business days.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {advisorSlug && (
              <Link
                to={`/advisors/${advisorSlug}`}
                className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Back to advisor"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
            )}
            <img src={tfaLogo} alt="TFA Group" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-slate-900">
                Living Trust Questionnaire
                {advisor && <span className="text-primary"> - {advisor.name}</span>}
              </h1>
              <p className="text-sm text-slate-500">Living Trust & Estate Documents</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-slate-500">Need help?</p>
            <a href="tel:+18883505396" className="text-primary font-medium hover:underline">
              (888) 350-5396
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <EstatePlanningWizard 
            onComplete={handleComplete}
            advisorId={advisor?.id}
            advisorName={advisor?.name}
            advisorEmail={advisorEmail}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {advisor && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-sm mb-1">Your Estate Planning Specialist</p>
                <h3 className="text-xl font-semibold">{advisor.name}</h3>
                <p className="text-slate-400">{advisor.title || "Licensed Estate Planner"}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+18883505396"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>(888) 350-5396</span>
                </a>
                <a
                  href={`mailto:contact@tfagroup.com`}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          )}
          <div className={`${advisor ? "mt-8 pt-6 border-t border-slate-800" : ""} text-center text-sm text-slate-500`}>
            <p>© {new Date().getFullYear()} TFA Group. All rights reserved.</p>
            <p className="mt-1">This form is for information gathering purposes only and does not constitute legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LivingTrustQuestionnaire;
