import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const upcomingEvents = [
  {
    id: 1,
    title: "Retirement Planning 101",
    description: "Learn the fundamentals of retirement planning, including 401(k) strategies, Social Security optimization, and income planning for your golden years.",
    date: "April 15, 2025",
    time: "6:00 PM - 7:30 PM EST",
    location: "Virtual Webinar",
    type: "Webinar",
    category: "Retirement",
    seats: "50 spots available"
  },
  {
    id: 2,
    title: "Estate Planning Essentials",
    description: "Discover how to protect your legacy and ensure your wishes are honored. Topics include wills, trusts, power of attorney, and beneficiary planning.",
    date: "April 22, 2025",
    time: "2:00 PM - 4:00 PM EST",
    location: "Chicago Office - 123 Main St",
    type: "Workshop",
    category: "Estate Planning",
    seats: "20 spots available"
  },
  {
    id: 3,
    title: "Tax-Smart Investing Strategies",
    description: "Maximize your returns by minimizing your tax burden. Learn about tax-efficient investment vehicles, harvesting strategies, and year-end planning.",
    date: "April 29, 2025",
    time: "12:00 PM - 1:00 PM EST",
    location: "Virtual Webinar",
    type: "Webinar",
    category: "Tax Planning",
    seats: "Unlimited"
  },
  {
    id: 4,
    title: "Women & Wealth Workshop",
    description: "A specialized session addressing unique financial challenges and opportunities for women, including career breaks, longevity planning, and confidence building.",
    date: "May 6, 2025",
    time: "6:30 PM - 8:00 PM EST",
    location: "Dallas Office - 456 Oak Ave",
    type: "Workshop",
    category: "Financial Literacy",
    seats: "15 spots available"
  },
  {
    id: 5,
    title: "Medicare & Healthcare Planning",
    description: "Navigate the complexities of Medicare enrollment, supplemental insurance, and long-term care planning with expert guidance.",
    date: "May 13, 2025",
    time: "10:00 AM - 11:30 AM EST",
    location: "Virtual Webinar",
    type: "Webinar",
    category: "Healthcare",
    seats: "100 spots available"
  },
  {
    id: 6,
    title: "Social Security Claiming Strategies",
    description: "Make informed decisions about when and how to claim Social Security benefits. Learn strategies to maximize your lifetime benefits.",
    date: "May 20, 2025",
    time: "3:00 PM - 4:30 PM EST",
    location: "Phoenix Office - 789 Desert Rd",
    type: "Workshop",
    category: "Retirement",
    seats: "25 spots available"
  }
];

const pastEvents = [
  {
    title: "Market Outlook 2025",
    date: "March 18, 2025",
    attendees: 150
  },
  {
    title: "Investment Basics Bootcamp",
    date: "March 10, 2025",
    attendees: 45
  },
  {
    title: "Year-End Tax Planning",
    date: "December 15, 2024",
    attendees: 200
  }
];

const EventsList = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upcoming Events */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Join us for free educational workshops and webinars designed to help you make informed financial decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="glass hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      {event.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {event.type === "Webinar" ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                      <span className="text-xs">{event.type}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-navy">{event.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{event.date}</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{event.location}</span>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground italic">{event.seats}</p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events Archive */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-navy mb-8 text-center">
            Past Events
          </h3>
          
          <div className="glass rounded-2xl p-8">
            <div className="space-y-4">
              {pastEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-border/50 last:border-0"
                >
                  <div>
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {event.attendees} attendees
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Missed an event? Recordings and materials may be available.
              </p>
              <Button variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-primary-foreground">
                View Archive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsList;
