import AdvisorsHero from "@/components/advisors/AdvisorsHero";
import AdvisorsFilters from "@/components/advisors/AdvisorsFilters";
import AdvisorsGrid from "@/components/advisors/AdvisorsGrid";
import AdvisorsCTA from "@/components/advisors/AdvisorsCTA";
import { useState, useEffect, useMemo } from "react";
import { advisors, Advisor } from "@/data/advisors";
import { usePublishedAdvisors } from "@/hooks/useDynamicAdvisors";
import { useAdminSettings } from "@/hooks/useAdminSettings";

const Advisors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  
  const { data: dynamicAdvisors = [] } = usePublishedAdvisors();
  const { data: settings } = useAdminSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Combine static and dynamic advisors, then apply visibility and ordering
  const allAdvisors = useMemo(() => {
    // Map dynamic advisors to match static advisor interface
    const mappedDynamic = dynamicAdvisors.map((da) => ({
      id: da.id,
      name: da.name,
      title: da.title,
      type: da.type,
      state: da.state,
      city: da.city,
      region: da.region,
      bio: da.bio,
      specialties: da.specialties,
      licenses: da.licenses,
      yearsOfExperience: da.years_of_experience,
      image: da.image_url,
      schedulingLink: da.scheduling_link,
    }));
    
    const combined = [...advisors, ...mappedDynamic];
    
    // Filter out hidden advisors
    const hiddenIds = settings?.directory_hidden_ids ?? [];
    const visible = combined.filter((a) => !hiddenIds.includes(a.id));
    
    // Apply custom ordering if set, otherwise alphabetical
    const orderIds = settings?.directory_advisor_order ?? [];
    if (orderIds.length > 0) {
      const orderMap = new Map(orderIds.map((id, idx) => [String(id), idx]));
      return visible.sort((a, b) => {
        const aIdx = orderMap.get(String(a.id));
        const bIdx = orderMap.get(String(b.id));
        if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
        if (aIdx !== undefined) return -1;
        if (bIdx !== undefined) return 1;
        return a.name.localeCompare(b.name);
      });
    }
    
    // Default alphabetical sort
    return visible.sort((a, b) => a.name.localeCompare(b.name));
  }, [dynamicAdvisors, settings?.directory_hidden_ids, settings?.directory_advisor_order]);

  const filteredAdvisors = useMemo(() => {
    let filtered = allAdvisors;

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

    return filtered;
  }, [allAdvisors, searchQuery, selectedType, selectedState, selectedSpecialty]);

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
