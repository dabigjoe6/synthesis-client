import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext, AuthContextI } from "../contexts/Auth";

const RequireAuth = () => {
  const location = useLocation();
  const { isUserLoggedIn } = React.useContext<AuthContextI>(AuthContext);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
