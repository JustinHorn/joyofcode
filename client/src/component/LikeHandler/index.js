import React, { useContext } from "react";

import useLikeProject from "hooks/project/useLike";
import UserContext from "context";

import styles from "./likehandler.module.css";

import useHandleQuery from "helper/useHandleQuery";

const LikeHandler = ({ likes, projectId, query }) => {
  const { user } = useContext(UserContext);

  const isLikedByUser =
    user && likes && !!likes.find((x) => x.user.id === user.id);

  const { likeProject } = useLikeProject(!isLikedByUser);

  const onClick = () => {
    likeProject({ variables: { id: projectId } });
  };

  return (
    <div className={styles.likeButton}>
      <span
        className={styles.icon + " " + (isLikedByUser ? styles.liked : "")}
        onClick={onClick}
      >
        {isLikedByUser ? "✌️" : "👋"}
      </span>
      <span className={styles.text}> {likes.length}</span>
    </div>
  );
};

export default LikeHandler;
