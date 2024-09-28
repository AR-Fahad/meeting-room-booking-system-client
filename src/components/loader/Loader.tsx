import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div>
        <HashLoader color="#5059d6" />
      </div>
    </div>
  );
};

export default Loader;
