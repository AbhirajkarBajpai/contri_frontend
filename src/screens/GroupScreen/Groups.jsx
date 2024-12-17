import React from "react";
import styles from "./Groups.module.css";

const Groups = ({ groups }) => {
    console.log(groups);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Groups</h1>
        <button className={styles.createButton}>Create Group</button>
      </header>
      {groups.length === 0 ? (
        <p className={styles.noGroups}>No Groups Found</p>
      ) : (
        <ul className={styles.groupList}>
          {groups.map((group, index) => (
            <li key={index} className={styles.groupItem}>
              <div>
                <h3 className={styles.groupName}>{group.name}</h3>
                <p className={styles.groupCreatedBy}>
                  Created By: {group.createdBy}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Groups;
