import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  stateFilter: string;
  onStateFilterChange: (value: string) => void;
  titleFilter: string;
  onTitleFilterChange: (value: string) => void;
  totalAdvisors: number;
  pendingCount: number;
}

const states = [
  "All States", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const titles = [
  "All Titles",
  "Financial Advisor",
  "Senior Financial Advisor",
  "Life Insurance Broker",
  "Senior Life Insurance Broker",
  "Retirement Planning Specialist",
  "Estate Planning Advisor",
  "Tax Strategy Advisor",
  "Annuity Specialist",
];

const AdminHeader = ({
  searchQuery,
  onSearchChange,
  stateFilter,
  onStateFilterChange,
  titleFilter,
  onTitleFilterChange,
  totalAdvisors,
  pendingCount,
}: AdminHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-navy">{totalAdvisors}</div>
          <div className="text-sm text-muted-foreground">Total Advisors</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-orange-500">{pendingCount}</div>
          <div className="text-sm text-muted-foreground">Pending Approval</div>
        </div>
        <div className="col-span-2 flex items-center justify-end">
          <Link to="/advisors/onboard">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button">
              <Plus className="h-4 w-4 mr-2" />
              Add New Advisor
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Row */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters</span>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, city, state..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Select value={stateFilter} onValueChange={onStateFilterChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Filter by State" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50 max-h-[300px]">
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={titleFilter} onValueChange={onTitleFilterChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Filter by Title" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {titles.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
