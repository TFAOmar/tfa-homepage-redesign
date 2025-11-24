import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Advisors from "./pages/Advisors";
import Partners from "./pages/Partners";
import AdvisorOnboarding from "./pages/AdvisorOnboarding";
import AdminDashboard from "./pages/AdminDashboard";
import CompoundGrowthCalculator from "./pages/CompoundGrowthCalculator";
import RetirementIncomeCalculator from "./pages/RetirementIncomeCalculator";
import TaxImpactCalculator from "./pages/TaxImpactCalculator";
import RequiredSavingsCalculator from "./pages/RequiredSavingsCalculator";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/events" element={<Events />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/advisors" element={<Advisors />} />
              <Route path="/advisors/onboard" element={<AdvisorOnboarding />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/compound-growth-calculator" element={<CompoundGrowthCalculator />} />
              <Route path="/tools/retirement-income-calculator" element={<RetirementIncomeCalculator />} />
              <Route path="/tools/tax-impact-calculator" element={<TaxImpactCalculator />} />
              <Route path="/tools/required-savings-calculator" element={<RequiredSavingsCalculator />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingCTA hideOnPages={["/contact"]} />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
