import { createBrowserRouter } from "react-router";

import Dashboard from "../../features/dashboard/Dashboard";
import HomePage from "../../features/home/HomePage";
import App from "../shared/App";
import GpsSessionForm from "../../features/gps/session/GpsSessionForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/create", element: <GpsSessionForm key={'create'}/> },
      { path: "/edit/:id", element: <GpsSessionForm /> },

    ],
  },
]);
