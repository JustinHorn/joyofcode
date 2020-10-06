import React from "react";

import styles from "./tag.module.css";
import Icon from "component/icon/Icon";

const TechStackTag = ({ iconVal, Button }) => (
  <li className={styles.techstacktag} title={iconVal?.name}>
    <Icon {...iconVal} /> {Button}
  </li>
);

export default TechStackTag;
