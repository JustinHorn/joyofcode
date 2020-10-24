import React from "react";

import styles from "./socials.module.css";

import CommentCounter from "component/CommentCounter";

import LikeHandler from "component/LikeHandler";

type SocialsProps = {
  id:number,
  commentCount:number,
  likes:any,
}

const Socials = ({ id, commentCount, likes }:SocialsProps) => {
  return (
    <div className={styles.socialAttributes}>
      <CommentCounter count={commentCount} projectId={id} />
      <LikeHandler likes={likes} projectId={id} />
      <span></span>
    </div>
  );
};

export default Socials;
