/**
 * NEW AGENT ONBOARDING CHECKLIST PAGE
 * 
 * This page provides an interactive checklist for onboarding new TFA agents.
 * 
 * DATA CONFIGURATION:
 * - Checklist items: Edit src/data/onboardingChecklist.ts
 * - Resource links: Edit src/data/onboardingResources.ts
 * 
 * LOCALSTORAGE KEYS:
 * - "tfa-onboarding-checklist": Main state (profile, completed items, notes, timestamps)
 * 
 * FEATURES:
 * - Persistent progress via localStorage
 * - Print/PDF export with clean layout
 * - Shareable URL
 * - Search/filter functionality
 * - Section notes and summaries
 */

import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Printer, Link2, RotateCcw, Search, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { AgentProfileCard, AgentProfile } from "@/components/onboarding/AgentProfileCard";
import { ChecklistProgressBar } from "@/components/onboarding/ChecklistProgressBar";
import { ChecklistSectionComponent } from "@/components/onboarding/ChecklistSection";
import { ResourcesPanel } from "@/components/onboarding/ResourcesPanel";
import { ONBOARDING_CHECKLIST, getTotalCheckableItems, getSectionCheckableItems } from "@/data/onboardingChecklist";

const STORAGE_KEY = "tfa-onboarding-checklist";

interface ChecklistState {
  agentProfile: AgentProfile | null;
  completedItems: string[];
  sectionNotes: Record<string, string>;
  startedAt: string | null;
  lastUpdated: string | null;
}

const getInitialState = (): ChecklistState => ({
  agentProfile: null,
  completedItems: [],
  sectionNotes: {},
  startedAt: null,
  lastUpdated: null,
});

const OnboardingChecklist = () => {
  const [state, setState] = useState<ChecklistState>(getInitialState);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(parsed);
        // Auto-expand sections with incomplete items
        const incomplete = ONBOARDING_CHECKLIST
          .filter(section => {
            const checkable = getSectionCheckableItems(section);
            return checkable.some(item => !parsed.completedItems.includes(item.id));
          })
          .map(s => s.id);
        setOpenSections(incomplete.slice(0, 1)); // Open first incomplete section
      }
    } catch (e) {
      console.error("Failed to load checklist state:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  // Calculate progress
  const totalItems = getTotalCheckableItems();
  const completedCount = state.completedItems.length;

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return ONBOARDING_CHECKLIST;
    
    const query = searchQuery.toLowerCase();
    return ONBOARDING_CHECKLIST.filter(section => {
      const titleMatch = section.title.toLowerCase().includes(query);
      const itemMatch = section.items.some(item => 
        item.text.toLowerCase().includes(query)
      );
      return titleMatch || itemMatch;
    });
  }, [searchQuery]);

  // Expand matching sections when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      setOpenSections(filteredSections.map(s => s.id));
    }
  }, [searchQuery, filteredSections]);

  const handleSaveProfile = (profile: AgentProfile) => {
    setState(prev => ({
      ...prev,
      agentProfile: profile,
      startedAt: prev.startedAt || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }));
    toast.success("Agent profile saved");
  };

  const handleToggleItem = (itemId: string) => {
    setState(prev => {
      const isCompleted = prev.completedItems.includes(itemId);
      return {
        ...prev,
        completedItems: isCompleted
          ? prev.completedItems.filter(id => id !== itemId)
          : [...prev.completedItems, itemId],
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleMarkAllComplete = (itemIds: string[]) => {
    setState(prev => {
      const newCompleted = new Set(prev.completedItems);
      itemIds.forEach(id => newCompleted.add(id));
      return {
        ...prev,
        completedItems: Array.from(newCompleted),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleNotesChange = (sectionId: string, notes: string) => {
    setState(prev => ({
      ...prev,
      sectionNotes: {
        ...prev.sectionNotes,
        [sectionId]: notes,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleToggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleExpandAll = () => {
    setOpenSections(ONBOARDING_CHECKLIST.map(s => s.id));
  };

  const handleCollapseAll = () => {
    setOpenSections([]);
  };

  const handlePrint = () => {
    // Expand all sections for print
    setOpenSections(ONBOARDING_CHECKLIST.map(s => s.id));
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleReset = () => {
    setState(getInitialState());
    setOpenSections([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Checklist reset successfully");
  };

  const allExpanded = openSections.length === ONBOARDING_CHECKLIST.length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>New Agent Onboarding Checklist | TFA</title>
        <meta 
          name="description" 
          content="Interactive checklist for onboarding new TFA agents from Day 0 to Day 30." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Disclaimer Banner */}
        <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 no-print">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm text-primary">
            <AlertTriangle className="h-4 w-4" />
            <span>Internal training resource for TFA agents.</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              New Agent Onboarding Checklist
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Use this checklist to onboard a new agent from Day 0 to Day 30 — with links to all required resources.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6 no-print">
              <Button onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print / Save PDF
              </Button>
              <Button onClick={handleCopyLink} variant="outline">
                <Link2 className="h-4 w-4 mr-2" />
                Copy Share Link
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Checklist
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Onboarding Checklist?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear all progress, notes, and agent information. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
                      Reset Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Agent Profile Card */}
          <div className="mb-6">
            <AgentProfileCard
              profile={state.agentProfile}
              startedAt={state.startedAt}
              onSave={handleSaveProfile}
            />
          </div>

          {/* Progress Bar */}
          <ChecklistProgressBar
            completed={completedCount}
            total={totalItems}
            allExpanded={allExpanded}
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
          />

          {/* Search */}
          <div className="my-6 no-print">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search checklist items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search checklist items"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-[1fr,320px] gap-8">
            {/* Checklist Sections */}
            <div className="space-y-4">
              {filteredSections.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No items match your search.
                </div>
              ) : (
                filteredSections.map((section) => (
                  <ChecklistSectionComponent
                    key={section.id}
                    section={section}
                    completedItems={state.completedItems}
                    notes={state.sectionNotes[section.id] || ""}
                    isOpen={openSections.includes(section.id)}
                    onToggleItem={handleToggleItem}
                    onMarkAllComplete={handleMarkAllComplete}
                    onNotesChange={(notes) => handleNotesChange(section.id, notes)}
                    onToggleOpen={() => handleToggleSection(section.id)}
                    searchQuery={searchQuery}
                  />
                ))
              )}
            </div>

            {/* Resources Panel */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <ResourcesPanel />
            </aside>
          </div>

          {/* Compliance Footer */}
          <footer className="mt-12 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
              This checklist is for internal training and onboarding support. 
              Licensing and carrier requirements may vary by state and carrier.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default OnboardingChecklist;
