import React, { useContext } from "react";

import useLikeResource from "hooks/resource/useLike";
import UserContext from "context";

import styles from "./likehandler.module.css";

const LikeHandler = ({ likes, resourceId }) => {
  const { user } = useContext(UserContext);

  const isLikedByUser =
    user && likes && !!likes.find((x) => x.user.id === user.id);

  const { likeResource } = useLikeResource(!isLikedByUser);

  const onClick = () => {
    likeResource({ variables: { id: resourceId } });
  };

  return (
    <div className={styles.likeButton}>
      <span
        className={styles.icon + " " + (!isLikedByUser ? styles.opac : "")}
        onClick={onClick}
      >
        {isLikedByUser ? "✌️" : "👋"}
      </span>
      <span className={styles.text}> {likes.length}</span>
    </div>
  );
};

export default LikeHandler;
