import { Card, CardContent } from "@/components/ui/card";

const milestones = [
  {
    year: "2015",
    title: "The Beginning",
    description: "TFA founded with a single office in Phoenix, AZ and a mission to provide comprehensive financial planning to families nationwide.",
  },
  {
    year: "2017",
    title: "Rapid Growth",
    description: "Expanded to 10 locations across the Southwest. Launched educational workshop series attended by over 5,000 families.",
  },
  {
    year: "2019",
    title: "National Presence",
    description: "Reached 20 locations spanning coast to coast. Introduced proprietary financial planning methodology serving 10,000+ client families.",
  },
  {
    year: "2021",
    title: "Industry Recognition",
    description: "Named among fastest-growing financial advisory firms in America. Team surpassed 200 licensed advisors.",
  },
  {
    year: "2023",
    title: "Technology Innovation",
    description: "Launched advanced client portal with real-time portfolio tracking and financial planning tools. Enhanced digital experience while maintaining personal touch.",
  },
  {
    year: "2025",
    title: "Leading the Way",
    description: "29 nationwide locations, 280+ advisors, and thousands of families served. Continuing to set the standard for comprehensive, education-first wealth planning.",
  },
];

const Timeline = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Our Journey
          </h2>
          <p className="text-xl text-muted-foreground">
            A decade of growth, innovation, and unwavering commitment
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-accent/30" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year Badge */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-20 h-20 rounded-full bg-accent text-accent-foreground font-bold text-lg z-10 shadow-lg">
                    {milestone.year}
                  </div>

                  {/* Content Card */}
                  <Card
                    className={`glass border-0 w-full md:w-5/12 hover:shadow-xl transition-all duration-300 ${
                      index % 2 === 0 ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="md:hidden inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground font-bold mb-4">
                        {milestone.year}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-navy mb-3">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
