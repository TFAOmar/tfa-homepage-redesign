import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Settings, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useResourceCategories, useResources } from "@/hooks/useResources";
import ResourceCard from "@/components/resources/ResourceCard";
import { SEOHead } from "@/components/seo";
import { cn } from "@/lib/utils";

const Resources = () => {
  const { isAdmin } = useAuth();
  const { data: categories = [], isLoading: catLoading } = useResourceCategories();
  const { data: resources = [], isLoading: resLoading } = useResources();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchCat = activeCategory === "all" || r.category_id === activeCategory;
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [resources, activeCategory, search]);

  const isLoading = catLoading || resLoading;

  return (
    <>
      <SEOHead title="Resource Library" description="TFA advisor documents & resources" noIndex />
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
                <FileText className="h-4 w-4" />
                TFA Resource Library
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
                Documents & Resources
              </h1>
              <p className="text-muted-foreground max-w-xl">
                Presentations, questionnaires, and planning materials — everything you need in one place.
              </p>
            </div>
            {isAdmin && (
              <Button asChild variant="outline">
                <Link to="/admin/resources">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Library
                </Link>
              </Button>
            )}
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="pl-10 h-11 bg-card"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                activeCategory === "all"
                  ? "bg-navy text-primary-foreground border-navy"
                  : "bg-card hover:bg-muted border-border"
              )}
            >
              All ({resources.length})
            </button>
            {categories.map((c) => {
              const count = resources.filter((r) => r.category_id === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                    activeCategory === c.id
                      ? "bg-navy text-primary-foreground border-navy"
                      : "bg-card hover:bg-muted border-border"
                  )}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed rounded-lg bg-card/50">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {search ? "No documents match your search." : "No documents in this category yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resources;