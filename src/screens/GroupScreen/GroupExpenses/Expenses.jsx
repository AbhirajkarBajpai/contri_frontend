import React, { useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExpenseForm from "../../../components/ExpenseForm/ExpenseForm";
import Modal from "../../../components/Modal/Modal";

const Expenses = () => {
  //   const groupData = useSelector((state) => state.groupData.groupData);
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [isCreatingExpense, setIsCreatingExpense] = useState(false);

  useEffect(() => {
    const getGroup = async (groupId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/group/groupDetail/${groupId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Group data:", data);
        setGroupData(data.group);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    if (id) {
      getGroup(id);
    }
  }, [id]);

  return (
    <div className={styles.ExpensesPage}>
       {isCreatingExpense && (
        <Modal>
          <ExpenseForm members={groupData?.members} onCancel={() => setIsCreatingExpense(false)} />
        </Modal>
      )}
      <div className={styles.grpName}>
        <span>{groupData?.name}</span>
      </div>
      <svg
        className={styles.addExpensebtn}
        onClick={()=>setIsCreatingExpense(true)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
            fill="#9a8d8d"
          ></path>{" "}
        </g>
      </svg>
      <div className={styles.expensesContn}>
        {groupData?.expenses?.length > 0 ? (
          groupData.expenses?.map((expense) => (
            <div className={styles.expenseBox}>
              <span className={styles.expenseName}>{expense.name}</span>
              <div className={styles.expensePayer}>
                <span>Paid By :</span>
                <span>{expense.paidBy}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{color:"white"}}>No Expense Found!</p>
        )}
      </div>
      <div className={styles.grpMembers}>
        <h2>Group Members</h2>
        <ul>
          {groupData?.members.map((member, i) => (
            <li key={i}>{member?.name}</li>
          ))}
        </ul>
      </div>
      <div className={styles.debtsSection}>
        <h2>Debts</h2>
        <ul>
          {groupData?.groupSettelmentDetails?.length > 0 ? (
            groupData.groupSettelmentDetails.map((debt, i) => (
              <li key={i}>{debt}</li>
            ))
          ) : (
            <li>No settlement founds</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
