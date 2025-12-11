import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Home, User, RotateCcw, GripVertical } from "lucide-react";
import { useAdvisorStore } from "@/stores/advisorStore";
import { advisors as staticAdvisors } from "@/data/advisors";
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

interface SortableAdvisorItemProps {
  id: number | string;
  advisor: typeof staticAdvisors[0];
}

const SortableAdvisorItem = ({ id, advisor }: SortableAdvisorItemProps) => {
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
    </div>
  );
};

const HomepageAdvisorSettings = () => {
  const { 
    homepageAdvisorIds, 
    homepageAdvisorCount, 
    setHomepageAdvisorCount, 
    toggleHomepageAdvisor,
    clearHomepageAdvisors,
    reorderHomepageAdvisors,
  } = useAdvisorStore();

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = homepageAdvisorIds.indexOf(active.id as number | string);
      const newIndex = homepageAdvisorIds.indexOf(over.id as number | string);
      reorderHomepageAdvisors(oldIndex, newIndex);
    }
  };

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
            onValueChange={(value) => setHomepageAdvisorCount(value[0])}
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
                onClick={clearHomepageAdvisors}
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
                onClick={() => toggleHomepageAdvisor(advisor.id)}
              >
                <Checkbox
                  checked={false}
                  onCheckedChange={() => toggleHomepageAdvisor(advisor.id)}
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
      </CardContent>
    </Card>
  );
};

export default HomepageAdvisorSettings;
