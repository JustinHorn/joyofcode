import React from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

const Resource = ({ id, name, tags, url, postedBy, date, deleteResource }) => {
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
          {tags?.map((x, index) => (
            <li key={index}>{x}</li>
          ))}
          <button>Edit</button>
          <button onClick={() => deleteResource(id)}>Delete</button>
        </ul>
      </div>
    </div>
  );
};

export default Resource;
