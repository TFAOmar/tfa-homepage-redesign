import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do booths work?",
    answer: "Each sponsorship package includes a 6-foot table with chairs at a prime location in the event space. You're welcome to bring banners, displays, brochures, and promotional materials. Setup begins 2 hours before the event and breakdown is expected within 1 hour after the event ends. We'll provide exact booth location details once your sponsorship is confirmed."
  },
  {
    question: "Can I upgrade later?",
    answer: "Yes! You can upgrade your sponsorship package at any time before the event, subject to availability. Simply reach out to our team and we'll adjust your package. You'll only pay the difference between packages. Downgrades are handled on a case-by-case basis."
  },
  {
    question: "What do VIP tickets include?",
    answer: "VIP tickets include priority seating, access to an exclusive networking session with TFA leadership and top performers, a VIP-only lunch, and a premium swag bag. VIP attendees also get early access to the venue and a dedicated check-in line."
  },
  {
    question: "How do I submit my logo?",
    answer: "You can upload your logo directly through the sponsorship application form above. We accept PNG, JPG, and SVG formats (up to 5MB). For best results, please provide a high-resolution logo with a transparent background. If you need to update your logo after submission, simply email our team."
  },
  {
    question: "Can I sponsor if I'm not in financial services?",
    answer: "Absolutely! We welcome sponsors from complementary industries including real estate, lending/mortgage, tax/accounting, legal services, marketing, technology, and more. If your business serves professionals or clients who could benefit from financial planning, you're a great fit for our audience."
  }
];

export const SponsorshipFAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We've got answers.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
