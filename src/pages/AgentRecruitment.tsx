import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AgentApplicationForm from "@/components/careers/AgentApplicationForm";
import { GraduationCap, FileCheck, UserCheck, Rocket, DollarSign, TrendingUp, Users, BookOpen, Shield, Award, Clock, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
const steps = [{
  icon: GraduationCap,
  title: "Pre-Licensing Education",
  description: "Complete 32 hours of pre-licensing education through XCEL Solutions.",
  details: ["$49 with TFA discount code", "Self-paced online learning", "Life Pre-Licensing Bundle"]
}, {
  icon: FileCheck,
  title: "Pass Your Exam",
  description: "Schedule and pass your Life Agent Examination through PSI Exams.",
  details: ["$55-$88 exam fee", "Fingerprinting at test site ($68.95)", "Study materials provided"]
}, {
  icon: UserCheck,
  title: "Get Licensed & Contract",
  description: "Apply for your California Life & Health License, then complete TFA contracting.",
  details: ["$193 license application", "TFA Membership: $49.99 (one-time)", "Skool Community: $29.99/month"]
}, {
  icon: Rocket,
  title: "Launch Your Career",
  description: "Complete TFA Quick Start training and start building your client base.",
  details: ["Signal Advisors portal setup", "Carrier appointments", "Ongoing mentorship"]
}];
const compensationTiers = [{
  level: "Agent",
  commission: "50%",
  description: "Entry level - Start building your book of business"
}, {
  level: "Advisor",
  commission: "60%",
  description: "10 policies written or promoted by Managing Partner"
}, {
  level: "Sr. Advisor",
  commission: "70%",
  description: "25 policies written + consistent production"
}, {
  level: "Partner",
  commission: "80%",
  description: "50 policies written + team building begins"
}, {
  level: "Sr. Partner",
  commission: "90%",
  description: "100 policies + leadership responsibilities"
}, {
  level: "Managing Partner",
  commission: "100%",
  description: "Full commission + override on team production"
}];
const benefits = [{
  icon: BookOpen,
  title: "Comprehensive Training",
  description: "Weekly trainings, product knowledge, and sales mastery courses"
}, {
  icon: Users,
  title: "Mentorship Program",
  description: "Learn from top-producing advisors with proven track records"
}, {
  icon: Shield,
  title: "Back-Office Support",
  description: "Admin, compliance, and case management handled for you"
}, {
  icon: TrendingUp,
  title: "Lead Generation",
  description: "Access to marketing systems and lead sources"
}, {
  icon: Award,
  title: "Recognition & Rewards",
  description: "Incentive trips, bonuses, and public recognition"
}, {
  icon: Clock,
  title: "Flexible Schedule",
  description: "Build your business on your terms with no cap on earnings"
}];
const whyTFA = ["No cold calling required - warm market and referral-based approach", "Work with top-rated carriers (MassMutual, Prudential, Allianz, and more)", "Renewal commissions for passive income", "Clear advancement path with transparent requirements", "Community of like-minded professionals", "No prior experience required - we train you from scratch"];
const AgentRecruitment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
              <Briefcase className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Agent Recruitment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Build a Career Helping Families <span className="text-accent">Achieve Financial Security</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join The Financial Architects and transform lives while building unlimited income potential. 
              No experience required — we provide all the training and support you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply">
                <Button size="lg" className="btn-primary-cta text-lg px-8 py-6 group">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#compensation">
                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 py-6 text-primary">
                  View Compensation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why TFA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose TFA?
              </h2>
              <p className="text-lg text-muted-foreground">
                We're not just another insurance agency. We're a family-focused organization that prioritizes your success.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {whyTFA.map((item, index) => <div key={index} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You Get as a TFA Agent
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build a successful career in financial services
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Compensation Structure */}
      <section id="compensation" className="py-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <DollarSign className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Compensation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transparent Compensation Structure
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Earn competitive commissions with a clear path to higher earnings. No hidden caps, no complicated formulas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 overflow-hidden">
              <div className="grid grid-cols-3 bg-primary/10 p-4 font-semibold text-foreground">
                <div>Level</div>
                <div className="text-center">Commission</div>
                <div className="text-right hidden sm:block">Requirements</div>
              </div>
              {compensationTiers.map((tier, index) => <div key={index} className={`grid grid-cols-3 p-4 items-center ${index % 2 === 0 ? 'bg-white/50' : 'bg-white/80'} border-t border-border/30`}>
                  <div className="font-medium text-foreground">{tier.level}</div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-accent">{tier.commission}</span>
                  </div>
                  <div className="text-right text-sm text-muted-foreground hidden sm:block">{tier.description}</div>
                </div>)}
            </div>

            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Income Potential Example
              </h4>
              <p className="text-muted-foreground">
                An agent writing just 4 policies per month at an average of $150/month premium can earn over 
                <span className="font-bold text-foreground"> $50,000+ annually</span> at the Advisor level, 
                plus renewal commissions that build passive income year over year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Success */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Path to Success
              </h2>
              <p className="text-lg text-muted-foreground">
                From zero experience to licensed professional — here's how we get you there
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent/20 hidden md:block" />
              
              <div className="space-y-6">
                {steps.map((step, index) => <div key={index} className="relative flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-2xl flex items-center justify-center z-10 shadow-lg">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">STEP {index + 1}</span>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="flex flex-wrap gap-2">
                        {step.details.map((detail, i) => <li key={i} className="text-xs bg-muted/50 text-muted-foreground px-3 py-1 rounded-full">
                            {detail}
                          </li>)}
                      </ul>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="scroll-mt-20">
        <AgentApplicationForm />
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Change Your Life?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Take the first step toward a rewarding career helping families achieve financial security. 
              Apply today and start your journey with TFA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply">
                <Button size="lg" className="btn-primary-cta text-lg px-8 py-6 group">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
                  Have Questions? Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default AgentRecruitment;