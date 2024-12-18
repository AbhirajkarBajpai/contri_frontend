import "./App.css";
import SignupScreen from "./screens/SignupScreen/Signup";
import LoginScreen from "./screens/LoginScreen/Login";
import Main from "./mainPage";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <Main /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </>
  );
}

export default App;
