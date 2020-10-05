import React, { useMemo } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

import useFeed from "hooks/useFeed";

const Feed = ({ filter }) => {
  !filter && (filter = () => true);

  const { data, loading, error, addItems } = useFeed();

  const projects = data?.feed.map((x) => ({ ...x, showDescription: false }));

  const filteredProjects = useMemo(() => projects?.filter(filter), [
    filter,
    projects,
  ]);

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div>
      <div className={styles.feed}>
        <List Key="feed" Component={Project} list={filteredProjects} />
      </div>
      <button onClick={addItems}>loadMore</button>
    </div>
  );
};

export default Feed;
