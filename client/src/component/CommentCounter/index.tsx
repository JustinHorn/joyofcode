import React from "react";

import { Link } from "react-router-dom";

import styles from "./commentcounter.module.css";

type CommentCounterProps = {
  count: number;
  projectId: number;
};

const CommentCounter = ({ count, projectId }: CommentCounterProps) => (
  <Link to={"/project/" + projectId} className={styles.text}>
    <h3>Comments:{count}</h3>
  </Link>
);

export default CommentCounter;
