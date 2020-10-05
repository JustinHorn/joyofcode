import React from "react";

import styles from "./picture.module.css";

const Picture = ({ imgUrl }) => (
  <div className={styles.imgContainer}>
    {imgUrl && <img className={styles.preview} src={imgUrl} />}
  </div>
);

export default Picture;
