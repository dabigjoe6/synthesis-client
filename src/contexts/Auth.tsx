import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGNED_IN_TOKEN, SIGNED_IN_USER_KEY } from "../config";
import { StatusCallback } from "../types.js";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface UserI {
  email: string;
}

interface ResetPassword { email: string | undefined, newPassword: string, resetPasswordToken: string | undefined }

export interface AuthContextI {
  isUserLoggedIn: boolean;
  user: UserI | null;
  token: string | null;
  registerUser: (loginDetails: LoginDetails, callback: StatusCallback) => void;
  signUserIn: (loginDetails: LoginDetails, callback: StatusCallback) => void;
  signUserOut: () => void;
  resetUsersPassword: (email: string, callback: StatusCallback) => void;
  changePassword: (resetPasswordDetails: ResetPassword, callback: StatusCallback) => void;
  signUserInWithGoogle: (code: string, callback: StatusCallback) => void;
}

export const AuthContext = React.createContext<AuthContextI>({
  isUserLoggedIn: false,
  user: null,
  token: null,
  registerUser: () => { },
  signUserIn: () => { },
  signUserOut: () => { },
  resetUsersPassword: () => { },
  changePassword: () => { },
  signUserInWithGoogle: () => { }
});

export interface LoginDetails {
  email: string;
  password: string;
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const registerUser = async ({ email, password }: LoginDetails, callback: StatusCallback) => {
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

  const signUserIn = async ({ email, password }: LoginDetails, callback: StatusCallback) => {
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

  const signUserInWithGoogle = async (code: string, callback: StatusCallback) => {
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
    { email, newPassword, resetPasswordToken }: ResetPassword,
    callback: StatusCallback
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

  const resetUsersPassword = async (email: string, callback: StatusCallback) => {
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

  React.useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [token]);

  React.useEffect(() => {
    let _token = localStorage.getItem(SIGNED_IN_TOKEN);
    _token && setToken(JSON.parse(_token));

    let _user = localStorage.getItem(SIGNED_IN_USER_KEY);
    _user && setUser(JSON.parse(_user));
  }, []);

  React.useEffect(() => {
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
