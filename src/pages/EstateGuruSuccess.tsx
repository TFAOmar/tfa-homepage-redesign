import { CheckCircle, Mail, Phone, Calendar, ExternalLink } from "lucide-react";
import { SEOHead } from "@/components/seo";
import EstateGuruRegistrationForm from "@/components/estate-guru/EstateGuruRegistrationForm";

const EstateGuruSuccess = () => {
  return (
    <>
      <SEOHead
        title="Welcome to Estate Guru | The Financial Architects"
        description="Your subscription is confirmed. Complete your agent profile to get started."
        canonical="/estate-guru/success"
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0B1F3B] to-[#1a3a5c] py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Payment Confirmed Banner */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
              Payment Confirmed!
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              Welcome to Estate Guru! Complete the registration form below to finalize your account setup.
            </p>
            
            <div className="bg-[#D4AF37]/10 rounded-lg p-4">
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
          </div>

          {/* Registration Form Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-[#0B1F3B] mb-6 text-center">
              Complete Your Registration
            </h2>
            <EstateGuruRegistrationForm />
          </div>

          {/* Contact Directory Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-[#0B1F3B] mb-6 text-center">
              Your Estate Guru Contacts
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Save these contacts for quick reference as you get started with Estate Guru.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Nancy Hall */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-[#D4AF37] transition-colors">
                <h3 className="font-bold text-[#0B1F3B] text-lg mb-1">Nancy Hall</h3>
                <p className="text-[#D4AF37] text-sm font-medium mb-4">Director of Account Management</p>
                
                <div className="space-y-3 mb-4">
                  <a href="mailto:nancy@estateguru.com" className="flex items-center gap-2 text-gray-700 hover:text-[#0B1F3B] transition-colors">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm">nancy@estateguru.com</span>
                  </a>
                  <a href="tel:+17273302867" className="flex items-center gap-2 text-gray-700 hover:text-[#0B1F3B] transition-colors">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm">(727) 330-2867</span>
                  </a>
                  <a href="https://meetings.hubspot.com/nancy-hall" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-[#0B1F3B] transition-colors">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm">Schedule a Meeting</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">CONTACT FOR:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Adding additional Estate Guru products and services</li>
                    <li>• Specific questions about a client's estate plan</li>
                    <li>• Training, pricing, and marketing materials</li>
                  </ul>
                </div>
              </div>

              {/* Customer Support */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-[#D4AF37] transition-colors">
                <h3 className="font-bold text-[#0B1F3B] text-lg mb-1">Customer Support</h3>
                <p className="text-[#D4AF37] text-sm font-medium mb-4">Technical & Order Support</p>
                
                <div className="space-y-3 mb-4">
                  <a href="mailto:support@estateguru.com" className="flex items-center gap-2 text-gray-700 hover:text-[#0B1F3B] transition-colors">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm">support@estateguru.com</span>
                  </a>
                  <a href="tel:+13852406400,1" className="flex items-center gap-2 text-gray-700 hover:text-[#0B1F3B] transition-colors">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm">(385) 240-6400 x1</span>
                  </a>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">CONTACT FOR:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Log in help for you or your client</li>
                    <li>• Questions around deed orders</li>
                    <li>• Uploading client signature pages</li>
                    <li>• Questions around shipping</li>
                  </ul>
                </div>
              </div>

              {/* Heather Amey - Full Width */}
              <div className="md:col-span-2 border border-gray-200 rounded-xl p-6 hover:border-[#D4AF37] transition-colors">
                <div className="md:flex md:items-start md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-bold text-[#0B1F3B] text-lg mb-1">Heather Amey</h3>
                    <p className="text-[#D4AF37] text-sm font-medium mb-4">Director of Onboarding</p>
                    
                    <div className="space-y-3">
                      <a href="tel:+12084288093" className="flex items-center gap-2 text-gray-700 hover:text-[#0B1F3B] transition-colors">
                        <Phone className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm">(208) 428-8093</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a 
                      href="https://meetings.hubspot.com/heather-amey" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-[#0B1F3B] text-white px-4 py-2 rounded-lg hover:bg-[#0B1F3B]/90 transition-colors text-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      Book an Appointment
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://meetings.hubspot.com/heather-amey/estate-guru-plus-" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0B1F3B] px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90 transition-colors text-sm font-medium"
                    >
                      <Calendar className="w-4 h-4" />
                      Estate Planning Appointment
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Contact */}
          <p className="text-white/70 text-sm text-center">
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
    </>
  );
};

export default EstateGuruSuccess;
