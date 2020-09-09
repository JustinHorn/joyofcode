import React from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

const Resource = ({ id, title, tags, href, postedBy, date }) => {
  return (
    <div className={styles.resource}>
      <div className={styles.resourceBookmark}>B</div>
      <div className={styles.resourceBody}>
        <h4>
          <a href={href}> {title} </a> ({new Url(href).hostname})
        </h4>
        <div className={styles.postInfo}>
          {"by " +
            postedBy +
            " on " +
            moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
        </div>
        <ul className={styles.tags}>
          {tags?.map(({ name }, index) => (
            <li key={index}>{name}</li>
          ))}
          <button onClick={() => {}}>Delete</button>
        </ul>
      </div>
    </div>
  );
};

export default Resource;
