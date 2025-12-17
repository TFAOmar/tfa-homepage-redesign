import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, Users, User, Eye, EyeOff, GripVertical, RotateCcw, X, Loader2, Settings2 
} from "lucide-react";
import { useHomepageAdvisorSettings, useDirectoryAdvisorSettings } from "@/hooks/useAdminSettings";
import { advisors as staticAdvisors } from "@/data/advisors";
import { usePublishedAdvisors } from "@/hooks/useDynamicAdvisors";
import { toast } from "sonner";
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

// Sortable item for homepage advisors
const SortableHomepageItem = ({ 
  id, 
  advisor, 
  onRemove 
}: { 
  id: number | string; 
  advisor: CombinedAdvisor; 
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 rounded-lg border border-accent/30 bg-accent/5 ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent/10 rounded">
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </button>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {advisor.image ? (
          <img src={advisor.image} alt={advisor.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-medium text-xs truncate">{advisor.name}</p>
          <p className="text-xs text-muted-foreground truncate">{advisor.title}</p>
        </div>
      </div>
      <button onClick={onRemove} className="p-1 hover:bg-destructive/20 rounded text-muted-foreground hover:text-destructive">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

// Sortable item for directory order
const SortableDirectoryItem = ({ advisor, index }: { advisor: CombinedAdvisor; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: String(advisor.id) });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1">
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </button>
      <span className="text-xs text-muted-foreground w-5">{index + 1}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">{advisor.name}</p>
        <p className="text-xs text-muted-foreground truncate">{advisor.city}, {advisor.state}</p>
      </div>
    </div>
  );
};

const AdvisorSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState("homepage");
  
  // Homepage settings
  const { 
    homepageAdvisorIds, 
    homepageAdvisorCount, 
    isLoading: homepageLoading,
    setHomepageAdvisorCount, 
    toggleHomepageAdvisor,
    clearHomepageAdvisors,
    reorderHomepageAdvisors,
  } = useHomepageAdvisorSettings();

  // Directory settings
  const { 
    hiddenAdvisorIds, 
    advisorOrder, 
    isLoading: directoryLoading,
    toggleAdvisorVisibility,
    setAdvisorOrder,
    resetToAlphabetical,
  } = useDirectoryAdvisorSettings();
  
  const { data: dynamicAdvisors = [] } = usePublishedAdvisors();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Combine static and dynamic advisors
  const allAdvisors: CombinedAdvisor[] = useMemo(() => {
    const mapped: CombinedAdvisor[] = [
      ...staticAdvisors.map((a) => ({ id: a.id, name: a.name, title: a.title, city: a.city, state: a.state, image: a.image })),
      ...dynamicAdvisors.map((da) => ({ id: da.id, name: da.name, title: da.title, city: da.city, state: da.state, image: da.image_url || undefined })),
    ];
    return mapped.sort((a, b) => a.name.localeCompare(b.name));
  }, [dynamicAdvisors]);

  // Homepage: selected and unselected
  const selectedHomepageAdvisors = homepageAdvisorIds
    .map(id => allAdvisors.find(a => a.id === id))
    .filter(Boolean) as CombinedAdvisor[];

  const unselectedHomepageAdvisors = allAdvisors.filter(
    advisor => !homepageAdvisorIds.includes(advisor.id)
  );

  const previewHomepageAdvisors = useMemo(() => {
    if (homepageAdvisorIds.length > 0) {
      return homepageAdvisorIds
        .map(id => allAdvisors.find(a => a.id === id))
        .filter(Boolean)
        .slice(0, homepageAdvisorCount) as CombinedAdvisor[];
    }
    return allAdvisors.slice(0, homepageAdvisorCount);
  }, [homepageAdvisorIds, homepageAdvisorCount, allAdvisors]);

  // Directory: visible and ordered
  const visibleDirectoryAdvisors = useMemo(() => {
    return allAdvisors.filter((a) => !hiddenAdvisorIds.includes(a.id));
  }, [allAdvisors, hiddenAdvisorIds]);

  const orderedDirectoryAdvisors = useMemo(() => {
    if (advisorOrder.length === 0) return visibleDirectoryAdvisors;
    const orderMap = new Map(advisorOrder.map((id, idx) => [String(id), idx]));
    return [...visibleDirectoryAdvisors].sort((a, b) => {
      const aIdx = orderMap.get(String(a.id));
      const bIdx = orderMap.get(String(b.id));
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [visibleDirectoryAdvisors, advisorOrder]);

  // Handlers
  const handleHomepageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = homepageAdvisorIds.indexOf(active.id as number | string);
      const newIndex = homepageAdvisorIds.indexOf(over.id as number | string);
      reorderHomepageAdvisors(oldIndex, newIndex);
      toast.success("Order updated");
    }
  };

  const handleDirectoryDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = orderedDirectoryAdvisors.findIndex((a) => String(a.id) === active.id);
      const newIndex = orderedDirectoryAdvisors.findIndex((a) => String(a.id) === over.id);
      const newOrder = arrayMove(orderedDirectoryAdvisors, oldIndex, newIndex);
      setAdvisorOrder(newOrder.map((a) => a.id));
      toast.success("Directory order updated");
    }
  };

  const handleToggleHomepageAdvisor = (id: number | string) => {
    const isSelected = homepageAdvisorIds.includes(id);
    toggleHomepageAdvisor(id);
    const advisor = allAdvisors.find(a => a.id === id);
    toast.success(isSelected ? "Removed from homepage" : "Added to homepage", {
      description: advisor?.name
    });
  };

  const handleInitializeDirectoryOrder = () => {
    setAdvisorOrder(visibleDirectoryAdvisors.map((a) => a.id));
    toast.success("Custom order enabled");
  };

  if (homepageLoading || directoryLoading) {
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
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-accent" />
          <CardTitle className="text-navy">Advisor Display Settings</CardTitle>
        </div>
        <CardDescription>
          Control which advisors appear on the homepage and directory pages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="homepage" className="flex-1 gap-2">
              <Home className="h-4 w-4" />
              Homepage Display
            </TabsTrigger>
            <TabsTrigger value="directory" className="flex-1 gap-2">
              <Users className="h-4 w-4" />
              Directory Settings
            </TabsTrigger>
          </TabsList>

          {/* Homepage Tab */}
          <TabsContent value="homepage" className="space-y-4 mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Selection Controls */}
              <div className="space-y-4">
                {/* Count Slider */}
                <div className="space-y-2 p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Advisors to Display</Label>
                    <span className="text-2xl font-bold text-accent">{homepageAdvisorCount}</span>
                  </div>
                  <Slider
                    value={[homepageAdvisorCount]}
                    onValueChange={(v) => { setHomepageAdvisorCount(v[0]); toast.success(`Showing ${v[0]} advisors`); }}
                    min={1}
                    max={6}
                    step={1}
                  />
                </div>

                {/* Selected Advisors */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Featured Advisors ({selectedHomepageAdvisors.length})
                    </Label>
                    {selectedHomepageAdvisors.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => { clearHomepageAdvisors(); toast.success("Selection cleared"); }}>
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  {selectedHomepageAdvisors.length > 0 ? (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleHomepageDragEnd}>
                      <SortableContext items={homepageAdvisorIds} strategy={verticalListSortingStrategy}>
                        <ScrollArea className="h-[180px]">
                          <div className="space-y-1.5 pr-2">
                            {selectedHomepageAdvisors.map((advisor) => (
                              <SortableHomepageItem
                                key={advisor.id}
                                id={advisor.id}
                                advisor={advisor}
                                onRemove={() => handleToggleHomepageAdvisor(advisor.id)}
                              />
                            ))}
                          </div>
                        </ScrollArea>
                      </SortableContext>
                    </DndContext>
                  ) : (
                    <div className="h-[180px] flex items-center justify-center text-muted-foreground text-sm border border-dashed rounded-lg">
                      No advisors selected - showing first {homepageAdvisorCount} by default
                    </div>
                  )}
                </div>

                {/* Available Advisors */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Available Advisors</Label>
                  <ScrollArea className="h-[200px]">
                    <div className="grid grid-cols-1 gap-1.5 pr-2">
                      {unselectedHomepageAdvisors.map((advisor) => (
                        <div
                          key={advisor.id}
                          className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all cursor-pointer"
                          onClick={() => handleToggleHomepageAdvisor(advisor.id)}
                        >
                          <Checkbox checked={false} className="data-[state=checked]:bg-accent" />
                          {advisor.image ? (
                            <img src={advisor.image} alt={advisor.name} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs truncate">{advisor.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{advisor.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* Right: Live Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-accent" />
                  <Label className="text-sm font-medium">Homepage Preview</Label>
                </div>
                <div className="bg-secondary/30 rounded-xl p-4 min-h-[400px]">
                  <div className="text-center mb-4">
                    <h3 className="text-sm font-bold text-navy mb-1">Meet Our Advisors</h3>
                    <p className="text-xs text-muted-foreground">Experienced professionals dedicated to your financial success</p>
                  </div>
                  <div className={`grid gap-3 ${
                    previewHomepageAdvisors.length === 1 ? 'grid-cols-1 max-w-[140px] mx-auto' :
                    previewHomepageAdvisors.length === 2 ? 'grid-cols-2 max-w-[300px] mx-auto' :
                    previewHomepageAdvisors.length <= 3 ? 'grid-cols-3' :
                    previewHomepageAdvisors.length === 4 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {previewHomepageAdvisors.map((advisor) => (
                      <div key={advisor.id} className="bg-card rounded-lg overflow-hidden shadow-sm border">
                        <div className="aspect-square overflow-hidden bg-gradient-to-b from-gray-400 to-gray-600">
                          {advisor.image && <img src={advisor.image} alt={advisor.name} className="w-full h-full object-contain object-center" />}
                        </div>
                        <div className="p-2">
                          <h4 className="text-xs font-bold text-navy truncate">{advisor.name}</h4>
                          <p className="text-xs text-accent truncate">{advisor.city}, {advisor.state}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Directory Tab */}
          <TabsContent value="directory" className="space-y-4 mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Visibility Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Advisor Visibility ({visibleDirectoryAdvisors.length} visible, {hiddenAdvisorIds.length} hidden)
                  </Label>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-1.5 pr-2">
                    {allAdvisors.map((advisor) => {
                      const isHidden = hiddenAdvisorIds.includes(advisor.id);
                      return (
                        <div
                          key={String(advisor.id)}
                          className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                            isHidden ? "bg-muted/30 border-muted opacity-60" : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            {isHidden ? (
                              <EyeOff className="h-3 w-3 text-muted-foreground shrink-0" />
                            ) : (
                              <Eye className="h-3 w-3 text-accent shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className={`text-xs font-medium truncate ${isHidden ? "text-muted-foreground" : "text-foreground"}`}>
                                {advisor.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {advisor.city}, {advisor.state}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={!isHidden}
                            onCheckedChange={() => {
                              toggleAdvisorVisibility(advisor.id);
                              toast.success(isHidden ? "Advisor visible" : "Advisor hidden", { description: advisor.name });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>

              {/* Right: Order Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Display Order</Label>
                  {advisorOrder.length === 0 ? (
                    <Button variant="outline" size="sm" onClick={handleInitializeDirectoryOrder}>
                      Enable Custom Order
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => { resetToAlphabetical(); toast.success("Reset to alphabetical"); }}>
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
                
                {advisorOrder.length === 0 ? (
                  <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-lg p-4">
                    <Users className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">Alphabetical Order</p>
                    <p className="text-xs text-center mt-1">Click "Enable Custom Order" to drag and reorder advisors</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDirectoryDragEnd}>
                      <SortableContext items={orderedDirectoryAdvisors.map((a) => String(a.id))} strategy={verticalListSortingStrategy}>
                        <div className="space-y-1.5 pr-2">
                          {orderedDirectoryAdvisors.map((advisor, index) => (
                            <SortableDirectoryItem key={String(advisor.id)} advisor={advisor} index={index} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </ScrollArea>
                )}

                {/* Directory Preview */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-accent" />
                    <Label className="text-sm font-medium">Directory Preview (first 6)</Label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {orderedDirectoryAdvisors.slice(0, 6).map((advisor, i) => (
                      <div key={advisor.id} className="p-2 rounded bg-secondary/30 text-center">
                        <span className="text-xs text-accent font-bold">#{i + 1}</span>
                        <p className="text-xs font-medium truncate">{advisor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvisorSettingsPanel;
