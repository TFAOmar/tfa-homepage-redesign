import { Baby, Heart, Home, Sparkles, Users } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";

const icons = [Baby, Heart, Home, Sparkles, Users];

const EstateGuruBenefits = () => {
  const { benefits } = estateGuruContent;

  return (
    <section className="py-16 md:py-24 bg-[#0B1F3B]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {benefits.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                  <Icon className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EstateGuruBenefits;
