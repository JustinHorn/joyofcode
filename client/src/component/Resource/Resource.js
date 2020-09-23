import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";

import UserContext from "context";

import { LinkIcon } from "component/Icon";

import Popup from "component/Popup";

import { useLikeResource, useUnLikeResource } from "hooks";

import useDeleteResource from "hooks/useDeleteResource";

import { MutationOptions, useHandleFormValues } from "component/MutationForm";
import { updateOptions as options } from "component/MutationForm";
import { useUpdateResource } from "hooks";

import MutationMenu from "component/MutationMenu";

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
    preview,
  } = props;
  const { user } = useContext(UserContext);
  const [isUpdate, setUpdate] = useState(false);

  const hostname = new Url(href).hostname;

  const postedByCurrentUser = postedBy?.id === user?.id && user;

  const { deleteResource } = useDeleteResource();

  const deleteOnClick = () => {
    if (window.confirm("You really wanna delete?")) {
      deleteResource({ variables: { id } });
    }
  };

  const resource = props;
  const MO = new MutationOptions(options);

  const propsM = useHandleFormValues(MO.parseToResource(resource));

  const { update: mutation } = useUpdateResource();

  const doMutation = ({ variables }) => {
    variables.id = id;
    mutation({ variables });
  };

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBody}>
        <h4>
          <a href={href}> {title} </a> ({hostname})
        </h4>
        <div className={styles.imgContainer}>
          {imgUrl && <img className={styles.preview} srcSet={imgUrl} />}
        </div>
        {description && <p>{description}</p>}

        <div className={styles.postInfo}>
          <span className="text">
            {"by " +
              postedBy?.name +
              " on " +
              moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
          </span>
          {!preview && <LikeOrUnlikeButton id={id} likes={likes} />}
        </div>

        <ul className={styles.tagsAndOptions}>
          <ul className={styles.friendly}>
            {tags?.map(({ name }, index) => (
              <li className={styles.tag} key={index}>
                {name}
              </li>
            ))}
            {!preview && postedByCurrentUser && (
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
          {postedByCurrentUser && (
            <button onClick={deleteOnClick}>Delete</button>
          )}
        </ul>
      </div>
      {!preview && (
        <Popup show={isUpdate} onClickAway={() => setUpdate(false)}>
          <MutationMenu
            MO={MO}
            mutation={doMutation}
            headline={"Update your project"}
            props={propsM}
          />
        </Popup>
      )}
    </div>
  );
};

const LikeOrUnlikeButton = ({ id, likes }) => {
  const { user } = useContext(UserContext);

  const isLikedByUser =
    user && likes && !!likes.find((x) => x.user.id === user.id);

  const { likeResource } = useLikeResource(!isLikedByUser);

  const onClick = () => {
    likeResource({ variables: { id } });
  };

  return (
    <button
      onClick={onClick}
      className={styles.likeButton + " " + (isLikedByUser ? styles.liked : "")}
    >
      {likes?.length}
    </button>
  );
};

export default Resource;
