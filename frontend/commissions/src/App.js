import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserAdmin from "./pages/UserAdmin";
import Layout from "./pages/Layout";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuth(true);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout setIsAuth={setIsAuth} />}>
        <Route index element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="users" element={<UserAdmin />} />
      </Route>
      <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
