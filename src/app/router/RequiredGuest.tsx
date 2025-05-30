import { Observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router";
import useStore from "../../lib/hooks/useStore";

export default function RequireGuest() {
      const {  userStore } = useStore();

  return (
    <Observer>
      {() => {
        if (userStore.token) {
          return (
            <Navigate
              to="/dashboard"
              replace
            />
          );
        }

        return <Outlet />;
      }}
    </Observer>
  );
}
