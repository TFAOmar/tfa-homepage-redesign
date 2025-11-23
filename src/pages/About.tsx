import AboutHero from "@/components/about/AboutHero";
import FoundingStory from "@/components/about/FoundingStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import Timeline from "@/components/about/Timeline";
import NationalImpact from "@/components/about/NationalImpact";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <FoundingStory />
      <MissionVision />
      <CoreValues />
      <Leadership />
      <Timeline />
      <NationalImpact />
      <AboutCTA />
    </div>
  );
};

export default About;
