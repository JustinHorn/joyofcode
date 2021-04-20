import React from "react";

import styles from "./tag.module.css";

type TagProps = {
  text: string;
  Button?: React.ReactNode;
};

const Tag = ({ text, Button }: TagProps) => (
  <li className={styles.tag + " " + (Button ? "relative" : "")}>
    {text} {Button}
  </li>
);

export default Tag;
