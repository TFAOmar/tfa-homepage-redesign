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

// ===================== EDITABLE CONTENT CONFIG =====================
export const estateGuruContent = {
  meta: {
    title: "Estate Guru Agent Registration | The Financial Architects",
    description: "Register for Estate Guru access through TFA. Offer attorney-led estate planning to your clients with compliance built in.",
    ogImage: "/og-image.jpg",
  },
  header: {
    logoText: "The Financial Architects",
    navItems: [
      { label: "Overview", href: "#overview" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
    primaryCta: "Register Now",
    secondaryCta: "Book a Demo",
    demoLink: "/book-consultation",
  },
  hero: {
    headline: "Attorney-first estate planning. TFA-powered.",
    subheadline: "Offer compliant, attorney-led estate planning through Estate Guru—set up under TFA's platform so you can start serving clients fast.",
    primaryCta: "Register to Activate Access",
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
  howItWorks: {
    title: "Guided intake + attorney oversight—without you touching legal work",
    steps: [
      {
        number: "1.01",
        title: "Register through TFA",
        description: "Submit the form and we'll set up your Estate Guru access under TFA's account.",
        bullets: [
          "Quick registration process",
          "No setup fees",
          "Typically approved within 24-48 hours",
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
        question: "Do I need to be an attorney to offer this?",
        answer: "No. The platform is attorney-led, meaning licensed attorneys are involved in document preparation and review. You stay in the advisory lane—helping clients understand their options and guiding them through the process.",
      },
      {
        question: "How does setup work through TFA?",
        answer: "Simply fill out the registration form below. Our team will create your Estate Guru account under TFA's master subscription and send you login credentials and onboarding materials.",
      },
      {
        question: "How long does approval take?",
        answer: "Most registrations are approved within 24-48 hours. You'll receive an email with next steps once your access is activated.",
      },
      {
        question: "Can I brand the client experience?",
        answer: "Yes. The platform supports custom branding so clients see your name and logo throughout the planning experience.",
      },
      {
        question: "What states are supported?",
        answer: "Estate Guru supports estate planning in all 50 states. Documents are prepared according to each state's specific requirements.",
      },
      {
        question: "What if I want concierge support for clients?",
        answer: "The platform offers a Guru+ option with enhanced support. Once you're set up, you can discuss premium tiers for clients who need extra guidance.",
      },
    ],
  },
  registration: {
    headline: "Get set up with Estate Guru through TFA",
    subtext: "Register below. Our team will activate your access and send next steps.",
    successMessage: "Registration received. Check your email for next steps.",
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
