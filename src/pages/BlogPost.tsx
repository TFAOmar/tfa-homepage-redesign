import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  BlogPostTemplate,
  IntroText,
  SectionHeading,
  SubHeading,
  Paragraph,
  PullQuote,
  BulletList,
  NumberedList,
  CalloutBox,
} from "@/components/blog/BlogPostTemplate";
import retirementImage from "@/assets/blog/retirement-planning.jpg";
import estateImage from "@/assets/blog/estate-planning.jpg";
import taxImage from "@/assets/blog/tax-strategy.jpg";
import investmentImage from "@/assets/blog/investment-fundamentals.jpg";

const blogPosts: Record<string, any> = {
  "complete-guide-retirement-planning": {
    title: "The Complete Guide to Retirement Planning",
    date: "March 15, 2025",
    category: "Retirement",
    readTime: "8 min read",
    bannerImage: retirementImage,
  },
  "estate-planning-essentials": {
    title: "Estate Planning Essentials: Protecting Your Legacy",
    date: "March 10, 2025",
    category: "Estate Planning",
    readTime: "6 min read",
    bannerImage: estateImage,
  },
  "smart-tax-strategies": {
    title: "Smart Tax Strategies for Wealth Preservation",
    date: "March 5, 2025",
    category: "Tax Planning",
    readTime: "7 min read",
    bannerImage: taxImage,
  },
  "investment-fundamentals": {
    title: "Investment Fundamentals: Building a Solid Portfolio",
    date: "February 28, 2025",
    category: "Investing",
    readTime: "10 min read",
    bannerImage: investmentImage,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !blogPosts[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const post = blogPosts[slug];

  return (
    <BlogPostTemplate
      title={post.title}
      date={post.date}
      category={post.category}
      readTime={post.readTime}
      bannerImage={post.bannerImage}
    >
      <IntroText>
        Financial planning is more than just saving money—it&apos;s about creating a comprehensive strategy that aligns with your life goals, values, and aspirations. In this guide, we&apos;ll explore the essential components of effective financial planning and provide you with actionable steps to secure your financial future.
      </IntroText>

      <SectionHeading>Understanding Your Financial Landscape</SectionHeading>
      
      <Paragraph>
        Before you can plan for the future, you need to understand where you stand today. This means taking a comprehensive look at your income, expenses, assets, liabilities, and overall financial health. Think of this as creating a financial snapshot that will serve as the foundation for all your future planning decisions.
      </Paragraph>

      <SubHeading>Key Components of Financial Health</SubHeading>
      
      <BulletList
        items={[
          "Income sources: Salary, business revenue, investment returns, and passive income streams",
          "Fixed and variable expenses: Understanding where your money goes each month",
          "Assets and liabilities: Your net worth and debt-to-income ratio",
          "Emergency fund: Having 3-6 months of expenses saved for unexpected events",
          "Insurance coverage: Protecting against life&apos;s uncertainties",
        ]}
      />

      <PullQuote author="Warren Buffett">
        Someone is sitting in the shade today because someone planted a tree a long time ago.
      </PullQuote>

      <SectionHeading>Setting Clear Financial Goals</SectionHeading>
      
      <Paragraph>
        Goal-setting is the compass that guides your financial journey. Without clear objectives, it&apos;s difficult to make informed decisions about saving, investing, and spending. Your goals should be specific, measurable, achievable, relevant, and time-bound (SMART).
      </Paragraph>

      <NumberedList
        items={[
          "Define your short-term goals (1-3 years): Emergency fund, vacation savings, or debt payoff",
          "Establish medium-term objectives (3-10 years): Home purchase, children&apos;s education, or career transition",
          "Plan for long-term aspirations (10+ years): Retirement, legacy planning, or major lifestyle changes",
          "Prioritize your goals based on urgency and importance to your overall life plan",
          "Review and adjust your goals annually as your life circumstances evolve",
        ]}
      />

      <CalloutBox title="Key Takeaways">
        <BulletList
          items={[
            "Start planning early—time is your most powerful financial tool",
            "Diversification reduces risk and enhances long-term returns",
            "Regular reviews ensure your plan stays aligned with your goals",
            "Professional guidance can help you avoid costly mistakes",
            "Financial planning is a journey, not a destination",
          ]}
        />
      </CalloutBox>

      <SectionHeading>Building Your Investment Strategy</SectionHeading>
      
      <Paragraph>
        A well-designed investment strategy balances growth potential with risk management. Your ideal portfolio allocation depends on factors like your age, risk tolerance, time horizon, and financial goals. The key is to create a diversified portfolio that can weather market volatility while pursuing your long-term objectives.
      </Paragraph>

      <SubHeading>Asset Allocation Principles</SubHeading>
      
      <Paragraph>
        Asset allocation is the most important decision you&apos;ll make as an investor. Studies show that asset allocation determines more than 90% of your portfolio&apos;s long-term performance. By spreading your investments across different asset classes—stocks, bonds, real estate, and cash—you can reduce risk while maintaining growth potential.
      </Paragraph>

      <SectionHeading>The Importance of Regular Reviews</SectionHeading>
      
      <Paragraph>
        Financial planning isn&apos;t a "set it and forget it" activity. Life changes, markets fluctuate, and your goals evolve. That&apos;s why regular reviews—at least annually, or whenever you experience a major life event—are crucial to staying on track.
      </Paragraph>

      <BulletList
        items={[
          "Schedule quarterly check-ins to monitor progress toward your goals",
          "Rebalance your portfolio annually to maintain target allocations",
          "Update your plan after major life events (marriage, children, career changes)",
          "Review beneficiaries on all accounts and insurance policies",
          "Adjust contributions as your income increases or expenses change",
        ]}
      />

      <PullQuote author="Benjamin Franklin">
        An investment in knowledge pays the best interest.
      </PullQuote>

      <SectionHeading>Taking the Next Step</SectionHeading>
      
      <Paragraph>
        The journey to financial security begins with a single step. Whether you&apos;re just starting out or looking to optimize an existing plan, working with experienced financial professionals can provide the guidance, expertise, and accountability you need to achieve your goals.
      </Paragraph>

      <Paragraph>
        Remember, the best time to start planning was yesterday—the second-best time is today. Don&apos;t let uncertainty or complexity hold you back from building the financial future you deserve.
      </Paragraph>
    </BlogPostTemplate>
  );
};

export default BlogPost;
