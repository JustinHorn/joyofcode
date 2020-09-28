import React from "react";

import styles from "./tag.module.css";

const Tag = ({ text, Button }) => (
  <li className={styles.tag}>
    {text} {Button}
  </li>
);

export default Tag;
