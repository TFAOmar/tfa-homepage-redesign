import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Copy, 
  CheckCheck,
  StickyNote,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { ChecklistSection as ChecklistSectionType, getSectionCheckableItems } from "@/data/onboardingChecklist";
import { getResourcesByKeys } from "@/data/onboardingResources";
import { cn } from "@/lib/utils";

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  completedItems: string[];
  notes: string;
  isOpen: boolean;
  onToggleItem: (itemId: string) => void;
  onMarkAllComplete: (itemIds: string[]) => void;
  onNotesChange: (notes: string) => void;
  onToggleOpen: () => void;
  searchQuery?: string;
}

export const ChecklistSectionComponent = ({
  section,
  completedItems,
  notes,
  isOpen,
  onToggleItem,
  onMarkAllComplete,
  onNotesChange,
  onToggleOpen,
  searchQuery = "",
}: ChecklistSectionProps) => {
  const [showNotes, setShowNotes] = useState(!!notes);
  
  const checkableItems = getSectionCheckableItems(section);
  const completedCount = checkableItems.filter(item => completedItems.includes(item.id)).length;
  const totalCount = checkableItems.length;
  const isComplete = completedCount === totalCount;
  const relatedResources = getResourcesByKeys(section.relatedResources || []);

  const handleMarkAllComplete = () => {
    const itemIds = checkableItems.map(item => item.id);
    onMarkAllComplete(itemIds);
  };

  const handleCopySummary = () => {
    const completedItemTexts = section.items
      .filter(item => !item.isSubSection && completedItems.includes(item.id))
      .map(item => `✓ ${item.text}`)
      .join("\n");
    
    const incompleteItemTexts = section.items
      .filter(item => !item.isSubSection && !completedItems.includes(item.id))
      .map(item => `○ ${item.text}`)
      .join("\n");

    let summary = `${section.title} ${section.subtitle || ""}\n`;
    summary += `Status: ${completedCount}/${totalCount} complete\n\n`;
    
    if (completedItemTexts) {
      summary += `Completed:\n${completedItemTexts}\n\n`;
    }
    if (incompleteItemTexts) {
      summary += `Remaining:\n${incompleteItemTexts}\n\n`;
    }
    if (notes) {
      summary += `Notes:\n${notes}`;
    }

    navigator.clipboard.writeText(summary);
    toast.success("Section summary copied to clipboard");
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? section.id : ""}
      onValueChange={() => onToggleOpen()}
      className="print:border-0"
    >
      <AccordionItem 
        value={section.id} 
        className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden print:border-foreground/20"
      >
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]>div>.chevron]:rotate-90 print:pointer-events-none">
          <div className="flex items-center justify-between w-full pr-2">
            <div className="flex items-center gap-3">
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 chevron no-print" />
              <div className="text-left">
                <span className="font-semibold text-foreground">
                  {highlightText(section.title)}
                </span>
                {section.subtitle && (
                  <span className="text-muted-foreground ml-2 text-sm">
                    {section.subtitle}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isComplete ? (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  {completedCount}/{totalCount}
                </Badge>
              )}
            </div>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-4 pb-4 print:block print:!h-auto print:!opacity-100">
          <div className="space-y-4 pt-2">
            {/* Checklist Items */}
            <div className="space-y-2">
              {section.items.map((item) => {
                if (item.isSubSection) {
                  return (
                    <div 
                      key={item.id} 
                      className="text-sm font-semibold text-primary mt-4 mb-2 pl-1"
                    >
                      {highlightText(item.text)}
                    </div>
                  );
                }

                const isChecked = completedItems.includes(item.id);
                
                return (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors",
                      "hover:bg-muted/50",
                      isChecked && "bg-green-500/5"
                    )}
                  >
                    <Checkbox
                      id={item.id}
                      checked={isChecked}
                      onCheckedChange={() => onToggleItem(item.id)}
                      className="mt-0.5"
                      aria-label={item.text}
                    />
                    <span className={cn(
                      "text-sm leading-relaxed",
                      isChecked && "text-muted-foreground line-through"
                    )}>
                      {highlightText(item.text)}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Related Resources:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedResources.map((resource) => (
                    <a
                      key={resource.key}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {resource.title} →
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Section */}
            {showNotes ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Section Notes
                </label>
                <Textarea
                  placeholder="Add notes for this section..."
                  value={notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  className="min-h-[80px] text-sm"
                />
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 no-print">
              {!isComplete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllComplete}
                  className="text-xs"
                >
                  <CheckCheck className="h-3 w-3 mr-1" />
                  Mark All Complete
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
                className="text-xs"
              >
                <StickyNote className="h-3 w-3 mr-1" />
                {showNotes ? "Hide Notes" : "Add Notes"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopySummary}
                className="text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Summary
              </Button>
            </div>

            {/* Print-only notes display */}
            {notes && (
              <div className="hidden print:block pt-2 border-t border-foreground/20">
                <p className="text-xs font-medium mb-1">Notes:</p>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap">{notes}</p>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
