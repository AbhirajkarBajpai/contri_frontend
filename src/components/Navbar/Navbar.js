import React, { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [active, setActive] = useState("Personal Info");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
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
            active === "Contact" ? styles.active : ""
          }`}
          onClick={() => {
            setActive("Contact");
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
