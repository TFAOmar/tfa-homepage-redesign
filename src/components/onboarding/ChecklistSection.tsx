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
} from "lucide-react";
import { toast } from "sonner";
import { ChecklistSection as ChecklistSectionType, getSectionCheckableItems } from "@/data/onboardingChecklist";
import { getResourcesByKeys } from "@/data/onboardingResources";
import { cn } from "@/lib/utils";

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  sectionNumber: number;
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
  sectionNumber,
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
        <mark key={i} className="bg-accent/30 text-foreground rounded px-0.5">
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
        className="glass border border-border/50 hover:border-accent/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 print:border-foreground/20"
      >
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/5 transition-colors print:pointer-events-none">
          <div className="flex items-center justify-between w-full pr-2">
            <div className="flex items-center gap-4">
              {/* Section number badge */}
              <div className="w-9 h-9 rounded-full bg-navy text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {sectionNumber}
              </div>
              <div className="text-left">
                <span className="font-bold text-navy text-lg">
                  {highlightText(section.title)}
                </span>
                {section.subtitle && (
                  <span className="text-accent ml-2 text-sm font-medium">
                    {section.subtitle}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isComplete ? (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Complete
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs font-medium bg-secondary/50">
                  {completedCount}/{totalCount}
                </Badge>
              )}
            </div>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-5 pb-5 print:block print:!h-auto print:!opacity-100">
          <div className="space-y-4 pt-2">
            {/* Checklist Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                if (item.isSubSection) {
                  return (
                    <div 
                      key={item.id} 
                      className="text-sm font-bold text-accent mt-5 mb-2 pl-1 uppercase tracking-wide"
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
                      "flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all group",
                      "hover:bg-accent/5",
                      isChecked && "bg-green-500/5"
                    )}
                  >
                    <Checkbox
                      id={item.id}
                      checked={isChecked}
                      onCheckedChange={() => onToggleItem(item.id)}
                      className="mt-0.5 border-accent/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      aria-label={item.text}
                    />
                    <span className={cn(
                      "text-sm leading-relaxed transition-colors",
                      isChecked ? "text-muted-foreground line-through" : "text-foreground group-hover:text-navy"
                    )}>
                      {highlightText(item.text)}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Related Resources:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedResources.map((resource) => (
                    <a
                      key={resource.key}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent/80 hover:underline font-medium"
                    >
                      {resource.title} →
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Section */}
            {showNotes ? (
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <StickyNote className="h-4 w-4 text-accent" />
                  Section Notes
                </label>
                <Textarea
                  placeholder="Add notes for this section..."
                  value={notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  className="min-h-[80px] text-sm border-border/50 focus:border-accent bg-card/50"
                />
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-3 no-print">
              {!isComplete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllComplete}
                  className="text-xs border-accent/30 hover:border-accent hover:bg-accent/10"
                >
                  <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
                  Mark All Complete
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
                className="text-xs hover:bg-accent/10"
              >
                <StickyNote className="h-3.5 w-3.5 mr-1.5" />
                {showNotes ? "Hide Notes" : "Add Notes"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopySummary}
                className="text-xs hover:bg-accent/10"
              >
                <Copy className="h-3.5 w-3.5 mr-1.5" />
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