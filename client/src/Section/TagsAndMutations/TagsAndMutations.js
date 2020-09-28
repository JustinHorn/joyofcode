import React, { useContext } from "react";

import { LinkIcon } from "component/Icon";

import useDeleteResource from "hooks/useDeleteResource";

import styles from "./tagsandmutations.module.css";
import UserContext from "context";

import List from "component/List";
import Tag from "component/Tag";

const TagsAndMutations = ({
  id,
  tags,
  isUpdate,
  setUpdate,
  preview,
  github,
  postedBy,
}) => {
  if (tags.length === 0) {
    tags = [{ name: "..." }];
  }

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
        <List
          list={tags?.map((t) => ({ text: t.name }))}
          Key={"tAM"}
          Component={Tag}
        />

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
