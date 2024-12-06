import { InboxIcon, MapPinIcon, PhoneIcon } from "lucide-react";

const contactUsArray = [
  {
    id: 1,
    icon: () => <PhoneIcon className="size-6" />,
    title: "Phone",
    value: "(901) 324-3127",
  },
  {
    id: 2,
    icon: () => <InboxIcon className="size-6" />,
    title: "Email",
    value: "mbooking@official.com",
  },
  {
    id: 3,
    icon: () => <MapPinIcon className="size-6" />,
    title: "Address",
    value: "Banani, Dhaka",
  },
];

const ContactUs = () => {
  return (
    <div className="py-10 space-y-5">
      <div>
        <h2 className="text-priColor text-center text-3xl font-semibold tracking-tight">
          Contact Us
        </h2>
      </div>
      <div className="px-10 lg:space-x-2 grid gap-3 sm:grid-cols-2 md:grid-cols-3  font-semibold">
        {contactUsArray &&
          contactUsArray?.map((item) => (
            <div
              key={item.id}
              className="space-y-2 hover:scale-105 duration-150 border-[0.1px] border-b-2 border-r-2  p-5 rounded-lg border-gray-200 shadow "
            >
              <div className="flex items-center space-x-3 justify-center">
                <item.icon />
                <h2>{item.title}</h2>
              </div>
              <p className="text-sm text-center">{item.value}</p>
            </div>
          ))}
      </div>
      <div className="px-5 flex flex-col md:flex-row-reverse gap-5 items-center">
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.680856404235!2d90.39540583849437!3d23.794755208238357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0x97856381e88fb311!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1733490135558!5m2!1sen!2sbd"
            width="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[200px] md:h-[400px] "
          ></iframe>
        </div>
        <div className="w-full rounded-lg bg-white px-6 md:px-10 pb-10 pt-8 shadow-sm my-10">
          <div>
            <h2 className="text-priColor text-center text-xl font-semibold tracking-tight">
              Facing any issue?
            </h2>
            <p className="text-center text-sm text-zinc-500 ">
              We&apos;d love to hear from you!
            </p>
          </div>

          <form className="w-full space-y-6">
            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
              <label className="block font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                id="name"
                placeholder="Your Name"
                name="name"
                type="text"
              />
            </div>
            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
              <label className="block font-medium" htmlFor="_email">
                Email
              </label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                id="_email"
                placeholder="Your Email"
                name="email"
                type="email"
              />
            </div>
            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
              <label className="block font-medium" htmlFor="_message">
                Message
              </label>
              <textarea
                className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                id="_message"
                placeholder="what's in your mind"
                name="message"
              />
            </div>
            <button className="rounded-md bg-priColor px-4 py-2 text-white transition-colors hover:bg-priColor">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
