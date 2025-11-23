import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert & Linda Martinez",
    location: "Phoenix, AZ",
    text: "After working with TFA, we finally have clarity on our retirement path. Their comprehensive approach helped us consolidate our accounts and create a tax-efficient income strategy. We sleep better at night knowing our future is secure.",
    result: "Reduced taxes by 30% and increased retirement income",
  },
  {
    name: "James Anderson",
    location: "Chicago, IL",
    text: "The estate planning guidance we received was invaluable. Our advisor helped us structure our assets to minimize taxes and ensure our children's financial security. The peace of mind is worth everything.",
    result: "Protected $2.3M estate from unnecessary taxation",
  },
  {
    name: "Patricia Chen",
    location: "Seattle, WA",
    text: "As a small business owner, I needed help rolling over my old 401(k) and creating a retirement plan. TFA's team made the process seamless and educated me every step of the way. Highly professional.",
    result: "Successfully transitioned $850K with zero penalties",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            Real families, real results, lasting relationships
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass border-0 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <Quote className="h-12 w-12 text-accent/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-accent/20 pt-4">
                  <p className="font-semibold text-accent text-sm mb-3">
                    {testimonial.result}
                  </p>
                  <p className="font-semibold text-navy">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
