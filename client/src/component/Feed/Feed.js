import React, { useMemo, useState } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

import useFeed from "hooks/useFeed";
import useHandleQuery from "helper/useHandleQuery";

const Feed = ({ filter, small, query }) => {
  !filter && (filter = () => true);

  const { data, addItems } = query;

  const projects = data?.feed.map((x) => ({
    ...x,
    showDescription: false,
    small,
  }));

  const filteredProjects = useMemo(() => projects?.filter(filter), [
    filter,
    projects,
  ]);

  return (
    <div>
      <div className={small ? "list px5 center-list " : styles.feed}>
        <List Key="feed" Component={Project} list={filteredProjects} />
      </div>
      <button onClick={addItems}>loadMore</button>
    </div>
  );
};

export default (props) => useHandleQuery(props, useFeed, Feed);
