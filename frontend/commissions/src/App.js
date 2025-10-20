import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserAdmin from "./pages/UserAdmin";
import Layout from "./pages/Layout";
import BranchAdmin from "./pages/BranchAdmin";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuth(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const isAdmin = currentUser?.role === "admin";

  return (
    <Routes>
      <Route path="/" element={<Layout setIsAuth={setIsAuth} />}>
        {/* Home route */}
        <Route index element={isAuth ? <Home /> : <Navigate to="/login" />} />

        {/* ✅ Protected Admin Route */}
        <Route
          path="users"
          element={
            isAuth && isAdmin ? <UserAdmin /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="branches"
          element={
            isAuth && isAdmin ? <BranchAdmin /> : <Navigate to="/" replace />
          }
        />
      </Route>

      {/* Auth routes */}
      <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
