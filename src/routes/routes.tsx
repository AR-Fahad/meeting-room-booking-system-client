import App from "@/App";
import { config } from "@/config/config";
import AboutUs from "@/pages/About Us/AboutUs";
import ContactUs from "@/pages/Contact Us/ContactUs";
import BManagement from "@/pages/Dashboard/Admin/Boooking Management/BManagement";
import AllRooms from "@/pages/Dashboard/Admin/Room Management/All Rooms/AllRooms";
import CreateRoom from "@/pages/Dashboard/Admin/Room Management/Create Room/CreateRoom";
import AllSlots from "@/pages/Dashboard/Admin/Slot Management/All Slots/AllSlots";
import CreateSlot from "@/pages/Dashboard/Admin/Slot Management/Create Slot/CreateSlot";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashHeading from "@/pages/Dashboard/DashHeading";
import Profile from "@/pages/Dashboard/Profile/Profile";
import MyBookings from "@/pages/Dashboard/User/MyBookings";
import ErrorPage from "@/pages/Error Page/ErrorPage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Checkout from "@/pages/Meeting Room Details/Checkout";
import MRoomDetails from "@/pages/Meeting Room Details/MRoomDetails";
import RoomBooking from "@/pages/Meeting Room Details/RoomBooking";
import MeetingRooms from "@/pages/Meeting Rooms/MeetingRooms";
import Register from "@/pages/Register/Register";
import ProtectedRoutes from "@/Protected Routes/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(config.stripeGatewayKey);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "meeting-rooms/:id",
        element: (
          <ProtectedRoutes path="/meeting-rooms" roles={["user"]}>
            <MRoomDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/booking/:name/:id",
        element: (
          <ProtectedRoutes roles={["user"]}>
            <RoomBooking />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes roles={["user"]}>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </ProtectedRoutes>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes roles={["admin", "user"]}>
            <DashHeading />
          </ProtectedRoutes>
        ),
      },
      {
        path: "rooms",
        element: (
          <ProtectedRoutes roles={["admin"]}>
            <AllRooms />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-room",
        element: (
          <ProtectedRoutes roles={["admin"]}>
            <CreateRoom />
          </ProtectedRoutes>
        ),
      },
      {
        path: "slots",
        element: (
          <ProtectedRoutes roles={["admin"]}>
            <AllSlots />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-slot",
        element: (
          <ProtectedRoutes roles={["admin"]}>
            <CreateSlot />
          </ProtectedRoutes>
        ),
      },
      {
        path: "booking-management",
        element: (
          <ProtectedRoutes roles={["admin"]}>
            <BManagement />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes roles={["admin", "user"]}>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoutes roles={["user"]}>
            <MyBookings />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
