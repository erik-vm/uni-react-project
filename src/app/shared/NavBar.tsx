import { DirectionsRunOutlined, Group } from "@mui/icons-material";
import { Container, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";
import MenuItemLink from "./components/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                sx={{ display: "flex", gap: 2 }}
                component={NavLink}
                to="/"
              >
                <DirectionsRunOutlined fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  SportsMap
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/dashboard">Dashboard</MenuItemLink>
              <MenuItemLink to="/create">Create new session</MenuItemLink>
              
            <MenuItem>User Menu</MenuItem>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
