/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/heading/Heading";
import { useState } from "react";

const faqs = [
  {
    question: "How do I book a meeting room?",
    answer:
      "To book a meeting room, simply log in to your MBooking account, browse available rooms, select your preferred time slot, and confirm your booking. You will receive a confirmation email with all the details.",
  },
  {
    question: "Can I modify or cancel a booking?",
    answer:
      "Yes, you can modify or cancel your booking from your account dashboard. Just navigate to the 'My Bookings' section, select the booking you want to change, and choose 'Edit' or 'Cancel'.",
  },
  {
    question: "How does MBooking handle room availability?",
    answer:
      "MBooking uses real-time updates to display available rooms. This means you can always see which rooms are free, booked, or soon to be available, ensuring no double bookings or scheduling conflicts.",
  },
  {
    question: "Can I integrate MBooking with my calendar?",
    answer:
      "Yes, MBooking integrates seamlessly with popular calendar platforms like Google Calendar and Outlook, making it easy to sync your bookings and keep track of your meetings.",
  },
  {
    question: "Is my data secure with MBooking?",
    answer:
      "Absolutely. MBooking prioritizes the security and privacy of your data with advanced encryption and access controls, ensuring that only authorized users can access your booking details.",
  },
  {
    question: "Can I set up recurring bookings?",
    answer:
      "Yes, you can easily set up recurring bookings for weekly, bi-weekly, or monthly meetings. Just select the 'Recurring' option while booking, and MBooking will automatically schedule your meetings.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team 24/7 through the chat feature on our website or by emailing support@mbooking.com. We are always here to assist you with any issues or inquiries.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "MBooking accepts major credit cards, debit cards, and PayPal for any paid features or premium services. All transactions are processed securely through our payment gateway.",
  },
  {
    question: "Can I view reports on room usage?",
    answer:
      "Yes, MBooking provides detailed reports on room usage, booking trends, and occupancy rates. You can access these analytics from your dashboard to help you optimize meeting room utilization.",
  },
];

const Faqs = () => {
  const [isOpen, setIsOpen] = useState(null);
  const toggle = (idx: any) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };
  return (
    <div>
      <Heading>FAQ's</Heading>
      <div className="w-full mt-5 mx-auto lg:w-[75%] rounded-lg bg-white p-3 *:mix-blend-difference dark:bg-zinc-800">
        {faqs.map((PerAccordion, idx) => (
          <div
            key={idx}
            className="border-b border-gray-500/50 py-3 last-of-type:border-b-0"
          >
            <button
              onClick={() => toggle(idx)}
              className="flex h-full w-full items-center justify-between font-medium text-white outline-none"
            >
              <span>{PerAccordion.question}</span>
              <span className="rounded-full p-2">
                <svg
                  className="ml-8 size-3 shrink-0 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="5"
                    width="12"
                    height="2"
                    rx="1"
                    className={`origin-center transform transition duration-200 ease-out ${
                      isOpen === idx && "!rotate-180"
                    }`}
                  />
                  <rect
                    y="5"
                    width="12"
                    height="2"
                    rx="1"
                    className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                      isOpen === idx && "!rotate-180"
                    }`}
                  />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden text-zinc-400 transition-all duration-300 ease-in-out ${
                isOpen === idx
                  ? "grid-rows-[1fr] pb-1 pt-3 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden pr-4 text-sm">
                {PerAccordion.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
