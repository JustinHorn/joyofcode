import React, { useState } from "react";

import styles from "./index.module.css";

const Spoiler = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.spoiler + " " + show ? styles.show : ""}>
      <button className={styles.button} onClick={() => setShow(!show)}>
        {!show ? "˅" : "˄"}
      </button>
      <div className={styles.elements + " " + (show ? styles.show : "")}>
        {children}
      </div>
    </div>
  );
};

export default Spoiler;
