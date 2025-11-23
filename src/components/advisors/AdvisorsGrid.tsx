import AdvisorCard from "./AdvisorCard";
import { Advisor } from "@/data/advisors";
import { Users } from "lucide-react";

interface AdvisorsGridProps {
  advisors: Advisor[];
}

const AdvisorsGrid = ({ advisors }: AdvisorsGridProps) => {
  if (advisors.length === 0) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <Users className="h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold text-navy mb-4">
              No Advisors Found
            </h2>
            <p className="text-xl text-muted-foreground max-w-md">
              Try adjusting your filters or search criteria to find the perfect advisor for your needs.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl text-muted-foreground">
              Showing {advisors.length} {advisors.length === 1 ? "advisor" : "advisors"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advisors.map((advisor, index) => (
              <AdvisorCard
                key={advisor.id}
                advisor={advisor}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsGrid;
