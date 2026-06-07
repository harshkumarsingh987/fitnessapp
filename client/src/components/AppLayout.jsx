 import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import {
  Analytics,
  Dashboard,
  FitnessCenter,
  LightMode,
  LocalDrink,
  Logout,
  Menu,
  MonitorWeight,
  NightsStay,
  Restaurant,
  Straighten
} from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useColorMode } from "../context/ColorModeContext";

const drawerWidth = 248;

const navItems = [
  { label: "Dashboard", path: "/", icon: <Dashboard /> },
  { label: "Workouts", path: "/workouts", icon: <FitnessCenter /> },
  { label: "Calories", path: "/calories", icon: <Restaurant /> },
  { label: "Weight", path: "/weight", icon: <MonitorWeight /> },
  { label: "BMI", path: "/bmi", icon: <Straighten /> },
  { label: "Water", path: "/water", icon: <LocalDrink /> },
  { label: "Analytics", path: "/analytics", icon: <Analytics /> }
];

const DrawerContent = ({ onNavigate }) => (
  <Box sx={{ height: "100%" }}>
    <Toolbar>
      <Typography variant="h5" color="primary">
        FitTrack
      </Typography>
    </Toolbar>
    <Divider />
    <List sx={{ p: 1 }}>
      {navItems.map((item) => (
        <ListItemButton
          key={item.path}
          component={NavLink}
          to={item.path}
          onClick={onNavigate}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            "&.active": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .MuiListItemIcon-root": { color: "inherit" }
            }
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton edge="start" onClick={() => setOpen(true)} sx={{ display: { md: "none" } }}>
            <Menu />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Welcome back
            </Typography>
            <Typography variant="h6">{user?.name}</Typography>
          </Box>
          <IconButton onClick={toggleMode} aria-label="Toggle color mode">
            {mode === "dark" ? <LightMode /> : <NightsStay />}
          </IconButton>
          <Button startIcon={<Logout />} color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          <DrawerContent onNavigate={() => setOpen(false)} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Outlet />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;