import React, { useMemo, useState } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

const Feed = ({ filter, data }) => {
  !filter && (filter = () => true);
  const projects = data?.map((x) => ({ ...x, showDescription: false }));

  const filteredProjects = useMemo(() => projects?.filter(filter), [
    filter,
    projects,
  ]);

  return (
    <div className={styles.feed}>
      <List Key="feed" Component={Project} list={filteredProjects} />
    </div>
  );
};

export default Feed;
