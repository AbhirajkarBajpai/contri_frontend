import React from "react";
import styles from "./PersonalInfo.module.css";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  console.log()
  const userName = useSelector((state) => state.userDetail.name);
  const userEmail = useSelector((state) => state.userDetail.email);
  const userPhoneNo = useSelector((state) => state.userDetail.PhoneNo);
  const userUPI = useSelector((state) => state.userDetail.UpiId);
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profilePicture}>
          <svg
          className={styles.menSvgPI}
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 508.609 508.609"
            xmlSpace="preserve"
            fill="#000000"
          >
            <g>
              <circle
                style={{ fill: "#EEB490" }}
                cx="150.887"
                cy="200.053"
                r="39.672"
              ></circle>
              <circle
                style={{ fill: "#EEB490" }}
                cx="357.722"
                cy="200.053"
                r="39.672"
              ></circle>
            </g>
            <path
              style={{ fill: "#6536f2" }}
              d="M463.513,508.609H45.097v-74.935c0-34.925,26.109-64.085,60.355-68.493l92.228-36.62h113.25 l92.228,36.62c34.585,4.069,60.355,33.568,60.355,68.493V508.609z"
            ></path>
            <path
              style={{ fill: "#261575" }}
              d="M178.013,348.567v33.568c0,42.723,34.924,78.665,77.648,77.987 c41.367-0.678,74.596-34.585,74.596-76.291v-35.264c0-12.207-9.833-22.04-22.04-22.04H199.714 C187.846,326.866,178.013,336.699,178.013,348.567z"
            ></path>
            <path
              style={{ fill: "#EEB490" }}
              d="M202.087,300.419v55.608c0,28.821,23.396,52.217,52.217,52.217l0,0 c28.821,0,52.217-23.396,52.217-52.217v-55.608H202.087z"
            ></path>
            <path
              style={{ fill: "#FACCB4" }}
              d="M306.861,94.601H201.748c-24.752,0-44.758,20.005-44.758,44.758v100.705 c0,53.913,43.74,97.314,97.314,97.314l0,0c53.913,0,97.314-43.74,97.314-97.314V139.359 C351.619,114.607,331.613,94.601,306.861,94.601z"
            ></path>
            <g>
              <path
                style={{ fill: "#56545F" }}
                d="M351.619,52.895c0,0,74.935,9.833,0,151.226V146.14c0,0-5.425-41.706-30.856-44.079L351.619,52.895z "
              ></path>
              <path
                style={{ fill: "#56545F" }}
                d="M300.758,0h-92.906c-3.73,0-7.46,0.339-10.85,1.017l0,0c-140.376,0-40.011,210.225-40.011,210.225 c0-81.038,50.861-81.377,50.861-81.377h93.245c35.942,0,64.763-29.16,64.763-64.763l0,0C365.86,29.16,336.699,0,300.758,0z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Name:</span> {userName}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span> {userEmail}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Contact No:</span> {userPhoneNo}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>UPI ID:</span> {userUPI===null?'Not Set':userUPI}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
