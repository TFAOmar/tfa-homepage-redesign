import { Quote } from "lucide-react";
import { estateGuruContent } from "@/pages/EstateGuru";

const EstateGuruTestimonials = () => {
  const { testimonials } = estateGuruContent;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">
            What Agents Are Saying
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 text-[#D4AF37]/20" size={48} />
              <p className="text-gray-700 text-lg mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0B1F3B] rounded-full flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#0B1F3B]">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          {testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default EstateGuruTestimonials;
