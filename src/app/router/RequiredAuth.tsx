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
                // If we're still loading user data
                if (uiStore.isLoading) {
                    return (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                            <CircularProgress size={60} />
                        </Box>
                    );
                }

                // If user is not authenticated
                if (!userStore.token) {
                    return <Navigate to='/login' state={{ from: location }} />;
                }

                // User is authenticated, show the protected content
                return <Outlet />;
            }}
        </Observer>
    );
}