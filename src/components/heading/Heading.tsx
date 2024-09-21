const Heading = ({ text }: { text: string }) => {
  return (
    <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">{text}</h3>
  );
};

export default Heading;
