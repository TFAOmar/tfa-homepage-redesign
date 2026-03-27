import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useAllSponsorshipEvents,
  useAllSponsorshipTiers,
  useUpsertEvent,
  useDeleteEvent,
  useUpsertTier,
  type SponsorshipEvent,
  type SponsorshipTier,
} from "@/hooks/useSponsorshipData";

const statusOptions = ['available', 'selling-fast', 'few-spots', 'sold-out', 'past'];
const iconOptions = ['Rocket', 'GraduationCap', 'Crown', 'Sun', 'PartyPopper'];

const emptyEvent: Partial<SponsorshipEvent> = {
  name: '',
  slug: '',
  description: '',
  timing: '',
  attendees: '100+',
  status: 'available',
  icon: 'Rocket',
  gradient: 'from-blue-500 to-cyan-500',
  display_order: 0,
  is_active: true,
};

const AdminSponsorshipEvents = () => {
  const { data: events = [], isLoading: eventsLoading } = useAllSponsorshipEvents();
  const { data: tiers = [], isLoading: tiersLoading } = useAllSponsorshipTiers();
  const upsertEvent = useUpsertEvent();
  const deleteEvent = useDeleteEvent();
  const upsertTier = useUpsertTier();

  const [editingEvent, setEditingEvent] = useState<Partial<SponsorshipEvent> | null>(null);
  const [isNewEvent, setIsNewEvent] = useState(false);

  const handleSaveEvent = async () => {
    if (!editingEvent?.name || !editingEvent?.slug) {
      toast.error("Name and slug are required");
      return;
    }
    try {
      await upsertEvent.mutateAsync(editingEvent);
      toast.success(isNewEvent ? "Event created" : "Event updated");
      setEditingEvent(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to save event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted");
    } catch (e: any) {
      toast.error(e.message || "Failed to delete event");
    }
  };

  const handleTierFieldUpdate = async (tier: SponsorshipTier, field: string, value: any) => {
    try {
      await upsertTier.mutateAsync({ id: tier.id, [field]: value });
      toast.success("Tier updated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update tier");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container px-4 py-4 flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin</Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Sponsorship Events & Tiers</h1>
        </div>
      </div>

      <div className="container px-4 py-8 space-y-12">
        {/* Events Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Events</h2>
              <Badge variant="outline">{events.length} total</Badge>
            </div>
            <Button onClick={() => { setEditingEvent({ ...emptyEvent }); setIsNewEvent(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : (
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-sm">{event.display_order}</TableCell>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.timing}</TableCell>
                      <TableCell>
                        <Badge variant={event.status === 'selling-fast' ? 'destructive' : 'outline'} className="text-xs">
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.attendees}</TableCell>
                      <TableCell>
                        <Switch
                          checked={event.is_active}
                          onCheckedChange={(checked) => upsertEvent.mutate({ id: event.id, is_active: checked })}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setEditingEvent({ ...event }); setIsNewEvent(false); }}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* Tiers Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Pricing Tiers</h2>
          </div>

          {tiersLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : (
            <div className="grid gap-6">
              {tiers.map((tier) => (
                <div key={tier.id} className="border border-border rounded-xl p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                    <Badge variant="outline">{tier.tier_id}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        defaultValue={tier.price}
                        onBlur={(e) => handleTierFieldUpdate(tier, 'price', parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Stripe Price ID</Label>
                      <Input
                        defaultValue={tier.stripe_price_id || ''}
                        onBlur={(e) => handleTierFieldUpdate(tier, 'stripe_price_id', e.target.value)}
                        className="mt-1 font-mono text-sm"
                        placeholder="price_xxx"
                      />
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex items-center gap-2">
                        <Label>Popular</Label>
                        <Switch
                          checked={tier.is_popular}
                          onCheckedChange={(checked) => handleTierFieldUpdate(tier, 'is_popular', checked)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label>Active</Label>
                        <Switch
                          checked={tier.is_active}
                          onCheckedChange={(checked) => handleTierFieldUpdate(tier, 'is_active', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Event Edit Dialog */}
      <Dialog open={!!editingEvent} onOpenChange={(open) => !open && setEditingEvent(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isNewEvent ? 'Add Event' : 'Edit Event'}</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input value={editingEvent.name || ''} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label>Slug *</Label>
                  <Input value={editingEvent.slug || ''} onChange={(e) => setEditingEvent({ ...editingEvent, slug: e.target.value })} className="mt-1" placeholder="e.g. kickoff" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={editingEvent.description || ''} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} className="mt-1" rows={3} />
              </div>
              <div>
                <Label>Atmosphere</Label>
                <Input value={editingEvent.atmosphere || ''} onChange={(e) => setEditingEvent({ ...editingEvent, atmosphere: e.target.value })} className="mt-1" placeholder="e.g. High-energy networking" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Timing</Label>
                  <Input value={editingEvent.timing || ''} onChange={(e) => setEditingEvent({ ...editingEvent, timing: e.target.value })} className="mt-1" placeholder="e.g. January 2027" />
                </div>
                <div>
                  <Label>Event Date</Label>
                  <Input type="date" value={editingEvent.event_date || ''} onChange={(e) => setEditingEvent({ ...editingEvent, event_date: e.target.value || null })} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Attendees</Label>
                  <Input value={editingEvent.attendees || ''} onChange={(e) => setEditingEvent({ ...editingEvent, attendees: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={editingEvent.status || 'available'} onValueChange={(v) => setEditingEvent({ ...editingEvent, status: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Icon</Label>
                  <Select value={editingEvent.icon || 'Rocket'} onValueChange={(v) => setEditingEvent({ ...editingEvent, icon: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={editingEvent.display_order ?? 0} onChange={(e) => setEditingEvent({ ...editingEvent, display_order: parseInt(e.target.value) })} className="mt-1" />
                </div>
                <div>
                  <Label>Gradient</Label>
                  <Input value={editingEvent.gradient || ''} onChange={(e) => setEditingEvent({ ...editingEvent, gradient: e.target.value })} className="mt-1" placeholder="from-blue-500 to-cyan-500" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editingEvent.is_active ?? true} onCheckedChange={(c) => setEditingEvent({ ...editingEvent, is_active: c })} />
                <Label>Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEvent(null)}>Cancel</Button>
            <Button onClick={handleSaveEvent} disabled={upsertEvent.isPending}>
              {upsertEvent.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSponsorshipEvents;
