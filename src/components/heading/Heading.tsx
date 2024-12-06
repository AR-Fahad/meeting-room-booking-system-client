import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return (
    // <h3 className="font-bold text-xl md:text-3xl text-priColor mb-3 text-center">
    //   {children}
    // </h3>
    <h3 className="text-2xl md:text-3xl text-priColor bg-gradient-to-r from-[#f3e9ffe0] to-white py-1 px-2 font-bold rounded-sm w-fit mx-auto">
      {children}
    </h3>
  );
};

export default Heading;
