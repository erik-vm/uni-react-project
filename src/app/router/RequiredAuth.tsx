import { Box, CircularProgress } from "@mui/material";
import { Observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation } from "react-router";
import useStore from "../../lib/hooks/useStore";

export default function RequireAuth() {
  const { uiStore, userStore } = useStore();
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
