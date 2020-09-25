import React, { useContext } from "react";

import styles from "./comment.module.css";
import { formatTimeDiff } from "helper";

import UserContext from "context/UserContext";

const Comment = ({ id, text, postedBy, date, remove }) => {
  const { user } = useContext(UserContext);

  const you = postedBy.id === user?.id;

  return (
    <span className={styles.comment}>
      <span className={styles.commentsInfo}>
        <span>
          {(you ? "You" : postedBy.name) + " " + formatTimeDiff(date) + " ago"}{" "}
        </span>
        {you && <button onClick={remove}>DELETE</button>}
      </span>
      <span className={styles.text}>{text}</span>
    </span>
  );
};

export default Comment;
