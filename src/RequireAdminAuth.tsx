import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "./app/store";

const RequireAdminAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  console.log("Require Admin Auth");
  console.log(user);
  console.log(user.role === "Admin");
  return user.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/bill/add/" state={{ from: location }} replace />
  );
};
export default RequireAdminAuth;
