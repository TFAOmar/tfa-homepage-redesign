import { estateGuruContent } from "@/pages/EstateGuru";

const EstateGuruStats = () => {
  const { stats } = estateGuruContent;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.items.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-3">
                {stat.value}
              </div>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
          {stats.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default EstateGuruStats;
