import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert & Linda M.",
    role: "Ohio",
    text: "We finally have clarity on our retirement. The peace of mind is worth everything.",
  },
  {
    name: "James A.",
    role: "Texas",
    text: "Our advisor helped us protect our children's future. We feel secure knowing everything is in place.",
  },
  {
    name: "Patricia & Michael R.",
    role: "California",
    text: "They took the time to understand us. Our plan actually works for our family.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-20 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real families, real peace of mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-10 rounded-2xl glass border-0 hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-12 w-12 text-accent/20 mb-7" strokeWidth={1.5} />
              
              <div className="flex gap-1 mb-7">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg text-foreground leading-relaxed mb-8 flex-grow">
                "{testimonial.text}"
              </p>

              <div className="pt-6 border-t border-accent/10 mt-auto">
                <p className="font-bold text-navy text-lg mb-1">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
