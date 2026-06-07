 import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  heightCm: 170,
  targetWeightKg: 70
};

const Login = () => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const { user, login, register } = useAuth();

  if (user) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        bgcolor: "background.default"
      }}
    >
      <Card variant="outlined" sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent>
          <Stack spacing={3} component="form" onSubmit={submit}>
            <Stack spacing={0.5}>
              <Typography variant="h4" color="primary">
                FitTrack
              </Typography>
              <Typography color="text.secondary">Sign in to track training, nutrition, hydration, and progress.</Typography>
            </Stack>
            <ToggleButtonGroup
              exclusive
              fullWidth
              value={mode}
              onChange={(_, value) => value && setMode(value)}
              size="small"
            >
              <ToggleButton value="login">Login</ToggleButton>
              <ToggleButton value="register">Register</ToggleButton>
            </ToggleButtonGroup>
            {error && <Alert severity="error">{error}</Alert>}
            {mode === "register" && (
              <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            )}
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            {mode === "register" && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Height cm"
                  type="number"
                  value={form.heightCm}
                  onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                  required
                />
                <TextField
                  label="Target kg"
                  type="number"
                  value={form.targetWeightKg}
                  onChange={(e) => setForm({ ...form, targetWeightKg: Number(e.target.value) })}
                  required
                />
              </Stack>
            )}
            <Button type="submit" variant="contained" size="large">
              {mode === "login" ? "Login" : "Create account"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
