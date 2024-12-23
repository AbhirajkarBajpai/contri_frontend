import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";
import { useSelector } from "react-redux";

const ExpenseForm = ({ onCancel,members = [] }) => {
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
    setManualAmounts((prev) => ({ ...prev, [member]: amount }));
    if (!amount) {
      setIncludeInSplit((prev) => ({ ...prev, [member]: true }));
    }
  };

  const handleIncludeInSplitChange = (member, include) => {
    setIncludeInSplit((prev) => ({ ...prev, [member]: include }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Expense created successfully!");
    onCancel();
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
                checked={selectedMembers.includes(member.name)}
                onChange={() => handleMemberToggle(member.name)}
              />
              {member._id === isUserLoggedIn? "Yourself" : member.name}
            </label>
            {selectedMembers.includes(member.name) && (
              <div className={styles.selMemContn}>
                <input
                  type="number"
                  className={styles.manualInput}
                  placeholder="Enter manual Lent(if Any)"
                  value={manualAmounts[member.name] || ""}
                  onChange={(e) =>
                    handleManualAmountChange(
                      member.name,
                      parseFloat(e.target.value) || ""
                    )
                  }
                />
                <label>
                  <input
                    type="checkbox"
                    checked={includeInSplit[member.name] || false}
                    onChange={(e) =>
                      handleIncludeInSplitChange(member.name, e.target.checked)
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
        <button type="button" className={styles.cancelExpense} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.createExpense}>Create Expense</button>
      </div>
      
    </form>
  );
};

export default ExpenseForm;
