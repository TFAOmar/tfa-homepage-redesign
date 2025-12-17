import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, TrendingUp, DollarSign, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TFAGuaranteedIncomeCalculator from "@/components/tools/TFAGuaranteedIncomeCalculator";

export default function GuaranteedIncomeCalculator() {
  useEffect(() => {
    document.title = "Guaranteed Income Calculator | The Financial Architects";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-primary">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Tools</span>
          </Link>

          <div className="max-w-3xl animate-fade-in">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
              Financial Planning Tool
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Guaranteed Income Calculator
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Estimate guaranteed lifetime income from a fixed index annuity, or calculate the premium 
              needed to achieve your desired retirement income. Plan for a retirement with income you can't outlive.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TFAGuaranteedIncomeCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 md:py-24 bg-navy/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
                Understanding Your Options
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What is Guaranteed Lifetime Income?
              </h2>
              <p className="text-white/70">
                A fixed index annuity with a guaranteed lifetime withdrawal benefit provides income you can't outlive.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  8% Roll-Up Rate
                </h3>
                <p className="text-sm text-white/70">
                  During the deferral period, your income base grows at a guaranteed 8% roll-up rate, 
                  helping maximize your future income potential.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Principal Protection
                </h3>
                <p className="text-sm text-white/70">
                  Your principal is protected from market downturns. Unlike stocks or mutual funds, 
                  you won't lose money due to market volatility.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Tax-Deferred Growth
                </h3>
                <p className="text-sm text-white/70">
                  Your money grows tax-deferred until withdrawal, potentially allowing for greater 
                  accumulation compared to taxable investments.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Lifetime Income
                </h3>
                <p className="text-sm text-white/70">
                  Once you turn on income, it's guaranteed for life—no matter how long you live or 
                  how markets perform. You can't outlive your income.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12 animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                    1
                  </div>
                  <h4 className="font-medium text-white mb-2">Fund Your Annuity</h4>
                  <p className="text-sm text-white/70">
                    Make a one-time premium payment to establish your annuity contract.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                    2
                  </div>
                  <h4 className="font-medium text-white mb-2">Let It Grow</h4>
                  <p className="text-sm text-white/70">
                    Your income base grows with the 8% roll-up rate during the deferral period.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                    3
                  </div>
                  <h4 className="font-medium text-white mb-2">Turn On Income</h4>
                  <p className="text-sm text-white/70">
                    At your chosen age, begin receiving guaranteed lifetime income payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 animate-fade-in">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-2">Important Disclosures</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    This calculator provides estimates for educational purposes only. Actual results will vary 
                    based on specific product terms, riders selected, and other factors. Guarantees are based 
                    on the claims-paying ability of the issuing insurance company. Annuities are long-term 
                    products designed for retirement income. Early withdrawals may be subject to surrender 
                    charges and tax penalties. Consult with a licensed financial professional before making 
                    any financial decisions. Product availability may vary by state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Secure Your Retirement Income?
            </h2>
            <p className="text-white/70 mb-8">
              Our advisors can help you determine the right annuity strategy for your unique situation 
              and retirement goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-consultation">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 py-6 text-lg">
                  Book a Consultation
                </Button>
              </Link>
              <Link to="/services/annuities">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                  Learn About Annuities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
