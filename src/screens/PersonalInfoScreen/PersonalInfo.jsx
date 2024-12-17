import React from "react";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profilePicture}>
          <div className={styles.avatar}></div>
        </div>
      </div>
      <div className={styles.infoSection}>
        <h2>Personal Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Name:</span> John Doe
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span> john.doe@gmail.com
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>UPI ID:</span> john.doe@upi
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
