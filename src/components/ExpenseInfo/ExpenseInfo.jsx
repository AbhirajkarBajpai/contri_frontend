import React, { useEffect, useState } from "react";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = ({ onClose, expenseId }) => {
  const [expenseData, setExpenseData] = useState();
  const [formattedDate, setFormattedDate] = useState();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  async function fetchExpenseData(expenseId) {
    console.log("id Trying",expenseId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/expense/getExpense/${expenseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("Expense Data", data);
      setExpenseData(data.data);
      setFormattedDate(formatDate(data.data.date));
    } catch (error) {
      console.log("error occured While fetching Expense Data", error);
    }
  }

  useEffect(() => {
    fetchExpenseData(expenseId);
  }, []);

  if(expenseData===undefined){
    return <>Loading...</>
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.overlay_content}>
        <h3>Expense Info</h3>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>By:</strong> {expenseData.createdBy}
        </p>
        <p>
          <strong>Amount:</strong> {expenseData.amount} Rs
        </p>
        <p>
          <strong>Description:</strong> {expenseData.description}
        </p>
        <p>
          <strong>Split Info:</strong>
        </p>
        <div className={styles.scrollable_component}>
        {expenseData.splitDetails.map((debt)=>{
            return <p key={debt._id}>{debt.userPaid} lends {debt.user2}: {Math.abs(debt.amount)}</p>
        })}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ExpenseInfo;
