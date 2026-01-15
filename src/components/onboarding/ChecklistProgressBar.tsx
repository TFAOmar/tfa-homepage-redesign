import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

interface ChecklistProgressBarProps {
  completed: number;
  total: number;
  allExpanded: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const ChecklistProgressBar = ({
  completed,
  total,
  allExpanded,
  onExpandAll,
  onCollapseAll,
}: ChecklistProgressBarProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total && total > 0;

  return (
    <div className="sticky top-0 z-40 bg-card shadow-md border-b border-accent/20 py-4 px-6 -mx-4 sm:-mx-6 lg:-mx-8 print:static print:bg-transparent print:border-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5 flex-1">
            {/* Custom progress bar with gold gradient */}
            <div className="flex-1 max-w-md">
              <div className="relative h-3 bg-navy/10 rounded-full overflow-hidden border border-navy/20">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            
            {/* Progress stats */}
            <div className="flex items-center gap-3 whitespace-nowrap">
              {isComplete ? (
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ) : null}
              <span className={`text-sm font-bold ${isComplete ? 'text-green-500' : 'text-navy'}`}>
                {completed} of {total}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                ({percentage}%)
              </span>
            </div>
          </div>
          
          {/* Expand/Collapse button */}
          <div className="flex items-center gap-2 no-print">
            <Button
              variant="outline"
              size="sm"
              onClick={allExpanded ? onCollapseAll : onExpandAll}
              className="text-xs border-accent/30 hover:border-accent hover:bg-accent/10"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 mr-1.5" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 mr-1.5" />
                  Expand All
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};