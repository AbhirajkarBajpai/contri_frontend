import "./App.css";
import SignupScreen from "./screens/SignupScreen/Signup";
import LoginScreen from "./screens/LoginScreen/Login";
import Main from "./mainPage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setDetails, setGroups } from "./store/store";
import Expenses from "./screens/GroupScreen/GroupExpenses/Expenses";

function App() {
  const isUserLoggedIn = useSelector((state) => state.loggedInUser.value);
  const [isloadingUser, setIsLoadingUser] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "https://contri-backend.vercel.app/api/v1/user/isUserLoggedIn",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          dispatch(setUser(data.userId));
          dispatch(setDetails(data.user));
          dispatch(setGroups(data.user.groups));
          console.log(data);
        }
        if (response.status === 400) {
          setIsLoadingUser(false);
        }
      } catch (error) {
        console.log("Error verifying user:", error);
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      setIsLoadingUser(false);
      navigate("/");
    }
  }, [isUserLoggedIn]);

  if (isloadingUser) {
    return <>Loading...</>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn != null ? <Main /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/group/:id" element={<Expenses />} />
      </Routes>
    </>
  );
}

export default App;
