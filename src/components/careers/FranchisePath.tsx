import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, Target, ArrowRight, CheckCircle, DollarSign } from "lucide-react";

const franchiseBenefits = [
  "Recognized brand & established business systems",
  "Comprehensive training programs",
  "Back office with CRM & training videos",
  "Multiple carrier partnerships",
  "Weekly training (Zoom & in-person)",
  "Swag, classes at multiple locations",
];

const targetMarket = [
  "Married couples with or without children",
  "Homeowners",
  "$60K+ household income",
  "Age 25+ years old",
  "W2 wage earners",
  "Business owners & entrepreneurs",
];

const productOfferings = [
  {
    category: "Income Protection",
    items: ["Term Life Insurance", "Disability Insurance", "Permanent Life Insurance"],
  },
  {
    category: "Retirement Planning",
    items: ["401(k) Plans", "Annuity Options", "IRA Rollovers", "Infinite Banking"],
  },
  {
    category: "Business Solutions",
    items: ["Buy-Sell Agreements", "Key Man Coverage", "Group Health & Life"],
  },
];

const franchiseLevels = [
  { position: "Managing Franchise Partner", percentage: "100%" },
  { position: "Sr. Franchisee", percentage: "110%", requirement: "$1.5M cumulative" },
  { position: "Executive Franchisee", percentage: "120%", requirement: "$3M cumulative" },
];

const FranchisePath = () => {
  return (
    <section id="franchise-path" className="py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Franchise Opportunity</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Own a TFA Franchise
          </h2>
          <p className="text-lg text-muted-foreground">
            Build your own financial services business with proven systems, training, and support. 
            Tap into the $84 trillion wealth transfer happening now.
          </p>
        </div>

        {/* What is Franchising */}
        <div className="max-w-4xl mx-auto mb-16 bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">What is Franchising?</h3>
          <p className="text-muted-foreground mb-6">
            A franchise is a business model where The Financial Architects (franchisor) gives you (franchisee) 
            the right to use our trademark, systems, and support to build your own successful business. 
            You benefit from our established brand, training programs, and ongoing support.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                Franchise Benefits
              </h4>
              <ul className="space-y-2">
                {franchiseBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Target Market
              </h4>
              <ul className="space-y-2">
                {targetMarket.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Menu */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Product Menu</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {productOfferings.map((category, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
                <h4 className="font-semibold text-foreground mb-4">{category.category}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Sales Process */}
        <div className="max-w-4xl mx-auto mb-16 bg-primary rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Turnkey 5-Step Sales Process</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Prospect", "Make Contact", "Set Appointment", "Share Options", "Close"].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <span className="text-white font-medium">{step}</span>
                {index < 4 && <ArrowRight className="h-4 w-4 text-white/50 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Franchise Compensation */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Franchise Compensation</h3>
          </div>
          <p className="text-muted-foreground mb-8">
            As a franchisee, you have the potential to earn above standard broker compensation 
            based on cumulative production.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {franchiseLevels.map((level, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold text-primary mb-2">{level.percentage}</div>
                <div className="text-sm font-medium text-foreground mb-1">{level.position}</div>
                {level.requirement && (
                  <div className="text-xs text-muted-foreground">{level.requirement}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-primary-cta group">
                Explore Franchise Opportunities
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchisePath;
