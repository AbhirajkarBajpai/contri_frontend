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

  async function createGroup(grpData) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/group/createGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(grpData),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("group data", data);
    } catch (err) {
      console.log("Error occured while Creating Group!", err);
    }
    return;
  }

  async function submitHandler(event) {
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

    await createGroup(GrpData);
    alert("group created succesfully");
    setEnteredName("");
    setMembers([]);
    props.onComplete();
    props.onCancel();
  }

  return (
    // <div className="backdrop">
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
        <h4>Members Added:</h4>
        <ul>
          {members.length === 0 ? (
            <span className="noMemberState">No memebers Added Yet!</span>
          ) : (
            members.map((member, index) => (
              <li key={index} className="member-item">
                {member.name} : {member.phone}{" "}
                <button
                  className="remove-member-btn"
                  onClick={() => removeMemberHandler(index)}
                >
                  X
                </button>
              </li>
            ))
          )}
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
    // </div>
  );
}

export default CreateGroup;
