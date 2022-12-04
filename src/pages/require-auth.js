import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/Auth";

const RequireAuth = () => {
  const location = useLocation();
  const { isUserLoggedIn } = useContext(AuthContext);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
