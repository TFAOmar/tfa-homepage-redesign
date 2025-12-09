import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Building2, PiggyBank, LineChart, Repeat, DollarSign, Shield, Stethoscope, Landmark, Scale, Calculator, BookOpen, Calendar, Award, Users, ShoppingBag, Briefcase } from "lucide-react";
import tfaLogo from "@/assets/tfa-logo.png";
import { Link } from "react-router-dom";
import { CartDrawer } from "./shop/CartDrawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const servicesMenu = [
  {
    title: "Retirement & Wealth",
    items: [
      { name: "Income Planning", icon: PiggyBank, href: "/services#income-planning", description: "Secure your retirement income" },
      { name: "Investment Management", icon: LineChart, href: "/services#investment", description: "Grow your wealth strategically" },
      { name: "401(k) Rollovers", icon: Repeat, href: "/services#401k", description: "Optimize your retirement accounts" },
      { name: "Annuities", icon: DollarSign, href: "/services#annuities", description: "Guaranteed income solutions" },
    ]
  },
  {
    title: "Protection",
    items: [
      { name: "Life Insurance", icon: Shield, href: "/services#life-insurance", description: "Protect your family's future" },
      { name: "Health Care Planning", icon: Stethoscope, href: "/services#healthcare", description: "Plan for medical expenses" },
      { name: "Business Insurance", icon: Building2, href: "/business-insurance", description: "Protect your business" },
      { name: "Group Retirement Plans", icon: Building2, href: "/services#group-plans", description: "Employee benefit solutions" },
    ]
  },
  {
    title: "Legacy & Tax",
    items: [
      { name: "Estate Planning", icon: Landmark, href: "/services#estate", description: "Preserve your legacy" },
      { name: "Tax Planning", icon: Scale, href: "/services#tax", description: "Minimize tax burden" },
    ]
  }
];

const resourcesMenu = [
  { name: "Tools", icon: Calculator, href: "/tools", description: "Financial calculators & planning tools" },
  { name: "Blog", icon: BookOpen, href: "/blog", description: "Financial insights & education" },
  { name: "Events", icon: Calendar, href: "/events", description: "Upcoming workshops & seminars" },
  { name: "Partners", icon: Award, href: "/partners", description: "Our insurance carriers" },
  { name: "Advisor Directory", icon: Users, href: "/advisors", description: "Meet our team" },
  { name: "Shop", icon: ShoppingBag, href: "/shop", description: "Financial resources" },
  { name: "Careers", icon: Briefcase, href: "/careers", description: "Join our team" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 backdrop-blur-2xl border-gray-200/50 shadow-lg" 
        : "bg-transparent backdrop-blur-none border-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={tfaLogo} 
              alt="The Financial Architects" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus:text-accent focus:outline-none">
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus:text-accent focus:outline-none">
                  About
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:text-accent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] gap-3 p-6 md:grid-cols-3">
                    {servicesMenu.map((category) => (
                      <div key={category.title} className="space-y-3">
                        <h4 className="text-sm font-semibold text-primary">{category.title}</h4>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                                >
                                  <div className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                                    <div className="text-sm font-medium leading-none">{item.name}</div>
                                  </div>
                                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:text-accent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {resourcesMenu.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/events" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus:text-accent focus:outline-none">
                  Events
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/locations" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus:text-accent focus:outline-none">
                  Locations
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus:text-accent focus:outline-none">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-2">
            <CartDrawer />
            <Link to="/book-consultation" className="hidden lg:block">
              <Button className="btn-primary-cta px-6 py-5">
                Book Consultation
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-accent transition-colors">
                    Home
                  </Link>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-accent transition-colors">
                    About
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="services">
                      <AccordionTrigger className="text-lg font-medium">Services</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {servicesMenu.map((category) => (
                            <div key={category.title} className="space-y-2">
                              <h4 className="text-sm font-semibold text-primary">{category.title}</h4>
                              <ul className="space-y-2 pl-2">
                                {category.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <item.icon className="h-4 w-4" />
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="resources">
                      <AccordionTrigger className="text-lg font-medium">Resources</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-2">
                          {resourcesMenu.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-accent transition-colors">
                    Events
                  </Link>
                  <Link to="/locations" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-accent transition-colors">
                    Locations
                  </Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-accent transition-colors">
                    Contact
                  </Link>

                  <div className="pt-4 border-t">
                    <Link to="/book-consultation" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full btn-primary-cta">
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
