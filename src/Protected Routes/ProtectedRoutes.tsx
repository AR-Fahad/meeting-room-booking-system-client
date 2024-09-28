import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoutes = ({
  children,
  roles,
}: {
  children: ReactNode;
  roles: string[];
}) => {
  const { token } = useAppSelector((state) => state.auth);
  let user;
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (token) {
    user = verifyToken(token);
  }

  if (!user) {
    dispatch(logout());
    toast.error("Authentication failed. Please login");
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (!roles.includes(user?.role)) {
    toast.error("You have no access to this route");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
