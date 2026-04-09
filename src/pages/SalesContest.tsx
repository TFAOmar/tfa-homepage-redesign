import { useEffect } from "react";
import { Trophy, Download, Calendar, Star, Users, Flame, Crown, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo";
import { generateSalesContestPdf } from "@/lib/salesContestPdf";
import { useConfetti } from "@/hooks/useConfetti";
import tfaLogo from "@/assets/tfa-logo.png";
import mannySotoImg from "@/assets/leadership/manny-soto.jpg";
import omarSanchezImg from "@/assets/leadership/omar-sanchez.jpg";

const SalesContest = () => {
  const { fireConfetti } = useConfetti();

  useEffect(() => {
    // Fire gold-themed confetti on page load
    setTimeout(() => {
      fireConfetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        colors: ["#C9A84C", "#E8D48B", "#FFD700", "#1E3A5F", "#FFFFFF"],
      });
    }, 500);
  }, []);

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
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F]/40 via-[#030406] to-[#C9A84C]/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1E3A5F]/20 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            {/* TFA Logo */}
            <img src={tfaLogo} alt="The Financial Architects" className="h-16 md:h-20 mx-auto mb-8 drop-shadow-lg" />

            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-bold uppercase tracking-widest">Internal Sales Competition</span>
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
              <span className="text-[#C9A84C] drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]">ARCHITECT YOUR</span>
              <br />
              <span className="text-white">BEST MONTH</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              April 2026 Sales Competition — The Financial Architects
            </p>

            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-6">
              This April, the top producers earn a seat at an exclusive high-end dinner and private mastermind session with TFA CEO Manny Soto and COO Omar Sanchez.
            </p>

            <p className="text-xl md:text-2xl text-[#C9A84C] font-bold mb-10 uppercase tracking-wider">
              <Flame className="w-5 h-5 inline-block mr-2 text-orange-400" />
              Don't just watch. Compete.
              <Flame className="w-5 h-5 inline-block ml-2 text-orange-400" />
            </p>

            <Button
              onClick={() => generateSalesContestPdf()}
              size="lg"
              className="bg-[#C9A84C] hover:bg-[#b8963f] text-[#1E3A5F] font-bold text-lg px-10 py-7 shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Flyer
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <Target className="w-10 h-10 text-[#C9A84C] mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                <span className="text-[#C9A84C]">Two Categories.</span>{" "}
                <span className="text-white">Four Winners.</span>
              </h2>
            </div>
            <p className="text-gray-400 text-center mb-4 max-w-xl mx-auto">
              Compete in one or both categories for your chance to earn a seat at the table.
            </p>
            <p className="text-[#C9A84C] text-center mb-12 font-semibold text-lg uppercase tracking-wide">
              The clock is ticking — April is YOUR month
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-b from-[#1E3A5F]/60 to-[#1E3A5F]/20 border-[#C9A84C]/30 hover:border-[#C9A84C] hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] transition-all duration-300 group">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Crown className="w-10 h-10 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#C9A84C] mb-2">Top 2 Agents</h3>
                  <p className="text-xl text-white font-semibold mb-4">Living Trust Sales</p>
                  <p className="text-gray-400 mb-6">
                    Close the most living trust cases this April and prove you're the go-to estate planning advisor.
                  </p>
                  <p className="text-[#C9A84C]/70 text-sm font-bold uppercase tracking-widest">
                    🏆 You could be here
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-[#1E3A5F]/60 to-[#1E3A5F]/20 border-[#C9A84C]/30 hover:border-[#C9A84C] hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] transition-all duration-300 group">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Flame className="w-10 h-10 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#C9A84C] mb-2">Top 2 Agents</h3>
                  <p className="text-xl text-white font-semibold mb-4">Life & Annuity Submitted Business</p>
                  <p className="text-gray-400 mb-6">
                    Submit the most life and annuity business and demonstrate your sales excellence.
                  </p>
                  <p className="text-[#C9A84C]/70 text-sm font-bold uppercase tracking-widest">
                    🏆 You could be here
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Prize */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-[#1E3A5F]/30 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-24 h-24 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30">
                <Trophy className="w-12 h-12 text-[#C9A84C]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#C9A84C] mb-6">The Prize</h2>
              <p className="text-xl md:text-2xl text-white mb-4 font-medium">
                An intimate dinner and mastermind session with TFA leadership.
              </p>
              <p className="text-lg text-gray-300 mb-2">
                Strategy, vision, and next-level growth — reserved for the elite 4.
              </p>
              <p className="text-[#C9A84C] font-semibold mt-6 text-lg">
                This isn't just a dinner. It's a career-defining moment.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Your Hosts */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Star className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                Meet Your <span className="text-[#C9A84C]">Hosts</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Win your seat at the table with the visionaries leading TFA's mission.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Manny Soto */}
              <Card className="bg-[#1E3A5F]/20 border-[#C9A84C]/20 overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#C9A84C] overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                    <img src={mannySotoImg} alt="Manuel Soto" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Manuel "Manny" Soto</h3>
                  <p className="text-[#C9A84C] font-semibold mb-4">CEO & Founder</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Nearly two decades of experience. Built a personal client base of 2,000+ households. 
                    Trained thousands of advisors nationwide. The architect behind TFA's mission — 
                    "Change what you're doing to change what you're getting."
                  </p>
                </CardContent>
              </Card>

              {/* Omar Sanchez */}
              <Card className="bg-[#1E3A5F]/20 border-[#C9A84C]/20 overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#C9A84C] overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                    <img src={omarSanchezImg} alt="Omar Sanchez" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Omar Sanchez</h3>
                  <p className="text-[#C9A84C] font-semibold mb-4">COO & Managing Partner</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Leading TFA's national expansion with vision and precision. 
                    Founded InsuranceLatino.com to serve underrepresented communities. 
                    Known for blending high-level strategy with real-world execution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contest Period */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-3 bg-[#1E3A5F]/50 border border-[#C9A84C]/30 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(201,168,76,0.1)]">
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
            <p className="text-3xl md:text-4xl text-[#C9A84C] italic font-bold mb-4">
              "Only 4 seats at the table."
            </p>
            <p className="text-2xl md:text-3xl text-white font-bold mb-10">
              Make them yours.
            </p>

            <Button
              onClick={() => {
                fireConfetti({
                  particleCount: 120,
                  spread: 120,
                  colors: ["#C9A84C", "#E8D48B", "#FFD700", "#1E3A5F"],
                });
                generateSalesContestPdf();
              }}
              size="lg"
              className="bg-[#C9A84C] hover:bg-[#b8963f] text-[#1E3A5F] font-bold text-lg px-10 py-7 shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] transition-all duration-300"
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
