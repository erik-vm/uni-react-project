import { CircularProgress, Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import useStore from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function RequireAuth() {
  const { userStore, uiStore } = useStore();
  const location = useLocation();

  return (
    <Observer>
      {() => {
        if (uiStore.isLoading) {
          return (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <CircularProgress size={60} />
            </Box>
          );
        }

        if (!userStore.token) {
          return (
            <Navigate
              to="/login"
              state={{ from: location }}
            />
          );
        }

        return <Outlet />;
      }}
    </Observer>
  );
}
