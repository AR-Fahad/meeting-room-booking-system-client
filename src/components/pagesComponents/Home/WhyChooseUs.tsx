import Heading from "@/components/heading/Heading";
import why1 from "@/assets/images/why1.png";
import why2 from "@/assets/images/why2.png";
import why3 from "@/assets/images/why3.png";

const WhyChooseUs = () => {
  return (
    <div>
      <Heading>Why Choose Us?</Heading>
      <div className="mt-10 flex flex-col lg:flex-row gap-5 items-center">
        <div className="flex-1">
          <div
            style={{
              backgroundImage: `url(${why1})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="relative h-[250px] md:h-[400px] w-11/12 mx-auto"
          >
            <img src={why1} alt="" className="h-full w-full opacity-0" />
            <img
              src={why2}
              alt=""
              className="h-1/2 w-1/2  shadow-sm border-[2px] border-white absolute z-10 top-0 left-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <img
              src={why3}
              alt=""
              className="h-1/2 w-1/2  shadow-sm border-white border-[2px] absolute z-10 bottom-0 right-0"
            />
          </div>
        </div>
        <div className="flex-1 p-2">
          <p className="text-base  md:text-lg text-black text-opacity-70 font-medium">
            MBooking is the ultimate solution for seamless and efficient meeting
            room management, designed to streamline the booking process and
            enhance workplace productivity. With real-time availability,
            calendar integration, and customizable room settings, MBooking
            ensures that scheduling meetings is quick and hassle-free. Our
            platform offers robust security features, protecting your data and
            providing access control to keep confidential meetings private.
            Plus, with 24/7 customer support, you can rely on us whenever you
            need assistance. MBooking’s detailed analytics provide insights into
            room usage, helping you optimize space and reduce costs, making it
            the ideal choice for organizations of any size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
