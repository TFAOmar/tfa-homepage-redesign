import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "When are TFA events scheduled?",
    answer: "TFA hosts 5 annual events: Kick Off (January), Crash Courses (Spring), Leadership Summit (Summer), Summer Sizzler (Mid-Year), and Christmas Party (December). Exact dates are announced each year and shared with sponsors in advance."
  },
  {
    question: "Can I sponsor multiple events?",
    answer: "Absolutely! Many of our sponsors choose to participate in multiple events throughout the year. When you sponsor 3 or more events, you receive a 15% discount on your total sponsorship package."
  },
  {
    question: "How do I choose which event fits my audience?",
    answer: "Each event has a different focus: Kick Off is great for goal-setting products/services, Crash Courses attracts learning-focused agents, Leadership Summit targets agency leaders, Summer Sizzler is perfect for team-building solutions, and the Christmas Party reaches families and celebrates success. Our team will help you choose the best fit."
  },
  {
    question: "What's included in each sponsorship package?",
    answer: "Title Sponsors ($4,000/event) get on-stage speaking time, premium booth location, 4 VIP tickets, logo placement everywhere, and social media features. Supporting Sponsors ($2,000/event) get booth space, 2 VIP tickets, logo on signage, and social mentions. Community Sponsors ($500/event) get 1 ticket, logo on sponsor wall, and social recognition."
  },
  {
    question: "How many sponsors do you accept per event?",
    answer: "We limit sponsorships to 12 spots per event to ensure each sponsor gets meaningful exposure. This includes 2 Title Sponsor spots, 5 Supporting Sponsor spots, and 5 Community Sponsor spots."
  },
  {
    question: "What happens after I submit an inquiry?",
    answer: "Our sponsorship team will contact you within 24 hours to discuss your goals, answer questions, and help you choose the right package and events. Payment is processed after you've finalized your sponsorship details."
  },
  {
    question: "Can I get a refund if I need to cancel?",
    answer: "Sponsorships are refundable up to 30 days before the event. Within 30 days, we offer credit toward a future event. Please contact our team for specific situations."
  },
];

export const GeneralSponsorshipFAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about sponsoring TFA events.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
