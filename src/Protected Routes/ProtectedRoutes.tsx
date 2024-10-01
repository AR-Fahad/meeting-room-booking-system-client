import { TAuth } from "@/interfaces/user.interface";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoutes = ({
  children,
  roles,
  path,
}: {
  children: ReactNode;
  roles: string[];
  path?: string;
}) => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const user: TAuth = token ? verifyToken(token) : null;

  if (!user) {
    dispatch(logout());
    toast.error("Authentication failed. Please login");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!roles.includes(user?.role)) {
    toast.error("You have no access to this route");
    return <Navigate to={path ? path : "/"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
