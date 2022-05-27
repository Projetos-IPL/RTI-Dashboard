import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard";
import LoginScreen from "./view/screens/LoginScreen/LoginScreen";

import { APP_ROUTES } from "./config";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route
          exact
          path={APP_ROUTES.DASHBOARD_ROUTE + "*"}
          element={<Dashboard />}
        />
        <Route path={APP_ROUTES.LOGIN_SCREEN_ROUTE} element={<LoginScreen />} />
      </Routes>
    </Router>
  </>
);
