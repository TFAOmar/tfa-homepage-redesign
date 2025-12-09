import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, User } from "lucide-react";
import { useAdvisorStore } from "@/stores/advisorStore";
import { advisors as staticAdvisors } from "@/data/advisors";

const HomepageAdvisorSettings = () => {
  const { 
    homepageAdvisorIds, 
    homepageAdvisorCount, 
    setHomepageAdvisorCount, 
    toggleHomepageAdvisor 
  } = useAdvisorStore();

  return (
    <Card className="glass animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-accent" />
          <CardTitle className="text-navy">Homepage Advisor Display</CardTitle>
        </div>
        <CardDescription>
          Select which advisors appear on the homepage and how many to display
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

        {/* Advisor Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Select Featured Advisors</Label>
          <p className="text-xs text-muted-foreground mb-3">
            If none selected, the first {homepageAdvisorCount} advisors will be shown by default
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
            {staticAdvisors.map((advisor) => (
              <div
                key={advisor.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  homepageAdvisorIds.includes(advisor.id)
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50 hover:bg-secondary/50"
                }`}
                onClick={() => toggleHomepageAdvisor(advisor.id)}
              >
                <Checkbox
                  checked={homepageAdvisorIds.includes(advisor.id)}
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

        {homepageAdvisorIds.length > 0 && (
          <p className="text-sm text-accent font-medium">
            {homepageAdvisorIds.length} advisor{homepageAdvisorIds.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default HomepageAdvisorSettings;