import { DirectionsRunOutlined } from "@mui/icons-material";
import { AppBar, Box, CircularProgress, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { Observer } from "mobx-react-lite";
import { NavLink } from "react-router";
import useStore from "../../lib/hooks/useStore";
import MenuItemLink from "./components/MenuItemLink";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const {  uiStore, userStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to={ userStore.token ? "/dashboard" : "/"} sx={{ display: 'flex', gap: 2 }}>
                <DirectionsRunOutlined fontSize="large" />
                <Typography sx={{ position: 'relative' }} variant="h4" fontWeight="bold">
                  SportMap
                </Typography>
                <Observer>
                  {() =>
                    uiStore.isLoading ? (
                      <CircularProgress
                        size={20}
                        thickness={7}
                        sx={{
                          color: 'white',
                          position: 'absolute',
                          top: '30%',
                          left: '105%'
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>

            <Box display="flex" alignItems="center">
              <Observer>
                {() =>
                  userStore.token ? (
                    <UserMenu />
                  ) : (
                    <>
                      <MenuItemLink to="/navbar">Navbar</MenuItemLink>
                      <MenuItemLink to="/login">Login</MenuItemLink>
                      <MenuItemLink to="/register">Register</MenuItemLink>
                    </>
                  )
                }
              </Observer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}