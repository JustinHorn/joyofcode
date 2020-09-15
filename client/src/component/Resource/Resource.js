import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

import UpdateResource from "./Update";

import DeleteResource from "./Delete";
import UserContext from "context";

import { LinkIcon } from "component/Icon";

const Resource = ({
  id,
  title,
  tags,
  href,
  postedBy,
  imgUrl,
  date,
  github,
}) => {
  const { user } = useContext(UserContext);
  const [isUpdate, setUpdate] = useState(false);

  const hostname = new Url(href).hostname;

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBody}>
        <h4>
          <a href={href}> {title} </a> ({hostname})
        </h4>
        <img className={styles.preview} src={imgUrl} alt="" />
        <div className={styles.postInfo}>
          {"by " +
            postedBy?.name +
            " on " +
            moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
        </div>
        <ul className={styles.tagsAndOptions}>
          <ul className={styles.friendly}>
            {tags?.map(({ name }, index) => (
              <li key={index}>{name}</li>
            ))}
            {postedBy?.id === user?.id && user && (
              <button onClick={() => setUpdate(!isUpdate)}>edit</button>
            )}

            {github && (
              <LinkIcon
                className={styles.icon}
                src="/img/icons/github.png"
                href={github}
              />
            )}
          </ul>
          <ul className={styles.unfriendly}>
            {postedBy?.id === user?.id && user && (
              <DeleteResource id={id}> </DeleteResource>
            )}
          </ul>
        </ul>
      </div>
      {isUpdate && (
        <UpdateResource
          id={id}
          afterUpdate={() => setUpdate(false)}
        ></UpdateResource>
      )}
    </div>
  );
};

export default Resource;
