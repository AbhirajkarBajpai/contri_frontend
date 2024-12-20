import React, { useState } from "react";
import styles from "./Login.module.css";
import { setUser } from "../../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailOrPhoneNo, setEmailOrPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmitHandler = async(e) => {
    e.preventDefault();
    const data = { emailOrPhoneNo, password };
    try {
      const response = await fetch("http://localhost:5000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("login successful:", data);
        dispatch(setUser(data.data.user._id));
          navigate("/");
      } else {
        const errorData = await response.json();
        console.log("login failed:", errorData);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftSection}>
        <svg
          className={styles.login_svg1}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                style={{ fill: "#002833" }}
                d="M473.68,396.8V102.4c0-7.04-5.76-12.8-12.8-12.8H51.36c-7.04,0-12.8,5.76-12.8,12.8v294.4 C38.56,396.8,474.72,396.8,473.68,396.8z"
              ></path>
              <rect
                x="57.76"
                y="106.64"
                style={{ fill: "#002833" }}
                width="396.72"
                height="290.16"
              ></rect>
            </g>
            <rect
              y="396.8"
              style={{ fill: "#E8E8E8" }}
              width="512"
              height="8.56"
            ></rect>
            <polygon
              style={{ fill: "#C9C9C9" }}
              points="486.4,422.4 25.6,422.4 0,405.36 512,405.36"
            ></polygon>
            <g>
              <circle
                style={{ fill: "#FFFFFF" }}
                cx="255.84"
                cy="200.64"
                r="36.48"
              ></circle>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M254.16,321.84l-35.2-76.4c0,0-36.96,0.48-36.96,34.48s0,41.92,0,41.92S254.4,321.84,254.16,321.84z"
              ></path>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M257.6,321.84l35.2-76.4c0,0,36.96,0.48,36.96,34.48s0,41.92,0,41.92S257.36,321.84,257.6,321.84z"
              ></path>
            </g>
            <polygon
              style={{ fill: "#FF5F5F" }}
              points="255.84,245.44 230.48,245.44 255.84,301.6 281.28,245.44"
            ></polygon>
          </g>
        </svg>
        <div className={styles.lockIcon}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
          >
            <path
              d="M17 10.25H8.75V8C8.75 7.13805 9.09241 6.3114 9.7019 5.7019C10.3114 5.09241 11.138 4.75 12 4.75C12.862 4.75 13.6886 5.09241 14.2981 5.7019C14.9076 6.3114 15.25 7.13805 15.25 8C15.25 8.19891 15.329 8.38968 15.4697 8.53033C15.6103 8.67098 15.8011 8.75 16 8.75C16.1989 8.75 16.3897 8.67098 16.5303 8.53033C16.671 8.38968 16.75 8.19891 16.75 8C16.75 6.74022 16.2496 5.53204 15.3588 4.64124C14.468 3.75045 13.2598 3.25 12 3.25C10.7402 3.25 9.53204 3.75045 8.64124 4.64124C7.75045 5.53204 7.25 6.74022 7.25 8V10.25H7C6.27065 10.25 5.57118 10.5397 5.05546 11.0555C4.53973 11.5712 4.25 12.2707 4.25 13V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H17C17.7293 20.75 18.4288 20.4603 18.9445 19.9445C19.4603 19.4288 19.75 18.7293 19.75 18V13C19.75 12.2707 19.4603 11.5712 18.9445 11.0555C18.4288 10.5397 17.7293 10.25 17 10.25ZM18.25 18C18.25 18.3315 18.1183 18.6495 17.8839 18.8839C17.6495 19.1183 17.3315 19.25 17 19.25H7C6.66848 19.25 6.35054 19.1183 6.11612 18.8839C5.8817 18.6495 5.75 18.3315 5.75 18V13C5.75 12.6685 5.8817 12.3505 6.11612 12.1161C6.35054 11.8817 6.66848 11.75 7 11.75H17C17.3315 11.75 17.6495 11.8817 17.8839 12.1161C18.1183 12.3505 18.25 12.6685 18.25 13V18Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
      <div className={styles.rightSection}>
        <h1 className={styles.loginTitle}>Login</h1>
        <form className={styles.loginForm} onSubmit={loginSubmitHandler}>
          <label>Email/Contact No:</label>
          <input
            type="string"
            placeholder="Email or Contact No"
            className={styles.input}
            value={emailOrPhoneNo}
            onChange={(e) => setEmailOrPhoneNo(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.options}>
            {/* <a href="#" className={styles.link}>Forgot Password?</a> */}
            <a href="/signup" className={styles.link}>
              Not registered yet? Register now!
            </a>
          </div>
          <button type="submit" className={styles.loginButton}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
