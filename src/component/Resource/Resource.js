import React from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

const Resource = ({ name, tags, url, postedBy, date }) => {
  return (
    <div className={styles.resource}>
      <div className={styles.resourceBookmark}>B</div>
      <div className={styles.resourceBody}>
        <h4>
          <a href={url}> {name} </a> ({new Url(url).hostname})
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
    </div>
  );
};

export default Resource;
