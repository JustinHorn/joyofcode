import React from "react";

import styles from "./tag.module.css";
import Icon from "component/icon/Icon";


type TechStackTagProps = {
  iconVal:TechIcon,
  Button:React.ReactNode,
}

const TechStackTag = ({ iconVal, Button }:TechStackTagProps) => (
  <li
    className={styles.techstacktag + " " + (Button ? "relative" : "")}
    title={iconVal?.name}
  >
    <Icon {...iconVal} />
    {Button}
  </li>
);

export default TechStackTag;
