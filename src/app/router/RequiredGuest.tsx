import { Observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router";
import UserStore from "../../lib/stores/userStore";

export default function RequireGuest() {
     const userStore = new UserStore();

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
