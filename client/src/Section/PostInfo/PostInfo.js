import React, { useContext } from "react";

import UserContext from "context";

import styles from "./postinfo.module.css";

import { formatTimeDiff } from "helper";

const PostInfo = ({ id, postedBy, date, likes, preview }) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;

  return (
    <div className={styles.postInfo}>
      <span>
        {"posted by " + posterName + " " + formatTimeDiff(date) + " ago"}
      </span>
    </div>
  );
};

export default PostInfo;
