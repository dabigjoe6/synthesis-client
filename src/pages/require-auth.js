import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/Auth";

const RequireAuth = () => {
  const location = useLocation();
  const { isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("IsUserLoggedIn", isUserLoggedIn);
  }, [isUserLoggedIn]);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
