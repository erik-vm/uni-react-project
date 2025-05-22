import { createBrowserRouter } from "react-router";

import Dashboard from "../../features/dashboard/Dashboard";
import HomePage from "../../features/home/HomePage";
import App from "../shared/App";
import GpsSessionForm from "../../features/gps/session/GpsSessionForm";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequiredAuth";
import RegisterForm from "../../features/account/RegisterForm";
import GpsSessionView from "../../features/gps/session/GpsSessionView";
import RequireGuest from "./RequiredGuest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/create", element: <GpsSessionForm key={"create"} /> },
          { path: "/edit/:id", element: <GpsSessionForm /> },
          { path: "/view/:id", element: <GpsSessionView /> },
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
      {
        element: <RequireGuest />,
        children: [
          { path: "/login", element: <LoginForm /> },
          { path: "/register", element: <RegisterForm /> },
        ],
      },

      { path: "/", element: <HomePage /> },
    ],
  },
  
], {
  basename: "/uni-react-project" 
});
