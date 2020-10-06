import React from "react";

import styles from "./picture.module.css";

import { Link } from "react-router-dom";

const Picture = ({ imgUrl, id }) => (
  <Link to={"/project/" + id}>
    <div className={styles.imgContainer}>
      {imgUrl && <img className={styles.preview} src={imgUrl} />}
    </div>
  </Link>
);

export default Picture;
