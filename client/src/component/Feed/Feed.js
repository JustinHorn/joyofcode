import React, { useMemo, useState } from "react";

import styles from "./feed.module.css";

import Resource from "component/Resource";

import TagInput from "component/Forms/Inputs/TagInput";

import useFeed from "hooks/useFeed";

import List from "component/List";

const Feed = ({ filter, data }) => {
  !filter && (filter = () => true);
  const resources = data?.map((x) => ({ ...x, isFeed: true }));

  const filteredResources = useMemo(
    () => resources?.filter(filter) || [filter, resources]
  );

  return (
    <div className={styles.feed}>
      <List Key="feed" Component={Resource} list={filteredResources} />
    </div>
  );
};

export default Feed;
