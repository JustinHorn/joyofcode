import React, { useEffect, useState } from "react";

import styles from "./index.module.css";

const Spoiler = ({ show, onClick, children }) => {
  return (
    <div className={styles.spoiler + " " + show ? styles.show : ""}>
      <button className={styles.button} onClick={onClick}>
        {!show ? "˅" : "˄"}
      </button>
      <div className={styles.elements + " " + (show ? styles.show : "")}>
        {children}
      </div>
    </div>
  );
};

export default Spoiler;
