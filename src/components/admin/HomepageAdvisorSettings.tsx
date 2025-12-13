import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Home, User, RotateCcw, GripVertical, Eye, X, Loader2 } from "lucide-react";
import { useHomepageAdvisorSettings } from "@/hooks/useAdminSettings";
import { advisors as staticAdvisors } from "@/data/advisors";
import { useMemo } from "react";
import { toast } from "@/hooks/use-toast";
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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableAdvisorItemProps {
  id: number | string;
  advisor: typeof staticAdvisors[0];
  onRemove: () => void;
}

const SortableAdvisorItem = ({ id, advisor, onRemove }: SortableAdvisorItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg border border-accent bg-accent/10 ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent/20 rounded"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {advisor.image ? (
          <img
            src={advisor.image}
            alt={advisor.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">{advisor.name}</p>
          <p className="text-xs text-muted-foreground truncate">{advisor.title}</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-destructive/20 rounded text-muted-foreground hover:text-destructive transition-colors"
        title="Remove from selection"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const HomepageAdvisorSettings = () => {
  const { 
    homepageAdvisorIds, 
    homepageAdvisorCount, 
    isLoading,
    setHomepageAdvisorCount, 
    toggleHomepageAdvisor,
    clearHomepageAdvisors,
    reorderHomepageAdvisors,
  } = useHomepageAdvisorSettings();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const selectedAdvisors = homepageAdvisorIds
    .map(id => staticAdvisors.find(a => a.id === id))
    .filter(Boolean) as typeof staticAdvisors;

  const unselectedAdvisors = staticAdvisors.filter(
    advisor => !homepageAdvisorIds.includes(advisor.id)
  );

  // Preview advisors - what will actually show on homepage
  const previewAdvisors = useMemo(() => {
    if (homepageAdvisorIds.length > 0) {
      return homepageAdvisorIds
        .map(id => staticAdvisors.find(a => a.id === id))
        .filter(Boolean)
        .slice(0, homepageAdvisorCount) as typeof staticAdvisors;
    }
    return staticAdvisors.slice(0, homepageAdvisorCount);
  }, [homepageAdvisorIds, homepageAdvisorCount]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = homepageAdvisorIds.indexOf(active.id as number | string);
      const newIndex = homepageAdvisorIds.indexOf(over.id as number | string);
      reorderHomepageAdvisors(oldIndex, newIndex);
      toast({ title: "Order updated", description: "Advisor display order has been saved." });
    }
  };

  const handleCountChange = (value: number[]) => {
    setHomepageAdvisorCount(value[0]);
    toast({ title: "Settings saved", description: `Displaying ${value[0]} advisor${value[0] !== 1 ? 's' : ''} on homepage.` });
  };

  const handleToggleAdvisor = (id: number | string) => {
    const isCurrentlySelected = homepageAdvisorIds.includes(id);
    toggleHomepageAdvisor(id);
    const advisor = staticAdvisors.find(a => a.id === id);
    toast({ 
      title: isCurrentlySelected ? "Advisor removed" : "Advisor added",
      description: `${advisor?.name} ${isCurrentlySelected ? 'removed from' : 'added to'} homepage.`
    });
  };

  const handleClearSelection = () => {
    clearHomepageAdvisors();
    toast({ title: "Selection cleared", description: "All advisors have been deselected." });
  };

  if (isLoading) {
    return (
      <Card className="glass animate-fade-in">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-accent" />
          <CardTitle className="text-navy">Homepage Advisor Display</CardTitle>
        </div>
        <CardDescription>
          Select which advisors appear on the homepage and drag to reorder
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Count Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Number of Advisors to Display</Label>
            <span className="text-lg font-bold text-accent">{homepageAdvisorCount}</span>
          </div>
          <Slider
            value={[homepageAdvisorCount]}
            onValueChange={handleCountChange}
            min={1}
            max={6}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {homepageAdvisorIds.length > 0 
              ? `Showing up to ${homepageAdvisorCount} of ${homepageAdvisorIds.length} selected advisors`
              : `Will show first ${homepageAdvisorCount} advisors from the list`}
          </p>
        </div>

        {/* Selected Advisors - Drag to Reorder */}
        {selectedAdvisors.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Display Order (drag to reorder)</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSelection}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear Selection
              </Button>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={homepageAdvisorIds}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {selectedAdvisors.map((advisor) => (
                    <SortableAdvisorItem
                      key={advisor.id}
                      id={advisor.id}
                      advisor={advisor}
                      onRemove={() => handleToggleAdvisor(advisor.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <p className="text-sm text-accent font-medium">
              {homepageAdvisorIds.length} advisor{homepageAdvisorIds.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Available Advisors */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {selectedAdvisors.length > 0 ? "Add More Advisors" : "Select Featured Advisors"}
          </Label>
          {selectedAdvisors.length === 0 && (
            <p className="text-xs text-muted-foreground mb-3">
              If none selected, the first {homepageAdvisorCount} advisors will be shown by default
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-2">
            {unselectedAdvisors.map((advisor) => (
              <div
                key={advisor.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all cursor-pointer"
                onClick={() => handleToggleAdvisor(advisor.id)}
              >
                <Checkbox
                  checked={false}
                  onCheckedChange={() => handleToggleAdvisor(advisor.id)}
                  className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {advisor.image ? (
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{advisor.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{advisor.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-accent" />
            <Label className="text-sm font-medium">Homepage Preview</Label>
          </div>
          <div className="bg-secondary/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-navy mb-1">Meet Our Advisors</h3>
              <p className="text-xs text-muted-foreground">
                Experienced professionals dedicated to your financial success
              </p>
            </div>
            <div className={`grid gap-4 ${
              previewAdvisors.length === 1 ? 'grid-cols-1 max-w-[180px] mx-auto' :
              previewAdvisors.length === 2 ? 'grid-cols-2 max-w-[380px] mx-auto' :
              previewAdvisors.length <= 3 ? 'grid-cols-3' :
              previewAdvisors.length === 4 ? 'grid-cols-2 lg:grid-cols-4' :
              'grid-cols-3'
            }`}>
              {previewAdvisors.map((advisor) => (
                <div
                  key={advisor.id}
                  className="bg-card rounded-lg overflow-hidden shadow-sm border"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-b from-gray-400 to-gray-600">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-navy truncate">{advisor.name}</h4>
                    <p className="text-xs text-accent truncate">{advisor.city}, {advisor.state}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{advisor.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomepageAdvisorSettings;
