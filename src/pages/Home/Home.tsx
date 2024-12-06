import Faqs from "@/components/pagesComponents/Home/Faqs";
import FeaturedRooms from "@/components/pagesComponents/Home/FeaturedRooms";
import HomeBanner from "@/components/pagesComponents/Home/HomeBanner";
import HowToBook from "@/components/pagesComponents/Home/HowToBook";
import OurServices from "@/components/pagesComponents/Home/OurServices";
import Reviews from "@/components/pagesComponents/Home/Reviews";
import WhyChooseUs from "@/components/pagesComponents/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <div className="my-20">
        <OurServices />
      </div>
      <div className="mb-20">
        <FeaturedRooms />
      </div>
      <div className="mb-20">
        <WhyChooseUs />
      </div>
      <div className="mb-20">
        <Faqs />
      </div>
      <div className="mb-20">
        <HowToBook />
      </div>
      <div className="mb-20">
        <Reviews />
      </div>
    </div>
  );
};

export default Home;
