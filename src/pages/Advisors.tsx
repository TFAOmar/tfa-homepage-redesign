import AdvisorsHero from "@/components/advisors/AdvisorsHero";
import AdvisorsFilters from "@/components/advisors/AdvisorsFilters";
import AdvisorsGrid from "@/components/advisors/AdvisorsGrid";
import AdvisorsCTA from "@/components/advisors/AdvisorsCTA";
import { useState, useEffect } from "react";
import { advisors, Advisor } from "@/data/advisors";

const Advisors = () => {
  const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>(advisors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = advisors;

    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter(advisor => advisor.type === selectedType);
    }

    // Filter by state
    if (selectedState !== "All States") {
      filtered = filtered.filter(advisor => advisor.state === selectedState);
    }

    // Filter by specialty
    if (selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter(advisor => 
        advisor.specialties.includes(selectedSpecialty)
      );
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(advisor => 
        advisor.name.toLowerCase().includes(query) ||
        advisor.city.toLowerCase().includes(query) ||
        advisor.state.toLowerCase().includes(query)
      );
    }

    setFilteredAdvisors(filtered);
  }, [searchQuery, selectedType, selectedState, selectedSpecialty]);

  return (
    <div className="min-h-screen">
      <AdvisorsHero />
      <AdvisorsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
      />
      <AdvisorsGrid advisors={filteredAdvisors} />
      <AdvisorsCTA />
    </div>
  );
};

export default Advisors;
