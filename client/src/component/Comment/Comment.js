import React, { useContext } from "react";

import styles from "./comment.module.css";
import { formatTimeDiff } from "helper";

import UserContext from "context/UserContext";
import PostInfoGeneral from "component/postInfo/General";

const Comment = ({ text, postedBy, date, remove }) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const you = projectByCurrentUser(postedBy.id);
  return (
    <span className={styles.comment}>
      {remove && (
        <span className={styles.commentsInfo}>
          <PostInfoComment postedBy={postedBy} date={date} />
          {you && <button onClick={remove}>DELETE</button>}
        </span>
      )}
      <textarea readOnly={true} value={text} className={styles.text} />
    </span>
  );
};

const PostInfoComment = ({ postedBy, date }) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;
  return (
    <PostInfoGeneral
      link={"/user/" + postedBy.id}
      linkText={posterName}
      date={date}
    />
  );
};

export default Comment;
