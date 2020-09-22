import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

import UpdateResource from "./Update";

import DeleteResource from "./Delete";
import UserContext from "context";

import { LinkIcon } from "component/Icon";

import { useLikeResource, useUnLikeResource } from "hooks";

const Resource = (props) => {
  const {
    id,
    title,
    tags,
    href,
    postedBy,
    imgUrl,
    date,
    description,
    github,
    likes,
    likeCount,
  } = props;
  const { user } = useContext(UserContext);
  const [isUpdate, setUpdate] = useState(false);

  const hostname = new Url(href).hostname;

  const isLikedByUser =
    user && likes && !!likes.find((x) => x.user.id === user.id);

  const postedByCurrentUser = postedBy?.id === user?.id && user;

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBody}>
        <h4>
          <a href={href}> {title} </a> ({hostname})
        </h4>
        <img className={styles.preview} srcSet={imgUrl} />
        {description && <p>{description}</p>}

        <div className={styles.postInfo}>
          <span className="text">
            {"by " +
              postedBy?.name +
              " on " +
              moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
          </span>
          <LikeOrUnlikeButton
            id={id}
            link={isLikedByUser}
            likeCount={likeCount}
          />
        </div>

        <ul className={styles.tagsAndOptions}>
          <ul className={styles.friendly}>
            {tags?.map(({ name }, index) => (
              <li className={styles.tag} key={index}>
                {name}
              </li>
            ))}
            {postedByCurrentUser && (
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
          {postedByCurrentUser && <DeleteResource id={id}> </DeleteResource>}
        </ul>
      </div>
      {isUpdate && (
        <UpdateResource resource={props} afterUpdate={() => setUpdate(false)} />
      )}
    </div>
  );
};

const LikeOrUnlikeButton = ({ id, link, likeCount }) => {
  const { likeResource } = useLikeResource();
  const { unlikeResource } = useUnLikeResource();

  const onClick = () => {
    if (link) {
      likeResource({ variables: { id } });
    } else {
      unlikeResource({ variables: { id } });
    }
  };

  return (
    <button
      onClick={onClick}
      className={styles.likeButton + " " + (link ? styles.liked : "")}
    >
      {likeCount}
    </button>
  );
};

export default Resource;
