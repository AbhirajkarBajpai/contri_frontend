import React, { useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../../assets/img/bkbtn.png";
import ExpenseForm from "../../../components/ExpenseForm/ExpenseForm";
import Modal from "../../../components/Modal/Modal";
import ExpenseInfo from "../../../components/ExpenseInfo/ExpenseInfo";
import ConfirmationBox from "../../../components/ConfirmationBox/ConfirmationBox";
import { showAlert } from "../../../components/alert";

const Expenses = () => {
  //   const groupData = useSelector((state) => state.groupData.groupData);
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [expenseId, setExpenseId] = useState("");
  const [isCreatingExpense, setIsCreatingExpense] = useState(false);
  const [isOpenExpenseInfo, setIsOpenExpenseInfo] = useState(false);
  const [isOpenConf, setIsOpenConf] = useState(false);
  const [currFxn, setCurrFxn] = useState(() => console.log(10));
  const [confMsg, setConfMsg] = useState("Hi");
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

  function handleOnExpenseDelete(id) {
    setConfMsg("Are You Sure Want to delete this Expense?");
    setCurrFxn(() => () => handleDeleteExpense(id));
    setIsOpenConf(true);
  }

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
      showAlert('success', "settle Req Sent!");
      setFetchAgain(true);
      setIsOpenConf(false);
    } catch (error) {
      console.error("Error:", error);
      showAlert('error', "Something Went Wrong!");
      setIsOpenConf(false);
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
      showAlert('success', "settle completed!");
      setFetchAgain(true);
      setIsOpenConf(false);
    } catch (error) {
      console.error("Error:", error);
      showAlert('error', "Something Went Wrong!");
      setIsOpenConf(false);
    }
  }

  async function handleDeleteExpense(id) {
    try {
      const response = await fetch(
        `https://contri-backend.vercel.app/api/v1/expense/delExpense/${id}`,
        {
          method: "POST",
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
      console.log("data:", data);
      showAlert('success', "Expense Deleted!");
      setFetchAgain(true);
      setIsOpenConf(false);
    } catch (error) {
      console.error("Error:", error);
      showAlert('error', "Something Went Wrong!");
      setIsOpenConf(false);
    }
  }

  return (
    <div className={styles.ExpensesPage}>
      <img
        className={styles.backbtn}
        onClick={() => navigate("/")}
        src={backIcon}
      />
      {isOpenConf && (
        <ConfirmationBox
          message={confMsg}
          onNo={() => setIsOpenConf(false)}
          onYes={currFxn}
        />
      )}
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
            <div className={styles.expense}>
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
                  <span className={styles.expenseAmount}>
                    ({expense.amount})
                  </span>
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
              {expense.createdBy === loggedInUser && (
                <svg
                  className={styles.delExpense}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnExpenseDelete(expense._id);
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#fff"
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
                      d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                      stroke="#56d4f7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              )}
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
                          onClick={() => {
                            setCurrFxn(
                              () => () =>
                                handleSplitResolveReq(debt.user1, debt.user2)
                            );
                            debt.user1 === loggedInUser
                              ? setConfMsg("Have You Paid")
                              : setConfMsg("Are You Sure to settle!");
                            setIsOpenConf(true);
                          }}
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
                        onClick={() => {
                          if (debt.user2 === loggedInUser) {
                            setCurrFxn(
                              () => () =>
                                handleSplitResolveReq(debt.user1, debt.user2)
                            );
                            setConfMsg("Are You Sure to confirm settle!");
                            setIsOpenConf(true);
                          }
                        }}
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
                          onClick={() => {
                            setCurrFxn(
                              () => () =>
                                handleSplitResolveReq(debt.user2, debt.user1)
                            );
                            debt.user2 === loggedInUser
                              ? setConfMsg("Have You Paid")
                              : setConfMsg("Are You Sure to settle!");
                            setIsOpenConf(true);
                          }}
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
                        onClick={() => {
                          if (debt.user1 === loggedInUser) {
                            setCurrFxn(
                              () => () =>
                                handleSplitResolveReq(debt.user2, debt.user1)
                            );
                            setConfMsg("Are You Sure to confirm settle!");
                            setIsOpenConf(true);
                          }
                        }}
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
