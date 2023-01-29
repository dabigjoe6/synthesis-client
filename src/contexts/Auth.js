import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGNED_IN_TOKEN, SIGNED_IN_USER_KEY } from "../config";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext({
  isUserLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const registerUser = async ({ email, password }, callback) => {
    try {
      const response = await fetch(BASE_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(SIGNED_IN_USER_KEY, JSON.stringify(data.user));
      localStorage.setItem(SIGNED_IN_TOKEN, JSON.stringify(data.token));
      callback(true);
      toast.success("Account created succesfully");
    } catch (err) {
      callback(false);
      toast.error(err.message || err);
      console.error("Could not register user", err);
    }
  };

  const signUserIn = async ({ email, password }, callback) => {
    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(SIGNED_IN_USER_KEY, JSON.stringify(data.user));
      localStorage.setItem(SIGNED_IN_TOKEN, JSON.stringify(data.token));
      callback(true);
    } catch (err) {
      callback(false);
      toast.error(err.message || err);
      console.error("Could not sign user in", err);
    }
  };

  const signUserInWithGoogle = async (code, callback) => {
    try {
      const response = await fetch(BASE_URL + "/auth/oauth_login", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(SIGNED_IN_USER_KEY, JSON.stringify(data.user));
      localStorage.setItem(SIGNED_IN_TOKEN, JSON.stringify(data.token));
      callback(true);
    } catch (err) {
      callback(false);
      toast.error(err.message || err);
      console.error("Could not sign user in", err);
    }
  };

  const signUserOut = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  const changePassword = async (
    { email, newPassword, resetPasswordToken },
    callback
  ) => {
    try {
      const response = await fetch(BASE_URL + "/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ email, newPassword, resetPasswordToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      callback(true);
    } catch (err) {
      callback(false);
      console.error("Could not reset users password: ", err);
    }
  };

  const resetUsersPassword = async (email, callback) => {
    try {
      const response = await fetch(BASE_URL + "/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      callback(true);
    } catch (err) {
      callback(false);
      console.error("Could not reset users password: ", err);
    }
  };

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    let _token = localStorage.getItem(SIGNED_IN_TOKEN);
    setToken(JSON.parse(_token));

    let _user = localStorage.getItem(SIGNED_IN_USER_KEY);
    setUser(JSON.parse(_user));
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      const navigateTo = location?.state?.from || "/";
      navigate(navigateTo, { replace: true });
    }
  }, [isUserLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        isUserLoggedIn,
        signUserIn,
        token,
        signUserOut,
        resetUsersPassword,
        changePassword,
        signUserInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
