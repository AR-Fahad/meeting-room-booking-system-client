import Heading from "@/components/heading/Heading";
import {
  Bell,
  CalendarCheck,
  CalendarPlus,
  Clock,
  Headphones,
  Info,
  Redo,
  Users,
} from "lucide-react";

const services = [
  {
    title: "Easy Room Booking",
    description: "Quick and user-friendly room reservation system.",
    icon: <CalendarPlus className="text-priColor" />,
  },
  {
    title: "Real time Availability",
    description: "View and book rooms with live availability updates.",
    icon: <Clock className=" text-priColor" />,
  },
  {
    title: "Calendar Integration",
    description: "Sync bookings with Calendar, Outlook, and more.",
    icon: <CalendarCheck className=" text-priColor" />,
  },
  {
    title: "Room Capacity Management",
    description: "Book rooms based on the number of attendees.",
    icon: <Users className="text-priColor" />,
  },
  {
    title: "Recurring Bookings",
    description: "Easily schedule regular meetings with recurring options.",
    icon: <Redo className="text-priColor" />,
  },
  {
    title: "Notifications & Reminders",
    description: "Receive booking confirmations and reminders.",
    icon: <Bell className="text-priColor" />,
  },
  {
    title: "Detailed Room Information",
    description: "Access amenities, photos, and room layouts.",
    icon: <Info className="text-priColor" />,
  },
  {
    title: "Customer Support 24/7",
    description: "Round-the-clock assistance for all your booking needs.",
    icon: <Headphones className="text-priColor" />,
  },
];

const OurServices = () => {
  return (
    <div>
      <Heading>Our Services</Heading>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 p-2 md:gap-5 md:p-5">
        {services?.map((service, index) => (
          <div
            key={index}
            className="px-2 py-5
           md:p-5 text-center bg-white shadow-sm rounded-sm text-black text-opacity-70 space-y-1 border-[2px] border-gray-100"
          >
            <h3 className="w-fit mx-auto">{service?.icon}</h3>
            <h3 className="font-semibold text-black text-sm md:text-base">
              {service?.title}
            </h3>
            <p className="text-xs md:text-base">{service?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
