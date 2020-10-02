import React from "react";
import { Link } from "react-router-dom";
import { formatTimeDiff } from "helper";

import styles from "./like.module.css";

const LikeMenu = ({ id, date, title }) => {
  return (
    <span className={styles.like}>
      <Link to={"/project/" + id}>{title}</Link>
      {` was liked
  ${formatTimeDiff(date)} ago`}
    </span>
  );
};

export default LikeMenu;
