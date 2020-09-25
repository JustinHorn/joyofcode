import React from "react";

import styles from "./comment.module.css";
import { formatTimeDiff } from "helper";

const Comment = ({ text, postedBy, date }) => {
  return (
    <span className={styles.comment}>
      <span className={styles.commentsInfo}>
        {postedBy.name + " " + formatTimeDiff(date) + " ago"}
      </span>
      <span className={styles.text}>{text}</span>
    </span>
  );
};

export default Comment;
