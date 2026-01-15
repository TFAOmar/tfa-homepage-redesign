import { Progress } from "@/components/ui/progress";
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
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-4 -mx-4 sm:-mx-6 lg:-mx-8 print:static print:bg-transparent print:border-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1 max-w-md">
              <Progress 
                value={percentage} 
                className="h-2.5"
              />
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : null}
              <span className={`text-sm font-medium ${isComplete ? 'text-green-500' : 'text-foreground'}`}>
                {completed} of {total} complete
              </span>
              <span className="text-sm text-muted-foreground">
                ({percentage}%)
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 no-print">
            <Button
              variant="outline"
              size="sm"
              onClick={allExpanded ? onCollapseAll : onExpandAll}
              className="text-xs"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
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
