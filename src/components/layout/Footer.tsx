import { Link } from "react-router-dom";
import logo from "../../assets/images/MBooking.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-8 pb-4">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between ">
          <div className="w-full md:w-1/4 mb-3 lg:mb-0 lg:pl-3 text-center md:flex items-center">
            <h2 className="font-bold text-center md:text-left w-fit mx-auto md:mx-0  p-4">
              <img className="w-32 h-16" src={logo} alt="" />
            </h2>
          </div>
          <div className="w-1/3 md:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold mb-2 text-priColor">
              Company
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/meeting-rooms" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/3 md:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold text-priColor mb-2">LEGAL</h2>
            <ul className="space-y-2">
              <li>
                <p className="hover:underline cursor-pointer">Terms of use</p>
              </li>
              <li>
                <p className="hover:underline cursor-pointer">Privacy policy</p>
              </li>
              <li>
                <p className="hover:underline cursor-pointer">Cookie policy</p>
              </li>
            </ul>
          </div>

          <div className="w-1/3 md:w-1/4">
            <h2 className="text-lg font-semibold mb-2 text-priColor">
              Follow Us
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  className="hover:underline"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <div>
            &copy; Copyright {new Date().getFullYear()} - All right reserved by
            <p className="font-semibold inline-block text-priColor pl-1">
              MBooking
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
