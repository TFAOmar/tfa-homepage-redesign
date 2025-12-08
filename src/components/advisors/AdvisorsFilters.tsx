import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { states, specialties } from "@/data/advisors";

interface AdvisorsFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedState: string;
  setSelectedState: (value: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (value: string) => void;
}

const AdvisorsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedState,
  setSelectedState,
  selectedSpecialty,
  setSelectedSpecialty
}: AdvisorsFiltersProps) => {
  const activeFiltersCount = [
    selectedType !== "All",
    selectedState !== "All States",
    selectedSpecialty !== "All Specialties"
  ].filter(Boolean).length;

  return (
    <section className="py-12 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg glass border-2 border-border/50 focus:border-accent"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <SlidersHorizontal className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Filters</h3>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  {activeFiltersCount} active
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Profession</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="All">All Professionals</SelectItem>
                    <SelectItem value="Advisor">Financial Advisors</SelectItem>
                    <SelectItem value="Broker">Insurance Brokers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* State Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 max-h-[300px]">
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Specialty Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 max-h-[300px]">
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsFilters;
