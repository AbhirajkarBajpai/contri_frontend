import React, { useState } from "react";
import PersonalInfo from "./screens/PersonalInfoScreen/PersonalInfo";
import Navbar from "./components/Navbar/Navbar";
import Groups from "./screens/GroupScreen/Groups";

const Main = () => {
  const [active, setActive] = useState("Your Groups");
  return (
    <>
      <Navbar active={active} setActive={setActive} />
      {active === "Personal Info" ? (
        <PersonalInfo />
      ) : (
        <Groups/>
      )}
    </>
  );
};

export default Main;
