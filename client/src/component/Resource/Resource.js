import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

import UpdateResource from "./Update";

import DeleteResource from "./Delete";
import UserContext from "context";

const Resource = ({ id, title, tags, href, postedBy, date }) => {
  const { user } = useContext(UserContext);
  const [isUpdate, setUpdate] = useState(false);

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBookmark}>B</div>
      <div className={styles.resourceBody}>
        <h4>
          <a href={href}> {title} </a> ({new Url(href).hostname})
        </h4>
        <div className={styles.postInfo}>
          {"by " +
            postedBy?.name +
            " on " +
            moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
        </div>
        <ul className={styles.tags}>
          {tags?.map(({ name }, index) => (
            <li key={index}>{name}</li>
          ))}
          {postedBy?.id === user?.id && user && (
            <button onClick={() => setUpdate(!isUpdate)}>edit</button>
          )}
          {postedBy?.id === user?.id && user && (
            <DeleteResource id={id}> </DeleteResource>
          )}
        </ul>
      </div>
      {isUpdate && <UpdateResource id={id}></UpdateResource>}
    </div>
  );
};

export default Resource;
