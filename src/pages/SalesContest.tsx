import { Trophy, Download, Calendar, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo";
import { generateSalesContestPdf } from "@/lib/salesContestPdf";

const SalesContest = () => {
  return (
    <>
      <SEOHead
        title="Architect Your Best Month | April 2026 Sales Contest"
        description="TFA April 2026 Sales Competition — Top producers earn an exclusive dinner and mastermind session with TFA leadership."
        noIndex={true}
      />

      <div className="min-h-screen bg-[#030406] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/30 to-transparent" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium">Internal Sales Competition</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-[#C9A84C]">ARCHITECT YOUR</span>
              <br />
              <span className="text-white">BEST MONTH</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              April 2026 Sales Competition — The Financial Architects
            </p>

            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              This April, the top producers earn a seat at an exclusive high-end dinner and private mastermind session with TFA CEO Manny Soto and COO Omar Sanchez.
            </p>

            <Button
              onClick={() => generateSalesContestPdf()}
              size="lg"
              className="bg-[#C9A84C] hover:bg-[#b8963f] text-[#1E3A5F] font-bold text-lg px-8 py-6"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Flyer
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="text-[#C9A84C]">Two Categories.</span>{" "}
              <span className="text-white">Four Winners.</span>
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              Compete in one or both categories for your chance to earn a seat at the table.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-[#1E3A5F]/40 border-[#C9A84C]/30 hover:border-[#C9A84C] transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#C9A84C] mb-2">Top 2 Agents</h3>
                  <p className="text-xl text-white font-semibold mb-4">Living Trust Sales</p>
                  <p className="text-gray-400">
                    Close the most living trust cases this April and prove you're the go-to estate planning advisor.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1E3A5F]/40 border-[#C9A84C]/30 hover:border-[#C9A84C] transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#C9A84C] mb-2">Top 2 Agents</h3>
                  <p className="text-xl text-white font-semibold mb-4">Life & Annuity Submitted Business</p>
                  <p className="text-gray-400">
                    Submit the most life and annuity business and demonstrate your sales excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Prize */}
        <section className="py-16 md:py-20 bg-[#1E3A5F]/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-[#C9A84C]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-6">The Prize</h2>
              <p className="text-xl md:text-2xl text-white mb-4">
                An intimate dinner and mastermind session with TFA leadership.
              </p>
              <p className="text-lg text-gray-300">
                Strategy, vision, and next-level growth — reserved for the elite 4.
              </p>
            </div>
          </div>
        </section>

        {/* Contest Period */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-3 bg-[#1E3A5F]/50 border border-[#C9A84C]/30 rounded-2xl px-8 py-6">
              <Calendar className="w-8 h-8 text-[#C9A84C]" />
              <div className="text-left">
                <p className="text-[#C9A84C] text-sm font-bold uppercase tracking-wider">Contest Period</p>
                <p className="text-white text-2xl font-bold">April 1 – April 30, 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 border-t border-[#C9A84C]/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl md:text-3xl text-[#C9A84C] italic font-medium mb-8">
              "Only 4 seats at the table. Make them yours."
            </p>

            <Button
              onClick={() => generateSalesContestPdf()}
              size="lg"
              className="bg-[#C9A84C] hover:bg-[#b8963f] text-[#1E3A5F] font-bold text-lg px-8 py-6"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Flyer
            </Button>

            <p className="text-gray-500 mt-12 text-sm">
              The Financial Architects — Building Legacies Together
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SalesContest;
