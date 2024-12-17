import "./App.css";
import SignupScreen from "./screens/SignupScreen/Signup";
import LoginScreen from "./screens/LoginScreen/Login";
import PersonalInfo from "./screens/PersonalInfoScreen/PersonalInfo";
import Navbar from "./components/Navbar/Navbar";
import Groups from "./screens/GroupScreen/Groups";
import { useState } from "react";
function App() {
  const [array, setarray] = useState([]);
  return (
    <>
      {/* <SignupScreen />
       <LoginScreen /> */}
      <Navbar />
     {/* <PersonalInfo /> */}
      <Groups groups={array} />
    </>
  );
}

export default App;
