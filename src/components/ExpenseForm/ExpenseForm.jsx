import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";
import { useSelector } from "react-redux";

const ExpenseForm = ({ groupId, onComplete, onCancel, members = [] }) => {
  const isUserLoggedIn = useSelector((state) => state.loggedInUser.value);
  const [expenseName, setExpenseName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [manualAmounts, setManualAmounts] = useState({});
  const [includeInSplit, setIncludeInSplit] = useState({});

  const handleMemberToggle = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
    if (!selectedMembers.includes(member)) {
      setIncludeInSplit((prev) => ({ ...prev, [member]: true }));
    } else {
      setIncludeInSplit((prev) => {
        const newSplitState = { ...prev };
        delete newSplitState[member];
        return newSplitState;
      });
    }
  };

  const handleManualAmountChange = (member, amount) => {
    if (amount === "") {
      return;
    }
    setManualAmounts((prev) => ({ ...prev, [member]: amount }));
    if (!amount) {
      setIncludeInSplit((prev) => ({ ...prev, [member]: true }));
    }
  };

  const handleIncludeInSplitChange = (member, include) => {
    setIncludeInSplit((prev) => ({ ...prev, [member]: include }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(manualAmounts, includeInSplit);
    const manualAmountsArray = Object.entries(manualAmounts).map(
      ([user, amount]) => ({
        user,
        amount,
        isInclude: includeInSplit[user] || false,
      })
    );
    const body = {
      groupId: groupId,
      amount: totalAmount,
      description: expenseName,
      manualSplits: manualAmountsArray,
      selectedUsers: selectedMembers,
    };
    console.log("data", body);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/expense/addExpense",
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
      console.log("Expsense data:", data);
      alert("Expense created successfully!");
      onComplete();
      onCancel();
    } catch (error) {
      console.error("Error fetching group data:", error);
      alert("something went wrong!");
      onCancel();
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <label>Expense Name:</label>
        <input
          className={styles.formContainer_input}
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          className={styles.formContainer_input}
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(parseFloat(e.target.value) || "")}
          required
        />
      </div>
      <div>
        <label>Include Members:</label>
        {members.map((member) => (
          <div key={member._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedMembers.includes(member._id)}
                onChange={() => handleMemberToggle(member._id)}
              />
              {member._id === isUserLoggedIn ? "Yourself" : member.name}
            </label>
            {selectedMembers.includes(member._id) && (
              <div className={styles.selMemContn}>
                <input
                  type="number"
                  className={styles.manualInput}
                  placeholder="Enter manual Lent(if Any)"
                  value={manualAmounts[member._id] || ""}
                  onChange={(e) =>
                    handleManualAmountChange(
                      member._id,
                      parseFloat(e.target.value) || ""
                    )
                  }
                />
                <label>
                  <input
                    type="checkbox"
                    checked={includeInSplit[member._id] || false}
                    onChange={(e) =>
                      handleIncludeInSplitChange(member._id, e.target.checked)
                    }
                  />
                  Also Include in Remaining Split
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.expenseFormActions}>
        <button
          type="button"
          className={styles.cancelExpense}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className={styles.createExpense}>
          Create Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
