import React from "react";

import { Link } from "react-router-dom";

import styles from "./commentcounter.module.css";

const CommentCounter = ({ count, projectId }) => (
  <Link to={"/project/" + projectId} className={styles.text}>
    <h3>Comments:{count}</h3>
  </Link>
);

export default CommentCounter;
