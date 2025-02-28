import React, { useState } from "react";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setDetails, setGroups } from "../../store/store";
import { showAlert } from "../../components/alert";

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNo, setEnteredPhoneNo] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const submitSignupFormHandler = async (e) => {
    e.preventDefault();
    if (enteredPassword.length < 8) {
      showAlert('error', "password can't be less than 8 characters!");
      return;
    }
    const userData = {
      name: enteredName,
      email: enteredEmail,
      phoneNo: enteredPhoneNo,
      password: enteredPassword,
    };

    try {
      const response = await fetch("https://contri-backend.vercel.app/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        dispatch(setUser(data.data.user._id));
        dispatch(setGroups(data.data.user.groups));
        dispatch(setDetails(data.data.user));
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        const errorData = await response.json();
        showAlert('error', errorData.message);
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      showAlert('error', "Something Went Wrong!");
    }
    setEnteredEmail("");
    setEnteredName("");
    setEnteredPassword("");
    setEnteredPhoneNo("");
  };

  return (
    <div className="signup-container">
      <div className="signup-illustration">
        <div className="illustration-circle"></div>
        <svg
          className="signup_svg"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#141bdb"
          stroke="#141bdb"
        >
          <title>user-profile-filled</title>
          <g id="Page-1" strokeWidth="0.00512" fill="none" fillRule="evenodd">
            <g
              id="drop"
              fill="#0530b3"
              transform="translate(42.666667, 42.666667)"
            >
              <path
                d="M213.333333,0 C269.912851,0 324.175019,22.4761259 364.18278,62.4838867 C404.190541,102.491647 426.666667,156.753816 426.666667,213.333333 C426.666667,331.15408 331.15408,426.666667 213.333333,426.666667 C95.5125867,426.666667 0,331.15408 0,213.333333 C0,95.5125867 95.5125867,0 213.333333,0 Z M234.666667,234.666667 L192,234.666667 C139.18529,234.666667 93.8415802,266.653822 74.285337,312.314895 C105.229171,355.70638 155.977088,384 213.333333,384 C270.689579,384 321.437496,355.70638 352.381644,312.31198 C332.825087,266.653822 287.481377,234.666667 234.666667,234.666667 L234.666667,234.666667 Z M213.333333,64 C177.987109,64 149.333333,92.653776 149.333333,128 C149.333333,163.346224 177.987109,192 213.333333,192 C248.679557,192 277.333333,163.346224 277.333333,128 C277.333333,92.653776 248.679557,64 213.333333,64 Z"
                id="Combined-Shape"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div className="signup-form">
        <h2>Registration Form</h2>
        <form onSubmit={submitSignupFormHandler}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
            required
          />
          <label>Contact No</label>
          <input
            type="tel"
            placeholder="Enter your Contact Number"
            value={enteredPhoneNo}
            onChange={(e) => setEnteredPhoneNo(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            required
          />

          {/* <label>UPI ID (optional)</label>
          <input type="text" placeholder="Enter your UPI ID" /> */}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
