import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuth(true);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuth ? <Home setIsAuth={setIsAuth} /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
