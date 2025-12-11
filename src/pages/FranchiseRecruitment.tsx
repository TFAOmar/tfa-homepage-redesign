import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FranchiseApplicationForm from "@/components/careers/FranchiseApplicationForm";
import { Building2, DollarSign, TrendingUp, Users, Target, Shield, Award, MapPin, CheckCircle2, ArrowRight, BookOpen, Headphones, BarChart3, Globe, Briefcase } from "lucide-react";
const franchiseFees = [{
  name: "Initial Franchise Fee",
  amount: "$15,000",
  description: "One-time fee to join the TFA franchise system"
}, {
  name: "Monthly Royalty",
  amount: "5%",
  description: "Of gross commission revenue"
}, {
  name: "Marketing Fund",
  amount: "2%",
  description: "Contributing to national marketing initiatives"
}, {
  name: "Technology Fee",
  amount: "$199/mo",
  description: "CRM, training platform, and back-office systems"
}];
const investmentBreakdown = [{
  item: "Franchise Fee",
  low: "$15,000",
  high: "$15,000"
}, {
  item: "Office Setup & Equipment",
  low: "$5,000",
  high: "$15,000"
}, {
  item: "Initial Marketing",
  low: "$2,500",
  high: "$7,500"
}, {
  item: "Working Capital (3 months)",
  low: "$10,000",
  high: "$25,000"
}, {
  item: "Licensing & Insurance",
  low: "$1,500",
  high: "$3,000"
}, {
  item: "Training Travel",
  low: "$1,000",
  high: "$3,000"
}];
const franchiseLevels = [{
  level: "Managing Franchise Partner",
  commission: "100%",
  requirement: "Base level"
}, {
  level: "Sr. Franchisee",
  commission: "110%",
  requirement: "$1.5M cumulative production"
}, {
  level: "Executive Franchisee",
  commission: "120%",
  requirement: "$3M cumulative production"
}];
const whatYouGet = [{
  icon: BookOpen,
  title: "Complete Training System",
  description: "40+ hours initial training plus ongoing weekly sessions"
}, {
  icon: Users,
  title: "Recruiting Support",
  description: "Systems to recruit, train, and develop your own agent team"
}, {
  icon: Shield,
  title: "Carrier Relationships",
  description: "Pre-negotiated contracts with 20+ top-rated insurance carriers"
}, {
  icon: BarChart3,
  title: "Back-Office Operations",
  description: "CRM, case tracking, compliance support, and admin systems"
}, {
  icon: Headphones,
  title: "Ongoing Support",
  description: "Dedicated franchise success manager and peer network"
}, {
  icon: Globe,
  title: "Marketing Resources",
  description: "Branded materials, digital marketing, and lead generation tools"
}];
const idealCandidate = ["Entrepreneurial mindset with a drive to build something meaningful", "Strong leadership skills and ability to recruit and develop a team", "Financial stability to invest in your business ($35K-$70K liquid capital)", "Passion for helping families achieve financial security", "Excellent communication and relationship-building skills", "Willingness to follow proven systems while building your vision"];
const territoryInfo = [{
  icon: MapPin,
  title: "Exclusive Territories",
  description: "Protected geographic areas based on population density and market potential"
}, {
  icon: Target,
  title: "Market Analysis",
  description: "We help identify optimal territories based on demographics and competition"
}, {
  icon: TrendingUp,
  title: "Growth Potential",
  description: "Territories designed to support multi-agent offices and long-term scaling"
}];
const FranchiseRecruitment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const totalLow = 35000;
  const totalHigh = 68500;
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
              <Building2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Franchise Opportunity</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Own a <span className="text-accent">TFA Franchise</span> and Build Generational Wealth
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join a proven financial services franchise with comprehensive training, 
              established carrier relationships, and unlimited earning potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply">
                <Button size="lg" className="btn-primary-cta text-lg px-8 py-6 group">
                  Apply for Franchise
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#investment">
                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 py-6 text-secondary-foreground">
                  View Investment Details
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What's Included in Your Franchise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build a successful financial services business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatYouGet.map((item, index) => <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Investment & Fees Section */}
      <section id="investment" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <DollarSign className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Investment Details</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Franchise Fees & Investment
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing with no hidden costs. Know exactly what you're investing.
              </p>
            </div>

            {/* Fees Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {franchiseFees.map((fee, index) => <div key={index} className="bg-white/80 backdrop-blur-xl rounded-xl border border-border/50 p-6 text-center">
                  <div className="text-2xl font-bold text-accent mb-2">{fee.amount}</div>
                  <div className="font-medium text-foreground mb-1">{fee.name}</div>
                  <div className="text-xs text-muted-foreground">{fee.description}</div>
                </div>)}
            </div>

            {/* Investment Breakdown Table */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
              <div className="bg-primary/10 p-4">
                <h3 className="text-lg font-semibold text-foreground">Initial Investment Breakdown</h3>
              </div>
              <div className="divide-y divide-border/30">
                {investmentBreakdown.map((item, index) => <div key={index} className="grid grid-cols-3 p-4 items-center">
                    <div className="text-foreground">{item.item}</div>
                    <div className="text-center text-muted-foreground">{item.low}</div>
                    <div className="text-center text-muted-foreground">{item.high}</div>
                  </div>)}
                <div className="grid grid-cols-3 p-4 items-center bg-accent/10 font-semibold">
                  <div className="text-foreground">Total Estimated Investment</div>
                  <div className="text-center text-accent">${totalLow.toLocaleString()}</div>
                  <div className="text-center text-accent">${totalHigh.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-4">
              *Actual costs may vary based on location, office size, and individual circumstances. 
              Financing options may be available for qualified candidates.
            </p>
          </div>
        </div>
      </section>

      {/* Territory Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Territory & Market Opportunity
              </h2>
              <p className="text-lg text-muted-foreground">
                Secure your exclusive territory in the booming financial services market
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {territoryInfo.map((info, index) => <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>)}
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Available Markets
              </h3>
              <p className="text-muted-foreground mb-4">
                We're actively expanding across the United States. Priority territories are available in:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["California", "Arizona", "Texas", "Nevada", "Oregon", "Washington", "Colorado", "Florida"].map((state, index) => <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {state}
                  </div>)}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Don't see your state? Contact us — we may still have opportunities in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Structure */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Franchise Compensation Tiers
              </h2>
              <p className="text-lg text-muted-foreground">
                Earn above-standard commissions as you grow your production
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {franchiseLevels.map((tier, index) => <div key={index} className={`bg-white/80 backdrop-blur-xl rounded-2xl border p-8 text-center transition-shadow hover:shadow-lg ${index === 2 ? 'border-accent/50 ring-2 ring-accent/20' : 'border-border/50'}`}>
                  {index === 2 && <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                      <Award className="h-3 w-3" />
                      Top Tier
                    </div>}
                  <div className="text-4xl font-bold text-primary mb-2">{tier.commission}</div>
                  <div className="font-semibold text-foreground mb-2">{tier.level}</div>
                  <div className="text-sm text-muted-foreground">{tier.requirement}</div>
                </div>)}
            </div>

            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Additional Revenue Streams
              </h4>
              <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Override commissions on agent production
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Renewal commissions for passive income
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Bonuses for carrier production levels
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Equity in your business for future exit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidate */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Is This Right for You?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our most successful franchisees share these qualities
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {idealCandidate.map((trait, index) => <div key={index} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{trait}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="scroll-mt-20">
        <FranchiseApplicationForm />
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Legacy?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Take control of your future with a TFA franchise. Limited territories available — apply today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply">
                <Button size="lg" className="btn-primary-cta text-lg px-8 py-6 group">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-lg px-8 py-6 text-primary">
                  Schedule Discovery Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default FranchiseRecruitment;