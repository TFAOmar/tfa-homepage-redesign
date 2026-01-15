import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Pencil, Check, Calendar } from "lucide-react";
import { format } from "date-fns";

export interface AgentProfile {
  name: string;
  phone: string;
  email: string;
}

interface AgentProfileCardProps {
  profile: AgentProfile | null;
  startedAt: string | null;
  onSave: (profile: AgentProfile) => void;
}

export const AgentProfileCard = ({ profile, startedAt, onSave }: AgentProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(!profile);
  const [formData, setFormData] = useState<AgentProfile>(
    profile || { name: "", phone: "", email: "" }
  );

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <Card className="glass border border-accent/30 hover:border-accent/50 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 text-accent">
              <User className="h-6 w-6" />
            </div>
            <span className="text-navy">New Agent Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="agent-name" className="text-sm font-medium text-foreground">
                Agent Name *
              </Label>
              <Input
                id="agent-name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onKeyDown={handleKeyDown}
                aria-required="true"
                className="h-11 border-border/50 focus:border-accent bg-card/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-phone" className="text-sm font-medium text-foreground">
                Phone
              </Label>
              <Input
                id="agent-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onKeyDown={handleKeyDown}
                className="h-11 border-border/50 focus:border-accent bg-card/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="agent-email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={handleKeyDown}
                className="h-11 border-border/50 focus:border-accent bg-card/50"
              />
            </div>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={!formData.name.trim()}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Check className="h-4 w-4 mr-2" />
            Save Agent Info
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border border-accent/20 hover:border-accent/40 transition-all duration-300 print:border-foreground/20">
      <CardContent className="py-5 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/20 text-accent">
                <User className="h-5 w-5" />
              </div>
              <span className="font-bold text-navy text-lg">{profile?.name}</span>
            </div>
            {profile?.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-accent/70" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile?.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-accent/70" />
                <span>{profile.email}</span>
              </div>
            )}
            {startedAt && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 text-accent/70" />
                <span>Started {format(new Date(startedAt), "MMM d, yyyy")}</span>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="no-print border-accent/30 hover:border-accent hover:bg-accent/10"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};