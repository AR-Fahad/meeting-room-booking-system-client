/* eslint-disable react-hooks/exhaustive-deps */
import Heading from "@/components/heading/Heading";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import p1 from "@/assets/images/p (1).jpg";
import p2 from "@/assets/images/p (2).jpg";
import p3 from "@/assets/images/p (3).jpg";
import p4 from "@/assets/images/p (4).jpg";
import p5 from "@/assets/images/p (5).jpg";
import p6 from "@/assets/images/p (6).jpg";
const testimonials = [
  {
    name: "John Doe",
    designation: "Student",
    img: p1,
    testimonialDescription:
      "MBooking has made booking study rooms for group projects effortless. The real-time availability ensures I can find a room without any hassle, making study sessions more productive.",
    keyWord: "Child",
  },
  {
    name: "Jane Doe",
    designation: "Freelancer",
    img: p2,
    testimonialDescription:
      "As a freelancer, MBooking is my go-to for booking client meeting spaces. It saves me time with quick room reservations and instant confirmations, keeping my work organized and stress-free.",
    keyWord: "Gentlewoman",
  },
  {
    name: "Shiyam Sarker",
    designation: "Entrepreneur",
    img: p3,
    testimonialDescription:
      "MBooking has simplified managing team meetings for my startup. The collaborative tools make coordinating with my team easy, ensuring our sessions are productive and well-organized.",
    keyWord: "Gentleman",
  },
  {
    name: "Bob Smith",
    designation: "Creative Professional",
    img: p4,
    testimonialDescription:
      "For brainstorming sessions, MBooking has been a lifesaver. The detailed room info and easy booking process keep my creative projects moving smoothly, making planning a breeze.",
    keyWord: "Child",
  },
  {
    name: "Eva Williams",
    designation: "Remote Worker",
    img: p5,
    testimonialDescription:
      "MBooking’s mobile app has made managing remote work so much easier. I can find and book meeting rooms quickly, whether I'm at home or traveling, ensuring my productivity stays high.",
    keyWord: "Individual",
  },
  {
    name: "Chris Brown",
    designation: "Parent",
    img: p6,
    testimonialDescription:
      "Planning family gatherings and community events is a breeze with MBooking. I can easily find suitable rooms and book them instantly, making coordination smooth and stress-free.",
    keyWord: "Boy",
  },
];

const Reviews = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  // The slider images array
  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? testimonials.length - 2 : currentSlider - 1
    );
  const nextSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === testimonials.length - 2 ? 0 : currentSlider + 1
    );
  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [nextSlider]);

  const isSmallScreen = window.innerWidth <= 768;
  return (
    <div>
      <Heading>Reviews</Heading>
      <div className="mt-4 md:mt-5 lg:mt-0 max-w-full min-w-[350px]  mx-auto h-[400px] flex flex-row items-center overflow-hidden gap-5 lg:gap-10 px-4 md:px-8 lg:px-12">
        <div className="relative overflow-hidden">
          <div className="absolute w-full h-full flex items-center justify-between z-50 md:px-5">
            {/* arrow left */}
            <button
              onClick={prevSlider}
              className="flex justify-center items-center text-priColor hover:bg-black hover:bg-opacity-20 rounded-full w-6 h-6 md:w-8 md:h-8"
            >
              <ArrowBackIosNewIcon />
            </button>
            {/* arrow right */}
            <button
              onClick={nextSlider}
              className="flex justify-center items-center text-priColor hover:bg-black hover:bg-opacity-20 rounded-full w-6 h-6 md:w-8 md:h-8"
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
          {/* slider container */}
          <div
            className="ease-linear duration-300 flex"
            style={{
              transform: `translateX(-${
                currentSlider * (isSmallScreen ? 100 : 50)
              }%)`,
            }}
          >
            {/* sliders */}
            {testimonials.map((each, idx) => (
              <div key={idx} className="min-w-full md:px-4 md:min-w-[50%]">
                <div className="h-full px-3 md:px-5 lg:px-8 py-8 rounded border bg-white shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-slate-800 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p className="leading-relaxed mb-6 text-gray-500">
                    {each?.testimonialDescription}
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      src={each?.img}
                      alt="carousel navigate ui"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">
                        {each.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {each?.designation}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
