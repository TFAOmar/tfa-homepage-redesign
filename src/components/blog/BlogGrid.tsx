import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import retirementImage from "@/assets/blog/retirement-planning.jpg";
import estateImage from "@/assets/blog/estate-planning.jpg";
import taxImage from "@/assets/blog/tax-strategy.jpg";
import investmentImage from "@/assets/blog/investment-fundamentals.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Retirement Planning",
    excerpt: "Learn how to build a comprehensive retirement strategy that ensures financial security and peace of mind in your golden years. Discover key steps from setting goals to maximizing Social Security benefits.",
    category: "Retirement",
    date: "March 15, 2025",
    readTime: "8 min read",
    image: retirementImage,
    slug: "complete-guide-retirement-planning"
  },
  {
    id: 2,
    title: "Estate Planning Essentials: Protecting Your Legacy",
    excerpt: "Understand the fundamental components of estate planning, from wills and trusts to power of attorney. Learn how to ensure your wishes are honored and your loved ones are protected.",
    category: "Estate Planning",
    date: "March 10, 2025",
    readTime: "6 min read",
    image: estateImage,
    slug: "estate-planning-essentials"
  },
  {
    id: 3,
    title: "Smart Tax Strategies for Wealth Preservation",
    excerpt: "Explore proven tax-planning strategies that can help you minimize your tax burden while staying compliant. From tax-loss harvesting to strategic charitable giving, maximize your after-tax returns.",
    category: "Tax Planning",
    date: "March 5, 2025",
    readTime: "7 min read",
    image: taxImage,
    slug: "smart-tax-strategies"
  },
  {
    id: 4,
    title: "Investment Fundamentals: Building a Solid Portfolio",
    excerpt: "Master the basics of investing with our comprehensive guide. Learn about asset allocation, diversification, risk management, and how to align your investment strategy with your financial goals.",
    category: "Investing",
    date: "February 28, 2025",
    readTime: "10 min read",
    image: investmentImage,
    slug: "investment-fundamentals"
  }
];

const BlogGrid = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground">
            Stay informed with expert advice on financial planning, retirement, investments, and wealth management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="glass hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl text-navy line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription className="text-base leading-relaxed line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground group"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
