import "./App.css";
import SignupScreen from "./screens/SignupScreen/Signup";
import LoginScreen from "./screens/LoginScreen/Login";
import Main from "./mainPage";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
function App() {
  const [islogin, setIsLogin] = useState(true);
  return (
    <>
      <Routes>
        <Route path="/" element={ <Main />} />
      </Routes>
    </>
  );
}

export default App;
