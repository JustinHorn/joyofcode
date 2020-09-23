import React, { useContext } from "react";

import moment from "moment";

import { useLikeResource, useUnLikeResource } from "hooks";
import UserContext from "context";

import styles from "./postinfo.module.css";

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
        {"by " +
          postedBy?.name +
          " on " +
          moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
      </span>
      {!preview && (
        <button
          onClick={onClick}
          className={
            styles.likeButton + " " + (isLikedByUser ? styles.liked : "")
          }
        >
          {likes?.length}
        </button>
      )}
    </div>
  );
};

export default PostInfo;
