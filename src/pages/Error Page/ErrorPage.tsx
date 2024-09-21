import { Link } from "react-router-dom";
import err from "../../assets/images/404.gif";

const ErrorPage = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div>
        <img className="w-[90%] lg:w-[50%] md:[60%] mx-auto" src={err} alt="" />
        <div className="flex justify-center gap-5 items-center mt-2">
          <Link
            className="hover:underline font-medium hover:text-[#5059d6]"
            to="/"
          >
            Go To Home
          </Link>
          <Link
            className="hover:underline font-medium hover:text-[#5059d6]"
            to="/login"
          >
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
