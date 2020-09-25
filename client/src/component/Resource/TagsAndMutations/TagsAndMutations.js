import React, { useContext } from "react";

import { LinkIcon } from "component/Icon";

import useDeleteResource from "hooks/useDeleteResource";

import styles from "./tagsandmutations.module.css";
import UserContext from "context";

const TagsAndMutations = ({
  id,
  tags,
  isUpdate,
  setUpdate,
  preview,
  github,
  postedBy,
}) => {
  const { user } = useContext(UserContext);
  const postedByCurrentUser = postedBy?.id === user?.id && user;

  const { deleteResource } = useDeleteResource();

  const deleteOnClick = () => {
    if (window.confirm("You really wanna delete?")) {
      deleteResource({ variables: { id } });
    }
  };

  return (
    <ul className={styles.tagsAndOptions}>
      <ul className={styles.friendly}>
        {tags?.map(({ name }, index) => (
          <li className={"tag"} key={index}>
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
      {postedByCurrentUser && <button onClick={deleteOnClick}>Delete</button>}
    </ul>
  );
};

export default TagsAndMutations;
