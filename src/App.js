import "./App.css";
import SignupScreen from "./screens/SignupScreen/Signup";
import LoginScreen from "./screens/LoginScreen/Login";
import Main from "./mainPage";
import React from "react";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/store';

function App() {
  const isUserLoggedIn = useSelector((state) => state.loggedInUser.value);
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
