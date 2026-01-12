import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo";

const EstateGuruSuccess = () => {
  return (
    <>
      <SEOHead
        title="Welcome to Estate Guru | The Financial Architects"
        description="Your subscription is confirmed. Complete your agent profile to get started."
        canonical="/estate-guru/success"
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0B1F3B] to-[#1a3a5c] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
              Welcome to Estate Guru!
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              Your subscription has been confirmed. We're excited to have you on board!
            </p>
            
            <div className="bg-[#D4AF37]/10 rounded-lg p-4 mb-8">
              <h2 className="font-semibold text-[#0B1F3B] mb-2">What happens next?</h2>
              <ul className="text-left text-gray-700 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">1.</span>
                  Complete your agent profile below
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">2.</span>
                  Our team will set up your Estate Guru access (24-48 hours)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">3.</span>
                  You'll receive login credentials via email
                </li>
              </ul>
            </div>

            <Link to="/estate-guru#register">
              <Button 
                size="lg" 
                className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold"
              >
                Complete Your Agent Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <p className="text-gray-500 text-sm mt-6">
              Questions? Contact us at{" "}
              <a 
                href="mailto:info@tfainsuranceadvisors.com" 
                className="text-[#D4AF37] hover:underline"
              >
                info@tfainsuranceadvisors.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstateGuruSuccess;
