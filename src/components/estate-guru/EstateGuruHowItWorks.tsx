import { ClipboardCheck, Users, FileCheck } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";

const icons = [ClipboardCheck, Users, FileCheck];

const EstateGuruHowItWorks = () => {
  const { howItWorks } = estateGuruContent;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
            {howItWorks.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {howItWorks.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="relative"
              >
                {/* Connector Line */}
                {index < howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent z-0" />
                )}

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#D4AF37]/30 hover:shadow-lg transition-all h-full relative z-10">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#0B1F3B] rounded-xl flex items-center justify-center">
                      <Icon className="text-[#D4AF37]" size={28} />
                    </div>
                    <span className="text-[#D4AF37] font-mono text-2xl font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {step.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EstateGuruHowItWorks;
