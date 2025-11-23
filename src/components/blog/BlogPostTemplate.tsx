import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPostTemplateProps {
  title: string;
  date: string;
  category: string;
  readTime: string;
  bannerImage: string;
  children: ReactNode;
}

export const BlogPostTemplate = ({ 
  title, 
  date, 
  category, 
  readTime, 
  bannerImage,
  children 
}: BlogPostTemplateProps) => {
  return (
    <article className="min-h-screen bg-background">
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/90" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 text-primary-foreground/80 mb-4">
              <span className="text-accent font-medium">{category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {children}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Have Questions About This Topic?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our expert advisors are here to help you navigate your financial planning journey. Schedule a complimentary consultation today.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Speak with an Advisor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

// Reusable blog content components
export const IntroText = ({ children }: { children: ReactNode }) => (
  <p className="text-xl leading-relaxed text-foreground mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-accent first-letter:mr-1 first-letter:float-left">
    {children}
  </p>
);

export const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="text-3xl font-bold text-navy mt-12 mb-6">
    {children}
  </h2>
);

export const SubHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">
    {children}
  </h3>
);

export const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className="text-lg leading-relaxed text-foreground mb-6">
    {children}
  </p>
);

export const PullQuote = ({ children, author }: { children: ReactNode; author?: string }) => (
  <blockquote className="my-12 border-l-4 border-accent bg-accent/5 p-8 rounded-r-lg">
    <p className="text-2xl font-medium text-navy leading-relaxed italic">
      "{children}"
    </p>
    {author && (
      <cite className="block mt-4 text-muted-foreground not-italic">
        — {author}
      </cite>
    )}
  </blockquote>
);

export const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 my-8">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
        <span className="text-lg text-foreground">{item}</span>
      </li>
    ))}
  </ul>
);

export const NumberedList = ({ items }: { items: string[] }) => (
  <ol className="space-y-4 my-8 list-none counter-reset-[section]">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-4">
        <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
          {index + 1}
        </span>
        <span className="text-lg text-foreground pt-1">{item}</span>
      </li>
    ))}
  </ol>
);

export const CalloutBox = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="my-12 glass p-8 rounded-2xl border-l-4 border-accent">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
        <span className="text-accent text-xl">✓</span>
      </div>
      <h4 className="text-xl font-bold text-navy">{title}</h4>
    </div>
    <div className="text-foreground leading-relaxed">
      {children}
    </div>
  </div>
);
