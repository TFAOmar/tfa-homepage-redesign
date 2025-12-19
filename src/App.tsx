import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Advisors from "./pages/Advisors";
import Partners from "./pages/Partners";
import AdvisorOnboarding from "./pages/AdvisorOnboarding";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import CompoundGrowthCalculator from "./pages/CompoundGrowthCalculator";
import RetirementIncomeCalculator from "./pages/RetirementIncomeCalculator";
import TaxImpactCalculator from "./pages/TaxImpactCalculator";
import RequiredSavingsCalculator from "./pages/RequiredSavingsCalculator";
import KaiZenCalculatorPage from "./pages/KaiZenCalculatorPage";
import GuaranteedIncomeCalculator from "./pages/GuaranteedIncomeCalculator";
import Tools from "./pages/Tools";
import BusinessInsurance from "./pages/BusinessInsurance";
import BookConsultation from "./pages/BookConsultation";
import ThankYou from "./pages/ThankYou";
import Careers from "./pages/Careers";
import AgentRecruitment from "./pages/AgentRecruitment";
import FranchiseRecruitment from "./pages/FranchiseRecruitment";
import AdvisorVanessaSanchez from "./pages/AdvisorVanessaSanchez";
import VanessaLivingTrust from "./pages/VanessaLivingTrust";
import KaiZen from "./pages/KaiZen";
import AdvisorMariahLorenzen from "./pages/AdvisorMariahLorenzen";
import AdvisorTamaraLee from "./pages/AdvisorTamaraLee";
import TamaraLeeMedicare from "./pages/TamaraLeeMedicare";
import MariahKaiZen from "./pages/MariahKaiZen";
import RecinosBusinessInsurance from "./pages/RecinosBusinessInsurance";
import AdvisorIsmaelVervera from "./pages/AdvisorIsmaelVervera";
import AdvisorManuelSoto from "./pages/AdvisorManuelSoto";
import AdvisorHamletOhandjanian from "./pages/AdvisorHamletOhandjanian";
import AdvisorSeanCagle from "./pages/AdvisorSeanCagle";
import AdvisorRuthPacheco from "./pages/AdvisorRuthPacheco";
import AdvisorAnthonyBottley from "./pages/AdvisorAnthonyBottley";
import EstatePlanning from "./pages/EstatePlanning";
import IncomePlanning from "./pages/IncomePlanning";
import InvestmentManagement from "./pages/InvestmentManagement";
import TaxPlanning from "./pages/TaxPlanning";
import HealthcarePlanning from "./pages/HealthcarePlanning";
import Annuities from "./pages/Annuities";
import Rollovers401k from "./pages/Rollovers401k";
import InsuranceServices from "./pages/InsuranceServices";
import GroupRetirement from "./pages/GroupRetirement";
import AmericanWayHealth from "./pages/AmericanWayHealth";
import LifeInsuranceApplication from "./pages/LifeInsuranceApplication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Standalone pages that have their own header/footer
const standalonePages = ['/advisors/vanessa-sanchez/living-trust', '/services/kai-zen', '/advisors/mariah-lorenzen/kai-zen', '/advisors/tamara-lee/medicare', '/services/estate-planning', '/services/income-planning', '/services/investment-management', '/services/tax-planning', '/services/healthcare-planning', '/services/annuities', '/services/401k-rollovers', '/services/insurance', '/services/group-retirement', '/advisors/recinos', '/health-insurance/american-way-health', '/admin', '/admin/applications'];

const AppLayout = () => {
  const location = useLocation();
  const isStandalonePage = standalonePages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isStandalonePage && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/events" element={<Events />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:handle" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/advisors" element={<Advisors />} />
          <Route path="/advisors/onboard" element={<AdvisorOnboarding />} />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/applications" element={
            <ProtectedRoute requireAdmin>
              <AdminApplications />
            </ProtectedRoute>
          } />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/compound-growth-calculator" element={<CompoundGrowthCalculator />} />
          <Route path="/tools/retirement-income-calculator" element={<RetirementIncomeCalculator />} />
          <Route path="/tools/tax-impact-calculator" element={<TaxImpactCalculator />} />
          <Route path="/tools/required-savings-calculator" element={<RequiredSavingsCalculator />} />
          <Route path="/tools/kai-zen-calculator" element={<KaiZenCalculatorPage />} />
          <Route path="/tools/guaranteed-income-calculator" element={<GuaranteedIncomeCalculator />} />
          <Route path="/business-insurance" element={<BusinessInsurance />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/agent" element={<AgentRecruitment />} />
          <Route path="/careers/franchise" element={<FranchiseRecruitment />} />
          <Route path="/advisors/vanessa-sanchez" element={<AdvisorVanessaSanchez />} />
          <Route path="/advisors/vanessa-sanchez/living-trust" element={<VanessaLivingTrust />} />
          <Route path="/advisors/mariah-lorenzen" element={<AdvisorMariahLorenzen />} />
          <Route path="/advisors/mariah-lorenzen/kai-zen" element={<MariahKaiZen />} />
          <Route path="/advisors/tamara-lee" element={<AdvisorTamaraLee />} />
          <Route path="/advisors/tamara-lee/medicare" element={<TamaraLeeMedicare />} />
          <Route path="/advisors/recinos" element={<RecinosBusinessInsurance />} />
          <Route path="/advisors/ismael-ververa" element={<AdvisorIsmaelVervera />} />
          <Route path="/advisors/manuel-soto" element={<AdvisorManuelSoto />} />
          <Route path="/advisors/hamlet-ohandjanian" element={<AdvisorHamletOhandjanian />} />
          <Route path="/advisors/sean-cagle" element={<AdvisorSeanCagle />} />
          <Route path="/advisors/ruth-pacheco" element={<AdvisorRuthPacheco />} />
          <Route path="/advisors/anthony-bottley" element={<AdvisorAnthonyBottley />} />
          <Route path="/services/kai-zen" element={<KaiZen />} />
          <Route path="/services/estate-planning" element={<EstatePlanning />} />
          <Route path="/services/income-planning" element={<IncomePlanning />} />
          <Route path="/services/investment-management" element={<InvestmentManagement />} />
          <Route path="/services/tax-planning" element={<TaxPlanning />} />
          <Route path="/services/healthcare-planning" element={<HealthcarePlanning />} />
          <Route path="/services/annuities" element={<Annuities />} />
          <Route path="/services/401k-rollovers" element={<Rollovers401k />} />
          <Route path="/services/insurance" element={<InsuranceServices />} />
          <Route path="/services/group-retirement" element={<GroupRetirement />} />
          <Route path="/health-insurance/american-way-health" element={<AmericanWayHealth />} />
          <Route path="/advisors/:advisorSlug/life-insurance" element={<LifeInsuranceApplication />} />
          <Route path="/life-insurance-application" element={<LifeInsuranceApplication />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isStandalonePage && <Footer />}
      {!isStandalonePage && <FloatingCTA hideOnPages={["/contact", "/book-consultation", "/thank-you", "/auth"]} />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
