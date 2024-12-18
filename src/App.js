import "./App.css";
import SignupScreen from "./screens/SignupScreen/Signup";
import LoginScreen from "./screens/LoginScreen/Login";
import PersonalInfo from "./screens/PersonalInfoScreen/PersonalInfo";
import Navbar from "./components/Navbar/Navbar";
import Groups from "./screens/GroupScreen/Groups";
import { useState } from "react";
import React from "react";
function App() {
  const [array, setarray] = useState([]);
  const [active, setActive] = useState("Personal Info");
  const [islogin, setIsLogin] = useState(true);
  return (
    <>
      {!islogin && (
        <>
          <SignupScreen />
          <LoginScreen />
        </>
      )}
      <Navbar active={active} setActive={setActive} />
      {active === "Personal Info" ? <PersonalInfo /> : <Groups groups={array} />}
    </>
  );
}

export default App;
