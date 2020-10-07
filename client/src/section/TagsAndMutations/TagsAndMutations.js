import React from "react";

import LinkIcon from "component/icon/LinkIcon";

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
      {github && <LinkIcon src="/img/icons/github.png" href={github} />}

      <List
        list={tags?.map((t) => ({ text: t.name }))}
        Key={"tAM"}
        Component={Tag}
      />
    </ul>
  );
};

export default TagsAndMutations;
