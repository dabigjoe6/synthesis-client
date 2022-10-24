import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isUserLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const signUserIn = () => {
    setIsUserLoggedIn(true);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(location.state.from || "/", { replace: true });
    }
  }, [isUserLoggedIn]);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, signUserIn }}>
      {children}
    </AuthContext.Provider>
  );
};
