import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert & Linda M.",
    role: "Client",
    text: "We finally have clarity on our retirement path. The peace of mind knowing our future is secure is worth everything.",
  },
  {
    name: "James A.",
    role: "Client",
    text: "The estate planning guidance was invaluable. Our advisor helped us structure our assets to ensure our children's financial security.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real families, real results, lasting relationships
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
