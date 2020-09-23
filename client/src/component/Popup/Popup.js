import React from "react";

import styles from "./popup.module.css";

const Popup = ({ show, onClickAway, children }) => (
  <div className={styles.anchor}>
    <div className={show ? styles.popup : styles.beGone}>
      <div className={styles.menu}>{children}</div>

      <div className={styles.background} onClick={onClickAway}></div>
    </div>
  </div>
);

export default Popup;
