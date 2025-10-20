import { useNavigate, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

export default function Layout({ setIsAuth }) {
  const navigate = useNavigate();

  // Read user from localStorage
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = currentUser?.role === "admin";

  const handleLogout = async () => {
    await fetch("http://192.168.1.40:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "primary.main",
          color: "white",
          py: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">🚀 Welcome to the Dashboard</Typography>
      </Box>

      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            My App
          </Typography>

          {/* ✅ Render only if admin */}
          {isAdmin && (
            <Button color="primary" onClick={() => navigate("/users")}>
              User Admin
            </Button>
          )}

          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
