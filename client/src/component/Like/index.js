import React from "react";
import { Link } from "react-router-dom";
import { formatTimeDiff } from "helper";

import styles from "./like.module.css";

const LikeMenu = ({ date, project }) => {
  return (
    <span className={styles.like}>
      <span>
        <Link to={"/project/" + project.id}>{project.title}</Link>
      </span>

      <span>{` ${formatTimeDiff(date)} ago`}</span>
    </span>
  );
};

export default LikeMenu;
