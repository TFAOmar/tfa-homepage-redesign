import { SEOHead } from "@/components/seo";
import EstateGuruHeader from "@/components/estate-guru/EstateGuruHeader";
import EstateGuruHero from "@/components/estate-guru/EstateGuruHero";
import EstateGuruStats from "@/components/estate-guru/EstateGuruStats";
import EstateGuruHowItWorks from "@/components/estate-guru/EstateGuruHowItWorks";
import EstateGuruBenefits from "@/components/estate-guru/EstateGuruBenefits";
import EstateGuruFeatures from "@/components/estate-guru/EstateGuruFeatures";
import EstateGuruTestimonials from "@/components/estate-guru/EstateGuruTestimonials";
import EstateGuruFAQ from "@/components/estate-guru/EstateGuruFAQ";
import EstateGuruRegistrationForm from "@/components/estate-guru/EstateGuruRegistrationForm";
import EstateGuruFooter from "@/components/estate-guru/EstateGuruFooter";
import EstateGuruPricing from "@/components/estate-guru/EstateGuruPricing";

// ===================== EDITABLE CONTENT CONFIG =====================
export const estateGuruContent = {
  meta: {
    title: "Estate Guru Agent Registration | The Financial Architects",
    description: "Subscribe to Estate Guru through TFA. Offer attorney-led estate planning to your clients with compliance built in.",
    ogImage: "/og-image.jpg",
  },
  header: {
    logoText: "The Financial Architects",
    navItems: [
      { label: "Overview", href: "#overview" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
    primaryCta: "Get Started",
    secondaryCta: "Book a Demo",
    demoLink: "/book-consultation",
  },
  hero: {
    headline: "Attorney-first estate planning. TFA-powered.",
    subheadline: "Offer compliant, attorney-led estate planning through Estate Guru—set up under TFA's platform so you can start serving clients fast.",
    primaryCta: "View Pricing",
    secondaryCta: "See How It Works",
  },
  stats: {
    disclaimer: "Stats shown are industry/platform references.",
    items: [
      { value: "$124T", label: "The great wealth transfer" },
      { value: "180M", label: "Americans without an estate plan" },
      { value: "1.2M+", label: "Estate documents created on the platform" },
    ],
  },
  pricing: {
    title: "Choose Your Plan",
    subtitle: "Subscribe to unlock Estate Guru through TFA",
    plans: [
      {
        name: "Monthly",
        priceId: "price_1QlMO2I5s9xwrb3egL9P9Lyt",
        price: "$89.99",
        period: "/month",
        description: "Flexible monthly access with no long-term commitment",
        features: [
          "Full platform access",
          "Attorney-led document preparation",
          "Client dashboard & branding",
          "Cancel anytime",
        ],
        isPromo: false,
      },
      {
        name: "Annual",
        priceId: "price_1QlMO2I5s9xwrb3eSFT5aBZT",
        price: "$799",
        period: "/year",
        description: "Commit annually and save over monthly billing",
        features: [
          "Everything in Monthly",
          "Save $280 vs monthly",
          "Priority support",
          "Annual billing",
        ],
        isPromo: false,
      },
      {
        name: "Annual Promo",
        priceId: "price_1QlMO2I5s9xwrb3eSFT5aBZT",
        price: "$599.99",
        period: "/year",
        originalPrice: "$799/year",
        badge: "Save $200",
        code: "TFA200",
        description: "Limited time offer for TFA agents",
        features: [
          "Everything in Annual",
          "Best value—save $480 vs monthly",
          "Exclusive TFA pricing",
          "Lock in your rate",
        ],
        isPromo: true,
      },
    ],
    note: "📝 Once you subscribe, you'll receive a welcome email with your login credentials.",
  },
  howItWorks: {
    title: "Guided intake + attorney oversight—without you touching legal work",
    steps: [
      {
        number: "1.01",
        title: "Subscribe & Get Access",
        description: "Choose your plan and complete checkout. We'll set up your Estate Guru access under TFA's platform.",
        bullets: [
          "Select monthly or annual plan",
          "Complete registration form",
          "Receive login credentials via email",
        ],
      },
      {
        number: "1.02",
        title: "Start planning with clients",
        description: "Run guided intake, visualize plans, and keep everything organized.",
        bullets: [
          "Interactive planning tools",
          "Client-friendly dashboards",
          "Automated document collection",
        ],
      },
      {
        number: "1.03",
        title: "Attorney-led documents delivered",
        description: "Plans are prepared with licensed attorney involvement for compliance and clarity.",
        bullets: [
          "State-specific documents",
          "Attorney review built-in",
          "Secure digital delivery",
        ],
      },
    ],
  },
  benefits: {
    title: "Built for the moments that matter",
    items: [
      { title: "Young families", description: "Guardianship and protection for growing families" },
      { title: "Blended families", description: "Second marriages and complex family structures" },
      { title: "Real estate planning", description: "Trust funding basics for property owners" },
      { title: "Special needs", description: "Planning awareness for unique situations" },
      { title: "Multi-generational", description: "Family mapping and relationship opportunities" },
    ],
  },
  features: {
    title: "Core Platform Features",
    items: [
      { title: "Attorney-led logic", description: "Compliance-first workflows that keep you in the advisory lane" },
      { title: "AI support + sandbox mode", description: "Practice safely before going live with clients" },
      { title: "Visual plan diagrams", description: "Help clients understand complex estate structures" },
      { title: "Multigenerational insights", description: "Family mapping to uncover planning opportunities" },
      { title: "Included POAs", description: "Power of Attorney documents as baseline value" },
      { title: "Flexible delivery options", description: "Self-serve or guided experience for every client" },
    ],
  },
  testimonials: {
    disclaimer: "Testimonials shown as examples.",
    items: [
      { quote: "This made the trust conversation simple. My clients finally understood what they were getting.", name: "Sarah M.", role: "Financial Advisor" },
      { quote: "Clients finally took action on estate planning. The visual tools made all the difference.", name: "James T.", role: "Insurance Agent" },
      { quote: "Clean process and easy handoff. The attorney oversight gives my clients peace of mind.", name: "Michael R.", role: "Wealth Manager" },
    ],
  },
  faq: {
    items: [
      {
        question: "How much does Estate Guru cost?",
        answer: "We offer three pricing options: Monthly at $89.99/month, Annual at $799/year, or our special Annual Promo at $599.99/year using code TFA200. All plans include full platform access and attorney-led document preparation.",
      },
      {
        question: "What happens after I subscribe?",
        answer: "Once you complete your subscription and registration, you'll receive a welcome email with your login credentials and onboarding materials. Our team will have your access ready within 24-48 hours.",
      },
      {
        question: "Do I need to be an attorney to offer this?",
        answer: "No. The platform is attorney-led, meaning licensed attorneys are involved in document preparation and review. You stay in the advisory lane—helping clients understand their options and guiding them through the process.",
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Monthly subscribers can cancel anytime. Annual subscriptions are billed upfront for the full year. Contact our support team if you have questions about your subscription.",
      },
      {
        question: "Can I brand the client experience?",
        answer: "Yes. The platform supports custom branding so clients see your name and logo throughout the planning experience.",
      },
      {
        question: "What states are supported?",
        answer: "Estate Guru supports estate planning in all 50 states. Documents are prepared according to each state's specific requirements.",
      },
    ],
  },
  registration: {
    headline: "Complete Your Registration",
    subtext: "Fill out the form below after selecting your plan. We'll send your login credentials via email.",
    successMessage: "Registration received! Check your email for your login credentials.",
    successCta: "Book a 10-min setup call",
    successCtaLink: "/book-consultation",
  },
  footer: {
    address: "13890 Peyton Dr, Chino Hills, CA 91709",
    phone: "(888) 350-5396",
    email: "info@tfainsuranceadvisors.com",
    disclaimer: "TFA and its representatives do not provide legal advice. Estate planning services are delivered through an attorney-led platform. Consult a licensed attorney for legal guidance.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Support", href: "/contact" },
    ],
  },
};

const EstateGuru = () => {
  return (
    <>
      <SEOHead
        title={estateGuruContent.meta.title}
        description={estateGuruContent.meta.description}
        ogImage={estateGuruContent.meta.ogImage}
        canonical="/estate-guru"
      />
      <div className="min-h-screen bg-white">
        <EstateGuruHeader />
        <main>
          <section id="overview">
            <EstateGuruHero />
          </section>
          <EstateGuruStats />
          <section id="pricing">
            <EstateGuruPricing />
          </section>
          <section id="how-it-works">
            <EstateGuruHowItWorks />
          </section>
          <EstateGuruBenefits />
          <section id="features">
            <EstateGuruFeatures />
          </section>
          <section id="testimonials">
            <EstateGuruTestimonials />
          </section>
          <section id="faq">
            <EstateGuruFAQ />
          </section>
          <section id="register">
            <EstateGuruRegistrationForm />
          </section>
        </main>
        <EstateGuruFooter />
      </div>
    </>
  );
};

export default EstateGuru;
