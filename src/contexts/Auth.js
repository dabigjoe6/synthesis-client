import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNED_IN_EMAIL_KEY } from "../config";

export const AuthContext = createContext({
  isUserLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const signUserIn = (email) => {
    setEmail(email);
    localStorage.setItem(SIGNED_IN_EMAIL_KEY, JSON.stringify(email));
  };

  const signUserOut = () => {
    setEmail("");
    localStorage.removeItem(SIGNED_IN_EMAIL_KEY);
  };

  useEffect(() => {
    if (email) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [email]);

  useEffect(() => {
    let _email = localStorage.getItem(SIGNED_IN_EMAIL_KEY);
    setEmail(JSON.parse(_email));
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(location.state.from || "/", { replace: true });
    }
  }, [isUserLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, signUserIn, email, signUserOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
