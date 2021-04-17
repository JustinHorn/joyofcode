import React, { useContext } from "react";

import styles from "./comment.module.css";

import UserContext from "context/UserContext";
import PostInfoGeneral from "component/postInfo/General";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type CommentProps = {
  text: string;
  postedBy: User;
  date: number;
  remove?: () => any;
};

const Comment = ({ text, postedBy, date, remove }: CommentProps) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const you = projectByCurrentUser(postedBy.id);
  return (
    <span className={styles.comment}>
      <span className={styles.commentsInfo}>
        <PostInfoComment postedBy={postedBy} date={date} />
      </span>

      <span className={styles.text}>{text}</span>
      {you && (
        <button title="delete" onClick={remove}>
          <FontAwesomeIcon icon={["fas", "trash-alt"]}></FontAwesomeIcon>
        </button>
      )}
    </span>
  );
};

export type PostInfoCommentProps = {
  postedBy: User;
  date: number;
};

const PostInfoComment = ({ postedBy, date }: PostInfoCommentProps) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;
  return (
    <PostInfoGeneral
      prefix={""}
      link={"/user/" + postedBy.id}
      linkText={posterName}
      date={date}
    />
  );
};

export default Comment;
