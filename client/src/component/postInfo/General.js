import React from "react";

import styles from "./postinfo.module.css";

import { formatTimeDiff } from "helper";

import { Link } from "react-router-dom";

const PostInfoGeneral = ({ prefix, link, linkText, date }) => {
  return (
    <span className={styles.postInfo}>
      {prefix && `posted ${prefix} `}
      <Link to={link}>{linkText}</Link>
      {" " + formatTimeDiff(date) + " ago"}
    </span>
  );
};

export default PostInfoGeneral;
