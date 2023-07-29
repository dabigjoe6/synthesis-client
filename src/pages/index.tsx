import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../contexts/Auth";
import { UserProvider } from "../contexts/User";
import { SettingsProvider } from "../contexts/Settings";

import { Layout } from "../components";

import Home from "./Home/home";

import Login from "./auth/components/Login/login";
import SignUp from "./auth/sign-up";
import ForgotPassword from "./auth/forgot-password";
import ChangePassword from "./auth/change-password";
import RequireAuth from "./require-auth";

import ErrorPage from "./error-page";

import { DialogProvider } from "../contexts/Dialog";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Router = () => {
  React.useEffect(() => {
    const environment = process.env.REACT_APP_ENV;
    document.title = `Synthesis${environment === "development" ? " - DEV" : environment === "staging" ? " - STAGING" : ""
      }`;
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <SettingsProvider>
              <DialogProvider>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route
                      path="/change-password/:email/:resetPasswordToken"
                      element={<ChangePassword />}
                    />
                    <Route element={<RequireAuth />}>
                      <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
                </Routes>
                <ToastContainer hideProgressBar={true} theme="dark" />
              </DialogProvider>
            </SettingsProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default Router;
