import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  GraduationCap, 
  Crown, 
  Sun, 
  PartyPopper,
  Users,
  Calendar,
  ArrowRight,
  Flame,
  Loader2
} from "lucide-react";
import { useSponsorshipEvents, type SponsorshipEvent } from "@/hooks/useSponsorshipData";
import { format, parseISO, isBefore } from "date-fns";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  GraduationCap,
  Crown,
  Sun,
  PartyPopper,
};

const statusLabels: Record<string, { label: string; className: string }> = {
  'selling-fast': { label: '🔥 Selling Fast', className: 'bg-destructive text-destructive-foreground' },
  'few-spots': { label: '⚡ Few Spots Left', className: 'bg-amber-500 text-white' },
  'available': { label: '✅ Available', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
  'sold-out': { label: 'Sold Out', className: 'bg-muted text-muted-foreground' },
  'past': { label: 'Past Event', className: 'bg-muted text-muted-foreground' },
};

interface EventsShowcaseProps {
  onSelectEvent: (eventId: string) => void;
}

export const EventsShowcase = ({ onSelectEvent }: EventsShowcaseProps) => {
  const { data: events = [], isLoading } = useSponsorshipEvents();

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Calendar className="w-4 h-4 mr-2" />
            {events.length} Annual Events
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Stage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each event offers unique exposure to our growing community of agents and clients.
            <span className="block mt-2 text-destructive font-medium">Don't let your competitors get there first.</span>
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...events].sort((a, b) => {
              const today = new Date();
              const aPast = a.event_date ? isBefore(parseISO(a.event_date), today) : false;
              const bPast = b.event_date ? isBefore(parseISO(b.event_date), today) : false;
              if (aPast !== bPast) return aPast ? 1 : -1;
              return 0;
            }).map((event) => {
              const IconComp = iconMap[event.icon] || Rocket;
              const today = new Date();
              const isPast = event.event_date && isBefore(parseISO(event.event_date), today);
              const effectiveStatus = isPast ? 'past' : event.status;
              const statusInfo = statusLabels[effectiveStatus] || statusLabels['available'];
              const isDisabled = effectiveStatus === 'sold-out' || effectiveStatus === 'past';
              return (
                <div 
                  key={event.id}
                  className={`group relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isDisabled 
                      ? 'opacity-60 border-border' 
                      : 'border-primary/30 hover:border-primary hover:shadow-xl shadow-md'
                  }`}
                >
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${statusInfo.className}`}>
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="h-32 relative overflow-hidden" style={{ background: event.gradient }}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComp className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{event.name}</h3>
                        <p className="text-white/80 text-sm">
                          {event.event_date 
                            ? format(parseISO(event.event_date), 'MMMM d, yyyy')
                            : event.timing}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="flex items-center gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-1 text-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{event.attendees} attendees</span>
                      </div>
                      {effectiveStatus === 'selling-fast' && (
                        <div className="flex items-center gap-1 text-destructive">
                          <Flame className="w-4 h-4" />
                          <span>High demand</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={() => onSelectEvent(event.slug)}
                      className="w-full"
                      variant={isDisabled ? 'outline' : (effectiveStatus === 'selling-fast' || effectiveStatus === 'few-spots') ? 'destructive' : 'default'}
                      disabled={isDisabled}
                    >
                      {effectiveStatus === 'past' ? 'Past Event' : effectiveStatus === 'sold-out' ? 'Sold Out' : 'Sponsor This Event'}
                      {!isDisabled && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 md:p-8 border border-primary/20 text-center">
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
              💰 Multi-Event Discount
            </Badge>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Sponsor 3+ Events and Save 15%
            </h3>
            <p className="text-muted-foreground">
              Maximize your visibility with year-round exposure to the TFA community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
