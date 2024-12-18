import React, { useState } from "react";
import "./CreateGroup.css";

function CreateGroup(props) {
  const [enteredName, setEnteredName] = useState("");
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");

  function handleNameChange(event) {
    setEnteredName(event.target.value);
  }

  function handleMemberNameChange(event) {
    setMemberName(event.target.value);
  }

  function handleMemberPhoneChange(event) {
    setMemberPhone(event.target.value);
  }

  function addMemberHandler(event) {
    event.preventDefault();

    if (!memberName || !memberPhone) {
      alert("Please enter both member name and phone number");
      return;
    }

    setMembers((prevMembers) => [
      ...prevMembers,
      { name: memberName, phone: memberPhone },
    ]);
    setMemberName("");
    setMemberPhone("");
  }

  function removeMemberHandler(index) {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  }

  function submitHandler(event) {
    event.preventDefault();

    if (!enteredName.trim()) {
      alert("Please enter a group name");
      return;
    }
    if (members.length === 0) {
      alert("Please add at least one member");
      return;
    }

    const GrpData = {
      name: enteredName,
      members: members,
      date: new Date(),
    };
    props.onCreateGroup(GrpData);
    setEnteredName("");
    setMembers([]);
  }

  return (
    <div className="backdrop">
      <form onSubmit={submitHandler} className="group-form">
        <div className="form-control">
          <label>Group Name:</label>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={enteredName}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-control">
          <label>Member Name:</label>
          <input
            type="text"
            placeholder="Enter Member Name"
            value={memberName}
            onChange={handleMemberNameChange}
          />
          <label>Contact No:</label>
          <input
            type="number"
            placeholder="Enter Contact"
            value={memberPhone}
            onChange={handleMemberPhoneChange}
          />
          <br />
          <button className="add-member-btn" onClick={addMemberHandler}>
            Add Member
          </button>
        </div>

        <div className="members-list">
          <h4>Members List:</h4>
          <ul>
            {members.map((member, index) => (
              <li key={index} className="member-item">
                {member.name} - {member.phone}{" "}
                <button
                  className="remove-member-btn"
                  onClick={() => removeMemberHandler(index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-actions">
          <button type="button" onClick={props.onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
