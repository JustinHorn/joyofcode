import React, { useContext } from "react";

import useLikeProject from "hooks/project/useLike";
import UserContext from "context";

import styles from "./likehandler.module.css";

const LikeHandler = ({ likes, projectId }) => {
  const { user } = useContext(UserContext);

  const isLikedByUser =
    user && likes && !!likes.find((x) => x.user.id === user.id);

  const { toggleLikeProject } = useLikeProject(isLikedByUser);

  const onClick = () => {
    toggleLikeProject({ variables: { id: projectId } });
  };

  return (
    <div className={styles.likeButton}>
      <span
        className={styles.icon + " " + (isLikedByUser ? styles.liked : "")}
        onClick={onClick}
      >
        👍
      </span>
      <span className={styles.text}> {likes.length}</span>
    </div>
  );
};

export default LikeHandler;
