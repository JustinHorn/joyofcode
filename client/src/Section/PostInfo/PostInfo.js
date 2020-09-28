import React, { useContext } from "react";

import { useLikeResource, useUnLikeResource } from "hooks";
import UserContext from "context";

import styles from "./postinfo.module.css";

import { formatTimeDiff } from "helper";

const PostInfo = ({ id, postedBy, date, likes, preview }) => {
  const { user } = useContext(UserContext);

  const isLikedByUser =
    user && likes && !!likes.find((x) => x.user.id === user.id);

  const { likeResource } = useLikeResource(!isLikedByUser);

  const onClick = () => {
    likeResource({ variables: { id } });
  };

  return (
    <div className={styles.postInfo}>
      <span>
        {"posted by " + postedBy?.name + " " + formatTimeDiff(date) + " ago"}
      </span>
      {!preview && (
        <>
          <div className={styles.likeButton} onClick={onClick}>
            <span
              className={" " + (isLikedByUser ? styles.liked : styles.notLiked)}
            />

            {likes.length}
          </div>
        </>
      )}
    </div>
  );
};

export default PostInfo;
