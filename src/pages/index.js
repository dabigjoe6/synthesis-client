import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/Auth";
import { Layout } from "../components";

import Home from "./home";
import Login from "./login";
import RequireAuth from "./require-auth";
import ErrorPage from "./error-page";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
