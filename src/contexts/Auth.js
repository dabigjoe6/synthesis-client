import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGNED_IN_EMAIL_KEY } from "../config";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext({
  isUserLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const signUserIn = async ({ email, password }) => {
    try {
      let response = await fetch(BASE_URL, "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();

      if (response) {
        // TODO: Set token somewhere
        setEmail(email);
        localStorage.setItem(SIGNED_IN_EMAIL_KEY, JSON.stringify(email));
      } else {
        // TODO: Do something here
      }
    } catch (err) {
      toast.error(err);
      console.error("Could not sign user in", err);
    }
  };

  const signUserOut = () => {
    setEmail("");
    localStorage.removeItem(SIGNED_IN_EMAIL_KEY);
  };

  const changePassword = async (
    { email, newPassword, resetToken },
    callback
  ) => {
    try {
      let response = await fetch(BASE_URL, "/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ email, newPassword, resetToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();

      if (response) {
        callback(true);
      }
    } catch (err) {
      callback(false);
      console.error("Could not reset users password: ", err);
    }
  };

  const resetUsersPassword = async (email, callback) => {
    try {
      let response = await fetch(BASE_URL, "/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();

      if (response) {
        callback(true);
      }
    } catch (err) {
      callback(false);
      console.error("Could not reset users password: ", err);
    }
  };

  // TODO: Change useeffect to be based on token and not email
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
      value={{
        isUserLoggedIn,
        signUserIn,
        email,
        signUserOut,
        resetUsersPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
