import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";

const BusinessContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot } = useHoneypot();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessAddress: "",
    entityType: "",
    phone: "",
    email: "",
    website: "",
    businessDescription: "",
    squareFootage: "",
    ownOrLease: "",
    needWorkersComp: "",
    employeeCount: "",
    annualSales: "",
    annualPayroll: "",
    fein: "",
    currentInsurer: "",
    policyStartDate: "",
    policyEndDate: "",
    claimsHistory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silently reject bot submissions
    if (isBot()) {
      toast({
        title: "Request Submitted!",
        description: "We'll review your business insurance needs and contact you within 24 hours.",
      });
      setFormData({
        fullName: "", businessName: "", businessAddress: "", entityType: "", phone: "", email: "", website: "",
        businessDescription: "", squareFootage: "", ownOrLease: "", needWorkersComp: "", employeeCount: "",
        annualSales: "", annualPayroll: "", fein: "", currentInsurer: "", policyStartDate: "", policyEndDate: "", claimsHistory: "",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "business-insurance",
          formData,
        },
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We'll review your business insurance needs and contact you within 24 hours.",
      });

      setFormData({
        fullName: "",
        businessName: "",
        businessAddress: "",
        entityType: "",
        phone: "",
        email: "",
        website: "",
        businessDescription: "",
        squareFootage: "",
        ownOrLease: "",
        needWorkersComp: "",
        employeeCount: "",
        annualSales: "",
        annualPayroll: "",
        fein: "",
        currentInsurer: "",
        policyStartDate: "",
        policyEndDate: "",
        claimsHistory: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white px-4 py-3 focus:ring-2 focus:ring-[#E4B548] focus:outline-none shadow-inner shadow-black/20 transition-all";
  const selectClasses = "w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 focus:ring-2 focus:ring-[#E4B548] focus:outline-none shadow-inner shadow-black/20 transition-all appearance-none cursor-pointer";
  const labelClasses = "block text-white/90 text-sm font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from humans, traps bots */}
      <div className={honeypotClassName}>
        <label htmlFor="company_website_url">Company URL</label>
        <input
          type="text"
          id="company_website_url"
          name="company_website_url"
          {...honeypotProps}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelClasses}>Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className={inputClasses}
          />
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className={labelClasses}>Business Name *</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder="ABC Company LLC"
            className={inputClasses}
          />
        </div>

        {/* Business Address */}
        <div className="md:col-span-2">
          <label htmlFor="businessAddress" className={labelClasses}>Business Address *</label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            required
            placeholder="123 Main St, City, State ZIP"
            className={inputClasses}
          />
        </div>

        {/* Entity Type */}
        <div>
          <label htmlFor="entityType" className={labelClasses}>Business Entity Type *</label>
          <select
            id="entityType"
            name="entityType"
            value={formData.entityType}
            onChange={handleChange}
            required
            className={selectClasses}
          >
            <option value="" className="bg-[#131A2A]">Select Entity Type</option>
            <option value="llc" className="bg-[#131A2A]">LLC</option>
            <option value="corporation" className="bg-[#131A2A]">Corporation</option>
            <option value="sole-prop" className="bg-[#131A2A]">Sole Proprietorship</option>
            <option value="partnership" className="bg-[#131A2A]">Partnership</option>
            <option value="other" className="bg-[#131A2A]">Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@company.com"
            className={inputClasses}
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className={labelClasses}>Website URL (Optional)</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.yourcompany.com"
            className={inputClasses}
          />
        </div>

        {/* Business Description */}
        <div className="md:col-span-2">
          <label htmlFor="businessDescription" className={labelClasses}>Describe Your Business *</label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Tell us about your business operations, products/services, and any special risks..."
            className={inputClasses}
          />
        </div>

        {/* Square Footage */}
        <div>
          <label htmlFor="squareFootage" className={labelClasses}>Square Footage</label>
          <input
            type="text"
            id="squareFootage"
            name="squareFootage"
            value={formData.squareFootage}
            onChange={handleChange}
            placeholder="5,000 sq ft"
            className={inputClasses}
          />
        </div>

        {/* Own or Lease */}
        <div>
          <label htmlFor="ownOrLease" className={labelClasses}>Own or Lease?</label>
          <select
            id="ownOrLease"
            name="ownOrLease"
            value={formData.ownOrLease}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="bg-[#131A2A]">Select Option</option>
            <option value="own" className="bg-[#131A2A]">Own</option>
            <option value="lease" className="bg-[#131A2A]">Lease</option>
          </select>
        </div>

        {/* Workers Comp */}
        <div>
          <label htmlFor="needWorkersComp" className={labelClasses}>Need Workers' Comp?</label>
          <select
            id="needWorkersComp"
            name="needWorkersComp"
            value={formData.needWorkersComp}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="bg-[#131A2A]">Select Option</option>
            <option value="yes" className="bg-[#131A2A]">Yes</option>
            <option value="no" className="bg-[#131A2A]">No</option>
          </select>
        </div>

        {/* Employee Count */}
        <div>
          <label htmlFor="employeeCount" className={labelClasses}>Number of Employees</label>
          <input
            type="number"
            id="employeeCount"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            placeholder="10"
            className={inputClasses}
          />
        </div>

        {/* Annual Sales */}
        <div>
          <label htmlFor="annualSales" className={labelClasses}>Estimated Annual Sales</label>
          <input
            type="text"
            id="annualSales"
            name="annualSales"
            value={formData.annualSales}
            onChange={handleChange}
            placeholder="$500,000"
            className={inputClasses}
          />
        </div>

        {/* Annual Payroll */}
        <div>
          <label htmlFor="annualPayroll" className={labelClasses}>Estimated Annual Payroll</label>
          <input
            type="text"
            id="annualPayroll"
            name="annualPayroll"
            value={formData.annualPayroll}
            onChange={handleChange}
            placeholder="$200,000"
            className={inputClasses}
          />
        </div>

        {/* FEIN */}
        <div>
          <label htmlFor="fein" className={labelClasses}>FEIN</label>
          <input
            type="text"
            id="fein"
            name="fein"
            value={formData.fein}
            onChange={handleChange}
            placeholder="XX-XXXXXXX"
            className={inputClasses}
          />
        </div>

        {/* Current Insurer */}
        <div>
          <label htmlFor="currentInsurer" className={labelClasses}>Current/Previous Insurance Company</label>
          <input
            type="text"
            id="currentInsurer"
            name="currentInsurer"
            value={formData.currentInsurer}
            onChange={handleChange}
            placeholder="Current Insurance Provider"
            className={inputClasses}
          />
        </div>

        {/* Policy Dates */}
        <div>
          <label htmlFor="policyStartDate" className={labelClasses}>Policy Start Date</label>
          <input
            type="date"
            id="policyStartDate"
            name="policyStartDate"
            value={formData.policyStartDate}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="policyEndDate" className={labelClasses}>Policy End Date</label>
          <input
            type="date"
            id="policyEndDate"
            name="policyEndDate"
            value={formData.policyEndDate}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Claims History */}
        <div className="md:col-span-2">
          <label htmlFor="claimsHistory" className={labelClasses}>Claims or Losses (Past 5 Years)</label>
          <textarea
            id="claimsHistory"
            name="claimsHistory"
            value={formData.claimsHistory}
            onChange={handleChange}
            rows={3}
            placeholder="Describe any claims or losses in the past 5 years..."
            className={inputClasses}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-analytics-id="business-insurance-form-submit"
        className="w-full btn-primary-cta px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
      >
        {isSubmitting ? "Submitting..." : "Submit My Business Insurance Request"}
      </button>
    </form>
  );
};

export default BusinessContactForm;
