import React from "react";
import styles from "./ConfirmationBox.module.css";
import Modal from "../Modal/Modal";

const ConfirmationBox = ({ message, onYes, onNo }) => {
  return (
    <Modal>
      <div className={styles.confirmationBox}>
        <span className={styles.confMsg}>{message}</span>
        <div className={styles.yesNo}>
          <span onClick={onYes}>Yes</span>
          <span onClick={onNo}>No</span>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationBox;
