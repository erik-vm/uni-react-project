import { Logout } from "@mui/icons-material";
import { Box, Divider, ListItemIcon, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import useStore from "../../lib/hooks/useStore";

export default function UserMenu() {
  const { userStore } = useStore();
  const { logoutUser } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
   <MenuItem
        component={Link}
        to="/dashboard"
        onClick={handleClose}
      >
        <ListItemText>Dashboard</ListItemText>
      </MenuItem>
      <MenuItem
        component={Link}
        to="/create"
        onClick={handleClose}
      >
        <ListItemText>Create Session</ListItemText>
      </MenuItem>
      <Button
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{ fontSize: "1.1rem" }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          {userStore?.fullName}
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Divider />
        <MenuItem
          onClick={() => {
            logoutUser();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
