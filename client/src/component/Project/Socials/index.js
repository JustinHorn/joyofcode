import React from "react";

import styles from "./socials.module.css";

import CommentCounter from "component/CommentCounter";

import LikeHandler from "component/LikeHandler";

const Socials = ({ id, commentCount, likes }) => {
  return (
    <div className={styles.socialAttributes}>
      <CommentCounter count={commentCount} projectId={id} />
      <LikeHandler likes={likes} projectId={id} />
      <span></span>
    </div>
  );
};

export default Socials;
