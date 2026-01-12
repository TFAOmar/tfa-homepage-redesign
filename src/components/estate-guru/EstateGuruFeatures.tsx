import { Scale, Bot, Eye, GitBranch, FileText, Settings } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";

const icons = [Scale, Bot, Eye, GitBranch, FileText, Settings];

const EstateGuruFeatures = () => {
  const { features } = estateGuruContent;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
            {features.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#D4AF37]/30 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-[#0B1F3B] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0F2847] transition-colors">
                  <Icon className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EstateGuruFeatures;
