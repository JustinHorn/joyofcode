import React from "react";

import styles from "./resource.module.css";

import moment from "moment";

const Resource = ({ name, tags, url, postedBy, date }) => (
  <div className={styles.resource}>
    <h4>
      <a href={url}> {name} </a>
    </h4>
    <div className={styles.postInfo}>
      {"by " + postedBy + " on " + moment(date).format("YYYY.MM.DD-HH:mm")}
    </div>
    <ul className={styles.tags}>
      {tags?.map((x) => (
        <li>{x}</li>
      ))}
    </ul>
  </div>
);

export default Resource;
