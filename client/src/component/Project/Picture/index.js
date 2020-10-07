import React from "react";

import styles from "./picture.module.css";

import { Link } from "react-router-dom";

const Picture = ({ imgUrl, id }) => {
  const content = (
    <div className={styles.imgContainer}>
      {imgUrl && <img className={styles.preview} src={imgUrl} />}
    </div>
  );

  if (id) {
    return <Link to={"/project/" + id}> {content}</Link>;
  } else {
    return content;
  }
};

export default Picture;
