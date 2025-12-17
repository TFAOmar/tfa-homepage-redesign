import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Eye, EyeOff, GripVertical, RotateCcw, Users } from "lucide-react";
import { useDirectoryAdvisorSettings } from "@/hooks/useAdminSettings";
import { advisors as staticAdvisors, Advisor } from "@/data/advisors";
import { usePublishedAdvisors, PublicAdvisor } from "@/hooks/useDynamicAdvisors";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CombinedAdvisor {
  id: string | number;
  name: string;
  title: string;
  city: string;
  state: string;
  image?: string;
}

const SortableAdvisorItem = ({ advisor, index }: { advisor: CombinedAdvisor; index: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(advisor.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <span className="text-xs text-muted-foreground w-6">{index + 1}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{advisor.name}</p>
        <p className="text-xs text-muted-foreground truncate">{advisor.city}, {advisor.state}</p>
      </div>
    </div>
  );
};

const DirectoryAdvisorSettings = () => {
  const { 
    hiddenAdvisorIds, 
    advisorOrder, 
    isLoading,
    toggleAdvisorVisibility,
    setAdvisorOrder,
    resetToAlphabetical,
  } = useDirectoryAdvisorSettings();
  
  const { data: dynamicAdvisors = [] } = usePublishedAdvisors();
  const [activeSection, setActiveSection] = useState<"visibility" | "order">("visibility");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Combine static and dynamic advisors
  const allAdvisors: CombinedAdvisor[] = useMemo(() => {
    const mapped: CombinedAdvisor[] = [
      ...staticAdvisors.map((a) => ({
        id: a.id,
        name: a.name,
        title: a.title,
        city: a.city,
        state: a.state,
        image: a.image,
      })),
      ...dynamicAdvisors.map((da) => ({
        id: da.id,
        name: da.name,
        title: da.title,
        city: da.city,
        state: da.state,
        image: da.image_url || undefined,
      })),
    ];
    return mapped.sort((a, b) => a.name.localeCompare(b.name));
  }, [dynamicAdvisors]);

  // Visible advisors (not hidden)
  const visibleAdvisors = useMemo(() => {
    return allAdvisors.filter((a) => !hiddenAdvisorIds.includes(a.id));
  }, [allAdvisors, hiddenAdvisorIds]);

  // Ordered visible advisors
  const orderedVisibleAdvisors = useMemo(() => {
    if (advisorOrder.length === 0) return visibleAdvisors;
    
    const orderMap = new Map(advisorOrder.map((id, idx) => [String(id), idx]));
    return [...visibleAdvisors].sort((a, b) => {
      const aIdx = orderMap.get(String(a.id));
      const bIdx = orderMap.get(String(b.id));
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [visibleAdvisors, advisorOrder]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = orderedVisibleAdvisors.findIndex((a) => String(a.id) === active.id);
      const newIndex = orderedVisibleAdvisors.findIndex((a) => String(a.id) === over.id);
      const newOrder = arrayMove(orderedVisibleAdvisors, oldIndex, newIndex);
      setAdvisorOrder(newOrder.map((a) => a.id));
    }
  };

  const handleInitializeOrder = () => {
    setAdvisorOrder(visibleAdvisors.map((a) => a.id));
  };

  if (isLoading) {
    return (
      <Card className="glass animate-fade-in col-span-full">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass animate-fade-in col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <CardTitle className="text-navy">Directory Advisor Settings</CardTitle>
        </div>
        <CardDescription>
          Control which advisors appear on the /advisors page and their display order
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeSection === "visibility" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("visibility")}
          >
            <Eye className="h-4 w-4 mr-2" />
            Visibility
          </Button>
          <Button
            variant={activeSection === "order" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("order")}
          >
            <GripVertical className="h-4 w-4 mr-2" />
            Order
          </Button>
        </div>

        {/* Visibility Section */}
        {activeSection === "visibility" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Toggle visibility for each advisor ({visibleAdvisors.length} visible, {hiddenAdvisorIds.length} hidden)
              </p>
            </div>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {allAdvisors.map((advisor) => {
                  const isHidden = hiddenAdvisorIds.includes(advisor.id);
                  return (
                    <div
                      key={String(advisor.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        isHidden 
                          ? "bg-muted/30 border-muted" 
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isHidden ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <Eye className="h-4 w-4 text-accent shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className={`text-sm font-medium truncate ${isHidden ? "text-muted-foreground" : "text-foreground"}`}>
                            {advisor.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {advisor.title} • {advisor.city}, {advisor.state}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={!isHidden}
                        onCheckedChange={() => toggleAdvisorVisibility(advisor.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Order Section */}
        {activeSection === "order" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Drag to reorder visible advisors
              </p>
              <div className="flex gap-2">
                {advisorOrder.length === 0 ? (
                  <Button variant="outline" size="sm" onClick={handleInitializeOrder}>
                    Enable Custom Order
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={resetToAlphabetical}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Alphabetical
                  </Button>
                )}
              </div>
            </div>
            
            {advisorOrder.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Currently using alphabetical order.</p>
                <p className="text-xs mt-1">Click "Enable Custom Order" to set a custom display order.</p>
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={orderedVisibleAdvisors.map((a) => String(a.id))}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {orderedVisibleAdvisors.map((advisor, index) => (
                        <SortableAdvisorItem key={String(advisor.id)} advisor={advisor} index={index} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </ScrollArea>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DirectoryAdvisorSettings;