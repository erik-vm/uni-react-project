import { createBrowserRouter } from "react-router";

import Dashboard from "../../features/dashboard/Dashboard";
import HomePage from "../../features/home/HomePage";
import App from "../shared/App";
import GpsSessionForm from "../../features/gps/session/GpsSessionForm";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequiredAuth";
import RegisterForm from "../../features/account/RegisterForm";

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
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
]);