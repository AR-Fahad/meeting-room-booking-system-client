import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import "../../styles/navbar/nav.css";
import logo from "../../assets/images/MBooking.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import profile from "../../assets/images/profile.png";
import { logout } from "@/redux/features/auth/authSlice";
import SecButton from "../buttons/SecButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token);
    if (!user) {
      dispatch(logout());
    }
  }

  console.log(user);

  const navLinks = (
    <>
      <NavLink className="hover:text-[#5059d6]" to="/">
        Home
      </NavLink>
      <NavLink className="hover:text-[#5059d6]" to="/meeting-rooms">
        Meeting Rooms
      </NavLink>
      <NavLink className="hover:text-[#5059d6]" to="/about-us">
        About Us
      </NavLink>
      <NavLink className="hover:text-[#5059d6]" to="/contact-us">
        Contact Us
      </NavLink>
      {!user && (
        <NavLink className="hover:text-[#5059d6]" to="/login">
          Login
        </NavLink>
      )}
    </>
  );

  const userMenu = (
    <>
      {user && (
        <>
          <DropdownMenuItem
            onClick={() => navigate("/dashboard/profile")}
            className="menu"
          >
            Profile
          </DropdownMenuItem>
          {user?.role === "admin" ? (
            <DropdownMenuItem
              onClick={() => navigate("/dashboard")}
              className="menu"
            >
              Dashboard
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => navigate("/dashboard/my-bookings")}
              className="menu"
            >
              My Bookings
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="mt-5">
            <SecButton w onClick={() => dispatch(logout())}>
              Logout
            </SecButton>
          </DropdownMenuItem>
        </>
      )}
    </>
  );

  const menuItems = (
    <>
      <DropdownMenuItem
        className={`menu ${location.pathname === "/" ? "marked" : ""}`}
        onClick={() => navigate("/")}
      >
        Home
      </DropdownMenuItem>

      <DropdownMenuItem
        className={`menu ${
          location.pathname === "/meeting-rooms" ? "marked" : ""
        }`}
        onClick={() => navigate("/meeting-rooms")}
      >
        Meeting rooms
      </DropdownMenuItem>
      <DropdownMenuItem
        className={`menu ${location.pathname === "/about-us" ? "marked" : ""}`}
        onClick={() => navigate("/about-us")}
      >
        About Us
      </DropdownMenuItem>
      <DropdownMenuItem
        className={`menu ${
          location.pathname === "/contact-us" ? "marked" : ""
        }`}
        onClick={() => navigate("/contact-us")}
      >
        Contact Us
      </DropdownMenuItem>
      {!user && (
        <DropdownMenuItem
          className={`menu ${location.pathname === "/login" ? "marked" : ""}`}
          onClick={() => navigate("/login")}
        >
          Login
        </DropdownMenuItem>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-sm py-2 px-5 flex items-center justify-between">
      <div>
        <NavLink to="/">
          <img className="w-20 h-10 md:w-32 md:h-16" src={logo} alt="" />
        </NavLink>
      </div>
      <div className="flex items-center gap-1 lg:gap-5">
        <div className="hidden lg:flex gap-8 items-center font-medium">
          {navLinks}
        </div>
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <FiMenu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 md:w-56 bg-slate-50 p-5 shadow-sm border my-3 md:my-6 mx-1">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>{menuItems}</DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {user && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <img className="w-8 h-8 md:w-9 md:h-9" src={profile} alt="" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 md:w-56 bg-slate-50 p-4 shadow-sm border my-3 md:my-6 mx-1">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>{userMenu}</DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
