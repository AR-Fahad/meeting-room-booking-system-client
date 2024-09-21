import Sidebar from "@/components/layout/Sidebar";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let user;

  if (token) {
    user = verifyToken(token);
    if (!user) {
      dispatch(logout());
      navigate("/login");
    }
  }

  return (
    <>
      <Sidebar role={user?.role}>
        <Outlet />
      </Sidebar>
    </>
  );
};

export default Dashboard;
