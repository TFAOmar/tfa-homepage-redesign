import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle2, EyeOff, Archive, ChevronDown, X } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  onBulkApprove: () => void;
  onBulkHide: () => void;
  onBulkArchive: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onClear,
  onBulkApprove,
  onBulkHide,
  onBulkArchive,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-navy">
          {selectedCount} advisor{selectedCount > 1 ? "s" : ""} selected
        </span>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground neuro-button">
            Bulk Actions
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background z-50">
          <DropdownMenuItem onClick={onBulkApprove}>
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
            Approve All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onBulkHide}>
            <EyeOff className="h-4 w-4 mr-2" />
            Hide All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onBulkArchive}>
            <Archive className="h-4 w-4 mr-2" />
            Archive All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BulkActionsBar;
