import React, { useContext } from "react";

import UserContext from "context";

import styles from "./postinfo.module.css";

import { formatTimeDiff } from "helper";

import { Link } from "react-router-dom";

const PostInfo = ({ id, postedBy, date, likes, preview }) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;

  return (
    <div className={styles.postInfo}>
      <span>
        {"posted by "} <Link to={"/user/" + postedBy.id}>{posterName}</Link>
        {formatTimeDiff(date) + " ago"}
      </span>
    </div>
  );
};

export default PostInfo;
