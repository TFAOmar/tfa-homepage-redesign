import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert & Linda M.",
    role: "Retired Couple, Ohio",
    text: "We finally have clarity on our retirement path. The peace of mind knowing our future is secure is worth everything.",
  },
  {
    name: "James A.",
    role: "Business Owner, Texas",
    text: "The estate planning guidance was invaluable. Our advisor helped us structure our assets to ensure our children's financial security.",
  },
  {
    name: "Patricia & Michael R.",
    role: "Family, California",
    text: "Our advisor took the time to understand our goals and created a plan that actually works for our family. We couldn't be happier.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real families, real results, lasting relationships
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl glass border-0 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-16 w-16 text-accent/10 mb-6" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg text-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="pt-4 border-t border-accent/10">
                <p className="font-semibold text-navy text-lg">
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
