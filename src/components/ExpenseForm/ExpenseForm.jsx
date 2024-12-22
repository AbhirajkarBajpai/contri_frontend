import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = ({ members = [] }) => {
  const [expenseName, setExpenseName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [manualAmounts, setManualAmounts] = useState({});
  const [splitRemaining, setSplitRemaining] = useState(false);

  const handleMemberToggle = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleManualAmountChange = (member, amount) => {
    setManualAmounts((prev) => ({ ...prev, [member]: amount }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const manualTotal = Object.values(manualAmounts).reduce(
      (sum, amount) => sum + (parseFloat(amount) || 0),
      0
    );
    const remainingAmount = totalAmount - manualTotal;
    const autoSplitAmount =
      splitRemaining && remainingAmount > 0
        ? remainingAmount / (selectedMembers.length - Object.keys(manualAmounts).length)
        : 0;

    const finalSplit = selectedMembers.map((member) => ({
      member,
      amount: manualAmounts[member] || autoSplitAmount,
    }));
    console.log({ expenseName, totalAmount, finalSplit });
    alert('Expense created successfully!');
  };
  
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <label>Expense Name:</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(parseFloat(e.target.value) || '')}
          required
        />
      </div>
      <div>
        <label>Include Members:</label>
        {members.map((member) => (
          <div key={member}>
            <label>
              <input
                type="checkbox"
                checked={selectedMembers.includes(member)}
                onChange={() => handleMemberToggle(member)}
              />
              {member}
            </label>
            {selectedMembers.includes(member) && (
              <div>
                <label>Manual Amount:</label>
                <input
                  type="number"
                  value={manualAmounts[member] || ''}
                  onChange={(e) =>
                    handleManualAmountChange(
                      member,
                      parseFloat(e.target.value) || ''
                    )
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={splitRemaining}
            onChange={(e) => setSplitRemaining(e.target.checked)}
          />
          Split Remaining Amount
        </label>
      </div>
      <button type="submit">Create Expense</button>
    </form>
  );
};

export default ExpenseForm;
