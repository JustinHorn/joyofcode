import React from "react";

import styles from "./postinfo.module.css";

import { formatTimeDiff } from "helper";

import { Link } from "react-router-dom";

const PostInfoComment = ({ postedUnder, date }) => {
  return (
    <div className={styles.postInfo}>
      <span>
        {"posted under "}
        <Link to={"/project/" + postedUnder.id}>{postedUnder.title}</Link>
        {" " + formatTimeDiff(date) + " ago"}
      </span>
    </div>
  );
};

export default PostInfoComment;
