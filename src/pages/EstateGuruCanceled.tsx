import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo";

const EstateGuruCanceled = () => {
  return (
    <>
      <SEOHead
        title="Checkout Canceled | Estate Guru"
        description="Your checkout was canceled. No charges were made."
        canonical="/estate-guru/canceled"
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0B1F3B] to-[#1a3a5c] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-gray-400" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
              Checkout Canceled
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              No worries—your checkout was canceled and no charges were made.
            </p>
            
            <p className="text-gray-500 mb-8">
              If you have any questions about our plans or need help deciding, 
              our team is here to assist.
            </p>

            <div className="space-y-3">
              <Link to="/estate-guru#pricing">
                <Button 
                  size="lg" 
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-[#0B1F3B] font-semibold"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Return to Pricing
                </Button>
              </Link>
              
              <Link to="/book-consultation">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white"
                >
                  Book a Demo Call
                </Button>
              </Link>
            </div>

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

export default EstateGuruCanceled;
