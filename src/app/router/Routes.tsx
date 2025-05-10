import { createBrowserRouter } from "react-router";

import App from "../shared/App"; 
import HomePage from "../../features/home/HomePage";
import GpsSessionList from "../../features/gps/session/GpsSessionList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { path: "/", element: <HomePage /> },
        { path: "/sessions", element: <GpsSessionList /> }
    ],
  },
]);
