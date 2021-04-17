import React from "react";
import { JsxElement } from "typescript";

import styles from "./popup.module.css";

type PopupProps = {
  show: boolean;
  onClickAway?: () => any;
  children: JsxElement;
};

const Popup = ({ show, onClickAway, children }: PopupProps) => (
  <div className={styles.anchor}>
    <div className={show ? styles.popup : styles.beGone}>
      <div className={styles.menu}>{children}</div>

      <div className={styles.background} onClick={onClickAway}></div>
    </div>
  </div>
);

export default Popup;
