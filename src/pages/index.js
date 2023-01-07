import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/Auth";
import { UserProvider } from "../contexts/User";
import { Layout } from "../components";

import Home from "./home";

import Login from "./auth/login";
import SignUp from "./auth/sign-up";
import ForgotPassword from "./auth/forgot-password";
import ChangePassword from "./auth/change-password";
import RequireAuth from "./require-auth";

import ErrorPage from "./error-page";

import { DialogProvider } from "../contexts/Dialog";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  useEffect(() => {
    const dev = process.env.NODE_ENV;
    document.title = `MorningBrew - ${
      dev === "development" ? "DEV" : "STAGING"
    }`;
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <DialogProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/change-password/:email/:resetToken"
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
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
