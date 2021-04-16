import React from "react";

import LinkIcon from "component/icon/LinkIcon";

import styles from "./tagsandmutations.module.css";

import List from "component/List";
import Tag from "component/Tag";

type TagsAndMutationsProps = {
  tags?: Tag[];
  github?: string;
};

const TagsAndMutations = ({
  tags,

  github,
}: TagsAndMutationsProps) => {
  if (!tags || tags.length === 0) {
    tags = [{ name: "...", id: -1 }];
  }

  return (
    <ul className={styles.props}>
      {github && <LinkIcon src="/img/icons/github.png" href={github} />}

      <List
        list={tags.map((t) => ({ text: t.name }))}
        Key={"tAM"}
        Component={Tag}
      />
    </ul>
  );
};

export default TagsAndMutations;
