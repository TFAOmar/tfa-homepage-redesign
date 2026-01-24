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
  Flame
} from "lucide-react";

interface Event {
  id: string;
  name: string;
  timing: string;
  description: string;
  attendees: string;
  atmosphere: string;
  status: 'selling-fast' | 'few-spots' | 'available';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const events: Event[] = [
  {
    id: 'kickoff',
    name: 'Kick Off',
    timing: 'January',
    description: 'Start the year with strategy, skills, and bold goals',
    attendees: '200+',
    atmosphere: 'High-energy goal-setting',
    status: 'selling-fast',
    icon: Rocket,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'crash-courses',
    name: 'Crash Courses',
    timing: 'Spring',
    description: 'Deep-dive training and professional development',
    attendees: '150+',
    atmosphere: 'Intensive learning',
    status: 'available',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'leadership-summit',
    name: 'Leadership Summit',
    timing: 'Summer',
    description: 'Elevate your leadership and expand your network',
    attendees: '100+',
    atmosphere: 'Leadership development',
    status: 'few-spots',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'summer-sizzler',
    name: 'Summer Sizzler',
    timing: 'Mid-Year',
    description: 'Celebrate wins and build unstoppable momentum',
    attendees: '200+',
    atmosphere: 'Team celebration',
    status: 'available',
    icon: Sun,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'christmas-party',
    name: 'Christmas Party',
    timing: 'December',
    description: 'Year-end celebration and recognition of top performers',
    attendees: '250+',
    atmosphere: 'Festive celebration',
    status: 'available',
    icon: PartyPopper,
    gradient: 'from-green-500 to-emerald-500'
  }
];

const statusLabels: Record<Event['status'], { label: string; className: string }> = {
  'selling-fast': { label: '🔥 Selling Fast', className: 'bg-destructive text-destructive-foreground' },
  'few-spots': { label: '⚡ Few Spots Left', className: 'bg-amber-500 text-white' },
  'available': { label: 'Available', className: 'bg-muted text-muted-foreground' }
};

interface EventsShowcaseProps {
  onSelectEvent: (eventId: string) => void;
}

export const EventsShowcase = ({ onSelectEvent }: EventsShowcaseProps) => {
  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Calendar className="w-4 h-4 mr-2" />
            5 Annual Events
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Stage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each event offers unique exposure to our growing community of agents and clients.
            <span className="block mt-2 text-destructive font-medium">Don't let your competitors get there first.</span>
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event) => (
            <div 
              key={event.id}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Status badge */}
              {event.status !== 'available' && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`${statusLabels[event.status].className} animate-pulse`}>
                    {statusLabels[event.status].label}
                  </Badge>
                </div>
              )}

              {/* Gradient header */}
              <div className={`h-32 bg-gradient-to-r ${event.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <event.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                    <p className="text-white/80 text-sm">{event.timing}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{event.description}</p>
                
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees} attendees</span>
                  </div>
                  {event.status === 'selling-fast' && (
                    <div className="flex items-center gap-1 text-destructive">
                      <Flame className="w-4 h-4" />
                      <span>High demand</span>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => onSelectEvent(event.id)}
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  Sponsor This Event
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-event discount callout */}
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

export { events };
