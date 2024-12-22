import React, { useEffect, useState } from "react";
import styles from "./Groups.module.css";
import CreateGroup from "../../../components/GroupForm/CreateGroup";
import Modal from "../../../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setGroups } from "../../../store/store";

const Groups = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser.value);
  const [isCreating, setIsCreating] = useState(false);
  const userGroups = useSelector((state) => state.userGroups.groups);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:5000/api/v1/user/getUserGroups",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("fetched data", data);
      dispatch(setGroups(data.groups));
    }
    fetchData();
  }, []);

  async function deleteGroup(groupId) {
    const response = await fetch(
      `http://localhost:5000/api/v1/group/deleteGroup/${groupId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("group data", data);
    return;
  }

  return (
    <div className={styles.container}>
      {isCreating && (
        <Modal>
          <CreateGroup onCancel={() => setIsCreating(false)} />
        </Modal>
      )}
      <header className={styles.header}>
        <h1 className={styles.title}>Groups</h1>
        <svg
          onClick={() => setIsCreating(true)}
          className={styles.addbutton}
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
      </header>
      {userGroups.length === 0 ? (
        <p className={styles.noGroups}>No Groups Found</p>
      ) : (
        <ul className={styles.groupList}>
          {userGroups.map((group, index) => (
            <li key={index} className={styles.groupItem}>
              <div>
                <h3 className={styles.groupName}>{group.name}</h3>
              </div>
              {group.createdBy === loggedInUser && (
                <svg
                  className={styles.delGroup}
                  onClick={() => deleteGroup(group.id)}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Groups;
