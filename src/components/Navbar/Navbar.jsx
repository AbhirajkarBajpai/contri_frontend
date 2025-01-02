import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../ConfirmationBox/ConfirmationBox";

function Navbar({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openConf, setOpenConf] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch("https://contri-backend.vercel.app/api/v1/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("login successful:", data);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log("logout failed:", errorData);
      }
    } catch (error) {
      console.error("Error occurred during logout", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      {openConf && (
        <ConfirmationBox
          message={"Are you sure want to logout!"}
          onNo={() => setOpenConf(false)}
          onYes={() => {
            logoutHandler();
            setMenuOpen(false);
          }}
        />
      )}
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <ul
        className={`${styles.navLinks} ${
          menuOpen ? styles.navLinksMobile : ""
        }`}
      >
        <li className={styles.navItem} onClick={() => setOpenConf(true)}>
          Logout
        </li>
        <li
          className={`${styles.navItem} ${
            active === "Personal Info" ? styles.active : ""
          }`}
          onClick={() => {
            setActive("Personal Info");
            setMenuOpen(false);
          }}
        >
          Personal Info
        </li>
        <li
          className={`${styles.navItem} ${
            active === "Your Groups" ? styles.active : ""
          }`}
          onClick={() => {
            setActive("Your Groups");
            setMenuOpen(false);
          }}
        >
          Your Groups
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
