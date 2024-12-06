import AboutBanner from "@/components/pagesComponents/About/AboutBanner";
import AboutCompany from "@/components/pagesComponents/About/AboutCompany";
import AboutMission from "@/components/pagesComponents/About/AboutMission";
import AboutResult from "@/components/pagesComponents/About/AboutResult";
import AboutTeams from "@/components/pagesComponents/About/AboutTeams";
import AboutTimeline from "@/components/pagesComponents/About/AboutTimeline";

const AboutUs = () => {
  return (
    <div className="p-5 space-y-20 my-5">
      <AboutBanner />
      <AboutCompany />
      <AboutResult />
      <AboutMission />
      <AboutTeams />
      <AboutTimeline />
    </div>
  );
};

export default AboutUs;
