import Slider from "react-slick";
import banner1 from "@/assets/images/ban-1.jpg";
import banner2 from "@/assets/images/ban-2.jpg";
import banner3 from "@/assets/images/ban-3.jpg";
import banner4 from "@/assets/images/ban-4.jpg";
import banner5 from "@/assets/images/ban-5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PriButton from "@/components/buttons/PriButton";

const bannerImages = [banner1, banner2, banner3, banner4, banner5];

const HomeBanner = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        {bannerImages.map((bannerImg, idx) => (
          <div className="relative" key={idx}>
            <img
              src={bannerImg}
              className="h-[25rem] md:h-[30rem] lg:h-[40rem] w-full"
              alt="Home Banner 1"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ))}
      </Slider>

      <div className="absolute top-1/2 transform left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black py-6 px-8 rounded-lg bg-opacity-40 max-w-[20rem] sm:max-w-[30rem]  md:max-w-[40rem] lg:max-w-[50rem] w-full">
        <h1 className=" text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold mb-2 sm:mb-4">
          Revolutionize Your Meetings with
          <span className="ml-2">MBooking</span>
        </h1>
        <p className="max-w-[40rem] text-xs sm:text-base md:text-xl mb-2 sm:mb-4 md:mb-6">
          Find the perfect space for any meeting.
          <span className="">
            {" "}
            From conferences to private discussions, MBooking offers premium
            rooms with seamless booking.
          </span>
        </p>
        <Link to={"/meeting-rooms"}>
          <PriButton>Book Now</PriButton>
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
