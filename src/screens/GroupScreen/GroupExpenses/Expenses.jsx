import React, { useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExpenseForm from "../../../components/ExpenseForm/ExpenseForm";
import Modal from "../../../components/Modal/Modal";
import ExpenseInfo from "../../../components/ExpenseInfo/ExpenseInfo";

const Expenses = () => {
  //   const groupData = useSelector((state) => state.groupData.groupData);
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [expenseId, setExpenseId] = useState("");
  const [isCreatingExpense, setIsCreatingExpense] = useState(false);
  const [isOpenExpenseInfo, setIsOpenExpenseInfo] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [userIdToName, setUserIdToName] = useState({});
  const loggedInUser = useSelector((state) => state.loggedInUser.value);

  const getGroup = async (groupId) => {
    try {
      const response = await fetch(
        `https://contri-backend.vercel.app/api/v1/group/groupDetail/${groupId}`,
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
      const map = data.group.members.reduce((acc, member) => {
        acc[member._id] = member.name;
        return acc;
      }, {});
      setUserIdToName(map);
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getGroup(id);
    }
  }, [id]);

  useEffect(() => {
    if (fetchAgain) {
      setFetchAgain(false);
      if (id) {
        getGroup(id);
      }
    }
  }, [fetchAgain]);

  async function handleSplitResolveReq(payUID, recUID) {
    const body = {
      groupId: groupData.id,
      payingUserId: payUID,
      receivingUserId: recUID,
    };
    console.log(body);
    if (loggedInUser === recUID) return handleSplitResolve(body);
    try {
      const response = await fetch(
        "https://contri-backend.vercel.app/api/v1/expense/reqSettel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data:", data);
      alert("settle Req Sent!");
      setFetchAgain(true);
    } catch (error) {
      console.error("Error:", error);
      alert("something went wrong!");
    }
  }

  async function handleSplitResolve(body) {
    try {
      const response = await fetch(
        "https://contri-backend.vercel.app/api/v1/expense/settel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data:", data);
      alert("settle completed!");
      setFetchAgain(true);
    } catch (error) {
      console.error("Error:", error);
      alert("something went wrong!");
    }
  }

  return (
    <div className={styles.ExpensesPage}>
      {isCreatingExpense && (
        <Modal>
          <ExpenseForm
            groupId={id}
            members={groupData?.members}
            onCancel={() => setIsCreatingExpense(false)}
            onComplete={() => setFetchAgain(true)}
          />
        </Modal>
      )}
      {isOpenExpenseInfo && (
        <Modal>
          <ExpenseInfo
            onClose={() => setIsOpenExpenseInfo(false)}
            expenseId={expenseId}
            userMap={userIdToName}
          />
        </Modal>
      )}
      <div className={styles.grpName}>
        <span>{groupData?.name}</span>
      </div>
      <svg
        className={styles.addExpensebtn}
        onClick={() => setIsCreatingExpense(true)}
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
            <div
              onClick={() => {
                setExpenseId(expense._id);
                setIsOpenExpenseInfo(true);
              }}
              className={styles.expenseBox}
            >
              <div className={styles.expenseInfo}>
                <span className={styles.expenseName}>
                  {expense.description}
                </span>
                <span className={styles.expenseAmount}>({expense.amount})</span>
              </div>
              <div className={styles.expensePayer}>
                <span>Paid By :</span>
                <span>
                  {expense.createdBy === loggedInUser
                    ? "You"
                    : userIdToName[expense.createdBy]}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No Expense Found!</p>
        )}
      </div>
      <div className={styles.debtsSection}>
        <h2>Debts</h2>
        <ul>
          {groupData?.groupSettelmentDetails?.length > 0 ? (
            groupData.groupSettelmentDetails.map(
              (debt) =>
                debt.user1 !== debt.user2 &&
                (debt.amount > 0 ? (
                  <div className={styles.lendsDetail}>
                    <li key={debt._id}>
                      {debt.user2 === loggedInUser
                        ? "You"
                        : userIdToName[debt.user2]}{" "}
                      lends{" "}
                      {debt.user1 === loggedInUser
                        ? "You"
                        : userIdToName[debt.user1]}
                      : {Math.abs(debt.amount)}
                    </li>
                    {debt.isSettled === "No" &&
                      (debt.user1 === loggedInUser ||
                        debt.user2 === loggedInUser) && (
                        <div
                          className={styles.lendsSettle}
                          onClick={() =>
                            handleSplitResolveReq(debt.user1, debt.user2)
                          }
                        >
                          {" "}
                          <span>Settle</span>{" "}
                        </div>
                      )}
                    {debt.isSettled === "Yes" && (
                      <div className={styles.lendsSettle}>
                        <span>Settled</span>
                      </div>
                    )}
                    {debt.isSettled === "Requested" && (
                      <div
                        className={styles.lendsSettle}
                        onClick={() =>
                          debt.user2 === loggedInUser
                            ? handleSplitResolveReq(debt.user1, debt.user2)
                            : null
                        }
                      >
                        {debt.user1 === loggedInUser && (
                          <span>settle requested</span>
                        )}
                        {debt.user2 === loggedInUser && (
                          <span>confirm settle</span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.lendsDetail}>
                    <li key={debt._id}>
                      {debt.user1 === loggedInUser
                        ? "You"
                        : userIdToName[debt.user1]}{" "}
                      lends{" "}
                      {debt.user2 === loggedInUser
                        ? "You"
                        : userIdToName[debt.user2]}
                      : {Math.abs(debt.amount)}
                    </li>
                    {debt.isSettled === "No" &&
                      (debt.user1 === loggedInUser ||
                        debt.user2 === loggedInUser) && (
                        <div
                          className={styles.lendsSettle}
                          onClick={() =>
                            handleSplitResolveReq(debt.user2, debt.user1)
                          }
                        >
                          {" "}
                          <span>Settle</span>
                        </div>
                      )}
                    {debt.isSettled === "Yes" && (
                      <div className={styles.lendsSettle}>
                        <span>Settled</span>
                      </div>
                    )}
                    {debt.isSettled === "Requested" && (
                      <div
                        className={styles.lendsSettle}
                        onClick={() =>
                          debt.user1 === loggedInUser
                            ? handleSplitResolveReq(debt.user2, debt.user1)
                            : null
                        }
                      >
                        {debt.user2 === loggedInUser && (
                          <span>settle requested</span>
                        )}
                        {debt.user1 === loggedInUser && (
                          <span>confirm settle</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
            )
          ) : (
            <li>No settlement founds</li>
          )}
        </ul>
      </div>
      <div className={styles.grpMembers}>
        <h2>Group Members</h2>
        <ul>
          {groupData?.members.map((member, i) => (
            <li key={i}>
              {member?._id === loggedInUser ? "You" : member?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
