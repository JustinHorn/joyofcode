import React from "react";

import { LinkIcon } from "component/Icon";

import styles from "./tagsandmutations.module.css";

import List from "component/List";
import Tag from "component/Tag";

const TagsAndMutations = ({
  tags,

  github,
}) => {
  if (tags.length === 0) {
    tags = [{ name: "..." }];
  }

  return (
    <ul className={styles.props}>
      <List
        list={tags?.map((t) => ({ text: t.name }))}
        Key={"tAM"}
        Component={Tag}
      />

      {github && (
        <LinkIcon
          className={styles.icon}
          src="/img/icons/github.png"
          href={github}
        />
      )}
    </ul>
  );
};

export default TagsAndMutations;
